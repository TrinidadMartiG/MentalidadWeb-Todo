FROM python:3.8

WORKDIR /backend

COPY requirements.txt /backend/
COPY Pipfile Pipfile.lock /backend/

RUN pip install --upgrade pip \
    && pip install -r /backend/requirements.txt
    
COPY . /backend/

EXPOSE 5000