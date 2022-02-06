/*var map = L.map('map').setView([0,0],1);
			L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=PK3tYCS5Vq37x8aBBZNf', {
   				 attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
			}).addTo(map);*/

const form = document.getElementById("formId");
form.addEventListener('submit', function(e){
    e.preventDefault();
    const details ={
        username:"yacine",
        password:"4321"
    }

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }   
    formBody = formBody.join("&");
    console.log(formBody);
    fetch('http://localhost:4444/login', {
        method:"POST", 

        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            
          },
        body:formBody
    }).then(function(response){
        return response.text();
    }).then(function(text){
        console.log(text);
    }).catch(function(error){
        console.error(error);
    })
});

