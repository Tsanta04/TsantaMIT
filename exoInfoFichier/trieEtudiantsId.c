#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include"/home/tsanta/Documents/Programmes/bibl/mit.h"
//#include"/home/mit/Documents/ProgrammeC/bibl/mit.c"

int main(){
///Les variables
	char** datas;
	char contenu[100]="/home/tsanta/Documents/PDF/EtudiantsMIT.csv";
	int i=0;
	
///Allocation
	datas = (char**)malloc(sizeof(char*)*100);
	for(int i=0;i<100;i++){
		*(datas+i) = (char*)malloc(sizeof(char)*256);
	}
	
///Get File Datas
	i = getFileToChar(contenu,datas);
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
