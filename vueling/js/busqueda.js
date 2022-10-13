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

        const origen=document.getElementById("origen").value;
        const destino=document.getElementById("destino").value;
        


}