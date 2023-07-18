import psycopg2
from psycopg2 import DatabaseError
from decouple import config

def get_connection():
    try:
        return psycopg2.connect(
            user=config('POSTGRES_USER'),
            password=config('POSTGRES_PASSWORD'),
            database=config('POSTGRES_DATABASE')
            )
    except DatabaseError as ex:
        raise ex