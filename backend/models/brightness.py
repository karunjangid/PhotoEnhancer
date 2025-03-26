from PIL import Image, ImageEnhance

def adjust_brightness(input_path, output_path, brightness_level=1.2):
    try:
        img = Image.open(input_path)
        enhancer = ImageEnhance.Brightness(img)
        enhanced_img = enhancer.enhance(brightness_level)
        enhanced_img.save(output_path)
        return True
    except Exception as e:
        print(f"Error in adjust_brightness: {e}")
        return False
