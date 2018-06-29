var level = -1;
var current_board = [];
var default_board = [1,3,5,7,9];
var selected_row = null;
var game_running = false;
var turn_done = false;
var first_move = 0; // 0 for human and 1 for computer
var game_starting_now = false;

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function sum(array) {
  var answer = 0;
  for (var i = 0; i < array.length; i++) {
    answer += array[i];
  }
  return answer;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function set_row(rownum, amount){
  var rownum = "#row" + rownum.toString();
  $(rownum).text("");
  if (amount > 0){
    for (var i = 0; i < amount; i++) {
      $(rownum).append("• ");
    }
  } else {
    $(rownum).text("asdf");
    $(rownum).css({'color':'white'});
    //$(rownum).animate({ color: "#000000" }, 12);
  }
}

function set_board(board) {
  current_board = board.slice(0,5);
  for (var i = 0; i < board.length; i++) {
    set_row(i+1, board[i]);
  }
}

function animate_appearance() {
  var time = 0;
  $('.become-a-row').each(function() {
    var $this  = $(this);
    $this.addClass("row-of-dots");

    function delayed() {
      if ($this.text() != "asdf"){
        $this.animate({ color: "#000000" }, 150);
      }
    }
    setTimeout( delayed , time );
    time += 200;
  });
}

function set_easy() {
  if(!game_running){
  // if (true) {
    $("#difficulty-display").text("Difficulty: Easy");
    $("#start-button").removeClass("disabled");
    $("#start-button-bottom").removeClass("disabled");
    level = 0; // 0% chance of making the best move
  }
}

function set_med() {
  if(!game_running){
  // if (true) {
    $("#difficulty-display").text("Difficulty: Medium");
    $("#start-button").removeClass("disabled");
    $("#start-button-bottom").removeClass("disabled");
    level = 0.5; // 50% chance of making the best move
  }
}

function set_hard() {
  if(!game_running){
  // if (true) {
    $("#difficulty-display").text("Difficulty: Hard");
    $("#start-button").removeClass("disabled");
    $("#start-button-bottom").removeClass("disabled");
    level = 1; // 100% chance of making the best move
  }
}

function set_first_move_human() {
  first_move = 0;
}

function set_first_move_computer() {
  first_move = 1;
}

var modal = document.getElementById('myModall');

// Get the button that opens the modal

// Get the <span> element that closes the modal

function set_custom() {
  if(!game_running){
  // if (true) {
  // $("#myModal").modal('toggle');
  var modal = document.getElementById('myModall');
  modal.style.display = "block";
}
}

function close_screen() {
  var modal = document.getElementById('myModall');
  modal.style.display = "none";
}

function open_settings_screen() {
  var modal = document.getElementById('settingsModall');
  modal.style.display = "block";
}

function close_settings_screen() {
  var modal = document.getElementById('settingsModall');
  modal.style.display = "none";
}

function update_range(value) {
  $("#demo").text("Have computer make the best move: " + value.toString() + "% of the time.");
}

function finish_custom() {
  var value = $("#myRange").val();
  if(!game_running){
    $("#difficulty-display").text("Difficulty: Custom (" + value.toString() + "%)");
    $("#start-button").removeClass("disabled");
    $("#start-button-bottom").removeClass("disabled");
    level = value / 100.0;
    var modal = document.getElementById('myModall');
    modal.style.display = "none";
  }
}

// Update the current slider value (each time you drag the slider handle)



function addDot(rownum) {
  // adds a dot to the given row number
  $("#row"+rownum.toString()).append("• ");
  current_board[rownum-1] += 1;

}

function reset_game() {
  for (var i = 1; i < 6; i++) {
    $("#row" + i.toString()).removeClass("active");
    $("#row" + i.toString()).removeClass("row-of-dots");
  }

  $("#start-button").text("Start");
  $("#start-button-bottom").text("Start");

  $("#start-button").append("<span class=\"glyphicon glyphicon-chevron-right\"></span>");
  $("#start-button-bottom").append("<span class=\"glyphicon glyphicon-chevron-right\"></span>");

  $("#start-button").removeClass("disabled");
  $("#start-button-bottom").removeClass("disabled");

  current_board = [];
  default_board = [1,3,5,7,9];
  selected_row = null;
  game_running = false;
  if(first_move){
    // window.alert("tune")
    turn_done = true;
  } else if (first_move ==0) {
    turn_done = false;
  }


}

function row_clicked(rownum) {
  if (game_running && turn_done){
    if(selected_row == null && current_board[rownum-1] > 0) { // if no row selected, select that row
      turn_done = true;
      selected_row = rownum;
      for (var i = 1; i < 6; i++) {
        $("#row" + i.toString()).removeClass("row-of-dots");  // make other rows no longer selectable
      }
      $("#row" + rownum.toString()).addClass("active");  // make selected row "active"

      current_board[rownum-1] -= 1;
      set_board(current_board);  //update the board

      $("#start-button").removeClass("disabled");  //enable the button
      $("#start-button-bottom").removeClass("disabled");

      if (sum(current_board) < 1){
        setTimeout(function(){window.alert("You lose. :(");}, 100);
        reset_game();
      }

    } else if (selected_row == rownum) {

      if (current_board[rownum-1] > 0) {

        current_board[rownum-1] -= 1;
        set_board(current_board);

      }
    }
  }
}

function random_move(board) {
  var row_for_move = null;
  var amount_to_move = null;
  for (var _ = 0; _ < 100000; _++) {
    row_for_move = getRandomInt(0,4);
    if(board[row_for_move] > 0){
      amount_to_move = getRandomInt(1,board[row_for_move]);
      return [row_for_move, amount_to_move];
      break;
    }
  }
  return -1;
}

function computer_turn() {
  // First, check if the computer lost, if so, only one move and end game.
  if (sum(current_board) == 1) {
    setTimeout(function() {
      window.alert("You win!!");
      reset_game();
    }, 1000);
  }

  var board_string = current_board[0].toString() + current_board[1].toString() + current_board[2].toString() + current_board[3].toString() + current_board[4].toString();
  if (board_string in lookup && Math.random() < level) {
    var new_board = lookup[board_string];
  } else {
    console.log("Getting random move...");
    var move = random_move(current_board);
    var new_board = current_board.slice(0,5);
    new_board[move[0]] -= move[1];
    new_board = new_board.join("");
  }

  var new_board_array = [
    Number(new_board.charAt(0)),
    Number(new_board.charAt(1)),
    Number(new_board.charAt(2)),
    Number(new_board.charAt(3)),
    Number(new_board.charAt(4)),
  ]
  var old_board = current_board.slice(0,5);

  var row_changed = null; //the row (starting at 0) that was changed by the computer
  var amount_changed = null;
  for (var i = 0; i < new_board_array.length; i++) {
    if(new_board_array[i] != old_board[i]) {
      row_changed = i;
      amount_changed = old_board[i] - new_board_array[i];
      break;
    }
  }

  var time = 300;
  for (var i = 0; i < amount_changed; i++){
    setTimeout(function () {
      current_board[row_changed] -= 1;
      set_board(current_board);
    }, time);
    time += 400;
  }

  setTimeout(function() {
    for (var i = 1; i < 6; i++) {
      $("#row" + i.toString()).removeClass("computer-active");
      $("#row" + i.toString()).addClass("row-of-dots");
    }

    turn_done = true;
  }, time-100);




  $("#row"+Number(row_changed+1).toString()).addClass("computer-active");
  for (var i = 1; i < 6; i++) {
    $("#row" + i.toString()).removeClass("row-of-dots");
  }

  // turn_done = true;
  //set_board(new_board_array);
}

function start(){
  if(level==-1){
    window.alert("Please select a difficulty level.");
  } else if (game_running){
    if(turn_done || game_starting_now) {  // end turn, setup for Computer turn
      //turn_done = false;   //wait until after computer turn to make turn false
      //for (var i = 1; i < 6; i++) {  //wait until after computer turn to make them selectable
        //$("#row" + i.toString()).addClass("row-of-dots");  // make other rows no longer selectable
      //}
      game_starting_now = false;
      for (var i = 1; i < 6; i++) {
        $("#row" + i.toString()).removeClass("active");  // make other rows no longer selectable
      }

      $("#start-button").addClass("disabled");
      $("#start-button-bottom").addClass("disabled");

      selected_row = null;

      $("#thinking").show();
      $("#not-thinking").hide();
      for (var i = 1; i < 6; i++) {
        $("#row" + i.toString()).removeClass("row-of-dots");
      }

      // var computer_delay = 1500;
      var computer_delay = getRandomInt(350, 2000);
      setTimeout(computer_turn,computer_delay + 10);
      setTimeout(function () {$("#thinking").hide();
      $("#not-thinking").show();}, computer_delay);


      turn_done = false;   //wait until after computer turn to make turn false
      for (var i = 1; i < 6; i++) {  //wait until after computer turn to make them selectable
        $("#row" + i.toString()).removeClass("row-of-dots");  // make other rows no longer selectable
      }


    } else {
      window.alert("Please make a move");
    }

  } else if (level != -1){
    game_running = true;
    set_board(default_board);
    animate_appearance();
    $("#start-button").addClass("disabled");
    $("#start-button-bottom").addClass("disabled");

    $("#start-button").text("I'm done")
    $("#start-button-bottom").text("I'm done")

    $("#start-button").append(" <span class=\"glyphicon glyphicon-chevron-right\"></span>")
    $("#start-button-bottom").append(" <span class=\"glyphicon glyphicon-chevron-right\"></span>")

    if(first_move) {
      turn_done = false;
      game_starting_now = true;
      setTimeout(start, 1600);
    } else {
      turn_done = true;
    }
  }
}


function update_the_screen() {
  set_board(current_board);
  // window.alert("The screen has been updated!");
  //setTimeout(update_the_screen, 100);
}


$( document ).ready(function () {
  update_the_screen();
});

$('.dropdown').on('show.bs.dropdown', function() {
  $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});

// Add slideUp animation to Bootstrap dropdown when collapsing.
$('.dropdown').on('hide.bs.dropdown', function() {
  $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
});
