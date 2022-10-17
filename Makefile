APP_NAME = goals-web-app
APP_VERSION = v1
APP_BIN = server

DOCKERHUB_USER=mixedmachine


.PHONY: local-run dev pipeline test dockerfile image image-push image-run compose prod


build: 
	echo "Installing dependencies and building $(APP_NAME) $(APP_VERSION)..."
	npm install
	npm run build

local-run: build
	echo "Running $(APP_NAME) $(APP_VERSION)..."
	serve -s build

dev:
	echo "Running dev server..."
	npm start

pipeline:
	echo "Linting react code..."
	npm run lint

test:
	echo "Running tests..."
	npm test

dockerfile:
	npm run build

image:
	docker build -f ./builder/Dockerfile -t $(APP_NAME):latest .
	docker build -f ./builder/Dockerfile -t $(APP_NAME):$(APP_VERSION) .

image-push:
	docker tag $(APP_NAME):latest $(DOCKERHUB_USER)/$(APP_NAME):latest
	docker tag $(APP_NAME):$(APP_VERSION) $(DOCKERHUB_USER)/$(APP_NAME):$(APP_VERSION)

	docker push $(DOCKERHUB_USER)/$(APP_NAME):latest
	docker push $(DOCKERHUB_USER)/$(APP_NAME):$(APP_VERSION)

# This will not be able to connect to other apps unless you change the .env
# to a reachable host. Instead use compose.
image-run: image
	docker run -d \
	-p 80:80 \
	--env-file .env \
	--name $(APP_NAME) \
	$(APP_NAME):latest

compose: image
	docker compose -f ./builder/docker-compose.app.yml up -d

prod:
	docker compose -f ./builder/docker-compose.prod.yml down
	docker pull $(DOCKERHUB_USER)/$(APP_NAME):$(APP_VERSION)
	docker compose -f ./builder/docker-compose.prod.yml up -d

clean:
	rm -fr ./build
	docker rm -f $(APP_NAME)
	docker compose -f ./builder/docker-compose.app.yml down
