#include<stdio.h>
void getArray(int* tableau, int a);
void plusGrand1(int* tableau, int* tab, int a, int b);	//Methode 1
void plusGrand2(int* tableau, int* tab, int a, int b);	//Methode 2
void plusGrand3(int* tableau, int* tab, int a, int b);	//Methode 3
void displayResult(int* tab, int b);


int main(){
	printf("Les deux plus grands nombres parmis les nombres entrés.\n");

///Les variables
	int nombre[10];		
	int pG[2];	//les plus grands
	int n=2;	//dimension de pG

///Entrée des données
	printf("Entrer les nombres:\n");
	getArray(nombre,10);
	
///Traitements
	//plusGrand1(nombre,pG,10,n);	
	//plusGrand2(nombre,pG,10,n);
	plusGrand3(nombre,pG,10,n);
	
///SOrtie des données
	printf("Les %d nombres plus grands parmis ce que vous avez entrés sont:\t",n);
	displayResult(pG,n);

	return 0;
}

///Les fonctions
void displayResult(int* tab, int b){
	for(int i=0;i<b;i++){
		printf("%d\t",*(tab+i));
	}
}

void plusGrand3(int* tableau, int* tab, int a, int b){
	int max=0;
	int k=0;
	int l=0;	//compteur
	max=*(tableau);
	for(int i=1;i<a;i++){
		for(int j=0;j<a;j++){
			if(max<*(tableau+i)){
				max=*(tableau+i);
			}
		}
	}
	*(tab+k)=max;
	k++;
	
	while(k<b){
		max=*(tableau);
		for(int i=0;i<a;i++){
			for(int j=0;j<a;j++){
				int f=0;
				l=0;
				for(f=0;f<k;f++){
					if(*(tableau+i)!=*(tab+f)){
						l++;
					}
				}
				if((l==f)&&(max<*(tableau+i))){
					max=*(tableau+i);
				}
			}
		}
		*(tab+k)=max;
		k++;
	}
}

void plusGrand2(int* tableau, int* tab, int a, int b){
	int max=0;
	int tab2[a];	//tableau tempon pour stocker temporairement les nombres autre que max
	int l=0;
	int k=0;
	while(k<b){
		max=*(tableau);
		for(int i=1;i<a;i++){
			for(int j=0;j<a;j++){
				if(max<*(tableau+i)){
					max=*(tableau+i);
				}
			}
		}
		*(tab+k)=max;
		k++;
		l=0;
		for(int i=0;i<a;i++){
			if(*(tableau+i)!=max){
				*(tab2+l)=*(tableau+i);
				l++;
			}
		}
		for(int i=0;i<l;i++){
			*(tableau+i)=*(tab2+i);
		}
		a=l;
	}
}

void plusGrand1(int* tableau, int* tab, int a, int b){		
	int max=0,	min=0;
	
	for(int k=0;k<b;k++){
		max=*(tableau);
		min=*(tableau);
		for(int i=1;i<a;i++){
			for(int j=0;j<a;j++){
				if(max<*(tableau+i)){
					max=*(tableau+i);
				}
				if(min>*(tableau+i)){
					min=*(tableau+i);
				}
			}
		}
	*(tab+k)=max;
		for(int i=0;i<a;i++){
			if(*(tableau+i)==max){
				*(tableau+i)=min;
			}
		}
	}
}

void getArray(int* tableau, int a){
	for(int i=0;i<a;i++){
		printf("%d:\t",i);
		scanf("%d",(tableau+i));
	}
}
