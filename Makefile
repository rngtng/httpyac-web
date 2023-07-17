### Viewing
.PHONY: docs # Start local documentation server, connect on http://localhost:4000/
docs:
	docker run --init -it --rm -p 4000:4000 -v $(CURDIR)/dist:/usr/src/app starefossen/github-pages

update:
	docker run -it --rm --pull always -v $(CURDIR):/data --entrypoint npm ghcr.io/anweber/httpyac update

dev2:
	docker run -it --rm --pull always -u root -v $(CURDIR):/data --entrypoint bash ghcr.io/anweber/httpyac

dev:
	docker run -it --rm --pull always -w /data -u root -v $(CURDIR):/data --entrypoint bash node

clean:
	rm -rf node_modules/
