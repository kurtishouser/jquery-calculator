$(function() {

  console.log("JQ Loaded. Let's do some basic math!");

  let output = '0';
  let evaluated = false;
  let evaluationError = false;

  $('#screen').text(output); // initialize display

  $('.buttons').children().on('click', function(event) {

    var $target = $(event.target);

    if (evaluationError) {
      output = '';
      evaluationError = false;
    }

    if ($target.hasClass('operator')) { // ÷ x - + = buttons

      if ($target.is('#clear')) { // C button

        evaluated = false;
        output = '0';
        // updateDisplay(output);

      } else if ($target.is('#equals')) { // = button, evaluate the formula

        // replace with code syntax operators
        output = output.replace(/x/g, '*').replace(/÷/g, '/');

        // try {
        //   output = result.toString();
        // }
        // catch (e) {
        //  console.log(e);
        // }

        result = eval(output);
        if (result === Infinity || isNaN(result)) { // number / 0 or 0 / 0
          evaluationError = true;
          output = "Error";
        } else {
          output = result.toString();
        }
        evaluated = true;
        // updateDisplay(output);


      } else { // ÷ x - + buttons

        evaluated = false; // continue calulation

        // only register last operator
        if (output.endsWith('÷') || output.endsWith('x') ||
            output.endsWith('-') || output.endsWith('+')) {
          output = output.slice(0, -1);
        }
         q
        output += $target.text();
        // updateDisplay(output);

      }

    } else { // number buttons

      if ($target.is('#zero')) { // zero button

        if (evaluated || $('#screen').text() === '0') { // ignore multiple zeros
          output = '0';
        } else {
          output += $target.text();
        }
        // updateDisplay(output);

      } else { // other number buttons

        if (evaluated || $('#screen').text() === '0') {
          output = $target.text();
        } else {
          output += $target.text();
        }
        evaluated = false;
        // updateDisplay(output);

      }
    }

    // update the dislpay
    $('#screen').text(output);

  }); // end click handler

// function updateDisplay(output) {
//   $('#screen').text(output);
// }

});
