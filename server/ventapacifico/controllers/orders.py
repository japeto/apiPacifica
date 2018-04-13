
from flask import render_template, jsonify, request, make_response
from ventapacifico import app

api = '/api/'
version = '1.0'

@app.route('/',methods=['GET', 'POST'])
@app.route('/'+api+version,methods=['GET', 'POST'])
def to_index():
	response = make_response(jsonify({'success': 'read documentation'}), 200)
	response.status_code = 200
	return response

@app.route(api+version+'/orders/', methods=['GET'])
def get_orders():
	try:
		offset = request.args.get('offset', default = 1, type = int)
		limit = request.args.get('limit', default = 10, type = int)

		resp = [{
		  "order_id": 1,
		  "order_number": "83883-9393-90",
		  "customer_id": "1",
		  "products": [
		    {
		      "product_id": 1,
		      "image_id":3,
		      "quantity": 12
		    },
		    {
		      "product_id": 2,
		      "image_id":2,
		      "quantity": 2
		    },
		    {
		      "product_id": 12,
		      "image_id":12,
		      "quantity": 8
		    }
		  ]
		}]

		return jsonify({'orders': resp})
	except Exception as e:
		return not_found('Sorry, We coudnt not find your order')

@app.route(api+version+'/orders/<int:order_number>', methods=['GET'])
def get_order(order_number):
	try:
		print(len(str(order_number)))

		if (len(str(order_number)) != 8):
			pass

		if (len(resp) == 0):
			bad_request('Incorrect order number')
	except Exception as e:
		raise not_found('Sorry, We coudnt not find your order')

@app.route(api+version+'/orders/<int:order_id>/product', methods=['GET'])
def get_order_product(order_id):
	try:
		print (len(str(order_id)))
		bad_request('order_id')
	except Exception as e:
		raise not_found('Sorry, We coudnt not find your order')

@app.route(api+version+'/orders/customer/<int:customer_id>', methods=['GET'])
def get_order_customer(customer_id):
	try:
		print (len(str(customer_id)))
		bad_request('customer')
	except Exception as e:
		raise not_found('Sorry, We coudnt not find your order')

@app.route(api+version+'/doorder/', methods = ['POST'])
def new_order():
	try:
		pass
	except:
		return internal_error('Something went wrong:)')

@app.route(api+version+'/editorder/', methods = ['PUT'])
def edit_order():
	try:
		pass
	except:
		return internal_error('Something went wrong:)')

@app.route(api+version+'/delorder/', methods = ['DEL'])
def del_order():
	try:
		pass
	except:
		return internal_error('Something went wrong:)')



@app.errorhandler(404)
def not_found(error):
	if error:
		print(error)
		error = {'error':str(error), 'type': "no_found_error"}
	else:
		error = {'type': "no_found_error"}
	response = make_response(jsonify(error), 404)
	response.status_code = 404
	return response
def success_request(message):
    response = jsonify({'message': message})
    response.status_code = 200
    return response	
def bad_request(message):
    response = jsonify({'message': message})
    response.status_code = 400
    return response
	
def internal_error(message):
    response = jsonify({'message': message})
    response.status_code = 500
    return response