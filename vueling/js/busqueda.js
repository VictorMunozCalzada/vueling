/**
   * @file Gestiona todo el proceso de compra del vuelo
   * @author Victor Muñoz
*/

let errDestino=false;
let checkNamePasajero=true, checkApellidos=true, checkTelefono=true, checkEmail=true, box=true;

//LOGOUT///////////////////////////////////////////////////////////////

document.getElementById("logout").addEventListener("click", ()=>{
    document.location.href= "index.html";
    //cerrar cookie
    document.cookie = "idSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
})

//BUSQUEDA VUELOS///////////////////////////////////////////////////////////////

//creem  un objecte de tipus XMLHttpRequest
let xhr = new XMLHttpRequest();
     
// // //obrim connexió pel mètode POST cap a la URL/carpeta relativa 
xhr.open("POST","./php/busqueda.php");

xhr.send(JSON.stringify(""));

//muestra las ciudades de origen y destino almacenadas en busqueda.php 
xhr.onload = function(){
    let respostaServidor = JSON.parse(xhr.response);

    for (let i = 0; i < respostaServidor.length; i++) {
        const option= document.createElement("option");
        const node= document.createTextNode(respostaServidor[i])
        option.appendChild(node);
        const element=document.getElementById("origen")
        element.appendChild(option)  

    }
    for (let i = 0; i < respostaServidor.length; i++) {
        const option= document.createElement("option");
        const node= document.createTextNode(respostaServidor[i])
        option.appendChild(node);
        const element2=document.getElementById("destino") 
        element2.appendChild(option) 
    }
}


document.getElementById("btn_busqueda").addEventListener("click", ()=>{
const origen=document.getElementById("origen").value;
const destino=document.getElementById("destino").value;
const ida=document.getElementById("ida").value;
const vuelta=document.getElementById("vuelta").value;
const idaDate=new Date(ida);
const vueltaDate=new Date(vuelta);
const idaDay= idaDate.getTime();
const vueltaDay= vueltaDate.getTime();
const numeroPasajeros=document.getElementById("numeroPasajeros").value;
let check=true;

//valida si destino es igual a origen
if(destino==origen){
    const option= document.createElement("p");
    const node= document.createTextNode("Destino no puede ser igual a origen")
    option.appendChild(node);
    const element=document.getElementById("busqueda_validacion") 
    element.appendChild(option) 
    check=false;
}

//valida si vuelta es antes de ida
if(idaDay>vueltaDay){
    const option= document.createElement("p");
    const node= document.createTextNode("Fecha de vuelta no puede ser antes de ida")
    option.appendChild(node);
    const element=document.getElementById("busqueda_validacion") 
    element.appendChild(option)
    check=false;
}

//valida si ida y/o vuelta estan vacios
if((ida== null || ida.length == 0 || /^\s+$/.test(ida))||(vuelta== null || vuelta.length == 0 || /^\s+$/.test(vuelta))){
    const option= document.createElement("p");
    const node= document.createTextNode("Selecciona fecha para volar")
    option.appendChild(node);
    const element=document.getElementById("busqueda_validacion") 
    element.appendChild(option)
    check=false;
}

//entra si todos los campos son correctos
if(check){
    document.cookie = `origen=${origen}`
    document.cookie = `destino=${destino}`
    document.cookie = `ida=${ida}`
    document.cookie = `vuelta=${vuelta}`
    document.cookie = `pasajeros=${numeroPasajeros}`
    busqueda_correcta();
}
})

//SELECCION VUELOS///////////////////////////////////////////////////////////////

//recupera y muestra la infomación de las horas de los vuelos
function busqueda_correcta(){
    document.getElementById("busqueda").style.display="none";
    document.getElementById("seleccion").style.display="block";

let xhr = new XMLHttpRequest();
    
xhr.open("POST","./php/dias.php");

xhr.send(JSON.stringify(""));

xhr.onload = function(){
    let respostaServidor = JSON.parse(xhr.response);

        origen=document.getElementById("origen").value;
        destino=document.getElementById("destino").value;
        ida=document.getElementById("ida").value;
        vuelta=document.getElementById("vuelta").value;


        idaDate=new Date(ida);
        idaDia= idaDate.getDay();
        vueltaDate=new Date(vuelta);
        idaVuelta= vueltaDate.getDay();

        let horas_ida
        let horas_vuelta

        //evitar que haya error si un vuelo es domingo
        if((idaDia==0)&&(idaVuelta!=0)){
            horas_ida=respostaServidor[idaDia].split(','); 
            horas_vuelta=respostaServidor[idaVuelta-1].split(',');   
        }
        if((idaVuelta==0)&&(idaDia!=0)){
            horas_ida=respostaServidor[idaDia-1].split(','); 
            horas_vuelta=respostaServidor[idaVuelta].split(',');  
        }
        if((idaVuelta==0)&&(idaDia==0)){
            horas_ida=respostaServidor[idaDia].split(','); 
            horas_vuelta=respostaServidor[idaVuelta].split(','); 
        }
        if((idaVuelta!=0)&&(idaDia!=0)){
            horas_ida=respostaServidor[idaDia-1].split(',');
            horas_vuelta=respostaServidor[idaVuelta-1].split(',');
        }

//muestra los vuelos de ida
        for (let i = 0; i < horas_ida.length; i++) {
            const option= document.createElement("option");
            const node= document.createTextNode(horas_ida[i])
            option.appendChild(node);
            const element=document.getElementById("vuelo_ida") 
            element.appendChild(option) 
        }
//muestra los vuelos de vuelta
        for (let i = 0; i < horas_vuelta.length; i++) {
            const option= document.createElement("option");
            const node= document.createTextNode(horas_vuelta[i])
            option.appendChild(node);
            const element=document.getElementById("vuelo_vuelta") 
            element.appendChild(option) 
        }

//selecciona el origen y destino para obtener el precio
        if((origen=="Madrid" && destino=="Barcelona")||(origen=="Barcelona" && destino=="Madrid")){
            const posicion=0;
            ajax_busqueda_vuelos(posicion)
        }
        if((origen=="Barcelona" && destino=="Malaga")||(origen=="Malaga" && destino=="Barcelona")){
            const posicion=1;
            ajax_busqueda_vuelos(posicion)
        }
        if((origen=="Barcelona" && destino=="Valencia")||(origen=="Valencia" && destino=="Barcelona")){
            const posicion=2;
            ajax_busqueda_vuelos(posicion)
        }
        if((origen=="Madrid" && destino=="Malaga")||(origen=="Malaga" && destino=="Madrid")){
            const posicion=3;
            ajax_busqueda_vuelos(posicion)
        }
        if((origen=="Madrid" && destino=="Valencia")||(origen=="Valencia" && destino=="Madrid")){
            const posicion=3;
            ajax_busqueda_vuelos(posicion)
        }
        if((origen=="Malaga" && destino=="Valencia")||(origen=="Malaga" && destino=="Valencia")){
            const posicion=4;
            ajax_busqueda_vuelos(posicion)
        }
        
    }
}

//recupera y muestra la infomación del precio de los vuelos
 function ajax_busqueda_vuelos(posicion){

    //creem  un objecte de tipus XMLHttpRequest
    let xhr = new XMLHttpRequest();
    let respostaServidorr="";
     
     //obrim connexió pel mètode POST cap a la URL/carpeta relativa 
     xhr.open("POST","./php/precio.php");
         
     //enviem l'objecte info cap al servidor (abans però el passem a format JSON mitjançant la funció stringify)
     xhr.send(JSON.stringify(posicion));
     
     //quan la sol·licitud està completa, el que fem és:
     xhr.onload = function(){
        
         if (xhr.status != 200) { // analitza l'estado HTTP de la resposta
             
             alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado

            respostaServidorr="";
         } else { // mostra el resultat
             
             //alert(`Fet, hem obtingut ${xhr.response.length} bytes`); // Resposta del servidor
            const respostaServidor = JSON.parse(xhr.response); //agafem la resposta xhr.response i la passem a format objecte de JavaScript

            const duracion_precio=respostaServidor.split(',');

            const para= document.createElement("p");
            const node= document.createTextNode(`${duracion_precio[1]} €`)
            para.appendChild(node);
            const element=document.getElementById("precio") 
            element.appendChild(para) 

            const pasajeros =getCookie("pasajeros")
            const precioInt=parseInt(duracion_precio[1])
            let precioTotal=precioInt*2;
            precioTotal=precioTotal*pasajeros;
            const para2= document.createElement("p");
            const node2= document.createTextNode(`${precioTotal} €`)
            para2.appendChild(node2);
            const element2=document.getElementById("precio_total") 
            element2.appendChild(para2) 

            document.cookie = `precio=${precioTotal}`
       
        return respostaServidorr;
     }
    
 }}

//DATOS PASAJEROS///////////////////////////////////////////////////

 document.getElementById("btn_seleccion").addEventListener("click", ()=>{

    const vuelo_ida=document.getElementById("vuelo_ida").value
    const vuelo_vuelta=document.getElementById("vuelo_vuelta").value
    document.cookie = `vuelo_ida=${vuelo_ida}`
    document.cookie = `vuelo_vuelta=${vuelo_vuelta}`

    document.getElementById("seleccion").style.display="none"
    document.getElementById("pasajero").style.display="block"


document.getElementById("btn_pasajero").disabled=true;

let numeroPasajero=checkCookie()

//Crea dinamicamente los campos a rellenar segun el numero de pasajeros
for (let i= 0; i < numeroPasajero; i++) {

const para= document.createElement("p");
const nodePasajero= document.createTextNode(`Pasajero ${i+1}`)
para.appendChild(nodePasajero);
const elementPasajero=document.getElementById(`div_pasajero ${i}`) 
elementPasajero.appendChild(para) 

const labelNombre= document.createElement("label");
const nodeNombre= document.createTextNode("Nombre")
labelNombre.appendChild(nodeNombre);
const elementNombre=document.getElementById(`div_pasajero ${i}`) 
elementNombre.appendChild(labelNombre) 

const inputNombre= document.createElement("input");
inputNombre.id=`pasajero_name${i}`
inputNombre.placeholder=`Introduce nombre pasajero ${i+1}`;
const elementInputNombre=document.getElementById(`div_pasajero ${i}`) 
elementInputNombre.appendChild(inputNombre)

const labelApellidos= document.createElement("label");
const nodeApellidos= document.createTextNode("Apellidos")
labelApellidos.appendChild(nodeApellidos);
const elementApellidos=document.getElementById(`div_pasajero ${i}`) 
elementApellidos.appendChild(labelApellidos) 

const inputApellidos= document.createElement("input");
inputApellidos.id=`pasajero_apellidos${i}`
const elementInputApellidos=document.getElementById(`div_pasajero ${i}`) 
elementInputApellidos.appendChild(inputApellidos)

const labelTelefono= document.createElement("label");
const nodeTelefono= document.createTextNode("Telefono")
labelTelefono.appendChild(nodeTelefono);
const elementTelefono=document.getElementById(`div_pasajero ${i}`) 
elementTelefono.appendChild(labelTelefono) 

const inputTelefono= document.createElement("input");
inputTelefono.id=`pasajero_telefono${i}`
const elementInputTelefono=document.getElementById(`div_pasajero ${i}`) 
elementInputTelefono.appendChild(inputTelefono)

const labelEmail= document.createElement("label");
const nodeEmail= document.createTextNode("Email")
labelEmail.appendChild(nodeEmail);
const elementEmail=document.getElementById(`div_pasajero ${i}`) 
elementEmail.appendChild(labelEmail) 

const inputEmail= document.createElement("input");
inputEmail.id=`pasajero_email${i}`
const elementInputEmail=document.getElementById(`div_pasajero ${i}`) 
elementInputEmail.appendChild(inputEmail)

//valida que el nombre del pasajero es correcto
document.getElementById(`pasajero_name${i}`).addEventListener("blur", ()=>{
    const nombre=document.getElementById(`pasajero_name${i}`).value;
    //validar campo no esta vacío
    if(nombre== null || nombre.length == 0 || /^\s+$/.test(nombre)) {
        document.getElementById("errorPasajeroName").innerHTML="Campo obligatorio";    
    }else{
        let errorNamePasajero=validarNombreApellido(nombre);
        if(!errorNamePasajero){//correcto, no hay errores
            document.getElementById("errorPasajeroName").innerHTML="";
            checkNamePasajero=false;
            
        }else{//si hay problemas con el nombre introducido
            document.getElementById("errorPasajeroName").innerHTML=`Vuelve a introducir el nombre de pasajero ${i+1}. Sólo se permiten letras`;
            checkNamePasajero=true;
        }
    }
    comprobarBotonPasajero();

});

//valida que los apellidos del pasajero es correcto
document.getElementById(`pasajero_apellidos${i}`).addEventListener("blur", ()=>{
    const apellidos=document.getElementById(`pasajero_apellidos${i}`).value;
    //validar campo no esta vacío
    if(apellidos== null || apellidos.length == 0 || /^\s+$/.test(apellidos)) {
        document.getElementById("errorPasajeroApellidos").innerHTML="Campo obligatorio";    
    }else{
        let errorApellidos=validarNombreApellido(apellidos);
        if(!errorApellidos){//correcto, no hay errores
            document.getElementById("errorPasajeroApellidos").innerHTML="";
            checkApellidos=false;
            
        }else{//si hay problemas con el nombre introducido
            document.getElementById("errorPasajeroApellidos").innerHTML=`Vuelve a introducir el apellido de pasajero ${i+1}. Sólo se permiten letras`;
            checkApellidos=true;
        }
    }
    comprobarBotonPasajero();

});

//valida que el numero de telefono es correcto
document.getElementById(`pasajero_telefono${i}`).addEventListener("blur", ()=>{
    const telefono=document.getElementById(`pasajero_telefono${i}`).value;
    //validar campo no esta vacío
    if(telefono== null || telefono.length == 0 || /^\s+$/.test(telefono)) {
        document.getElementById("errorPasajeroTelefono").innerHTML="Campo obligatorio";    
    }else{
        let errorTelefono=validarTelefono(telefono);
        if(!errorTelefono){//correcto, no hay errores
            document.getElementById("errorPasajeroTelefono").innerHTML="";
            checkTelefono=false;
            
        }else{//si hay problemas con el nombre introducido
            document.getElementById("errorPasajeroTelefono").innerHTML=`Numero de telefono de pasajero ${i+1} incorrecto`;
            checkTelefono=true;
        }
    }
    comprobarBotonPasajero();
});

//valida que el email es correcto
document.getElementById(`pasajero_email${i}`).addEventListener("blur", ()=>{
    const telefono=document.getElementById(`pasajero_email${i}`).value;
    //validar campo no esta vacío
    if(telefono== null || telefono.length == 0 || /^\s+$/.test(telefono)) {
        document.getElementById("errorPasajeroEmail").innerHTML="Campo obligatorio";    
    }else{
        let errorEmail=validarEmail(telefono);
        if(!errorEmail){//correcto, no hay errores
            document.getElementById("errorPasajeroEmail").innerHTML="";
            checkEmail=false;
            
        }else{//si hay problemas con el nombre introducido
            document.getElementById("errorPasajeroEmail").innerHTML=`Formato email de pasajero ${i+1} incorrecto`;
            checkEmail=true;
        }
    }
    comprobarBotonPasajero();
});

//valida si el usuario ha aceptado las politicas de privacidad
document.getElementById("cbox1").addEventListener("change", ()=>{
  if(document.getElementById('cbox1').checked)
    {
        box=false
        
    }else{
        box=true
        
    }
    comprobarBotonPasajero();
});
  } 
   
})

//valida si todos los campos son correctos, y si lo son habilita el botón para continuar
function comprobarBotonPasajero(){

    if(!checkNamePasajero && !checkApellidos && !checkTelefono && !checkEmail && !box){
        document.getElementById("btn_pasajero").disabled=false;
     }else{
        document.getElementById("btn_pasajero").disabled=true;
     }
}

//valida que  incluye solo letras
function validarNombreApellido(value){

    const pattern=/^[A-ZÑa-zñáéíóúàèòÁÉÍÓÚÀÈÒ'çÇ ]+$/;
    if(pattern.test(value)){
        return false//correcto, no hay errores
    }{
        return true;//hay errores!!!
    }   
}

//valida que incluye 9 numeros
function validarTelefono(value){

    const pattern=/^[0-9]{9}$/;
    if(pattern.test(value)){
        return false//correcto, no hay errores
    }{
        return true;//hay errores!!!
    }   
}

//valida que email es correcto
function validarEmail(value){
    const pattern=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    if(pattern.test(value)){
        return false//correcto, no hay errores
    }{
        return true;//hay errores!!!
    }   
}

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

    function checkCookie() {
    return getCookie("pasajeros");
  }

document.getElementById("btn_pasajero").addEventListener("click", ()=>{
    document.getElementById("pasajero").style.display="none"
    document.getElementById("extras").style.display="block"

})

//EXTRAS///////////////////////////////////////////////////////////////

document.getElementById("btn_extras").addEventListener("click", ()=>{
    let equipaje= document.getElementById("equipaje_mano").value;
    equipaje=parseInt(equipaje)
    let facturacion=document.getElementById("facturacion").value;
    facturacion=parseInt(facturacion)
    let spacePlus
    if(document.getElementById('spacePlus').checked)
    {
        spacePlus=20;
    }else{
        spacePlus=0;
    }


    document.getElementById("extras").style.display="none"

origen=getCookie("origen")
destino=getCookie("destino")
ida=getCookie("ida")
vuelta=getCookie("vuelta")
vuelo_ida=getCookie("vuelo_ida")
vuelo_vuelta=getCookie("vuelo_vuelta")
pasajeros=getCookie("pasajeros")
precio=getCookie("precio")
precio=parseInt(precio)

let total= precio+equipaje+facturacion+spacePlus;


var myWindow = window.open("", "Finalizar compra", "width=600,height=800");
myWindow.document.write("<h1>Comprueba tus datos:</h1>");
myWindow.document.write(`<p>Origen: ${origen}</p>`);
myWindow.document.write(`<p>Destino: ${destino}</p>`);
myWindow.document.write(`<p>Ida: ${ida}</p>`);
myWindow.document.write(`<p>Vuelta: ${vuelta}</p>`);
myWindow.document.write(`<p>Vuelo ida: ${vuelo_ida}</p>`);
myWindow.document.write(`<p>Vuelo vuelta: ${vuelo_vuelta}</p>`);
myWindow.document.write(`<p>Pasajeros: ${pasajeros}</p>`);
myWindow.document.write(`<p>Precio total: ${total}</p>`);
})
