docker network create new-network --subnet 172.18.0.0/16
docker pull mongodb/mongodb-community-server
docker stop mongo
docker rm mongo
docker run --name mongo --network new-network -p 7777:27017 -e MONGODB_CONTAINER_NAME=mongo -d mongodb/mongodb-community-server:latest

docker build -t automobile .
docker stop automobile
docker rm automobile
docker run --name automobile -p 8000:8000 --network new-network --env MONGODB_CONTAINER_NAME=mongo -d automobile