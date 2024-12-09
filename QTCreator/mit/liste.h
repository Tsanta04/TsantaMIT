#ifndef LISTE_H
#define LISTE_H
#include<QHBoxLayout>
#include<QLabel>
class Liste
{
public:
    QWidget* wi= new QWidget();
    QHBoxLayout* layout=new QHBoxLayout();
    QLabel* labNum= new QLabel();
    QLabel* labName= new QLabel();

    Liste();
    ~Liste();

    addData(int num, QString name);
};

#endif // LISTE_H
