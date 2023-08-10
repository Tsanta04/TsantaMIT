#include<stdio.h>
void getData(int *A, int a);
void displayResult(int* A, int b);

int main(){
	printf("Incrémenter de 1 tous les valeurs dans le tableau.\n");

///Entrée des données
	int A[10];
	getData(A,10);
///Traitement
	for(int i=0; i<10;i++){
		A[i]+=1;
	}
///Sortie des données
	displayResult(A,10);
	return 0;
}

void displayResult(int* A, int b){
	printf("Les nombres sont comme suit:\n");
	for(int i=0;i<b;i++){
		printf("A[%d]=%d\n",i,*(A+i));
	}
}


void getData(int *A, int a){
	printf("\nEntrer le contenu du tableau.\n");
	for(int i=0; i<a;i++){
		printf("Entrer tab[%d]=\t",i);
		scanf("%d",(A+i));
	 }
}
