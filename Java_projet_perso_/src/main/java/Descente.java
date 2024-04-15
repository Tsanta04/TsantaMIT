import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;

public class Descente extends Traitement{
	public int iteration;
	public float pointI;
	public float pas;
	public float resultat;
	
	public Descente() {
		
	}


	public void setFonction(Fonction fx) {
		this.f = fx;
	}

	public void setPointI(float i) {
		this.pointI = i;
	}
	
	public void setPas(float alpha) {
		this.pas = alpha;
	}

	private float An_1(float Da0, float a0n, float alpha ){
		float a0n_1=0;
		a0n_1 = a0n - (alpha * Da0);
		return a0n_1;
	}
	
	public void resolution(String path) throws FileNotFoundException {
		try {
			this.methode="Descente du Gradient";
			float dx=0;
			float x=0;
			float a0=this.pointI;
			float alpha=this.pas;		
			float tol=(float)0.0005;
			PrintWriter fd = new PrintWriter(new File(path));
			while( ((Math.abs(a0-x))>tol) && (this.iteration<10000) ){
				fd.println(a0+" "+f.f(a0));
				x=a0;													//C'est de manipuler des simples variables, au lieu de pointeur
				dx=0;
				dx=f.fp(x);
				a0=An_1(dx, x, alpha );
				this.iteration++;
			}
			if(this.iteration >=10000)this.iteration =-1;
			fd.close();
			this.resultat=a0;
			this.pathDatas=path;
		}catch(Exception e) {
			e.getStackTrace();
			this.pathDatas="null";
		}
	}
}
