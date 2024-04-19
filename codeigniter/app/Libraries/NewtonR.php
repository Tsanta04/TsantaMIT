<?php
namespace App\Libraries;

class NewtonR extends Traitement {
    public $iteration = 0;
    public $pointI;
    public $resultat;
  
    public function __construct(Fonction $fx, float $pointI) {
      $this->f = $fx;
      $this->pointI = $pointI;
    }
  
    public function setPointI(float $p) {
      $this->pointI = $p;
    }

    public function getFonction(): Fonction {
      return $this->f;
    }
  
    public function getIteration(): int {
      return $this->iteration;
    }
  
    public function getPointI(): float {
      return $this->pointI;
    }
  
    // No setter for pathImg as it's not defined in the original class
  
    public function getResultat(): float {
      return $this->resultat;
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
        $tol = 0.00001;
  
        do {
          if ($this->f->fp($r) === 0) {
            $this->iteration = -2;
            break;
          }
  
          $r = $x;
          $x =(float) ($r - ($this->f->f($r) / $this->f->fp($r)));
          fwrite($outputFile, $r . " " . $this->f->f($r) . PHP_EOL);
          $this->iteration++;
        } while ((float)(abs($this->f->f($r))) > $tol && $this->iteration < 10000);
  
        if ($this->iteration >= 10000) {
          $this->iteration = -1;
        }
  
        fclose($outputFile);
        $this->resultat = $r;
      } catch (Exception $e) {
        echo $e->getMessage() . PHP_EOL;
      }
    }
  }
?>