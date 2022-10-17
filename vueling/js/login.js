setInterval(date, 1000)
function date(){
    var hoy=new Date;
    var fecha = hoy.toLocaleDateString();
    var hora = hoy.toLocaleTimeString();
    var fechaHora = fecha + ' ' + hora;
    document.getElementById("fecha").innerHTML=fechaHora;
}

date();

document.getElementById("registro").style.display="none";
document.getElementById("busqueda").style.display="none";
document.getElementById("logout").style.display="none";
document.getElementById("seleccion").style.display="none";
document.getElementById("pasajero").style.display="none"
document.getElementById("extras").style.display="none"




document.getElementById("login_btn").addEventListener("click", ajax);

 function ajax(){
     var username=document.getElementById("login_user").value;
     var passwd=document.getElementById("login_pass").value;
     let user = {
         name: username ,
         password: passwd,
         action: "login"
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

            if(respostaServidor=="Usuario y/o contraseña incorrectos"){
                document.getElementById("resposta_login").innerHTML=respostaServidor;
            }
            else{
                document.getElementById("login").style.display="none"
                document.getElementById("registro").style.display="none"
                document.getElementById("busqueda").style.display="block"
                document.getElementById("logout").style.display="block"
                //se crea cookie
                document.cookie=`idSession=${username}`
            }
         }
     }
 
 }

document.getElementById("btn_seleccion").addEventListener("click", ()=>{
    document.getElementById("seleccion").style.display="none"
    document.getElementById("pasajero").style.display="block"
})