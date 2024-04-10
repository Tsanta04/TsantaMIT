#include<stdio.h>
void getData(int*n);

int main(){
	printf("Un programme pour savoir si un nombre est parfait.\n");

///Entrée des données
	int n=0;	//Le nombre à entrer
	int i=1, s=0;	//La somme des diviseurs autre que n
	
	getData(&n);

///Traitement
	for(i=1,s=0;i<n;i++){
		int b=0;
		b=n%i;
		if(b==0){
			s+=i;
			
		}
		printf("Pour b=%d,s=%d\n",b,s);
	}

///Sortie des données
	if(n==s){
		printf("C'est un nombre parfait.\n");
	}
	else if(n!=s){
		printf("Ce n'est pas un nombre parfait.\n");
	}
	
return 0;
}

void getData(int*n){
	printf("Donner n=");
	scanf("%d",n);
}
