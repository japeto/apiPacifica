from flask import (Flask, g, render_template, flash, redirect, url_for, abort, request)
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_bcrypt import check_password_hash
import json
from flask import jsonify
from app import app

import models

@app.route('/favicon.ico')
def fav():
    return jsonify(data={'none': 'none'})

@app.route('/api/')
def api():
    return jsonify(api_version = '1.2.4', api_name = 'jeicker')

@app.route('/api/users/', methods=["POST"])
@app.route('/api/users', methods=["POST"])
def api_users():
    data = json.loads( request.data )
    try:
        user = models.User.get(models.User.email == data['email'].strip())
    except models.DoesNotExist:
        return jsonify({'status': 0, 'error': "Usuario Incorrecto"})
    else:
        if check_password_hash(user.password, data['password'].strip()):
            return jsonify({'status': 1, 'key': 2, 'first_name':user.first_name,
                            'last_name':user.last_name,'house_number':user.house_number,'address_line':user.address_line_1,
                            'is_admin':user.is_admin})
        else:
            return jsonify({'status': 0, 'error': "Usuario Incorrecto"})

    return jsonify({'status': 0, 'error': "Servidor"})

@app.route('/api/users/registration/', methods=['GET', 'POST'])
def api_registration():
    data = json.loads(request.data)
    try:
        user = models.User.get(models.User.email == data['email'].strip())
    except models.DoesNotExist:
        models.User.create_user(
            first_name = data['first_name'],
            last_name = data['last_name'],
            email = data['email'],
            password= data['password'],
            is_admin=False
        )
        user = models.User.get(models.User.email == data['email'].strip())
        return jsonify({'status': 1, 'key': 2, 'first_name': user.first_name,
                'last_name': user.last_name, 'house_number': user.house_number, 'address_line': user.address_line_1,
                'is_admin': user.is_admin})

@app.route('/api/add_product/<int:product_id>', methods=('GET', 'POST'))
@login_required
def api_add_product(product_id):
    if current_user.is_admin:
        all_products = models.Product.select()
        product = models.Product.select().where(models.Product.id == product_id).first()
        form = forms.CreateProductForm()
        if request.method == 'POST':
            models.Product.update_product(
                product_id=product_id,
                product_size=form.product_size.data,
                product_name=form.product_name.data,
                product_description=form.product_description.data,
                product_image_path=form.product_image_path.data,
                product_price=form.product_price.data,
                stock_level=form.stock_level.data,
            )
            flash("Producto actualizadao", "success")
            return redirect(url_for('add_product'))
        form.product_category.data = product.product_category
        form.product_size.data = product.product_size
        form.product_name.data = product.product_name
        form.product_description.data = product.product_description
        form.product_image_path.data = product.product_image_path
        form.product_price.data = product.product_price
        form.stock_level.data = product.stock_level
        return render_template('add_product.html', products=all_products, product_id=product_id,
                               form=form, current_order=g.current_order, current_basket=g.current_basket)
    else:
        abort(404)

@app.route('/api/products/clothes', methods=('POST', 'GET'))
def api_clothes():
    all_products = models.Product.select().where(models.Product.product_category == "clothes").limit(20)
    return jsonify(products=[prd for prd in all_products.dicts()])

@app.route('/api/products/home', methods=['GET'])
def api_fireside():
    all_products = models.Product.select().where(models.Product.product_category == "home").limit(20)
    return jsonify(products=[prd for prd in all_products.dicts()])

@app.route('/api/products/food', methods=['GET'])
def api_food():
    all_products = models.Product.select().where(models.Product.product_category == "food").limit(20)
    return jsonify(products=[prd for prd in all_products.dicts()])

@app.route('/api/products/drinks', methods=['GET'])
def api_drinks():
    all_products = models.Product.select().where(models.Product.product_category == "drinks").limit(20)
    return jsonify(products=[prd for prd in all_products.dicts()])

@app.route('/api/products/others', methods=['GET'])
def api_others():
    all_products = models.Product.select().where(models.Product.product_category == "others").limit(20)
    return jsonify(products=[prd for prd in all_products.dicts()])


app.run(host='0.0.0.0', debug=True, port=5000)