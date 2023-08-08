#include<stdio.h>
#include"/home/tsanta/Documents/Programmes/bibl/mit.h"
#include<stdlib.h>
//#include"/home/tsanta/Documents/Programmes/bibl/mit.c"

int main(){
///Les variables
	char** datas;
	char contenu[100]="/home/tsanta/Documents/PDF/EtudiantsMIT.csv";
	int i=0;

///Allocation 
	datas = allouer(100,100);
///Recuperation des donnees
	i = getFileToChar(contenu,datas);
	if(i==-1){fprintf(stderr,"Erreur d'ouverture");exit(1);}
	char** URL = allouer(i,100);
	//printf("%s",datas[0]);
///Recuperation des URL gitHub
	addURL(datas,URL,i);
///Remis a sa place
	putFile(contenu,datas,i);
	
	return 0;
}
