from flask import Blueprint
from flask_restx import Api, Resource

api_bp = Blueprint('api', __name__)
api = Api(api_bp)


@api.route('/tasks')
class TaskListResource(Resource):
    def get(self):
        # Obtener lista de tareas
        pass

    def post(self):
        # Crear una nueva tarea
        pass


@api.route('/tasks/<int:task_id>')
class TaskResource(Resource):
    def get(self, task_id):
        # Obtener una tarea por ID
        pass

    def put(self, task_id):
        # Actualizar una tarea por ID
        pass

    def delete(self, task_id):
        # Eliminar una tarea por ID
        pass
