#ifndef STR
#define STR

///Structures
typedef struct{
        char IP[200];
        char time[200];
        char action[200];
        char URL[200];
}INFO;
typedef struct{
        char nom[200];
        char id[200];
        char mail[200];
        char psswd[200];
        char ip[100];
}ID;
typedef struct{
        char id[200];
        char psswd[200];
}LOG;
typedef struct{
        char ip[200];
        char id[200];
}LOGIN;

///Les prototypes

///Outils pour avoir les donnees
char* geturl();
char* reglage(char* data);
void reglage1(char* a);
int max(int ligne);
void chiffrePagination(char* total,int* rand,int* debut,int* voalohany,int* farany,int mx);
void separerDonnee(char* string, char* line,char* mode);
char* supprPlus(char* data);

///Obtenir les donnees de authLog (avec les gestions de recherche ...)
void head();
INFO* getData(int *ligne,char* string);

///HTML d'affichage de donnee
void displayResult(char* total,int ligne,INFO* user,char* string,ID us,char* mode);
void displayData(char* total,int ligne,INFO* user,char* string,char* mode);
void displayNav(ID us);

///Formulaire de login et signin
void formLogin(int i);
void formSignIn();

///Protopype traitement des donnees hors de login et signin
void registerID();
int verifyID();
int dejaPris(char* file,char* nom);

///Prototypes des fonctions sur changement de mot de passe
void entrerNom();
void changerMdp();

///Test s'il est deja onnecte ou non
int authentification(ID* contain);

///Serveur
void formulaireWeb();
int creationVirtual(char* nom);
//int activation();
int activation(char* site,char* mode);
int host(char* nom);
//int heberger();

int heberger(char* site);
void configuration(char* us,char*line,char* mode);
char** getsite(int* a);
#endif
