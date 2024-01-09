#ifndef POINT
#define POINT

#include<string>
class Point{
	private:
		int x;
		int y;
	public:
		Point();
		//~person();
		void setX(int a);
		int getX();
		void setY(int b);
		int getY();

		float pente(Point b);
		Point move(float pente,float dist);
};

#endif
