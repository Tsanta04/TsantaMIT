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
	int ligne=100;int isValide=0;char tmp[100]="";char inutile[100]="";
	char string[256]="";char line[256]="";char mode[256]="";char identifiant[256]="";
	INFO* user=(INFO*)malloc(sizeof(INFO)*ligne);
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
///Recuperation des donnees (sur l'URL)
/*
		strcpy(string,geturl());	//ce qui est sur URL
///Si c'est creer
		sscanf(string,"%[^=]=%[^\n]",tmp,inutile);

		if(strcmp(tmp,"ServerName")==0){
			head();
			displayNav(utilisateur);
			formulaireWeb(creationVirtual(string));
		}

///Else
		else{

			separerDonnee(string,line,mode);	//string:user , line:pagination
///Recuperation des donnees dans auth.log
			user=getData(&ligne,string);		
///HTML
			//displayResult(line,ligne,user,string,utilisateur,mode);
		}
		*/
			printf("\n\nHello");
	}	
	return 0;
}
