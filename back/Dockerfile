FROM python:3.11
ENV ENV PYTHONUNBUFFERED 1

WORKDIR /api
COPY requirements.txt ./

RUN pip install --no-cache-dir --upgrade pip && \
	pip install --no-cache-dir -r requirements.txt

COPY ./api .

ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]