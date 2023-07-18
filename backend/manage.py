# manage.py
import unittest
import sys
from flask.cli import FlaskGroup
from app import create_app
from config import config_dict
from app.models import db
from flask_migrate import Migrate

app = create_app(config_dict['dev'])
migrate = Migrate(app, db)
cli = FlaskGroup(create_app=lambda: create_app(config_dict['dev']))

@cli.command('runserver')
def runserver():
    app.run()

@cli.command('test')
def test():
    app = create_app(config_dict['testing'])
    with app.app_context():
        tests = unittest.TestLoader().discover('tests', pattern='test*.py')
        result = unittest.TextTestRunner(verbosity=2).run(tests)
        if result.wasSuccessful():
            sys.exit(0)
        sys.exit(1)

if __name__ == '__main__':
    cli()
