FROM python:3.11-slim

WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv && pipenv install --deploy --ignore-pipfile

COPY . .

EXPOSE 5000

ENV FLASK_APP=index
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=production
ENV DB_USERNAME=root
ENV DB_PASSWORD=lia123
ENV DB_HOST=127.0.0.1
ENV DB_DATABASE=vapestore
ENV SECRET_KEY=ABCDEFG
ENV STORAGE=http://127.0.0.1:5000/
ENV UPLOAD_FOLDER=static/upload_image

CMD ["pipenv", "run", "flask", "run"]
