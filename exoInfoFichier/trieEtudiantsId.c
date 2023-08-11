#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include"mit.h"
//#include"/home/mit/Documents/ProgrammeC/bibl/mit.c"

int main(){
///Les variables
	char** datas;
	char contenu[100]="EtudiantsMIT.csv";
	int i=0;
	
///Allocation
	datas = allouer(100,256);
	
///Get File Datas
	i = getFileToChar(contenu,datas);
	i=i-1;
	if(i==-1){
		printf("Erreur d'ouverture\n");
		exit(1);
	}

///Trier
	trier(datas,i);

///Remis
	i = putFile(contenu,datas,i);

	if(i==-1){
		printf("Erreur d'enregistrement\n");
		exit(1);
	}

	return 0;
}
