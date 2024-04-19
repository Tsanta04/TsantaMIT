<?php
namespace App\Controllers;

use App\Libraries\Fonction;
use App\Libraries\Descartes;
use App\Libraries\Descente;
use App\Libraries\Dichotomie;
use App\Libraries\NewtonM;
use App\Libraries\NewtonR;
use App\Libraries\Rectangle;
use App\Libraries\Simpson;
use App\Libraries\Traitement;
use App\Libraries\Trapeze;


class Dashboard extends BaseController
{
    public $url = "http://www.code.com/index.php";
    public $data=[];

    public function index($mode): string
    {
        $this->data = [
            'mode' => $mode,
            'url'  => $this->url,
        ];
        return view('Dashboard',$this->data);
    }

    private function getFonction($post)
    {
         $fx = new Fonction();
        $fx->setDim((int)$post["dim"]);
        $coef = array_fill(0, $fx->dim + 1, 0);
        for ($i = 0; $i <= $fx->dim; $i++) {
          $coef[$i] = (float)$post[($i + 100)];
        }
      
        $fx->setCoeff($coef);
        return $fx;
    }
      
    private function traitement() 
    {
      $post = $_POST;
      $fx = $this->getFonction($post);

              
        if (isset($post['methode']) && $post['methode'] == 1) {
          $f = new Dichotomie();
          $f->setFonction($fx);
          $f->setPointA((float)$post['pointA']);
          $f->setPointB((float)$post['pointB']);
          $f->resolution("datas.txt");
          $f->gnuplot("function.png", $f->pointA, $f->pointB); // Assuming gnuplot function exists
          
          $this->data["methode"] = $f->methode;
          $this->data["fonction"] = $f->f->f;
          $this->data["iteration"] = $f->iteration;
          $this->data["path"] = $f->pathImg;
          $this->data["resultat"] = $f->resultat;
          $this->data["coef"] = $f->f->coefficient;
          $this->data["pointA"] = $f->pointA;
          $this->data["pointB"] = $f->pointB;
        }
        if (isset($post['methode']) && $post['methode']  == 2) {
              $f = new NewtonR($fx,(float)$post['pointI']);
              $f->resolution("datas.txt");
              $f->gnuplot("function.png", $f->pointI, $f->pointI);
      
              $this->data["methode"] = $f->methode;
              $this->data["fonction"] = $f->f->f;
              $this->data["iteration"] = $f->iteration;
              $this->data["path"] = $f->pathImg;
              $this->data["resultat"] = $f->resultat;
              $this->data["coef"] = $f->f->coefficient;
              $this->data["pointA"] = $f->pointI;
              $this->data["pointB"] = $f->pointI;
          }		
        if (isset($post['methode']) && $post['methode'] == 3) {
              $f = new Descartes();
              $f->setFonction($fx);
              $f->setPointA((float)$post['pointA']);
              $f->setPointB((float)$post['pointB']);
              $f->resolution("datas.txt");
              $f->gnuplot("function.png", $f->pointA, $f->pointB);
            
              $this->data["methode"] = $f->methode;
              $this->data["fonction"] = $f->f->f;
              $this->data["iteration"] = $f->iteration;
              $this->data["path"] = $f->pathImg;
              $this->data["resultat"] = $f->resultat;
              $this->data["coef"] = $f->f->coefficient;
              $this->data["pointA"] = $f->pointA;
              $this->data["pointB"] = $f->pointB;
            }
            
        if (isset($post['methode']) && $post['methode'] == 4) {
              $f = new NewtonM();
              $f->setFonction($fx);
              $f->setPointI((float)$post['pointI']);
              $f->setPas((float)$post['pas']);
              $f->resolution("datas.txt");
              $f->gnuplot("function.png", $f->pointI, $f->pointI); // Assuming gnuplot function exists
            
              $this->data["methode"] = $f->methode;
              $this->data["fonction"] = $f->f->f;
              $this->data["iteration"] = $f->iteration;
              $this->data["path"] = $f->pathImg;
              $this->data["resultat"] = $f->resultat;
              $this->data["coef"] = $f->f->coefficient;
              $this->data["pointA"] = $f->pointI;
              $this->data["pointB"] = "--"; }             
        if (isset($post['methode']) && $post['methode'] == 5) {
              $f = new Descente();
              $f->setFonction($fx);
              $f->setPointI((float)$post['pointI']);
              $f->setPas((float)$post['pas']);
              $f->resolution("datas.txt");
              $f->gnuplot("function.png", $f->pointI, $f->pointI); // Assuming gnuplot function exists
            
              $this->data["methode"] = $f->methode;
              $this->data["fonction"] = $f->f->f;
              $this->data["iteration"] = $f->iteration;
              $this->data["path"] = $f->pathImg;
              $this->data["resultat"] = $f->resultat;
              $this->data["coef"] = $f->f->coefficient;
              $this->data["pointA"] = $f->pointI;
              $this->data["pointB"] = "--";}
        if (isset($post['methode']) && $post['methode'] == 6) {
              $f = new Rectangle();
              $f->setFonction($fx);
              $f->setPointA((float)$post['pointA']);
              $f->setPointB((float)$post['pointB']);
              $f->setPas((float)$post['pas']);
              $f->resolution("datas.txt");
              $f->gnuplot("function.png", $f->pointA, $f->pointB); // Assuming gnuplot function exists
            
              $this->data["methode"] = $f->methode;
              $this->data["fonction"] = $f->f->f;
              $this->data["iteration"] = $f->pas; // Assuming 'pas' represents iterations for rectangle rule
              $this->data["path"] = $f->pathImg;
              $this->data["resultat"] = $f->resultat;
              $this->data["coef"] = $f->f->coefficient;
              $this->data["pointA"] = $f->pointA;
              $this->data["pointB"] = $f->pointB;} 
            
            else if (isset($post['methode']) && $post['methode'] == 7) {
              $f = new Trapeze();
              $f->setFonction($fx);
              $f->setPointA((float)$post['pointA']);
              $f->setPointB((float)$post['pointB']);
              $f->setPas((float)$post['pas']);
              $f->resolution("datas.txt");
              $f->gnuplot("function.png", $f->pointA, $f->pointB); // Assuming gnuplot function exists
            
              $this->data["methode"] = $f->methode;
              $this->data["fonction"] = $f->f->f;
              $this->data["iteration"] = $f->pas; // Assuming 'pas' represents iterations for trapezoidal rule
              $this->data["path"] = $f->pathImg;
              $this->data["resultat"] = $f->resultat;
              $this->data["coef"] = $f->f->coefficient;
              $this->data["pointA"] = $f->pointA;
              $this->data["pointB"] = $f->pointB;            
            } 
            
            else if (isset($post['methode']) && $post['methode'] == 8) {
              $f = new Simpson();
              $f->setFonction($fx);
              $f->setPointA((float)$post['pointA']);
              $f->setPointB((float)$post['pointB']);
              $f->setPas((float)$post['pas']);
              $f->resolution("datas.txt");
              $f->gnuplot("function.png", $f->pointA, $f->pointB);
            
              $this->data["methode"] = $f->methode;
              $this->data["fonction"] = $f->f->f;
              $this->data["iteration"] = $f->pas;
              $this->data["path"] = $f->pathImg;
              $this->data["resultat"] = $f->resultat;
              $this->data["coef"] = $f->f->coefficient;
              $this->data["pointA"] = $f->pointA;
              $this->data["pointB"] = $f->pointB;            
            }
            
          if($this->data["iteration"]==-1) {
              $this->data["iteration"]="indefinie";
              $this->data["resultat"] = "Aucune solution";
          }
          else if($this->data["iteration"]==-2) {
              $this->data["iteration"]="indefinie";
              $this->data["resultat"] = "Les donnees entrees ne sont pas compatibles avec cette methode.";
          }
          else if($this->data["iteration"]>=0) {}
    }

    public function development($mode): string 
    {
        $this->data = [
          'mode' => $mode,
          'url'  => $this->url,
        ];      
       $this->traitement();
        return view('Dashboard',$this->data);
    }

}
?>
