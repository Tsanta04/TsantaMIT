#include<stdio.h>
#include<math.h>
int main(){
	float x1,x2,x,a,b,c,D;
	a=0;
	b=0;
	c=0;
	D=0;
	x1=0;
	x2=0;

	printf("Calcul d'une équation réelle et complexe en secnd degré\n");
	printf("Alors c'est de la forme ax^2+bx+c\n");
	printf("Donnez a, b, et c\n");

	scanf("%f %f %f", &a, &b, &c);

	D=pow(b,2)-4*a*c;
	

	if(D>0){
		printf("Cette équation admet deux solutions\n");
		x1=(-b+sqrt(D))/2*a;
		x2=(-b-sqrt(D))/2*a;
		printf("x1=%f\n", x1);

		printf("x2=%f\n", x2);
	}

	else if(D<0){
		printf("Cette équation admet des solutions complexes\n");
	}
	else if (D==0){
 	 	printf("Cette équation admet une solution/n");

		x=-b/2*a;
		printf("x=%f\n",x);
	}
return 0;
}
