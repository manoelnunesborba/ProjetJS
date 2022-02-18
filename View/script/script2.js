var map = L.map('map').setView([0,0],1);
			L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=PK3tYCS5Vq37x8aBBZNf', {
   				 attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
			}).addTo(map);

window.onload = function(){
    //var test = JSON.parse(localStorage.getItem('token'));
    //console.log(test);

    selector = document.getElementById('selector');
    const btn = document.getElementById('selector');
    btn.addEventListener('click', function(){
        var token = JSON.parse(localStorage.getItem("token"));
        var data = "Baerer " + token["accesToken"];
        console.log(data);
        fetch('http://localhost:4444/controller/getcoord', {    
            method:"GET", 
            headers: {
                'Authorization': data,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
              },
            body:test
        }).then(function(response){
            
            return response.json();
                
        }).then(function(text){
            console.log("ici")
            console.log(text)
    
        }).catch(function(error){
        })
    })
}



const test = {
    nom:"Premiere var", 
    X:"1923812", 
    Y:"0128405"
}