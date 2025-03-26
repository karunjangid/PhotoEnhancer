import cv2
import numpy as np

def remove_background(input_path, output_path):
    try:
        img = cv2.imread(input_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, mask = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)
        result = cv2.bitwise_and(img, img, mask=mask)
        cv2.imwrite(output_path, result)
        return True
    except Exception as e:
        print(f"Error in remove_background: {e}")
        return False
