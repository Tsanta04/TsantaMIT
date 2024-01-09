#ifndef FN
#define FN

#include<string>
#include"Point.h"
#include"Cercle.h"

int random(int debut,int fin);
void getData(Cercle* circles, int nbr_of_circles,std::string* color);
float distance(Point a,Point b);
void arranger(Cercle* circles, int nbr_of_circles);
void have_to_move(Cercle* circles,int nbr_of_circles);
Point* go_and_move(Cercle* circles,int nbr_of_circles);
#endif
