$(document).ready(function(){


var config = {
    apiKey: "AIzaSyDYVe-UYRcWvBq-cEXZ4MhigpWsoOJw4Dc",
    authDomain: "train-scheduler-75bc3.firebaseapp.com",
    databaseURL: "https://train-scheduler-75bc3.firebaseio.com",
    projectId: "train-scheduler-75bc3",
    storageBucket: "",
    messagingSenderId: "15967289931",
    appId: "1:15967289931:web:70fd427fadc2cd5fa703ce"
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

    // display info sent to firebase

    database.ref().on("child_added", function (snapshot) {

        var trainFreq = snapshot.val().freq;
        console.log(snapshot.val().freq);

        var firstTrain = snapshot.val().time;
        var convertedFirstTrain = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(convertedFirstTrain);

        var currentTime = moment().format("HH:mm");
        console.log("current time: " + currentTime);

        var diffTime = moment().diff(moment(convertedFirstTrain), "minutes");
        console.log("difference in time: " + diffTime);

        var timeApart = diffTime % trainFreq;
        console.log(timeApart);

        var minutesAway = trainFreq - timeApart;

        var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
        console.log("Next train at: " + nextArrival);

        $(".current-time").html("<h2> Current time: " + currentTime + "</h2>");

        $("#current-schedule").append(`
        <tr>
            <td>${snapshot.val().name}</td>
            <td>${snapshot.val().destination}</td>
            <td>${snapshot.val().freq}</td>
            <td>${nextArrival}</td>
            <td>${minutesAway}</td>
        </tr>
        `)
    });

});