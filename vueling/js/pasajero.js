let errorApellidos=true;
let errorTelefono=true;
let errorEmail=true;

document.getElementById("btn_pasajero").addEventListener("click", ()=>{
    document.getElementById("pasajero").style.display="none"
    document.getElementById("extras").style.display="block"
})


//coger cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  console.log("cookie"+getCookie("pasajeros"))

  function checkCookie() {
    let numeroPasaj = getCookie("pasajeros");
  }


for (let i= 0; i< 5; i++) {
document.getElementById("btn_pasajero").disabled=true;

const label= document.createElement("label");
const node= document.createTextNode("nombre")
label.appendChild(node);
const element=document.getElementById("div_pasajero_name") 
element.appendChild(label) 

const input= document.createElement("input");
input.id=`pasajero_name${i}`
input.placeholder="tu nombre jijiuujeje";
const element_input=document.getElementById("div_pasajero_name") 
element_input.appendChild(input) 
console.log[i]


document.getElementById(`pasajero_apellidos${i}`).addEventListener("blur", ()=>{
    const apellidos=document.getElementById(`pasajero_apellidos${i}`).value;
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
  }







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