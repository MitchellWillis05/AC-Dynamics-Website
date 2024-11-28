from flask import Flask, render_template, request, redirect, url_for, jsonify
import validation as vd
import calculator as calc
from flask_mail import Mail, Message
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'acdynamicscontact@gmail.com'
app.config['MAIL_PASSWORD'] = "cwfk qdnn pbuz matd"
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/services', methods=['GET', 'POST'])
def services():
    if request.method == 'GET':
        return render_template("services.html")
    elif request.method == 'POST':
        return jsonify({'message': 'METHOD NOT ALLOWED'}), 405


@app.route('/calculate', methods=['GET', 'POST'])
def calculate():
    if request.method == 'GET':
        return render_template("services.html")
    elif request.method == 'POST':
        form_type = request.form.get("form_type")

        try:
            if form_type == "single-room":
                # Convert values to float and check for negatives
                width = float(request.form["width"])
                length = float(request.form["length"])
                height = float(request.form["height"])
                outdoor_temp = float(request.form["outdoor-temp"])
                insulation_single = float(request.form["insulation-single"])

                # Validate inputs
                if any(value < 0 for value in [width, length, height]):
                    return jsonify({'message': 'Error: All values must be non-negative.'}), 400
                if any(value > 100 for value in [width, length, height]):
                    return jsonify({'message': 'Error: Values are too high.'}), 400

                # Calculate kW for single room
                kw = calc.calculate_heating_single(width, length, height, outdoor_temp, insulation_single)
                kw = round(kw, 1)
                if kw < 0.1:
                    kw = 0.1
                return jsonify({'message': 'Success, kW calculated', 'kw': kw}), 200

            elif form_type == "whole-house":
                # Convert values to float and check for negatives
                house_area = float(request.form["house-area"])
                house_height = float(request.form["house-height"])
                outdoor_temp = float(request.form["outdoor-temp-house"])
                insulation_single = float(request.form["insulation-house"])

                # Validate inputs
                if any(value < 0 for value in [house_area, house_height]):
                    return jsonify({'message': 'Error: All values must be non-negative.'}), 400
                if any(value > 100 for value in [house_area, house_height]):
                    return jsonify({'message': 'Error: Values are too high.'}), 400

                # Calculate kW for whole house
                kw = calc.calculate_heating_whole_house(house_area, house_height, outdoor_temp, insulation_single)
                kw = round(kw, 1)
                if kw < 0.1:
                    kw = 0.1
                return jsonify({'message': 'Success, kW calculated', 'kw': kw}), 200

            else:
                return jsonify({'message': 'Invalid form type'}), 400

        except ValueError:
            return jsonify({'message': 'Error: Invalid input, please ensure all values are entered.'}), 400


@app.route('/calculator')
def blog():
    return render_template("blog.html")


@app.route('/about')
def about():
    return render_template("about.html")


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'GET':
        return render_template("contact.html")
    elif request.method == 'POST':
        email = request.form['email']
        phone = request.form['phone']
        name = request.form['name']
        message = request.form['message']
        if not vd.is_valid_email(email):
            return jsonify({'message': 'Invalid email.'}), 400
        elif not vd.is_valid_phone(phone):
            return jsonify({'message': 'Invalid phone.'}), 400
        elif len(name) < 1:
            return jsonify({'message': 'Name too short.'}), 400
        elif len(name) > 100:
            return jsonify({'message': 'Name too long.'}), 400
        elif len(message) < 10:
            return jsonify({'message': 'Message too short.'}), 400
        elif len(message) > 500:
            return jsonify({'message': 'Message too long.'}), 400
        else:
            msg = Message('Message from ' + name, sender='no-reply@domain.com', recipients=["WebsiteEnquiry@acdynamics.co.nz"])
            msg.body = ("You have received a Message from " + name + "\n\n" + "Message: " + message + "\n\n"
                        + "Email: " + email + "\n" + "Phone number: " + phone + "\n\n\n" + "*DO NOT REPLY*")
            mail.send(msg)
            return jsonify({'message': 'Success, Message Sent.'}), 200


if __name__ == '__main__':
    app.run(debug=True)
