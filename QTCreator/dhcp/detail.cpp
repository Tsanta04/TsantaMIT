#include "detail.h"
#include "ui_detail.h"

#include<fstream>
#include<QFile>
#include<vector>
#include<QDebug>
#include<QMessageBox>
#include<QTextStream>

Detail::Detail(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::Detail)
{
    ui->setupUi(this);

//    labelImage = ui->label_3;
}

Detail::~Detail()
{
    delete ui;
}

using namespace std;
void Detail::setDetail(vector<string> etudiant)
{
    et=etudiant;
//    labelImage->setPixmap(etudiant.photo.scaled(labelImage->size(), Qt::KeepAspectRatio));

    ui->label->setAlignment(Qt::AlignCenter);
    ui->label->setText(QString::fromStdString(etudiant[0]));

    ui->num_pan->setText(QString::fromStdString(etudiant[4]));
    ui->etat->setText(QString::fromStdString(etudiant[5]));
    ui->ref->setText(QString::fromStdString(etudiant[3]));
    ui->addr->setText(QString::fromStdString(etudiant[6]));
    ui->enps0->setText(QString::fromStdString(etudiant[1]));
    ui->wifi->setText(QString::fromStdString(etudiant[2]));

    setWindowTitle("Détails de l'étudiant");
}

void Detail::on_pushButton_3_clicked()
{
    this->hide();
}

void Detail::on_pushButton_2_clicked()
{
    QMessageBox::StandardButton reply= QMessageBox::question(this,tr("Supprimer info"),tr("Voulez vous vraiment supprimer?"));
    if(reply==QMessageBox::Yes){
        supprimer();
    }
}

void Detail::getPath(string p){
    path=p;
}

void Detail::supprimer(){
    vector<QString> lister;
    QString tmp;
    QFile fichier(QString::fromStdString(path));

///Suppression fichier
    if(fichier.open(QIODevice::ReadOnly | QIODevice::Text)){
        QTextStream chaine(&fichier);
        while(!chaine.atEnd()){
            tmp=chaine.readLine();
            qDebug()<<chaine.readLine();
            QString t=QString::fromStdString(et[0]);
            if(!tmp.contains(t)){
                lister.push_back(tmp);
                qDebug()<<tmp;
            }
        }
        fichier.close();
    }
    fichier.open((QIODevice::WriteOnly) | QIODevice::Text);
    QTextStream chaine(&fichier);
    for(int i=0;i<(int)lister.size();i++){
        chaine<<lister[i]<<"\n";
    }
    lister.clear();

///Suppression dhcp
    suppr_dhcp(et[7]);
}

int position_aSupprimer (string path, string search){
    int j=0, i=0;
    string chaine{""};
    size_t pos;

    ifstream file {path};

    if(file.is_open()){
        while(getline(file , chaine)){
            pos = chaine.find(search);
            if(pos != string::npos){
                j = i;
            }
            i++;
        }
        file.close();
    }
    return j;
}

vector<string> nouveauFichier(string path, int position){
    vector<string> list;
    int i=0;
    string chaine;

    ifstream f {path};
    if(f.is_open()){
        while(getline(f , chaine)){
            if(i<position-2 || i>position+1){
                 list.push_back(chaine);
            }
            i++;
        }
        f.close();
    }

    return list;
}

void Detail::suppr_dhcp (string search)
{
    string chaine{""};
    string tmp;
    //string search = "168.192.1.69";
    vector<string> list;
    int position=0;

    position = position_aSupprimer("configuration.conf", search);

//    cout << "POsition " << position << endl;

    list = nouveauFichier("configuration.conf", position);

    if(position!=0){
        ofstream fichier {"configuration.conf"};
        if(fichier.is_open()){
            for(int i=0; i<(int)list.size(); i++){
                fichier << list[i]<<endl;
            }
            fichier.close();
        }
    }
}
