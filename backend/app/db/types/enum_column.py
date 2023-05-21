from abc import ABC
from enum import Enum
from sqlalchemy.types import TypeDecorator
from sqlalchemy import (
    Float,
    Integer,
    String,
)


class EnumColumn(TypeDecorator, ABC):
    """
    Enables passing in a Python enum and storing the enum's *value* in the db.
    The default would have stored the enum's *name* (ie the string).

    NOTE: This is an abstract class, you should extend it by creating a
          "impl" and "_python_type properties. See the examples below.
    """

    _python_type = None
    Enum = Enum

    def __init__(self, enum_type, *args, **kwargs):
        self.values = enum_type
        TypeDecorator.__init__(self, *args, **kwargs)

    def process_bind_param(self, value, dialect):
        if hasattr(value, 'value'):
            return value.value
        if isinstance(value, str) and value in self.values:
            return self.values[value].value
        if isinstance(value, self._python_type):
            return value
        return None

    def process_result_value(self, value, dialect):
        if value is None:
            return None
        if isinstance(value, self.values):
            return value
        if isinstance(value, str) and value in self.values:
            return self.values[value]
        return self.values(value)


class IntEnumColumn(EnumColumn):
    """ For columns whose values should come from an Enum of integers """
    impl = Integer
    _python_type = int

    def __init__(self, enum_type, *args, **kwargs):
        EnumColumn.__init__(self, enum_type, *args, **kwargs)


class StringEnumColumn(EnumColumn):
    """ For columns whose values should come from an Enum of strings """
    impl = String
    _python_type = str

    def __init__(self, enum_type, *args, **kwargs):
        super().__init__(enum_type, *args, **kwargs)


class FloatEnumColumn(EnumColumn):
    """ For columns whose values should come from an Enum of floats """
    impl = Float
    _python_type = float

    def __init__(self, enum_type, *args, **kwargs):
        super().__init__(enum_type, *args, **kwargs)
