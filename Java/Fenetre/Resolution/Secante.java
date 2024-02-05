package Resolution;
import java.lang.Math;
public class Secante extends Function implements Resolution{
	public Secante(){}

	private float quot(float x,float y ){
		return ( (this.f(x)-this.f(y))/(x-y) );
	}

	private float rest(float x,float a ){
		return ( this.f(x)-(a*x) );
	}

    private float secante(float a,float b){
        float A=this.quot(a,b);
        float B=this.rest(a,A);
        return (-B/A);
    }
    
    public String resolution(){
		float rep=0;
		int i=0;
		float a=(float)(this.getI());
        float b=(float)(this.getJ());
		rep=this.secante(a,b);
		if((rep>b)||(rep<a)){
			return "Aucune solution";
		}
	///Comme la dichotomie, mais en ajoutant on ne choisit pas le centre mais le point d'instersection de (AB) et y=0
		else{
			while(Math.abs(this.f(rep))>Math.pow(10,-5)){
				i++;
				rep=this.secante(a,b);

				if(((this.f(a)*this.f(rep))>0)&&(this.f(b)*this.f(rep)>0)){
					return "Aucune solution";
				}
				else if(this.f(a)*this.f(rep)<=0){
					b=rep;
					continue;
				}
				else if(this.f(b)*this.f(rep)<=0){
					a=rep;
					continue;
				}
			}
			this.solution=rep;
			return "The solution is "+this.solution;
			//this.displayData();
		}
	}
}
