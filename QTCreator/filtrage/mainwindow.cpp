#include "mainwindow.h"
#include "ui_mainwindow.h"
#include<cstdlib>
#include<cstring>
#include<string>
#include<iostream>
#include<fstream>
#include <sstream>
#include<cctype>
#include<QDebug>
#include<QPixmap>
#include<QGraphicsOpacityEffect>


using namespace std;
MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{    
    ui->setupUi(this);
    ui->newRule->setStyleSheet("color: rgb(71, 105, 255);");
    ui->listRules->setStyleSheet("color: rgb(71, 105, 255);");
    ui->defaultRules->setStyleSheet("color: rgb(71, 105, 255);");
    ui->home->setStyleSheet("color:pink");
    ui->Main->setCurrentIndex(2);
    ui->boxMessage->hide();
    ui->errorMessage->hide();
    getValues();
    ui->Main->show();
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_home_clicked()
{
    ui->newRule->setStyleSheet("color: rgb(71, 105, 255);");
    ui->listRules->setStyleSheet("color: rgb(71, 105, 255);");
    ui->defaultRules->setStyleSheet("color: rgb(71, 105, 255);");
    ui->home->setStyleSheet("color:pink");
    ui->Main->setCurrentIndex(2);
}

void MainWindow::on_newRule_clicked()
{
    ui->newRule->setStyleSheet("color:pink");
    ui->listRules->setStyleSheet("color: rgb(71, 105, 255);");
    ui->defaultRules->setStyleSheet("color: rgb(71, 105, 255);");
    ui->home->setStyleSheet("color: rgb(71, 105, 255);");

    ui->titre->setText("Add rules");
    ui->Main->setCurrentIndex(0);
    ui->Main->show();
}

void MainWindow::on_listRules_clicked()
{
    ui->pushButton->setStyleSheet("background-color:pink");
    ui->pushButton_2->setStyleSheet("background-color:rgb(71, 105, 255)");
    ui->pushButton_3->setStyleSheet("background-color: rgb(71, 105, 255)");

    ui->newRule->setStyleSheet("color: rgb(71, 105, 255);");
    ui->listRules->setStyleSheet("color:pink");
    ui->defaultRules->setStyleSheet("color: rgb(71, 105, 255);");
    ui->home->setStyleSheet("color: rgb(71, 105, 255);");

    putRules(0);
    ui->Main->setCurrentIndex(3);
    ui->Main->show();
}

void MainWindow::on_defaultRules_clicked()
{
    ui->newRule->setStyleSheet("color: rgb(71, 105, 255);");
    ui->listRules->setStyleSheet("color: rgb(71, 105, 255);");
    ui->defaultRules->setStyleSheet("color:pink");
    ui->home->setStyleSheet("color: rgb(71, 105, 255);");

//Give datas
    QComboBox* select[]={ui->dInputPolicy,ui->dForPolicy,ui->dOutputPolicy};
    getDatas();
    int k=0;
    for(int i=0;i<(int)datas.size();i++){
        if(strstr(datas[i].c_str(),"Chain")!=nullptr){
            for(int j=0;j<3;j++){
                if(strstr(datas[i].c_str(),police[j].c_str())!=nullptr){
                    select[k]->setCurrentIndex(j);
                    k++;
                    break;
                }
            }
        }
    }
    ui->Main->setCurrentIndex(1);
    ui->Main->show();
    datas.clear();
}

void MainWindow::on_defModify_clicked()
{
    lisible_par_humain="Default rules will be :\n";
    modify_default("INPUT",police[ui->dInputPolicy->currentIndex()]);
    modify_default("OUTPUT",police[ui->dOutputPolicy->currentIndex()]);
    modify_default("FORWARD",police[ui->dForPolicy->currentIndex()]);
}

void MainWindow::modify_default(string flux,string policy){
    commande+="sudo iptables -P "+flux+" "+policy+";";
    lisible_par_humain+= flux + " : " + policy + "\n" ;
    ui->message_3->setText(QString::fromStdString(lisible_par_humain));
    ui->boxMessage->show();
}

void MainWindow::getDatas(){
    shared_ptr<FILE> commandResult(popen("sudo iptables -L","r"),pclose);
    datas.clear();
    array<char,256> buffer;
    if(commandResult){
        while(!feof(commandResult.get())){
            if(fgets(buffer.data(),256,commandResult.get())!=nullptr){
                datas.push_back(buffer.data());
            }
        }
    }
}

void MainWindow::on_sportB_clicked()
{
    QString input=ui->sportInp->currentText();
    input+=",";
    sport=input.toStdString();
    ui->sportInp->setCurrentText(input);
    input.clear();
}

void MainWindow::on_dportB_clicked()
{
    QString input=ui->dportInp->currentText();
    input+=",";
    dport=input.toStdString();
    ui->dportInp->setCurrentText(input);
    input.clear();
}

void MainWindow::on_sB_clicked()
{
    QString input=ui->sInp->text();
    input+=" + ";
    ui->sInp->setText(input);
    input.clear();
}

void MainWindow::on_dB_clicked()
{
    QString input=ui->dInp->text();
    input+=" + ";
    ui->dInp->setText(input);
    input.clear();
}

void MainWindow::on_macB_clicked()
{
    QString input=ui->macInp->text();
    input+=" + ";
    ui->macInp->setText(input);
    input.clear();
}

void MainWindow::on_addValid_3_clicked()
{
    int k= system(commande.c_str());
    if(k!=0){
        ui->errorMessage->show();
    }
    ui->boxMessage->hide();
    sport="";dport="";
    putRules(flux_list);
}

void MainWindow::on_toolButton_4_clicked()
{
    ui->boxMessage->hide();
}

void MainWindow::putRules(int aff){
    int k=0;
    for(int i=0;i<3;i++)
        rules[i].clear();
    rules->clear();
    getDatas();
    for(int i=0;i<(int)datas.size();i++){
        if(strstr(datas[i].c_str(),"Chain")!=nullptr){
            i+=2;
            for(int j=i;j<(int)datas.size();j++){
                if(strstr(datas[j].c_str(),"Chain")!=nullptr){break;}
                if(datas[j]!="")rules[k].push_back(datas[j]);
                i=j;
            }
            k++;
            i--;
        }
    }
    displayRules(aff);
}

void MainWindow::displayRules(int aff){
    QWidget* input=ui->widOutput;
    if (input->layout() != nullptr) {
        QLayoutItem* item;
        while ((item = input->layout()->takeAt(0)) != nullptr) {
            delete item->widget();
            delete item;
        }
        delete input->layout();
    }
    for(int i=0;i<3;i++){
        QVBoxLayout* layout=new QVBoxLayout();
        for(int j=0;j<((int)rules[aff].size())-1;j++){
            layout->addWidget(displayIt(rules[aff][j],aff,j));
        }
        input->setLayout(layout);
    }
}

void MainWindow::on_ajoutRegle_clicked()
{
    if(ui->titre->text()=="Add rules")commande="";
    else commande+=" ;";
    commande+="sudo iptables -A ";
    commande+=ui->addFlux->currentText().toStdString();

    lisible_par_humain="  Do you want to "+(ui->policyInput->currentText()).toStdString() + " this rule :\n";
    lisible_par_humain+="Chain : "+ui->addFlux->currentText().toStdString()+"\n";

    if(ui->addProtocol->currentText()!="none"){
        commande+=" -p ";
        commande+=(ui->addProtocol->currentText()).toStdString();    //toString(transforme un QVariant en QString) et toStdString(transforme un QString en String)
        lisible_par_humain+="By protocol : "+ui->addProtocol->currentText().toStdString()+"\n";
    }

//Source
    if(ui->sportInp->currentText()!="none"){
        if(strstr(ui->sportInp->currentText().toStdString().c_str(),",")!=nullptr){
            commande+=" -m multiport --sport ";
            istringstream iss(ui->sportInp->currentText().toStdString().c_str());
            string tmp="";
            while(getline(iss,tmp,',')){
                commande+=ports[tmp];
                commande+=",";
            }
            commande.pop_back();
        }
        else{
            commande+=" --sport "+ports[ui->sportInp->currentText().toStdString()];
        }
        lisible_par_humain+="From port(s) : "+ui->sportInp->currentText().toStdString()+"\n";
    }
    if(ui->sInp->text()!=""){
        gestionErreurIp(ui->sInp->text().toStdString());
        commande+=" -s "+ui->sInp->text().toStdString();
        lisible_par_humain+="From : "+ui->sInp->text().toStdString()+"\n";
    }

    if(ui->macInp->text()!=""){
        gestionErreurMac(ui->macInp->text().toStdString());
        commande+=" -m mac --mac-source "+ui->macInp->text().toStdString();
        lisible_par_humain+="From PC : "+ui->macInp->text().toStdString()+"\n";
    }

    if(ui->iInp->currentText()!="none"){
        commande+=" -i ";
        commande+=(ui->iInp->currentText()).toStdString();    //toString(transforme un QVariant en QString) et toStdString(transforme un QString en String)
        lisible_par_humain+="From device : "+ui->iInp->currentText().toStdString()+"\n";
    }

//Destination
    if(ui->dportInp->currentText()!="none"){
        if(strstr(ui->dportInp->currentText().toStdString().c_str(),",")!=nullptr){
            commande+=" -m multiport --dport ";
            istringstream iss(ui->dportInp->currentText().toStdString().c_str());
            string tmp="";
            while(getline(iss,tmp,',')){
                commande+=ports[tmp];
                commande+=",";
            }
            commande.pop_back();
        }
        else{
            commande+=" --dport "+ports[ui->dportInp->currentText().toStdString()];
        }
        lisible_par_humain+="To port(s) : "+ui->sportInp->currentText().toStdString()+"\n";
    }

    if(ui->dInp->text()!=""){
        gestionErreurIp(ui->dInp->text().toStdString());
        commande+=" -d "+ui->dInp->text().toStdString();
        lisible_par_humain+="To : "+ui->dInp->text().toStdString()+"\n";
    }
    if(ui->oInp->currentText()!="none"){
        commande+=" -o ";
        commande+=(ui->oInp->currentText()).toStdString();    //toString(transforme un QVariant en QString) et toStdString(transforme un QString en String)
        lisible_par_humain+="To device : "+ui->iInp->currentText().toStdString()+"\n";
    }
    commande+=" -j ";
    commande+=(ui->policyInput->currentText()).toStdString();    //toString(transforme un QVariant en QString) et toStdString(transforme un QString en String)


    ui->message_3->setText(QString::fromStdString(lisible_par_humain));
    ui->boxMessage->show();
    lisible_par_humain.clear();
}

void MainWindow::on_pushButton_clicked()
{
    ui->pushButton->setStyleSheet("background-color:pink");
    ui->pushButton_2->setStyleSheet("background-color:rgb(71, 105, 255)");
    ui->pushButton_3->setStyleSheet("background-color: rgb(71, 105, 255)");

    putRules(0);
    ui->Main->setCurrentIndex(3);
    ui->Main->show();
}

void MainWindow::on_pushButton_2_clicked()
{
    ui->pushButton->setStyleSheet("background-color:rgb(71, 105, 255)");
    ui->pushButton_2->setStyleSheet("background-color:pink");
    ui->pushButton_3->setStyleSheet("background-color:rgb(71, 105, 255)");

    putRules(2);
    ui->Main->setCurrentIndex(3);
    ui->Main->show();
}

void MainWindow::on_pushButton_3_clicked()
{
    ui->pushButton->setStyleSheet("background-color:rgb(71, 105, 255)");
    ui->pushButton_2->setStyleSheet("background-color:rgb(71, 105, 255)");
    ui->pushButton_3->setStyleSheet("background-color: pink");

    putRules(1);
    ui->Main->setCurrentIndex(3);
    ui->Main->show();
}

QWidget* MainWindow::displayIt(string rule,int aff,int j){
//Affiche
    QWidget* box= new QWidget();
    box->setStyleSheet("qproperty-alignment: 'AlignCenter';background:none;border:1px solid black;border-radius: 10px;");
    box->setFixedWidth(840);
    box->setFixedHeight(50);

    QHBoxLayout* l=new QHBoxLayout();

    QLabel* lab= new QLabel();
    lab->setStyleSheet("border:0px solid black;font: 13pt \"Lucida Calligraphy\";");
    lab->setFixedWidth(780);
    lab->setFixedHeight(80);

    QPushButton* delet=new QPushButton("-");lab->setText(QString::fromStdString(rule));
    l->addWidget(lab);

    QPushButton* modify=new QPushButton("Mod");
    l->addWidget(modify);

    l->addWidget(delet);
    box->setLayout(l);

//Signaux des boutons
    connect(delet, &QPushButton::clicked, this, [this, rule,aff,j](){to_delete_rule(rule,aff,j+1);});
    connect(modify, &QPushButton::clicked, this, [this, rule,aff,j](){to_modify_rule(rule,aff,j+1);});

    return box;
}

void MainWindow::to_delete_rule(string rule,int aff,int j){
    tocodeDel(rule,aff,j);
    lisible_par_humain="Do you really want to delete that rule?";
    ui->message_3->setText(QString::fromStdString(lisible_par_humain));
    ui->boxMessage->show();
}

void MainWindow::tocodeDel(string rule,int aff,int j){
    commande = "sudo iptables -D ";
    if(aff==0){commande+="INPUT ";}
    if(aff==2){commande+="OUTPUT ";}
    if(aff==1){commande+="FORWARD ";}
    commande +=to_string(j);
}

void MainWindow::on_dInp_textChanged(const QString &arg1)
{
    if(!gestionErreurIp(ui->dInp->text().toStdString()))ui->dInp->setStyleSheet("color:red");
    else ui->dInp->setStyleSheet("color:black");
}

void MainWindow::on_macInp_textChanged(const QString &arg1)
{
    if(!gestionErreurMac(ui->macInp->text().toStdString()))ui->macInp->setStyleSheet("color:red");
    else ui->macInp->setStyleSheet("color:black");
}

void MainWindow::on_sInp_textChanged(const QString &arg1)
{
    if(!gestionErreurIp(ui->sInp->text().toStdString()))ui->sInp->setStyleSheet("color:red");
    else ui->sInp->setStyleSheet("color:black");
}

bool MainWindow::gestionErreurMac(string mac1){
    int k=0;
    for(int i=0;i<(int)mac1.size();i++){
        if(((i+1)%3)!=0){
            if(((mac1[i]<='9')&&(mac1[i]>='0'))||((mac1[i]<='f')&&(mac1[i]>='a'))){
                k++;
            }
        }
        else{
            if(mac1[i]==':')k++;
        }
    }
    if (k==(int)mac1.size()){return true;}
    return false;
}

bool MainWindow::gestionErreurIp(string ip){
    int k=0;
    int point=0;
    for(int i=0;i<(int)ip.size();i++){
        if(point<3){
            if((ip.at(i)<='9')&&(ip.at(i)>='0')){
                k++;
                qDebug()<<ip.at(i);
                point++;
            }
            else if((point!=0)&&(ip.at(i)=='.')){
                point=0;
                k++;
            }
        }
        else {
            if(ip.at(i)=='.'){
                k++;
                point=0;
            }
        }
    }
    if ((k==(int)ip.size())&&(k<14)){return true;}
    return false;
}

void MainWindow::getValues(){
    //Protocol
    //GetData
    string line="";
    string key="";
    string value="";
    ifstream f("/etc/services");

    if(f.is_open()){
        while(!f.eof()){
            getline(f,line);
            if(line[0]!='#'){
                string inutile="";
                istringstream iss(line);
                getline(iss,key,'\t');
                getline(iss,value,'/');
                string::iterator it = find_if(value.begin(), value.end(), [](char c) {
                    return c != '\t';
                });
                  value.erase(value.begin(), it);
                ports[key]=value;
            }
        }
    }
    //register it
    for(const auto& str : ports){
        ui->dportInp->addItem(QString::fromStdString(str.first));
        ui->sportInp->addItem(QString::fromStdString(str.first));
    }
    //Interface
    //getData
    shared_ptr<FILE> commandResult(popen("ls /sys/class/net","r"),pclose);
    interface.clear();
    array<char,256> buffer;
    if(commandResult){
        while(!feof(commandResult.get())){
            if(fgets(buffer.data(),256,commandResult.get())!=nullptr){
                interface.push_back(buffer.data());
            }
        }
    }
    //Register it
    for(const auto& str : interface){
        ui->oInp->addItem(QString::fromStdString(str));
        ui->iInp->addItem(QString::fromStdString(str));
    }
}

void MainWindow::on_iInp_currentTextChanged(const QString &arg1)
{
    for(const auto& str : interface){
        if(strstr(str.c_str(),(ui->iInp->currentText()).toStdString().c_str())!=nullptr){
            ui->iInp->addItem(QString::fromStdString(str));
        }
    }
}

void MainWindow::on_oInp_currentTextChanged(const QString &arg1)
{
    for(const auto& str : interface){
        if(strstr(str.c_str(),(ui->oInp->currentText()).toStdString().c_str())!=nullptr){
            ui->oInp->addItem(QString::fromStdString(str));
        }
    }
}

void MainWindow::on_dportInp_currentTextChanged(const QString &arg1)
{
    for(const auto& str : ports){
        if(strstr(str.first.c_str(),(ui->sportInp->currentText()).toStdString().c_str())!=nullptr){
            ui->sportInp->addItem(QString::fromStdString(str.first));
        }
    }
}

void MainWindow::on_sportInp_currentTextChanged(const QString &arg1)
{
    for(const auto& str : ports){
        if(strstr(str.first.c_str(),(ui->dportInp->currentText()).toStdString().c_str())!=nullptr){
            ui->dportInp->addItem(QString::fromStdString(str.first));
        }
    }
}

void MainWindow::on_toolButton_5_clicked()
{
    ui->errorMessage->hide();
}

void MainWindow::on_okError_clicked()
{
    ui->errorMessage->hide();
}

void MainWindow::to_modify_rule(string rule,int aff,int j){
    tocodeDel(rule,aff,j);
    string essai=to_command(rule,aff,j);
}

string MainWindow::to_command(string rule,int aff,int j){

    ui->titre->setText("Modify a rule");
    vector <string> opt;
    string tmp="";
    istringstream iss(rule);
    for(int i=0;(getline(iss,tmp,' '));i++){
        if(tmp!="")opt.push_back(tmp);
    }
    ui->Main->setCurrentIndex(0);
    ui->addFlux->setCurrentIndex(aff);

    if(opt[1]!="all"){
        ui->addProtocol->setCurrentText(QString::fromStdString(opt[1]).toUpper());
    }
    else{ui->addProtocol->setCurrentText(QString::fromStdString("none"));}

    if(opt[3]!="anywhere"){
        ui->sInp->setText(QString::fromStdString(opt[3]));
    }
    else{ui->sInp->setText(QString::fromStdString(""));}

    if(opt[4]!="anywhere"){
        ui->dInp->setText(QString::fromStdString(opt[4]));
    }
    else{ui->dInp->setText(QString::fromStdString(""));}
    tmp="";
    string inutile="";
    const char* temp=strstr(rule.c_str(),"dpt");
    if(temp!=nullptr){
        string t(temp);
        istringstream iss(t);
        getline(iss,inutile,':');
        getline(iss,inutile,' ');//QString::fromStdString(inutile)
        ui->dportInp->setCurrentText(QString::fromStdString(inutile));
    }
    temp=strstr(rule.c_str(),"spt");
    if(temp!=nullptr){
        string t(temp);
        istringstream iss(t);
        getline(iss,inutile,':');
        getline(iss,inutile,' ');
        ui->sportInp->setCurrentText(QString::fromStdString(inutile));
    }else ui->sportInp->setCurrentText("none");
    temp=strstr(rule.c_str(),"MAC");
    if(temp!=nullptr){
        string t(temp);
        istringstream iss(t);
        getline(iss,inutile,' ');
        inutile.erase(0,3);
        ui->macInp->setText(QString::fromStdString(inutile));
    }else ui->macInp->setText("");
    ui->policyInput->setCurrentText(QString::fromStdString(opt[0]));
    opt.clear();

    return rule;
}

void MainWindow::on_sportInp_currentIndexChanged(int index)
{
    sport+=(ui->sportInp->currentText()).toStdString();
    ui->sportInp->setCurrentText(QString::fromStdString(sport));
}

void MainWindow::on_dportInp_currentIndexChanged(int index)
{
    dport+=(ui->dportInp->currentText()).toStdString();
    ui->dportInp->setCurrentText(QString::fromStdString(dport));
}

//--+ Protocols & interface scrollbar--//
