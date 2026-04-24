# GeoNutria Project Makefile

.PHONY: infra-up infra-down auth-install user-install billing-install

infra-up:
	docker-compose -f docker-compose.infra.yml up -d

infra-down:
	docker-compose -f docker-compose.infra.yml down

auth-install:
	cd auth-service && composer install

user-install:
	cd user-service && composer install

billing-install:
	cd billing-service && composer install

install-all: auth-install user-install billing-install
