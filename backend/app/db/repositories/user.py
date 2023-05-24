from sqlalchemy.orm.session import Session
from sqlalchemy import false

from .repository import Repository
from ..models.user import User
from ..models.user_role import UserRole
from ..models.role_permission import RolePermission
from ..models.permission import Permission


class UserRepository(Repository):
    def __init__(self, db_session: Session):
        super().__init__(db_session, User)

    def permissions(self, user, **kwargs):
        user = self.get_instance(user, **kwargs)
        if not user:
            return []

        res = self.db_session.query(Permission.name)\
            .join(
                RolePermission,
                RolePermission.permission_pk == Permission.pk
            ).join(
                UserRole,
                UserRole.role_pk == RolePermission.role_pk
            ).join(
                User,
                User.pk == UserRole.user_pk
            ).filter(
                Permission.deleted == false(),
                RolePermission.deleted == false(),
                UserRole.deleted == false(),
                User.deleted == false(),
                User.pk == user.pk
            )

        return list(res) if res else []
