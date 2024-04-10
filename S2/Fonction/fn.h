#ifndef H
#define H
float f(float x);
void dichotomie(float a,float b,float eps);
void lesDonnees(float* a,float* b,float* eps);
float centre(float a,float b);
float produit(float x,float y);
float integraleC(float a,float b,float eps);
float integraleT(float a,float b,float eps);
void traitementSecante(float a,float b,float eps);
float secante(float a,float b);
float quot(float x,float y );
float rest(float x,float a );
void newton(float a,float b,float eps);
float tangente(float x);
#endif
