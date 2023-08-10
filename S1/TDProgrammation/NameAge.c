#include <stdio.h>
int main (){
	
//entrée des données
	char 	nom[10],
			prenom[10];
			
	int age=0;
	
	//printf("Entrer votre nom: ");
	scanf("%s %s", nom, prenom);

	//printf("Entrer votre age: ");
	scanf("%d",&age);
	
//Srtie des données
	printf("Je m'appelle %s %s . J'ai %d ans.\n", nom, prenom,age);

return 0;
}
