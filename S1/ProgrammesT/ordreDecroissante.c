#include<stdio.h>
void getBoard(int tab[],int a);
void decroissant(int tab[],int a);
void displayResult (int tab[],int a);

int main (){
	printf("Arranger par ordre décroissante.\n");
	
///Entrée des données
	int tab[10];
	getBoard(tab,10);
	
///Traitements
	decroissant(tab,10);
///Sortie des données
	displayResult(tab,10);

return 0;
}

void displayResult (int tab[],int a){
	printf("Voici le tableau arrangé par ordre décroissant:\n");
	for(int i=0;i<a;i++){
		printf("%d\t",tab[i]);
	}
}

void decroissant(int tab[],int a){
	int tmp=0;	//Valeur temporaire
	for(int i=0;i<a;i++){
		for(int j=i+1;j<a;j++){
			if(tab[i]<tab[j]){
				tmp=tab[i];
				tab[i]=tab[j];
				tab[j]=tmp;
			}
		}
	}
}

void getBoard(int tab[],int a){
	for(int i=0;i<a;i++){
		printf("tab[%d]= ",i);
		scanf("%d",&tab[i]);
	}
}
