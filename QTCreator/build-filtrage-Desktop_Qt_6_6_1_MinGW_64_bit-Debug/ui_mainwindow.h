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
#include <QtWidgets/QApplication>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QPlainTextEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QScrollArea>
#include <QtWidgets/QStackedWidget>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QToolButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralwidget;
    QStackedWidget *Main;
    QWidget *New;
    QWidget *Container;
    QWidget *horizontalLayoutWidget_12;
    QHBoxLayout *horizontalLayout_14;
    QLabel *label_16;
    QLineEdit *dInp;
    QToolButton *dB;
    QWidget *horizontalLayoutWidget_13;
    QHBoxLayout *horizontalLayout_15;
    QLabel *label_22;
    QComboBox *sportInp;
    QToolButton *sportB;
    QWidget *horizontalLayoutWidget_14;
    QHBoxLayout *horizontalLayout_16;
    QLabel *label_20;
    QComboBox *addFlux;
    QWidget *horizontalLayoutWidget_15;
    QHBoxLayout *horizontalLayout_17;
    QLabel *label_19;
    QLineEdit *macInp;
    QToolButton *macB;
    QWidget *horizontalLayoutWidget_16;
    QHBoxLayout *horizontalLayout_18;
    QLabel *label_17;
    QComboBox *policyInput;
    QWidget *horizontalLayoutWidget_17;
    QHBoxLayout *horizontalLayout_19;
    QLabel *label_13;
    QLineEdit *sInp;
    QToolButton *sB;
    QWidget *horizontalLayoutWidget_18;
    QHBoxLayout *horizontalLayout_20;
    QLabel *label_28;
    QComboBox *iInp;
    QWidget *horizontalLayoutWidget_19;
    QHBoxLayout *horizontalLayout_21;
    QLabel *label_14;
    QComboBox *addProtocol;
    QWidget *horizontalLayoutWidget_20;
    QHBoxLayout *horizontalLayout_22;
    QLabel *label_21;
    QComboBox *oInp;
    QWidget *horizontalLayoutWidget_21;
    QHBoxLayout *horizontalLayout_23;
    QLabel *label_18;
    QComboBox *dportInp;
    QToolButton *dportB;
    QWidget *widget_9;
    QPushButton *ajoutRegle;
    QLabel *titre;
    QWidget *widget_10;
    QWidget *Default_2;
    QWidget *widget;
    QWidget *horizontalLayoutWidget;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label;
    QComboBox *dInputPolicy;
    QWidget *horizontalLayoutWidget_22;
    QHBoxLayout *horizontalLayout_24;
    QLabel *label_23;
    QComboBox *dOutputPolicy;
    QWidget *horizontalLayoutWidget_23;
    QHBoxLayout *horizontalLayout_25;
    QLabel *label_24;
    QComboBox *dForPolicy;
    QWidget *widget_8;
    QPushButton *defModify;
    QLabel *label_30;
    QWidget *widget_7;
    QWidget *Menu;
    QWidget *head;
    QWidget *widget_3;
    QLabel *label_11;
    QLabel *label_25;
    QPlainTextEdit *plainTextEdit;
    QWidget *widget_4;
    QLabel *label_12;
    QLabel *label_26;
    QPlainTextEdit *plainTextEdit_2;
    QWidget *widget_5;
    QLabel *label_15;
    QLabel *label_27;
    QPlainTextEdit *plainTextEdit_3;
    QWidget *Current;
    QScrollArea *scrollArea;
    QWidget *widOutput;
    QWidget *widget_6;
    QLabel *label_10;
    QPushButton *pushButton;
    QPushButton *pushButton_2;
    QPushButton *pushButton_3;
    QLabel *label_3;
    QLabel *label_4;
    QLabel *label_5;
    QLabel *label_6;
    QLabel *label_7;
    QLabel *label_8;
    QLabel *label_29;
    QWidget *boxMessage;
    QLabel *message_3;
    QPushButton *addValid_3;
    QToolButton *toolButton_4;
    QWidget *errorMessage;
    QLabel *message_4;
    QPushButton *okError;
    QToolButton *toolButton_5;
    QWidget *widget_2;
    QLabel *label_9;
    QPushButton *newRule;
    QPushButton *listRules;
    QPushButton *defaultRules;
    QPushButton *home;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName("MainWindow");
        MainWindow->resize(1200, 700);
        MainWindow->setStyleSheet(QString::fromUtf8("background-color: rgb(230, 230, 230);"));
        centralwidget = new QWidget(MainWindow);
        centralwidget->setObjectName("centralwidget");
        Main = new QStackedWidget(centralwidget);
        Main->setObjectName("Main");
        Main->setGeometry(QRect(249, -13, 1251, 701));
        Main->setStyleSheet(QString::fromUtf8("background-color: rgb(230, 230, 230);\n"
"border-radius:10px;\n"
"border:1px;"));
        New = new QWidget();
        New->setObjectName("New");
        Container = new QWidget(New);
        Container->setObjectName("Container");
        Container->setGeometry(QRect(10, 330, 911, 351));
        Container->setStyleSheet(QString::fromUtf8("background-color:white;"));
        horizontalLayoutWidget_12 = new QWidget(Container);
        horizontalLayoutWidget_12->setObjectName("horizontalLayoutWidget_12");
        horizontalLayoutWidget_12->setGeometry(QRect(480, 30, 391, 41));
        horizontalLayout_14 = new QHBoxLayout(horizontalLayoutWidget_12);
        horizontalLayout_14->setObjectName("horizontalLayout_14");
        horizontalLayout_14->setContentsMargins(0, 0, 0, 0);
        label_16 = new QLabel(horizontalLayoutWidget_12);
        label_16->setObjectName("label_16");
        label_16->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;"));

        horizontalLayout_14->addWidget(label_16);

        dInp = new QLineEdit(horizontalLayoutWidget_12);
        dInp->setObjectName("dInp");
        dInp->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;\n"
"border:1px solid black;"));

        horizontalLayout_14->addWidget(dInp);

        dB = new QToolButton(horizontalLayoutWidget_12);
        dB->setObjectName("dB");
        dB->setStyleSheet(QString::fromUtf8("border-radius:15px;\n"
"border:0px;\n"
"background-color: rgb(71, 105, 255);"));

        horizontalLayout_14->addWidget(dB);

        horizontalLayoutWidget_13 = new QWidget(Container);
        horizontalLayoutWidget_13->setObjectName("horizontalLayoutWidget_13");
        horizontalLayoutWidget_13->setGeometry(QRect(40, 150, 411, 41));
        horizontalLayout_15 = new QHBoxLayout(horizontalLayoutWidget_13);
        horizontalLayout_15->setObjectName("horizontalLayout_15");
        horizontalLayout_15->setContentsMargins(0, 0, 0, 0);
        label_22 = new QLabel(horizontalLayoutWidget_13);
        label_22->setObjectName("label_22");
        label_22->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;"));

        horizontalLayout_15->addWidget(label_22);

        sportInp = new QComboBox(horizontalLayoutWidget_13);
        sportInp->addItem(QString());
        sportInp->setObjectName("sportInp");
        sportInp->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;\n"
"border:1px solid black;"));
        sportInp->setEditable(true);
        sportInp->setDuplicatesEnabled(true);

        horizontalLayout_15->addWidget(sportInp);

        sportB = new QToolButton(horizontalLayoutWidget_13);
        sportB->setObjectName("sportB");
        sportB->setStyleSheet(QString::fromUtf8("border-radius:15px;\n"
"border:0px;\n"
"background-color: rgb(71, 105, 255);"));

        horizontalLayout_15->addWidget(sportB);

        horizontalLayoutWidget_14 = new QWidget(Container);
        horizontalLayoutWidget_14->setObjectName("horizontalLayoutWidget_14");
        horizontalLayoutWidget_14->setGeometry(QRect(40, 30, 411, 41));
        horizontalLayout_16 = new QHBoxLayout(horizontalLayoutWidget_14);
        horizontalLayout_16->setObjectName("horizontalLayout_16");
        horizontalLayout_16->setContentsMargins(0, 0, 0, 0);
        label_20 = new QLabel(horizontalLayoutWidget_14);
        label_20->setObjectName("label_20");
        label_20->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;"));

        horizontalLayout_16->addWidget(label_20);

        addFlux = new QComboBox(horizontalLayoutWidget_14);
        addFlux->addItem(QString());
        addFlux->addItem(QString());
        addFlux->addItem(QString());
        addFlux->setObjectName("addFlux");
        addFlux->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;\n"
"border:1px solid black;"));

        horizontalLayout_16->addWidget(addFlux);

        horizontalLayoutWidget_15 = new QWidget(Container);
        horizontalLayoutWidget_15->setObjectName("horizontalLayoutWidget_15");
        horizontalLayoutWidget_15->setGeometry(QRect(480, 90, 391, 41));
        horizontalLayout_17 = new QHBoxLayout(horizontalLayoutWidget_15);
        horizontalLayout_17->setObjectName("horizontalLayout_17");
        horizontalLayout_17->setContentsMargins(0, 0, 0, 0);
        label_19 = new QLabel(horizontalLayoutWidget_15);
        label_19->setObjectName("label_19");
        label_19->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;"));

        horizontalLayout_17->addWidget(label_19);

        macInp = new QLineEdit(horizontalLayoutWidget_15);
        macInp->setObjectName("macInp");
        macInp->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;\n"
"border:1px solid black;"));

        horizontalLayout_17->addWidget(macInp);

        macB = new QToolButton(horizontalLayoutWidget_15);
        macB->setObjectName("macB");
        macB->setStyleSheet(QString::fromUtf8("border-radius:15px;\n"
"border:0px;\n"
"background-color: rgb(71, 105, 255);"));

        horizontalLayout_17->addWidget(macB);

        horizontalLayoutWidget_16 = new QWidget(Container);
        horizontalLayoutWidget_16->setObjectName("horizontalLayoutWidget_16");
        horizontalLayoutWidget_16->setGeometry(QRect(480, 280, 391, 51));
        horizontalLayout_18 = new QHBoxLayout(horizontalLayoutWidget_16);
        horizontalLayout_18->setObjectName("horizontalLayout_18");
        horizontalLayout_18->setContentsMargins(0, 0, 0, 0);
        label_17 = new QLabel(horizontalLayoutWidget_16);
        label_17->setObjectName("label_17");
        label_17->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;"));

        horizontalLayout_18->addWidget(label_17);

        policyInput = new QComboBox(horizontalLayoutWidget_16);
        policyInput->addItem(QString());
        policyInput->addItem(QString());
        policyInput->addItem(QString());
        policyInput->setObjectName("policyInput");
        policyInput->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;\n"
"border:1px solid black;"));
        policyInput->setEditable(false);

        horizontalLayout_18->addWidget(policyInput);

        horizontalLayoutWidget_17 = new QWidget(Container);
        horizontalLayoutWidget_17->setObjectName("horizontalLayoutWidget_17");
        horizontalLayoutWidget_17->setGeometry(QRect(40, 280, 411, 51));
        horizontalLayout_19 = new QHBoxLayout(horizontalLayoutWidget_17);
        horizontalLayout_19->setObjectName("horizontalLayout_19");
        horizontalLayout_19->setContentsMargins(0, 0, 0, 0);
        label_13 = new QLabel(horizontalLayoutWidget_17);
        label_13->setObjectName("label_13");
        label_13->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;"));

        horizontalLayout_19->addWidget(label_13);

        sInp = new QLineEdit(horizontalLayoutWidget_17);
        sInp->setObjectName("sInp");
        sInp->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;\n"
"border:1px solid black;"));

        horizontalLayout_19->addWidget(sInp);

        sB = new QToolButton(horizontalLayoutWidget_17);
        sB->setObjectName("sB");
        sB->setStyleSheet(QString::fromUtf8("border-radius:15px;\n"
"border:0px;\n"
"background-color: rgb(71, 105, 255);"));

        horizontalLayout_19->addWidget(sB);

        horizontalLayoutWidget_18 = new QWidget(Container);
        horizontalLayoutWidget_18->setObjectName("horizontalLayoutWidget_18");
        horizontalLayoutWidget_18->setGeometry(QRect(480, 150, 391, 41));
        horizontalLayout_20 = new QHBoxLayout(horizontalLayoutWidget_18);
        horizontalLayout_20->setObjectName("horizontalLayout_20");
        horizontalLayout_20->setContentsMargins(0, 0, 0, 0);
        label_28 = new QLabel(horizontalLayoutWidget_18);
        label_28->setObjectName("label_28");
        label_28->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;"));

        horizontalLayout_20->addWidget(label_28);

        iInp = new QComboBox(horizontalLayoutWidget_18);
        iInp->addItem(QString());
        iInp->setObjectName("iInp");
        iInp->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;\n"
"border:1px solid black;"));
        iInp->setEditable(true);
        iInp->setDuplicatesEnabled(true);

        horizontalLayout_20->addWidget(iInp);

        horizontalLayoutWidget_19 = new QWidget(Container);
        horizontalLayoutWidget_19->setObjectName("horizontalLayoutWidget_19");
        horizontalLayoutWidget_19->setGeometry(QRect(40, 90, 411, 41));
        horizontalLayout_21 = new QHBoxLayout(horizontalLayoutWidget_19);
        horizontalLayout_21->setObjectName("horizontalLayout_21");
        horizontalLayout_21->setContentsMargins(0, 0, 0, 0);
        label_14 = new QLabel(horizontalLayoutWidget_19);
        label_14->setObjectName("label_14");
        label_14->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;"));

        horizontalLayout_21->addWidget(label_14);

        addProtocol = new QComboBox(horizontalLayoutWidget_19);
        addProtocol->addItem(QString());
        addProtocol->addItem(QString());
        addProtocol->addItem(QString());
        addProtocol->addItem(QString());
        addProtocol->setObjectName("addProtocol");
        addProtocol->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;\n"
"border:1px solid black;"));

        horizontalLayout_21->addWidget(addProtocol);

        horizontalLayoutWidget_20 = new QWidget(Container);
        horizontalLayoutWidget_20->setObjectName("horizontalLayoutWidget_20");
        horizontalLayoutWidget_20->setGeometry(QRect(480, 210, 391, 51));
        horizontalLayout_22 = new QHBoxLayout(horizontalLayoutWidget_20);
        horizontalLayout_22->setObjectName("horizontalLayout_22");
        horizontalLayout_22->setContentsMargins(0, 0, 0, 0);
        label_21 = new QLabel(horizontalLayoutWidget_20);
        label_21->setObjectName("label_21");
        label_21->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;"));

        horizontalLayout_22->addWidget(label_21);

        oInp = new QComboBox(horizontalLayoutWidget_20);
        oInp->addItem(QString());
        oInp->setObjectName("oInp");
        oInp->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;\n"
"border:1px solid black;"));
        oInp->setEditable(true);
        oInp->setDuplicatesEnabled(true);

        horizontalLayout_22->addWidget(oInp);

        horizontalLayoutWidget_21 = new QWidget(Container);
        horizontalLayoutWidget_21->setObjectName("horizontalLayoutWidget_21");
        horizontalLayoutWidget_21->setGeometry(QRect(40, 210, 411, 51));
        horizontalLayout_23 = new QHBoxLayout(horizontalLayoutWidget_21);
        horizontalLayout_23->setObjectName("horizontalLayout_23");
        horizontalLayout_23->setContentsMargins(0, 0, 0, 0);
        label_18 = new QLabel(horizontalLayoutWidget_21);
        label_18->setObjectName("label_18");
        label_18->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;"));

        horizontalLayout_23->addWidget(label_18);

        dportInp = new QComboBox(horizontalLayoutWidget_21);
        dportInp->addItem(QString());
        dportInp->setObjectName("dportInp");
        dportInp->setStyleSheet(QString::fromUtf8("font: 500 12pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"background:transparent;\n"
"border:1px solid black;"));
        dportInp->setEditable(true);
        dportInp->setDuplicatesEnabled(true);

        horizontalLayout_23->addWidget(dportInp);

        dportB = new QToolButton(horizontalLayoutWidget_21);
        dportB->setObjectName("dportB");
        dportB->setStyleSheet(QString::fromUtf8("border-radius:15px;\n"
"border:0px;\n"
"background-color: rgb(71, 105, 255);"));

        horizontalLayout_23->addWidget(dportB);

        widget_9 = new QWidget(New);
        widget_9->setObjectName("widget_9");
        widget_9->setGeometry(QRect(10, 209, 911, 101));
        widget_9->setStyleSheet(QString::fromUtf8("background-color:white;"));
        ajoutRegle = new QPushButton(widget_9);
        ajoutRegle->setObjectName("ajoutRegle");
        ajoutRegle->setGeometry(QRect(720, 20, 151, 31));
        ajoutRegle->setStyleSheet(QString::fromUtf8("border-radius:15px;\n"
"border:0px;\n"
"background-color: rgb(71, 105, 255);"));
        titre = new QLabel(widget_9);
        titre->setObjectName("titre");
        titre->setGeometry(QRect(20, 30, 91, 16));
        titre->setStyleSheet(QString::fromUtf8("font: 700 10pt \"Segoe UI\";\n"
"font: 12pt \"Segoe UI\";\n"
"color: rgb(67, 81, 127);\n"
""));
        widget_10 = new QWidget(New);
        widget_10->setObjectName("widget_10");
        widget_10->setGeometry(QRect(380, 110, 171, 121));
        widget_10->setStyleSheet(QString::fromUtf8("background-size: cover;\n"
"background-image:url(firewall.png);\n"
"border-radius:45px;"));
        Main->addWidget(New);
        Default_2 = new QWidget();
        Default_2->setObjectName("Default_2");
        widget = new QWidget(Default_2);
        widget->setObjectName("widget");
        widget->setGeometry(QRect(30, 290, 871, 391));
        widget->setStyleSheet(QString::fromUtf8("background: white;"));
        horizontalLayoutWidget = new QWidget(widget);
        horizontalLayoutWidget->setObjectName("horizontalLayoutWidget");
        horizontalLayoutWidget->setGeometry(QRect(80, 70, 751, 42));
        horizontalLayout_2 = new QHBoxLayout(horizontalLayoutWidget);
        horizontalLayout_2->setObjectName("horizontalLayout_2");
        horizontalLayout_2->setContentsMargins(0, 0, 0, 0);
        label = new QLabel(horizontalLayoutWidget);
        label->setObjectName("label");
        label->setStyleSheet(QString::fromUtf8("font: 500 14pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
""));

        horizontalLayout_2->addWidget(label);

        dInputPolicy = new QComboBox(horizontalLayoutWidget);
        dInputPolicy->addItem(QString());
        dInputPolicy->addItem(QString());
        dInputPolicy->addItem(QString());
        dInputPolicy->setObjectName("dInputPolicy");
        dInputPolicy->setStyleSheet(QString::fromUtf8("font: 500 14pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"border:1px solid black;"));

        horizontalLayout_2->addWidget(dInputPolicy);

        horizontalLayoutWidget_22 = new QWidget(widget);
        horizontalLayoutWidget_22->setObjectName("horizontalLayoutWidget_22");
        horizontalLayoutWidget_22->setGeometry(QRect(80, 160, 751, 51));
        horizontalLayout_24 = new QHBoxLayout(horizontalLayoutWidget_22);
        horizontalLayout_24->setObjectName("horizontalLayout_24");
        horizontalLayout_24->setContentsMargins(0, 0, 0, 0);
        label_23 = new QLabel(horizontalLayoutWidget_22);
        label_23->setObjectName("label_23");
        label_23->setStyleSheet(QString::fromUtf8("font: 500 14pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
""));

        horizontalLayout_24->addWidget(label_23);

        dOutputPolicy = new QComboBox(horizontalLayoutWidget_22);
        dOutputPolicy->addItem(QString());
        dOutputPolicy->addItem(QString());
        dOutputPolicy->addItem(QString());
        dOutputPolicy->setObjectName("dOutputPolicy");
        dOutputPolicy->setStyleSheet(QString::fromUtf8("border:1px solid black;\n"
"font: 500 14pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"\n"
""));

        horizontalLayout_24->addWidget(dOutputPolicy);

        horizontalLayoutWidget_23 = new QWidget(widget);
        horizontalLayoutWidget_23->setObjectName("horizontalLayoutWidget_23");
        horizontalLayoutWidget_23->setGeometry(QRect(80, 270, 751, 51));
        horizontalLayout_25 = new QHBoxLayout(horizontalLayoutWidget_23);
        horizontalLayout_25->setObjectName("horizontalLayout_25");
        horizontalLayout_25->setContentsMargins(0, 0, 0, 0);
        label_24 = new QLabel(horizontalLayoutWidget_23);
        label_24->setObjectName("label_24");
        label_24->setStyleSheet(QString::fromUtf8("font: 500 14pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
""));

        horizontalLayout_25->addWidget(label_24);

        dForPolicy = new QComboBox(horizontalLayoutWidget_23);
        dForPolicy->addItem(QString());
        dForPolicy->addItem(QString());
        dForPolicy->addItem(QString());
        dForPolicy->setObjectName("dForPolicy");
        dForPolicy->setStyleSheet(QString::fromUtf8("border:1px solid black;\n"
"font: 500 14pt \"Segoe UI\";\n"
"color: rgb(57, 57, 57);\n"
"\n"
""));

        horizontalLayout_25->addWidget(dForPolicy);

        widget_8 = new QWidget(Default_2);
        widget_8->setObjectName("widget_8");
        widget_8->setGeometry(QRect(30, 180, 861, 91));
        widget_8->setStyleSheet(QString::fromUtf8("background: white;\n"
""));
        defModify = new QPushButton(widget_8);
        defModify->setObjectName("defModify");
        defModify->setGeometry(QRect(670, 10, 181, 41));
        defModify->setStyleSheet(QString::fromUtf8("border-radius:15px;\n"
"border:0px;\n"
"background-color: rgb(71, 105, 255);"));
        label_30 = new QLabel(widget_8);
        label_30->setObjectName("label_30");
        label_30->setGeometry(QRect(30, 20, 131, 31));
        label_30->setStyleSheet(QString::fromUtf8("font: 700 10pt \"Segoe UI\";\n"
"font: 12pt \"Segoe UI\";\n"
"color: rgb(67, 81, 127);\n"
""));
        widget_7 = new QWidget(Default_2);
        widget_7->setObjectName("widget_7");
        widget_7->setGeometry(QRect(370, 110, 171, 111));
        widget_7->setStyleSheet(QString::fromUtf8("background-size: cover;\n"
"background-image:url(firewall.png);\n"
"border-radius:45px;"));
        Main->addWidget(Default_2);
        Menu = new QWidget();
        Menu->setObjectName("Menu");
        head = new QWidget(Menu);
        head->setObjectName("head");
        head->setGeometry(QRect(0, 10, 931, 431));
        head->setStyleSheet(QString::fromUtf8("background-color:black;\n"
"background-image: url(1.png);\n"
""));
        widget_3 = new QWidget(Menu);
        widget_3->setObjectName("widget_3");
        widget_3->setGeometry(QRect(20, 390, 281, 281));
        widget_3->setStyleSheet(QString::fromUtf8("background:white;\n"
"border-radius:20px;\n"
"border:1px solid grey;"));
        label_11 = new QLabel(widget_3);
        label_11->setObjectName("label_11");
        label_11->setGeometry(QRect(110, 10, 51, 51));
        label_11->setStyleSheet(QString::fromUtf8("qproperty-alignment: 'AlignCenter';\n"
"border-radius:23px;\n"
"font: 20pt \"Segoe UI\";\n"
"background-color: rgb(85, 85, 255);"));
        label_25 = new QLabel(widget_3);
        label_25->setObjectName("label_25");
        label_25->setGeometry(QRect(50, 70, 171, 31));
        label_25->setStyleSheet(QString::fromUtf8("qproperty-alignment: 'AlignCenter';\n"
"border-radius:23px;\n"
"font: 20pt \"Segoe UI\";\n"
"color:rgb(88, 88, 88)"));
        plainTextEdit = new QPlainTextEdit(widget_3);
        plainTextEdit->setObjectName("plainTextEdit");
        plainTextEdit->setGeometry(QRect(10, 150, 261, 121));
        plainTextEdit->setStyleSheet(QString::fromUtf8("qproperty-alignment: 'AlignCenter';\n"
"word-wrap: break-word;\n"
"color: rgb(34, 34, 34);\n"
"font: 11pt \"Segoe UI\";\n"
"border:none;"));
        widget_4 = new QWidget(Menu);
        widget_4->setObjectName("widget_4");
        widget_4->setGeometry(QRect(330, 370, 281, 281));
        widget_4->setStyleSheet(QString::fromUtf8("background:white;\n"
"border-radius:20px;\n"
"border:1px solid grey;"));
        label_12 = new QLabel(widget_4);
        label_12->setObjectName("label_12");
        label_12->setGeometry(QRect(110, 10, 51, 51));
        label_12->setStyleSheet(QString::fromUtf8("qproperty-alignment: 'AlignCenter';\n"
"border-radius:23px;\n"
"font: 20pt \"Segoe UI\";\n"
"background-color: rgb(35, 185, 255);"));
        label_26 = new QLabel(widget_4);
        label_26->setObjectName("label_26");
        label_26->setGeometry(QRect(50, 70, 171, 31));
        label_26->setStyleSheet(QString::fromUtf8("qproperty-alignment: 'AlignCenter';\n"
"border-radius:23px;\n"
"font: 20pt \"Segoe UI\";\n"
"color:rgb(88, 88, 88)"));
        plainTextEdit_2 = new QPlainTextEdit(widget_4);
        plainTextEdit_2->setObjectName("plainTextEdit_2");
        plainTextEdit_2->setGeometry(QRect(10, 160, 261, 111));
        plainTextEdit_2->setStyleSheet(QString::fromUtf8("qproperty-alignment: 'AlignCenter';\n"
"word-wrap: break-word;\n"
"color: rgb(34, 34, 34);\n"
"font: 11pt \"Segoe UI\";\n"
"border:none;"));
        widget_5 = new QWidget(Menu);
        widget_5->setObjectName("widget_5");
        widget_5->setGeometry(QRect(640, 390, 271, 281));
        widget_5->setStyleSheet(QString::fromUtf8("background:white;\n"
"border-radius:20px;\n"
"border:1px solid grey;"));
        label_15 = new QLabel(widget_5);
        label_15->setObjectName("label_15");
        label_15->setGeometry(QRect(110, 10, 51, 51));
        label_15->setStyleSheet(QString::fromUtf8("qproperty-alignment: 'AlignCenter';\n"
"border-radius:23px;\n"
"font: 20pt \"Segoe UI\";\n"
"background-color: rgb(7, 135, 255);"));
        label_27 = new QLabel(widget_5);
        label_27->setObjectName("label_27");
        label_27->setGeometry(QRect(50, 70, 171, 31));
        label_27->setStyleSheet(QString::fromUtf8("qproperty-alignment: 'AlignCenter';\n"
"border-radius:23px;\n"
"font: 20pt \"Segoe UI\";\n"
"color:rgb(88, 88, 88)"));
        plainTextEdit_3 = new QPlainTextEdit(widget_5);
        plainTextEdit_3->setObjectName("plainTextEdit_3");
        plainTextEdit_3->setGeometry(QRect(10, 160, 251, 111));
        plainTextEdit_3->setStyleSheet(QString::fromUtf8("qproperty-alignment: 'AlignCenter';\n"
"word-wrap: break-word;\n"
"color: rgb(34, 34, 34);\n"
"font: 11pt \"Segoe UI\";\n"
"border:none;"));
        Main->addWidget(Menu);
        Current = new QWidget();
        Current->setObjectName("Current");
        scrollArea = new QScrollArea(Current);
        scrollArea->setObjectName("scrollArea");
        scrollArea->setGeometry(QRect(40, 320, 861, 350));
        scrollArea->setStyleSheet(QString::fromUtf8("background-color:white;"));
        scrollArea->setWidgetResizable(true);
        widOutput = new QWidget();
        widOutput->setObjectName("widOutput");
        widOutput->setGeometry(QRect(0, 0, 861, 350));
        scrollArea->setWidget(widOutput);
        widget_6 = new QWidget(Current);
        widget_6->setObjectName("widget_6");
        widget_6->setGeometry(QRect(40, 170, 861, 141));
        widget_6->setStyleSheet(QString::fromUtf8("background-color: rgb(255, 255, 255);"));
        label_10 = new QLabel(widget_6);
        label_10->setObjectName("label_10");
        label_10->setGeometry(QRect(20, 30, 141, 21));
        label_10->setStyleSheet(QString::fromUtf8("font: 700 10pt \"Segoe UI\";\n"
"font: 12pt \"Segoe UI\";\n"
"color: rgb(67, 81, 127);\n"
""));
        pushButton = new QPushButton(widget_6);
        pushButton->setObjectName("pushButton");
        pushButton->setGeometry(QRect(720, 30, 89, 31));
        pushButton->setStyleSheet(QString::fromUtf8("border:0px;\n"
"background-color: rgb(71, 105, 255);"));
        pushButton_2 = new QPushButton(widget_6);
        pushButton_2->setObjectName("pushButton_2");
        pushButton_2->setGeometry(QRect(470, 30, 89, 31));
        pushButton_2->setStyleSheet(QString::fromUtf8("border:0px;\n"
"background-color: rgb(71, 105, 255);"));
        pushButton_3 = new QPushButton(widget_6);
        pushButton_3->setObjectName("pushButton_3");
        pushButton_3->setGeometry(QRect(590, 30, 89, 31));
        pushButton_3->setStyleSheet(QString::fromUtf8("border:0px;\n"
"background-color: rgb(71, 105, 255);"));
        label_3 = new QLabel(widget_6);
        label_3->setObjectName("label_3");
        label_3->setGeometry(QRect(20, 80, 91, 41));
        label_3->setStyleSheet(QString::fromUtf8("background:none;\n"
"border:1px solid white;font: 13pt \\&quot;Lucida Calligraphy\\&quot;;\n"
"border-radius: 10px;\n"
""));
        label_4 = new QLabel(widget_6);
        label_4->setObjectName("label_4");
        label_4->setGeometry(QRect(110, 80, 91, 41));
        label_4->setStyleSheet(QString::fromUtf8("background:none;\n"
"border:1px solid white;font: 13pt \\&quot;Lucida Calligraphy\\&quot;;\n"
"border-radius: 10px;\n"
""));
        label_5 = new QLabel(widget_6);
        label_5->setObjectName("label_5");
        label_5->setGeometry(QRect(220, 80, 91, 41));
        label_5->setStyleSheet(QString::fromUtf8("background:none;\n"
"border:1px solid white;font: 13pt \\&quot;Lucida Calligraphy\\&quot;;\n"
"border-radius: 10px;\n"
""));
        label_6 = new QLabel(widget_6);
        label_6->setObjectName("label_6");
        label_6->setGeometry(QRect(320, 80, 91, 41));
        label_6->setStyleSheet(QString::fromUtf8("background:none;\n"
"border:1px solid white;font: 13pt \\&quot;Lucida Calligraphy\\&quot;;\n"
"border-radius: 10px;\n"
""));
        label_7 = new QLabel(widget_6);
        label_7->setObjectName("label_7");
        label_7->setGeometry(QRect(420, 80, 111, 41));
        label_7->setStyleSheet(QString::fromUtf8("background:none;\n"
"border:1px solid white;font: 13pt \\&quot;Lucida Calligraphy\\&quot;;\n"
"border-radius: 10px;\n"
""));
        label_8 = new QLabel(widget_6);
        label_8->setObjectName("label_8");
        label_8->setGeometry(QRect(550, 80, 121, 41));
        label_8->setStyleSheet(QString::fromUtf8("background:none;\n"
"border:1px solid white;font: 13pt \\&quot;Lucida Calligraphy\\&quot;;\n"
"border-radius: 10px;\n"
""));
        label_29 = new QLabel(Current);
        label_29->setObjectName("label_29");
        label_29->setGeometry(QRect(360, 80, 161, 111));
        label_29->setStyleSheet(QString::fromUtf8("background-size: cover;\n"
"background-image:url(firewall.png);\n"
"border-radius:45px;"));
        Main->addWidget(Current);
        boxMessage = new QWidget(centralwidget);
        boxMessage->setObjectName("boxMessage");
        boxMessage->setGeometry(QRect(460, 230, 500, 300));
        boxMessage->setStyleSheet(QString::fromUtf8("border-radius: 10px;\n"
"background-color: rgb(91, 91, 91);\n"
""));
        message_3 = new QLabel(boxMessage);
        message_3->setObjectName("message_3");
        message_3->setGeometry(QRect(10, 30, 471, 171));
        message_3->setStyleSheet(QString::fromUtf8("background:none;\n"
"qproperty-alignment: 'AlignCenter';\n"
"border:0px;\n"
"font: 16pt \"Ubuntu Condensed\";"));
        addValid_3 = new QPushButton(boxMessage);
        addValid_3->setObjectName("addValid_3");
        addValid_3->setGeometry(QRect(185, 240, 131, 31));
        addValid_3->setStyleSheet(QString::fromUtf8("border:1px solid black;"));
        toolButton_4 = new QToolButton(boxMessage);
        toolButton_4->setObjectName("toolButton_4");
        toolButton_4->setGeometry(QRect(460, 15, 23, 23));
        toolButton_4->setStyleSheet(QString::fromUtf8("border:1px solid black;"));
        errorMessage = new QWidget(centralwidget);
        errorMessage->setObjectName("errorMessage");
        errorMessage->setGeometry(QRect(460, 230, 500, 300));
        errorMessage->setStyleSheet(QString::fromUtf8("border-radius: 10px;\n"
"background-color: rgb(91, 91, 91);\n"
""));
        message_4 = new QLabel(errorMessage);
        message_4->setObjectName("message_4");
        message_4->setGeometry(QRect(10, 30, 471, 171));
        message_4->setStyleSheet(QString::fromUtf8("background:none;\n"
"qproperty-alignment: 'AlignCenter';\n"
"border:0px;\n"
"font: 16pt \"Ubuntu Condensed\";"));
        okError = new QPushButton(errorMessage);
        okError->setObjectName("okError");
        okError->setGeometry(QRect(185, 240, 131, 31));
        okError->setStyleSheet(QString::fromUtf8("border:1px solid black;"));
        toolButton_5 = new QToolButton(errorMessage);
        toolButton_5->setObjectName("toolButton_5");
        toolButton_5->setGeometry(QRect(460, 15, 23, 23));
        toolButton_5->setStyleSheet(QString::fromUtf8("border:1px solid black;"));
        widget_2 = new QWidget(centralwidget);
        widget_2->setObjectName("widget_2");
        widget_2->setGeometry(QRect(0, -10, 231, 681));
        widget_2->setStyleSheet(QString::fromUtf8("background-color: rgb(255, 255, 255);\n"
"color: rgb(0, 75, 225);\n"
"font: 700 12pt \"Segoe UI\";"));
        label_9 = new QLabel(widget_2);
        label_9->setObjectName("label_9");
        label_9->setGeometry(QRect(30, 20, 131, 21));
        newRule = new QPushButton(widget_2);
        newRule->setObjectName("newRule");
        newRule->setGeometry(QRect(-10, 160, 251, 61));
        newRule->setStyleSheet(QString::fromUtf8("background:transparent;\n"
"border:1px;\n"
"color: rgb(71, 105, 255);"));
        listRules = new QPushButton(widget_2);
        listRules->setObjectName("listRules");
        listRules->setGeometry(QRect(-10, 280, 251, 61));
        listRules->setStyleSheet(QString::fromUtf8("background:transparent;\n"
"border:1px;\n"
"color: rgb(71, 105, 255);"));
        defaultRules = new QPushButton(widget_2);
        defaultRules->setObjectName("defaultRules");
        defaultRules->setGeometry(QRect(-10, 220, 251, 61));
        defaultRules->setStyleSheet(QString::fromUtf8("background:transparent;\n"
"border:1px;\n"
"color: rgb(71, 105, 255);"));
        home = new QPushButton(widget_2);
        home->setObjectName("home");
        home->setGeometry(QRect(-10, 100, 251, 61));
        home->setStyleSheet(QString::fromUtf8("background:transparent;\n"
"border:1px;\n"
"color: rgb(71, 105, 255);"));
        MainWindow->setCentralWidget(centralwidget);
        statusbar = new QStatusBar(MainWindow);
        statusbar->setObjectName("statusbar");
        MainWindow->setStatusBar(statusbar);

        retranslateUi(MainWindow);

        Main->setCurrentIndex(3);


        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QCoreApplication::translate("MainWindow", "MainWindow", nullptr));
        label_16->setText(QCoreApplication::translate("MainWindow", "DEST. IP/NETWORK (S) : ", nullptr));
        dB->setText(QCoreApplication::translate("MainWindow", "+", nullptr));
        label_22->setText(QCoreApplication::translate("MainWindow", "SOURCE PORT(S) :", nullptr));
        sportInp->setItemText(0, QCoreApplication::translate("MainWindow", "none", nullptr));

        sportB->setText(QCoreApplication::translate("MainWindow", "+", nullptr));
        label_20->setText(QCoreApplication::translate("MainWindow", "FLUX :", nullptr));
        addFlux->setItemText(0, QCoreApplication::translate("MainWindow", "INPUT", nullptr));
        addFlux->setItemText(1, QCoreApplication::translate("MainWindow", "FORWARD", nullptr));
        addFlux->setItemText(2, QCoreApplication::translate("MainWindow", "OUTPUT", nullptr));

        label_19->setText(QCoreApplication::translate("MainWindow", "MAC SOURCE (S) : ", nullptr));
        macB->setText(QCoreApplication::translate("MainWindow", "+", nullptr));
        label_17->setText(QCoreApplication::translate("MainWindow", "ACCESS : ", nullptr));
        policyInput->setItemText(0, QCoreApplication::translate("MainWindow", "ACCEPT", nullptr));
        policyInput->setItemText(1, QCoreApplication::translate("MainWindow", "DROP", nullptr));
        policyInput->setItemText(2, QCoreApplication::translate("MainWindow", "REJECT", nullptr));

        label_13->setText(QCoreApplication::translate("MainWindow", "SOURCE IP/NETWORK (S) : ", nullptr));
        sB->setText(QCoreApplication::translate("MainWindow", "+", nullptr));
        label_28->setText(QCoreApplication::translate("MainWindow", "INPUT INTERFACE : ", nullptr));
        iInp->setItemText(0, QCoreApplication::translate("MainWindow", "none", nullptr));

        label_14->setText(QCoreApplication::translate("MainWindow", "PROTOCOL :", nullptr));
        addProtocol->setItemText(0, QCoreApplication::translate("MainWindow", "none", nullptr));
        addProtocol->setItemText(1, QCoreApplication::translate("MainWindow", "TCP", nullptr));
        addProtocol->setItemText(2, QCoreApplication::translate("MainWindow", "UDP", nullptr));
        addProtocol->setItemText(3, QCoreApplication::translate("MainWindow", "ICMP", nullptr));

        label_21->setText(QCoreApplication::translate("MainWindow", "OUTPUT INTERFACE : ", nullptr));
        oInp->setItemText(0, QCoreApplication::translate("MainWindow", "none", nullptr));

        label_18->setText(QCoreApplication::translate("MainWindow", "DEST. PORT(S) :", nullptr));
        dportInp->setItemText(0, QCoreApplication::translate("MainWindow", "none", nullptr));

        dportB->setText(QCoreApplication::translate("MainWindow", "+", nullptr));
        ajoutRegle->setText(QCoreApplication::translate("MainWindow", "Add", nullptr));
        titre->setText(QCoreApplication::translate("MainWindow", "Add rules", nullptr));
        label->setText(QCoreApplication::translate("MainWindow", "INPUT :", nullptr));
        dInputPolicy->setItemText(0, QCoreApplication::translate("MainWindow", "ACCEPT", nullptr));
        dInputPolicy->setItemText(1, QCoreApplication::translate("MainWindow", "DROP", nullptr));
        dInputPolicy->setItemText(2, QCoreApplication::translate("MainWindow", "REJECT", nullptr));

        label_23->setText(QCoreApplication::translate("MainWindow", "OUTPUT :", nullptr));
        dOutputPolicy->setItemText(0, QCoreApplication::translate("MainWindow", "ACCEPT", nullptr));
        dOutputPolicy->setItemText(1, QCoreApplication::translate("MainWindow", "DROP", nullptr));
        dOutputPolicy->setItemText(2, QCoreApplication::translate("MainWindow", "REJECT", nullptr));

        label_24->setText(QCoreApplication::translate("MainWindow", "FORWARD :", nullptr));
        dForPolicy->setItemText(0, QCoreApplication::translate("MainWindow", "ACCEPT", nullptr));
        dForPolicy->setItemText(1, QCoreApplication::translate("MainWindow", "DROP", nullptr));
        dForPolicy->setItemText(2, QCoreApplication::translate("MainWindow", "REJECT", nullptr));

        defModify->setText(QCoreApplication::translate("MainWindow", "MODIFY", nullptr));
        label_30->setText(QCoreApplication::translate("MainWindow", "Default rules", nullptr));
        label_11->setText(QCoreApplication::translate("MainWindow", "1", nullptr));
        label_25->setText(QCoreApplication::translate("MainWindow", "New rules", nullptr));
        plainTextEdit->setPlainText(QCoreApplication::translate("MainWindow", "Allow specific incoming, outgoing, forwarding connections, drop or reject unwanted traffic, and limit the number of connections. ", nullptr));
        label_12->setText(QCoreApplication::translate("MainWindow", "2", nullptr));
        label_26->setText(QCoreApplication::translate("MainWindow", "Default rules", nullptr));
        plainTextEdit_2->setPlainText(QCoreApplication::translate("MainWindow", "Determine the policy for packets that do not match any of the explicitly defined rules. ", nullptr));
        label_15->setText(QCoreApplication::translate("MainWindow", "3", nullptr));
        label_27->setText(QCoreApplication::translate("MainWindow", "Current rules", nullptr));
        plainTextEdit_3->setPlainText(QCoreApplication::translate("MainWindow", "List the currently configured firewall rules, displays the rules for each of the built-in chains in the filter table.", nullptr));
        label_10->setText(QCoreApplication::translate("MainWindow", "Current rules", nullptr));
        pushButton->setText(QCoreApplication::translate("MainWindow", "INPUT", nullptr));
        pushButton_2->setText(QCoreApplication::translate("MainWindow", "OUTPUT", nullptr));
        pushButton_3->setText(QCoreApplication::translate("MainWindow", "FORWARD", nullptr));
        label_3->setText(QCoreApplication::translate("MainWindow", "Target", nullptr));
        label_4->setText(QCoreApplication::translate("MainWindow", "Protocol", nullptr));
        label_5->setText(QCoreApplication::translate("MainWindow", "Option", nullptr));
        label_6->setText(QCoreApplication::translate("MainWindow", "Source", nullptr));
        label_7->setText(QCoreApplication::translate("MainWindow", "Destination", nullptr));
        label_8->setText(QCoreApplication::translate("MainWindow", "Other", nullptr));
        label_29->setText(QString());
        message_3->setText(QCoreApplication::translate("MainWindow", "TextLabel", nullptr));
        addValid_3->setText(QCoreApplication::translate("MainWindow", "Valider", nullptr));
        toolButton_4->setText(QCoreApplication::translate("MainWindow", "X", nullptr));
        message_4->setText(QCoreApplication::translate("MainWindow", "There is an error in your rule. Please reverify it.", nullptr));
        okError->setText(QCoreApplication::translate("MainWindow", "Ok", nullptr));
        toolButton_5->setText(QCoreApplication::translate("MainWindow", "X", nullptr));
        label_9->setText(QCoreApplication::translate("MainWindow", "NETFILTER", nullptr));
        newRule->setText(QCoreApplication::translate("MainWindow", "Add new rules", nullptr));
        listRules->setText(QCoreApplication::translate("MainWindow", "Current rules", nullptr));
        defaultRules->setText(QCoreApplication::translate("MainWindow", "Default rules", nullptr));
        home->setText(QCoreApplication::translate("MainWindow", "Home", nullptr));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
