from flask import Flask, request, send_file
from models.blur import blur_image
from models.brightness import adjust_brightness_contrast
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

@app.route("/brightness", methods=["POST"])
def brightness():
    try:
        file = request.files.get("image")
        if not file:
            print("No file provided.")
            return {"error": "No file provided"}, 400

        try:
            brightness_factor = float(request.form.get("brightness", 1.2))
            contrast_factor = float(request.form.get("contrast", 1.1))
        except ValueError:
            return {"error": "Brightness and contrast must be numbers"}, 400

        filename = file.filename
        input_path = os.path.join(UPLOAD_FOLDER, filename)
        output_path = os.path.join(OUTPUT_FOLDER, f"bright_{filename}")

        # Save the uploaded file
        file.save(input_path)
        print(f"File saved: {input_path}")

        # Open the image, convert to RGB if needed (ensures JPEG compatibility)
        img = Image.open(input_path)
        if img.mode != "RGB":
            img = img.convert("RGB")

        # Apply brightness and contrast adjustments
        img = ImageEnhance.Brightness(img).enhance(brightness_factor)
        img = ImageEnhance.Contrast(img).enhance(contrast_factor)

        # Save the processed image as JPEG
        img.save(output_path, "JPEG")
        print(f"Processed file saved: {output_path}")

        # Return the processed image
        return send_file(output_path, mimetype="image/jpeg")
    except Exception as e:
        print("Error processing image:", e)
        return {"error": str(e)}, 500

# Print the URL map for debugging purposes – you should see /brightness listed.
print("Registered routes:")
print(app.url_map)

if __name__ == "__main__":          
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
