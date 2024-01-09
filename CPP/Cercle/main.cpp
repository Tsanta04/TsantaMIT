#include<iostream>
#include<string>
#include"Point.h"
#include"Cercle.h"
#include"fn.h"

int main(){
///Introduction
	std::cout<<"\t\t\tLes cercles et ses positions\n"<<std::endl;

///Les variables
	Cercle* circles;
	int nbr_of_circles=0;
	std::string all_colors[7]={"Rouge","Bleu","Vert","Blanc","Noir","Gris","Jaune"};

///Nombre des cercles
	nbr_of_circles=random(2,4);

///Allocation
	circles=new Cercle[nbr_of_circles];

///Creer les cercles
	getData(circles,nbr_of_circles,all_colors);

///Sortie initiale des donnees
	using namespace std;
	cout<<"Voici les "<<nbr_of_circles<<" cercles pris:"<<endl;
	for(int i=0;i<nbr_of_circles;i++){
		cout<<endl<<"-Cercle"<<i+1<<": "<<endl;
		circles[i].afficher();
	}
	cout<<endl;

///Qui se chevauchent? + Traitement pou separer tous ce qui se chevauchent
/*
	Point a=Point();
	Point b=Point();
	a.setX(0);a.setY(0);
	b.setX(0);b.setY(1);
	std::cout<<distance(a,b)<<std::endl;

	//std::cout<<distance(circles[0].getCentre(),circles[1].getCentre());
*/
	have_to_move(circles,nbr_of_circles);
	Point* vect = go_and_move(circles,nbr_of_circles);

///Display last datas
	using namespace std;
	cout<<"Finalement,voici les "<<nbr_of_circles<<" cercles apres la translation:"<<endl;
	for(int i=0;i<nbr_of_circles;i++){
		cout<<endl<<"-Cercle"<<i+1<<": "<<endl;
		circles[i].afficher();
		if( (vect[i].getX()!=0)||(vect[i].getY()!=0) ){
			cout<<"Le vecteur de translation par rapport a sa position initilale: ( "<<vect[i].getX();
			cout<<" , "<<vect[i].getY();
			cout<<" )"<<endl;
		}
	}
	cout<<endl;

	return 0;
}
