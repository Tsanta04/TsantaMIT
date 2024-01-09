#include<iostream>
#include<string>
#include<cmath>
#include<random>
#include"Point.h"
#include"Cercle.h"
#include"fn.h"

int random(int debut,int fin){
    std::random_device rd;  // périphérique matériel (si disponible)
    std::mt19937 gen(rd()); // générateur Mersenne Twister
    std::uniform_int_distribution<int> distribution(debut, fin);
    return distribution(gen);
}

void getData(Cercle* circles, int nbr_of_circles,std::string* color){
	Point center=Point();
	for(int i=0;i<nbr_of_circles;i++){
		circles[i]=Cercle();
		center.setX(random(1,5));center.setY(random(1,5));
		circles[i].setCentre(center);
		circles[i].setRayon(random(1,5));
		circles[i].setCouleur(color[random(0,6)]);		
	}
	arranger(circles,nbr_of_circles);
}

float distance(Point a,Point b){
	return sqrt(pow((b.getY() - a.getY()),2)+pow((b.getX() - a.getX()),2));
}

void arranger(Cercle* circles, int nbr_of_circles){
	Point origine=Point();
	Cercle tmp=Cercle();
	for(int i=0;i<nbr_of_circles;i++){
		for(int j=i;j<nbr_of_circles;j++){
			//if( distance(origine,circles[i].getCentre()) > distance(origine,circles[j].getCentre()) ){
			if( circles[i].getCentre().getX() > circles[j].getCentre().getX() ){
				tmp=circles[j];
				circles[j]=circles[i];
				circles[i]=tmp;
			}
		}
	}
}

void have_to_move(Cercle* circles,int nbr_of_circles){
	int displayIt,is_straddled=0;
	using namespace std;
	for(int i=0;i<nbr_of_circles;i++){
		displayIt=0;
		for(int j=0;j<nbr_of_circles;j++){
			if((j!=i)&&(circles[i].straddled(circles[j])>0)){
				if(displayIt==0){cout<<"Le cercle "<<i+1<<" chevauche avec: ";displayIt++;}
				cout<<"Cercle"<<j+1<<"  ";
				is_straddled++;
			}
		}
	cout<<endl;
	}
	if(is_straddled==0){
		cout<<"Aucune cercle se chevauche\n";
		exit(1);
	}
	cout<<endl;
}

Point* go_and_move(Cercle* circles,int nbr_of_circles){
	float pente=0;
	int is_straddled=10;
	Point* vect=new Point[nbr_of_circles];
	Point tmp=Point();
	
	while(is_straddled!=0){
		is_straddled=0;
		for(int i=0;i<nbr_of_circles;i++){
			for(int j=i;j<nbr_of_circles;j++){
				if(j==i){vect[j]=Point();}
				if((j!=i)&&(circles[i].straddled(circles[j])>pow(10,-12))){
					is_straddled++;

					pente=circles[j].getCentre().pente(circles[i].getCentre());
					tmp=(circles[j].getCentre().move(pente,circles[i].straddled(circles[j])));
					vect[j].setX((tmp.getX()-circles[j].getCentre().getX()));
					vect[j].setY(tmp.getY()-circles[j].getCentre().getY());
					circles[j].setCentre(tmp);
					std::cout<<"y="<<vect[j].getY();std::cout<<"x="<<vect[j].getX();
/* 
					pente=circles[j].getCentre().pente(circles[i].getCentre());
					circles[j].setCentre(circles[j].getCentre().move(pente,circles[i].straddled(circles[j])));
*/

				}
			}
		}
	}
	return vect;
}
