#include<stdio.h>
void getArray(int* tab, int a);

int main (){
	printf("Declarer les élements répétés dans un tableau.\n");
	
///Les variables
	int tab[10];	//tableau à traiter
	int tabc[10];	//tableau où on stocke les élements déjà traités
	int k=0,b=0,j=0,l=0;	//les compteurs dans le traitement ci-dessous
	int a=1;		//dimension du tabc
	
///Entrée des données
	getArray(tab,10);
	
///Traitement
	tabc[0]=tab[0];
	
	//Traitement du premier élement du tableau
	for(int i=0;i<10;i++){
		if(tab[0]==tab[i]){
			k++;
		}
	}
	if(k>0){
		printf("L'élement %d se répète %d fois dans ce tableau.\n",tab[0],k);
	}
	
	//Traitement des autres
	a=1;
	for(int i=1;i<10;i++){ 
		k=0,b=0,j=0,l=0;
		
		for(l=0;l<a;l++){
			if( (tab[i]==tabc[l]) ){
				b++;
			}
		}
		
		if(b==0){
			for(j=0;j<10;j++){
				if( (tab[i]==tab[j]) ){
					k++;
				}
			}
		}
		
		if(k>0){
			printf("L'élement %d se répète %d fois dans ce tableau.\n",tab[i],k);
			tabc[a]=tab[i];
			a++;
		}
	}
				

///SOrtie des données
	
	
	return 0;
}

///Les fonctions
void getArray(int* tab, int a){
	printf("Entrer les élements du tableau.\n");
	for(int i=0;i<a;i++){
		printf("tab[%d]=\t",i);
		scanf("%d",(tab+i));
	}
}
