#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"/home/tsanta/Documents/Programmes/bibl/mit.h"
//#include"/home/tsanta/Documents/Programmes/bibl/mit.c"


int main(){

///Les variables
	PC mit;
	int test=0;	
	char tete[100] = "MARQUE\tMAC\tLABEL\n";
	PC datas[100];
	char contenu[100]="/home/tsanta/Documents/PDF/PcMIT.csv";
	int i=0;
	char oui[12];
	char** resultat;
	
///En-tete
	test = enTete(contenu,tete);
	if(test==-1){
		printf("Erreur d'ouverture\n");
		exit(1);
	}

///Debut
	for(int i=0;i<46;i++){
		printf("\t\tInformations sur les PC des L1 MIT\n");

///Get data
		mit = getDataPc();

///Enregistrement
		test=enregistrement2(contenu,&mit);
		if(test==-1){
			printf("\nErreur d'ouverture!!\n");
			break;
		}
///Continuer pour en ajouter ou quitter
		printf("\nAppuyez sur 0 pour quitter et autre pour en ajouter et :\t");
		fgets(oui,12,stdin);
		if((oui[0]=='0')&&(oui[1]=='\n')){break;}
		sleep(2);
		system("clear");
	}
/*
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
*/
	return 0;
}
