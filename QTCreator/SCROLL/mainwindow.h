#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include<QFrame>
#include<vector>
#include <QMainWindow>
using namespace std;

typedef struct{
    string nom;
    string macE;
    string macW;
    string serial;
    string pan;
    string etat;
    string ip;
    string num;
}Et;

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
//Attributs pour tout le monde
    int niveau=1;
    int position=1;
    vector<string> datas;
    string path="../inscriptionL1.csv";
    Et* et;

//Total des:
    int totalPersonne=0;
    int totalPanasonic=0;
    int totalOccurence=0;

//Outils importants
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

//Affichage
    void affichage();
//Lister
    //QFrame* creerWidget(string et);
   QFrame* creerWidget(Et et);
    void displayList();
    void getData(string searched,string path,int mode);
    bool compare(string tmp, string str);
    void setPath(string p);
    void getTotal();

private slots:
//Lister
    void on_rechercher_clicked();
    void listeL2();
    void listeL1();
//    void on_input_textChanged();


    void on_listeL1_clicked();

    void on_listeL2_clicked();
private:
    Ui::MainWindow *ui;

};
#endif // MAINWINDOW_H
