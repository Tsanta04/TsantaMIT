#include "liste.h"
#include<QHBoxLayout>
#include<QLabel>

Liste::Liste() {
    wi->setStyleSheet("border-radius: 28px;background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 0,stop: 0 #FF4400,stop: 0.5 #FF007F,stop: 1 #8A2BE2);font: 700 9pt \"Script\";color: rgb(255, 255, 255);");
    labNum->setStyleSheet("border: 2px solid white;background-color:transparent;");
    labName->setStyleSheet("border: 2px solid white;background-color:transparent;");
    layout->addWidget(labNum);
    layout->addWidget(labName);
    wi->setLayout(layout);
}

Liste::~Liste(){
}

Liste::addData(int num, QString name){
    labNum->setText(QString::number(num));
    labName->setText(name);
}
