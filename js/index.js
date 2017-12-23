function checkUser(){
	firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //Do Nothing.
        }
        else{
    		window.location="sign_in.html"
    	}
    });
}
checkUser();

function logout(){
	firebase.auth().signOut().then(function() {
	  window.location="sign_in.html"
	}).catch(function(error) {
	  alert("Try again.");
	});
}