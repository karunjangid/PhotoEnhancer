import cv2

def upscale_resolution(input_path, output_path, scale=2):
    try:
        img = cv2.imread(input_path)
        height, width = img.shape[:2]
        upscaled_img = cv2.resize(img, (width * scale, height * scale), interpolation=cv2.INTER_CUBIC)
        cv2.imwrite(output_path, upscaled_img)
        return True
    except Exception as e:
        print(f"Error in upscale_resolution: {e}")
        return False
