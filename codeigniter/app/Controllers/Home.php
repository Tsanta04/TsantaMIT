<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        $data = [
            'url' => "http://www.code.com/index.php"
        ];
        return view('Home',$data);
    }
}
