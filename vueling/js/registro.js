let checkName=true, checkUser=true, checkPass1=true, checkPass2=true;

document.getElementById("registro").style.display="none";

document.getElementById("btn_registro").disabled=true;

document.getElementById("registrarse").addEventListener("click", ()=>{
    document.getElementById("registro").style.display="block"
})

document.getElementById("btn_registro").addEventListener("click", ajax_registro);

//valida que el nombre es correcto
document.getElementById("registro_name").addEventListener("blur", ()=>{
    const name=document.getElementById("registro_name").value;
    //validar campo no esta vacío
    if(name== null || name.length == 0 || /^\s+$/.test(name)) {
        document.getElementById("errorN").innerHTML="Campo obligatorio";    
    }else{
     let errorNombreRegistro=validarNombreUsuario(name);
        if(!errorNombreRegistro){//correcto, no hay errores
            document.getElementById("errorN").innerHTML="";
            checkName=false;
            
        }else{//si hay problemas con el nombre introducido
            document.getElementById("errorN").innerHTML="Vuelve a introducir tu nombre. Sólo se permiten letras";
            checkName=true;
        }
    }
    comprobarBotonRegistro();

});

//valida que el nombre de usuario es correcto
document.getElementById("registro_user").addEventListener("blur", ()=>{
    const username=document.getElementById("registro_user").value;
    let errorUsernameRegistro=validarNombreUsuario(username);
    //validar campo no esta vacío
    if(username== null || username.length == 0 || /^\s+$/.test(username)) {
        document.getElementById("errorU").innerHTML="Campo obligatorio";        
    }else{
    if(!errorUsernameRegistro){//correcto, no hay errores
        document.getElementById("errorU").innerHTML="";
        checkUser=false;

    }else{//si hay problemas con el nombre introducido
        document.getElementById("errorU").innerHTML="Vuelve a introducir tu usuario. Sólo se permiten letras";
        checkUser=true;
    }}
    comprobarBotonRegistro();
    
});

//valida que la contraseña es correcta
document.getElementById("pass1").addEventListener("blur", ()=>{
    const pass1=document.getElementById("pass1").value;
    let errPass1Registro=validarPassword(pass1);
    //validar campo no esta vacío
    if(pass1== null || pass1.length == 0 || /^\s+$/.test(pass1)) {
        document.getElementById("error_pass").innerHTML="Campo obligatorio";        
    }
    else{
        document.getElementById("error_pass").innerHTML="";  
        if(!errPass1Registro){//correcto, no hay errores
            document.getElementById("error_pass").innerHTML="";
            checkPass1=false;
    
        }else{//si hay problemas con el pass introducido
            document.getElementById("error_pass").innerHTML="Contraseña debe incluir numeros y letras, minimo 8 caracteres";
            checkPass1=true;
        }
    }
    comprobarBotonRegistro()  
});

//valida que las contraseñas coinciden
document.getElementById("pass2").addEventListener("blur", ()=>{
    const pass1=document.getElementById("pass1").value;
    const pass2=document.getElementById("pass2").value;
    //validar campo no esta vacío
    if(pass2== null || pass2.length == 0 || /^\s+$/.test(pass2)) {
        document.getElementById("error_pass2").innerHTML="Campo obligatorio";        
    }else{
        if(pass1!=pass2){
            document.getElementById("error_pass2").innerHTML="Constraseñas no coinciden"
            checkPass2=true;
        }
        else{
            document.getElementById("error_pass2").innerHTML=""
            checkPass2=false;
        
        }
    }
    comprobarBotonRegistro()  
});

//validar que solo incluye letras
function validarNombreUsuario(value){

    const pattern=/^[A-ZÑa-zñáéíóúàèòÁÉÍÓÚÀÈÒ'çÇ ]+$/;
    if(pattern.test(value)){
        return false//correcto, no hay errores
    }{
        return true;//hay errores!!!
    }   
}

//validar password con letras y numeros, minimo 8 caracteres.
function validarPassword(value){
    const pattern=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(pattern.test(value)){
        return false//correcto, no hay errores
    }{
        return true;//hay errores!!!
    }   
}

//valida que todos los campos son correctos y si lo son, activa el boton de registro
function comprobarBotonRegistro(){
    if(!checkName && !checkUser && !checkPass1 && !checkPass2){
        document.getElementById("btn_registro").disabled=false;
     }else{
        document.getElementById("btn_registro").disabled=true;
     }
 }


//añade el nuevo usuario
function ajax_registro(){
    
    const name=document.getElementById("registro_name").value;
    const username=document.getElementById("registro_user").value;
    const pass=document.getElementById("pass2").value;

    //creem un object JavaScript de nom info
    let user = { //objeto con dos propiedades
        reg_name: name,
        reg_username: username,
        reg_password: pass
    };
    
     //creem  un objecte de tipus XMLHttpRequest
     let xhr = new XMLHttpRequest();
      
      //obrim connexió pel mètode POST cap a la URL/carpeta relativa 
      xhr.open("POST","./php/server.php");
          
      //enviem l'objecte info cap al servidor (abans però el passem a format JSON mitjançant la funció stringify)
      xhr.send(JSON.stringify(user));
      
      //quan la sol·licitud està completa, el que fem és:
      xhr.onload = function(){
         
          if (xhr.status != 200) { // analitza l'estado HTTP de la resposta
              
              alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
          
          } else { // mostra el resultat
              
              //alert(`Fet, hem obtingut ${xhr.response.length} bytes`); // Resposta del servidor
              let respostaServidor = JSON.parse(xhr.response); //agafem la resposta xhr.response i la passem a format objecte de JavaScript
              document.getElementById("resposta_reg").innerHTML=respostaServidor;
          }
        } 
}
