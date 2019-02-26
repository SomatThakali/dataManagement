// Initialize Firebase
var config = {
  apiKey: "AIzaSyDEkoRlOGC4mpHVyHu0j75nKIVs7C8ezkE",
  authDomain: "employee-data-management-f4e60.firebaseapp.com",
  databaseURL: "https://employee-data-management-f4e60.firebaseio.com",
  projectId: "employee-data-management-f4e60",
  storageBucket: "",
  messagingSenderId: "381444564591"
};
firebase.initializeApp(config);

var database = firebase.database();
// Initial Values
var firstName = "";
var lastName = "";
var startDate = "";
var salary = "";
var degination = "";
var email = "";

$("#employee-form").on("submit", function(event) {
  console.log("DEBUG", " submit button clicked");
  // Don't refresh the page!
  event.preventDefault();

  firstName = $("#firstName")
    .val()
    .trim();
  lastName = $("#lastName")
    .val()
    .trim();
  salary = $("#salary")
    .val()
    .trim();
  startDate = $("#startDate")
    .val()
    .trim();
  degination = $("#degination")
    .val()
    .trim();
  email = $("#email")
    .val()
    .trim();
  database.ref().push({
    firstName: firstName,
    lastName: lastName,
    salary: salary,
    startDate: startDate,
    degination: degination,
    email: email
  });

  makeFormEmpty();
});

// synchronyse
database.ref().on(
  "child_added",
  function(snapshot) {
    renderRow(snapshot);
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);

// helper functions
function makeFormEmpty() {
  $("#firstName").val("");
  $("#lastName").val("");
  //   $("#salary").val("");
  $("#startDate").val("");
  $("#degination").val("");
  //   $("#email").val("");
}

function renderRow(snap) {
  var child = snap.val();
  var childRef = snap.key;
  console.log("child ", child, childRef);

  var tRow = $("<tr>");
  tRow.attr("data-ref", childRef);

  // Methods run on jQuery selectors return the selector they we run on
  var firstNameTd = $("<td id='firstName-display'>").text(child.firstName);
  var lastNameTd = $("<td id='lastName-display'>").text(child.lastName);
  var startDateTd = $("<td id='startDate-display'>").text(child.startDate);
  var salaryTd = $("<td id='salary-display'>").text(child.salary);
  var deginationTd = $("<td id='degination-display'>").text(child.degination);
  var emailTd = $("<td id='email-display'>").text(child.email);
  var deleteTd = $("<td id='delete-display'>").text("x");

  console.log(deleteTd);
  // Append the newly created table data to the table row
  tRow.append(
    firstNameTd,
    lastNameTd,
    startDateTd,
    salaryTd,
    deginationTd,
    emailTd,
    deleteTd
  );
  // Append the table row to the table body
  $("tbody").append(tRow);
}

// filter function
$("#myInput").on("keyup", function() {
  var value = $(this)
    .val()
    .toUpperCase();
  $("#myTable tr").filter(function() {
    $(this).toggle(
      $(this)
        .text()
        .toUpperCase()
        .indexOf(value) > -1
    );
  });
});

$(document).on("click", "#delete-display", function(event) {
  // event.stopPropagation();
  console.log("deleting entry");

  var clickedRow = event.currentTarget.parentNode;
  console.log("CLICKED ROW", clickedRow);

  var childRef = clickedRow.dataset["ref"];
  console.log("CHILD_REF,", childRef);

  database
    .ref()
    .child("/" + childRef)
    .remove();

  location.reload();
});
