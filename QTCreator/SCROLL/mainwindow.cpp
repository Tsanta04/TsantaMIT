#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <fstream>
#include <sstream>
#include <cstring>
#include<ctype.h>
#include<vector>
#include <iostream>
#include<QAction>
#include<QLabel>
#include <QTableWidgetItem>
#include <QDebug>
#include<QFrame>
#include <QStringList>
#include <QList>
#include <QPixmap>
#include <QImage>


using namespace std;
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    affichage();
}

MainWindow::~MainWindow()
{
    delete ui;
    delete[] et;
}

///Affichage
void MainWindow::affichage(){
    ui->listeL1->setText("L1");
    ui->listeL2->setText("L2");
    ui->pushButton_10->setText("All");
    ui->pushButton_4->setText("L3");
    ui->pushButton_5->setText("M1");
    ui->pushButton_6->setText("M2");

    //position du curseur du recherche
    ui->input->setCursorPosition(20);
}

///Lister
void MainWindow::getData(string searched,string path,int mode){
//    qDebug()<<QString::fromStdString(searched)<<QString::fromStdString(path)<<mode;
    ifstream file(path);
    string line="";
    string tmp="";
    datas.clear();
    totalPersonne=0;
    if(file.is_open()){
        while(getline(file,line)){//&&(searched!="")
            totalPersonne++;
            if((mode!=0)&&(mode!=9)){
                qDebug()<<mode;
                istringstream iss(line);
                for(int i=0;i<mode;i++){
                    getline(iss,tmp,',');
                }
            }
            else tmp=line;
            if((mode==0)||(compare(tmp,searched))){
                datas.push_back(line);
            }
        }
        file.close();
        file.clear();
    }
//    else{qDebug()<<"Ato";}
///Split data
    //et=(Et*)malloc((int)(datas.size())*sizeof(Et));
    et = new Et[datas.size()];
    Et etudiant;

    for(int i=0;i<(int)datas.size();i++){
        istringstream iss(datas[i]);
        //numero
        getline(iss, etudiant.num,',');
        //nom
        getline(iss, etudiant.nom,',');
        //macE
        getline(iss, etudiant.macE, ',');
        //macW
        getline(iss, etudiant.macW, ',');
        //Serial
        getline(iss, etudiant.serial, ',');
        //Pan
        getline(iss, etudiant.pan, ',');
        //Etat
        getline(iss, etudiant.etat, ',');
        //Ip
        getline(iss, etudiant.ip, ',');

        et[i]=etudiant;
    }

    getTotal();
}

void MainWindow::getTotal(){
//total perso
    string tmp="";
    totalPanasonic=0;
    totalOccurence=datas.size();

    for(int i=0;i<(int)datas.size();i++){
        istringstream iss(datas[i]);
        for(int j=0;j<6;j++){
            getline(iss,tmp,',');
        }
        if(compare(tmp,"PAN")){
            totalPanasonic++;
        }
    }
}

bool MainWindow::compare(string tmp,string str){
    QString a=QString::fromStdString(tmp).toLower();
    QString b=QString::fromStdString(str).toLower();
    qDebug()<<a<<"et"<<b;
    return a.contains(b);
}

void MainWindow::displayList(){
/*
    string tmp="";
    getData((ui->input->text()).toStdString(),path,(int)ui->mode->currentIndex());
    ui->liste->setRowCount((int)datas.size());
    for(int i=0;i<(int)datas.size();i++){
        istringstream iss(datas[i]);
        for(int j=0;getline(iss,tmp,',');j++){
            QTableWidgetItem *item = new QTableWidgetItem(QString::fromStdString(tmp));
            ui->liste->setItem(i, j, item);
        }
    }
    ui->to_list->show();
*/
    getData((ui->input->text()).toStdString(),path,(int)ui->mode->currentIndex());
    QWidget* wid=ui->scrollWidget;

    // Vérifiez si le widget a déjà un layout
    if (wid->layout() != nullptr) {
        QLayoutItem* item;
        while ((item = wid->layout()->takeAt(0)) != nullptr) {
            delete item->widget();
            delete item;
        }
        delete wid->layout();
    }

    QVBoxLayout *layout = new QVBoxLayout();
    wid->setLayout(layout);

    qDebug() << "There " << QString::fromStdString(path)  << "\n";

    for(int i=1;i<(int)datas.size();i++){
        layout->addWidget(creerWidget(et[i]));
    }
    ui->scrollArea->setWidget(wid);
    ui->scrollArea->setWidgetResizable(true);
    ui->tEt->setText(QString::number(totalPersonne));
    ui->tPan->setText(QString::number(totalPanasonic));
}


//QFrame* MainWindow::creerWidget(string et){
QFrame* MainWindow::creerWidget(Et et){
//Creation frame
    QFrame* frame=new QFrame();
        frame->setFrameShape(QFrame::Box);  // Définir la forme du cadre (ici un simple rectangle)
        frame->setFixedSize(780, 250);
        frame->setStyleSheet("background-color:#dedcff;border:0;border-radius:12px;padding:5px;");

//Contenu
        QGridLayout* layout=new QGridLayout();

        QLabel* photoLabel = new QLabel();
        photoLabel->setFixedWidth(230);
        photoLabel->setFixedHeight(230);
        photoLabel->setPixmap(QPixmap(QString("L1/photo_L1/%1.jpg").arg(QString::fromStdString(et.num))).scaled(230,220));
        layout->addWidget(photoLabel, 0, 0, 2, 1);

        QLabel* label = new QLabel();
/*
            label->setText(QString("%1\nMAC Ethernet: %2\nMAC Wireless: %3\nSerial: %4\nPAN: %5\nEtal: %6\nIP: %7")
                               .arg(QString::fromStdString(et.nom)).arg(QString::fromStdString(et.macE))
                               .arg(QString::fromStdString(et.macW)).arg(QString::fromStdString(et.serial))
                               .arg(QString::fromStdString(et.pan)).arg(QString::fromStdString(et.etat)).arg(QString::fromStdString(et.ip))
                               );
            layout->addWidget(label, 0, 1, 1, 1);
*/
        layout->addWidget(new QLabel(QString("NOM: %1").arg(QString::fromStdString(et.nom))), 0, 1, 1, 1);
        layout->addWidget(new QLabel(QString("MAC ethernet: %1").arg(QString::fromStdString(et.macE))), 1, 1, 1, 1);
        layout->addWidget(new QLabel(QString("MAC wireless: %1").arg(QString::fromStdString(et.macW))), 2, 1, 1, 1);
        layout->addWidget(new QLabel(QString("Serial: %1").arg(QString::fromStdString(et.serial))), 3, 1, 1, 1);
        layout->addWidget(new QLabel(QString("Serial: %1").arg(QString::fromStdString(et.pan))), 4, 1, 1, 1);
        layout->addWidget(new QLabel(QString("Serial: %1").arg(QString::fromStdString(et.pan))), 5, 1, 1, 1);
//        layout->addWidget(label, 1, 1, 1, 1);
        frame->setLayout(layout);
    return frame;
}

void MainWindow::setPath(string p){
    path=p;
}

void MainWindow::on_rechercher_clicked()
{
    displayList();
}
/*
void MainWindow::on_input_textChanged()
{
    displayList();
}
*/
void MainWindow::listeL1(){
//    ui->to_add->hide();
    setPath("../inscriptionL1.csv");
    niveau=1;
    on_rechercher_clicked();
    qDebug()<<"TAFIDITRA";
}

void MainWindow::listeL2(){
//    ui->to_add->hide();
    setPath("../inscriptionL2.csv");
    niveau=2;
    on_rechercher_clicked();
}

/*
    QLabel* label= new QLabel();
    label->setPixmap(QPixmap("/path"));
*/

void MainWindow::on_listeL1_clicked()
{
    listeL1();
}

void MainWindow::on_listeL2_clicked()
{
    listeL2();
}
