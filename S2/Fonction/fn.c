#include<stdio.h>
#include<math.h>
#include"fn.h"

///Entree des donnees
void lesDonnees(float* a,float* b,float* eps){
	printf("Entrez la borne a gauche:\na=\t");
	scanf("%f",a);
	
	printf("Entrez la borne a droite:\nb=\t");
	scanf("%f",b);
	
	printf("Entrez l'approximation (en float):\neps=\t");
	scanf("%f",eps);
}

///La fonction
float f(float x){
	return log(x)-1;
}

///Methode de dichotomie
void dichotomie(float a,float b,float eps){
	float rep=0.0;
	int i=0;

///Traitement	
	while(fabs(f(rep))>eps){
		i++;
///On divise par deux
		rep=centre(a,b);
///Si aucun d'eux a une solution f(x)=0		
		if((produit(f(b),f(rep)>0))&&(produit(f(a),f(rep))>0)){
			printf("=>Aucune solution\n");
			break;
		}
///Si il y en a, on remplace les bornes
		else if(produit(f(a),f(rep))<=0){
			b=rep;
			//continue;
		}
		else if(produit(f(b),f(rep))<=0){
			a=rep;
			//continue;
		}
		printf("--> %d=%f\n",i,rep);
	}
}

///Integrale Rectangle
float integraleC(float a,float b,float eps){
	float rep=0.0;
	int k=0;

	for(float i=a;i<b;i+=eps){
		k++;
		rep+=( f(i)*eps );
///Vaut mieux perdre les donnees plutot que d'inventer
		if( fabs(f(i))>fabs(f(i+eps)) ){
			rep-=( (f(i)-f(i+eps))*eps );
		}

		printf("-->%d: %f\n",k,rep);
	}

	return rep;
}

///Integrale Trapeze
float integraleT(float a,float b,float eps){
	float rep=0.0;
	int k=0;

	for(float i=a;i<b;i+=eps){
		k++;
///Choix s'il faut ajouter ou soustraire le petit rectangle
		if( fabs(f(i))>fabs(f(i+eps)) ){
			rep+=( f(i)*eps )-fabs( ((f(i)-f(i+eps))*eps)/2 );
		}
		else if( fabs(f(i))<=fabs(f(i+eps)) ){
			rep+=( f(i)*eps )+fabs( ((f(i)-f(i+eps))*eps)/2 );
		}

		printf("-->%d: %f\n",k,rep);
	}

	return rep;
}

///Methode de secance
void traitementSecante(float a,float b,float eps){
	float rep=0.0;
	int i=0;
	rep=secante(a,b);
	if((rep>b)||(rep<a)){
		printf("=>Aucune solution\n");
	}
///Comme la dichotomie, mais en ajoutant on ne choisit pas le centre mais le point d'instersection de (AB) et y=0
	else{
		while(fabs(f(rep))>eps){
			i++;
			rep=secante(a,b);

			if(((f(a)*f(rep))>0)&&(f(b)*f(rep)>0)){
				printf("=>Aucune solution\n");
				break;
			}
			else if(f(a)*f(rep)<=0){
				b=rep;
				printf("--> %d=%f\n",i,b);
				continue;
			}
			else if(f(b)*f(rep)<=0){
				a=rep;
				printf("--> %d=%f\n",i,a);
				continue;
			}
		}
	}
}

///Methode de Newton

void newton(float a,float b,float eps){
	float rep=0.0;
	int i=0;
	float tmp=0;

    //tmp=centre(a,b);
    if( (produit(f(a),f(b))>0)&&(produit(f(b),f(a))>0) ){
        printf("pro1=%lf\nprod2=%lf\nAucune solution\n",produit(f(a),f(tmp)),produit(f(b),f(tmp)));
    }
    
    else{
		rep=centre(a,b);
	while(fabs(f(rep))>eps){
		i++;
		tmp=tangente(rep);
		printf("%d-->%lf\n",i,rep);
		if((rep>b)||(rep<a)){
			rep+=0.1;
		}
		else{
			rep=tmp;
		}
	}
    }
}

/*
void newton(float a,float b,float eps){
	float rep=0.0;
	int i=0;

///Traitement	
	while(fabs(f(rep))>eps){
		i++;
///On divise par deux
		rep=tan(a);
		if((rep>b)||(rep<a)){
			rep=centre(a,b);
		}
///Si aucun d'eux a une solution f(x)=0		
		if((produit(f(b),f(rep)>0))&&(produit(f(a),f(rep))>0)){
			printf("=>Aucune solution\n");
			break;
		}
///Si il y en a, on remplace les bornes
		else if(produit(f(a),f(rep))<=0){
			b=rep;
			//continue;
		}
		else if(produit(f(b),f(rep))<=0){
			a=rep;
			//continue;
		}
		printf("--> %d=%f\n",i,rep);
	}
}
*/

///Autres fonctions utiles
float secante(float a,float b){
    float A=quot(a,b);
    float B=rest(a,A);
    return (-B/A);
    
}
float quot(float x,float y ){
    return ( (f(x)-f(y))/(x-y) );
}
float rest(float x,float a ){
    return ( f(x)-(a*x) );
}
float tangente(float x){
	return (x/(1+f(x)));
}

float centre(float a,float b){
    return (((b-a)/2)+a);
}

float produit(float x,float y){
    return (x*y);
}
