from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import wikipedia
import logging
import time
import sys

# Bật log nếu muốn debug
logging.basicConfig(level=logging.INFO)

# Đặt ngôn ngữ Wikipedia sang tiếng Việt
wikipedia.set_lang("vi")

# Hàm hiệu ứng gõ từng ký tự


def typing_effect(text, delay=0.02):
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()  # Xuống dòng


# Tạo ChatBot có trí nhớ
bot = ChatBot(
    'SmartBot',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        'chatterbot.logic.BestMatch'
    ],
    database_uri='sqlite:///db.sqlite3'
)

# Huấn luyện cơ bản (nếu chưa có)
trainer = ListTrainer(bot)
trainer.train([
    "Chào bạn",
    "Chào bạn, tôi là SmartBot!",
    "Bạn tên là gì?",
    "Tôi là một trợ lý ảo thông minh.",
    "Bạn có khỏe không?",
    "Tôi hoạt động ổn định, cảm ơn bạn."
])

# Giao tiếp
print("SmartBot đã sẵn sàng. Hãy hỏi tôi bất cứ điều gì!")

while True:
    try:
        user_input = input("Bạn: ")

        # Trả lời từ ChatBot
        response = bot.get_response(user_input)

        # Nếu độ tin cậy thấp → tìm Wikipedia
        if float(response.confidence) < 0.4:
            try:
                page = wikipedia.page(user_input)
                content = page.content
                typing_effect("Bot (Wikipedia): " + content)
            except wikipedia.exceptions.DisambiguationError as e:
                typing_effect("Bot: Chủ đề không rõ ràng. Bạn có thể chọn:")
                for option in e.options[:5]:
                    typing_effect(" - " + option)
            except wikipedia.exceptions.PageError:
                typing_effect(
                    "Bot: Xin lỗi, tôi không tìm thấy thông tin phù hợp.")
        else:
            typing_effect("Bot: " + str(response))

    except (KeyboardInterrupt, EOFError):
        typing_effect("\nKết thúc trò chuyện. Tạm biệt!")
        break
