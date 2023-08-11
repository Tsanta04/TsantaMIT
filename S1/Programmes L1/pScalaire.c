#include<stdio.h>
/*
float pScalaire( int k,float u[],float v[]);
*/
float pScalaire( int k,float* u,float* v);
void displayResult (int dim,float* u,float* v, float prod);
void changeU(int dim,float* u);

int main (){
	printf("Calcul de produit scalaire des 2 vecteurs de 3 dimensions.\n"); 

///Entrée des données
	int dim=3;						//La dimension des vecteurs
	float	u[3]={1. ,2. ,3. },		//Déclaration de tableau de type float
			v[3]={1. ,4. ,5. };
	float	prod=0.35 ;				//La valeur de produit scalaire

	changeU(dim,u);
///Traitement
	prod=0;
	prod=pScalaire(dim,u,v);
/*
	for(int i=0; i<dim;i++){
		prod+=(u[i]*v[i]);
	}
*/

///Sotie des données
	displayResult (dim, u, v, prod);
	//printf("Le produit scalaire de u et de v est = %f\n", prod);

return 0;
}

///Les fonctions
/*	//moins professionnel
float pScalaire(int k, float u[],float v[]){
	int prod=0;
	for(int i=0; i<3;i++){
		prod+=(u[i]*v[i]);
	}
	return prod;
}
*/

void changeU(int dim,float* u){
	//*u = 0;		//Le nom d'un tableau lui-même est un pointeur de sont premier élement
	//u[2] = 1;		//Écriture tableau
	*(u+2)=1;		//Écriture pointeur
}

void displayResult (int dim,float* u,float* v, float prod){
	printf("Le vecteur u est:\n");
		for(int i=0;i<dim;i++){		
			//printf("u[%d]=%f\n",i, u[i]);
			printf("u[%d]=%f\n",i, *(u+i));
		}
	printf("\nLe vecteur v est:\n");
		for(int i=0;i<dim;i++){
			//printf("v[%d]=%f\n",i, v[i]);
			printf("v[%d]=%f\n",i, *(v+i));
		}
	printf("\nLe produit scalaire de u.v = %f\n", prod);

}

float pScalaire( int k,float*u,float* v){	//Le nom d'un tableau lui-même est un pointeur vers son premier élement
	int prod=0;
	for(int i=0; i<3;i++){
		prod+=(u[i]*v[i]);
	}
	return prod;
}
