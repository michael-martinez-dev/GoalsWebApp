APP_NAME = goals-web-app
APP_VERSION = v1
APP_BIN = server

DOCKERHUB_USER=mixedmachine


.PHONY: db dev pipeline test dockerfile image image-push image-run compose 


build: 


db:
	docker compose -f ./build/docker-compose.db.yml up -d

dev: db build 
	echo "Running dev server"
	npm start

pipeline:
	echo "Linting react code..."
	npm run lint

test:
	echo "Running tests..."
	npm test

dockerfile:
	npm build

image:
	docker build -f ./build/Dockerfile -t $(APP_NAME):latest .
	docker build -f ./build/Dockerfile -t $(APP_NAME):$(APP_VERSION) .

image-push:
	docker tag $(APP_NAME):latest $(DOCKERHUB_USER)/$(APP_NAME):latest
	docker tag $(APP_NAME):$(APP_VERSION) $(DOCKERHUB_USER)/$(APP_NAME):$(APP_VERSION)

	docker push $(DOCKERHUB_USER)/$(APP_NAME):latest
	docker push $(DOCKERHUB_USER)/$(APP_NAME):$(APP_VERSION)

# This will not be able to connect to other apps unless you change the .env
# to a reachable host. Instead use compose.
image-run: image
	docker run -d \
	-p 8080:8080 \
	--env-file .env \
	--name $(APP_NAME) \
	$(APP_NAME):latest

compose: image
	docker compose -f ./build/docker-compose.db.yml up --build -d
	docker compose -f ./build/docker-compose.app.yml up --build -d

clean:
	rm -f ./bin/$(APP_BIN)
	docker rm -f $(APP_NAME)
	docker compose -f ./build/docker-compose.db.yml down
	docker compose -f ./build/docker-compose.app.yml down
