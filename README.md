# MentalidadWeb-Todo

Little task management app.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)

## Installation
This app is completely served by the backend. Here are the steps to run the application:

Navigate to the test2 directory from the root directory:

  ```console
  cd test2/
  ```
  
Activate the virtual environment with pipenv:

  ```console
  pipenv shell
  ```
  
Install the dependencies from the requirements.txt file:
  
  ```console
    pipenv install -r requirements.txt
  ```

Run the development server using the Flask CLI:

  ```console
  python manage.py run
  ```
  
  
You should now be able to access the application in your web browser.

## Usage
Once the application is running, you should be able to perform the following tasks:

  Add a task: You can add a task by entering its respective title and description.
  
  Modify a task: Click on the pen icon next to the task's title or description to modify it.
  
  Delete a task: You can delete tasks as needed.

# Don't forget

Create a .env file in your test2 root directory with the following content:

 ```
  FLASK_APP=manage.py
  REACT_APP_API_URL='http://127.0.0.1:5000/api/v1'
  ```
  
For a better understanding of how the API routes work, refer to the API documentation. This has been created with Swagger and can be accessed at:

```
  http://127.0.0.1:5000/api/v1/documentation
```

## Testing
For run the tests, from test2 folder use the following command:

 ```console
  python manage.py test
```

## Contact
Made by me with 💖
