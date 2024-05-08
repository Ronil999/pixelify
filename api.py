from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
import os
import subprocess
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

UPLOAD_FOLDER = 'input'
OUTPUT_FOLDER = 'output'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

def compress_image(input_path, output_path):
    try:
        image = Image.open(input_path)
        # Perform compression operations here
        compressed_image = image.copy()  # For demonstration, just copying the image without compression
        compressed_image.save(output_path)
        return True
    except Exception as e:
        app.logger.error(f"Error compressing image: {str(e)}")
        return False

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        try:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            subprocess.Popen(['python', 'app.py'])  # Assuming app.py handles image compression
            return jsonify({'message': 'File successfully uploaded', 'filename': filename})
        except Exception as e:
            app.logger.error(f"Error uploading file: {str(e)}")
            return jsonify({'error': 'Failed to upload file'})

@app.route('/output/<filename>', methods=['GET'])
def download_file(filename):
    compressed_image_path = os.path.join(app.config['OUTPUT_FOLDER'], filename)
    if os.path.exists(compressed_image_path):
        return send_file(compressed_image_path, as_attachment=True)
    else:
        return jsonify({'error': 'File not found'})

if __name__ == '__main__':
    app.run(debug=True)
