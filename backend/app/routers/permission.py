from ..schemas.permission import PermissionSchema
from ..db.repositories.permission import PermissionRepository

from .default_router import DefaultRouter

router = DefaultRouter(
    "permissions",
    PermissionSchema,
    PermissionRepository,
)
