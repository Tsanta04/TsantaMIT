#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"../../../serveur/fn.h"

int main(){
	printf("content-type: text/html\n");
///Ne pas le mettre en cache
	printf("Cache-Control: no-cache, no-store, must-revalidate\n");
	printf("Pragma: no-cache\n");
	printf("Expires: 0\n");

///Les variables
	int isValide=0;
	ID utilisateur;

///Test d'authentification
	isValide=authentification(&utilisateur);

	///Si non connectE
	if(isValide==-1){
		printf("Status: 302 Found\n");
		printf("Location: http://www.tsa.com/cgi-bin/adminLte/AdminLte/pages/examples/login.cgi\n");
	}
	///Sinon
	else if(isValide==1){
		formulaireWeb(creationVirtual());
	}
	return 0;
}
