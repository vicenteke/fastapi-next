from sqlalchemy.orm.session import Session
from sqlalchemy import false

from .repository import Repository
from ..models.user import User
from ..models.user_role import UserRole
from ..models.role_permission import RolePermission
from ..models.permission import Permission


class UserRepository(Repository):
    def __init__(self, db_session: Session, user=None):
        super().__init__(db_session, User, user)

    def permissions(self, user, **kwargs):
        """Returns a list of permission names. Used in scopes"""
        user = self.get_instance(user, **kwargs)
        if not user:
            return []

        query = self.db_session.query(Permission.name)\
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
            ).all()

        return [val[0] for val in query]
