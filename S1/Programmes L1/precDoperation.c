#include<stdio.h>
int main(){
	
///1
	int		a=7,	b=3;
	b=++a;	//a=7, b=3, ++a,a=_,b=8
	printf("a= %d\tb= %d\n",a,b);
	
	a=7;	b=3;
	b=a++;	//a=7, b=3, b=a, a++
	printf("a= %d\tb= %d\n",a,b);
	
	//c'est l'affectation qui va être faite en premier, plutôt que a++
	
///2
	a=7,	b=3; int	c=2;
	printf("a-b-c= %d\ta-(b-c)=%d\n",a-b-c,a-(b-c));
	
///3
	printf("a/b/c=%d\ta\(b\c)=%d\n",a/b/c,a/(b/c));
	return 0;
}
