from fastapi import (
    APIRouter,
    Request,
    status,
    HTTPException,
    Depends,
    Security,
    Path
)
from pydantic import BaseModel
from typing import Annotated, Any

from ..dependencies.authentication import get_user
from ..dependencies.database import get_db, Session

from ..db.types.enum_class import EnumClass
from ..db.repositories.repository import Repository
from ..schemas.base import create_base_schemas
from ..schemas.user import UserSchema
from ..schemas.default import ResponseSchema, TableSchema


class RouterModes(EnumClass):
    """
    Utility to create routers.

    E.g.
    DefaultRouter.create(
        MySchema, MyRepo, get_permissions=[],
        **RouterModes.ONLY_GET.value)
    """

    FULL = {
        "include_create": True,
        "include_update": True,
        "include_delete": True,
        "include_get_single": True,
        "include_get_all": True,
        "include_table": True,
    }

    ONLY_GET = {
        "include_create": False,
        "include_update": False,
        "include_delete": False,
        "include_get_single": True,
        "include_get_all": True,
        "include_table": True,
    }


class _DefaultRouter:
    """
    A default router that creates:
    - create [POST] API
    - update [PUT] API
    - delete [DELETE] API
    - list all items [GET] API
    - get individual item [GET] API
    - table data [GET] API
    --------------------------------------------------------------------------
    Example 1: basic usage
    user_router = DefaultRouter(
        'users',
        UserSchema,
        UserRepository,
        edit_permissions=[PermissionEnum.IS_ROOT_USER.name],
    )
    --------------------------------------------------------------------------
    Example 2: changing default create behaviour
    UserRouterBase = DefaultRouter(
        'users',
        UserSchema,
        UserRepository,
        edit_permissions=[PermissionEnum.IS_ROOT_USER.name],
        auto_include_routes=False,
        **RouterModes.FULL.value
    )

    class UserRouter(UserRouterBase):
        def create(self, db_session, data, user):
            # Do whatever you want. For example, call the default method
            return super().create(db_session, data, user)

    user_router = UserRouter().include_routes()
    --------------------------------------------------------------------------
    """

    @classmethod
    def create(
        cls,
        base_path: str,  # Prefix for all the routes
        schema: BaseModel,
        repository: Repository,
        get_permissions=[],  # Basic permission list
        edit_permissions=[],  # Permissions for create/update/delete
        auto_include_routes=True,  # Automatically call "include_routes"
        include_create=True,  # Whether to include the "create" API
        include_update=True,  # Whether to include the "update" API
        include_delete=True,  # Whether to include the "delete" API
        include_get_all=True,  # Whether to include the "get" API
        include_get_single=True,  # Whether to include the get "/pk" API
        include_table=True,  # Whether to include the "/table" API
        create_schema: BaseModel = None,  # Don't use create_base_schemas
        identifier: str = 'pk',     # Column responsible to identify entry
    ):
        """
        Returns the router object if auto_include_routes=True, otherwise
        returns a router class which inherits from APIRouter, so it can be
        adapted to any need (usually overriding some endpoint methods).
        """
        if create_schema:
            base_schema = schema
        else:
            base_schema, create_schema = create_base_schemas(schema)

        edit_permissions = list(set(edit_permissions + get_permissions))

        class _Router(APIRouter):
            """
            This class is returned by the create() method. One can override the
            endpoint methods in order to change its behaviour.
            """
            def __init__(self, *args, **kwargs):
                super().__init__(*args, **kwargs)
                self.base_path = base_path
                self.repository = repository
                self.get_permissions = get_permissions
                self.edit_permissions = edit_permissions
                self.auto_include_routes = auto_include_routes
                self.include_create = include_create
                self.include_update = include_update
                self.include_delete = include_delete
                self.include_get_all = include_get_all
                self.include_get_single = include_get_single
                self.include_table = include_table
                self.base_schema = base_schema
                self.create_schema = create_schema
                self.identifier = identifier
                self.model_name = repository(None).model.__name__

                if auto_include_routes:
                    self.include_routes()

            ##################################################################
            # Endpoint Methods: methods called on each enndpoint

            def create(self, db_session, data, user):
                """
                Method called by the create route.

                Can be overriden for specific implementations if just
                refactoring the repository isn't enough.
                """
                res = self.repository(db_session, user).create(**data)
                db_session.commit()
                return res

            def all(self, db_session, user):
                """
                Method called by the get all route.

                Can be overriden for specific implementations if just
                refactoring the repository isn't enough.
                """
                res = self.repository(db_session, user).all()
                return res

            def one(self, db_session, id, user):
                """
                Method called by the get single entry route.

                Can be overriden for specific implementations if just
                refactoring the repository isn't enough.
                """
                kwargs = {self.identifier: id}
                res = self.repository(db_session, user).one_or_none(**kwargs)
                if res is None:
                    raise self.not_found_exception(
                        msg=f"{self.model_name} entry with {self.identifier} ="
                            f" '{id}' not found")
                return res

            def update(self, db_session, id, data, user):
                """
                Method called by the update entry route.

                Can be overriden for specific implementations if just
                refactoring the repository isn't enough.
                """
                data[f"{self.repository.UPDATE_PREFIX}{self.identifier}"] = id
                res = self.repository(db_session, user).update(**data)
                if res is None:
                    raise self.not_found_exception(
                        msg=f"{self.model_name} entry with {self.identifier} ="
                            f" '{id}' not found")
                db_session.commit()
                return res

            def delete(self, db_session, id, user):
                """
                Method called by the delete entry route.

                Can be overriden for specific implementations if just
                refactoring the repository isn't enough.
                """
                kwargs = {self.identifier: id}
                res = self.repository(db_session, user).delete(**kwargs)
                if res is None:
                    raise self.not_found_exception(
                        msg=f"{self.model_name} entry with {self.identifier} ="
                            f" '{id}' not found")
                db_session.commit()
                return res

            ##################################################################
            # Route Inclusion Methods: methods for including routes

            def include_routes(self) -> APIRouter:
                """
                Method that actually includes the routes. If not called,
                no route will be created
                """
                # TODO
                if self.include_get_all:
                    self._include_get_all_route()
                if self.include_get_single:
                    self._include_get_single_route()
                if self.include_create:
                    self._include_create_route()
                if self.include_update:
                    self._include_update_route()
                if self.include_delete:
                    self._include_delete_route()

                return self

            def _include_create_route(self) -> None:
                """Includes the POST /base_path endpoint for creation"""
                self.add_api_route(
                    f"/{base_path}",
                    self._route_create,
                    response_model=ResponseSchema[self.base_schema],
                    status_code=status.HTTP_201_CREATED,
                    methods=["POST"],
                    summary=f"Create {self.model_name}",
                )

            def _include_update_route(self) -> None:
                """Includes the PUT /base_path/{id} endpoint for update"""
                self.add_api_route(
                    f"/{base_path}/{{id}}",
                    self._route_update,
                    response_model=ResponseSchema[self.base_schema],
                    status_code=status.HTTP_200_OK,
                    methods=["PUT"],
                    summary=f"Update {self.model_name}",
                )

            def _include_get_all_route(self) -> None:
                """
                Includes the GET /base_path endpoint for getting all entries
                """
                self.add_api_route(
                    f"/{base_path}",
                    self._route_get_all,
                    response_model=ResponseSchema[list[self.base_schema]],
                    status_code=status.HTTP_200_OK,
                    methods=["GET"],
                    summary=f"Get all {self.model_name} entries",
                )

            def _include_get_single_route(self) -> None:
                """
                Includes the GET /base_path/{id} endpoint for getting a single
                entry
                """
                self.add_api_route(
                    f"/{base_path}/{{id}}",
                    self._route_get_single,
                    response_model=ResponseSchema[self.base_schema],
                    status_code=status.HTTP_200_OK,
                    methods=["GET"],
                    summary=f"Get {self.model_name} single entry",
                )

            def _include_delete_route(self) -> None:
                """
                Includes the DELETE /base_path/{id} endpoint for deleting an
                entry
                """
                self.add_api_route(
                    f"/{base_path}/{{id}}",
                    self._route_delete,
                    response_model=ResponseSchema[self.base_schema],
                    status_code=status.HTTP_200_OK,
                    methods=["DELETE"],
                    summary=f"Delete {self.model_name} entry",
                )

            ##################################################################
            # Internal Methods: helper and chore methods

            def _map_fields(self, data, schema):
                """
                Destructures data based on the received schema, so
                it can be passed to repositories as kwargs.
                """
                fields = schema.__fields__.keys()
                res = {}
                for field in fields:
                    if hasattr(data, field):
                        res[field] = getattr(data, field)
                return res

            def _route_create(
                self,
                data: create_schema,
                request: Request,
                db_session: Annotated[Session, Depends(get_db)],
                user: Annotated[
                    UserSchema, Security(get_user, scopes=edit_permissions)
                ],
            ):
                f"""Creates a {self.model_name} entry"""
                res = self.create(
                    db_session, self._map_fields(data, create_schema), user
                )
                return {
                    "data": res,
                    "detail": f"Created {self.model_name}: {data}"
                }

            def _route_update(
                self,
                data: create_schema,
                request: Request,
                db_session: Annotated[Session, Depends(get_db)],
                user: Annotated[
                    UserSchema, Security(get_user, scopes=edit_permissions)
                ],
                id: Any = Path(title="Unique identifier"),
            ):
                f"""Creates a {self.model_name} entry"""
                res = self.update(
                    db_session, id, self._map_fields(data, create_schema), user
                )
                return {
                    "data": res,
                    "detail":
                    f"Updated {self.model_name} where {self.identifier} = "
                    f"'{id}': {data}"
                }

            def _route_get_all(
                self,
                request: Request,
                db_session: Annotated[Session, Depends(get_db)],
                user: Annotated[
                    UserSchema, Security(get_user, scopes=get_permissions)
                ],
            ):
                f"""Creates a {self.model_name} entry"""
                res = self.all(db_session, user)
                return {
                    "data": res,
                    "detail": f"Retrieved all {self.model_name} entries"
                }

            def _route_get_single(
                self,
                request: Request,
                db_session: Annotated[Session, Depends(get_db)],
                user: Annotated[
                    UserSchema, Security(get_user, scopes=get_permissions)
                ],
                id: Any = Path(title="Unique identifier"),
            ):
                f"""Get {self.model_name} single entry"""
                res = self.one(db_session, id, user)
                return {
                    "data": res,
                    "detail":
                    f"Retrieved {self.model_name} entry where "
                    f"{self.identifier} = '{id}'"
                }

            def _route_delete(
                self,
                request: Request,
                db_session: Annotated[Session, Depends(get_db)],
                user: Annotated[
                    UserSchema, Security(get_user, scopes=edit_permissions)
                ],
                id: Any = Path(title="Unique identifier"),
            ):
                f"""Delete {self.model_name} entry"""
                res = self.delete(db_session, id, user)
                return {
                    "data": res,
                    "detail":
                    f"Deleted {self.model_name} entry where {self.identifier} "
                    f"= '{id}'"
                }

            ##################################################################
            # Excpetions

            def not_found_exception(self, msg="",
                                    status=status.HTTP_404_NOT_FOUND):
                return HTTPException(
                    status_code=status,
                    detail=msg or f"{self.model_name} entry not found"
                )

        if auto_include_routes:
            """
            After including routes, there's no need to change any behaviour,
            so we just return the desired object.
            """
            return _Router()

        # Return the class, so it can be adapted to any need
        return _Router


DefaultRouter = _DefaultRouter.create
