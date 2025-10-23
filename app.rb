require 'gtk3'

app = Gtk::Application.new("com.example.RubyApp", :flags_none)

app.signal_connect "activate" do |application|
  window = Gtk::ApplicationWindow.new(application)
  window.set_title("Hello Ruby")
  window.set_default_size(300, 100)

  button = Gtk::Button.new(label: "Nhấn vào tôi!")
  button.signal_connect "clicked" do
    puts "Xin chào từ Ruby GTK!"
  end

  window.add(button)
  window.show_all
end

puts "Khởi chạy ứng dụng..."
app.run
