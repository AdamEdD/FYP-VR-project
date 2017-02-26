(window.controller = new Leap.Controller)
    .use('riggedHand', {
      boneLabels: function(boneMesh, leapHand) {
        return boneMesh.name
      }
    })
    .connect()
    
        var controllerOptions = {enableGestures: true};
        Leap.loop(controllerOptions, function(frame) {

          // Display Gesture object data
          if (frame.gestures.length > 0) {
            for (var i = 0; i < frame.gestures.length; i++) {
              var gesture = frame.gestures[i];
              if(gesture.type == "swipe") {
                  //Classify swipe as either horizontal or vertical
                  var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
    
                  if(isHorizontal){
                      if(gesture.direction[0] > 0){
                          swipeDirection = "right";
                          $.ui.keyCode.DOWN;
                      } else {
                          swipeDirection = "left";
                      }
                  } else { //vertical
                      if(gesture.direction[1] > 0){
                          swipeDirection = "up";
                      } else {
                          swipeDirection = "down";
                      }                  
                  }
                  console.log(swipeDirection);
               }
             }
          }

        });