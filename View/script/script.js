/**/
var e_msg;
window.onload = function(){
    e_msg = document.getElementById("e_msg");
    e_msg.style.display="none";
}


var token;

const form = document.getElementById("formId");
form.addEventListener('submit', function(e){
    e.preventDefault();
    var username1 = document.getElementById("username").value;
    var password1 = document.getElementById("password").value;
    const details ={
        username:username1,
        password:password1
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
            'Access-Control-Allow-Origin': 'http://localhost:4444/login',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        body:formBody
    }).then(function(response){
        
        return response.json();
        
    }).then(function(text){
        
        token = localStorage.setItem('token', JSON.stringify(text));
        window.location.href = "http://localhost:80/test/projetJS/index.php?connected=true";

    }).catch(function(error){
        e_msg.style.display="";
    })
});

