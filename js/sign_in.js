var email;
var pwd;

function checkEmail(){
    email = document.getElementById('email').value;
    if(email==="" || email===undefined){
        document.getElementById("error_message").innerHTML="Please enter your email id.";
        console.log("no email");
        return false;
    }
    else{
        document.getElementById("error_message").innerHTML="";
        return true;
    }
}

function checkPassword(){
    pwd = document.getElementById('password').value;
    if(pwd==="" || pwd===undefined){
        document.getElementById("error_message").innerHTML="Please enter your password.";
        console.log("no password");
        return false;
    }
    else{
        document.getElementById("error_message").innerHTML="";
        return true;
    }
}

function login(){
    if(checkEmail() && checkPassword()){
        firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function(error) {
          // Handle Errors here.
          document.getElementById("error_message").innerHTML="Wrong email or password.";
        });
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var email = user.email;
                window.location = 'index.html'; 
            }
        });
    }
};