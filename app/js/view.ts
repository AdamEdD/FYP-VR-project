declare var firebase: any;

class View {

  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.VRDeviceOrientationFreeCamera;
  //private _camera: BABYLON.WebVRFreeCamera;
  //private _camera: BABYLON.ArcRotateCamera;
  public reddits: any;

  constructor(canvasElement : string) {

      this._canvas = <HTMLCanvasElement> document.getElementById(canvasElement);
      this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createScene() : void {
      
      this._scene = new BABYLON.Scene(this._engine);

      this._camera = new BABYLON.VRDeviceOrientationFreeCamera("DevOr_camera", new BABYLON.Vector3(55,70,42), this._scene);
      
      //this._camera = new BABYLON.WebVRFreeCamera("WVR", new BABYLON.Vector3(55,70,42), this._scene);
      
      //this._camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(55,70,42), this._scene);

      this._camera.setTarget(BABYLON.Vector3.Zero());
      
      this._camera.attachControl(this._canvas, true);
      
      //this._camera.attachControl(this._canvas, false);
      
      let config = {
        apiKey: "AIzaSyCRM15eGWx0kp3lk4Q-egBwHd0R5dqmgEU",
        authDomain: "fyp-vr-project.firebaseapp.com",
        databaseURL: "https://fyp-vr-project.firebaseio.com",
        storageBucket: "fyp-vr-project.appspot.com",
        messagingSenderId: "934282466575"
      };
    
      firebase.initializeApp(config); 
      
      let db_RedditCo = firebase.database().ref("reddits/");
      /*
      let box = BABYLON.Mesh.CreateBox("box", 2, this._scene);
      
      let boxMaterial = new BABYLON.StandardMaterial("material", this._scene);
      let boxTexture = new BABYLON.DynamicTexture("dynamic texture", 200, this._scene, true);
      boxMaterial.diffuseTexture = boxTexture;
      boxTexture.drawText('TEST', null, 100, "bold 40px helvetica", "Black", "#336699");
      boxMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
      boxMaterial.alpha = 0.7;
      box.material = boxMaterial;
      box.convertToUnIndexedMesh();
      
      db_RedditCo.on("value", function(snapshot) {
        for (let key in snapshot.val()) {
            
            if (snapshot.val().hasOwnProperty(key)) {   
                for (let k in snapshot.val()[key]) {

                    if (snapshot.val()[key].hasOwnProperty(k)) {
                        
                        let instanceofbox = box.createInstance(k);
                        instanceofbox.position = new BABYLON.Vector3(snapshot.val()[key][k][0], 
                                                           snapshot.val()[key][k][1],                               
                                                            snapshot.val()[key][k][2]); //light
                    }
                }   
              }
        }
    }, function (error) {
                console.log("Error: " + error.code);
    });*/
    
    function render(scene) {
        
        function euclidean(x,y): number { return Math.sqrt(Math.pow(x[0]+y[0],2)+Math.pow(x[1]+y[1],2)+Math.pow(x[2]+y[2],2)); };

        let Redditcoordinates = firebase.database().ref("reddits/").once('value').then(function(snapshot) {
            for (let key in snapshot.val()) {

                if (snapshot.val().hasOwnProperty(key)) {   
                    for (let k in snapshot.val()[key]) {

                        if (snapshot.val()[key].hasOwnProperty(k)) {
                              
                             let delta = 1/euclidean(
                                                      snapshot.val()[key][k],
                                                      [51.809306223434014,
                                                       51.888140847943774,
                                                       48.62521675494634]   
                                                    );
                            
                              let color='';
                              if (delta*1000 < 10) {
                                color = "#" + Math.floor(1000/delta);  
                              } else {
                                color = "#" + Math.floor(10000/delta);  
                              }
                            
                              let box = BABYLON.Mesh.CreateBox("box", 2, scene);
      
                              let boxMaterial = new BABYLON.StandardMaterial("material", scene);
                              let boxTexture = new BABYLON.DynamicTexture("dynamic texture", 200, scene, true);
                              boxMaterial.diffuseTexture = boxTexture;
                              boxTexture.drawText(key, null, 100, "bold 40px helvetica", "Black", color);
                              box.rotation.x  =  -90;
                              boxMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
                              boxMaterial.alpha = 0.7;
                              box.material = boxMaterial;
                              box.convertToUnIndexedMesh();
                            
                              box.position = new BABYLON.Vector3(snapshot.val()[key][k][0], 
                                                           snapshot.val()[key][k][1],                               
                                                            snapshot.val()[key][k][2]);
                            
                              box.actionManager = new BABYLON.ActionManager(scene);

                              box.actionManager.registerAction(
                                  new BABYLON.ExecuteCodeAction(
                                      BABYLON.ActionManager.OnPickTrigger, 
                                          function () {
                                                        let url = "https://www.reddit.com/r/"+key+"/new.json?sort=new"
                                                        $.getJSON(url, function (data) {
                                                            let cList = $('ul.mylist')
                                                            $.each(data.data.children, function (i, item) {
                                                                let li = $('<li/>')
                                                                    .addClass('reddit-item')
                                                                    .appendTo(cList);
                                                                let hk = $('<h3/>')
                                                                    .addClass('HeaderKey')
                                                                    .text(' '+ item.data.author +':')
                                                                    .appendTo(li);
                                                                let aaa = $('<a/>')
                                                                    .addClass('permalink')
                                                                    .text(' '+ item.data.permalink)
                                                                    .appendTo(li);
                                                            });
                                                            document.getElementById('reddit-header').innerHTML = key;
                                                            document.getElementById("reddit-info").style.visibility = "visible";
                                                        });
                                                    })
                                                );
                        }
                    }   
                  }
            }
        });
        
        let r_connections = firebase.database().ref("reddit_con_coords/").once('value').then(function(snapshot) {
            
            for (let key in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(key)) {
                    
                    let alpha = 100*(1/euclidean(snapshot.val()[key][0],
                                           snapshot.val()[key][1]));
                    
                    let lines = BABYLON.Mesh.CreateTube("tube", [ 
                                new BABYLON.Vector3(snapshot.val()[key][0][0],
                                                    snapshot.val()[key][0][1],
                                                       snapshot.val()[key][0][2]),
                    
                                new BABYLON.Vector3(snapshot.val()[key][1][0],
                                                    snapshot.val()[key][1][1],
                                                    snapshot.val()[key][1][2])
                            ], .01, null, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);
                    lines.freezeNormals();
                    
                    let linemat = new BABYLON.StandardMaterial("material", scene);
                    linemat.emissiveColor = new BABYLON.Color3(.55,
                                                               1, 
                                                               .46);
                    linemat.alpha = alpha;
                    
                    lines.material = linemat;
                    }
                }
        });
        
        let u_connections = firebase.database().ref("reddit_con_coords/").once('value').then(function(snapshot) {
            
            for (let key in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(key)) {
                    
                    let alpha = 100*(1/euclidean(snapshot.val()[key][0],
                                           snapshot.val()[key][1]));
                    
                    let lines = BABYLON.Mesh.CreateTube("tube", [ 
                                new BABYLON.Vector3(snapshot.val()[key][0][0],
                                                    snapshot.val()[key][0][1],
                                                       snapshot.val()[key][0][2]),
                    
                                new BABYLON.Vector3(snapshot.val()[key][1][0],
                                                    snapshot.val()[key][1][1],
                                                    snapshot.val()[key][1][2])
                            ], .009, null, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);
                    
                    let linemat = new BABYLON.StandardMaterial("material", scene);
                    linemat.emissiveColor = new BABYLON.Color3(1, 0, 1);
                    linemat.alpha = alpha;
                    lines.material = linemat;
                    
                    }
                }
        });
    }

    render(this._scene);

    let light1 = new BABYLON.PointLight("omni", new BABYLON.Vector3(55,70,42), this._scene);
    light1.diffuse = BABYLON.Color3.Red();
    light1.state = "on";
      
    let db_UserCo = firebase.database().ref("user_positions/");

    let sphere = BABYLON.Mesh.CreateSphere("sphere1", 20, .5, this._scene);
    let sphereMaterial = new BABYLON.StandardMaterial("material", this._scene);
    sphereMaterial.emissiveColor = new BABYLON.Color3(1, .5, 0.86);
    sphereMaterial.alpha = 0.7;
    sphere.material = sphereMaterial;
    sphere.convertToUnIndexedMesh();

    sphere.actionManager = new BABYLON.ActionManager(this._scene);
      
    db_UserCo.on("value", function(snapshot) {

        for (let key in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(key)) {

                let instanceofsphere : BABYLON.InstancedMesh = <BABYLON.InstancedMesh> sphere.createInstance('spheres');
                        
                instanceofsphere.position = new BABYLON.Vector3(snapshot.val()[key][1], 
                                                   snapshot.val()[key][2], 
                                                   snapshot.val()[key][3]); //light
                
                sphere.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, sphere.material, "emissiveColor", BABYLON.Color3.Red()));
                
                }
            }
        }, function (error) {
                console.log("Error: " + error.code);
    });  
    
  }

  animate() : void {

    this._engine.runRenderLoop(() => {
        this._scene.render();
    });

    window.addEventListener('resize', () => {
        this._engine.resize();
    });
  }
}

/*
window.addEventListener('devicemotion', function(event) {
  alert(event.acceleration.x + ' m/s2'); 
});*/

window.addEventListener('DOMContentLoaded', () => {

  let view = new View('renderCanvas');

  view.createScene();

  view.animate();
});