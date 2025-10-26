CURRENT_UID:=CURRENT_UID=$$(id -u):$$(id -g)
DOCKER := ${CURRENT_UID} docker
DOCKER_COMPOSE := ${DOCKER} compose

start:
	${DOCKER_COMPOSE} up -d

down:
	${DOCKER_COMPOSE} down

stop: down

build:
	${DOCKER} exec -it trend-analysis-card-npm npm run build
