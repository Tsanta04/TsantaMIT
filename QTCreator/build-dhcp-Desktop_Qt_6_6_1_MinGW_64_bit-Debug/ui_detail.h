/********************************************************************************
** Form generated from reading UI file 'detail.ui'
**
** Created by: Qt User Interface Compiler version 6.6.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_DETAIL_H
#define UI_DETAIL_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QFrame>
#include <QtWidgets/QLabel>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Detail
{
public:
    QWidget *centralwidget;
    QLabel *label;
    QLabel *label_3;
    QFrame *line;
    QLabel *label_4;
    QLabel *label_5;
    QLabel *label_6;
    QLabel *label_7;
    QLabel *label_8;
    QLabel *label_9;
    QLabel *num_pan;
    QLabel *ref;
    QLabel *addr;
    QLabel *enps0;
    QLabel *wifi;
    QPushButton *pushButton;
    QPushButton *pushButton_2;
    QPushButton *pushButton_3;
    QLabel *label_10;
    QLabel *etat;
    QMenuBar *menubar;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *Detail)
    {
        if (Detail->objectName().isEmpty())
            Detail->setObjectName("Detail");
        Detail->resize(800, 713);
        centralwidget = new QWidget(Detail);
        centralwidget->setObjectName("centralwidget");
        label = new QLabel(centralwidget);
        label->setObjectName("label");
        label->setGeometry(QRect(30, 210, 591, 111));
        QFont font;
        font.setFamilies({QString::fromUtf8("KacstPoster")});
        font.setPointSize(16);
        label->setFont(font);
        label_3 = new QLabel(centralwidget);
        label_3->setObjectName("label_3");
        label_3->setGeometry(QRect(290, 40, 241, 151));
        line = new QFrame(centralwidget);
        line->setObjectName("line");
        line->setGeometry(QRect(0, 330, 841, 20));
        line->setFrameShape(QFrame::HLine);
        line->setFrameShadow(QFrame::Sunken);
        label_4 = new QLabel(centralwidget);
        label_4->setObjectName("label_4");
        label_4->setGeometry(QRect(90, 360, 181, 19));
        QFont font1;
        font1.setFamilies({QString::fromUtf8("Laksaman")});
        font1.setPointSize(14);
        font1.setBold(true);
        font1.setItalic(true);
        label_4->setFont(font1);
        label_5 = new QLabel(centralwidget);
        label_5->setObjectName("label_5");
        label_5->setGeometry(QRect(90, 420, 151, 19));
        QFont font2;
        font2.setFamilies({QString::fromUtf8("Courier 10 Pitch")});
        font2.setPointSize(14);
        font2.setBold(true);
        label_5->setFont(font2);
        label_6 = new QLabel(centralwidget);
        label_6->setObjectName("label_6");
        label_6->setGeometry(QRect(100, 460, 141, 19));
        label_6->setFont(font2);
        label_7 = new QLabel(centralwidget);
        label_7->setObjectName("label_7");
        label_7->setGeometry(QRect(100, 500, 211, 19));
        label_7->setFont(font2);
        label_8 = new QLabel(centralwidget);
        label_8->setObjectName("label_8");
        label_8->setGeometry(QRect(100, 540, 141, 19));
        label_8->setFont(font2);
        label_9 = new QLabel(centralwidget);
        label_9->setObjectName("label_9");
        label_9->setGeometry(QRect(100, 580, 141, 19));
        label_9->setFont(font2);
        num_pan = new QLabel(centralwidget);
        num_pan->setObjectName("num_pan");
        num_pan->setGeometry(QRect(250, 420, 321, 19));
        ref = new QLabel(centralwidget);
        ref->setObjectName("ref");
        ref->setGeometry(QRect(250, 460, 321, 19));
        addr = new QLabel(centralwidget);
        addr->setObjectName("addr");
        addr->setGeometry(QRect(250, 500, 321, 19));
        enps0 = new QLabel(centralwidget);
        enps0->setObjectName("enps0");
        enps0->setGeometry(QRect(250, 540, 321, 19));
        wifi = new QLabel(centralwidget);
        wifi->setObjectName("wifi");
        wifi->setGeometry(QRect(250, 580, 321, 19));
        pushButton = new QPushButton(centralwidget);
        pushButton->setObjectName("pushButton");
        pushButton->setGeometry(QRect(370, 630, 100, 27));
        pushButton_2 = new QPushButton(centralwidget);
        pushButton_2->setObjectName("pushButton_2");
        pushButton_2->setGeometry(QRect(490, 630, 100, 27));
        pushButton_3 = new QPushButton(centralwidget);
        pushButton_3->setObjectName("pushButton_3");
        pushButton_3->setGeometry(QRect(610, 630, 100, 27));
        label_10 = new QLabel(centralwidget);
        label_10->setObjectName("label_10");
        label_10->setGeometry(QRect(100, 610, 141, 19));
        label_10->setFont(font2);
        etat = new QLabel(centralwidget);
        etat->setObjectName("etat");
        etat->setGeometry(QRect(250, 610, 321, 19));
        Detail->setCentralWidget(centralwidget);
        menubar = new QMenuBar(Detail);
        menubar->setObjectName("menubar");
        menubar->setGeometry(QRect(0, 0, 800, 22));
        Detail->setMenuBar(menubar);
        statusbar = new QStatusBar(Detail);
        statusbar->setObjectName("statusbar");
        Detail->setStatusBar(statusbar);

        retranslateUi(Detail);

        QMetaObject::connectSlotsByName(Detail);
    } // setupUi

    void retranslateUi(QMainWindow *Detail)
    {
        Detail->setWindowTitle(QCoreApplication::translate("Detail", "MainWindow", nullptr));
        label->setText(QCoreApplication::translate("Detail", "TextLabel", nullptr));
        label_3->setText(QCoreApplication::translate("Detail", "TextLabel", nullptr));
        label_4->setText(QCoreApplication::translate("Detail", "PC info", nullptr));
        label_5->setText(QCoreApplication::translate("Detail", " PAN       :", nullptr));
        label_6->setText(QCoreApplication::translate("Detail", "Reference :", nullptr));
        label_7->setText(QCoreApplication::translate("Detail", "IP        :", nullptr));
        label_8->setText(QCoreApplication::translate("Detail", "Enps025   :", nullptr));
        label_9->setText(QCoreApplication::translate("Detail", "WLAN      :", nullptr));
        num_pan->setText(QCoreApplication::translate("Detail", "TextLabel", nullptr));
        ref->setText(QCoreApplication::translate("Detail", "TextLabel", nullptr));
        addr->setText(QCoreApplication::translate("Detail", "TextLabel", nullptr));
        enps0->setText(QCoreApplication::translate("Detail", "TextLabel", nullptr));
        wifi->setText(QCoreApplication::translate("Detail", "TextLabel", nullptr));
        pushButton->setText(QCoreApplication::translate("Detail", "Modifier", nullptr));
        pushButton_2->setText(QCoreApplication::translate("Detail", "Supprimer", nullptr));
        pushButton_3->setText(QCoreApplication::translate("Detail", "OK", nullptr));
        label_10->setText(QCoreApplication::translate("Detail", "Etat      :", nullptr));
        etat->setText(QCoreApplication::translate("Detail", "Etat:", nullptr));
    } // retranslateUi

};

namespace Ui {
    class Detail: public Ui_Detail {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_DETAIL_H
