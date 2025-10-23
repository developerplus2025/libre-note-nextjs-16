#ifndef PDFCONVERTER_H
#define PDFCONVERTER_H

#include <QWidget>

class QPushButton;
class QLabel;

class PDFConverter : public QWidget {
    Q_OBJECT

public:
    PDFConverter(QWidget *parent = nullptr);

private slots:
    void convertPDF();

private:
    QLabel *label;
    QPushButton *selectButton;
};

#endif // PDFCONVERTER_H
