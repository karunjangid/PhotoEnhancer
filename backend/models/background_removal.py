import cv2
import numpy as np

def remove_background(input_path, output_path, threshold_value=200, blur_kernel=(5, 5)):
    try:
        img = cv2.imread(input_path)
        if img is None:
            print(f"Error: Cannot read image at {input_path}")
            return False

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray, blur_kernel, 0)
        _, mask = cv2.threshold(gray, threshold_value, 255, cv2.THRESH_BINARY_INV)
        result = cv2.bitwise_and(img, img, mask=mask)
        cv2.imwrite(output_path, result)
        return True
    except Exception as e:
        print(f"Error in remove_background: {e}")
        return False
