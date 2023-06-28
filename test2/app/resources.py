from flask import Blueprint
from flask_restx import Api, Resource
from app.models import Task
from app import db

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

@api.route('/tasks')
class TaskList(Resource):
    def get(self):
        tasks = Task.query.all()
        return {'tasks': [task.title for task in tasks]}

    def post(self):
        task = Task(title='New Task')
        db.session.add(task)
        db.session.commit()
        return {'message': 'Task created'}