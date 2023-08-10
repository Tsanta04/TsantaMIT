#include<stdio.h>

void getData(int* n);
void sommeCareeEtCube(int n, int* sommeCarre, int* sommeCube);
void displayResult(int n,int sommeCarre,int sommeCube);

int main(){
	printf("Calcul de la somme des cubes et des carrées des n");
	
///Entrée des données
	int n=1;
	int sommeCarre=0, sommeCube=0;
	getData(&n);
	
///Traitement
	sommeCareeEtCube(n, &sommeCarre, &sommeCube);
	
///Sortie des données
	displayResult(n, sommeCarre, sommeCube);

return 0;
}

///Les fonctions

void displayResult(int n,int sommeCarre,int sommeCube){
	printf("La somme des carrées des %d premiers nombres entiers est %d.\n", n,sommeCarre);
	printf("La somme des cubes des %d premiers nombres entiers est %d.\n", n,sommeCube);
}	

void getData(int* n){
	printf("Entrer n=\t");
	scanf("%d",n);
}

void sommeCareeEtCube(int n, int* sommeCarre,int* sommeCube){
	int k=1;
	for(int i=1;i<=n;i++){
		k=i*i;
		*sommeCarre+=k;
	}
	k=1;
	for(int i=1;i<=n;i++){
		k=i*i*i;
		*sommeCube+=k;
	}
}
