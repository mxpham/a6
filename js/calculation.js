//Date: November 15, 2018
//SID: 01617504
//Link: https://mxpham.github.io/a6/index.html
//91.61 GUI Programming I Assignment: Creating an Interactive Dynamic Table
//Mai Pham, UMass Lowell Computer Science, Mai_Pham@student.uml.edu
//Copyright (c) 2018 by Mai Pham. All rights reserved.

// used to get input values from user
function return_value(x){
  return document.getElementById(x).value;
}

//source for creating a dynamic table
//https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
function generate_table(h1, h2, v1, v2) {
  var w = return_value(h1);
  var x = return_value(h2);
  var y = return_value(v1);
  var z = return_value(v2);

  //if function returns true, there were no errors; create empty table
  if(err_handling(w, x, y, z)){

    var row_range = (z - y) + 2;
    var column_range = (x - w) + 2;
    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];

    // creates a <table> element and a <tbody> element
    var tbl = document.getElementById("myTable");
    var tblBody = document.createElement("tbody");

    // creating all cells
    for (var i = 0; i < row_range; i++) {
      // creates a table row
      var row = document.createElement("tr");

      for (var j = 0; j < column_range; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);

    var myTable = document.getElementById('myTable');

    var row_min = parseInt(w);
    var row_max = parseInt(x);
    var column_min = parseInt(y);
    var column_max = parseInt(z);

    //fills in the top row with horizontal parameters
    for(var j = 1, i = row_min; i <= row_max; i++){
      myTable.rows[0].cells[j].innerHTML = i;
      j++;
    }

    //fills in leftmost column with vertical parameters
    for(var j = 1, i = column_min; i <= column_max; i++){
      myTable.rows[j].cells[0].innerHTML = i;
      j++;
    }

    //fills in rest of table with products calculated from parameters
    //multiplies each column cell with one row for inner for loop
    //and increases by row in outer loop
    for(var i = 1; i < row_range; i++){
      for(var j = 1; j < column_range; j++){
        var temp1 = myTable.rows[0].cells[j].innerHTML;
        var temp2 = myTable.rows[i].cells[0].innerHTML;
        var product = temp1 * temp2;
        myTable.rows[i].cells[j].innerHTML = product;
      }
    }
  }
}

//function for handling input errors
function err_handling(w, x, y, z){
  var temp1 = parseInt(w);
  var temp2 = parseInt(x);
  var temp3 = parseInt(y);
  var temp4 = parseInt(z);
  //if there is an error, flag = 0 and the table will not be generated
  var flag = 1;

  //determines whether input is an integer or not and handles error accordingly
  //class names are set in order to style elements in css file
  if(!(Number.isInteger(temp1))){
    document.getElementById('h1_err').innerHTML = "Invalid entry for num_1";
    document.getElementById('h1_err').className = "message_err";
    document.getElementById('h1').className = "input_err";
    flag = 0;
  }
  if(!(Number.isInteger(temp2))){
    document.getElementById('h2_err').innerHTML = "Invalid entry for num_2";
    document.getElementById('h2_err').className = "message_err";
    document.getElementById('h2').className = "input_err";
    flag = 0;
  }
  if(!(Number.isInteger(temp3))){
    document.getElementById('v1_err').innerHTML = "Invalid entry for num_3";
    document.getElementById('v1_err').className = "message_err";
    document.getElementById('v1').className = "input_err";
    flag = 0;
  }
  if(!(Number.isInteger(temp4))){
    document.getElementById('v2_err').innerHTML = "Invalid entry for num_4";
    document.getElementById('v2_err').className = "message_err";
    document.getElementById('v2').className = "input_err";
    flag = 0;
  }

  //determines whether minimum input is greater than maximum input
  //and handles error accordingly
  if(temp1 > temp2){
    document.getElementById('h1_err').innerHTML = "num_1 must be greater than num_2";
    document.getElementById('h1_err').className = "message_err";
    document.getElementById('h1').className = "input_err";
    flag = 0;
  }

  if(temp3 > temp4){
    document.getElementById('v1_err').innerHTML = "num_3 must be greater than num_4";
    document.getElementById('v1_err').className = "message_err";
    document.getElementById('v1').className = "input_err";
    flag = 0;
  }

  return flag;
}
