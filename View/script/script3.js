




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
        fetch('http://localhost:4444/controller/createaccount', {
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