import os
import re
from gtts import gTTS

# Thư mục chứa các file .mdx
SOURCE_DIR = "content/docs"
# Thư mục xuất file audio
OUTPUT_DIR = "public/audio/markdown"

def clean_text(text: str) -> str:
    """Xóa markdown syntax và làm sạch nội dung để đọc mượt hơn"""
    # Xóa code block ```...```
    text = re.sub(r"```[\s\S]*?```", "", text)
    # Xóa tiêu đề markdown (#, ##, ### ...)
    text = re.sub(r"^#+\s*", "", text, flags=re.MULTILINE)
    # Xóa link [text](url)
    text = re.sub(r"\[(.*?)\]\(.*?\)", r"\1", text)
    # Xóa in đậm/in nghiêng **text**, *text*
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    text = re.sub(r"\*(.*?)\*", r"\1", text)
    # Xóa khoảng trắng thừa
    text = re.sub(r"\s+", " ", text).strip()
    return text

def mdx_to_audio(input_path: str, output_path: str):
    """Chuyển file mdx sang audio"""
    with open(input_path, "r", encoding="utf-8") as f:
        content = f.read()

    cleaned = clean_text(content)
    if not cleaned:
        print(f"⚠️ Bỏ qua {input_path} vì rỗng sau khi làm sạch")
        return

    tts = gTTS(text=cleaned, lang="en", slow=False)
    tts.save(output_path)
    print(f"✅ Đã tạo: {output_path}")

def main():
    for root, _, files in os.walk(SOURCE_DIR):
        for file in files:
            if file.endswith(".mdx"):
                file_path = os.path.join(root, file)
                
                # Lấy đường dẫn tương đối và thay tên file
                rel_path = os.path.relpath(file_path, SOURCE_DIR)
                rel_dir = os.path.dirname(rel_path)
                file_name = os.path.splitext(os.path.basename(file))[0]
                
                # Chuyển tên sang dạng lowercase và thay khoảng trắng bằng dấu '-'
                file_name = file_name.lower().replace(" ", "-")
                
                # Thư mục output
                output_dir = os.path.join(OUTPUT_DIR, rel_dir)
                os.makedirs(output_dir, exist_ok=True)
                
                # Đường dẫn file mp3
                output_file = os.path.join(output_dir, f"{file_name}.mp3")
                
                # Chuyển đổi
                mdx_to_audio(file_path, output_file)

if __name__ == "__main__":
    main()
