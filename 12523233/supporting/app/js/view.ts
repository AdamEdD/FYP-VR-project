declare var firebase: any;

class View {

  private _CANVAS: HTMLCanvasElement;
  private _ENGINE: BABYLON.Engine;
  private _SCENE: BABYLON.Scene;
  private _CAMERA: BABYLON.VRDeviceOrientationFreeCamera;
  // private _CAMERA: BABYLON.WebVRFreeCamera;
  // private _CAMERA: BABYLON.ArcRotateCamera;

  constructor(canvasElement: string) {

      this._CANVAS = <HTMLCanvasElement> document.getElementById(canvasElement);
      this._ENGINE = new BABYLON.Engine(this._CANVAS, true);
  }

    public createScene(): void {
      this._SCENE = new BABYLON.Scene(this._ENGINE);

      this._CAMERA = new BABYLON.VRDeviceOrientationFreeCamera(
          "DevOr_CAMERA", new BABYLON.Vector3(55, 70, 42), this._SCENE);
      // this._CAMERA = new BABYLON.WebVRFreeCamera("WVR", new BABYLON.Vector3(55,70,42), this._SCENE);
      // this._CAMERA = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(55,70,42), this._SCENE);
      this._CAMERA.setTarget(BABYLON.Vector3.Zero());
      this._CAMERA.attachControl(this._CANVAS, true);
      let config = {
        apiKey: "AIzaSyCRM15eGWx0kp3lk4Q-egBwHd0R5dqmgEU",
        authDomain: "fyp-vr-project.firebaseapp.com",
        databaseURL: "https://fyp-vr-project.firebaseio.com",
        storageBucket: "fyp-vr-project.appspot.com",
        messagingSenderId: "934282466575",
      };
      firebase.initializeApp(config);
      function render(scene) {
        function euclidean(x, y): number {
            return Math.sqrt(Math.pow(x[0] + y[0], 2) + Math.pow(x[1] + y[1], 2) + Math.pow(x[2] + y[2], 2));
        }
          //let Redditcoordinates = firebase.database().ref("reddits/").once("value").then(function(snapshot) {
          let Redditcoordinates = firebase.database().ref("reddits/").on("value", function(snapshot) {
            for (let key in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(key)) {
                    for (let k in snapshot.val()[key]) {
                        if (snapshot.val()[key].hasOwnProperty(k)) {
                             let delta = 1 / euclidean(
                                 snapshot.val()[key][k], [51.809306223434014, 51.888140847943774, 48.62521675494634]);
                             let color = "";
                             if (delta * 1000 < 10) {
                                color = "#" + Math.floor(1000 / delta);
                              } else {
                                color = "#" + Math.floor(10000 / delta);
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
                                                                 snapshot.val()[key][k][1], snapshot.val()[key][k][2]);
                             box.actionManager = new BABYLON.ActionManager(scene);
                             box.actionManager.registerAction(
                                  new BABYLON.ExecuteCodeAction(
                                      BABYLON.ActionManager.OnPickTrigger,
                                          function () {
                                                        let url = "https://www.reddit.com/r/" +
                                                            key + "/new.json?sort=new";
                                                        $(".HeaderKey").empty();
                                                        $(".reddit-item").empty();
                                                        $(".permalink").empty();
                                                        $(".myList").empty();
                                                        $.getJSON(url, function (data) {
                                                            let cList = $("ul.mylist");
                                                            $.each(data.data.children, function (i, item) {
                                                                let li = $("<li/>")
                                                                    .addClass("reddit-item")
                                                                    .appendTo(cList);
                                                                let hk = $("<h3/>")
                                                                    .addClass("HeaderKey")
                                                                    .text(" " + item.data.author + ":")
                                                                    .appendTo(li);
                                                                let aaa = $("<a/>")
                                                                    .addClass("permalink")
                                                                    .text(" " + item.data.permalink)
                                                                    .appendTo(li);
                                                            });
                                                            $(".reddit-header").html(key);
                                                            let VRscroll = $(".simuscroll");
                                                            VRscroll.scroll(function() {
                                                                VRscroll.scrollTop($(this).scrollTop());
                                                            });
                                                            document.getElementById("reddit-info-left").style.visibility                                                               = "visible";              document.getElementById("reddit-info-right").style.visibility
                                                                = "visible";
                                                        });
                                                    }),
                                                );
                        }
                    }
                  }
            }
        });
            let RedditConnections = firebase.database().ref("reddit_connections/").once("value").then(function(snapshot) {
            for (let key in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(key)) {
  
                    let alpha = 100 * (1 / euclidean(snapshot.val()[key][0], snapshot.val()[key][1]));
                    let lines = BABYLON.Mesh.CreateTube("tube", [
                                new BABYLON.Vector3(snapshot.val()[key][0][0],
                                                    snapshot.val()[key][0][1],
                                                       snapshot.val()[key][0][2]),
                                new BABYLON.Vector3(snapshot.val()[key][1][0],
                                                    snapshot.val()[key][1][1],
                                                    snapshot.val()[key][1][2])],
                                                        .01, null, null, 0, scene,
                                                        false, BABYLON.Mesh.FRONTSIDE);
                    lines.freezeNormals();
                    let linemat = new BABYLON.StandardMaterial("material", scene);
                    linemat.emissiveColor = new BABYLON.Color3(.55, 1*alpha, alpha);
                    linemat.alpha = alpha;
                    lines.material = linemat;
                    }
                }
        });
    }
        render(this._SCENE);
        let light1 = new BABYLON.PointLight("omni", new BABYLON.Vector3(55, 70, 42), this._SCENE);
        light1.diffuse = BABYLON.Color3.Red();
        light1.state = "on";
  }
public animate(): void {
    this._ENGINE.runRenderLoop(() => {
        this._SCENE.render();
    });
    window.addEventListener("resize", () => {
        this._ENGINE.resize();
    });
  }
}
window.addEventListener("DOMContentLoaded", () => {
  let view = new View("renderCanvas");
  view.createScene();
  view.animate();
});
