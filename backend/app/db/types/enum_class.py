from enum import Enum
from ...utils.custom_exception import CustomException


class EnumClass(Enum):
    """ Enum class that implements some useful methods. """

    @classmethod
    def names(cls):
        """ Returns a list with all the names in the enum """
        res = []
        for entry in cls:
            res.append(entry.name)
        return res

    @classmethod
    def values(cls):
        """ Returns a list with all the values in the enum """
        res = []
        for entry in cls:
            res.append(entry.value)
        return res

    @classmethod
    def get_by_name(cls, name):
        """ Returns the enum entry with the same 'name'.
            Raises CustomException if none found.
        """
        if not hasattr(cls, name):
            raise CustomException(f'{cls} has no entry named "{name}"')

        return getattr(cls, name)

    @classmethod
    def get_by_value(cls, value):
        """ Returns the first enum entry with the same 'value'.
            Raises CustomException if none found.
        """
        if value not in cls.values():
            raise CustomException(f'{cls} has no entry with value "{value}"')

        for entry in cls:
            if entry.value == value:
                return entry
