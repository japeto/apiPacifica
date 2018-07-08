from flask_wtf import Form
from wtforms import StringField, PasswordField, TextAreaField, BooleanField, DecimalField, SelectField, IntegerField
from wtforms.validators import (DataRequired, Regexp, ValidationError, Email,
                                Length, EqualTo)

from models import User, Product


def name_exists(form, field):
    if User.select().where(User.username == field.data).exists():
        raise ValidationError('User with that name already exists')

# custom validator
def email_exists(form, field):
    if User.select().where(User.email == field.data).exists():
        raise ValidationError('User with that email already exists')

def product_exists(form, field):
    if Product.select().where(Product.product_name == field.data).exists():
        raise ValidationError('Product with that name already exists')

class LoginForm(Form):
    email = StringField(
        'Tu Correo',
        validators=[DataRequired(), Email()]
    )

    password = PasswordField(
        'Tu Contraseña',
        validators=[DataRequired()]
    )

class RegisterForm(Form):
    first_name = StringField(
        'Tu Nombre',
        validators=[DataRequired()]
    )

    last_name = StringField(
        'Tus Apellidos',
        validators=[DataRequired()]
    )

    email = StringField(
        'Tu Correo',
        validators=[
            DataRequired(),
            Email(),
            email_exists
        ]
    )

    password = PasswordField(
        'Contraseña',
        validators=[
            DataRequired(),
            Length(min=8),
            EqualTo('password2', message="Passwords must match"),
        ]
    )

    password2 = PasswordField(
        'Repetir contraseña',
        validators=[DataRequired()]
    )

class CreateProductForm(Form):

    product_category = SelectField(
        'Categoria',
        choices=[
            ('blank', 'Categoria'), ('home', 'Hogar'), ('clothes', 'Ropa'), ('food', 'Comida')
            , ('drink', 'Bebidas')
        ]
    )

    product_size = SelectField(
        'Tamaño (Deja en blanco, si no posee tamaño)',
        choices=[
            ('blank', 'Tamaño (Deja en blanco, no posee tamaño)'),
            ('s', 'Small'), ('m', 'Medium'), ('l', 'Large')
        ]
    )

    product_name = StringField(
        'Nombre del Producto',
        validators=[DataRequired(), product_exists]
    )

    product_description = StringField(
        'Descripción',
        validators=[DataRequired()]
    )

    product_image_path = StringField(
        'Imagen',
    )

    product_price = DecimalField(
        'Precio',
        places=2,
        validators=[DataRequired()]
    )

    stock_level = IntegerField(
        'Cantidad agregada',
        validators=[DataRequired()]
    )

class AddToBasket(Form):
    quantity = SelectField(
        'Cantidad',
        choices=[]
    )
