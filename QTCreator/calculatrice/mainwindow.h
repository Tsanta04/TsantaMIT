#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include<string>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    QString str="";
    std::string operation="";
private slots:
    void on_n7_clicked();

    void on_n1_clicked();

    void on_n2_clicked();

    void on_n3_clicked();

    void on_n4_clicked();

    void on_n5_clicked();

    void on_n6_clicked();

    void on_n8_clicked();

    void on_n9_clicked();

    void on_n0_clicked();

    void on_neq_clicked();

    void on_np_clicked();

    void on_nv_clicked();

    void on_nm_clicked();

    void on_nf_clicked();

    void on_nd_clicked();

    void on_Ac_clicked();

    void on_Dc_clicked();

    void on_npui_clicked();

    void on_nr_clicked();

    void on_npo_clicked();

    void on_npf_clicked();

    void on_nmo_clicked();

    float calcul(std::string str);

    std::string reglage(std::string operation);

    int erreur();

private:
    Ui::MainWindow *ui;
};
#endif // MAINWINDOW_H
