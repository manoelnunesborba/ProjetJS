const test=L.map('map');
let myPosition;
var route;
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      }
        else{alert("Geolocation non supportée par ce navigateur.");}
}
function showPosition(position) { 
    setMap(position.coords.latitude,position.coords.longitude,12);

	console.log(position)
	console.log("Plus ou Moins " + position.coords.accuracy + " mètres.");
  }
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

var e_msg;
window.onload = function(){
    getLocation();
    e_msg = document.getElementById("e_msg");
    e_msg.style.display="none";
}



//Faut jure mtn recuperer les valeurs et les envoyer

const form = document.getElementById("formId");
form.addEventListener('submit', function(e){
    e.preventDefault();
    var username1 = document.getElementById("username").value;
    var password1 = document.getElementById("password").value;
    var passwordR = document.getElementById("passwordR").value;
    if(password1==passwordR){
        const details ={
            
            nomuser:username1,
            mdp:password1
        }
        const test = JSON.stringify(details);
        console.log("they matcch");
        fetch('http://localhost:4433/controller/createaccount', {
            method:"POST", 
    
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
              },
            body:test
        }).then(function(response){
            
            return response.json();
            
        }).then(function(text){
            
            token = localStorage.setItem('token', JSON.stringify(text));
            window.location.href = "http://localhost:80/test/projetJS/index.php";
    
        }).catch(function(error){
            e_msg.style.display="";
        })
    
    }else{
        console.log("no match lol");
    }
});
    




/**** */