from flask import Flask, request, send_file
from PIL import Image, ImageFilter
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route('/blur', methods=['POST'])
def blur_image():
    file = request.files['image']
    if not file:
        return {"error": "No file uploaded"}, 400

    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, f"blurred_{file.filename}")
    file.save(input_path)

    try:
        # Open the image and apply Gaussian blur
        img = Image.open(input_path)
        blurred_img = img.filter(ImageFilter.GaussianBlur(5))  # Radius=5
        blurred_img.save(output_path)

        return send_file(output_path, as_attachment=True)
    except Exception as e:
        print(f"Error processing image: {e}")
        return {"error": "Failed to process image"}, 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
