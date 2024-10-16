from flask import Flask, render_template, request, redirect, url_for, jsonify
import validation as vd
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


@app.route('/services')
def services():
    return render_template("services.html")


@app.route('/blog')
def blog():
    return render_template("blog.html")


@app.route('/about')
def about():
    return render_template("about.html")


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'GET':
        return render_template("contact.html")
    if request.method == 'POST':
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
            msg = Message('Message from ' + name, sender='no-reply@domain.com', recipients=["mitchiwillis@gmail.com"])
            msg.body = ("You have received a Message from " + name + "\n\n" + "Message: " + message + "\n\n"
                        + "Email: " + email + "\n" + "Phone number: " + phone + "\n\n\n" + "*DO NOT REPLY*")
            mail.send(msg)
            return jsonify({'message': 'Success, Message Sent.'}), 200


if __name__ == '__main__':
    app.run(debug=True)
