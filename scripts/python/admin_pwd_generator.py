import os
from dotenv import load_dotenv
from passlib.context import CryptContext


if __name__ == '__main__':
    path = os.getcwd()
    if path.endswith('python'):
        path = '/'.join(path.split('/')[:-1])
    if path.endswith('scripts'):
        path = '/'.join(path.split('/')[:-1])
    load_dotenv(f'{path}/.env')

    USER = os.environ['FN_ADMIN_USER']
    PWD = os.environ['FN_ADMIN_PWD']

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    print('username:', USER)
    print('password:', pwd_context.hash(PWD))
