#include<stdio.h>
void getData(float* r);
void displayResult(float r,float circ, float air);
void CalcCircAir(float r, float* circ, float* air);

int main (){
	printf("Calcul de la circonférence et l'air d'un cercle de rayon r.\n");
	
///Entrée des données
	float r=0;		//Le rayon du cerle
	float circ=0;	//La circonférence
	float air=0;	//L'air
	getData(&r);

///Traitement
	CalcCircAir(r,&circ,&air);

///Sortie des données
	displayResult(r,circ, air);

	return 0;
}

#define Pi 3.14
void CalcCircAir(float r, float* circ, float* air){
	*circ=2*Pi*r;
	*air=Pi*Pi*r;
}

/*
#define Pi 3.14
float CalcCirc(float r){
		float C=0;
		C=2*Pi*r;
	return C;
}
*/

void displayResult(float r,float circ,float air){
	printf("La circonférence du cercle de rayon %f est %f.\nL'air du cercle de rayon %f est %f.\n",r,circ,r,air);
} 

void getData(float* r){
	printf("Entrer le rayon r: ");
	scanf("%f",r);
}

