#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <fstream>
#include <sstream>
#include <cstring>
#include<ctype.h>
#include<vector>
#include <iostream>
#include<QAction>
#include <QTableWidgetItem>
#include <QDebug>
#include "detail.h"
using namespace std;
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->liste->setSelectionBehavior(QAbstractItemView::SelectRows);
}

MainWindow::~MainWindow()
{
    delete ui;
}

///Lister
void MainWindow::getData(string searched,string path,int mode){
    ifstream file(path);
    string line="";
    string tmp="";
    datas.clear();
    if(file.is_open()){
        while(getline(file,line)){//&&(searched!="")
            if((mode!=0)&&(mode!=9)){
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
}

bool MainWindow::compare(string tmp,string str){
    QString a=QString::fromStdString(tmp).toLower();
    QString b=QString::fromStdString(str).toLower();

    return a.contains(b);
}

void MainWindow::displayList(){
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
}

void MainWindow::setPath(string p){
    path=p;
}

void MainWindow::on_rechercher_clicked()
{
    displayList();
}

void MainWindow::on_input_textChanged()
{
    displayList();
}

void MainWindow::listeL1(){
    ui->to_add->hide();
    setPath("../inscriptionL1.csv");
    niveau=1;
    on_rechercher_clicked();
    qDebug()<<"TAFIDITRA";
}

void MainWindow::listeL2(){
    ui->to_add->hide();
    setPath("../inscriptionL2.csv");
    niveau=2;
    on_rechercher_clicked();
}

///Ajouter
void MainWindow::on_add_clicked()
{
    string nom=(ui->nom->text()).toStdString();
    string mac_ether=(ui->mac_ether->text()).toStdString();
    string mac_wlp=(ui->mac_wlp->text()).toStdString();
    string serial=(ui->serial->text()).toStdString();
    string pan=(ui->pan->text()).toStdString();
    string etat=(ui->etat->text()).toStdString();
    string ip=getIp("../lastIp.txt");

    if(realSyntax(mac_ether,mac_wlp)){
        ofstream file(path,ios::app);
        if((file.is_open())&&(is_ip_fixed("../fixed.conf",nom,ip,mac_wlp))){
            file<<(int)(ui->liste->rowCount()+1)<<nom<<" ,"<<mac_ether<<" ,"<<mac_wlp<<" ,"<<serial<<" ,"<<pan<<" ,"<<etat<<" ,"<<ip<<endl;
            file.close();
        }
        file.clear();
    }
}

bool MainWindow::realSyntax(string mac1, string mac2){
//mac1
    for(int i=0;i<(int)mac1.size();i++){
        if(((((mac1[i]>'9')||(mac1[i]<'0'))||((mac1[i]>'f')||(mac1[i]<'a')))&&((i+1)%3)!=0)||((mac1[i]==':')&&(((i+1)%3)!=0))){
                return false;
        }
    }
//mac2
    for(int i=0;i<(int)mac2.size();i++){
        if((((mac2[i]>'9')||(mac2[i]<'0'))||((mac2[i]>'f')||(mac2[i]<'a')))&&((((i+1)%3)!=0)||((mac2[i]==':')&&(((i+1)%3)!=0)))){
            return false;
        }
    }
    return true;
}

bool MainWindow::is_ip_fixed(string path,string nom,string ip,string mac){
    ofstream file(path,ios::app);
    if(file.is_open()){
        file<<"host "<<nom<<"{"<<endl;
        file<<"\thardware ethernet: "<<mac<<";"<<endl;
        file<<"fixed-address: "<<ip<<";"<<endl;
        file<<"}"<<endl;
        file.close();
        file.clear();
        return true;
    }
    return false;
}

string MainWindow::getIp(string p){
    ifstream file(p);
    string tmp="";
    string line="";
    vector<string> octet;
    if(file.is_open()){
        getline(file,line);
        istringstream iss(line);
        for(int i=0;i<4;i++){
            getline(iss,tmp,'.');
            octet.push_back(tmp);
        }

        for(int i=3;i>=0;i--){
            if(octet[i]=="255"){
                octet[i-1]=to_string((stoi(octet[i-1]))+1);
                octet[i]="0";
            }
            else if(((octet[i])!="255")&&(i==3)){
                octet[i]=to_string((stoi(octet[i]))+1);
            }
        }
        file.close();
    }
    file.clear();
/*
    QLabel* label= new QLabel();
    label->setPixmap(QPixmap("/path"));
*/
    ofstream f(p);
    line="";
    if(f.is_open()){
        for(int i=0;i<4;i++){
            line+=octet[i];
            if(i<3)line+=".";
            f<<octet[i]<<".";
        }
        f.close();
    }
    f.clear();
    octet.clear();
    return line;
}

void MainWindow::ajouterL1(){
    setPath("../inscriptionL1.csv");
    niveau=1;
    getData("",path,0);
    ui->to_list->hide();
    ui->to_add->show();
}

void MainWindow::ajouterL2(){
    setPath("../inscriptionL2.csv");
    niveau=2;
    getData("",path,0);
    ui->to_list->hide();
    ui->to_add->show();
}

///Action
void MainWindow::on_menu_triggered(){
    connect(ui->listeL1, SIGNAL(triggered()), this, SLOT(listeL1()));
    connect(ui->listeL2, SIGNAL(triggered()), this, SLOT(listeL2()));
    connect(ui->ajouterL2, SIGNAL(triggered()), this, SLOT(ajouterL2()));
    connect(ui->ajouterL1, SIGNAL(triggered()), this, SLOT(ajouterL1()));
}

///Information
void MainWindow::on_liste_cellDoubleClicked(int row, int column)
{
    vector<string> info;
//    vector<QLabel*>output={ui->Lnom,ui->Lme,ui->Lmw,ui->Ls,ui->Let,ui->Lpan,ui->Lip,ui->Lniv};
    for(int i=1;i<8;i++){
        info.push_back((ui->liste->item(row,i)->text()).toStdString());
    }
    Detail *detail = new Detail(this);
    detail->getPath(path);
    detail->setDetail(info);
    detail->show();
    info.clear();
/*
    vector<string> info;
    vector<QLabel*>output={ui->Lnom,ui->Lme,ui->Lmw,ui->Ls,ui->Let,ui->Lpan,ui->Lip,ui->Lniv};
    for(int i=1;i<8;i++){
        info.push_back((ui->liste->item(row,i)->text()).toStdString());
    }
    info.push_back("L"+to_string(niveau));

    for(int i=0;i<8;i++){
        output[i]->setText(QString::fromStdString(info[i]));
    }

    ui->info->show();
*/
}
