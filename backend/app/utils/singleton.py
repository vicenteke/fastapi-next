def singleton(cls):
    """
    Singleton decorator for classes. Simply use:

    @singleton
    class MyClass():
        ...
    """
    instances = {}

    def instance():
        if cls not in instances:
            instances[cls] = cls()
        return instances[cls]

    return instance()
