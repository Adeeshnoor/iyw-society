const todayDate = new Date();
const thisYear = todayDate.getFullYear();
//fill values in year drop down list
var index=0;

//function to validate
function validate(){
	var name = document.getElementById("name").value;
	var address = document.getElementById("address").value;
	var gender = document.getElementById("gender"); //.selectedIndex must not be 0
	var mobileNo = document.getElementById("mobile_no").value;
	var clearUptillYear = document.getElementById("year");
	var clearUptillMonth = document.getElementById("month");
	var file = document.getElementById("displayPicture").files[0];
	if(clearUptillYear.selectedIndex==1){
		clearUptillYear.value=thisYear-1;
	}
	else if(clearUptillYear.selectedIndex==2){
		clearUptillYear.value=thisYear;
	}
	else if(clearUptillYear.selectedIndex==3){
		clearUptillYear.value=thisYear+1;
	}
  var isError = 0;
  $(".error").addClass("no-error");
  if(name===""){
    $("#errorFirstName").removeClass("no-error");
    isError=1;
  }
  if(gender.selectedIndex==0){
    $("#errorGender").removeClass("no-error");
    isError=1;
  }
  if(mobileNo==="" || mobileNo.length <10){
    $("#errorMobileNo").removeClass("no-error");
    isError=1;
  }
  if(clearUptillYear.selectedIndex==0){
    $("#errorBatch").removeClass("no-error");
    isError=1;
  }
  if(clearUptillMonth.selectedIndex==0){
    $("#errorClass").removeClass("no-error");
    isError=1;
  }

  var formData={};
  if(!isError){
  	if(file===undefined){
		if(gender.value=="Male"){
			formData =  {
		              "name": name,
		              "address": address,
		              "gender": gender.value,
		              "mobile": mobileNo,
		              "clear_year":clearUptillYear.value,
		              "clear_month": clearUptillMonth.value,
		              "photo": "https://firebasestorage.googleapis.com/v0/b/iyw-donation-tracker.appspot.com/o/male.jpg?alt=media&token=27b55ffa-c886-4e6a-ae9e-c659d05b9cd0"
		            };
			firebase.database().ref('donors/').push(formData).then(function(){
				alert("Donor details saved.");
			});
		}
		else if (gender.value=="Female"){
			formData =  {
		              "name": name,
		              "address": address,
		              "gender": gender.value,
		              "mobile": mobileNo,
		              "clear_year":clearUptillYear.value,
		              "clear_month": clearUptillMonth.value,
		              "photo": "https://firebasestorage.googleapis.com/v0/b/iyw-donation-tracker.appspot.com/o/female.jpg?alt=media&token=ca75a8e9-cfb3-4a90-9c87-1988e815a0a7"
		            };
			firebase.database().ref('donors/').push(formData).then(function(){
				alert("Donor details saved.");
			});
		}
	}
	else{
		var storageRef = firebase.storage().ref();
		var uploadTask = storageRef.child(name+"_"+mobileNo+".jpg").put(file);
		uploadTask.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
	    	},  
	    	function(error) {
			  // Handle unsuccessful uploads
			}, function() {
			  // Handle successful uploads on complete
			  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
		  	var url = uploadTask.snapshot.downloadURL;
		  	formData =  {
		              "name": name,
		              "address": address,
		              "gender": gender.value,
		              "mobile": mobileNo,
		              "clear_year":clearUptillYear.value,
		              "clear_month": clearUptillMonth.value,
		              "photo": url,
		              "total_score" : 0
		            };
			firebase.database().ref('donors/').push(formData).then(function(){
				alert("Donor details saved.");
			});
		});
	}
  }
}

// function checkDuplicate(){
//   let rollNo = document.getElementById("roll_no").value;
//   rollNo=rollNo.toUpperCase();
//   if(rollNo!="")
// 	var userRef = firebase.database().ref('users/' + rollNo).once('value', function(snap){
// 	  if(snap.val()===null){
// 	    //
// 	  }
// 	  else
// 	    alert("This user has already been added. If you proceed, the score of the user will be set to zero.");
//     });
// }