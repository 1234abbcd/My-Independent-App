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
room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot){ document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey!= "purpose") {
        firebase_bookname_id = childKey;
        bookname_data = childData;
        //Start code
        console.log(firebase_bookname_id);
        console.log(bookname_data);
        name = bookname_data['name'];
        message = bookname_data['message'];
        like = bookname_data['like'];
        name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
        bookname_with_tag = "<h4 class='bookname_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebase_bookname_id +" value="+ like +" onclick='update_like(this.id)'";
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like : "+ like +"</span></button><hr>";
        row = name_with_tag + bookname_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML += row;
        //End code
    } });  }); }
    getData();

    function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
    }

    function back() {
        window.location = "book_room.html";
    }
  
    function update()
    {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
        message:msg,
        name:room_name,
        like:0
      });
      document.getElementById("msg").value = "";
    }

    function update_like(bookname_id)
    {
      console.log(bookname_id);
      button_id = bookname_id;
      likes = document.getElementById(button_id).value;
      updated_like = Number(likes) + 1;
      firebase.database().ref(room_name).child(bookname_id).update({
        like:updated_like
      });
    }