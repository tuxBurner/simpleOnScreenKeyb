/**
* Plugin which provides a simple on screen keyboard
*/
(function ( $ ) {
  $.fn.simpleOnScreenKeyb = function( options ) {

    // the input element itself
    var elem = this;

    var defaults = {
      chars: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','<-','LO'],
      keys: {
        38 : "nextChar",
        40 : "prevChar",
        27 : "cancle",
        13 : "enter"
      }
    }

    var opts = $.extend( {}, $.fn.simpleOnScreenKeyb.defaults, options );

    var currCharPos = 0;

    var toLower = false;



    // append some html to the box

    /**
    * Event handling
    */
    elem.on('keyup', function(e){
      handleKeybKey(e.which);
    });

    elem.focusin(function() {
      $('#jqSimpleOnScreenKeybWrapper').show();
      displayChar(currCharPos);
    });

    elem.blur(function() {
      $('#jqSimpleOnScreenKeybWrapper').hide();
    });


    /**
    * Handles the key code from the keyboard
    */
    var handleKeybKey = function(keyCode) {
      var actionForKey = defaults.keys[keyCode];
      if(actionForKey !== undefined) {
        switch(actionForKey) {
          case "nextChar" :
            if(currCharPos == defaults.chars.length -1) {
              currCharPos=0;
            } else {
              currCharPos++;
            }
            displayChar(currCharPos);
          break;
          case "prevChar" :
            if(currCharPos == 0) {
              currCharPos=defaults.chars.length -1;
            } else {
              currCharPos--;
            }
            displayChar(currCharPos);
          break;
          case "enter" :
            var currText= elem.val();
            // delete selected
            if(currCharPos == defaults.chars.length-2) {
              currText = currText.slice(0,-1)
            } else if(currCharPos == defaults.chars.length-1) {
              toLower = !toLower;
              var text = "LO";
              if(toLower == true) {
                text = "UP";
              }
              defaults.chars[defaults.chars.length-1] = text;
              displayChar(currCharPos);
            } else {
              currText+=getCurrentChar();
            }
            elem.val(currText)
          break;
          case "cancle" :
            elem.blur();
          break;
        }
      }
    }

    /**
    * gets the current char
    */
    var getCurrentChar = function() {
      var char = defaults.chars[currCharPos];
      if(toLower == true) {
        char = char.toLowerCase();
      }

      return char;
    }

    /**
    * Display the current char
    */
    var displayChar = function() {
      $('#jqSimpleOnScreenKeybWrapper .content').text(getCurrentChar());
    };

    return this;
  };



}( jQuery ));
