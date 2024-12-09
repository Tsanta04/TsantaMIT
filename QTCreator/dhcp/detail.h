#ifndef DETAIL_H
#define DETAIL_H

#include <QMainWindow>
#include <QDialog>
#include <QLabel>
#include<vector>
using namespace std;
namespace Ui {
class Detail;
}

class Detail : public QMainWindow
{
    Q_OBJECT

private:
    /*
    QLabel *labelNom;
    QLabel *labelPrenom;
    QLabel *labelPan;
    QLabel *labelReference;
    QLabel *labelIP;
    QLabel *labelEnps;
    QLabel *labelWlan;
    QLabel *labelImage;
*/
public:
    vector<string> et;
    string path="";
    explicit Detail(QWidget *parent = nullptr);
    ~Detail();

    void setDetail(vector<string> etudiant);
    void supprimer();
    void suppr_dhcp (string search);
    void getPath(string p);
private slots:
    void on_pushButton_3_clicked();

    void on_pushButton_2_clicked();

private:
    Ui::Detail *ui;
};

#endif // DETAILS_H
