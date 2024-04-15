import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;

public class Simpson extends Traitement{
	public float pointA;
	public float pointB;
	public float pas;
	public float resultat;
	
	public void setFonction(Fonction fx) {
		this.f = fx;
	}

	public void setPointA(float i) {
		this.pointA = i;
	}

	public void setPointB(float i) {
		this.pointB = i;
	}

	public void setPas(float i) {
		this.pas = i;
	}	
	
	public Simpson() {
		
	}

	public void resolution(String path) throws FileNotFoundException {
		try {
			this.methode="Simpson";		
			PrintWriter fd = new PrintWriter(new File(path));
			float r=0;
			float a=this.pointA,b=this.pointB;
			float h=(Math.abs(b)-Math.abs(a))/this.pas;
			
			for(int i=2;i<this.pas;i+=2){
				r+=2*f.f(a);
				a+=2*h;
				fd.println(a+" "+f.f(a));
			}
			for(int i=1;i<this.pas;i+=2){
				r+=4*f.f(a);
				a+=2*h;
			}
			fd.close();
			this.pathDatas=path;
			this.resultat=(h/3)*r;		
		}catch(Exception e) {
			e.getStackTrace();
			this.pathDatas="null";
		}
	}
}
