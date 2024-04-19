<?php
namespace App\Libraries;

class Dichotomie extends Traitement {
    public $iteration = 0;
    public $pointA;
    public $pointB;
    public $resultat;

    public function __construct() {
    }

    public function setPointA(float $i) {
      $this->pointA = $i;
    }
  
    public function setPointB(float $i) {
      $this->pointB = $i;
    }
  
    public function resolution(string $path) {
     $this->methode = "Dichotomie";
      try {
              $outputFile = fopen($path, "w");
              if (!$outputFile) {
                throw new Exception("Failed to open file: " . $path);
              }
        $r = 0;
        $a = $this->pointA;
        $b = $this->pointB;
        $tol = 0.005;
  
        while ((float)abs($this->f->f($r)) > $tol && $this->iteration < 10000) {
          $r = (float)(($a + $b) / 2);
          fwrite($outputFile, $r . " " . $this->f->f($r) . PHP_EOL);
  
          if ($this->f->f($a) * $this->f->f($r) * $this->f->f($b) === 0) {
            $r = ($this->f->f($this->pointA) === 0) ? $a : $b;
            break;
          } else if ($this->f->f($a) * $this->f->f($r) < 0) {
            $b = $r;
          } else if ($this->f->f($b) * $this->f->f($r) < 0) {
            $a = $r;
          } else {
            $this->iteration = -1;
            break;
          }
          $this->iteration++;
        }
  
        if ($this->iteration >= 10000) {
          $this->iteration = -1;
        } elseif ($b === $a) {
          $this->iteration = -2;
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