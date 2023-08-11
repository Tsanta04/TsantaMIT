#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"mit.h"
//#include"/home/tsanta/Documents/Programmes/bibl/mit.c"

int main(){

///Les variables
	Identite mit;
	char contenu[100] = "EtudiantsMIT.csv";
	char tete[100] = "NOM\tPRENOM\tPARCOURS\tGRADE\tNUMERO\n";
	int test=0;
	char** datas;
	int i=0;
	char oui[10];

///En-tete
	test = enTete(contenu,tete); //Si le fichier n'existe pas encore, on met les titres
	if(test==-1){
		printf("Erreur d'ouverture\n");
		exit(1);
	}

	for(int i=0;i<46;i++){
		printf("\t\t\tInformations sur les L1 MIT\n\n");

///Get data
		mit = getDataId(); 	//Scaner les donnees entrees des etudiants
	
///Enregistrement
		test=enregistrement1(contenu,&mit);	//enregistrer dans les fichiers
		if(test==-1){
			printf("\nErreur d'ouverture!!\n");
			break;
		}
///Continuer pour en ajouter ou quitter
		printf("\nAppuyez sur 0 pour quitter et autre pour en ajouter et :\t"); //Continuer les enregistrements
		fgets(oui,10,stdin);
		if((oui[0]=='0')&&(oui[1]=='\n')){break;}
		sleep(2);
		system("clear");
	}
/*	
///Allocation
	datas = (char**)malloc(sizeof(char*)*100);
	for(int i=0;i<100;i++){
		*(datas+i) = (char*)malloc(sizeof(char)*256);
	}
	
///Get datas's File
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
	printf("OK beee\n");
*/
	return 0;
}
