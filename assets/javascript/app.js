var config = {
    apiKey: "AIzaSyCZZqGEaka5ohH-Tr-dzDEMuZRd9ut1C8A",
    authDomain: "train-time-f94f6.firebaseapp.com",
    databaseURL: "https://train-time-f94f6.firebaseio.com",
    projectId: "train-time-f94f6",
    storageBucket: "",
    messagingSenderId: "861965481230",
    appId: "1:861965481230:web:01f5c25a1e48e645fad35f"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  var database = firebase.database();

    //   adding new train
    $("#add-train").on("click", function(event){

        event.preventDefault();

        name = $(".train-name").val().trim();
        destination = $(".train-destination").val().trim();
        time = $(".train-time").val().trim();
        freq = $(".train-freq").val().trim();

        var newTrain = {
            name: name,
            destination: destination,
            time: time,
            freq: freq
        }

        database.ref().push(newTrain);

        $(".train-name").val("");
        $(".train-destination").val("");
        $(".train-time").val("");
        $(".train-freq").val("");


    });