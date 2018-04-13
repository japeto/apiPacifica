import os
from flask import Flask

# Create Flask Instance (application)
app = Flask('ventaspacifico')

# Import Every function in 'controllers' directory
for base, dirs, names in os.walk(os.path.join('ventapacifico', 'controllers')):
    for name in filter(lambda s: s.endswith('.py') and s != '__init__.py', names) :
        exec('from ventapacifico.controllers.' + name[:-3] + ' import *')

