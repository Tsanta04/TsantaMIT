#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include<vector>
#include<QHBoxLayout>
#include<QVBoxLayout>

QT_BEGIN_NAMESPACE
namespace Ui {
class MainWindow;
}
QT_END_NAMESPACE

using namespace std;
class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    string sport="";
    string dport="";
    string lisible_par_humain="";
    int flux_list=0;
    string commande="";
    vector<string> police={"ACCEPT","DROP","REJECT"};
    vector<string> datas;
    vector<string> interface;
    vector<string> rules[3];
    map<string,string> ports;
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:    

    void on_newRule_clicked();

    void on_listRules_clicked();

    void on_defaultRules_clicked();

    void on_defModify_clicked();

    void on_sportB_clicked();

    void on_dportB_clicked();

    void on_sB_clicked();

    void on_dB_clicked();

    void on_macB_clicked();

    void on_ajoutRegle_clicked();

    void on_addValid_3_clicked();

    void on_toolButton_4_clicked();

    void to_modify_rule(string rule,int aff,int j);

    void to_delete_rule(string rule,int aff,int j);

    void on_pushButton_clicked();

    void on_pushButton_2_clicked();

    void on_pushButton_3_clicked();

    void on_dInp_textChanged(const QString &arg1);

    bool gestionErreurMac(string mac1);

    bool gestionErreurIp(string mac1);
    void on_macInp_textChanged(const QString &arg1);

    void on_sInp_textChanged(const QString &arg1);

    void on_iInp_currentTextChanged(const QString &arg1);

    void on_oInp_currentTextChanged(const QString &arg1);

    void on_dportInp_currentTextChanged(const QString &arg1);

    void on_sportInp_currentTextChanged(const QString &arg1);

    void on_toolButton_5_clicked();

    void on_okError_clicked();

    void on_sportInp_currentIndexChanged(int index);

    void on_dportInp_currentIndexChanged(int index);

    void on_home_clicked();

private:
    void style();
    void getValues();
    void tocodeDel(string rule,int aff,int j);
    string to_command(string rule,int aff,int j);
    void putRules(int aff);
    void displayRules(int aff);
    QWidget* displayIt(string rule,int aff,int j);
    bool gestionErreur();
    void getDatas();
    void modify_default(string flux,string policy);
    Ui::MainWindow *ui;
};
#endif // MAINWINDOW_H
