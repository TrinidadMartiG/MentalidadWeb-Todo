FROM python

WORKDIR /test2

COPY requirements.txt .

COPY Pipfile Pipfile.lock ./

RUN python -m pip install --upgrade pip
RUN pip install pipenv && \
pipenv install --dev --system --deploy

COPY . .

EXPOSE 5000

CMD ["python", "manage.py", "run", "--host","0.0.0.0","--port","5001"]
