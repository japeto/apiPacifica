#!/usr/bin/python
import sys
#sys.path.insert(0, '')
from wsgiref.handlers import CGIHandler
from main import app
CGIHandler().run(app)