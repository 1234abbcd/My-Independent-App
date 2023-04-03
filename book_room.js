const firebaseConfig = {
    apiKey: "AIzaSyCHxkYH69mvY0F1HAIa2JpPtTzAhNF71UQ",
    authDomain: "book-finder-54dfa.firebaseapp.com",
    databaseURL: "https://book-finder-54dfa-default-rtdb.firebaseio.com",
    projectId: "book-finder-54dfa",
    storageBucket: "book-finder-54dfa.appspot.com",
    messagingSenderId: "841078709419",
    appId: "1:841078709419:web:b7b73aac12312524a16bee"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome" + user_name;

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
    Room_names = childKey;
    //Start code
    console.log("Room_name - " + Room_names);
     row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
     document.getElementById("output").innerHTML += row;
     //End code
});});}
getData();

function addRoom()
{

    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose : "adding author"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "book_page.html";
}

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "book_page.html";
}

function logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}