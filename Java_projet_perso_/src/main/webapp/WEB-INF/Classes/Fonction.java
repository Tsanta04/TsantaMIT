public class Fonction {
	public int dim;
	public float[] coefficient;
	public float[] coeffD;
	public float[] coeffDD;
	public String f;
	public String fp;
	public String F;
	
	public Fonction() {
		
	}
	
	public void setDim(int x) {
		dim=x;
	}
	public void setCoeff(float[] x) {
		this.f="";
		coefficient=x;
		for(int i=0;i<=this.dim;i++) {
			if(i>0)f+="+";
			f+="("+this.coefficient[i];
			for(int j=0;j<(this.dim-i);j++) {
				f+="*x";
			}
			f+=")";
		}
	}	

	public float f(float x) {
		float result=this.coefficient[0];
		for(int i=1;i<this.dim;i++){
			result=(result*x)+this.coefficient[i];
		}		
		return result;		
	}
	
	public float fp(float x) {
		float result=0;
		this.coeffD=new float[this.dim];
		for(int i=0;i<=this.dim-1;i++) {
			this.coeffD[i]=((this.dim-i) * this.coefficient[i]);
		}
		for(int i=1;i<this.dim-1;i++){
			result=(result*x)+this.coeffD[i];
		}				
		return result;		
	}

	public float fpp(float x) {
		float result=0;
		this.coeffDD=new float[this.dim-1];
		for(int i=0;i<=this.dim-2;i++) {
			this.coeffDD[i]=((this.dim-i) * this.coeffD[i]);
		}
		for(int i=1;i<this.dim-2;i++){
			result=(result*x)+this.coeffDD[i];
		}				
		return result;
	}
}
