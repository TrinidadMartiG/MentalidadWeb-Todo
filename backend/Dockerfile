FROM python:3.8

WORKDIR /backend

COPY requirements.txt .

COPY Pipfile Pipfile.lock ./

RUN python -m pip install --upgrade pip
RUN pip install pipenv && \
pip install -r requirements.txt

COPY . /usr/src/app/

EXPOSE 5000

