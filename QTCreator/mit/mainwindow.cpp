#include "mainwindow.h"
#include "ui_mainwindow.h"
#include<QFileDialog>
#include<QSqlRecord>
#include<QImage>
#include<fstream>
#include<QSqlQuery>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    QSqlDatabase db=QSqlDatabase::addDatabase("QMYSQL");
    db.setHostName("localhost");
    db.setDatabaseName("mit");
    db.setUserName("root");
    db.setPassword("root");
    bool valide=db.open();
    ui->setupUi(this);
    if(valide){
        table= new QSqlTableModel(this);
        ui->go_edit->hide();
        ui->Option->hide();
        ui->addImg->hide();
        ui->information->hide();
    }
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::getData(){

    table->setTable("students");
    if(niveau!=6){
        table->setFilter(QString("niveau = %1").arg(niveau));
    }
    table->setSort(1,Qt::AscendingOrder);
    table->select();
/*
    QSqlQuery requete("SELECT * FROM info");
    if(requete.next()){
        ui->input->setText(QString::number(table->rowCount()));
    }
*/
}

void MainWindow::displayData(){
    QVBoxLayout* layout=new QVBoxLayout();
    for(int i=0;i<table->rowCount();i++){
        QSqlRecord ligne=table->record(i);
        layout->addWidget(box(i,ligne.value("Noms").toString()));
    }
    ui->scrollAreaWidgetContents->setLayout(layout);
}

void MainWindow::filter(QString searched,QString column){
    if(column=="Trier par:"){
        table->setFilter(QString("Nom LIKE %1 OR MacE LIKE %1 OR MacW LIKE %1 OR Serial LIKE %1 OR Pan LIKE %1 OR Etat LIKE %1 OR Ip LIKE %1").arg(searched));
    }
    table->setFilter(QString("%1 LIKE '%2\%'").arg(column).arg(searched));
    table->select();
}

QWidget* MainWindow::box(int num,QString name){
    QWidget* wi= new QWidget();
    QHBoxLayout* layout=new QHBoxLayout();
    QLabel* labNum= new QLabel();
    QLabel* labName= new QLabel();
    QPushButton* bouton = new QPushButton(">");
    labNum->setFixedWidth(100);
    labName->setFixedWidth(650);
    wi->setFixedHeight(150);

    wi->setStyleSheet("border-radius: 28px;margin:30px;background: qlineargradient(x1: 0, y1: 0, x2: 1, y2: 0,stop: 0 #FF4400,stop: 0.5 #FF007F,stop: 1 #8A2BE2);font: 700 9pt \"Script\";color: rgb(255, 255, 255);");
    labNum->setStyleSheet("border-radius: 28px;background-color:transparent;");
    labName->setStyleSheet("background-color:transparent;border-radius: 28px;");
    bouton->setStyleSheet("background-color:transparent;");

//    connect(bouton,SIGNAL(clicked(true)),this,SLOT(detail(num)));
    connect(bouton, &QPushButton::clicked, this, [=]() {
        detail(num,table);
    });

    layout->addWidget(labNum);
    layout->addWidget(labName);
    layout->addWidget(bouton);
    wi->setLayout(layout);

    labNum->setText(QString::number(num));
    labName->setText(name);

    return wi;
}

void MainWindow::detail(int index,QSqlTableModel* table){
    QSqlRecord ligne=table->record(index);

    ui->name->setText(ligne.value("Name").toString());
    ui->macE->setText(ligne.value("MacE").toString());
    ui->macW->setText(ligne.value("MacW").toString());
    ui->serial->setText(ligne.value("Serial").toString());
    ui->pan->setText(ligne.value("Pan").toString());
    ui->ip->setText(ligne.value("Ip").toString());
    ui->etat->setText(ligne.value("Etat").toString());
/*
    QByteArray img = ligne.value("Photo").toByteArray();
    QImage imgB = QImage::loadFromData(img);
    QPixmap imgV = QPixmap::fromImage(imgB);
    ui->photo->setPixmap(imgV);
*/
    ui->name->setReadOnly(true);
    ui->macE->setReadOnly(true);
    ui->macW->setReadOnly(true);
    ui->serial->setReadOnly(true);
    ui->pan->setReadOnly(true);
    ui->ip->setReadOnly(true);
    ui->etat->setReadOnly(true);

    ui->information->show();

    connect(ui->editer,&QPushButton::clicked,this, [=](){
        on_editer_clicked(index);
    });

    connect(ui->corbeil,&QPushButton::clicked,this,[=](){
        ui->corbeil->setStyleSheet("background-color:white;");
        ui->Option->show();
        connect(ui->del_reseau,&QPushButton::clicked,this,[=](){
            supprimer_du_reseau(index,table);
        });
        connect(ui->del_tout,&QPushButton::clicked,this,[=](){
            deleteStudent(index,table);
            supprimer_du_reseau(index,table);
        });
    });
}
using namespace std;
vector<string> MainWindow::nouveauFichier(string path, int position){
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

int MainWindow::position_aSupprimer (string path, string search){
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

void MainWindow::supprimer_du_reseau(int index, QSqlTableModel* table)
{
    QSqlRecord ligne=table->record(index);
    string search=QString(ligne.value("Ip").toString()).toStdString();

    string chaine{""};
    string tmp;
    //string search = "168.192.1.69";
    vector<string> list;
    int position=0;

    position = position_aSupprimer("configuration.conf", search);

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

void MainWindow::on_quit_clicked()
{
    ui->addImg->hide();
    ui->Option->hide();
    ui->information->hide();
}

void MainWindow::deleteStudent(int index,QSqlTableModel* table){
    table->removeRow(index);
    table->submitAll();
}

void MainWindow::on_editer_clicked(int index)
{
    ui->editer->setStyleSheet("background-color:white;");
    ui->photo_6->setStyleSheet("border: 2px solid grey;border-radius: 20px;background-color:white;");
    ui->addImg->show();
    ui->name->setReadOnly(false);
    ui->macE->setReadOnly(false);
    ui->macW->setReadOnly(false);
    ui->serial->setReadOnly(false);
    ui->pan->setReadOnly(false);
    ui->ip->setReadOnly(false);
    ui->etat->setReadOnly(false);
    ui->go_edit->show();
    connect(ui->go_edit, &QPushButton::clicked, this, [=]() {
        edit(index,table);
    });
}

void MainWindow::edit(int index, QSqlTableModel* table){
    QSqlRecord ligne = table->record(index);
    ligne.setValue("Nom",QString("%1").arg(ui->name->text()));
    ligne.setValue("MacE",QString("%1").arg(ui->macE->text()));
    ligne.setValue("MacW",QString("%1").arg(ui->macW->text()));
    ligne.setValue("serial",QString("%1").arg(ui->serial->text()));
    ligne.setValue("pan",QString("%1").arg(ui->pan->text()));
    ligne.setValue("etat",QString("%1").arg(ui->etat->text()));
                //Recuperate image
    table->setRecord(index,ligne);
    detail(index,table);
//image++
}

void MainWindow::on_add_clicked()
{
    ui->main->setCurrentIndex(1);
}

void MainWindow::on_go_to_list_clicked()
{
    ui->main->setCurrentIndex(0);
}

QString MainWindow::getImg(QLabel* label)
{
    QString imagePath = QFileDialog::getOpenFileName(nullptr, "Sélectionner une image", "", "Images (*.png *.jpg *.jpeg *.bmp)");
    // Charger l'image sélectionnée dans le QLabel
    if (!imagePath.isEmpty()) {
        QPixmap image(imagePath);
        if (!image.isNull()) {
            label->setPixmap(image);
            label->setScaledContents(true); // Redimensionner le QLabel pour s'adapter à l'image
            label->show();
        } else {
            // Afficher un message d'erreur si le chargement de l'image a échoué
            label->setText("Impossible de charger l'image.");
            label->show();
        }
        return imagePath;
    }
    return "";
}

void MainWindow::on_toolButton_clicked()
{
    imgModified=getImg(ui->photo);
}

void MainWindow::on_addImg_clicked()
{
    imgAdded=getImg(ui->photo_6);
}

/*
    Add person
*/

void MainWindow::on_all_clicked()
{
    niveau=6;
    getData();
    displayData();
}

void MainWindow::on_l1_clicked()
{
    niveau=1;
    getData();
    displayData();
}

void MainWindow::on_l2_clicked()
{
    niveau=2;
    getData();
    displayData();

}

void MainWindow::on_l3_clicked()
{
    niveau=3;
    getData();
    displayData();

}

void MainWindow::on_m1_clicked()
{
    niveau=4;
    getData();
    displayData();
}

void MainWindow::on_m2_clicked()
{
    niveau=5;
    getData();
    displayData();
}

void MainWindow::on_search_clicked()
{
    filter(ui->input->text(),ui->comboBox->currentText());
    displayData();
}

