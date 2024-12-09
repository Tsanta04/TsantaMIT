#include "mainwindow.h"
#include "ui_mainwindow.h"
#include<iostream>
#include<string>
#include<cstring>
#include<cstdlib>
#include<cmath>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_n1_clicked()
{
    operation.append("1");
    str.append("1");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_n7_clicked()
{
    operation.append("7");
    str.append("7");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_n2_clicked()
{
    operation.append("2");
    str.append("2");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_n3_clicked()
{
    operation.append("3");
    str.append("3");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_n4_clicked()
{
    operation.append("4");
    str.append("4");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_n5_clicked()
{
    operation.append("5");
    str.append("5");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_n6_clicked()
{
    operation.append("6");
    str.append("6");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_n8_clicked()
{
    operation.append("8");
    str.append("8");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_n9_clicked()
{
    operation.append("9");
    str.append("9");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_n0_clicked()
{
    operation.append("0");
    str.append("0");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_np_clicked()
{
    operation.append("+");
    str.append("+");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_nm_clicked()
{
    operation.append("-");
    str.append("-");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_nf_clicked()
{
    operation.append("*");
    str.append("*");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_nv_clicked()
{
    operation.append(",");
    str.append(",");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_nd_clicked()
{
    operation.append("/");
    str.append("/");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_Ac_clicked()
{
    operation="";
    str="";
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_Dc_clicked()
{
    if(operation[operation.size()-1]=='M'){
        for(int i=0;i<5;i++){
            str=str.left(str.length()-1);
        }
    }
    else if (operation[operation.size()-1]=='v'){
        for(int i=0;i<2;i++){
            str=str.left(str.length()-1);
        }
    }
    else str=str.left(str.length()-1);
    operation[operation.size()-1]='\0';
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_npui_clicked()
{
    operation.append("^");
    str.append("^");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_nr_clicked()
{
    operation.append("v");
    str.append("v^");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_nmo_clicked()
{
    operation.append("M");
    str.append(" Mod ");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_npf_clicked()
{
    operation.append(")");
    str.append(")");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_npo_clicked()
{
    operation.append("(");
    str.append("(");
    ui->input->setText(str);
    //if(erreur()!=-1)ui->message->setText(QString::fromStdString(std::to_string(calcul(operation))));
}

void MainWindow::on_neq_clicked()
{
    char res[100];
    float result=0;
    if(str!=""){
        if(erreur()==-1){
            ui->input->setText("SYNTAX  ERROR");
            str="";
            operation="";
             return;
        }
        operation=reglage(operation);
        result=calcul(operation);
        str="";
        operation="";
        sprintf(res,"%f",result);
        ui->input->setText(QString::fromStdString(res));
    }
}

int MainWindow::erreur(){
    char anomalies[]="+-v*/M^,";
    char oh=operation[0];
    int test=0;
    for(int j=3;j<7;j++){
        if(oh==anomalies[j])return -1;
    }
    for(int i=0;i<(int)operation.size();i++){
        if(operation[i]=='('){
            test++;
        }
        else if(operation[i]==')'){
            test--;
        }
    }
    if(test!=0)return -1;
    for(int i=1;i<(int)operation.length();i++){
        if((oh==operation[i])&&(oh==','))return -1;
        for(int j=3;j<7;j++){
            if(oh==anomalies[j]){
                for(int k=3;k<7;k++){
                    if(operation[i]==anomalies[k])return -1;
                }
            }
            if(((oh=='+')||(oh=='(')||(oh=='-')||(oh=='v'))&&(operation[i]==anomalies[j]))return -1;
            if((operation[i]==')')&&(oh==anomalies[j]))return -1;
        }
        oh=operation[i];
    }
    return 0;
}

std::string MainWindow::reglage(std::string operation){
    std::string operationK="";
    operationK+=operation[0];
    char oh=operation[0];
    for(int i=1;i<(int)operation.size();i++){
        if((oh==')')&&(operation[i]>='0')&&(operation[i]<='9')){
            operationK+='*';
            operationK+=+operation[i];
        }
        else if(((operation[i]=='(')||(operation[i]=='v'))&&(((oh>='0')&&(oh<='9'))||(oh==','))){
            if(operation[i]=='v')operationK+="*v";
            else if(operation[i]=='(')operationK+="*(";
        }
        else operationK+=operation[i];
        oh=operation[i];
    }
//    ui->input->setText(QString::fromStdString(operationK));
    return operationK;
}

float MainWindow::calcul(std::string operation){
    char num[100][100];
    char oper[10];
    char oh;
    int k=0;
    int l=0;
    int test=0;
    float result=0;
    int sOperande=0;    //Hijerena ny fisiana operateur maro mifanesy
    std::string operationK="";
    std::string tmp="";

///Gestion parenthèse
    for(int i=0;i<(int)operation.size();i++){
        if(operation[i]=='('){
            test=1;
            for(int j=i+1;test!=0;j++,i++){
                if(operation[j]==')'){
                    test--;
                }
                else if(operation[j]=='('){
                    test++;
                }
                if(test!=0){tmp+=operation[j];}
            }
            operationK+=std::to_string(calcul(tmp));
            tmp="";
            continue;
        }
        operationK+=operation[i];
    }
    operation=operationK;
    ui->input->setText(QString::fromStdString(operationK));

///Calcul
    //if(str!=""){
        if((operation[0]=='+')||(operation[0]=='-')){
            num[k][l]=operation[0];
            l++;
            sOperande=1;
        }
        for(int i=sOperande;i<=(int)operation.length();i++){
            oh=operation[i];
            if(((oh>='0')&&(oh<='9'))||(oh=='v')){
                num[k][l]=oh;
                l++;
                sOperande=0;
            }
            else if(oh==','){
                num[k][l]=',';
                l++;
                sOperande=0;
            }
            else if ((oh=='+')||(oh=='*')||(oh=='/')||(oh=='-')||(oh=='^')||(oh=='M')){
                if(sOperande==1){
                    if(l==0){
                        num[k][0]=oh;
                        l++;
                    }
                    else if(num[k][0]=='+'){
                        if(oh=='+')num[k][0]='+';
                        else if(oh=='-')num[k][0]='-';
                    }
                    else if(num[k][0]=='-'){
                        if(oh=='-')num[k][0]='+';
                        else if(oh=='+')num[k][0]='-';
                    }
                }
                else{
                    if(oh=='M')oper[k]='%';
                    else oper[k]=oh;
                    k++;
                    l=0;
                    if((oh=='+')||(oh=='-')){
                        num[k][l]=oh;
                        l++;
                    }
                }
               sOperande=1;
            }
        }

///Racine carree
        for(int i=0;i<=k;i++){
            char tmp[]="";
            if(num[i][0]=='v'){
                for(int k=1;k<(int)strlen(num[i]);k++){
                    tmp[k-1]=num[i][k];
                }
                sprintf(num[i],"%f",sqrt(atof(tmp)));
            }
        }
///Puissance
        for(int i=0;i<k;i++){
            if(oper[i]=='^'){
                float n1=atof(num[i]);
                float n2=atof(num[i+1]);
                result=(float)pow(n1,n2);
                sprintf(num[i],"%f",result);
                for(int j=i+1;j<(k+2);j++){
                    strcpy(num[j],num[j+1]);
                }
                for(int j=i;j<(k-1);j++){
                    oper[j]=oper[j+1];
                }
                k--;
                i--;
            }
        }
        result=0;

///Fois et division
        for(int i=0;i<k;i++){
            if((oper[i]=='*')||(oper[i]=='/')||(oper[i]=='%')){
                float n1=atof(num[i]);
                float n2=atof(num[i+1]);
                if(oper[i]=='%')result=((int)n1%(int)n2);
                if(oper[i]=='*')result=(n1*n2);
                if(oper[i]=='/')result=(n1/n2);
                sprintf(num[i],"%f",result);
                for(int j=i+1;j<(k+2);j++){
                    strcpy(num[j],num[j+1]);
                }
                for(int j=i;j<(k-1);j++){
                    oper[j]=oper[j+1];
                }
                k--;
                i--;
            }
        }
        result=0;

///Somme et addition
        for(int i=0;i<=k;i++){
            float n1=atof(num[i]);
//            float n2=atof(num[i+1]);
            result+=n1;
        }
        return result;
        //}
}
