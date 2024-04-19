<?php
namespace App\Libraries;
class NewtonM extends Traitement {
    public $iteration = 0;
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
  
    public function resolution(string $path) {
      $this->methode = "Newton";
      try {
          $outputFile = fopen($path, "w");
          if (!$outputFile) {
            throw new Exception("Failed to open file: " . $path);
          }
        $r = 0;
        $x = $this->pointI;
        $tol = 0.005;
  
        do {
          if ($this->f->fpp($r) === 0) {
            $this->iteration = -2;
            break;
          }
  
          $r = $x;
          $x = (float)($r - ($this->f->fp($r) / $this->f->fpp($r)));
          fwrite($outputFile, $r . " " . $this->f->f($r) . PHP_EOL);
          $this->iteration++;
        } while ((float)abs($this->f->fp($r)) > $tol && $this->iteration < 10000);
 
        if ($this->iteration >= 10000) {
          $this->iteration = -1;
        }
  
        fclose($outputFile);
        $this->resultat = $r;
        $this->pathDatas = $path;
      } catch (Exception $e) {
        echo $e->getMessage() . PHP_EOL;
        $this->pathDatas = "null";
      }
    }
  }
?>