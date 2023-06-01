class CustomException(Exception):
    """ Used to differentiate exceptions raised """
    def __init__(self, *args: object) -> None:
        super().__init__(*args)

