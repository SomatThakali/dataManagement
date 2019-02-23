function renderTable() {
  var tRow = $("<tr>");

  // Methods run on jQuery selectors return the selector they we run on

  var numberTd = $("<td>").text(number);
  var firstNameTd = $("<td>").text(firstName);
  var lastNameTd = $("<td>").text(lastName);
  var startDateTd = $("<td>").text(startDate);
  var salaryTd = $("<td>").text(salary);

  // Append the newly created table data to the table row
  tRow.append(numberTd, firstNameTd, lastNameTd, startDateTd, salaryTd);
  // Append the table row to the table body
  $("tbody").append(tRow);
}
