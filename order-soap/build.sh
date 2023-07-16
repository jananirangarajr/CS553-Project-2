docker stop ordersystem
docker rm ordersystem
docker build -t ordersystem .
docker run -p 8001:8001 ordersystem