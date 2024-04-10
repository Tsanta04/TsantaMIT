#include<stdio.h>
#include<string.h>
#include<stdlib.h>

int main(){
	printf("\tEssai de la fonction strcat et strcpy.\n");

///Les variables
	char	commande1 [100],	//La variable où on stocke la concatenation
			commande2 [100],	//La variable où on stocke la concatenation +name
			mkdir [100]="mkdir ",//La variable de la commande mkdir
			name [100],			//La variable où on place le nom du repertoire à créer
			folder[100];		//La variable où on place le chemin du dossier à entrer

	int y=0;
///Entrée des données
	printf("\nEntrer le chemin absolu du repertoire où on va créer le dossier.\n");
	scanf("%s", folder);
	printf("Entrer le nom du repertoire à créer.\n");
	scanf("%s", name);
	
///Traitement
	strcpy(commande1, strcat(mkdir,folder));
	strcpy(commande2, strcat(commande1,name));
	
	y=system(commande1);

///SOrtie des données
	printf("%d",y);
return 0;
 }
