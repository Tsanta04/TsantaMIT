#include<stdio.h>
#include<string.h>
#include<stdlib.h>

void initialiser(char **tableau, int a,int b);
void getArray(char **tableau, int a);

int main (){
	printf("Faire des recherches: N'afficher que des noms contenant les caractères entrés par clavier.\n");

///Les variables
	char *name[10];	//noms entrés
	char n[1];		//strlen des caractères à rechercher
	
///Initialisation des tableaux
	initialiser(name,10,30);
	
///Entrée des données
	printf("Entrer les noms:\n");
	getArray(name,10);

	printf("Entrer le caractère:\t");
	scanf("%s",n);
	
	for(int i=0;i<10;i++){
		if( *n == *(name[i]) ){
			printf("%s", name[i]);
		}
	}

	return 0;
}


void getArray(char **tableau, int a){
	for (int i=0;i<a;i++){
		printf("%d:\t",i);
		scanf("%s",tableau[i]);
	}
}

void initialiser(char **tableau, int a,int b){
	for(int i=0;i<a;i++){
		tableau[i]=(char*)malloc(sizeof (char)*b);
	}
}
