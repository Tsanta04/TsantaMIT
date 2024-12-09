#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include<vector>
#include <QMainWindow>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE
using namespace std;
class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
//Attributs pour tout le monde
    int niveau=1;
    vector<string> datas;
    string path="../inscriptionL1.csv";
//Outils importants
    MainWindow(QWidget *parent = nullptr);    
    ~MainWindow();
//Lister
    void displayList();
    void getData(string searched,string path,int mode);
    bool compare(string tmp, string str);
    void setPath(string p);
//Ajouter
    bool realSyntax(string mac1, string mac2);
    bool is_ip_fixed(string path,string nom,string ip,string mac);

private slots:
//Methode pour tout le monde
    void on_menu_triggered();
//Lister
//    void on_tableWidget_itemClicked(QTableWidgetItem *item);
    void on_rechercher_clicked();
    void listeL2();
    void listeL1();
//Ajouter
    string getIp(string p);
    void on_add_clicked();
    void ajouterL1();
    void ajouterL2();

    void on_liste_cellDoubleClicked(int row, int column);

    void on_input_textChanged();

//    void on_delet_clicked();

private:
    Ui::MainWindow *ui;

};
#endif // MAINWINDOW_H
