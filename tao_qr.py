# QR Code Generator for Trung Thu Website

import qrcode

# URL of the Trung Thu website (local file or deployed URL)
url = "https://datjpro.github.io/TrungThu/chuc-mung-trung-thu.html"  # Thay bằng URL thực tế nếu có

# Tạo QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save("qr_trungthu.png")

print("Đã tạo mã QR cho trang web Trung Thu!")
