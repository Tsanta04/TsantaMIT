<?php
namespace App\Libraries;

class Descente extends Traitement {
    public $iteration;
    public $pointI;
    public $pas;
    public $resultat;
  
    public function __construct() {
      
    }  

    public function setPointI(float $i) {
      $this->pointI = $i;
    }
  
    public function setPas(float $alpha) {
      $this->pas = $alpha;
    }
  
    private function An_1(float $Da0, float $a0n, float $alpha) {
      return (float) $a0n - ($alpha * $Da0);
    }
  
    public function resolution(string $path) {
      $this->methode = "Descente du Gradient";
      try {
          $outputFile = fopen($path, "w");
          if (!$outputFile) {
            throw new Exception("Failed to open file: " . $path);
          }
        $dx = 0;
        $x = 0;
        $a0 = $this->pointI;
        $alpha = $this->pas;
        $tol = 0.0005;
  
        while ((float)abs($a0 - $x) > $tol && $this->iteration < 10000) {
          fwrite($outputFile, $a0 . " " . $this->f->f($a0) . PHP_EOL);
          $x = (float)$a0;
          $dx = 0;
          $dx =(float) $this->f->fp($x); // Assuming fp is defined in Fonction class for derivative
          $a0 = $this->An_1($dx, $x, $alpha);
          $this->iteration++;
        }
  
        if ($this->iteration >= 10000) {
          $this->iteration = -1;
        }
  
        fclose($outputFile);
        $this->resultat = $a0;
        $this->pathDatas = $path;
      } catch (Exception $e) {
        echo $e->getMessage() . PHP_EOL;
        $this->pathDatas = "null";
      }
    }
  }
?>