#include<stdio.h>
#include<stdlib.h>

typedef struct LISTE{
	int val;
	struct LISTE* suivant;
	
}LISTE;
int length(LISTE* L);
void values(LISTE* L);
void push(LISTE ** liste,int value);


int main(){
	int n=0;
	LISTE *liste=0;	//On l'initialise a 0 pour dire qu'il pointe nulle part
	liste=(LISTE*)malloc(sizeof(LISTE));
	LISTE* tmp=(LISTE*)malloc(sizeof(LISTE));
	tmp->val=12;
	tmp->suivant=liste;
	liste=tmp;
	
	LISTE* tmp2=(LISTE*)malloc(sizeof(LISTE));
	tmp2->val=10;
	tmp2->suivant=liste->suivant;
	liste->suivant=tmp2;

	
	tmp->suivant=liste->suivant;
	liste->suivant->suivant=0;
	
	
	
//	liste->val=100;
/*
	liste->suivant=(LISTE*)malloc(sizeof(LISTE));
	liste->suivant->val=1;
	liste->suivant->suivant=(LISTE*)malloc(sizeof(LISTE));
	liste->suivant->suivant->val=1001;
*/
	
	//push(&liste,23);
//	liste->suivant=liste;
	n=length(liste);
	printf("n=%d\n",n);
	values(liste);
	return 0;
}


/*
int main(){
	LISTE* liste=(LISTE*)malloc(sizeof(LISTE));
	push(&liste,3);
	values(liste);
	
	return 0;
}
*/

void push(LISTE ** liste,int value){
///Allocation de tmp
	//printf("%d",value);
	LISTE* tmp = 0;
	//LISTE* ptr=*liste;
	tmp = (LISTE*)malloc(sizeof(LISTE));
	//tmp = malloc(sizeof(*tmp));
	if(tmp == NULL){
		exit(1);
	}
	tmp->val=value;
	tmp->suivant=0;
///Affectation
	if(liste==NULL){
		*liste=tmp;	//Poutr qu'il pointe quelque part
	}
	else{
		while(liste!=NULL){
			//ptr=(ptr)->suivant;
			*liste = (*liste)->suivant;
		}
		(*liste)->suivant=tmp;
	}
}


int length(LISTE* L){
	int n=0;
	while(L!=NULL){
		L=L->suivant;
		n++;
	}
	
	return n;
}

void values(LISTE* L){
	while(L!=NULL){
		printf("%d\n",L->val);
		L=L->suivant;
	}
	
}
