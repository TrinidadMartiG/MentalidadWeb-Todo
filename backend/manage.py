# manage.py
import unittest
from flask.cli import FlaskGroup
from app import create_app
from config import config_dict
from app.models import db, migrate
from flask_migrate import MigrateCommand


cli = FlaskGroup(create_app=lambda: create_app(config_dict['dev']))
cli.add_command('db', MigrateCommand)
app = create_app(config_dict['dev'])
app.app_context().push()
migrate.init_app(app, db)  

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
            return 0
        return 1

if __name__ == '__main__':
    cli()
