from flask import (Flask, g, render_template, flash, redirect, url_for, abort, request)
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_bcrypt import check_password_hash
import base64, forms, models
import jinja2

app = Flask(__name__)
app.secret_key = "AWAWDFAHJDFGYDFHTSRGARSFGATDHDFDdfhtfngn"

login_manager = LoginManager(app)
login_manager.login_view = 'login'

def format_currency(format, value):
    return "$ {:,.0f}".format(value)

jinja2.filters.FILTERS['format_currency'] = format_currency

@login_manager.user_loader
def load_user(userid):
    try:
        return models.User.get(models.User.id == userid)
    except models.DoesNotExist:
        return None

@app.before_request
def before_request():
    """Connect to the database before each request"""

    g.db = models.db
    g.db.connect()
    g.user = current_user

    g.current_order = models.Order.find_current_order(current_user)
    g.current_basket = models.Order.get_current_basket(g.current_order, current_user)

@app.after_request
def after_request(response):
    """Close database connection after each request"""
    g.db.close()
    return response

@app.route('/login', methods=('GET', 'POST'))
def login():
    form = forms.LoginForm()
    if form.validate_on_submit():
        try:
            user = models.User.get(models.User.email == form.email.data)
        except models.DoesNotExist:
            flash("Email or password incorrect", "error")
        else:
            if check_password_hash(user.password, form.password.data):
                login_user(user)
                return redirect(url_for('index'))
            else:
                flash("Email or password incorrect", "error")
    return render_template('login.html', form=form)

@app.route('/registration', methods=('GET', 'POST'))
def register():
    form = forms.RegisterForm()
    if form.validate_on_submit():
        models.User.create_user(
            first_name=form.first_name.data.title(),
            last_name=form.last_name.data.title(),
            email=form.email.data,
            password=form.password.data,
            is_admin=False
        )
        return redirect(url_for('login'))

    return render_template('registration.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    # flash("", "success")
    return redirect(url_for('login'))

@app.route('/add_product', methods=('GET', 'POST'))
@login_required
def add_product():
    if current_user.is_admin:
        form = forms.CreateProductForm()
        f = form.product_image.data
        all_products = models.Product.select()
        if form.validate_on_submit():
            models.Product.create_product(
                product_category=form.product_category.data,
                product_size=form.product_size.data,
                product_name=form.product_name.data,
                product_description=form.product_description.data,
                product_image= base64.b64encode(form.product_image.data.read()),
                product_price=form.product_price.data,
                stock_level=form.stock_level.data,
            )
            flash("Producto agregado", "success")
            return redirect(url_for('add_product'))
        return render_template('add_product.html', products=all_products,
                               form=form, current_order=g.current_order, current_basket=g.current_basket)
    else:
        abort(404)

@app.route('/edit_product/<int:product_id>', methods=['GET', 'POST'])
@login_required
def edit_product(product_id):
    if current_user.is_admin:
        all_products = models.Product.select()
        product = models.Product.select().where(models.Product.id == product_id).first()
        form = forms.CreateProductForm()
        if request.method == 'POST':
            models.Product.update_product(
                product_id=product_id,
                product_category=form.product_category.data,
                product_size=form.product_size.data,
                product_name=form.product_name.data,
                product_description=form.product_description.data,
                product_image=base64.b64encode(form.product_image.data.read()) if form.product_image.data else None,
                product_price=form.product_price.data,
                stock_level=form.stock_level.data,
            )
            flash("Producto actualizadao", "success")
            return redirect(url_for('add_product'))
        form.product_category.data = product.product_category
        form.product_size.data = product.product_size
        form.product_name.data = product.product_name
        form.product_description.data = product.product_description
        form.product_image.data = product.product_image
        form.product_price.data = product.product_price
        form.stock_level.data = product.stock_level
        return render_template('edit_product.html', products=all_products, product_id=product_id,
                               form=form, current_order=g.current_order, current_basket=g.current_basket)
    else:
        abort(404)


@app.route('/products/clothes', methods=('POST', 'GET'))
def clothes():
    all_products = models.Product.select().where(models.Product.product_category == "clothes").limit(20)
    return render_template('products.html', products=all_products,
                           current_order=g.current_order, current_basket=g.current_basket)

@app.route('/products/home', methods=('POST', 'GET'))
def fireside():
    all_products = models.Product.select().where(models.Product.product_category == "home").limit(20)
    return render_template('products.html', products=all_products,
                           current_order=g.current_order, current_basket=g.current_basket)

@app.route('/products/food', methods=('POST', 'GET'))
def food():
    all_products = models.Product.select().where(models.Product.product_category == "food").limit(20)
    return render_template('products.html', products=all_products,
                           current_order=g.current_order, current_basket=g.current_basket)

@app.route('/products/drinks', methods=('POST', 'GET'))
def drinks():
    all_products = models.Product.select().where(models.Product.product_category == "drink").limit(20)
    return render_template('products.html', products=all_products,
                           current_order=g.current_order, current_basket=g.current_basket)

@app.route('/products/others', methods=('POST', 'GET'))
def others():
    all_products = models.Product.select().where(models.Product.product_category == "others").limit(20)
    return render_template('products.html', products=all_products,
                           current_order=g.current_order, current_basket=g.current_basket)

@app.route('/add_to_order/<int:product_id>', methods=('POST', 'GET'))
@login_required
def add_to_order(product_id):
    # https://bootsnipp.com/snippets/orOGB
    if request.method == 'POST':
        quantity = int(request.form.get('quantity'))
        if g.current_order:
            for line in g.current_order.order_lines:
                if product_id == line.product_id:
                    models.OrderLine.update_line_quantity(line.id, quantity)
                    models.Product.update_stock(product_id, quantity, "reduce")
                    break
            else:
                models.OrderLine.create_order_line(product_id, g.current_order.id, quantity)
                models.Product.update_stock(product_id, quantity, "reduce")
            flash("Agregado al carrito", "success")
        else:
            models.Order.create_order(current_user.id)
            g.current_order = models.Order.find_current_order(current_user)
            models.OrderLine.create_order_line(product_id, g.current_order.id, quantity)
            models.Product.update_stock(product_id, quantity, "reduce")
            flash("Agregado al carrito", "success")
    return redirect(url_for('index'))

@app.route('/remove_from_order/<int:order_line_id>/<int:product_id>/<int:quantity>')
@login_required
def remove_from_order(order_line_id, product_id, quantity):
    models.OrderLine.remove_order_line(order_line_id)
    models.Product.update_stock(product_id, quantity, "add")
    flash("Producto Eliminado del carrito", "success")
    return redirect(url_for('basket', user_id=current_user.id, current_order=g.current_order, current_basket=g.current_basket))

@app.route('/basket/<int:user_id>')
@login_required
def basket(user_id):
    return render_template('basket.html', current_order=g.current_order, current_basket=g.current_basket)

@app.route('/account/<int:user_id>')
@login_required
def account(user_id):
    return render_template('account.html', current_order=g.current_order, current_basket=g.current_basket)

@app.route('/remove_account/<int:user_id>')
def remove_account(user_id):
    if user_id == 1:
        flash("Can not delete the built in administrator account", "error")
        return redirect(url_for('account', user_id=current_user.id))
    else:
        models.User.remove_user(user_id)
        return redirect(url_for('logout'))

@app.route('/update_account/<int:user_id>')
def update_account(user_id):
    if user_id == 1:
        flash("Can not delete the built in administrator account", "error")
        return redirect(url_for('account', user_id=current_user.id))
    else:
        models.User.remove_user(user_id)
        return redirect(url_for('logout'))

@app.route('/')
def index():
    all_products = models.Product.select()
    return render_template('index.html', user=current_user, products=all_products,
                           current_order=g.current_order, current_basket=g.current_basket)

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html', current_order=g.current_order, current_basket=g.current_basket),


# if __name__ == '__main__':
models.initialize()
try:
    models.User.create_user(
        first_name='Administrador',
        last_name='Administrador',
        email='admin@lonuestro.com.co',
        password='Admin*100',
        is_admin=True
    )
except ValueError:
    pass
