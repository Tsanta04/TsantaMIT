#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include<QHBoxLayout>
#include<QLabel>
#include <QMainWindow>
#include<QSqlTableModel>
#include<string>

QT_BEGIN_NAMESPACE
namespace Ui {
class MainWindow;
}
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    void getData();
    void displayData();
    MainWindow(QWidget *parent = nullptr);
    QSqlTableModel* table;
    int niveau=6;
    QString imgAdded="";
    QString imgModified="";
    ~MainWindow();

private slots:
    void filter(QString searched,QString column);

    void on_quit_clicked();

    void on_corbeil_clicked();

    void on_editer_clicked(int index);

    void on_add_clicked();

    void on_go_to_list_clicked();

    QString getImg(QLabel* label);

    void on_toolButton_clicked();

    void on_addImg_clicked();

    void detail(int index,QSqlTableModel* table);

    void on_go_edit_clicked();

    void deleteStudent(int index,QSqlTableModel* table);

    void on_all_clicked();

    void on_l1_clicked();

    void on_l2_clicked();

    void on_l3_clicked();

    void on_m1_clicked();

    void on_m2_clicked();

    void on_search_clicked();

    void edit(int index, QSqlTableModel* table);

private:
    QWidget* box(int num,QString name);
    std::vector<std::string> nouveauFichier(std::string path, int position);
    int position_aSupprimer (std::string path, std::string search);
    void supprimer_du_reseau(int index, QSqlTableModel* table);
    Ui::MainWindow *ui;
};
#endif // MAINWINDOW_H
