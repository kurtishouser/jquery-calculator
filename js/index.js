$(function() {

  console.log("JQ Loaded. Let's do some basic math!");

  let output = '';
  let evaluated = false;
  let evaluationError = false;

  $('#screen').text(output); // initialize display

  $('.buttons').children().on('click', function(event) {

    var $target = $(event.target);

    if (evaluationError) { // clear display on first button click after eval error
      output = '';
      evaluationError = false;
    }

    if ($target.hasClass('operator')) { // ÷ x - + = buttons

      if ($target.is('#clear')) { // C button

        evaluated = false;
        output = '';

      } else if ($target.is('#equals')) { // = button, evaluate the formula

        // replace with code syntax operators
        output = output.replace(/x/g, '*').replace(/÷/g, '/');

        try {
          result = eval(output);
        }
        catch (e) {
         console.log(e);
         evaluationError = true;
        }

        if (evaluationError || result === Infinity || result === -Infinity || isNaN(result)) { // number / 0 or 0 / 0
          evaluationError = true;
          output = "Error";
        } else {
          output = result.toString();
        }
        evaluated = true;

      } else { // ÷ x - + buttons

        evaluated = false; // continue calulation

        // only register last operator
        if (output.endsWith('÷') || output.endsWith('x') ||
            output.endsWith('-') || output.endsWith('+')) {
          output = output.slice(0, -1);
        }

        output += $target.text();

      }

    } else { // number buttons

      if ($target.is('#zero')) { // zero button

        if (evaluated || $('#screen').text() === '0') { // ignore multiple zeros
          output = '0';
        } else {
          output += $target.text();
        }

      } else { // other number buttons

        if (evaluated || $('#screen').text() === '0') {
          output = $target.text();
        } else {
          output += $target.text();
        }
        evaluated = false;

      }
    }

    // update the dislpay
    $('#screen').text(output);

  }); // end click handler

});
