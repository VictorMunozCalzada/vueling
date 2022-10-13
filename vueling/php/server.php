<?php
//BBDD
    //vector asociativo
    $password=["v"=>"v","maria"=>"ma", ""=>""];
    $roles=["v"=>"client","maria"=>"gestor"];
    $names=["v"=>"victor","maria"=>"maria"];


    $info = file_get_contents('php://input');

    $info = json_decode($info);

    $action = $info->{'action'};
    if($action=="login"){

        $name = $info->{'name'};

        $passwd = $info->{'password'};

        
        $response="Usuario y/o contraseña incorrectos";

        if(array_key_exists($name,$password)){
            if($passwd == $password[$name]){
                $response=$roles[$name];
            }
        }
    
        
    }else{
        $name = $info->{'name'};
        $username=$info->{'username'};
        $passwd = $info->{'pass'};

        $password[$name]=$passwd;
        $names[$name]=$username;
        $roles[$name]="cliente";

        $response="Usuario registrado correctamente";
    }

    echo json_encode($response);
    


    
