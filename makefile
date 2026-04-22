.PHONY: build start start2 clean edit update update-modules

IP := $(shell ifconfig en0 | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $$2}')

build: clean
	cd exampleSite && \
	hugo --minify --gc

start: clean
	cd exampleSite && \
	hugo server --navigateToChanged --buildDrafts --buildFuture --openBrowser --port 1313

clean:
	rm -rf public resources exampleSite/public exampleSite/resources

edit:
	zed . &
	$(MAKE) start

start2: clean
	cd exampleSite && \
	hugo server --navigateToChanged --buildDrafts --buildFuture --bind $(IP) --baseURL http://$(IP)

update: update-modules

update-modules:
	hugo mod get -u && \
	hugo mod tidy
