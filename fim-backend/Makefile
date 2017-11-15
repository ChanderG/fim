BINDIR = $(HOME)/bin
NADIR = $(HOME)/.mozilla/native-messaging-hosts

install:
	# 755 is default
	install -D -m 755 fim_backend "$(BINDIR)"/fim_backend
	install -D -m 755 fim_backend.json "$(NADIR)"/fim_backend.json

uninstall:
	rm -f "$(BINDIR)"/fim_backend
	rm -f "$(NADIR)"/fim_backend.json
