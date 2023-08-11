#include<stdio.h>
#include<stdlib.h>

void getArray(int* tab, int a);

int main (){
	printf("Dire les nombres repétés dans un tableau.\n");
	
///Entrée des données pour le sujet
	int tab[10];	//Le tableau à traiter
	int k=0;		//nombre de la repetition d'un nombre dans un tableau
	getArray(tab, 10);	//Entrer les élements de ce tab
	
///Autre données
	int *tab2;
	tab2=(int*)malloc(sizeof (int)*10);

///Traitements
	//*tab2=tab[0];
	
	for(int j=0;j<10;j++){	//boucle pour l'élement à traiter 
		k=0;
		for (int i=0;i<10;i++){	//Boucle pour le traitement

			if(tab[j]==tab[i] && (tab[j]!=*(tab2+i))){
				k+=1;
			}	
		}			
/*
			if(*(tab2+j)==tab[i]){
				k+=1;
			}
			
			else if(*(tab2+j)!=tab[i]){
				for(int l=1;l<3;l++){
					*(tab2+l)=tab[i];
				}
			}	
		}		 
*/
///Sortie des données

		for(int l=0;l<10;l++){	
			*(tab2+l)=tab[j];
		}
	
		if(k!=0){
			printf("%d se répète %d fois dans ce tableau.\n",*(tab2+j),k);	//affichage du resultat
		}
	}
	
	return 0;
}

///Les fonctions

void getArray(int* tab, int a){
	printf("Entrer les élements du tableau:\n");
	for(int i=0;i<a;i++){
		printf("tab[%d]= ",i);
		scanf("%d",(tab+i));
	}
}
