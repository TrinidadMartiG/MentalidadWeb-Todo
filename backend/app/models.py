from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


db = SQLAlchemy()
migrate = Migrate(compare_type=True)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(250))
    complete = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return '<Title %r>' % self.title

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "desciption": self.description,
            # do not serialize the password, its a security breach
        }