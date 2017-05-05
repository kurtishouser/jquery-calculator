$(function() {

  console.log("JQ Loaded. Let's do some basic math!");

  let output = '';
  let evaluated = false;

  $('.buttons').children().on('click', function(event) {

    var $target = $(event.target);

    console.log('clicked', $target, $target.html(), typeof $target.html(), $target.text());

    if ($target.hasClass('operator')) { // operator buttons

      console.log('operator');

      if ($target.is('#clear')) { // C operator

        output = '';
        $('#screen').html(output);

      } else if ($target.is('#equals')) { // = operator, evaluate the formula

        output = output.replace(/x/g, '*');
        output = output.replace(/÷/g, '/');
        result = eval(output);
        $('#screen').text(result);
        output = result.toString();
        evaluated = true;

      } else { // other operators

        if (output.endsWith('÷') || output.endsWith('x') ||
            output.endsWith('-') || output.endsWith('+')) {
              output = output.slice(0,-1);
        }
        output += $target.text();
        $('#screen').html(output);

      }

    } else if ($target.is('#zero')) { // zero button

      // zero will eventually be handled differently
      // depending on the contents in the display
      console.log('zero');
      output += $target.text();
      $('#screen').html(output);

    } else { // other number buttons

      console.log('number');

      output += $target.text();
      $('#screen').html(output);

    }

  }); // end click handler


});
