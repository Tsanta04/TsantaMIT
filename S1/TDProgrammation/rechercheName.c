#include<stdio.h>
#include<stdlib.h>
#include<string.h>

void initialiser(char **tableau, int a,int b);
void getArray(char **tableau, int a);

int main(){
	printf("Faire des recherches: N'afficher que des noms contenant les caractères entrés par clavier.\n");

///Les variables
	char *name[3];	//noms entrés
	char *caract;	//caratsctères à rechercher
	int n=0;		//strlen des caractères à rechercher
	int k=0, l=0, a=1;		//compteurs
	
///Initialisation des tableaux
	initialiser(name,3,30);
	caract=(char*)malloc(sizeof (char)*30);
	
///Entrée des données
	printf("Entrer les noms:\n");
	getArray(name,3);

	printf("Entrer les caractères que vous voulez:\t");
	scanf("%s",caract);
	
///Traitement
	n=strlen(caract);
	printf("%d\n",n);

/*	
	for(int i=0;i<n;i++){
		printf("%c",caract[i]);
	}
*/

	for(int i=0;i<3;i++){
		//int x=1;
		l=0, a=0;	//on l'initialise pour éviter les érreurs
		while( a != strlen(name[i]) ){
			k=0;
			for(int j=0;j<n;j++,l++){
				//int a=*(caract+j), b=*(name[i]+l);
				//x=(strcmp( (caract+j),(name[i]+l)));
				if( (*(caract+j)) == (*(name[i]+l)) ){
					k++;
					//printf("k(x=0)=%d\t",k);
				}
			}
			if(k==n){
				printf("%s\n",name[i]);
				break;
			}
			else if(k!=n){
					a++;
					l++;
			}
		}
	}

///Sortie des données

	return 0;
}

///Les fonctions
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
