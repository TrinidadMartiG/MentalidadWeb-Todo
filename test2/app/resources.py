from flask import Blueprint, request
from flask_restx import Api, Resource
from app.models import Task
from app import db

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

@api.route('/tasks')
class TaskList(Resource):
    def get(self):
        tasks = Task.query.all()
        task_list = []
        for task in tasks:
            task_data = {
                'id': task.id,
                'title': task.title,
                'description': task.description
            }
            task_list.append(task_data)
        return {'tasks': task_list}

    def post(self):
        title = request.json.get('title')
        description = request.json.get('description')
        task = Task(title=title, description=description)
        db.session.add(task)
        db.session.commit()
        return {'message': 'Task created', 'id': task.id}, 201
    
@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}