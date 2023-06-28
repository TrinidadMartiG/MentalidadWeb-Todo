from flask import Flask, render_template
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../data/tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    print("Template Folder:", app.template_folder)

    db.init_app(app)
    migrate = Migrate(app, db)

    @app.route("/")
    def hello_world():
        return render_template('index.html')

    @app.route('/static/<path:filename>')
    def static_files(filename):
        return app.send_static_file(filename)

    from .resources import api_bp
    app.register_blueprint(api_bp, url_prefix='/api/v1')

    return app