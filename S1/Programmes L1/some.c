#include<stdio.h>
#include<math.h>

int main(){
	float x, y, z;
	x=0;
	y=0;
		printf("Donner x=");
		scanf("%f",&x);
		
		printf("Donner y=");
		scanf("%f", &y);

	z=sin(x)/tan(y);

		printf("La valeur qu'on cherche c'est z=%f\n", z);
return 0;
}

