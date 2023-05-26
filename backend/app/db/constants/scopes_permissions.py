from ...utils.singleton import singleton


@singleton
class ScopesPermissions:
    _scopes = {}

    @classmethod
    def include(cls, enum):
        """
        Include values of an enum in scopes. Usually applicable for
        permissions enums.

        E.g.

        @ScopesPermissions.include
        class MyEnum(EnumClass):
            ...
        """

        for entry in enum:
            if entry.name in cls._scopes:
                print(f"[WARNING] Overriding permission scope '{entry.name}', "
                      f"from {cls._scopes[entry.name]} to {entry.value}")

            cls._scopes[entry.name] = entry.value
        return enum

    @classmethod
    @property
    def scopes(cls):
        return cls._scopes
