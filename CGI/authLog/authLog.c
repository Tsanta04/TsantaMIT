#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"fn.h"

int main(){
	printf("content-type: text/html\n");

///Les variables
	int ligne=100;int isValide=0;
	char string[256]="";char line[256]="";char identifiant[256]="";
	INFO* user=(INFO*)malloc(sizeof(INFO)*ligne);
	ID utilisateur;
	
///Test d'authentification
	isValide=authentification(&utilisateur);


	if(isValide==-1){
		printf("Status: 302 Found\n");
		printf("Location:http://www.tsa.com/cgi-bin/authLog2/login.cgi\n\n");		
		
	}
	
	else if(isValide==1){
///Recuperation des donnees
		strcpy(string,geturl());	//ce qui est sur URL
		separerDonnee(string,line);	//string:user , line:pagination
///PLay
		user=getData(&ligne,string);
///HTML
		displayResult(line,ligne,user,string,utilisateur);
	}
	
	return 0;
}
