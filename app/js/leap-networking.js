   window.controller = new Leap.Controller({
      background: true,
      checkVersion: false
    });

    controller.use('networking', {
      // This is @pehrlich's free API key.  Limited to 50 concurrent users, but probably good to try things out.
      // See http://peerjs.com/peerserver
      peer: new Peer({key: 'k0ap3iwxm51p2e29'}),
    });

    // Uncomment for VR mode:
//    controller.use('transform', {
//      vr: true
//    });

    controller.use('riggedHand', {
// turns out that this function is horrendously slow.
//      boneLabels: function(boneMesh, leapHand){
//        if (boneMesh.name != "Wrist") return;
//        return leapHand.id
//      }
    });

//    controller.connect();

    var peer = controller.plugins.networking.peer;

    window.location.hash = '';
    peer.on('open', function(id){
      window.location.hash = id;
    });


    document.getElementById('connect').onclick = function(){
      controller.plugins.networking.connect(document.getElementById('connectTo').value);
      controller.connect();
    }