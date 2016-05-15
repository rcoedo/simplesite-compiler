NAME=simplesite-compiler
USER=rcoedo
VERSION=0.0.3

TAG=$(USER)/$(NAME):$(VERSION)

build:
	docker build --rm -t $(TAG) .

push:
	docker push $(TAG)

clean:
	docker rmi $(TAG)
