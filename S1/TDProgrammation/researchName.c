#include<stdio.h>
#include<stdlib.h>
#include<string.h>

void displayResult(char** tableau, int a);
void getArray(char **tableau, int a);
void initialiser(char **tableau, int a,int b);

int main (){
	printf("Rechercher dans les noms entrés.\n");


///Les variables
	char *name[10];//={"tsanta","mirindra","randrianarisoa","rrindra","sarindra","trisos","rasoa","ranto","rondro","randry"};	//noms entrés
	char *caract;	//caratsctères à rechercher
	char *nameTrier[10];
	int n=0;		//strlen des caractères à rechercher
	int m=0;	//dimension de nameTrier[3]
	
///Initialisation des tableaux
	initialiser(name,10,30);
	initialiser(nameTrier,10,30);
	caract=(char*)malloc(sizeof (char)*30);
	
///Entrée des données

	printf("Entrer les noms:\n");
	getArray(name,10);

while (1){
	printf("Entrer les caractères que vous voulez:\t");
	scanf("%s",caract);
	m=0;
///Traitement
	n=strlen(caract);
	//printf("%d",n);
	
	for (int i=0;i<10;i++){
		
		int a=0, k=0, l=0;
		int b=strlen(name[i]);
	
		while(a!=b){
			k=0;
			if( *(caract) == *((name[i])+a) ){
				for (int j=0; j<n ;j++,l++){
					if( *(caract+j) == *((name[i])+l) ){
						k++;
					}
				}
			}
			if(k==n){
				nameTrier[m]=name[i];
				m++;
				break;
			}
			else if(k!=n){
				a++;
				l++;
			}
		}
	}
	
///Sortie des résultats
	displayResult(nameTrier,m);
}
	return 0;
}


///Les fonctions

void displayResult(char** tableau, int a){
	for (int i=0;i<a;i++){
		printf("%s\n", tableau[i]);
	}
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
