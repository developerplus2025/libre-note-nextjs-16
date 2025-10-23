#include <QApplication>
#include <QWidget>
#include <QPushButton>
#include <QVBoxLayout>
#include <QFileDialog>
#include <QProcess>
#include <QMessageBox>
#include <QLabel>

class PDFConverter : public QWidget {
    Q_OBJECT

public:
    PDFConverter(QWidget *parent = nullptr) : QWidget(parent) {
        auto *layout = new QVBoxLayout(this);
        auto *label = new QLabel("Chuyển đổi PDF sang Word (.docx)", this);
        label->setAlignment(Qt::AlignCenter);
        auto *selectButton = new QPushButton("Chọn file PDF", this);

        connect(selectButton, &QPushButton::clicked, this, &PDFConverter::convertPDF);

        layout->addWidget(label);
        layout->addWidget(selectButton);
        setLayout(layout);
        setWindowTitle("PDF to Word Converter");
        resize(300, 150);
    }

private slots:
    void convertPDF() {
        QString pdfFile = QFileDialog::getOpenFileName(this, "Chọn file PDF", "", "PDF Files (*.pdf)");
        if (pdfFile.isEmpty()) return;

        QString outputDir = QFileDialog::getExistingDirectory(this, "Chọn thư mục xuất");
        if (outputDir.isEmpty()) return;

        // Gọi LibreOffice CLI để chuyển đổi PDF sang DOCX
        QProcess process;
        QStringList args;
        args << "--headless" << "--convert-to" << "docx" << "--outdir" << outputDir << pdfFile;

        process.start("soffice", args);
        process.waitForFinished();

        if (process.exitCode() == 0) {
            QMessageBox::information(this, "Thành công", "Đã chuyển đổi thành công!");
        } else {
            QMessageBox::critical(this, "Lỗi", "Không thể chuyển đổi PDF.");
        }
    }
};

#include "main.moc"

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);
    PDFConverter window;
    window.show();
    return app.exec();
}
