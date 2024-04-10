#include<stdio.h>
void getData(float* r);
void displayResult(float r,float circ);
float CalcCirc(float r);

int main (){
	printf("Calcul de la circonférence d'un cercle de rayon r.\n");
	
///Entrée des données
	float r=0;		//Le rayon du cerle
	float circ=0;	//La circonférence
	
	getData(&r);

///Traitement
	circ=CalcCirc(r);

///Sortie des données
	displayResult(r,circ);

	return 0;
}


#define Pi 3.14
float CalcCirc(float r){
		float C=0;
		C=2*Pi*r;
	return C;
}

void displayResult(float r,float circ){
	printf("La circonférence du cercle de rayon %f est %f.\n",r,circ);
} 

void getData(float* r){
	printf("Entrer le rayon r: ");
	scanf("%f",r);
}
