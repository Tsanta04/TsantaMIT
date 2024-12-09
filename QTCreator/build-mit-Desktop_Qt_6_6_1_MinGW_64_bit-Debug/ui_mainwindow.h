/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 6.6.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtGui/QIcon>
#include <QtWidgets/QApplication>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QScrollArea>
#include <QtWidgets/QStackedWidget>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QToolButton>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralwidget;
    QStackedWidget *main;
    QWidget *lister;
    QWidget *menu;
    QLineEdit *input;
    QPushButton *search;
    QPushButton *l2;
    QPushButton *l3;
    QPushButton *m1;
    QPushButton *m2;
    QPushButton *all;
    QComboBox *comboBox;
    QWidget *Option;
    QWidget *verticalLayoutWidget;
    QVBoxLayout *verticalLayout_2;
    QPushButton *del_tout;
    QPushButton *del_reseau;
    QPushButton *l1;
    QScrollArea *scrollArea;
    QWidget *scrollAreaWidgetContents;
    QPushButton *add;
    QWidget *information;
    QLabel *photo_6;
    QWidget *horizontalLayoutWidget_25;
    QHBoxLayout *horizontalLayout_29;
    QLabel *label_30;
    QLineEdit *name;
    QWidget *horizontalLayoutWidget_26;
    QHBoxLayout *horizontalLayout_30;
    QLabel *label_31;
    QLineEdit *macE;
    QWidget *horizontalLayoutWidget_27;
    QHBoxLayout *horizontalLayout_31;
    QLabel *label_32;
    QLineEdit *macW;
    QWidget *horizontalLayoutWidget_28;
    QHBoxLayout *horizontalLayout_32;
    QLabel *label_33;
    QLineEdit *serial;
    QHBoxLayout *horizontalLayout_33;
    QLabel *label_34;
    QLineEdit *pan;
    QWidget *horizontalLayoutWidget_29;
    QHBoxLayout *horizontalLayout_34;
    QLabel *label_35;
    QLineEdit *ip;
    QWidget *horizontalLayoutWidget_30;
    QHBoxLayout *horizontalLayout_35;
    QLabel *label_36;
    QLineEdit *etat;
    QPushButton *go_edit;
    QPushButton *corbeil;
    QPushButton *editer;
    QToolButton *quit;
    QToolButton *addImg;
    QLineEdit *serial_3;
    QLabel *label_9;
    QWidget *ajouter;
    QWidget *fenetre;
    QLabel *photo;
    QWidget *horizontalLayoutWidget;
    QHBoxLayout *horizontalLayout_36;
    QLabel *label_2;
    QLineEdit *inof_name;
    QWidget *horizontalLayoutWidget_2;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label_3;
    QLineEdit *info_macE;
    QWidget *horizontalLayoutWidget_3;
    QHBoxLayout *horizontalLayout_3;
    QLabel *label;
    QLineEdit *info_macW;
    QWidget *horizontalLayoutWidget_4;
    QHBoxLayout *horizontalLayout_4;
    QLabel *label_5;
    QLineEdit *info_serial;
    QHBoxLayout *horizontalLayout_5;
    QLabel *label_6;
    QLineEdit *info_pan;
    QWidget *horizontalLayoutWidget_6;
    QHBoxLayout *horizontalLayout_6;
    QLabel *label_7;
    QLineEdit *info_ip;
    QWidget *horizontalLayoutWidget_7;
    QHBoxLayout *horizontalLayout_7;
    QLabel *label_8;
    QLineEdit *info_etat;
    QPushButton *submit_add;
    QToolButton *toolButton;
    QPushButton *go_to_list;
    QLabel *label_4;
    QLabel *label_37;
    QMenuBar *menubar;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName("MainWindow");
        MainWindow->resize(1000, 700);
        centralwidget = new QWidget(MainWindow);
        centralwidget->setObjectName("centralwidget");
        main = new QStackedWidget(centralwidget);
        main->setObjectName("main");
        main->setGeometry(QRect(0, 0, 1001, 681));
        lister = new QWidget();
        lister->setObjectName("lister");
        menu = new QWidget(lister);
        menu->setObjectName("menu");
        menu->setGeometry(QRect(30, 30, 931, 221));
        menu->setStyleSheet(QString::fromUtf8("border-radius: 18px;\n"
"padding: 10px;\n"
"background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 0,stop: 0 #FF4400,stop: 0.5 #FF007F,stop: 1 #8A2BE2);"));
        input = new QLineEdit(menu);
        input->setObjectName("input");
        input->setGeometry(QRect(150, 50, 631, 41));
        input->setStyleSheet(QString::fromUtf8("background-color:white;\n"
"font: 10pt \"Small Fonts\";\n"
"padding-left: 70px;"));
        search = new QPushButton(menu);
        search->setObjectName("search");
        search->setGeometry(QRect(150, 50, 51, 41));
        search->setStyleSheet(QString::fromUtf8("background-color:white;\n"
"border-radius: 18px;"));
        QIcon icon;
        QString iconThemeName = QString::fromUtf8("image-loading");
        if (QIcon::hasThemeIcon(iconThemeName)) {
            icon = QIcon::fromTheme(iconThemeName);
        } else {
            icon.addFile(QString::fromUtf8("../build-mit-Desktop_Qt_6_6_1_MinGW_64_bit-Debug/icon/search.png"), QSize(), QIcon::Normal, QIcon::Off);
        }
        search->setIcon(icon);
        l2 = new QPushButton(menu);
        l2->setObjectName("l2");
        l2->setGeometry(QRect(210, 130, 61, 61));
        l2->setStyleSheet(QString::fromUtf8("border-radius: 30px;\n"
"color: rgb(255, 85, 127);\n"
"font: 700 9pt \"System\";\n"
"background-color: rgb(255, 255, 255);\n"
"font: 600 12pt \"Segoe UI Semibold\";"));
        l3 = new QPushButton(menu);
        l3->setObjectName("l3");
        l3->setGeometry(QRect(350, 130, 61, 61));
        l3->setStyleSheet(QString::fromUtf8("border-radius: 30px;\n"
"color: rgb(255, 0, 127);\n"
"font: 700 9pt \"System\";\n"
"background-color: rgb(255, 255, 255);\n"
"font: 600 12pt \"Segoe UI Semibold\";"));
        m1 = new QPushButton(menu);
        m1->setObjectName("m1");
        m1->setGeometry(QRect(490, 130, 61, 61));
        m1->setStyleSheet(QString::fromUtf8("border-radius: 30px;\n"
"color: rgb(255, 33, 244);\n"
"font: 700 9pt \"System\";\n"
"background-color: rgb(255, 255, 255);\n"
"font: 600 12pt \"Segoe UI Semibold\";"));
        m2 = new QPushButton(menu);
        m2->setObjectName("m2");
        m2->setGeometry(QRect(640, 130, 61, 61));
        m2->setStyleSheet(QString::fromUtf8("border-radius: 30px;\n"
"color: rgb(85, 0, 127);\n"
"font: 700 9pt \"System\";\n"
"background-color: rgb(255, 255, 255);\n"
"font: 600 12pt \"Segoe UI Semibold\";"));
        all = new QPushButton(menu);
        all->setObjectName("all");
        all->setGeometry(QRect(780, 130, 61, 61));
        all->setStyleSheet(QString::fromUtf8("border-radius: 30px;\n"
"font: 700 9pt \"System\";\n"
"background-color: rgb(255, 255, 255);\n"
"font: 600 12pt \"Segoe UI Semibold\";"));
        comboBox = new QComboBox(menu);
        comboBox->addItem(QString());
        comboBox->addItem(QString());
        comboBox->addItem(QString());
        comboBox->addItem(QString());
        comboBox->addItem(QString());
        comboBox->addItem(QString());
        comboBox->addItem(QString());
        comboBox->addItem(QString());
        comboBox->addItem(QString());
        comboBox->setObjectName("comboBox");
        comboBox->setGeometry(QRect(690, 50, 91, 41));
        comboBox->setStyleSheet(QString::fromUtf8("background-color:transparent;\n"
"font: 10pt \"Segoe UI\";\n"
"padding-left:0px;\n"
"color: rgb(238, 0, 255);\n"
"font: 700 9pt \"System\";"));
        Option = new QWidget(menu);
        Option->setObjectName("Option");
        Option->setGeometry(QRect(710, 40, 181, 91));
        verticalLayoutWidget = new QWidget(Option);
        verticalLayoutWidget->setObjectName("verticalLayoutWidget");
        verticalLayoutWidget->setGeometry(QRect(0, 0, 220, 90));
        verticalLayout_2 = new QVBoxLayout(verticalLayoutWidget);
        verticalLayout_2->setObjectName("verticalLayout_2");
        verticalLayout_2->setContentsMargins(0, 0, 0, 0);
        del_tout = new QPushButton(verticalLayoutWidget);
        del_tout->setObjectName("del_tout");
        del_tout->setStyleSheet(QString::fromUtf8("border: 2px solid white;"));

        verticalLayout_2->addWidget(del_tout);

        del_reseau = new QPushButton(verticalLayoutWidget);
        del_reseau->setObjectName("del_reseau");
        del_reseau->setStyleSheet(QString::fromUtf8("border: 2px solid white;"));

        verticalLayout_2->addWidget(del_reseau);

        l1 = new QPushButton(menu);
        l1->setObjectName("l1");
        l1->setGeometry(QRect(100, 120, 61, 61));
        l1->setStyleSheet(QString::fromUtf8("border-radius: 30px;\n"
"color: rgb(255, 85, 0);\n"
"font: 700 9pt \"System\";\n"
"background-color: rgb(255, 255, 255);\n"
"font: 600 12pt \"Segoe UI Semibold\";"));
        scrollArea = new QScrollArea(lister);
        scrollArea->setObjectName("scrollArea");
        scrollArea->setGeometry(QRect(0, 280, 1011, 331));
        scrollArea->setStyleSheet(QString::fromUtf8("border:0px solid white;\n"
"padding:0px;\n"
""));
        scrollArea->setWidgetResizable(true);
        scrollAreaWidgetContents = new QWidget();
        scrollAreaWidgetContents->setObjectName("scrollAreaWidgetContents");
        scrollAreaWidgetContents->setGeometry(QRect(0, 0, 1011, 331));
        scrollArea->setWidget(scrollAreaWidgetContents);
        add = new QPushButton(lister);
        add->setObjectName("add");
        add->setGeometry(QRect(820, 630, 141, 51));
        add->setStyleSheet(QString::fromUtf8("border-radius: 18px;\n"
"background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 0,stop: 0 #FF4400,stop: 0.5 #FF007F,stop: 1 #8A2BE2);\n"
"font: 700 9pt \"Script\";\n"
"color: rgb(255, 255, 255);"));
        information = new QWidget(lister);
        information->setObjectName("information");
        information->setGeometry(QRect(230, 40, 511, 641));
        information->setStyleSheet(QString::fromUtf8("border-radius: 18px;\n"
"background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 0,stop: 0 #FF4400,stop: 0.5 #FF007F,stop: 1 #8A2BE2);\n"
"font: 700 9pt \"Script\";\n"
"color: rgb(255, 255, 255);\n"
"border: 1px solid white;"));
        photo_6 = new QLabel(information);
        photo_6->setObjectName("photo_6");
        photo_6->setGeometry(QRect(160, 40, 201, 181));
        photo_6->setStyleSheet(QString::fromUtf8("border-radius: 20px;\n"
"background-color:white;"));
        horizontalLayoutWidget_25 = new QWidget(information);
        horizontalLayoutWidget_25->setObjectName("horizontalLayoutWidget_25");
        horizontalLayoutWidget_25->setGeometry(QRect(20, 250, 471, 68));
        horizontalLayout_29 = new QHBoxLayout(horizontalLayoutWidget_25);
        horizontalLayout_29->setObjectName("horizontalLayout_29");
        horizontalLayout_29->setContentsMargins(0, 0, 0, 0);
        label_30 = new QLabel(horizontalLayoutWidget_25);
        label_30->setObjectName("label_30");
        label_30->setStyleSheet(QString::fromUtf8("border: 0px solid white;\n"
"background-color:transparent;\n"
"font: 6pt \"Script\";"));

        horizontalLayout_29->addWidget(label_30);

        name = new QLineEdit(horizontalLayoutWidget_25);
        name->setObjectName("name");
        name->setStyleSheet(QString::fromUtf8("background-color:white;"));
        name->setReadOnly(true);

        horizontalLayout_29->addWidget(name);

        horizontalLayoutWidget_26 = new QWidget(information);
        horizontalLayoutWidget_26->setObjectName("horizontalLayoutWidget_26");
        horizontalLayoutWidget_26->setGeometry(QRect(20, 300, 471, 68));
        horizontalLayout_30 = new QHBoxLayout(horizontalLayoutWidget_26);
        horizontalLayout_30->setObjectName("horizontalLayout_30");
        horizontalLayout_30->setContentsMargins(0, 0, 0, 0);
        label_31 = new QLabel(horizontalLayoutWidget_26);
        label_31->setObjectName("label_31");
        label_31->setStyleSheet(QString::fromUtf8("border: 0px solid white;\n"
"font: 6pt \"Script\";\n"
"background-color:transparent;"));

        horizontalLayout_30->addWidget(label_31);

        macE = new QLineEdit(horizontalLayoutWidget_26);
        macE->setObjectName("macE");
        macE->setStyleSheet(QString::fromUtf8("background-color:white;"));
        macE->setReadOnly(true);

        horizontalLayout_30->addWidget(macE);

        horizontalLayoutWidget_27 = new QWidget(information);
        horizontalLayoutWidget_27->setObjectName("horizontalLayoutWidget_27");
        horizontalLayoutWidget_27->setGeometry(QRect(20, 360, 471, 68));
        horizontalLayout_31 = new QHBoxLayout(horizontalLayoutWidget_27);
        horizontalLayout_31->setObjectName("horizontalLayout_31");
        horizontalLayout_31->setContentsMargins(0, 0, 0, 0);
        label_32 = new QLabel(horizontalLayoutWidget_27);
        label_32->setObjectName("label_32");
        label_32->setStyleSheet(QString::fromUtf8("border: 0px solid white;\n"
"font: 6pt \"Script\";\n"
"background-color:transparent;"));

        horizontalLayout_31->addWidget(label_32);

        macW = new QLineEdit(horizontalLayoutWidget_27);
        macW->setObjectName("macW");
        macW->setStyleSheet(QString::fromUtf8("background-color:white;"));
        macW->setReadOnly(true);

        horizontalLayout_31->addWidget(macW);

        horizontalLayoutWidget_28 = new QWidget(information);
        horizontalLayoutWidget_28->setObjectName("horizontalLayoutWidget_28");
        horizontalLayoutWidget_28->setGeometry(QRect(20, 410, 471, 70));
        horizontalLayout_32 = new QHBoxLayout(horizontalLayoutWidget_28);
        horizontalLayout_32->setObjectName("horizontalLayout_32");
        horizontalLayout_32->setContentsMargins(0, 0, 0, 0);
        label_33 = new QLabel(horizontalLayoutWidget_28);
        label_33->setObjectName("label_33");
        label_33->setStyleSheet(QString::fromUtf8("border: 0px solid white;\n"
"background-color:transparent;\n"
"font: 6pt \"Script\";"));

        horizontalLayout_32->addWidget(label_33);

        serial = new QLineEdit(horizontalLayoutWidget_28);
        serial->setObjectName("serial");
        serial->setStyleSheet(QString::fromUtf8("background-color:white;"));
        serial->setReadOnly(true);

        horizontalLayout_32->addWidget(serial);

        horizontalLayout_33 = new QHBoxLayout();
        horizontalLayout_33->setObjectName("horizontalLayout_33");
        label_34 = new QLabel(horizontalLayoutWidget_28);
        label_34->setObjectName("label_34");
        label_34->setStyleSheet(QString::fromUtf8("border: 0px solid white;\n"
"background-color:transparent;\n"
"font: 6pt \"Script\";"));

        horizontalLayout_33->addWidget(label_34);

        pan = new QLineEdit(horizontalLayoutWidget_28);
        pan->setObjectName("pan");
        pan->setStyleSheet(QString::fromUtf8("background-color:white;"));
        pan->setReadOnly(true);

        horizontalLayout_33->addWidget(pan);


        horizontalLayout_32->addLayout(horizontalLayout_33);

        horizontalLayoutWidget_29 = new QWidget(information);
        horizontalLayoutWidget_29->setObjectName("horizontalLayoutWidget_29");
        horizontalLayoutWidget_29->setGeometry(QRect(20, 470, 471, 68));
        horizontalLayout_34 = new QHBoxLayout(horizontalLayoutWidget_29);
        horizontalLayout_34->setObjectName("horizontalLayout_34");
        horizontalLayout_34->setContentsMargins(0, 0, 0, 0);
        label_35 = new QLabel(horizontalLayoutWidget_29);
        label_35->setObjectName("label_35");
        label_35->setStyleSheet(QString::fromUtf8("border: 0px solid white;\n"
"font: 6pt \"Script\";\n"
"background-color:transparent;"));

        horizontalLayout_34->addWidget(label_35);

        ip = new QLineEdit(horizontalLayoutWidget_29);
        ip->setObjectName("ip");
        ip->setStyleSheet(QString::fromUtf8("background-color:white;"));
        ip->setReadOnly(true);

        horizontalLayout_34->addWidget(ip);

        horizontalLayoutWidget_30 = new QWidget(information);
        horizontalLayoutWidget_30->setObjectName("horizontalLayoutWidget_30");
        horizontalLayoutWidget_30->setGeometry(QRect(20, 530, 471, 68));
        horizontalLayout_35 = new QHBoxLayout(horizontalLayoutWidget_30);
        horizontalLayout_35->setObjectName("horizontalLayout_35");
        horizontalLayout_35->setContentsMargins(0, 0, 0, 0);
        label_36 = new QLabel(horizontalLayoutWidget_30);
        label_36->setObjectName("label_36");
        label_36->setStyleSheet(QString::fromUtf8("border: 0px solid white;\n"
"font: 6pt \"Script\";\n"
"background-color:transparent;"));

        horizontalLayout_35->addWidget(label_36);

        etat = new QLineEdit(horizontalLayoutWidget_30);
        etat->setObjectName("etat");
        etat->setStyleSheet(QString::fromUtf8("background-color:white;"));
        etat->setReadOnly(true);

        horizontalLayout_35->addWidget(etat);

        go_edit = new QPushButton(information);
        go_edit->setObjectName("go_edit");
        go_edit->setGeometry(QRect(360, 590, 121, 41));
        go_edit->setStyleSheet(QString::fromUtf8("border: 2px solid white;"));
        corbeil = new QPushButton(information);
        corbeil->setObjectName("corbeil");
        corbeil->setGeometry(QRect(440, 30, 51, 51));
        corbeil->setStyleSheet(QString::fromUtf8("border: 2px solid white;\n"
"background-color:transparent;"));
        QIcon icon1;
        iconThemeName = QString::fromUtf8("image-loading");
        if (QIcon::hasThemeIcon(iconThemeName)) {
            icon1 = QIcon::fromTheme(iconThemeName);
        } else {
            icon1.addFile(QString::fromUtf8("../build-mit-Desktop_Qt_6_6_1_MinGW_64_bit-Debug/icon/corbeille.png"), QSize(), QIcon::Normal, QIcon::Off);
        }
        corbeil->setIcon(icon1);
        corbeil->setIconSize(QSize(40, 40));
        editer = new QPushButton(information);
        editer->setObjectName("editer");
        editer->setGeometry(QRect(440, 110, 51, 51));
        editer->setStyleSheet(QString::fromUtf8("border: 2px solid white;\n"
"background-color:transparent;"));
        QIcon icon2;
        icon2.addFile(QString::fromUtf8("../build-mit-Desktop_Qt_6_6_1_MinGW_64_bit-Debug/icon/edit.png"), QSize(), QIcon::Normal, QIcon::Off);
        editer->setIcon(icon2);
        editer->setIconSize(QSize(40, 40));
        quit = new QToolButton(information);
        quit->setObjectName("quit");
        quit->setGeometry(QRect(20, 20, 31, 31));
        quit->setStyleSheet(QString::fromUtf8("font: 9pt \"Segoe MDL2 Assets\";\n"
"border-radius:8px;"));
        addImg = new QToolButton(information);
        addImg->setObjectName("addImg");
        addImg->setGeometry(QRect(340, 200, 22, 22));
        addImg->setStyleSheet(QString::fromUtf8("border-radius:10px;\n"
"font: 12pt \"Segoe UI\";\n"
"font: 10pt \"Segoe Print\";\n"
"border: 2px solid grey;"));
        serial_3 = new QLineEdit(lister);
        serial_3->setObjectName("serial_3");
        serial_3->setGeometry(QRect(20, 630, 331, 42));
        serial_3->setStyleSheet(QString::fromUtf8("border: 0px solid white;\n"
"border-radius: 18px;\n"
"font: 6pt \"Script\";\n"
"color:#FF4400;"));
        serial_3->setReadOnly(true);
        label_9 = new QLabel(lister);
        label_9->setObjectName("label_9");
        label_9->setGeometry(QRect(210, 640, 111, 21));
        label_9->setStyleSheet(QString::fromUtf8("border: 0px solid white;\n"
"border-radius: 18px;\n"
"font: 6pt \"Script\";"));
        main->addWidget(lister);
        ajouter = new QWidget();
        ajouter->setObjectName("ajouter");
        fenetre = new QWidget(ajouter);
        fenetre->setObjectName("fenetre");
        fenetre->setGeometry(QRect(20, 20, 511, 641));
        fenetre->setStyleSheet(QString::fromUtf8("border-radius: 18px;\n"
"background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 0,stop: 0 #FF4400,stop: 0.5 #FF007F,stop: 1 #8A2BE2);\n"
"font: 700 9pt \"Script\";\n"
"color: rgb(255, 255, 255);"));
        photo = new QLabel(fenetre);
        photo->setObjectName("photo");
        photo->setGeometry(QRect(160, 40, 201, 181));
        photo->setMouseTracking(true);
        photo->setStyleSheet(QString::fromUtf8("border: 2px solid grey;\n"
"border-radius: 20px;\n"
"background-color:white;"));
        horizontalLayoutWidget = new QWidget(fenetre);
        horizontalLayoutWidget->setObjectName("horizontalLayoutWidget");
        horizontalLayoutWidget->setGeometry(QRect(20, 250, 471, 44));
        horizontalLayout_36 = new QHBoxLayout(horizontalLayoutWidget);
        horizontalLayout_36->setObjectName("horizontalLayout_36");
        horizontalLayout_36->setContentsMargins(0, 0, 0, 0);
        label_2 = new QLabel(horizontalLayoutWidget);
        label_2->setObjectName("label_2");
        label_2->setStyleSheet(QString::fromUtf8("background-color:transparent;\n"
"font: 6pt \"Script\";"));

        horizontalLayout_36->addWidget(label_2);

        inof_name = new QLineEdit(horizontalLayoutWidget);
        inof_name->setObjectName("inof_name");
        inof_name->setStyleSheet(QString::fromUtf8("background-color:white;\n"
"padding-left:18px;\n"
"color:black;"));

        horizontalLayout_36->addWidget(inof_name);

        horizontalLayoutWidget_2 = new QWidget(fenetre);
        horizontalLayoutWidget_2->setObjectName("horizontalLayoutWidget_2");
        horizontalLayoutWidget_2->setGeometry(QRect(20, 300, 471, 51));
        horizontalLayout_2 = new QHBoxLayout(horizontalLayoutWidget_2);
        horizontalLayout_2->setObjectName("horizontalLayout_2");
        horizontalLayout_2->setContentsMargins(0, 0, 0, 0);
        label_3 = new QLabel(horizontalLayoutWidget_2);
        label_3->setObjectName("label_3");
        label_3->setStyleSheet(QString::fromUtf8("font: 6pt \"Script\";\n"
"background-color:transparent;"));

        horizontalLayout_2->addWidget(label_3);

        info_macE = new QLineEdit(horizontalLayoutWidget_2);
        info_macE->setObjectName("info_macE");
        info_macE->setStyleSheet(QString::fromUtf8("color:black;\n"
"padding-left:18px;\n"
"background-color:white;"));

        horizontalLayout_2->addWidget(info_macE);

        horizontalLayoutWidget_3 = new QWidget(fenetre);
        horizontalLayoutWidget_3->setObjectName("horizontalLayoutWidget_3");
        horizontalLayoutWidget_3->setGeometry(QRect(20, 360, 471, 44));
        horizontalLayout_3 = new QHBoxLayout(horizontalLayoutWidget_3);
        horizontalLayout_3->setObjectName("horizontalLayout_3");
        horizontalLayout_3->setContentsMargins(0, 0, 0, 0);
        label = new QLabel(horizontalLayoutWidget_3);
        label->setObjectName("label");
        label->setStyleSheet(QString::fromUtf8("background-color:transparent;\n"
""));

        horizontalLayout_3->addWidget(label);

        info_macW = new QLineEdit(horizontalLayoutWidget_3);
        info_macW->setObjectName("info_macW");
        info_macW->setStyleSheet(QString::fromUtf8("color:black;\n"
"padding-left:18px;\n"
"background-color:white;"));

        horizontalLayout_3->addWidget(info_macW);

        horizontalLayoutWidget_4 = new QWidget(fenetre);
        horizontalLayoutWidget_4->setObjectName("horizontalLayoutWidget_4");
        horizontalLayoutWidget_4->setGeometry(QRect(20, 410, 471, 51));
        horizontalLayout_4 = new QHBoxLayout(horizontalLayoutWidget_4);
        horizontalLayout_4->setObjectName("horizontalLayout_4");
        horizontalLayout_4->setContentsMargins(0, 0, 0, 0);
        label_5 = new QLabel(horizontalLayoutWidget_4);
        label_5->setObjectName("label_5");
        label_5->setStyleSheet(QString::fromUtf8("background-color:transparent;\n"
"font: 6pt \"Script\";"));

        horizontalLayout_4->addWidget(label_5);

        info_serial = new QLineEdit(horizontalLayoutWidget_4);
        info_serial->setObjectName("info_serial");
        info_serial->setStyleSheet(QString::fromUtf8("color:black;\n"
"padding-left:18px;\n"
"background-color:white;"));

        horizontalLayout_4->addWidget(info_serial);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setObjectName("horizontalLayout_5");
        label_6 = new QLabel(horizontalLayoutWidget_4);
        label_6->setObjectName("label_6");
        label_6->setStyleSheet(QString::fromUtf8("background-color:transparent;\n"
"font: 6pt \"Script\";"));

        horizontalLayout_5->addWidget(label_6);

        info_pan = new QLineEdit(horizontalLayoutWidget_4);
        info_pan->setObjectName("info_pan");
        info_pan->setStyleSheet(QString::fromUtf8("color:black;\n"
"padding-left:18px;\n"
"background-color:white;"));

        horizontalLayout_5->addWidget(info_pan);


        horizontalLayout_4->addLayout(horizontalLayout_5);

        horizontalLayoutWidget_6 = new QWidget(fenetre);
        horizontalLayoutWidget_6->setObjectName("horizontalLayoutWidget_6");
        horizontalLayoutWidget_6->setGeometry(QRect(20, 470, 471, 51));
        horizontalLayout_6 = new QHBoxLayout(horizontalLayoutWidget_6);
        horizontalLayout_6->setObjectName("horizontalLayout_6");
        horizontalLayout_6->setContentsMargins(0, 0, 0, 0);
        label_7 = new QLabel(horizontalLayoutWidget_6);
        label_7->setObjectName("label_7");
        label_7->setStyleSheet(QString::fromUtf8("font: 6pt \"Script\";\n"
"background-color:transparent;"));

        horizontalLayout_6->addWidget(label_7);

        info_ip = new QLineEdit(horizontalLayoutWidget_6);
        info_ip->setObjectName("info_ip");
        info_ip->setStyleSheet(QString::fromUtf8("color:black;\n"
"padding-left:18px;\n"
"background-color:white;"));

        horizontalLayout_6->addWidget(info_ip);

        horizontalLayoutWidget_7 = new QWidget(fenetre);
        horizontalLayoutWidget_7->setObjectName("horizontalLayoutWidget_7");
        horizontalLayoutWidget_7->setGeometry(QRect(20, 530, 471, 51));
        horizontalLayout_7 = new QHBoxLayout(horizontalLayoutWidget_7);
        horizontalLayout_7->setObjectName("horizontalLayout_7");
        horizontalLayout_7->setContentsMargins(0, 0, 0, 0);
        label_8 = new QLabel(horizontalLayoutWidget_7);
        label_8->setObjectName("label_8");
        label_8->setStyleSheet(QString::fromUtf8("font: 6pt \"Script\";\n"
"background-color:transparent;"));

        horizontalLayout_7->addWidget(label_8);

        info_etat = new QLineEdit(horizontalLayoutWidget_7);
        info_etat->setObjectName("info_etat");
        info_etat->setStyleSheet(QString::fromUtf8("color:black;\n"
"padding-left:18px;\n"
"background-color:white;"));

        horizontalLayout_7->addWidget(info_etat);

        submit_add = new QPushButton(fenetre);
        submit_add->setObjectName("submit_add");
        submit_add->setGeometry(QRect(360, 590, 121, 41));
        submit_add->setStyleSheet(QString::fromUtf8("border: 2px solid white;"));
        toolButton = new QToolButton(fenetre);
        toolButton->setObjectName("toolButton");
        toolButton->setGeometry(QRect(340, 200, 22, 22));
        toolButton->setStyleSheet(QString::fromUtf8("border-radius:10px;\n"
"font: 12pt \"Segoe UI\";\n"
"font: 10pt \"Segoe Print\";\n"
"border: 2px solid grey;"));
        go_to_list = new QPushButton(ajouter);
        go_to_list->setObjectName("go_to_list");
        go_to_list->setGeometry(QRect(770, 630, 211, 41));
        go_to_list->setStyleSheet(QString::fromUtf8("border-radius: 18px;\n"
"background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 0,stop: 0 #FF4400,stop: 0.5 #FF007F,stop: 1 #8A2BE2);\n"
"font: 700 9pt \"Script\";\n"
"color: rgb(255, 255, 255);\n"
"box-shadow:10 10 10;"));
        label_4 = new QLabel(ajouter);
        label_4->setObjectName("label_4");
        label_4->setGeometry(QRect(580, 250, 331, 61));
        label_4->setStyleSheet(QString::fromUtf8("border-radius: 18px;\n"
"color: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 0,stop: 0 #FF4400,stop: 0.5 #FF007F,stop: 1 #8A2BE2);\n"
"font: 700 9pt \"Script\";\n"
""));
        label_37 = new QLabel(ajouter);
        label_37->setObjectName("label_37");
        label_37->setGeometry(QRect(610, 310, 381, 41));
        label_37->setStyleSheet(QString::fromUtf8("border-radius: 18px;\n"
"color: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 0,stop: 0 #FF4400,stop: 0.5 #FF007F,stop: 1 #8A2BE2);\n"
"font: 700 9pt \"Script\";\n"
""));
        main->addWidget(ajouter);
        MainWindow->setCentralWidget(centralwidget);
        menubar = new QMenuBar(MainWindow);
        menubar->setObjectName("menubar");
        menubar->setGeometry(QRect(0, 0, 1000, 22));
        MainWindow->setMenuBar(menubar);
        statusbar = new QStatusBar(MainWindow);
        statusbar->setObjectName("statusbar");
        MainWindow->setStatusBar(statusbar);

        retranslateUi(MainWindow);

        main->setCurrentIndex(0);


        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QCoreApplication::translate("MainWindow", "MainWindow", nullptr));
        search->setText(QString());
        l2->setText(QCoreApplication::translate("MainWindow", "L2", nullptr));
        l3->setText(QCoreApplication::translate("MainWindow", "L3", nullptr));
        m1->setText(QCoreApplication::translate("MainWindow", "M1", nullptr));
        m2->setText(QCoreApplication::translate("MainWindow", "M2", nullptr));
        all->setText(QCoreApplication::translate("MainWindow", "ALL", nullptr));
        comboBox->setItemText(0, QCoreApplication::translate("MainWindow", "Trier par:", nullptr));
        comboBox->setItemText(1, QCoreApplication::translate("MainWindow", "Numero", nullptr));
        comboBox->setItemText(2, QCoreApplication::translate("MainWindow", "Noms", nullptr));
        comboBox->setItemText(3, QCoreApplication::translate("MainWindow", "Adresse Ether", nullptr));
        comboBox->setItemText(4, QCoreApplication::translate("MainWindow", "Adresse Wlp", nullptr));
        comboBox->setItemText(5, QCoreApplication::translate("MainWindow", "Serial", nullptr));
        comboBox->setItemText(6, QCoreApplication::translate("MainWindow", "Pan", nullptr));
        comboBox->setItemText(7, QCoreApplication::translate("MainWindow", "Etat", nullptr));
        comboBox->setItemText(8, QCoreApplication::translate("MainWindow", "Ip", nullptr));

        del_tout->setText(QCoreApplication::translate("MainWindow", "Retirer de toute liste", nullptr));
        del_reseau->setText(QCoreApplication::translate("MainWindow", "Retirer seulement du reseau", nullptr));
        l1->setText(QCoreApplication::translate("MainWindow", "L1", nullptr));
        add->setText(QCoreApplication::translate("MainWindow", "Add student", nullptr));
        photo_6->setText(QString());
        label_30->setText(QCoreApplication::translate("MainWindow", "Noms:", nullptr));
        label_31->setText(QCoreApplication::translate("MainWindow", "Mac Eth:", nullptr));
        label_32->setText(QCoreApplication::translate("MainWindow", "Mac Wlp:", nullptr));
        label_33->setText(QCoreApplication::translate("MainWindow", "Serial:", nullptr));
        label_34->setText(QCoreApplication::translate("MainWindow", "Pan:", nullptr));
        label_35->setText(QCoreApplication::translate("MainWindow", "Ip:", nullptr));
        label_36->setText(QCoreApplication::translate("MainWindow", "Etat:", nullptr));
        go_edit->setText(QCoreApplication::translate("MainWindow", "Modify", nullptr));
        corbeil->setText(QString());
        editer->setText(QString());
        quit->setText(QCoreApplication::translate("MainWindow", "X", nullptr));
        addImg->setText(QCoreApplication::translate("MainWindow", "+", nullptr));
        serial_3->setText(QCoreApplication::translate("MainWindow", "Total displayed: ", nullptr));
        label_9->setText(QCoreApplication::translate("MainWindow", "TextLabel", nullptr));
        photo->setText(QString());
        label_2->setText(QCoreApplication::translate("MainWindow", "Noms:", nullptr));
        label_3->setText(QCoreApplication::translate("MainWindow", "Mac Eth:", nullptr));
        label->setText(QCoreApplication::translate("MainWindow", "TextLabel", nullptr));
        label_5->setText(QCoreApplication::translate("MainWindow", "Serial:", nullptr));
        label_6->setText(QCoreApplication::translate("MainWindow", "Pan:", nullptr));
        label_7->setText(QCoreApplication::translate("MainWindow", "Ip:", nullptr));
        info_ip->setText(QString());
        label_8->setText(QCoreApplication::translate("MainWindow", "Etat:", nullptr));
        submit_add->setText(QCoreApplication::translate("MainWindow", "Modify", nullptr));
        toolButton->setText(QCoreApplication::translate("MainWindow", "+", nullptr));
        go_to_list->setText(QCoreApplication::translate("MainWindow", "List all students", nullptr));
        label_4->setText(QCoreApplication::translate("MainWindow", "Veuillez remplir ce formuaire", nullptr));
        label_37->setText(QCoreApplication::translate("MainWindow", "avec les informations sur l'etudiant...", nullptr));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
