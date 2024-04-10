#include<stdio.h>
void getData(int* a, int* b);
void displayResult(int q, int r);
void RestQuot(int a, int b, int* q, int* r);

int main (){
	printf("Afficher le quotient et le reste.\n");
	
///Entrée des données
	int a=1, b=1;	//Les valeurs à entrer
	int q=0, r=0;	//Le quotient et le reste
	
while((a!=0&&a<=b)||(b!=0&&b<=a)){
		
	getData(&a,&b);

///Traitements
	if(a>=b){	//C'est de la forme a/b
		RestQuot(a,b,&q,&r);
	}
/*		
		r=a%b;
		q=(a-r)/b;
	}
*/
	else if(b>a){	//C'est de la forme b/a
		RestQuot(b,a,&q,&r);
	}
/*
		r=b%a;
		q=(b-r)/a;
	}
*/

///Sortie des données
	displayResult(q,r);
}

return 0;
}


void RestQuot(int a, int b, int* q, int* r){
	*r=a%b;
	*q=(a-*r)/b;
}	
	
void displayResult(int q, int r){
	printf("Le quotient de la division est %d\nLe reste de la division est %d.\n",q,r);
}

void getData(int* a, int* b){
	printf("Entrer a="); scanf("%d",a);
	printf("Entrer b="); scanf("%d",b);
}
