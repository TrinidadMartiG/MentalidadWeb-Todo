import os
from decouple import config

class Config():
    pass

class DevConfig(Config):
    DEBUG=True
    SQLALCHEMY_DATABASE_URI= 'postgresql://trini:password@postgres:5432/task-db'
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SQLALCHEMY_ECHO=True

class TestConfig(Config):
    TESTING=True
    SQLALCHEMY_DATABASE_URI= 'sqlite://'
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SQLALCHEMY_ECHO=True
    pass

config_dict={
    'dev': DevConfig,
    'testing': TestConfig
}