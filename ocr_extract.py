#!/usr/bin/env python3
"""Extract all text from mockup image using Tesseract OCR."""

import pytesseract
from PIL import Image, ImageFilter, ImageEnhance

img_path = "bbb37a11-eca4-4dab-86e8-c118f56af164.png"
img = Image.open(img_path)

# Upscale for better OCR (3x)
w, h = img.size
img_large = img.resize((w * 3, h * 3), Image.LANCZOS)

# Sharpen
img_sharp = img_large.filter(ImageFilter.SHARPEN)
enhancer = ImageEnhance.Contrast(img_sharp)
img_contrast = enhancer.enhance(1.5)

# Full page OCR with German + English, preserve layout
full_text = pytesseract.image_to_string(
    img_contrast,
    lang="deu+eng",
    config="--psm 4"  # assume single column of variable-size text
)

print("=" * 60)
print("FULL PAGE OCR (layout-preserving)")
print("=" * 60)
print(full_text)

# Also try with detailed bounding boxes for positional info
print("\n" + "=" * 60)
print("DETAILED OCR WITH POSITIONS")
print("=" * 60)

data = pytesseract.image_to_data(
    img_contrast,
    lang="deu+eng",
    config="--psm 4",
    output_type=pytesseract.Output.DICT
)

# Group by blocks
current_block = -1
current_par = -1
for i in range(len(data["text"])):
    text = data["text"][i].strip()
    if not text:
        continue
    block = data["block_num"][i]
    par = data["par_num"][i]
    top = data["top"][i]
    left = data["left"][i]
    conf = int(data["conf"][i])

    if block != current_block or par != current_par:
        # Estimate section based on vertical position (image height ~4500px at 3x)
        y_pct = round(top / (h * 3) * 100)
        print(f"\n--- Block {block}, Par {par} (y≈{y_pct}%, conf avg) ---")
        current_block = block
        current_par = par

    if conf > 30:  # Only reasonably confident text
        print(f"  [{conf:3d}%] {text}", end=" ")

print()
