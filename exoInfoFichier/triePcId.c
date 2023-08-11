#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"mit.h"
//#include"/home/mit/Documents/ProgrammeC/bibl/mit.c"

int main(){
///Les variables
	PC datas[100];
	char contenu[100]="PcMIT.csv";
	int i=0;
	char** resultat;

///Allocation
        resultat = (char**)malloc(sizeof(char*)*100);
        for(int i=0;i<100;i++){
                *(resultat+i) = (char*)malloc(sizeof(char)*256);
        }

///Get file's contain
        i = getFileToStruct(contenu,datas);
        i=i-1;

///Trier
        sort(datas,i);

///Remis
        for(int j=0;j<i;j++){
                sprintf(resultat[j],"%s\t%s\t%s",datas[j].marque,datas[j].MAC,datas[j].label);
        }

        i = putFile(contenu,resultat,i);

        if(i==-1){
                printf("Erreur d'enregistrement\n");
                exit(1);
        }

        return 0;
}
