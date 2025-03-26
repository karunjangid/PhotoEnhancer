from flask import Flask, request, send_file
from models.blur import blur_image
from models.brightness import adjust_brightness
from models.background_removal import remove_background
from models.filters import apply_filter
from models.resolution_upscale import upscale_resolution
import os
from flask_cors import CORS
from PIL import Image, ImageFilter, ImageEnhance


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route('/blur', methods=['POST'])
def blur_image():
    try:
        # Check if file is present in the request
        file = request.files.get('image')
        if not file:
            print("No file uploaded")  # Debug Log
            return {"error": "No file uploaded"}, 400

        # Save uploaded file
        input_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(input_path)
        print(f"File saved to: {input_path}")  # Debug Log

        # Apply Gaussian blur
        output_path = os.path.join(OUTPUT_FOLDER, f"blurred_{file.filename}")
        try:
            img = Image.open(input_path)
            blurred_img = img.filter(ImageFilter.GaussianBlur(5))  # Try Radius=15
            blurred_img.save(output_path)
            print(f"Blurred image saved to: {output_path}")  # Debug Log
        except Exception as e:
            print(f"Image processing error: {e}")  # Debug Log
            return {"error": "Failed to process image"}, 500

        # Return processed image
        return send_file(output_path, as_attachment=True)
    except Exception as e:
        print(f"Unexpected error: {e}")  # Debug Log
        return {"error": "Internal server error"}, 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

@app.route('/brightness', methods=['POST'])
def adjust_brightness_contrast():
    try:
        # Retrieve uploaded file
        file = request.files.get('image')
        if not file:
            return {"error": "No file uploaded"}, 400

        brightness_level = float(request.form.get("brightness", 1.2))  # Default brightness: 1.2
        contrast_level = float(request.form.get("contrast", 1.1))  # Default contrast: 1.1

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

@app.route('/api/background', methods=['POST'])
def background():
    file = request.files['image']
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, f'background_{file.filename}')
    file.save(input_path)
    
    success = remove_background(input_path, output_path)
    if success:
        return send_file(output_path, as_attachment=True)
    return {"error": "Background removal failed."}

@app.route('/api/filters', methods=['POST'])
def filters():
    file = request.files['image']
    filter_type = request.form.get('filter', 'EDGE_ENHANCE')
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, f'filtered_{file.filename}')
    file.save(input_path)
    
    success = apply_filter(input_path, output_path, filter_type)
    if success:
        return send_file(output_path, as_attachment=True)
    return {"error": "Filter application failed."}

@app.route('/api/upscale', methods=['POST'])
def upscale():
    file = request.files['image']
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(OUTPUT_FOLDER, f'upscaled_{file.filename}')
    file.save(input_path)
    
    success = upscale_resolution(input_path, output_path)
    if success:
        return send_file(output_path, as_attachment=True)
    return {"error": "Upscaling resolution failed."}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
