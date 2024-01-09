#include<iostream>
#include"Point.h"
#include<cmath>

Point::Point(){
	x=0;
	y=0;
}

void Point::setX(int a){
	x=a;
}

void Point::setY(int b){
	y=b;
}

int Point::getX(){
	return x;
}

int Point::getY(){
	return y;
}

float Point::pente(Point b){
	if((x-b.getX())!=0){
		float result=(y-b.getY())/(x-b.getX());
		return (float)atan(result);
	}
	return 0;
}

Point Point::move(float pente,float dist){
	Point result=Point();
	result.setX(x+(int)(cos(pente)*dist));
	result.setY(y+(int)(sin(pente)*dist));
	return result;
}
