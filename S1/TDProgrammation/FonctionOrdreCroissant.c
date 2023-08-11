#include <stdio.h>

void getData(int* A,int b);
void displayResult(int* A, int b);
void arranger(int* A,int b);

int main (){
	printf("Arranger les nombres entiers à entrer.\n");
	
///Entrée des données
	int A[10];
	getData(A,10);
	
///Traitement
	arranger(A,10);

///Sortie des données
	displayResult(A,10);

return 0;
}

///Les fonctions

void arranger(int* A,int b){
	int tmp=0;
	for(int i=0;i<b;i++){
		for(int j=i+1;j<b;j++){
			if(*(A+i)>*(A+j)){
				tmp=*(A+i);
				*(A+i)=*(A+j);
				*(A+j)=tmp;
			}
		}
	}	
}

void displayResult(int* A, int b){
	printf("L'ordre croissant des nombres est comme suit:\t");
	for(int i=0;i<b;i++){
		printf("%d--",*(A+i));
	}
}

void getData(int* A,int b){
	for(int i=0;i<b;i++){
		printf("Entrer A[%d]=\t",i);
		scanf("%d", (A+i));
	}
}
