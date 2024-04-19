<?php

namespace App\Libraries;

class Fonction {
    public $dim;
    public $coefficient;
    public $coeffD;
    public $coeffDD;
    public $f;
    public $fp;
    public $F;
  
    public function __construct() {

    }
  
    public function setDim(int $x) {
      $this->dim = $x;
    }
  
    public function setCoeff(array $x) {
      $this->f = "";
      $this->coefficient = array_fill(0, $this->dim + 1, 0);
      for ($i = 0; $i <= $this->dim; $i++) {
        $this->coefficient[$i] = $x[$i];
        if ($i > 0) {
          $this->f .= "+";
        }
        $this->f .= "(" . $this->coefficient[$i];
        for ($j = 0; $j < ($this->dim - $i); $j++) {
          $this->f .= "*x";
        }
        $this->f .= ")";
      }
    }
  
    public function f(float $x) {
      $result = $this->coefficient[0];
      for ($i = 1; $i <= $this->dim; $i++) {
        $result = ($result * $x) + $this->coefficient[$i];
      }
      return $result;
    }
  
    public function fp(float $x) {
      $result = 0;
      $this->coeffD = array_fill(0, $this->dim, 0);
      for ($i = 0; $i <= $this->dim - 1; $i++) {
        $this->coeffD[$i] = (($this->dim - $i) * $this->coefficient[$i]);
      }
      $result = $this->coeffD[0];
      for ($i = 1; $i <= $this->dim - 1; $i++) {
        $result = ($result * $x) + $this->coeffD[$i];
      }
      return $result;
    }
  
    public function fpp(float $x) {
      $result = 0;
      $this->fp($x);
      $this->coeffDD = array_fill(0, ($this->dim) - 1, 0);
  
      for ($i = 0; $i <= $this->dim - 2; $i++) {
        $this->coeffDD[$i] = ((($this->dim) - $i) * $this->coeffD[$i]);
      }
      $result = $this->coeffDD[0];
      for ($i = 1; $i <= $this->dim - 2; $i++) {
        $result = ($result * $x) + $this->coeffDD[$i];
      }
      return $result;
    }
  }

?>