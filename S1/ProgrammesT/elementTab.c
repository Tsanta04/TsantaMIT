#include<stdio.h>
void getBoard(int tab[],int a);

int main(){
	printf("Voir si un nombre est un élement du tableau entré.\n");
	
///Entrée des données
	//Entrer les elements du tableau
	int tab[10];

	printf("Entrer les élements du tableau:\n");
	
	getBoard(tab,10);

	//Entrer le nombre à identifier
	int n=0;
	
	while (1){
		
		printf("Saisir le nombre:\t");
		scanf("%d",&n);
	
///Traitement
		int b=0;	//Compteur
		int c=0;	//indice
		
		for(int i=0;i<10;i++){
			if(tab[i]==n){
				b+=1;
				c=i;
			}
		}
	
///Sortie des données
		if (b>0){
			printf("%d est un élement de ce tableau.\n\tOn le trouve dans tab[%d].\n",n,c);
		}
	
		else if(b==0){
			printf("%d n'est pas un élement de ce tableau.\n",n);
		}
	}
return 0;
}

void getBoard(int tab[],int a){
	for(int i=0;i<a;i++){
		printf("tab[%d]= ",i);
		scanf("%d",&tab[i]);
	}
}
