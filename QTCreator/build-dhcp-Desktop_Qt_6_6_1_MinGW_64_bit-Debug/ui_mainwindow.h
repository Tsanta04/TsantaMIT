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
#include <QtGui/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenu>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QStackedWidget>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QTextBrowser>
#include <QtWidgets/QToolButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QAction *actionIP;
    QAction *actionNum;
    QAction *actionNiveau;
    QAction *actionMAC_ether;
    QAction *actionMAC_wlp0s25;
    QAction *actionSerial;
    QAction *listeL1;
    QAction *listeL2;
    QAction *listeL3;
    QAction *listeM1;
    QAction *listeM2;
    QAction *ajouterL1;
    QAction *ajouterL2;
    QAction *ajouterL3;
    QAction *ajouterM1;
    QAction *ajouterM2;
    QAction *modifierL1;
    QAction *modifierL2;
    QAction *modifierL3;
    QAction *modifierM1;
    QAction *modifierM2;
    QWidget *centralwidget;
    QStackedWidget *pages;
    QWidget *to_list;
    QComboBox *mode;
    QTableWidget *liste;
    QLineEdit *input;
    QLabel *label;
    QPushButton *rechercher;
    QWidget *info;
    QLabel *label_3;
    QWidget *horizontalLayoutWidget_5;
    QHBoxLayout *horizontalLayout;
    QLabel *label_10;
    QLabel *Lnom;
    QWidget *horizontalLayoutWidget_7;
    QHBoxLayout *horizontalLayout_3;
    QLabel *label_11;
    QLabel *Lniv;
    QWidget *horizontalLayoutWidget_8;
    QHBoxLayout *horizontalLayout_9;
    QLabel *label_13;
    QLabel *Lme;
    QWidget *horizontalLayoutWidget_9;
    QHBoxLayout *horizontalLayout_10;
    QLabel *label_15;
    QLabel *Lmw;
    QWidget *horizontalLayoutWidget_10;
    QHBoxLayout *horizontalLayout_11;
    QLabel *label_17;
    QLabel *Ls;
    QWidget *horizontalLayoutWidget_11;
    QHBoxLayout *horizontalLayout_12;
    QLabel *label_19;
    QLabel *Let;
    QWidget *horizontalLayoutWidget_12;
    QHBoxLayout *horizontalLayout_14;
    QLabel *Lpan;
    QLabel *Lip;
    QToolButton *quit;
    QWidget *horizontalLayoutWidget_13;
    QHBoxLayout *horizontalLayout_15;
    QLabel *label_24;
    QLabel *Lip_2;
    QWidget *page;
    QWidget *to_add;
    QTextBrowser *textBrowser;
    QWidget *horizontalLayoutWidget;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label_2;
    QLineEdit *nom;
    QWidget *horizontalLayoutWidget_2;
    QHBoxLayout *horizontalLayout_4;
    QLabel *label_4;
    QLineEdit *mac_ether;
    QWidget *horizontalLayoutWidget_3;
    QHBoxLayout *horizontalLayout_5;
    QLabel *label_5;
    QLineEdit *mac_wlp;
    QWidget *horizontalLayoutWidget_4;
    QHBoxLayout *horizontalLayout_6;
    QLabel *label_6;
    QLineEdit *serial;
    QHBoxLayout *horizontalLayout_7;
    QLabel *label_7;
    QLineEdit *pan;
    QWidget *horizontalLayoutWidget_6;
    QHBoxLayout *horizontalLayout_8;
    QLabel *label_8;
    QLineEdit *etat;
    QPushButton *add;
    QMenuBar *menubar;
    QMenu *menu;
    QMenu *modifier;
    QMenu *lister;
    QMenu *ajouter;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName("MainWindow");
        MainWindow->resize(800, 600);
        actionIP = new QAction(MainWindow);
        actionIP->setObjectName("actionIP");
        actionNum = new QAction(MainWindow);
        actionNum->setObjectName("actionNum");
        actionNiveau = new QAction(MainWindow);
        actionNiveau->setObjectName("actionNiveau");
        actionMAC_ether = new QAction(MainWindow);
        actionMAC_ether->setObjectName("actionMAC_ether");
        actionMAC_wlp0s25 = new QAction(MainWindow);
        actionMAC_wlp0s25->setObjectName("actionMAC_wlp0s25");
        actionSerial = new QAction(MainWindow);
        actionSerial->setObjectName("actionSerial");
        listeL1 = new QAction(MainWindow);
        listeL1->setObjectName("listeL1");
        listeL2 = new QAction(MainWindow);
        listeL2->setObjectName("listeL2");
        listeL3 = new QAction(MainWindow);
        listeL3->setObjectName("listeL3");
        listeM1 = new QAction(MainWindow);
        listeM1->setObjectName("listeM1");
        listeM2 = new QAction(MainWindow);
        listeM2->setObjectName("listeM2");
        ajouterL1 = new QAction(MainWindow);
        ajouterL1->setObjectName("ajouterL1");
        ajouterL2 = new QAction(MainWindow);
        ajouterL2->setObjectName("ajouterL2");
        ajouterL3 = new QAction(MainWindow);
        ajouterL3->setObjectName("ajouterL3");
        ajouterM1 = new QAction(MainWindow);
        ajouterM1->setObjectName("ajouterM1");
        ajouterM2 = new QAction(MainWindow);
        ajouterM2->setObjectName("ajouterM2");
        modifierL1 = new QAction(MainWindow);
        modifierL1->setObjectName("modifierL1");
        modifierL2 = new QAction(MainWindow);
        modifierL2->setObjectName("modifierL2");
        modifierL3 = new QAction(MainWindow);
        modifierL3->setObjectName("modifierL3");
        modifierM1 = new QAction(MainWindow);
        modifierM1->setObjectName("modifierM1");
        modifierM2 = new QAction(MainWindow);
        modifierM2->setObjectName("modifierM2");
        centralwidget = new QWidget(MainWindow);
        centralwidget->setObjectName("centralwidget");
        pages = new QStackedWidget(centralwidget);
        pages->setObjectName("pages");
        pages->setGeometry(QRect(-20, 20, 1081, 661));
        to_list = new QWidget();
        to_list->setObjectName("to_list");
        mode = new QComboBox(to_list);
        mode->addItem(QString());
        mode->addItem(QString());
        mode->addItem(QString());
        mode->addItem(QString());
        mode->addItem(QString());
        mode->addItem(QString());
        mode->addItem(QString());
        mode->addItem(QString());
        mode->addItem(QString());
        mode->addItem(QString());
        mode->setObjectName("mode");
        mode->setGeometry(QRect(200, 10, 69, 22));
        liste = new QTableWidget(to_list);
        if (liste->columnCount() < 8)
            liste->setColumnCount(8);
        QTableWidgetItem *__qtablewidgetitem = new QTableWidgetItem();
        liste->setHorizontalHeaderItem(0, __qtablewidgetitem);
        QTableWidgetItem *__qtablewidgetitem1 = new QTableWidgetItem();
        liste->setHorizontalHeaderItem(1, __qtablewidgetitem1);
        QTableWidgetItem *__qtablewidgetitem2 = new QTableWidgetItem();
        liste->setHorizontalHeaderItem(2, __qtablewidgetitem2);
        QTableWidgetItem *__qtablewidgetitem3 = new QTableWidgetItem();
        liste->setHorizontalHeaderItem(3, __qtablewidgetitem3);
        QTableWidgetItem *__qtablewidgetitem4 = new QTableWidgetItem();
        liste->setHorizontalHeaderItem(4, __qtablewidgetitem4);
        QTableWidgetItem *__qtablewidgetitem5 = new QTableWidgetItem();
        liste->setHorizontalHeaderItem(5, __qtablewidgetitem5);
        QTableWidgetItem *__qtablewidgetitem6 = new QTableWidgetItem();
        liste->setHorizontalHeaderItem(6, __qtablewidgetitem6);
        QTableWidgetItem *__qtablewidgetitem7 = new QTableWidgetItem();
        liste->setHorizontalHeaderItem(7, __qtablewidgetitem7);
        if (liste->rowCount() < 73)
            liste->setRowCount(73);
        liste->setObjectName("liste");
        liste->setEnabled(true);
        liste->setGeometry(QRect(0, 50, 1234, 1234));
        liste->setMaximumSize(QSize(16777215, 16777215));
        liste->setMouseTracking(false);
        liste->setTabletTracking(false);
        liste->setAcceptDrops(true);
        liste->setAutoFillBackground(true);
        liste->setAlternatingRowColors(true);
        liste->setSortingEnabled(false);
        liste->setRowCount(73);
        input = new QLineEdit(to_list);
        input->setObjectName("input");
        input->setGeometry(QRect(280, 10, 391, 25));
        label = new QLabel(to_list);
        label->setObjectName("label");
        label->setGeometry(QRect(140, 10, 49, 16));
        rechercher = new QPushButton(to_list);
        rechercher->setObjectName("rechercher");
        rechercher->setGeometry(QRect(680, 10, 89, 25));
        info = new QWidget(to_list);
        info->setObjectName("info");
        info->setGeometry(QRect(180, 50, 551, 501));
        info->setStyleSheet(QString::fromUtf8("background-color: rgb(239, 255, 203);"));
        label_3 = new QLabel(info);
        label_3->setObjectName("label_3");
        label_3->setGeometry(QRect(190, 20, 171, 131));
        label_3->setStyleSheet(QString::fromUtf8("background-color: rgb(250, 107, 255);"));
        horizontalLayoutWidget_5 = new QWidget(info);
        horizontalLayoutWidget_5->setObjectName("horizontalLayoutWidget_5");
        horizontalLayoutWidget_5->setGeometry(QRect(10, 170, 521, 31));
        horizontalLayout = new QHBoxLayout(horizontalLayoutWidget_5);
        horizontalLayout->setObjectName("horizontalLayout");
        horizontalLayout->setContentsMargins(0, 0, 0, 0);
        label_10 = new QLabel(horizontalLayoutWidget_5);
        label_10->setObjectName("label_10");

        horizontalLayout->addWidget(label_10);

        Lnom = new QLabel(horizontalLayoutWidget_5);
        Lnom->setObjectName("Lnom");

        horizontalLayout->addWidget(Lnom);

        horizontalLayoutWidget_7 = new QWidget(info);
        horizontalLayoutWidget_7->setObjectName("horizontalLayoutWidget_7");
        horizontalLayoutWidget_7->setGeometry(QRect(10, 210, 521, 31));
        horizontalLayout_3 = new QHBoxLayout(horizontalLayoutWidget_7);
        horizontalLayout_3->setObjectName("horizontalLayout_3");
        horizontalLayout_3->setContentsMargins(0, 0, 0, 0);
        label_11 = new QLabel(horizontalLayoutWidget_7);
        label_11->setObjectName("label_11");

        horizontalLayout_3->addWidget(label_11);

        Lniv = new QLabel(horizontalLayoutWidget_7);
        Lniv->setObjectName("Lniv");

        horizontalLayout_3->addWidget(Lniv);

        horizontalLayoutWidget_8 = new QWidget(info);
        horizontalLayoutWidget_8->setObjectName("horizontalLayoutWidget_8");
        horizontalLayoutWidget_8->setGeometry(QRect(10, 250, 521, 31));
        horizontalLayout_9 = new QHBoxLayout(horizontalLayoutWidget_8);
        horizontalLayout_9->setObjectName("horizontalLayout_9");
        horizontalLayout_9->setContentsMargins(0, 0, 0, 0);
        label_13 = new QLabel(horizontalLayoutWidget_8);
        label_13->setObjectName("label_13");

        horizontalLayout_9->addWidget(label_13);

        Lme = new QLabel(horizontalLayoutWidget_8);
        Lme->setObjectName("Lme");

        horizontalLayout_9->addWidget(Lme);

        horizontalLayoutWidget_9 = new QWidget(info);
        horizontalLayoutWidget_9->setObjectName("horizontalLayoutWidget_9");
        horizontalLayoutWidget_9->setGeometry(QRect(10, 290, 521, 31));
        horizontalLayout_10 = new QHBoxLayout(horizontalLayoutWidget_9);
        horizontalLayout_10->setObjectName("horizontalLayout_10");
        horizontalLayout_10->setContentsMargins(0, 0, 0, 0);
        label_15 = new QLabel(horizontalLayoutWidget_9);
        label_15->setObjectName("label_15");

        horizontalLayout_10->addWidget(label_15);

        Lmw = new QLabel(horizontalLayoutWidget_9);
        Lmw->setObjectName("Lmw");

        horizontalLayout_10->addWidget(Lmw);

        horizontalLayoutWidget_10 = new QWidget(info);
        horizontalLayoutWidget_10->setObjectName("horizontalLayoutWidget_10");
        horizontalLayoutWidget_10->setGeometry(QRect(10, 330, 521, 31));
        horizontalLayout_11 = new QHBoxLayout(horizontalLayoutWidget_10);
        horizontalLayout_11->setObjectName("horizontalLayout_11");
        horizontalLayout_11->setContentsMargins(0, 0, 0, 0);
        label_17 = new QLabel(horizontalLayoutWidget_10);
        label_17->setObjectName("label_17");

        horizontalLayout_11->addWidget(label_17);

        Ls = new QLabel(horizontalLayoutWidget_10);
        Ls->setObjectName("Ls");

        horizontalLayout_11->addWidget(Ls);

        horizontalLayoutWidget_11 = new QWidget(info);
        horizontalLayoutWidget_11->setObjectName("horizontalLayoutWidget_11");
        horizontalLayoutWidget_11->setGeometry(QRect(10, 370, 521, 31));
        horizontalLayout_12 = new QHBoxLayout(horizontalLayoutWidget_11);
        horizontalLayout_12->setObjectName("horizontalLayout_12");
        horizontalLayout_12->setContentsMargins(0, 0, 0, 0);
        label_19 = new QLabel(horizontalLayoutWidget_11);
        label_19->setObjectName("label_19");

        horizontalLayout_12->addWidget(label_19);

        Let = new QLabel(horizontalLayoutWidget_11);
        Let->setObjectName("Let");

        horizontalLayout_12->addWidget(Let);

        horizontalLayoutWidget_12 = new QWidget(info);
        horizontalLayoutWidget_12->setObjectName("horizontalLayoutWidget_12");
        horizontalLayoutWidget_12->setGeometry(QRect(10, 410, 521, 31));
        horizontalLayout_14 = new QHBoxLayout(horizontalLayoutWidget_12);
        horizontalLayout_14->setObjectName("horizontalLayout_14");
        horizontalLayout_14->setContentsMargins(0, 0, 0, 0);
        Lpan = new QLabel(horizontalLayoutWidget_12);
        Lpan->setObjectName("Lpan");

        horizontalLayout_14->addWidget(Lpan);

        Lip = new QLabel(horizontalLayoutWidget_12);
        Lip->setObjectName("Lip");

        horizontalLayout_14->addWidget(Lip);

        quit = new QToolButton(info);
        quit->setObjectName("quit");
        quit->setGeometry(QRect(510, 10, 22, 22));
        horizontalLayoutWidget_13 = new QWidget(info);
        horizontalLayoutWidget_13->setObjectName("horizontalLayoutWidget_13");
        horizontalLayoutWidget_13->setGeometry(QRect(10, 450, 521, 31));
        horizontalLayout_15 = new QHBoxLayout(horizontalLayoutWidget_13);
        horizontalLayout_15->setObjectName("horizontalLayout_15");
        horizontalLayout_15->setContentsMargins(0, 0, 0, 0);
        label_24 = new QLabel(horizontalLayoutWidget_13);
        label_24->setObjectName("label_24");

        horizontalLayout_15->addWidget(label_24);

        Lip_2 = new QLabel(horizontalLayoutWidget_13);
        Lip_2->setObjectName("Lip_2");

        horizontalLayout_15->addWidget(Lip_2);

        pages->addWidget(to_list);
        page = new QWidget();
        page->setObjectName("page");
        pages->addWidget(page);
        to_add = new QWidget();
        to_add->setObjectName("to_add");
        textBrowser = new QTextBrowser(to_add);
        textBrowser->setObjectName("textBrowser");
        textBrowser->setGeometry(QRect(190, 20, 441, 41));
        horizontalLayoutWidget = new QWidget(to_add);
        horizontalLayoutWidget->setObjectName("horizontalLayoutWidget");
        horizontalLayoutWidget->setGeometry(QRect(190, 80, 441, 51));
        horizontalLayout_2 = new QHBoxLayout(horizontalLayoutWidget);
        horizontalLayout_2->setObjectName("horizontalLayout_2");
        horizontalLayout_2->setContentsMargins(0, 0, 0, 0);
        label_2 = new QLabel(horizontalLayoutWidget);
        label_2->setObjectName("label_2");

        horizontalLayout_2->addWidget(label_2);

        nom = new QLineEdit(horizontalLayoutWidget);
        nom->setObjectName("nom");

        horizontalLayout_2->addWidget(nom);

        horizontalLayoutWidget_2 = new QWidget(to_add);
        horizontalLayoutWidget_2->setObjectName("horizontalLayoutWidget_2");
        horizontalLayoutWidget_2->setGeometry(QRect(190, 150, 441, 51));
        horizontalLayout_4 = new QHBoxLayout(horizontalLayoutWidget_2);
        horizontalLayout_4->setObjectName("horizontalLayout_4");
        horizontalLayout_4->setContentsMargins(0, 0, 0, 0);
        label_4 = new QLabel(horizontalLayoutWidget_2);
        label_4->setObjectName("label_4");

        horizontalLayout_4->addWidget(label_4);

        mac_ether = new QLineEdit(horizontalLayoutWidget_2);
        mac_ether->setObjectName("mac_ether");

        horizontalLayout_4->addWidget(mac_ether);

        horizontalLayoutWidget_3 = new QWidget(to_add);
        horizontalLayoutWidget_3->setObjectName("horizontalLayoutWidget_3");
        horizontalLayoutWidget_3->setGeometry(QRect(190, 220, 441, 51));
        horizontalLayout_5 = new QHBoxLayout(horizontalLayoutWidget_3);
        horizontalLayout_5->setObjectName("horizontalLayout_5");
        horizontalLayout_5->setContentsMargins(0, 0, 0, 0);
        label_5 = new QLabel(horizontalLayoutWidget_3);
        label_5->setObjectName("label_5");

        horizontalLayout_5->addWidget(label_5);

        mac_wlp = new QLineEdit(horizontalLayoutWidget_3);
        mac_wlp->setObjectName("mac_wlp");

        horizontalLayout_5->addWidget(mac_wlp);

        horizontalLayoutWidget_4 = new QWidget(to_add);
        horizontalLayoutWidget_4->setObjectName("horizontalLayoutWidget_4");
        horizontalLayoutWidget_4->setGeometry(QRect(190, 290, 441, 51));
        horizontalLayout_6 = new QHBoxLayout(horizontalLayoutWidget_4);
        horizontalLayout_6->setObjectName("horizontalLayout_6");
        horizontalLayout_6->setContentsMargins(0, 0, 0, 0);
        label_6 = new QLabel(horizontalLayoutWidget_4);
        label_6->setObjectName("label_6");

        horizontalLayout_6->addWidget(label_6);

        serial = new QLineEdit(horizontalLayoutWidget_4);
        serial->setObjectName("serial");

        horizontalLayout_6->addWidget(serial);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setObjectName("horizontalLayout_7");
        label_7 = new QLabel(horizontalLayoutWidget_4);
        label_7->setObjectName("label_7");

        horizontalLayout_7->addWidget(label_7);

        pan = new QLineEdit(horizontalLayoutWidget_4);
        pan->setObjectName("pan");

        horizontalLayout_7->addWidget(pan);


        horizontalLayout_6->addLayout(horizontalLayout_7);

        horizontalLayoutWidget_6 = new QWidget(to_add);
        horizontalLayoutWidget_6->setObjectName("horizontalLayoutWidget_6");
        horizontalLayoutWidget_6->setGeometry(QRect(190, 360, 441, 51));
        horizontalLayout_8 = new QHBoxLayout(horizontalLayoutWidget_6);
        horizontalLayout_8->setObjectName("horizontalLayout_8");
        horizontalLayout_8->setContentsMargins(0, 0, 0, 0);
        label_8 = new QLabel(horizontalLayoutWidget_6);
        label_8->setObjectName("label_8");

        horizontalLayout_8->addWidget(label_8);

        etat = new QLineEdit(horizontalLayoutWidget_6);
        etat->setObjectName("etat");

        horizontalLayout_8->addWidget(etat);

        add = new QPushButton(to_add);
        add->setObjectName("add");
        add->setGeometry(QRect(340, 440, 131, 31));
        pages->addWidget(to_add);
        MainWindow->setCentralWidget(centralwidget);
        menubar = new QMenuBar(MainWindow);
        menubar->setObjectName("menubar");
        menubar->setGeometry(QRect(0, 0, 800, 22));
        menu = new QMenu(menubar);
        menu->setObjectName("menu");
        modifier = new QMenu(menu);
        modifier->setObjectName("modifier");
        lister = new QMenu(menu);
        lister->setObjectName("lister");
        ajouter = new QMenu(menu);
        ajouter->setObjectName("ajouter");
        MainWindow->setMenuBar(menubar);
        statusbar = new QStatusBar(MainWindow);
        statusbar->setObjectName("statusbar");
        MainWindow->setStatusBar(statusbar);

        menubar->addAction(menu->menuAction());
        menu->addAction(lister->menuAction());
        menu->addAction(ajouter->menuAction());
        menu->addAction(modifier->menuAction());
        modifier->addAction(modifierL1);
        modifier->addAction(modifierL2);
        modifier->addAction(modifierL3);
        modifier->addAction(modifierM1);
        modifier->addAction(modifierM2);
        lister->addAction(listeL1);
        lister->addAction(listeL2);
        lister->addAction(listeL3);
        lister->addAction(listeM1);
        lister->addAction(listeM2);
        ajouter->addAction(ajouterL1);
        ajouter->addAction(ajouterL2);
        ajouter->addAction(ajouterL3);
        ajouter->addAction(ajouterM1);
        ajouter->addAction(ajouterM2);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QCoreApplication::translate("MainWindow", "MainWindow", nullptr));
        actionIP->setText(QCoreApplication::translate("MainWindow", "IP", nullptr));
        actionNum->setText(QCoreApplication::translate("MainWindow", "Num", nullptr));
        actionNiveau->setText(QCoreApplication::translate("MainWindow", "Niveau", nullptr));
        actionMAC_ether->setText(QCoreApplication::translate("MainWindow", "MAC ether", nullptr));
        actionMAC_wlp0s25->setText(QCoreApplication::translate("MainWindow", "MAC wlp0s25", nullptr));
        actionSerial->setText(QCoreApplication::translate("MainWindow", "Serial", nullptr));
        listeL1->setText(QCoreApplication::translate("MainWindow", "L1", nullptr));
        listeL2->setText(QCoreApplication::translate("MainWindow", "L2", nullptr));
        listeL3->setText(QCoreApplication::translate("MainWindow", "L3", nullptr));
        listeM1->setText(QCoreApplication::translate("MainWindow", "M1", nullptr));
        listeM2->setText(QCoreApplication::translate("MainWindow", "M2", nullptr));
        ajouterL1->setText(QCoreApplication::translate("MainWindow", "L1", nullptr));
        ajouterL2->setText(QCoreApplication::translate("MainWindow", "L2", nullptr));
        ajouterL3->setText(QCoreApplication::translate("MainWindow", "L3", nullptr));
        ajouterM1->setText(QCoreApplication::translate("MainWindow", "M1", nullptr));
        ajouterM2->setText(QCoreApplication::translate("MainWindow", "M2", nullptr));
        modifierL1->setText(QCoreApplication::translate("MainWindow", "L1", nullptr));
        modifierL2->setText(QCoreApplication::translate("MainWindow", "L2", nullptr));
        modifierL3->setText(QCoreApplication::translate("MainWindow", "L3", nullptr));
        modifierM1->setText(QCoreApplication::translate("MainWindow", "M1", nullptr));
        modifierM2->setText(QCoreApplication::translate("MainWindow", "M2", nullptr));
        mode->setItemText(0, QString());
        mode->setItemText(1, QCoreApplication::translate("MainWindow", "Num", nullptr));
        mode->setItemText(2, QCoreApplication::translate("MainWindow", "Nom", nullptr));
        mode->setItemText(3, QCoreApplication::translate("MainWindow", "MAC ether", nullptr));
        mode->setItemText(4, QCoreApplication::translate("MainWindow", "MAC wlp0s25", nullptr));
        mode->setItemText(5, QCoreApplication::translate("MainWindow", "Serial", nullptr));
        mode->setItemText(6, QCoreApplication::translate("MainWindow", "PAN", nullptr));
        mode->setItemText(7, QCoreApplication::translate("MainWindow", "Etat", nullptr));
        mode->setItemText(8, QCoreApplication::translate("MainWindow", "IP", nullptr));
        mode->setItemText(9, QCoreApplication::translate("MainWindow", "Tout", nullptr));

        QTableWidgetItem *___qtablewidgetitem = liste->horizontalHeaderItem(0);
        ___qtablewidgetitem->setText(QCoreApplication::translate("MainWindow", "Num", nullptr));
        QTableWidgetItem *___qtablewidgetitem1 = liste->horizontalHeaderItem(1);
        ___qtablewidgetitem1->setText(QCoreApplication::translate("MainWindow", "Nom", nullptr));
        QTableWidgetItem *___qtablewidgetitem2 = liste->horizontalHeaderItem(2);
        ___qtablewidgetitem2->setText(QCoreApplication::translate("MainWindow", "MAC ether", nullptr));
        QTableWidgetItem *___qtablewidgetitem3 = liste->horizontalHeaderItem(3);
        ___qtablewidgetitem3->setText(QCoreApplication::translate("MainWindow", "MAC wlp0s25", nullptr));
        QTableWidgetItem *___qtablewidgetitem4 = liste->horizontalHeaderItem(4);
        ___qtablewidgetitem4->setText(QCoreApplication::translate("MainWindow", "Serial", nullptr));
        QTableWidgetItem *___qtablewidgetitem5 = liste->horizontalHeaderItem(5);
        ___qtablewidgetitem5->setText(QCoreApplication::translate("MainWindow", "PAN", nullptr));
        QTableWidgetItem *___qtablewidgetitem6 = liste->horizontalHeaderItem(6);
        ___qtablewidgetitem6->setText(QCoreApplication::translate("MainWindow", "Etat", nullptr));
        QTableWidgetItem *___qtablewidgetitem7 = liste->horizontalHeaderItem(7);
        ___qtablewidgetitem7->setText(QCoreApplication::translate("MainWindow", "IP", nullptr));
        label->setText(QCoreApplication::translate("MainWindow", "Trier par", nullptr));
        rechercher->setText(QCoreApplication::translate("MainWindow", "Recherche", nullptr));
        label_3->setText(QCoreApplication::translate("MainWindow", "Image", nullptr));
        label_10->setText(QCoreApplication::translate("MainWindow", "Noms:", nullptr));
        Lnom->setText(QString());
        label_11->setText(QCoreApplication::translate("MainWindow", "Niveau:", nullptr));
        Lniv->setText(QString());
        label_13->setText(QCoreApplication::translate("MainWindow", "MAC ethernet:", nullptr));
        Lme->setText(QString());
        label_15->setText(QCoreApplication::translate("MainWindow", "MAC wlp0s23:", nullptr));
        Lmw->setText(QString());
        label_17->setText(QCoreApplication::translate("MainWindow", "Serial:", nullptr));
        Ls->setText(QString());
        label_19->setText(QCoreApplication::translate("MainWindow", "Etat:", nullptr));
        Let->setText(QString());
        Lpan->setText(QCoreApplication::translate("MainWindow", "PAN:", nullptr));
        Lip->setText(QString());
        quit->setText(QCoreApplication::translate("MainWindow", "X", nullptr));
        label_24->setText(QCoreApplication::translate("MainWindow", "IP:", nullptr));
        Lip_2->setText(QString());
        textBrowser->setHtml(QCoreApplication::translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><meta charset=\"utf-8\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"hr { height: 1px; border-width: 0; }\n"
"li.unchecked::marker { content: \"\\2610\"; }\n"
"li.checked::marker { content: \"\\2612\"; }\n"
"</style></head><body style=\" font-family:'Segoe UI'; font-size:9pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:14pt; font-weight:700;\">Formulaire d'ajout</span></p></body></html>", nullptr));
        label_2->setText(QCoreApplication::translate("MainWindow", "Noms:", nullptr));
        label_4->setText(QCoreApplication::translate("MainWindow", "MAC ether: ", nullptr));
        label_5->setText(QCoreApplication::translate("MainWindow", "MAC wlp0s25: ", nullptr));
        label_6->setText(QCoreApplication::translate("MainWindow", "Serial:", nullptr));
        label_7->setText(QCoreApplication::translate("MainWindow", "PAN:", nullptr));
        label_8->setText(QCoreApplication::translate("MainWindow", "Etat: ", nullptr));
        add->setText(QCoreApplication::translate("MainWindow", "Add", nullptr));
        menu->setTitle(QCoreApplication::translate("MainWindow", "Menu", nullptr));
        modifier->setTitle(QCoreApplication::translate("MainWindow", "Modifier le liste", nullptr));
        lister->setTitle(QCoreApplication::translate("MainWindow", "Info des etudiants", nullptr));
        ajouter->setTitle(QCoreApplication::translate("MainWindow", "Ajouter au liste", nullptr));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
