PROJECT := $(notdir $(CURDIR))
PORT ?= 8080

# Targets that don't result in output of the same name.
.PHONY: clean \
        distclean \
        lint \
        format \
        test \
        debug \
        release \
        start

# Target that cleans build output and installed dependencies.
distclean: clean
	@echo "Nothing to do for target '$@'"

# Target that cleans build output
clean:
	@echo "Nothing to do for target '$@'"

# Target that checks the code for style/formating issues.
format: 
	@echo "Nothing to do for target '$@'"

# Target that lints the code for errors.
lint:
	@echo "Nothing to do for target '$@'"

# Target to run all unit tests.
test: 
	@echo "Nothing to do for target '$@'"

# Target that builds a debug/development version of the project
debug:
	@echo "Nothing to do for target '$@'"

# Target that builds a release version of the project
release:
	@echo "Nothing to do for target '$@'"

# Target that starts a local instance of the project.
start:
	@echo "Starting '$(PROJECT)' on 'http://localhost:$(PORT)'..."
	@docker run --rm --name $(PROJECT) -p $(PORT):80 -e NGINX_ENTRYPOINT_QUIET_LOGS=1 -v $(CURDIR)/src:/usr/share/nginx/html/:ro nginx:alpine