FROM python:3.9

WORKDIR /home

COPY ./requirements.txt /home/requirements.txt

RUN pip install --no-cache-dir -r /home/requirements.txt

COPY ./car.py ./db_connect.py ./main.py /home/app/

ENV PYTHONPATH "${PYTHONPATH}:/home/app/"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]