#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"fn.h"

int main(){
	printf("content-type: text/html\n");
///Ne pas le mettre en cache
	printf("Cache-Control: no-cache, no-store, must-revalidate\n");
	printf("Pragma: no-cache\n");
	printf("Expires: 0\n");


///Les variables
	int ligne=100;int isValide=0;
	char string[256]="";char line[256]="";char identifiant[256]="";
	INFO* user=(INFO*)malloc(sizeof(INFO)*ligne);
	ID utilisateur;
	
///Test d'authentification
	isValide=authentification(&utilisateur);

	///Si non connectE
	if(isValide==-1){
		printf("Status: 302 Found\n");
		printf("Location:http://www.tsa.com/cgi-bin/serveur/login.cgi\n\n");				
	}
		
	///Sinon
	else if(isValide==1){
		printf("\nCreer un hebergement serveur web\n");
	}
	return 0;
}
