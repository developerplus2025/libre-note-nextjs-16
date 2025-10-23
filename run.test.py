import os
import re
import pyttsx3

# Hàm slugify để chuẩn hóa tên file
def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text

# Đường dẫn thư mục MDX
mdx_root = "content/docs"
# Thư mục output audio
output_root = "public/audio/markdown"

# Khởi tạo TTS
engine = pyttsx3.init()
engine.setProperty('rate', 150)

# Quét tất cả file .mdx trong thư mục
for root, _, files in os.walk(mdx_root):
    for file in files:
        if file.endswith(".mdx"):
            mdx_path = os.path.join(root, file)
            
            # Lấy đường dẫn tương đối để giữ cấu trúc thư mục
            rel_path = os.path.relpath(mdx_path, mdx_root)
            rel_dir = os.path.dirname(rel_path)
            
            # Đọc nội dung file MDX
            with open(mdx_path, "r", encoding="utf-8") as f:
                text = f.read()
            
            # Tên file audio chuẩn hóa
            filename = slugify(os.path.splitext(file)[0]) + ".mp3"
            audio_dir = os.path.join(output_root, rel_dir)
            audio_path = os.path.join(audio_dir, filename)
            
            # Tạo thư mục nếu chưa có
            os.makedirs(audio_dir, exist_ok=True)
            
            # Chuyển văn bản thành giọng nói và lưu file
            try:
                engine.save_to_file(text, audio_path)
                engine.runAndWait()
                print(f"✅ Đã tạo: {audio_path}")
            except Exception as e:
                print(f"❌ Lỗi khi tạo audio cho {file}: {e}")

print("🎯 Hoàn tất tạo audio cho toàn bộ file MDX.")
