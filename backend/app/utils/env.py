import os
from dotenv import load_dotenv


def get_from_env(variables: list[str] = []):
    path = os.getcwd()
    if path.endswith('backend'):
        path = '/'.join(path.split('/')[:-1])
    load_dotenv(f'{path}/.env')

    return {key: os.environ[key] for key in variables}
