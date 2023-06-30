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
        if not title or not description or title.strip() == "" or description.strip() == "":
            return {"message": "Title and description must not be empty"}, 400
        
        task = Task(title=title, description=description)
        db.session.add(task)
        db.session.commit()
        return {'message': 'Task created', 'id': task.id}, 201
    
@api.route('/tasks/<int:id>')
class SingleTask(Resource):
    def put(self, id):
        title = request.json.get('title')
        description = request.json.get('description')

        task = db.session.get(Task, id) 
        if not task:
            return {'message': 'Task not found'}, 404

        if title:
            task.title = title

        if description:
            task.description = description

        db.session.commit()

        return {'message': 'Task updated'}
    
    def delete(self, id):
        task = Task.query.get(id)
        if not task:
            return {'message': 'Task not found'}, 404

        db.session.delete(task)
        db.session.commit()

        return {'message': 'Task deleted'}