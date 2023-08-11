#include<stdio.h> 
#include<math.h>
int main(){
	float Xa, Xb, Ya, Yb, Dist;
	Xa=0;
	Ya=0;
	Xb=0;
	Yb=0;
		printf("Donner les coordonnées de A Xa,Ya\n");
		scanf("%f %f", &Xa, &Ya);


		printf("Donner les coordonnées de B Xb,Yb \n");
		scanf("%f %f", &Xb, &Yb);

	Dist=sqrt(pow(Xb-Xa,2)+pow(Yb-Ya,2));

		printf("Alors la distance de A et B c'est %f\n", Dist);

return 0;
}



