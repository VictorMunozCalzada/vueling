document.addEventListener("DOMContentLoaded", function() {
   
   document.getElementById("ajax").addEventListener("click", ajax);
});

function ajax(){
    var username=document.getElementById("user").value;
    var passwd=document.getElementById("passwd").value;
    //creem un object JavaScript de nom info
    let user = { //objeto con dos propiedades
        name: username ,
        password: passwd
    };
  //console.log(user);
  
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
            //console.log(respostaServidor);
            document.getElementById("resposta").innerHTML=respostaServidor;
        }
    }

}





