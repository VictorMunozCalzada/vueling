let errorApellidos=true;
let errorTelefono=true;
let errorEmail=true;

document.getElementById("btn_pasajero").addEventListener("click", ()=>{
    document.getElementById("pasajero").style.display="none"
    document.getElementById("extras").style.display="block"
})

document.getElementById("btn_pasajero").disabled=true;

document.getElementById("pasajero_apellidos").addEventListener("blur", ()=>{
    const apellidos=document.getElementById("pasajero_apellidos").value;
    //validar campo no esta vacío
    if(apellidos== null || apellidos.length == 0 || /^\s+$/.test(apellidos)) {
        document.getElementById("errorPasajeroApellidos").innerHTML="Campo obligatorio";    
    }else{
        errorApellidos=validarNombreApellido(apellidos);
        if(!errorApellidos){//correcto, no hay errores
            document.getElementById("errorPasajeroApellidos").innerHTML="";
            errName=false;
            
        }else{//si hay problemas con el nombre introducido
            document.getElementById("errorPasajeroApellidos").innerHTML="Vuelve a introducir tu apellido. Sólo se permiten letras";
            errName=true;
        }
    }
    comprobarBotonPasajero();

});

document.getElementById("pasajero_telefono").addEventListener("blur", ()=>{
    const telefono=document.getElementById("pasajero_telefono").value;
    //validar campo no esta vacío
    if(telefono== null || telefono.length == 0 || /^\s+$/.test(telefono)) {
        document.getElementById("errorPasajeroTelefono").innerHTML="Campo obligatorio";    
    }else{
        errorTelefono=validarTelefono(telefono);
        if(!errorTelefono){//correcto, no hay errores
            document.getElementById("errorPasajeroTelefono").innerHTML="";
            errorTelefono=false;
            
        }else{//si hay problemas con el nombre introducido
            document.getElementById("errorPasajeroTelefono").innerHTML="Numero de telefono incorrecto";
            errorTelefono=true;
        }
    }
    comprobarBotonPasajero();
});

document.getElementById("pasajero_email").addEventListener("blur", ()=>{
    const telefono=document.getElementById("pasajero_email").value;
    //validar campo no esta vacío
    if(telefono== null || telefono.length == 0 || /^\s+$/.test(telefono)) {
        document.getElementById("errorPasajeroEmail").innerHTML="Campo obligatorio";    
    }else{
        errorEmail=validarEmail(telefono);
        if(!errorEmail){//correcto, no hay errores
            document.getElementById("errorPasajeroEmail").innerHTML="";
            errorEmail=false;
            
        }else{//si hay problemas con el nombre introducido
            document.getElementById("errorPasajeroEmail").innerHTML="Formato email incorrecto";
            errorEmail=true;
        }
    }
    comprobarBotonPasajero();
});

function validarNombreApellido(value){

    const pattern=/^[A-ZÑa-zñáéíóúàèòÁÉÍÓÚÀÈÒ'çÇ ]+$/;
    if(pattern.test(value)){
        return false//correcto, no hay errores
    }{
        return true;//hay errores!!!
    }   
}

function validarTelefono(value){

    const pattern=/^(\\+34|0034|34)?[6789]\\d{8}$/;
    if(pattern.test(value)){
        return false//correcto, no hay errores
    }{
        return true;//hay errores!!!
    }   
}

function validarEmail(value){

    const pattern=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    if(pattern.test(value)){
        return false//correcto, no hay errores
    }{
        return true;//hay errores!!!
    }   
}