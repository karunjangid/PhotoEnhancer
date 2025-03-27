from flask import Flask, request, send_file
from PIL import Image, ImageEnhance
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route('/brightness', methods=['POST'])
def adjust_brightness_contrast():
    try:
        # Retrieve uploaded file
        file = request.files.get('image')
        if not file:
            return {"error": "No file uploaded"}, 400

        brightness_level = float(request.form.get("brightness", 1.2))  # Default: 1.2
        contrast_level = float(request.form.get("contrast", 1.1))  # Default: 1.1

        # Save uploaded file
        input_path = os.path.join(UPLOAD_FOLDER, file.filename)
        output_path = os.path.join(OUTPUT_FOLDER, f"brightness_{file.filename}")
        file.save(input_path)

        # Open image and apply enhancements
        img = Image.open(input_path)

        # Adjust brightness
        enhancer = ImageEnhance.Brightness(img)
        brightened_img = enhancer.enhance(brightness_level)

        # Adjust contrast
        enhancer = ImageEnhance.Contrast(brightened_img)
        final_img = enhancer.enhance(contrast_level)

        # Save the processed image
        final_img.save(output_path)

        return send_file(output_path, as_attachment=True)
    except Exception as e:
        print(f"Error during brightness/contrast adjustment: {e}")
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
