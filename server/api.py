from flask import (Flask, g, render_template, flash, redirect, url_for, abort, request)
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_bcrypt import check_password_hash
from flask import jsonify
from app import app

@app.route('/apiv1')
def api():
    return jsonify({'user': 'dsds', 'access_token': 'sdsdsdsd'})

app.run(host='0.0.0.0', debug=False, port=5000)