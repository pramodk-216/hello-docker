from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("index.html")

@app.route('/name')
def name():
    with open('name.txt', 'r') as file:
        names = [line.strip() for line in file.readlines() if line.strip()]
        return jsonify(names)

if __name__ == '__main__':
    app.run( debug=False, port=8000, host='0.0.0.0')