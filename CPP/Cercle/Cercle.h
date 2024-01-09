#ifndef CIRCLE
#define CIRCLE

#include<string>
#include"Point.h"

class Cercle{
	private:
		Point centre;
		int rayon;
		std::string couleur;
	public:
		Cercle();

		void setCouleur(std::string color);
		std::string getCouleur();
		void setCentre(Point center);

		Point getCentre();
		void setRayon(int ray);
		int getRayon();

		void afficher();
		int straddled(Cercle autre);
};

#endif
