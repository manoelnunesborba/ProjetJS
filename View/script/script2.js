var map = L.map('map').setView([0,0],1);
			L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=PK3tYCS5Vq37x8aBBZNf', {
   				 attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
			}).addTo(map);

window.onload = function(){
    
    //var test = JSON.parse(localStorage.getItem('token'));
    //console.log(test);

    selector = document.getElementById('selector');
    const btn = document.getElementById('selector');
        
    document.getElementById("nom").innerHTML = '<h1> Bienvenu ' + localStorage.getItem('username') +'</h1>';
    const adr = document.getElementById("adr");
    var token = JSON.parse(localStorage.getItem("token"));
    var data = "Baerer " + token["accesToken"];
    var obj;
    fetch('http://localhost:4433/controller/getcoord', {    
        method:"GET", 
        headers: {
            'Authorization': data,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
    }).then(function(response){
        
        return response.json();
            
    }).then(function(text){
       return text;
        
    }).then(function(obj){
        const ul= document.createElement('ul')
        
        for(let i=0; i < Object.keys(obj).length;i++){
            const li = document.createElement('li');
            
            console.log(obj[i].y);
            li.innerHTML ="<div class='draggable ui-widget-content'> Libelle : " + obj[i].libelle + ' ( ' + obj[i].x + ' : ' + obj[i].y + " )</div>";
            ul.appendChild(li);
        }
        
        adr.appendChild(ul);
    } )
    function renderProductList(element, index, arr) {
            var li = document.createElement('li');
            li.setAttribute('class','item');

            ul.appendChild(li);

            li.innerHTML=li.innerHTML + element;
        }
        

}
document.getElementById('imgwrap').addEventListener("click", function() {
    const addInput = document.getElementById("addInput");
    addInput.innerHTML="<input id='textlbl' type='text' name='text' placeholder='libelle'><input id='textadr' type='text' name='text' placeholder='rue, ville' ><button id='btnadd'>Ajouter</button>"
    addInput.style.display="flex";
    addInput.style.alignItems="center";
    addInput.style.justifyContent="center";
    addInput.style.paddingBottom="10px";
  });
/*document.getElementById('btnadd').addEventListener("click", function() {

});*/

document.getElementById("addInput").addEventListener("click", function(e){
    const lib = document.getElementById("textlbl").value;
    if(e.target.id == 'btnadd'){
        const textadr = document.getElementById("textadr");
        $.ajax({
            url: 'http://api.positionstack.com/v1/forward',
            data: {
              access_key: '0cd9c1052d50e6fce491dc5e9991a170',
              query: textadr.value,
              limit: 1
            }
          }).done(function(data) {
              console.log(lib);
            save(lib,data.data[0].latitude,data.data[0].longitude)
          });
    }
    
})


function save(lib,x,y){
    var token = JSON.parse(localStorage.getItem("token"));

    var data = "Baerer " + token["accesToken"];
    const corps ={
        libelle:lib,
        x:x,
        y:y
    };
    console.log(JSON.stringify(corps))
    fetch('http://localhost:4433/controller/addCoord', {    
        method:"POST", 
        headers: {
            'Authorization': data,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(corps)
    }).catch(function(error){
        console.log(error)
    })
    
}

function prepare_div_event() { //fonction lancée après le chargt des objets-balises en m�moire
	$( function() {
		$( ".draggable" ).draggable();
		$( "#droppable" ).droppable({
			drop: function(event, ui){
				reponse(ui.draggable[0].id, tabObject[numQuestion].reponse, true);
			}
		});
	 } );
	
};