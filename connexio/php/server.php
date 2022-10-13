<?php
//BBDD
    //vector asociativo
    $usuarios=["vic"=>"vic","maria"=>"m"];

    //vectores indexados
    $users=["vic","maria"];
    $pass=["vic","abcde"];


    $info = file_get_contents('php://input');//recojo de JS

    $info = json_decode($info);//<-- paso de JSON a variable PHP
    
    $name = $info->{'name'};//recoges ese valor
    //echo $name;
	$password = $info->{'password'};//recoges ese valor
    //echo $password;
    
    $response="Credencials incorrectes";
    //version fija
    /*if($name=="daw2" && $password=="123456"){
        $response="ok";
    }
    */
    

    //version con 2 vectores
    /*for ($i=0;$i<count($users);$i++){
        if($name==$users[$i] && $password==$pass[$i]){
            $response="ok";
        }
    }*/

    //version con array asociativo
    if(array_key_exists($name,$usuarios)){
        if($password == $usuarios[$name]){
            $response="ok";
        }
    }


   //si necessitem respondre a JavaScript, llavors puc crear una variable de PHP
	//$ar = ["daw2", "daw"];//<-- això seria una variable array de php
	
	//enviem aquest vector $ar amb l'echo, però abans passem l'array de format 
	//variable PHP a format JSON (mitjançant la funció json_encode)
    
    echo json_encode($response);
?>