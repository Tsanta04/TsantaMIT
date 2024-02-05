package Resolution;
import java.lang.Math;
public class Newton extends Function implements Resolution{
	public Newton(){}

    private float tangente(float x){
	    return (x/(1+f(x)));
    }

    public String resolution(){
        float rep=0;
        int i=0;
        float tmp=0;
        float a=(float)(this.getI());
        float b=(float)(this.getJ());
        if( (this.produit(this.f(a),this.f(b))>0)&&(this.produit(this.f(b),this.f(a))>0) ){
            return "Aucune solution";
        }
        else{
            rep=this.centre(a,b);
            while(Math.abs(this.f(rep))>Math.pow(10,-5)){
                i++;
                tmp=(float)(this.tangente(rep));
                if((rep>b)||(rep<a)){
                    rep+=0.1;
                }
                else{
                    rep=tmp;
                }
            }
			this.solution=rep;
			return "The solution is "+this.solution;
			//this.displayData();
        }
    }
}
