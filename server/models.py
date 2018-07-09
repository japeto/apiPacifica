import datetime
from peewee import *
from flask import flash
from flask_login import UserMixin
from flask_bcrypt import generate_password_hash

# db = SqliteDatabase('orderapp.db')
db = MySQLDatabase('BAZAPACIFICA', user='bazapacifica', passwd='JuanBaza*2')

class User(UserMixin, Model):
    first_name = CharField()
    last_name = CharField()
    email = CharField(unique=True)
    password = CharField(max_length=100)
    joined_at = DateTimeField(default=datetime.datetime.now)
    is_admin = BooleanField(default=False)
    is_banned = BooleanField(default=False)
    house_number = CharField(default='')
    address_line_1 = CharField(default='')
    address_line_2 = CharField(default='')
    post_code = CharField(default='')

    class Meta:
        database = db

    @classmethod
    def create_user(cls, first_name, last_name, email, password, is_admin):
        try:
            cls.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=generate_password_hash(password),
                is_admin=is_admin
            )
        except IntegrityError:
            raise ValueError("User already exists")

    @classmethod
    def remove_user(cls, user_id):
        user = cls.get(id=user_id)
        user.delete_instance()

    @classmethod
    def add_address(cls, house_number, address_line_1, address_line_2, post_code):
        cls.update(
            house_number=house_number,
            address_line_1=address_line_1,
            address_line_2=address_line_2,
            post_code=post_code,
        )

class Product(Model):
    product_name = CharField(unique=True)
    product_description = TextField()
    product_image_path = CharField()
    product_added = DateField(default=datetime.datetime.now)
    product_price = DoubleField()
    product_category = CharField()
    product_size = CharField(default=False)
    stock_level = IntegerField(default=0)

    class Meta:
        database = db

    @classmethod
    def create_product(cls, product_category, product_size, product_name,
                       product_description, product_image_path, product_price, stock_level):
        try:
            cls.create(
                product_category=product_category,
                product_size=product_size,
                product_name=product_name,
                product_description=product_description,
                product_image_path=product_image_path,
                product_price=product_price,
                stock_level=stock_level
            )
        except IntegrityError:
            raise ValueError("Este Producto ya existe")

    @classmethod
    def update_product(cls, product_id, product_size, product_name,
                       product_description, product_image_path, product_price, stock_level):
        try:
            product=cls(
                id=product_id,
                product_size=product_size,
                product_name=product_name,
                product_description=product_description,
                product_image_path=product_image_path,
                product_price=product_price,
                stock_level=stock_level
            )
            product.save()
        except IntegrityError:
            raise ValueError("Este Producto ya existe")

    @classmethod
    def update_stock(cls, product_id, quantity, add_or_reduce):
        if add_or_reduce == "reduce":
            new_stock = cls.stock_level - quantity
        else:
            new_stock = cls.stock_level + quantity
        product = cls(id=product_id, stock_level=new_stock)
        product.save()

class Order(Model):
    user = ForeignKeyField(User, related_name='orders')
    order_date = DateField(default=datetime.datetime.now)
    order_complete = BooleanField(default=False)
    order_total = DecimalField(default=0)

    class Meta:
        database = db

    @classmethod
    def create_order(cls, user):
        cls.create(user=user)

    @classmethod
    def find_current_order(cls, user):
        if user.is_authenticated:
            orders = user.orders.select()
            for order in orders:
                if not order.order_complete:
                    return order
                else:
                    return None
        else:
            return None

    @classmethod
    def get_current_basket(cls, order, user):
        if user.is_authenticated and order != None:
            current_basket = 0
            for line in order.order_lines:
                current_basket += line.quantity
            return current_basket
        else:
            return None

class OrderLine(Model):
    product = ForeignKeyField(Product, related_name='order_line')
    order = ForeignKeyField(Order, related_name='order_lines')
    quantity = IntegerField(default=0)

    class Meta:
        database = db

    @classmethod
    def create_order_line(cls, product, order, quantity):
        cls.create(
            product=product,
            order=order,
            quantity=quantity
        )

    @classmethod
    def remove_order_line(cls, order_line_id):
        order_line = cls.get(id=order_line_id)
        order_line.delete_instance()

    @classmethod
    def update_line_quantity(cls, order_line_id, quantity_to_add):
        new_quantity = cls.quantity + quantity_to_add
        order_line = cls(id=order_line_id, quantity=new_quantity)
        order_line.save()

def initialize():
    db.connect()
    db.create_tables([User, Product, Order, OrderLine], safe=True)
    db.close()