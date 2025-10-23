# import subprocess
from PyQt6.QtCore import Qt
from PyQt6.QtGui import QFont, QIcon
import os
from pdf2docx import Converter
from PyQt6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QLabel,
    QPushButton, QFileDialog, QMessageBox, QSpacerItem, QSizePolicy
)

import sys
from PyQt6.QtWidgets import QApplication, QWidget
from manim import *
text = """

 ███████╗██╗      ██████╗ ██████╗  █████╗     ██╗   ██╗ ██╗███████╗███████╗ █████╗
 ██╔════╝██║     ██╔═══██╗██╔══██╗██╔══██╗    ██║   ██║███║██╔════╝╚════██║██╔══██╗
 █████╗  ██║     ██║   ██║██████╔╝███████║    ██║   ██║╚██║███████╗    ██╔╝╚██████║
 ██╔══╝  ██║     ██║   ██║██╔══██╗██╔══██║    ╚██╗ ██╔╝ ██║╚════██║   ██╔╝  ╚═══██║
 ██║     ███████╗╚██████╔╝██║  ██║██║  ██║     ╚████╔╝  ██║███████║██╗██║██╗█████╔╝
 ╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝      ╚═══╝   ╚═╝╚══════╝╚═╝╚═╝╚═╝╚════╝

"""
print(text)

# subprocess.run("npm run postinstall", shell=True, check=True)
# subprocess.run("npm run dev", shell=True, check=True)


class PDFtoWordConverter(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PDF ➜ Word Converter")
        self.setFixedSize(450, 300)
        self.setWindowIcon(QIcon("icon.png"))  # Nếu bạn có file icon.png

        # Layout chính
        layout = QVBoxLayout()
        layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.setContentsMargins(30, 30, 30, 30)
        layout.setSpacing(20)

        # Tiêu đề
        self.title_label = QLabel("Chuyển đổi PDF sang Word")
        self.title_label.setFont(QFont("Arial", 16, QFont.Weight.Bold))
        self.title_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(self.title_label)

        # Nhãn chọn file
        self.file_label = QLabel("Chưa chọn file PDF nào.")
        self.file_label.setFont(QFont("Arial", 11))
        self.file_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(self.file_label)

        # Nút chọn file
        self.select_button = QPushButton("📁 Chọn file PDF")
        self.select_button.setFont(QFont("Arial", 12))
        self.select_button.clicked.connect(self.select_pdf)
        layout.addWidget(self.select_button)

        # Nút chuyển đổi
        self.convert_button = QPushButton("🔄 Chuyển sang Word")
        self.convert_button.setFont(QFont("Arial", 12))
        self.convert_button.setEnabled(False)
        self.convert_button.clicked.connect(self.convert_to_word)
        layout.addWidget(self.convert_button)

        # Spacer để dãn cách
        layout.addItem(QSpacerItem(
            20, 40, QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding))

        self.setLayout(layout)
        self.pdf_path = ""

    def select_pdf(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self, "Chọn file PDF", "", "PDF Files (*.pdf)")
        if file_path:
            self.pdf_path = file_path
            file_name = os.path.basename(file_path)
            self.file_label.setText(f"Đã chọn: {file_name}")
            self.convert_button.setEnabled(True)

    def convert_to_word(self):
        if not self.pdf_path:
            QMessageBox.warning(self, "Lỗi", "Vui lòng chọn file PDF.")
            return

        save_path, _ = QFileDialog.getSaveFileName(
            self, "Lưu file Word", "", "Word Documents (*.docx)")
        if save_path:
            try:
                converter = Converter(self.pdf_path)
                converter.convert(save_path, start=0, end=None)
                converter.close()
                QMessageBox.information(
                    self, "Thành công", f"Đã lưu file Word tại:\n{save_path}")
            except Exception as e:
                QMessageBox.critical(
                    self, "Lỗi", f"Lỗi khi chuyển đổi:\n{str(e)}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = PDFtoWordConverter()
    window.show()
    sys.exit(app.exec())
