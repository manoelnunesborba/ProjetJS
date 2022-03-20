const test=L.map('map');
let myPosition;
var route = [];
var nbroute=0;
function setMap(x,y,v){
    var map = test.setView([x,y+0.1],v);
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=PK3tYCS5Vq37x8aBBZNf', {
         attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);
    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      myPosition = L.marker([x, y], {icon:greenIcon}).addTo(map);
      myPosition.bindPopup("<b> C'est vous !</b>").openPopup();

}
var stytest=[];
var tabTest;
var dejaajoute = [];
window.onload = function(){
    const log = localStorage.getItem('token');
    if(JSON.parse(log).accesToken==""){
        window.location.href="./index.html"
    }
    getLocation();
    //var test = JSON.parse(localStorage.getItem('token'));
    //console.log(test);
    selector = document.getElementById('selector');
    const btn = document.getElementById('selector');
        
    document.getElementById("nom").innerHTML = '<h1> Bienvenue ' + localStorage.getItem('username') +'</h1>';
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
        tabTest=obj;

        for(let i=0; i < Object.keys(obj).length;i++){
            const li = document.createElement('li');
            
            li.innerHTML ="<div id='" +i + "' class='draggable'> Libelle : " + obj[i].libelle + ' ( ' + obj[i].x + ' : ' + obj[i].y + " )</div>";
            ul.appendChild(li);

        }
        
        adr.appendChild(ul);
        prepare_div_event();
        for(let i=0; i<tabTest.length; i++){
            stytest.push(document.getElementById(i).getBoundingClientRect())
        
        }
    }).catch(function(e){
        window.location.href=window.location.href="./index.html";
    })
function renderProductList(element, index, arr) {
            var li = document.createElement('li');
            li.setAttribute('class','item');

            ul.appendChild(li);

            li.innerHTML=li.innerHTML + element;
}

    
}
document.getElementById('imgwrap').addEventListener("click", function() {
    const addInput = document.getElementById("addInput");
    addInput.innerHTML="<input id='textlbl' type='text' name='text' placeholder='libelle'><br><input id='textadr' type='text' name='text' placeholder='rue, ville' ><br><div id='wrapbtn'><button id='btnadd'>Ajouter</button></div>"
    const stybtn = document.getElementById('wrapbtn').style
    stybtn.display="flex";
    stybtn.alignItems="center";
    stybtn.justifyContent="center";
    stybtn.paddingTop="5px";
    document.getElementById('btnadd').style.color="#088CEF";
    addInput.style.paddingBottom="10px";
  });
/*document.getElementById('btnadd').addEventListener("click", function() {

});*/

document.getElementById("addInput").addEventListener("click", function(e){
    const lib = document.getElementById("textlbl").value;
    const textadr = document.getElementById("textadr").value;
    if(e.target.id == 'btnadd' && lib!="" && textadr!=""){
        
        $.ajax({
            url: 'http://api.positionstack.com/v1/forward',
            data: {
              access_key: '0cd9c1052d50e6fce491dc5e9991a170',
              query: textadr,
              limit: 4
            },
            success: function(data){
                const tpm=JSON.parse(data);
                if(tpm.data!=undefined && tpm.data.length==1){
                    save(lib,tpm.data[0].latitude,tpm.data[0].longitude);
                    window.location.reload();
                }else{
                    alert('trop de résultat')
                }
            }
          })
    }else if(e.target.id == 'btnadd' && lib==""){
            alert("Entez un libellé")   
    }else if(e.target.id == 'btnadd' && textadr==""){
        alert("Entez une adresse")   
    }
    
})
function showPosition(position) { 
    setMap(position.coords.latitude,position.coords.longitude,12);

  }
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      }
        else{alert("Geolocation non supportée par ce navigateur.");}
        }

function save(lib,x,y){
    var token = JSON.parse(localStorage.getItem("token"));

    var data = "Baerer " + token["accesToken"];
    const corps ={
        libelle:lib,
        x:x,
        y:y
    };
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
/*
L.Routing.control().addTo(test);
*/ 
var markers=[];
function supMarker(id, indice){
    
    if(markers.length<2){
        test.removeLayer(markers[0])
        
        const ele = markers.pop();
        for(let j =0; j < nbroute; j++){
            route[j].spliceWaypoints(0,route[j].options.waypoints.length);

        }

        nbroute=0;
        console.log(route)

        
    }else{
        test.removeLayer(markers[id])
        const sup = markers.splice(id,1)
        for(let j =0; j < nbroute; j++){
            for(let i =0; i < route[j].options.waypoints.length; i++){
                if(sup[0].getLatLng().lat == route[j].options.waypoints[i].lat && sup[0].getLatLng().lng == route[j].options.waypoints[i].lng){
                    const aa = route[j].spliceWaypoints(0,route[j].options.waypoints.length);
                }
            }
        }
        nbroute--;
        
    }
    const sty = document.getElementById(indice);
    sty.style.visibility='visible'
    sty.style=stytest[indice];
    sty.style.position='relative';
    
    
    
}
function supRoute(i){
    test.removeLayer(route.options.waypoints[i])
}
function placedispo(cord){
    if(markers.length==0){
        return true;
    }
    for(let i=0; i<markers.length;i++){
        let test =markers[i].getLatLng();
        if(test.lat==cord.lat && test.lng == cord.lng){
            return false;
        }
    }
    return true;
}

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}
function prepare_div_event() { //fonction lancée après le chargt des objets-balises en m�moire
	$( function() {
        
		$( "[class='draggable']" ).draggable();
		$( "[id='map']" ).droppable({
			drop: function(event, ui){
                const tab = tabTest[ui.draggable[0].id];
                var myMarker = L.marker([tab.x, tab.y]);
                if(placedispo(myMarker.getLatLng())){
                    test.addLayer(myMarker)
                    //myMarker.addTo(test);
                    markers.push(myMarker)
                    myMarker.bindPopup("<b>" + tab.libelle +"</b><br /><button onClick='supMarker(" + markers.indexOf(myMarker) + "," +  ui.draggable[0].id +")'>Supprimer</button>.").openPopup();
                    document.getElementById(ui.draggable[0].id).style.visibility='hidden';
                    route[nbroute] = L.Routing.control({
                        waypoints: [
                          myPosition.getLatLng(),
                          myMarker.getLatLng()
                        ],createMarker: function(i, wp, nWps) {
                            return L.marker(wp.latLng)
                                .bindPopup("<b>" + tab.libelle +"</b><br /><button onClick='supMarker(" + markers.indexOf(myMarker) + "," +  ui.draggable[0].id +")'>Supprimer</button>.");
                        }
                      }).addTo(test);
                      const trucAEnlever = document.getElementsByClassName("leaflet-routing-container leaflet-bar leaflet-control");
                      for(let i = 0; i<trucAEnlever.length;i++){
                          trucAEnlever[i].style.visibility='hidden';;
                      }
                      nbroute++;

                }

			}
		});
        $( ".selector" ).droppable({
			drop: function(event, ui){
                console.log('selector');

			}
		});

	 } );
	
};

document.getElementById("reload").addEventListener('click', function(e){
    if(e.target.id=='re'){
        window.location.reload();
    }
    if(e.target.id=='lo'){
        localStorage.removeItem('token');
        window.location.href='./index.html'
    }
})