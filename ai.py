from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
import wikipedia
import logging

# Bật log nếu muốn xem chi tiết
logging.basicConfig(level=logging.INFO)

# Đặt ngôn ngữ Wikipedia sang tiếng Việt
wikipedia.set_lang("vi")

# Tạo ChatBot có trí nhớ
bot = ChatBot(
    'SmartBot',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        'chatterbot.logic.BestMatch'
    ],
    database_uri='sqlite:///db.sqlite3'
)

# Huấn luyện cơ bản một vài câu (tuỳ chọn)
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

        # Gửi vào ChatBot
        response = bot.get_response(user_input)

        # Nếu độ tin cậy thấp → chuyển sang Wikipedia
        if float(response.confidence) < 0.4:
            try:
                page = wikipedia.page(user_input)
                summary = page.summary
                print("Bot (Wikipedia):", summary)
            except wikipedia.exceptions.DisambiguationError as e:
                print("Bot: Chủ đề không rõ ràng. Bạn có thể chọn:")
                print(" - " + "\n - ".join(e.options[:5]))
            except wikipedia.exceptions.PageError:
                print("Bot: Xin lỗi, tôi không tìm thấy thông tin phù hợp.")
        else:
            print("Bot:", response)

    except (KeyboardInterrupt, EOFError):
        print("\nKết thúc trò chuyện.")
        break
