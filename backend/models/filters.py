from PIL import Image, ImageFilter

def apply_filter(input_path, output_path, filter_type="EDGE_ENHANCE"):
    try:
        img = Image.open(input_path)
        
        if filter_type == "BLUR":
            filtered_img = img.filter(ImageFilter.BLUR)
        elif filter_type == "DETAIL":
            filtered_img = img.filter(ImageFilter.DETAIL)
        elif filter_type == "EDGE_ENHANCE":
            filtered_img = img.filter(ImageFilter.EDGE_ENHANCE)
        else:
            raise ValueError(f"Unknown filter type: {filter_type}")
        
        filtered_img.save(output_path)
        return True
    except Exception as e:
        print(f"Error in apply_filter: {e}")
        return False
