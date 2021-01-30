FRONT_NAME=moma-front
PROXY_NAME=moma-proxy

build:
	docker-compose build --no-cache

start:
	docker-compose up -d

stop:
	docker-compose stop

restart:
	docker-compose stop; docker-compose rm -f; \
	cd application; yarn run build; cd ../; \
	docker-compose up -d

down:
	docker-compose down

sh:
	docker exec -it $(FRONT_NAME) /bin/sh

install:
	cd application; yarn install;

log:
	docker logs -f ${PROXY_NAME}
