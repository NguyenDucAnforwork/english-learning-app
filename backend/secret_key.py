import secrets
secret_key = secrets.token_hex(32)  # Tạo một chuỗi ngẫu nhiên dài 64 ký tự
print(secret_key)