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
            print("No file uploaded")
            return {"error": "No file uploaded"}, 400
        print(f"File received: {file.filename}")

        # Validate brightness and contrast
        try:
            brightness_level = float(request.form.get("brightness", 1.2))
            contrast_level = float(request.form.get("contrast", 1.1))
        except ValueError as e:
            print(f"Invalid brightness or contrast value: {e}")
            return {"error": "Brightness and contrast must be numbers"}, 400
        print(f"Brightness level: {brightness_level}, Contrast level: {contrast_level}")

        # Save uploaded file
        input_path = os.path.join(UPLOAD_FOLDER, file.filename)
        output_path = os.path.join(OUTPUT_FOLDER, f"brightness_{file.filename}")
        file.save(input_path)
        print(f"File saved at: {input_path}")

        # Open image and apply enhancements
        try:
            img = Image.open(input_path)
            img.verify()  # Check image validity
            img = Image.open(input_path)  # Reopen after verification
            if img.mode != "RGB":
                img = img.convert("RGB")  # Convert to RGB for compatibility
            print(f"Image format: {img.format}, Mode: {img.mode}")

            # Adjust brightness and contrast
            enhancer = ImageEnhance.Brightness(img)
            brightened_img = enhancer.enhance(brightness_level)
            enhancer = ImageEnhance.Contrast(brightened_img)
            final_img = enhancer.enhance(contrast_level)

            # Save the processed image
            final_img.save(output_path, "JPEG")
            print(f"Processed image saved at: {output_path}")
        except Exception as e:
            print(f"Error during brightness/contrast adjustment: {e}")
            return {"error": "Failed to adjust brightness/contrast"}, 500

        return send_file(output_path, as_attachment=True)
    except Exception as e:
        print(f"Unexpected error: {e}")
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
