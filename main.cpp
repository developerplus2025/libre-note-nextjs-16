#include <QApplication>
#include "pdfconverter.h"

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);
    PDFConverter window;
    window.show();
    return app.exec();
}
