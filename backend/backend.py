from flask import Flask
from flask import current_app, flash, jsonify, make_response, redirect, request, url_for

app = Flask(__name__)

izdelki = [
    { 'id': 0, 'podjetje': 'MAC Cosmetics', 'naziv': "Lipglass", 'kategorija': 'ustnice', 'casTrajanja': '12', 'crtnaKoda':'1234567' }
]

odprtja = [
    { 'id': 0, 'usporabnikId': 0, 'izdelekId': 0, 'datumOdprtja': '4.1.2023', 'rok': '4.1.2024' }
]

uporabniki = [
    { 'id': 0, 'ime': 'Martina', 'priimek': 'Tivadar', 'uporabniskoIme': 'martinativadar', 'email': 'martinativadar123@gmail.com' }
]

ocene = [
    { 'id': 0, 'ocena': 5, 'uporabnikId': 0, 'idelekId': 0 }
]

@app.errorhandler(Exception)
def server_error(err):
    app.logger.exception(err)
    return "exception", 500

@app.route('/izdelki')
def get_izdelki():
    return jsonify(izdelki)

@app.route('/odprtja')
def get_odprtja():
    return jsonify(odprtja)

@app.route('/uporabniki')
def get_uporabniki():
    return jsonify(uporabniki)

@app.route('/ocene')
def get_ocene():
    return jsonify(ocene)


@app.route('/izdelki', methods=['POST'])
def add_izdelki():
    izdelki.append(request.get_json())
    return '', 200

@app.route('/odprtja', methods=['POST'])
def add_odprtja():
    odprtja.append(request.get_json())
    return '', 200

@app.route('/uporabniki', methods=['POST'])
def add_uporabniki():
    uporabniki.append(request.get_json())
    return '', 200

@app.route('/ocene', methods=['POST'])
def add_ocene():
    ocene.append(request.get_json())
    return '', 200


@app.route('/izdelki/<int:id>', methods=['DELETE'])
def delete_izdelki(id):
    izdelki.pop(id)
    return '', 200

@app.route('/odprtja/<int:id>', methods=['DELETE'])
def delete_odprtja(id):
    odprtja.pop(id)
    return '', 200

@app.route('/uporabniki/<int:id>', methods=['DELETE'])
def delete_uporabniki(id):
    uporabniki.pop(id)
    return '', 200

@app.route('/ocene/<int:id>', methods=['DELETE'])
def delete_ocene(id):
    ocene.pop(id)
    return '', 200

#Ukaz za zagon: python3 -m flask --app backend run
