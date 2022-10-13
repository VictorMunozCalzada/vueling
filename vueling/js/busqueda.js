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


        if((origen=="Madrid" && destino=="Barcelona")||(origen=="Madrid" && destino=="Barcelona")){
            const option= document.createElement("p");
            const node= document.createTextNode("55€")
            option.appendChild(node);
            const element=document.getElementById("precio_ida") 
            //const element2=document.getElementById("precio_vuelta") 
            element.appendChild(option) 
            //element2.appendChild(option) 
        }
        if((origen=="Madrid" && destino=="Barcelona")||(origen=="Madrid" && destino=="Barcelona")){
            const option= document.createElement("p");
            const node= document.createTextNode("55€")
            option.appendChild(node);
            const element=document.getElementById("precio_vuelta") 
            element.appendChild(option) 
        }
    }
})