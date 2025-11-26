from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/audio/<path:filename>')
def audio(filename):
    return send_from_directory('templates/audio', filename)

@app.route('/images/<path:filename>')
def images(filename):
    return send_from_directory('static/images', filename)

@app.route('/upload', methods=['POST'])
def upload_file():
    # En una implementación real, aquí procesarías la imagen subida
    if 'photo' in request.files:
        # Guardar o procesar la imagen
        return jsonify({'success': True, 'message': 'Foto subida correctamente'})
    return jsonify({'success': False, 'message': 'Error al subir la foto'})

if __name__ == '__main__':
    app.run(debug=True)