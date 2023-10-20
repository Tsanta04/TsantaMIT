#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"fn.h"

int main(){
///Les variables
	char* data=getenv("QUERY_STRING");
	FILE* f; char file[100];
	char tmp[100]="";
	char inutile[200]="";
	LOGIN izy;
///wc -l
	f=popen("wc -l login.csv","r");
	fgets(inutile,200,f);
	int len=atoi(inutile);
	pclose(f);
	
///Allocation
	LOGIN* log=(LOGIN*)malloc(sizeof(LOGIN)*len);
	int indice=0;
	
///Recuperation donnee
	sscanf(data,"id=%[^&]&ip=%[^\n]",izy.id,izy.ip);
	
///Contenu de File
	sprintf(file,"login.csv");
	f=fopen(file,"r");
	if(f==NULL){printf("Erreur d'ouverture");exit(1);}
	for(int i=0;i<len;i++){
		fgets(inutile,200,f);
		sscanf(inutile,"%[^:]:%[^\n]\n",log[i].id,log[i].ip);
		if((strcmp(izy.id,log[i].id)==0)&&(strcmp(izy.ip,log[i].ip)==0)){
			indice=i;
		}
	}
	fclose(f);
	f=fopen(file,"w");
	for(int j=0;j<len;j++){
		if(j==indice){
			continue;
		}
		fprintf(f,"%s:%s\n",log[j].id,log[j].ip);
	}
	printf("Set-Cookie:nom_cookie=123; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; HttpOnly\n");
	printf("Status: 302 Found\n");
	printf("Location: http://www.tsa.com/cgi-bin/authLog2/authLog.cgi\n\n");			
	return 0;
}
