package Resolution;
import java.lang.Math;
public class Dichotomie extends Function implements Resolution{
	public Dichotomie(){}
	public String resolution(){
		float rep=0;
		int i=0;
		float a=(float)(this.getI());
		float b=(float)(this.getJ());
///Traitement	
		rep=this.centre(a,b);
	///Si aucun d'eux a une solution f(x)=0		
		if(((this.produit(this.f(b),this.f(rep)))>0)&&((this.produit(this.f(a),this.f(rep)))>0)){
			return "Aucune solution";
		}
		else{
			while(Math.abs(this.f(rep))>Math.pow(10,-5)){
				i++;
		///On divise par deux
				rep=this.centre(a,b);
		///Si il y en a, on remplace les bornes
				if(this.produit(this.f(a),this.f(rep))<=0){
					b=rep;
				}
				else if(this.produit(this.f(b),this.f(rep))<=0){
					a=rep;
				}
			}
			this.solution=rep;
			return "The solution is "+this.solution;
			//this.displayData();
		}
	}
}
