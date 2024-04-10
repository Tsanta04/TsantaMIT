#include <stdio.h>
int main(){
	printf("Listons ce qui est dans le repertoire snt vous allez entrer.\n");
	
///Entrée des données
	char rep[100];
	char list[100];
	printf("Entrer le chemin du repertoire:\n");
	scanf("%s",rep);
	
///Traitement
	list=`ls rep`;
	
///Sortie des données
	printf("La liste est:\n");
	printf("%s",list);
	
	return 0;
}
