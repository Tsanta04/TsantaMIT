#include<stdio.h>
#include<stdlib.h>


int main(){
	int ready=0;
		printf("\tCREATION DU DEBIAN.\n");
	
	while (1){
		printf("Le nom du fichier.deb qu'on va créer est tsanta.deb.\nOn va le stocker dans ~/Documents\n");
	
		printf("Etes- vous prêt(e)? (1 pour oui, 0 pour nom)\n=>\t");
		scanf("%d", &ready);
		
		if(ready==0){
			printf("On vous y attend...\n");
		}
		
		else if(ready!=0){
			printf("!!!! OK !!!!");
			break;
		}
	}
/*
	char	repertoire[100],	//Nom du repertoire
			nom[100];			//Nom du fichier à convertir en .deb

	printf("Entrer le repertoire où on place le fichier.deb (chemin absolu).\n=> ");
	scanf("%s",repertoire);
	
	printf("Entrer le nom du fichier.deb (sans .deb).\n=> ");
	scanf("%s",nom);
*/
///Traitements

	//Création repertoire DEBIAN
	//system("cd /home/mit/Documents/");	
	system("mkdir -p /home/mit/Documents/tsanta/DEBIAN");
	
	//Editer le control
	system("echo Donner les informations sur ce fichier.deb. Package: Version: Section: Priority: Architecture: Maintainer: Depends: Description: Homepage: > /home/mit/Documents/tsanta/DEBIAN/control");
	system("nano /home/mit/Documents/tsanta/DEBIAN/control");
	
	//Création des fichiers exécutables
	//system("cd ./tsanta/");
	system("mkdir -p /home/mit/Documents/tsanta/usr/bin");
	
	//Passage à l'écriture du proramme
	int test=0;
	int affirm=0;
	
	while(1){
		printf("Passons à la programmation.\nInstructions:\n--Vous allez écrire votre code dans l'application geany, en le nommant <tsanta.c>. Puis enregistrez le dans votre repertoire par défaut.\n\tTapez 1 si vous êtes prêt/n=>\t");
		scanf("%d",&test);
			if(test==1){	//Confirmation si on pourrait passer à l'application geany
				system("geany&");
				printf("Taper 1 quand votre programme sera dirigé.\n=>\t");
				scanf("%d",&affirm);
				break;
			}
			else if(test!=0){
				printf("Relisez l'instruction.\n");
			}
	}
		
	//Déplacer le tsanta.c et tsanta
	while(1){	//Confirmation si on pourrait continuer le processus
		if(affirm!=1){
			printf("Taper 1 quand votre programme sera dirigé.\n=>\t");
			scanf("%d",&affirm);
		}		
		else if(affirm==1){
			break;
		}
	}
	
	//Création fichier exécutable
		//system("cd /home/mit/Documents/tsanta/usr/bin/");
		system("mv /home/mit/tsanta /home/mit/Documents/tsanta/usr/bin/");
	
	//Création fichier tsanta.c
		system("mkdir /home/mit/Documents/tsanta/usr/local/");
		system("mv /home/mit/tsanta.c /home/mit/Documents/tsanta/usr/local/");
		
	//Transformation fichier en .deb
		//system("cd /home/mit/Documents/");
		system("dpkg -b /home/mit/Documents/tsanta/");
/*	
	//Création des racourcis

		system("cd ../");
		system("mkdir -p ./share/applications");
		system("mkdir ./share/icons");

	//Editer le fichier applications
		system
*/
/*	
///Sortie des donnees
	printf("%s\n%s\n",repertoire,nom);

*/
	printf("C'est fait.\n");
	return 0;
}
