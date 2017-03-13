var View = (function () {
    function View(canvasElement) {
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }
    View.prototype.createScene = function () {
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.VRDeviceOrientationFreeCamera("DevOr_camera", new BABYLON.Vector3(55, 70, 42), this._scene);
        //this._camera = new BABYLON.WebVRFreeCamera("WVR", new BABYLON.Vector3(55,70,42), this._scene);
        //this._camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(55,70,42), this._scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, true);
        var config = {
            apiKey: "AIzaSyCRM15eGWx0kp3lk4Q-egBwHd0R5dqmgEU",
            authDomain: "fyp-vr-project.firebaseapp.com",
            databaseURL: "https://fyp-vr-project.firebaseio.com",
            storageBucket: "fyp-vr-project.appspot.com",
            messagingSenderId: "934282466575"
        };
        firebase.initializeApp(config);
        function render(scene) {
            function euclidean(x, y) { return Math.sqrt(Math.pow(x[0] + y[0], 2) + Math.pow(x[1] + y[1], 2) + Math.pow(x[2] + y[2], 2)); }
            ;
            //let Redditcoordinates = firebase.database().ref("reddits/").once('value').then(function(snapshot) {
            var Redditcoordinates = firebase.database().ref("reddits/").on("value", function (snapshot) {
                var _loop_1 = function (key) {
                    if (snapshot.val().hasOwnProperty(key)) {
                        for (var k in snapshot.val()[key]) {
                            if (snapshot.val()[key].hasOwnProperty(k)) {
                                console.log(key);
                                var delta = 1 / euclidean(snapshot.val()[key][k], [51.809306223434014,
                                    51.888140847943774,
                                    48.62521675494634]);
                                var color = '';
                                if (delta * 1000 < 10) {
                                    color = "#" + Math.floor(1000 / delta);
                                }
                                else {
                                    color = "#" + Math.floor(10000 / delta);
                                }
                                var box = BABYLON.Mesh.CreateBox("box", 2, scene);
                                var boxMaterial = new BABYLON.StandardMaterial("material", scene);
                                var boxTexture = new BABYLON.DynamicTexture("dynamic texture", 200, scene, true);
                                boxMaterial.diffuseTexture = boxTexture;
                                boxTexture.drawText(key, null, 100, "bold 40px helvetica", "Black", color);
                                box.rotation.x = -90;
                                boxMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
                                boxMaterial.alpha = 0.7;
                                box.material = boxMaterial;
                                box.convertToUnIndexedMesh();
                                box.position = new BABYLON.Vector3(snapshot.val()[key][k][0], snapshot.val()[key][k][1], snapshot.val()[key][k][2]);
                                box.actionManager = new BABYLON.ActionManager(scene);
                                box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
                                    var url = "https://www.reddit.com/r/" + key + "/new.json?sort=new";
                                    $(".HeaderKey").empty();
                                    $(".reddit-item").empty();
                                    $(".permalink").empty();
                                    $(".myList").empty();
                                    $.getJSON(url, function (data) {
                                        var cList = $('ul.mylist');
                                        $.each(data.data.children, function (i, item) {
                                            var li = $('<li/>')
                                                .addClass('reddit-item')
                                                .appendTo(cList);
                                            var hk = $('<h3/>')
                                                .addClass('HeaderKey')
                                                .text(' ' + item.data.author + ':')
                                                .appendTo(li);
                                            var aaa = $('<a/>')
                                                .addClass('permalink')
                                                .text(' ' + item.data.permalink)
                                                .appendTo(li);
                                        });
                                        $('.reddit-header').html(key);
                                        var VRscroll = $(".simuscroll");
                                        VRscroll.scroll(function () {
                                            VRscroll.scrollTop($(this).scrollTop());
                                        });
                                        document.getElementById("reddit-info-left").style.visibility = "visible";
                                        document.getElementById("reddit-info-right").style.visibility = "visible";
                                    });
                                }));
                            }
                        }
                    }
                };
                for (var key in snapshot.val()) {
                    _loop_1(key);
                }
            });
            var r_connections = firebase.database().ref("reddit_con_coords/").once('value').then(function (snapshot) {
                for (var key in snapshot.val()) {
                    if (snapshot.val().hasOwnProperty(key)) {
                        var alpha = 100 * (1 / euclidean(snapshot.val()[key][0], snapshot.val()[key][1]));
                        var lines = BABYLON.Mesh.CreateTube("tube", [
                            new BABYLON.Vector3(snapshot.val()[key][0][0], snapshot.val()[key][0][1], snapshot.val()[key][0][2]),
                            new BABYLON.Vector3(snapshot.val()[key][1][0], snapshot.val()[key][1][1], snapshot.val()[key][1][2])
                        ], .01, null, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);
                        lines.freezeNormals();
                        var linemat = new BABYLON.StandardMaterial("material", scene);
                        linemat.emissiveColor = new BABYLON.Color3(.55, 1, .46);
                        linemat.alpha = alpha;
                        lines.material = linemat;
                    }
                }
            });
            var u_connections = firebase.database().ref("reddit_con_coords/").once('value').then(function (snapshot) {
                for (var key in snapshot.val()) {
                    if (snapshot.val().hasOwnProperty(key)) {
                        var alpha = 100 * (1 / euclidean(snapshot.val()[key][0], snapshot.val()[key][1]));
                        var lines = BABYLON.Mesh.CreateTube("tube", [
                            new BABYLON.Vector3(snapshot.val()[key][0][0], snapshot.val()[key][0][1], snapshot.val()[key][0][2]),
                            new BABYLON.Vector3(snapshot.val()[key][1][0], snapshot.val()[key][1][1], snapshot.val()[key][1][2])
                        ], .009, null, null, 0, scene, false, BABYLON.Mesh.FRONTSIDE);
                        var linemat = new BABYLON.StandardMaterial("material", scene);
                        linemat.emissiveColor = new BABYLON.Color3(1, 0, 1);
                        linemat.alpha = alpha;
                        lines.material = linemat;
                    }
                }
            });
        }
        render(this._scene);
        var light1 = new BABYLON.PointLight("omni", new BABYLON.Vector3(55, 70, 42), this._scene);
        light1.diffuse = BABYLON.Color3.Red();
        light1.state = "on";
        var db_UserCo = firebase.database().ref("user_positions/");
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 20, .5, this._scene);
        var sphereMaterial = new BABYLON.StandardMaterial("material", this._scene);
        sphereMaterial.emissiveColor = new BABYLON.Color3(1, .5, 0.86);
        sphereMaterial.alpha = 0.7;
        sphere.material = sphereMaterial;
        sphere.convertToUnIndexedMesh();
        sphere.actionManager = new BABYLON.ActionManager(this._scene);
        db_UserCo.on("value", function (snapshot) {
            for (var key in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(key)) {
                    var instanceofsphere = sphere.createInstance('spheres');
                    instanceofsphere.position = new BABYLON.Vector3(snapshot.val()[key][1], snapshot.val()[key][2], snapshot.val()[key][3]); //light
                    sphere.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOverTrigger, sphere.material, "emissiveColor", BABYLON.Color3.Red()));
                }
            }
        }, function (error) {
            console.log("Error: " + error.code);
        });
    };
    View.prototype.animate = function () {
        var _this = this;
        this._engine.runRenderLoop(function () {
            _this._scene.render();
        });
        window.addEventListener('resize', function () {
            _this._engine.resize();
        });
    };
    return View;
}());
/*
window.addEventListener('devicemotion', function(event) {
  alert(event.acceleration.x + ' m/s2');
});*/
window.addEventListener('DOMContentLoaded', function () {
    var view = new View('renderCanvas');
    view.createScene();
    view.animate();
});
