from flask import Flask, render_template
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    load_dotenv()
    if app.config['TESTING']:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../data/test_tasks.db'
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../data/tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    CORS(app)
    db.init_app(app)
    migrate = Migrate(app, db)

    SWAGGER_URL = '/api/v1/documentation'
    API_URL = '/static/swagger.json'
    SWAGGER_BLUEPRINT = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            'app_name': "MentalidadWeb Todo"
        }
    )
    app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix=SWAGGER_URL)

    @app.route("/")
    def hello_world():
        return render_template('index.html')

    @app.route('/static/<path:filename>')
    def static_files(filename):
        return app.send_static_file(filename)

    from .resources import api_bp
    app.register_blueprint(api_bp, url_prefix='/api/v1')

    return app
