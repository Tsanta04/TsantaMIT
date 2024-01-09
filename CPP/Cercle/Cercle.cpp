#include<iostream>
#include<string>
#include"Point.h"
#include"Cercle.h"
#include"fn.h"

Cercle::Cercle(){
	centre=Point();
	rayon=0;
	couleur="";
}

void Cercle::setCouleur(std::string color){
	couleur=color;
}

void Cercle::setCentre(Point center){
	centre=center;
}

void Cercle::setRayon(int ray){
	rayon=ray;
}

std::string Cercle::getCouleur(){
	return couleur;
}

Point Cercle::getCentre(){
	return centre;
}

int Cercle::getRayon(){
	return rayon;
}

void Cercle::afficher(){
	using namespace std;
	cout<<"Coordonnee du centre: ( "<<centre.getX();
	cout<<" , "<<centre.getY();
	cout<<" )"<<endl;
	cout<<"Rayon: "<<rayon<<endl;
	cout<<"Couleur: "<<couleur<<endl;
}

int Cercle::straddled(Cercle autre){
	return ((rayon + autre.getRayon()) - distance(centre,autre.getCentre()));
}
