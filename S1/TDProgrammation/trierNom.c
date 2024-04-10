#include<stdio.h>
#include<stdlib.h>
#include<string.h>


int main (){
	printf("Triage des noms.\n");

///Variables
	char* name[10];
	//int ascii[5]={0,0,0,0,0};
///Initialisation des variables
	for(int i=0;i<5;i++){
		*(name+i)=(char*)malloc(sizeof (char)*30);
	}
	
///ENtrée des données
	for(int i=0;i<5;i++){
		printf("%d: ",i);
		scanf("%s", name[i]);
	}

/*
	for(int i=0;i<5;i++){
		ascii[i]=(int)*name[i];
	}
*/
	
///Traitement
	int x=0;
	for(int i=0;i<5;i++){
/*
		x=0;
		x=strcmp((name[i]),(name[i+1]));
		
		if(x!=0){
*/		for(int j=i+1;j<5;j++){
			char tmp[10000];
			int k=0;
				
			while( toupper( *(name[i]+k) ) == toupper( *(name[j]+k) ) ){	
				k++;
			}
			if( toupper( *(name[i]+k) ) > toupper( *(name[j]+k) ) ){
				strcpy(tmp,name[i]);
				strcpy(name[i],name[j]);
				strcpy(name[j],tmp);
			}
		}
	}
	
/*
			while(){
				if( *(name[i]+k) > *(name[j]+k) ){
					strcpy(tmp,name[i]);
					strcpy(name[i],name[j]);
					strcpy(name[j],tmp);
					m=1;
				}
				if ((*(name[i]+k)<*(name[j]+k))||(m==1)){
					break;
				}
				else if(*(name[i]+k)==*(name[j]+k)){
					k++;
				}
			}
		}		
	}
*/
				
/*			
			if( (ascii[i])>(ascii[j]) ){
			
				for(int k=0;k<strlen(name[i]);k++){
					tmp[k]=*(name[i]+k);
				}
				
				for(int k=0;k<strlen(name[j]);k++){
					*(name[i]+k)=*(name[j]+k);
				}
				
				for(int k=0;k<strlen(name[j]);k++){
					*(name[j]+k)=tmp[k];
				}
			}
		}
	}
*/

///Sortie des données
	for(int i=0;i<5;i++){
		printf("%s\n",name[i]);
	}
	
/*
	for(int i=0;i<3;i++){
		printf("%d\n",ascii[i]);
	}
*/
	
/*	correction
	for(int i=0;i<10;i++){
		for(int j=0;j<10;j++){
			if(strcmp(name[i],name[j]) > 0){
				tmp=name[i];
				name[i]=name[j];
				name[j]=tmp;
			}
		}
	}
*/
	
	return 0;
}

