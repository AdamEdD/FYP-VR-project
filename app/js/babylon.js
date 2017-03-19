 
    var config = {
        apiKey: "AIzaSyCRM15eGWx0kp3lk4Q-egBwHd0R5dqmgEU",
        authDomain: "fyp-vr-project.firebaseapp.com",
        databaseURL: "https://fyp-vr-project.firebaseio.com",
        storageBucket: "fyp-vr-project.appspot.com",
        messagingSenderId: "934282466575"
    };
    
    firebase.initializeApp(config); 

    var canvas = document.getElementById("render-canvas");
    var engine = new BABYLON.Engine(canvas);
    var scene = new BABYLON.Scene(engine);
    //scene.debugLayer.show();
    var engine = new BABYLON.Engine(canvas, false, null, false);
    
    BABYLON.SceneOptimizer.OptimizeAsync(scene)
    	
    var camera = new BABYLON.VRDeviceOrientationFreeCamera("DevOr_CAMERA", new BABYLON.Vector3(55,70,42), scene);
    //camera.inputs.removeByType("FreeCameraVRDeviceOrientationInput");

    camera.setTarget(new BABYLON.Vector3(0, 0, 10));

    camera.attachControl(canvas, true);

    var table_rpos = firebase.database().ref("reddits/");

    var box = new BABYLON.Mesh.CreateBox("box", 2, scene);

    var boxMaterial = new BABYLON.StandardMaterial("material", scene);
    boxMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    boxMaterial.alpha = 0.7;
    var boxTexture = new BABYLON.DynamicTexture("dynamic texture", 200, scene, false);
    //boxMaterial.diffuseTexture = boxTexture;
    //boxMaterial.drawText(key, null, 100, "bold 40px helvetica", "white", "#336699");

    box.material = boxMaterial;
    box.convertToUnIndexedMesh();
    //box.texture = boxTexture;

    table_rpos.on("value", function(snapshot) {
        for (var key in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(key)) {   
                for (var k in snapshot.val()[key]) {
                    if (snapshot.val()[key].hasOwnProperty(k)) {
                        
                        var nbox = box.clone(key);
                        
                        var nMat = boxMaterial.clone(key); 
                        
                        var nTex = boxTexture.clone(key);
                        
                        nMat.diffuseTexture = nTex;
                        
                        //var boxTexture = new BABYLON.DynamicTexture("dynamic texture", 200, scene, false);
                        //nMat.diffuseTexture = boxTexture;
                        nTex.drawText(key, null, 100, "bold 40px helvetica", "Black", "#336699");
                        
                        nbox.texture = nTex;
                        
                        nbox.addLODLevel(25);
                        
                        nbox.position = new BABYLON.Vector3(snapshot.val()[key][k][0], 
                                                           snapshot.val()[key][k][1], 
                                                           snapshot.val()[key][k][2]);
                    }
                }
              }
        }
    }, function (error) {
                console.log("Error: " + error.code);
    });

    var table_upos = firebase.database().ref("user_positions/");

    var sphere = new BABYLON.Mesh.CreateSphere("sphere1", 20, .5, scene);
    var sphereMaterial = new BABYLON.StandardMaterial("material", scene);
    sphereMaterial.emissiveColor = new BABYLON.Color3(1, .5, 0.86);
    sphereMaterial.alpha = 0.7;
    sphere.material = sphereMaterial;
          
    table_upos.on("value", function(snapshot) {

        for (var key in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(key)) {

                var nsphere = sphere.clone(key);
                nsphere.position = new BABYLON.Vector3(snapshot.val()[key][1], 
                                                   snapshot.val()[key][2], 
                                                   snapshot.val()[key][3]);
                nsphere.addLODLevel(25);
                }
            }

        }, function (error) {
                console.log("Error: " + error.code);
    });
    
    var r_conns = firebase.database().ref("reddit_con_coords/");

    r_conns.on("value", function(snapshot) {

        for (var key in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(key)) {
                
                var lines = BABYLON.Mesh.CreateTube("tube", 
                            {path: [ 
                                new BABYLON.Vector3(snapshot.val()[key][0][0],
                                                    snapshot.val()[key][0][1],
                                                    snapshot.val()[key][0][2]),
                    
                                new BABYLON.Vector3(snapshot.val()[key][1][0],
                                                    snapshot.val()[key][1][1],
                                                    snapshot.val()[key][1][2])
                            ],},
                             0.009, null, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);
                
                                var lineMaterial = new BABYLON.StandardMaterial("material", scene);
                                lineMaterial.emissiveColor = new BABYLON.Color3(0, 1, 1);
                                lineMaterial.alpha = 0.2;
                                tube.material = lineMaterial;
                
                lines.addLODLevel(20);
                
            }
            }

        }, function (error) {
                console.log("Error: " + error.code);
    });
    
    var u_conns = firebase.database().ref("user-reddit_coords/");
    
    u_conns.on("value", function(snapshot) {

        for (var key in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(key)) {
                
                var lines = BABYLON.Mesh.CreateTube("tube", [ 
                                new BABYLON.Vector3(snapshot.val()[key][0][0],
                                                    snapshot.val()[key][0][1],
                                                       snapshot.val()[key][0][2]),
                    
                                new BABYLON.Vector3(snapshot.val()[key][1][0],
                                                    snapshot.val()[key][1][1],
                                                    snapshot.val()[key][1][2])
                            ], 0.009, null, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);
                
                lines.addLODLevel(20);
                
                var lineMaterial = new BABYLON.StandardMaterial("material", scene);
                lineMaterial.emissiveColor = new BABYLON.Color3(1, 0, 1, 0.1);
                lineMaterial.alpha = 0.2;
                lines.material = lineMaterial;
                
                }
            }

        }, function (error) {
                console.log("Error: " + error.code);
    });  

    var renderLoop = function () {
        scene.render();
    };
    engine.runRenderLoop(renderLoop);