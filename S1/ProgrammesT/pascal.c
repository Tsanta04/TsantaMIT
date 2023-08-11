#include<stdio.h>
#include<stdlib.h>

long** allocation(int a);
long** pascal(int a);	
void displayResult(long** tableau,int a);
	
int main (){
	printf("\n");
	
///Les variables
	int n=0;	//Nombre de ligne des pascals
	long** tab;
	int scan=0; 
	char caract[100];

///Entrée des données
here:
	printf("Enter le nombre de ligne de pascal qu vous voulez:\n");
	scan=scanf ("%d",&n);
	
///Initialisation
	
	if(scan==0){
		scanf("%s",caract);
		printf("Invalide\n");
		goto here;
	}
	
	else if(scan!=0){
	tab=allocation(n);
	
///Traitement
	
	//displayResult(tab,n);
	tab=pascal(n);

///Sortie de résultat
		displayResult(tab,n);
	}
}

///Les fonctions
long** allocation(int a){
	long** tab;
	tab=(long**)malloc(sizeof(long*)*a);
	for(int i=0;i<a;i++){
		(*(tab+i))=(long*)malloc(sizeof(long)*a);
	}
	
	for(int i=0;i<a;i++){
		for(int j=0;j<a;j++){
			(*((*(tab+i))+j))=0;
		}
	}
	
	return tab;
}

long** pascal(int a){
	long** tab;
	tab=allocation(a);
	
	for(int i=0;i<a;i++){
		(*((*(tab+i))+0))=1;
	}
	
	for(int i=1;i<a;i++){
		for(int j=1;j<=i;j++){
			(*((*(tab+i))+j))=(*((*(tab+(i-1)))+(j-1)))+(*((*(tab+(i-1)))+(j)));
		}
	}
	
	return tab;
}

void displayResult(long** tableau,int a){
	printf("Le voici le tableau pascal:\n\n");
	for(int i=0;i<a;i++){
		for(int j=0;j<i+1;j++){
			printf("%ld\t",*((*(tableau+i))+j));
		}
		printf("\n\n");
	}
}

