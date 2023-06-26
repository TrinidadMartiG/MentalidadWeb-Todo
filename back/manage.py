from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import create_app, db

app = create_app()
manager = Manager(app)
migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)


@manager.command
def install():
    # Script de instalación inicial (población de datos iniciales, etc.)
    pass


@manager.command
def test():
    # Script para ejecutar pruebas unitarias
    pass


if __name__ == '__main__':
    manager.run()
