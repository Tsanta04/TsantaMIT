#include<stdio.h>
#include<stdlib.h>

void getArray(int* tab, int a);
void arranger(int* tab, int a);
void comparer(int* tab1, int* tab2, int a);
int size(int* tab, int a);
void identique(int* tab1, int* taba, int a);
void displayResult(int* tab, int a);


int main(){
	printf("Comparer 2 tableaux.\n");
	
///Les variables
	int	tab1[3],	//Tableau 1 à comparer
		tab2[3];	//Tableau 2 à comparer

	int tabc[3];	//Tableau contenant les élements communs
	int k=0,		//nbr des élements répéteés du tab1
		l=0;		//nbr des élements répéteés du tab2
	
	int	*taba,	//Tableau contenant les élements distincts du tab1
		*tabb;	//Tableau contenant les élements distincts du tab2
	
///Entrée des données
	printf("Entrer les élements du premier tableau:\n");
		getArray(tab1,3);
	printf("Entrer les élements du deuxième tableau:\n");
		getArray(tab2,3);
		
///Traitements
	//Tester si les 2 tableaux s'ils sont les même
		arranger(tab1,3);
		arranger(tab2,3);
		comparer(tab1,tab2,3);
	
	//Donner les élements communs
		//Trouver la dimension des taba et tabb
		k=size(tab1,3);
		l=size(tab2,3);

		//Initialisation des tableaux
		taba=(int*)malloc(sizeof (int)*k);
		tabb=(int*)malloc(sizeof (int)*l);
		
		identique(tab1,taba,3);
		identique(tab2,tabb,3);


///Sortie des données
	printf("Taba est:\n");
	displayResult(taba,k);
	
	return 0;
}

///Les fonctions
void displayResult(int* tab, int a){
	for(int i=0;i<a;i++){
		printf("%d",*(tab+i));
	}
}


void identique(int* tab1, int* taba, int a){
	int l=-1,k=0;
	for(int i=0;i<a;i++){
		k=0;
		for(int j=0;j<a;j++){
			if(*(tab1+i)==*(tab1+j)){
				k++;
			}
		}
		if(k==1){
			l++;
			*(taba+l)=*(tab1+i);
		}
	}
}

int size(int* tab, int a){
	int k1=0,k2=0;
	for(int i=0;i<a;i++){
		for(int j=0;i<a;j++){
			if(*(tab+i)==*(tab+j)){
				k1++;
			}
		}
	}
	k2=(a*a)-k1+1;
	return k2;
}

void comparer(int* tab1, int* tab2, int a){
	int k=0;
	for(int i=0;i<3;i++){
		if(*(tab1+i)!=*(tab2+i)){
			k++;
		}
	}
	if(k!=0){
		printf("Les 2 tableaux ne sont pas identiques.\n");
	}
	else if(k==0){
		printf("Les 2 tableaux sont identiques.\n");
	}
}
	
void arranger(int* tab, int a){
	int tmp=0;
	for(int i=0;i<a;i++){
		for(int j=i+1;j<a;j++){
			if(*(tab+i)>*(tab+j)){
				tmp=*(tab+i);
				*(tab+i)=*(tab+j);
				*(tab+j)=tmp;
			}
		}
	}
}

void getArray(int* tab, int a){
	for(int i=0;i<a;i++){
		printf("tab[%d]=\t",i);
		scanf("%d",(tab+i));
	}
}
