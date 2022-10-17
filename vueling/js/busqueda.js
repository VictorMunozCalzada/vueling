let errDestino=false;


document.getElementById("logout").addEventListener("click", ()=>{
    document.location.href= "index.html";
    //cerrar cookie
    document.cookie = `idSession=; max-age=0`
})


//creem  un objecte de tipus XMLHttpRequest
let xhr = new XMLHttpRequest();
     
// // //obrim connexió pel mètode POST cap a la URL/carpeta relativa 
xhr.open("POST","./php/busqueda.php");

xhr.send(JSON.stringify(""));

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
if(destino==origen){
    const option= document.createElement("p");
    const node= document.createTextNode("Destino no puede ser igual a origen")
    option.appendChild(node);
    const element=document.getElementById("busqueda_validacion") 
    element.appendChild(option) 
//comprobar vuelos fecha
}else{
    busqueda_correcta();
}

})

//BUSQUEDA VUELOS///////////////////////////////////////////////////////////////

function busqueda_correcta(){
    document.getElementById("busqueda").style.display="none";
    document.getElementById("seleccion").style.display="block";

let xhr = new XMLHttpRequest();
    
xhr.open("POST","./php/dias.php");

xhr.send(JSON.stringify(""));

xhr.onload = function(){
    let respostaServidor = JSON.parse(xhr.response);

        const origen=document.getElementById("origen").value;
        const destino=document.getElementById("destino").value;
        const ida=document.getElementById("ida").value;
        const vuelta=document.getElementById("vuelta").value;

        const idaDate=new Date(ida);
        const idaDia= idaDate.getDay();
        const vueltaDate=new Date(vuelta);
        const idaVuelta= vueltaDate.getDay();

        const horas_ida=respostaServidor[idaDia-1].split(',');
        const horas_vuelta=respostaServidor[idaVuelta-1].split(',');

        for (let i = 0; i < horas_ida.length; i++) {
            const option= document.createElement("option");
            const node= document.createTextNode(horas_ida[i])
            option.appendChild(node);
            const element=document.getElementById("vuelo_ida") 
            element.appendChild(option) 
        }

        for (let i = 0; i < horas_vuelta.length; i++) {
            const option= document.createElement("option");
            const node= document.createTextNode(horas_vuelta[i])
            option.appendChild(node);
            const element=document.getElementById("vuelo_vuelta") 
            element.appendChild(option) 
        }


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
            console.log(respostaServidor)

            const duracion_precio=respostaServidor.split(',');
            console.log(duracion_precio)

            const option= document.createElement("p");
            const node= document.createTextNode(duracion_precio[1])
            option.appendChild(node);
            const element=document.getElementById("precio_ida") 
            element.appendChild(option) 

            const option2= document.createElement("p");
            const node2= document.createTextNode((duracion_precio[1]))
            option2.appendChild(node2)
            const element2=document.getElementById("precio_vuelta") 
            element2.appendChild(option2)
            
        //     for (let i = 0; i < horas_ida.length; i++) {
        //     const hora_llegada=(horas_ida[i]+duracion_precio[0])

        //     const option3= document.createElement("option");
        //     const node3= document.createTextNode(hora_llegada)
        //     option3.appendChild(node3);
        //     const element3=document.getElementById("hora_llegada") 
        //     element3.appendChild(option3) 
        //  }
         
        return respostaServidorr;
     }
    
 }}

 document.getElementById("btn_seleccion").addEventListener("click", ()=>{
    document.getElementById("seleccion").style.display="none"
    document.getElementById("pasajero").style.display="block"
})

