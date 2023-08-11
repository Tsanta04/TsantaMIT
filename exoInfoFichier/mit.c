#include "mit.h"
#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include<ctype.h>

							///Les fonctions
///Allouer 2D
char ** allouer(int a,int b){
	char** tab = malloc(sizeof(char*)*a);
	for(int i=0;i<a;i++){
		*(tab+i)=malloc(b);
	}

	return tab;
}

///Obtenir "le max_length" entre 2 char*
int max(char* s1,char* s2){
	int maxim=0;
	if(strlen(s1)>strlen(s2)){
		maxim=strlen(s1);
	}
	if(strlen(s2)>=strlen(s1)){
		maxim=strlen(s2);
	}
	return maxim;
}

///Ecrire dans le fichier concernant l'ID des etudiants
int enregistrement1(char* chemin,Identite* mit){
///Les variables
	FILE* fichier = fopen(chemin,"a");

///Test d'ouverture
	if(fichier == NULL){
		return -1;
	}
	
///Enregistrement
	fprintf(fichier,"%s,%s,%s,%s,%s,%s,%s\n",mit->nom,mit->prenom,mit->parcours,mit->grade,mit->num,mit->email,mit->git);

///Fermeture
	fclose(fichier);
	return 0;
}


///Ecrire dans le fichier concernant l'Info sur PC
int enregistrement2(char* chemin,PC* mit){
///Les variables
	FILE* fichier = fopen(chemin,"a");

///Test d'ouverture
	if(fichier == NULL){
		return -1;
	}
	
///Enregistrement
	fprintf(fichier,"%s\t%s\t%s\n",mit->marque,mit->MAC,mit->label);

///Fermeture
	fclose(fichier);
	return 0;
}


///Faire scaner les infos PC a partir du clavier
PC getDataPc(){
///Les variables
	PC mit;
	
///Entree des donnees
	printf("Marque:\t");
	fgets(mit.marque,100,stdin);

	printf("Adresse MAC:\t");
	fgets(mit.MAC,100,stdin);
	
	printf("Label:\t");
	fgets(mit.label,100,stdin);

///Suppression \n
	mit.marque[strlen(mit.marque)-1]='\0';
	mit.MAC[strlen(mit.MAC)-1]='\0';
	mit.label[strlen(mit.label)-1]='\0';

	return mit;	
}


///Faire scaner les infos ID etudiants a partir du clavier
Identite getDataId(){
///Les variables
	Identite mit;
///Entree des donnees
	printf("NOM:\t");
	fgets(mit.nom,100,stdin);

	printf("PRENOM:\t");
	fgets(mit.prenom,100,stdin);
	
	printf("PARCOURS:\t");
	fgets(mit.parcours,100,stdin);

	printf("GRADE:\t");
	fgets(mit.grade,100,stdin);
	
	printf("NUMERO:\t");
	fgets(mit.num,100,stdin);
	
	printf("E-mail:\t");
	fgets(mit.email,100,stdin);
	
	printf("URL Git:\t");
	fgets(mit.git,100,stdin);
	
///Suppresssion \n
	mit.nom[strlen(mit.nom)-1]='\0';
	mit.prenom[strlen(mit.prenom)-1]='\0';
	mit.parcours[strlen(mit.parcours)-1]='\0';
	mit.grade[strlen(mit.grade)-1]='\0';
	mit.num[strlen(mit.num)-1]='\0';
	mit.email[strlen(mit.email)-1]='\0';
	mit.git[strlen(mit.git)-1]='\0';
			
	return mit;
}

///Triage par alphabet (a partir de test char par char)
void trier(char** datas,int i){
///Les variables
	char tmp[100];
	int len=0; 
///Traitement
	for(int j=1;j<i;j++){
		for(int k=j+1;k<i;k++){
			len = max(datas[j],datas[k]);
			if( toupper((datas[j][0])) < toupper((datas[k][0])) ){
				continue;
			}
			else if( toupper((datas[j][0])) > toupper((datas[k][0])) ){
				strcpy(tmp,datas[j]);
				strcpy(datas[j],datas[k]);
				strcpy(datas[k],tmp);
			}
			else if( toupper((datas[j][0])) == toupper((datas[k][0])) ){
				for(int l=1;l<len;l++){
					if( toupper((datas[j][l])) < toupper((datas[k][l])) ){
						break;
					}
					if( toupper((datas[j][l])) > toupper((datas[k][l])) ){
						strcpy(tmp,datas[j]);
						strcpy(datas[j],datas[k]);
						strcpy(datas[k],tmp);
						break;
					}
				}
			}
		}
	}

}

///Remis des donnees dans le fichier
int putFile(char* chemin,char** datas,int i){
///Declaration
	FILE* fichier1 = fopen(chemin,"w");
	
///Test d'ouverture
	if(fichier1==NULL){return -1;}

///Recuperation des donnees
	for(int j=0;j<i;j++){
		fprintf(fichier1,"%s",datas[j]);
	}
	fclose(fichier1);
	//printf("OKE bee");
	
	return i;	
}

///recuperer tous les infos dans les fichier dit (dans char*)
int getFileToChar(char* chemin,char** datas){
///Declaration
	FILE* fichier1 = fopen(chemin,"r");
	int i=0;
	
///Test d'ouverture
	if(fichier1==NULL){return -1;}

///Recuperation des donnees
	for(i=0;feof(fichier1)!=1;i++){
		fgets(datas[i],256,fichier1);
	}
	fclose(fichier1);
	
	return i;	
}


///Triage par alphabet (a partir de strcmp)
void sort(PC* datas,int i){
	PC tempo;
	int len=0;
	for(int j=1;j<i;j++){
		for(int k=j+1;k<i;k++){
/*
			if(strcmp(datas[j].label,datas[k].label)<0){
				tempo = datas[j];
				datas[j] = datas[k];
				datas[k] = tempo;
			}
*/	
			len = max(datas[j].label,datas[k].label);
			if( (toupper(datas[j].label[0])) < toupper((datas[k].label[0])) ){
				continue;
			}
			else if( toupper((datas[j].label[0])) > toupper((datas[k].label[0])) ){
				tempo = datas[j];
				datas[j] = datas[k];
				datas[k] = tempo;
			}
			else if( toupper((datas[j].label[0])) == toupper((datas[k].label[0])) ){
				for(int l=1;l<len;l++){
					if( toupper((datas[j].label[l])) < toupper((datas[k].label[l])) ){
						break;
					}
					if( toupper((datas[j].label[l])) > toupper((datas[k].label[l])) ){
						tempo = datas[j];
						datas[j] = datas[k];
						datas[k] = tempo;
						break;
					}
				}
			}
		}
	}	
}


///recuperer tous les infos dans les fichier dit (dans le sttruct specifiE)
int getFileToStruct(char* chemin,PC* datas){
	int i=0;
	char tmp[256];

	FILE* fichier =fopen(chemin,"r");

///Get File Datas
	for(i=0;feof(fichier)!=1;i++){
		fgets(tmp,256,fichier);
		sscanf(tmp,"%[^\t]\t%[^\t]\t%[^\t]\n",datas[i].marque,datas[i].MAC,datas[i].label);
	}	
	return i;
}
/*
///recuperer tous les infos dans les fichier dit (dans le sttruct specifiE)
int getFileToStructEtudiants(char* chemin,Identite* datas){
	int i=0;
	char tmp[256];

	FILE* fichier =fopen(chemin,"r");

///Get File Datas
	for(i=0;feof(fichier)!=1;i++){
		fgets(tmp,256,fichier);
		sscanf(tmp,"%[^,],%[^,],%[^,]\n",datas[i].nom,datas[i].prenom,datas[i].parcours,datas[i].grade,datas[i]);
	}	
	return i;
}
*/
///Generer l'e titre de chaque colonne
int enTete(char* chemin,char* tete){
	char existence[100];
	int test=123;
	sprintf(existence,"test -e %s",chemin);
	
	test=system(existence);
	if(test!=0){
		FILE* fichier1 = fopen(chemin,"a");
		fprintf(fichier1,"%s",tete);
		fclose(fichier1);
	}
	return 0;
}

///Ajout d'URL dans les Infos etudiants
void addURL(char** datas,char** URL,int i,char* tete){
	strcpy(URL[0],tete);
	datas[0][strlen(datas[0])-1]='\0';	
	sprintf(datas[0],"%s,%s",datas[0],URL[0]);
	for(int j=1;j<i;j++){
		datas[j][strlen(datas[j])-1]='\0';
		fprintf(stdout,"\t\n- %s -\n\n Entrez votre %s :\t",datas[j],tete);
		fgets(URL[j],100,stdin);
		sprintf(datas[j],"%s,%s",datas[j],URL[j]);
	}
}
