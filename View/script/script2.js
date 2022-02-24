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
        adr.appendChild(ul);
        for(let i=0; i < Object.keys(obj).length;i++){
            var li = document.createElement('li');
            ul.appendChild(li);
            console.log(obj);
            li.innerHTML ="<div class='draggable ui-widget-content'" + obj[i].libelle + ' x : ' + obj[i].x + ' y : ' + obj[i].y + "</div>";
        }

    } )
    function renderProductList(element, index, arr) {
            var li = document.createElement('li');
            li.setAttribute('class','item');

            ul.appendChild(li);

            li.innerHTML=li.innerHTML + element;
        }
        

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