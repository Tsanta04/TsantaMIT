#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>
#include"mit.h"

int main(){
here:
	system("clear");
	printf("\t\t\tInformation sur les etudiants en MIT\n\n");
///Les variables
	char choix[10];

///Entrer Les choix
	printf("Entrez votre choix:\n\t1-Information sur PC\n\t2-Information sur les etudiants\n\t3-Quitter\n-->\t");
	fgets(choix,10,stdin);
	system("clear");

///Gestion de choix
	if((choix[0]=='1')&&(choix[1]=='\n')){
		printf("\t\tInformation sur PC\n\nEntrer votre choix:\n\t1-Ajouter un nouveau ligne d'information\n\t2-Trier\n-->");
		fgets(choix,10,stdin);
		system("clear");
		if((choix[0]=='1')&&(choix[1]=='\n')){
			PcMIT();
		}
		else if((choix[0]=='2')&&(choix[1]=='\n')){
			triePcId();
		}
	}
	else if((choix[0]=='2')&&(choix[1]=='\n')){
		printf("\t\tInformation sur les etudiants\n\nEntrer votre choix:\n\t1-Completer les informations des etudiants deja enregistrEs\n\t2-Ajouter un nouveau ligne d'information\n\t3-Trier\n-->");
		fgets(choix,10,stdin);
		system("clear");
		if((choix[0]=='2')&&(choix[1]=='\n')){
			etudiantsMIT();
		}
		else if((choix[0]=='3')&&(choix[1]=='\n')){
			trieEtudiantsId();
		}
		else if((choix[0]=='1')&&(choix[1]=='\n')){
			ajoutInfoEtudiant();
		}
	}
	else if((choix[0]=='3')&&(choix[1]=='\n')){exit(1);}
	else{
		printf("--Choix invalide--\n ");
		sleep(1);
	}
	goto here;

	return 0;
}
