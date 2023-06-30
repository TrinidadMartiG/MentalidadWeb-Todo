import logging
import unittest
import warnings
from app.models import Task
from app import create_app, db

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../data/test_tasks.db'
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()

            # Create some sample tasks for testing
            task1 = Task(title='Task 1', description='Description 1')
            task2 = Task(title='Task 2', description='Description 2')
            db.session.add_all([task1, task2])
            db.session.commit()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.metadata.drop_all(bind=db.engine, tables=db.metadata.tables.values())

        self.app_context.pop()

    def test_get_tasks(self):
        logger.info('Running test_get_tasks')
        response = self.client.get('/api/v1/tasks')
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertIn('tasks', data)

    def test_post_task(self):
        logger.info('Running test_post_task')
        task_data = {
            'title': 'Test Task',
            'description': 'Test Description'
        }
        response = self.client.post('/api/v1/tasks', json=task_data)
        self.assertEqual(response.status_code, 201)
        data = response.json
        self.assertIn('message', data)
        self.assertIn('id', data)
        task_id = data['id']

        # Verify that the task was added to the database
        with self.app.app_context():
            task = db.session.get(Task, task_id)
            self.assertIsNotNone(task)
            self.assertEqual(task.title, task_data['title'])
            self.assertEqual(task.description, task_data['description'])

    def test_update_task(self):
        logger.info('Running test_update_task')
        task_id = 1  # Assuming task with ID 1 exists in the database
        updated_task_data = {
            'title': 'Updated Task',
            'description': 'Updated Description'
        }
        response = self.client.put(
            f'/api/v1/tasks/{task_id}', json=updated_task_data)
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertIn('message', data)

        # Verify that the task was updated in the database
        with self.app.app_context():
            task = db.session.get(Task, task_id)
            self.assertEqual(task.title, updated_task_data['title'])
            self.assertEqual(task.description,
            updated_task_data['description'])

    def test_delete_task(self):
        logger.info('Running test_delete_task')
        task_id = 1
        with warnings.catch_warnings():
            warnings.simplefilter("ignore", category=DeprecationWarning)
            response = self.client.delete(f'/api/v1/tasks/{task_id}')
        self.assertEqual(response.status_code, 200, "response ok")
        data = response.json
        self.assertIn('message', data)

        # Verify that the task was deleted from the database
        with self.app.app_context():
            task = db.session.get(Task, task_id)
            self.assertIsNone(task)


if __name__ == '__main__':
    unittest.main()
