import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;

public class NewtonM extends Traitement{
	public int iteration=0;
	public float pointI;
	public float pas;
	public float resultat;
	
	public NewtonM() {
		
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
	
	public void resolution(String path) throws FileNotFoundException {
		try {
			this.methode="Newton";		
			PrintWriter fd = new PrintWriter(new File(path));
			float r=0;
			float a=this.pointI;
			float tol=(float) 0.005;
			float x=a-(f.fp(a)/f.fpp(a));
			do{
				if(f.fpp(r)==0) {
					this.iteration=-2;
					break;
				};
				r=x;
				x=r-(f.fp(r)/f.fpp(r));
				fd.println(r+" "+f.f(r));
				this.iteration++;
			}while((Math.abs(f.fp(r))>tol)&&(this.iteration<10000));
			if(this.iteration>=10000)this.iteration=-1;
			fd.close();
			this.pathDatas=path;
			this.resultat=r;		
		}catch(Exception e) {
			e.getStackTrace();
			this.pathDatas="null";
		}
	}
}
