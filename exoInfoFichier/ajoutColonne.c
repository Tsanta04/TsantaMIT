#include<stdio.h>
#include"mit.h"
#include<stdlib.h>
//#include"/home/tsanta/Documents/Programmes/bibl/mit.c"

int main(){
///Les variables
	char** datas;
	char contenu[100]="EtudiantsMIT.csv";
	int i=0;
	char* tete = (char*)malloc(100);
	printf("\t\tAjout de la colonne\n\n");
///Allocation 
	datas = allouer(100,100);	//Allocation 2D

///Recuperation des donnees
	i = getFileToChar(contenu,datas);
	if(i==-1){fprintf(stderr,"Erreur d'ouverture");exit(1);}
	char** URL = allouer(i,100);

///Faire entrer le nom du colonne a ajouter
	printf("Entrer le nom de la colone:\n");
	fgets(tete,100,stdin);

///Recuperation des URL gitHub
	addURL(datas,URL,i,tete);	//obtenir les URL et les concatener
	//addURL(datas,URL,i,"gmail");	//obtenir les URL et les concatener 

///Remis a sa place
	putFile(contenu,datas,i);

	return 0;
}
