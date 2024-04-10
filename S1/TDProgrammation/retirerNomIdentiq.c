#include<stdio.h>
#include<stdlib.h>
#include<string.h>
void upper(char *tableau, char* tableauUpper);
void getArray(char **tableau, int a);
void displayResult( char **tableau, int a);


int main(){
	printf("Retirer les doublons.\n");

///Les variables
	char *name[10];						//Noms à entrer
	char *trier[10];					//Noms déjà flitrés
	char *upperTrier, *upperName;	//Tableau pour stocker les versions majuscules des noms
	int k=1;							//Dimension de *trier[10]
	
///Initialisation des tableaux
	for(int i=0;i<10;i++){
		name[i]=(char*)malloc(sizeof (char)*30);
	}
	
	upperTrier=(char*)malloc(sizeof (char)*30);
	upperName=(char*)malloc(sizeof (char)*30);
	
///ENtrée des données
	printf("Entrer les noms:\n");
	getArray(name,10);

///Traitements
	trier[0]=name[0];
	
//	printf("%s",trier[0]);
/*
	x=strcmp( (name[1]),(trier[0]) );
	printf("%d",x);
*/

	int n=0;	//Compteur
	int x=0;
	for(int i=1;i<10;i++){
		n=0;
		for (int j=0; j<k;j++){
			upper(name[i], upperName);
			upper(trier[j], upperTrier);
			x=strcmp( upperName , upperTrier );

			//x=strcmp( name[i], trier[j]);
			if ( x==0 ){
				n++;
			}
		}	
		if(n==0){
			trier[k]=name[i];
			k++;
		}
	}
				

///Sortie des données
/*
	printf("Les noms entrés sont:\n");
	displayResult(name,3);
*/
	printf("Ce tableau no contient que les noms:\n");
	displayResult(trier,k);

	return 0;
}

///Les fonctions

void upper(char *tableau, char* tableauUpper){
	for(int i=0;i<strlen(tableau);i++){
		tableauUpper[i]=(toupper(tableau[i]));
	}
}

void displayResult( char **tableau, int a){
	for(int i=0;i<a;i++){
		printf("%s\n",tableau[i]);
	}
}

void getArray(char **tableau, int a){
	for (int i=0;i<a;i++){
		printf("%d:\t",i);
		scanf("%s",tableau[i]);
	}
}
	
	
	
