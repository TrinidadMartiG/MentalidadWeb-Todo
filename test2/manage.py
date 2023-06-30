# manage.py
import os
import unittest
from flask.cli import FlaskGroup
from app import create_app, db, config_dict

cli = FlaskGroup(create_app=lambda: create_app(config_dict['dev']))

@cli.command('runserver')
def runserver():
    create_app(config_dict['dev'])

@cli.command('test')
def test():
    app = create_app(config_dict['testing'])
    with app.app_context():
        tests = unittest.TestLoader().discover('tests', pattern='test*.py')
        result = unittest.TextTestRunner(verbosity=2).run(tests)
        if result.wasSuccessful():
            return 0
        return 1

if __name__ == '__main__':
    cli()
