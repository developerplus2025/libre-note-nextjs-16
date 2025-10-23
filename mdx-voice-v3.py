import os
import re
import asyncio
import edge_tts

SOURCE_DIR = "content/docs"
OUTPUT_DIR = "public/audio/markdown"

VOICE = "en-US-GuyNeural"  # Giọng nam tiếng Anh

def clean_text(text):
    text = re.sub(r"```[\s\S]*?```", "", text)
    text = re.sub(r"^#+\s*", "", text, flags=re.MULTILINE)
    text = re.sub(r"\[(.*?)\]\(.*?\)", r"\1", text)
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    text = re.sub(r"\*(.*?)\*", r"\1", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

async def mdx_to_audio(input_path, output_path):
    with open(input_path, "r", encoding="utf-8") as f:
        content = f.read()

    cleaned = clean_text(content)
    if not cleaned:
        print(f"⚠️ Bỏ qua {input_path} vì rỗng sau khi làm sạch")
        return

    communicate = edge_tts.Communicate(cleaned, VOICE)
    await communicate.save(output_path)
    print(f"✅ Đã tạo: {output_path}")

async def main():
    for root, _, files in os.walk(SOURCE_DIR):
        for file in files:
            if file.endswith(".mdx"):
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, SOURCE_DIR)
                rel_dir = os.path.dirname(rel_path)
                file_name = os.path.splitext(file)[0].lower().replace(" ", "-")
                output_dir = os.path.join(OUTPUT_DIR, rel_dir)
                os.makedirs(output_dir, exist_ok=True)
                output_file = os.path.join(output_dir, f"{file_name}.mp3")
                await mdx_to_audio(file_path, output_file)

if __name__ == "__main__":
    asyncio.run(main())
