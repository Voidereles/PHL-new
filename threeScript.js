import * as THREE from 'three';
import gsap from 'gsap';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';
const path = require('./phl-blender.glb');
import {
    GUI,
    gui
} from 'dat.gui';
// import $ from "jquery";



let threeJSContainer;
let container, controls;
let camera, scene, renderer, mixer;
let lightA, lightH, lightD, lightS;
var helper;


let targetCamera;
let mouseX = 0;
let mouseY = 0;
let mouseXpercent = 0;
let mouseYpercent = 0;
const referOffset = document.querySelector('.refer').offsetTop;
const jobsOffset = document.querySelector('.jobs').offsetTop;

let onMouseMoveLogoRotation = true;

let getColorHex;

var clock = new THREE.Clock();

const colorChange = function (getColorTheme) {
    const colorTo = new THREE.Color(getColorTheme);
    // let colorTransition = 
    // gsap.to(lightS.color, {
    //     r: colorTo.r,
    //     g: colorTo.g,
    //     b: colorTo.b,
    //     duration: 0.5
    // });

    gsap.to(lightD.color, {
        r: colorTo.r,
        g: colorTo.g,
        b: colorTo.b,
        duration: 0.5
    });
    // colorTransition.play();
}

const FarAwayLogo = function () {
    gsap.to(camera, {
        duration: 4,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        }
    });

    gsap.to(camera.position, {
        duration: 4,
        x: -3.3,
        y: 20.5,
        z: 18.4,
        onUpdate: function () {
            update();
        }
    })

    gsap.to(controls.target, {
        duration: 4,
        x: -20.7,
        y: -100,
        z: -33.7,
        onUpdate: function () {
            controls.update();
        }
    });
}

const JobsLogo = function () {
    gsap.to(camera, {
        duration: 4,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        }
    });

    gsap.to(camera.position, {
        duration: 4,
        x: -12,
        y: 22.7,
        z: 18.4,
        onUpdate: function () {
            update();
        }
    })

    gsap.to(controls.target, {
        duration: 4,
        x: -12,
        y: -77,
        z: -36,
        onUpdate: function () {
            controls.update();
        }
    });
}

const IncreaseLogoSize = function () {
    gsap.to(camera.position, {
        duration: 4,
        x: 2.2,
        y: 7,
        z: 2,
        onUpdate: function () {
            update();
        }
    })

    gsap.to(controls.target, {
        duration: 4,
        x: 2.2,
        y: 4,
        z: 1,
        onUpdate: function () {
            controls.update();
        }
    });
}


const DecreaseLogoSize = function () {
    gsap.to(camera.position, {
        duration: 4,
        x: 2.3,
        y: 4.2,
        z: 8.2,
        onUpdate: function () {
            update();
        }
    })

    gsap.to(controls.target, {
        duration: 4,
        x: -0.6,
        y: 0.1,
        z: 1.8,
        onUpdate: function () {
            controls.update();
        }
    });

    // if (window.innerWidth <= 768) {
    //     gsap.to(camera.position, {
    //         duration: 4,
    //         x: 2.3,
    //         y: 12,
    //         z: 2,
    //         onUpdate: function () {
    //             update();
    //         }
    //     })

    //     gsap.to(controls.target, {
    //         duration: 4,
    //         x: -0.6,
    //         y: 3,
    //         z: -0.3,
    //         onUpdate: function () {
    //             controls.update();
    //         }
    //     });
    // }
}

const LeftLogoPosition = function () {
    gsap.to(camera, {
        duration: 3.2,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        }
    });

    gsap.to(camera.position, {
        duration: 3.2,
        x: 1.1,
        y: 2.7,
        z: 2,
        onUpdate: function () {
            update();
        }
    })

    gsap.to(controls.target, {
        duration: 3.2,
        x: -0.8,
        y: -1.3,
        z: -0.4,
        onUpdate: function () {
            controls.update();
        }
    });
}
// window.DecreaseLogoSize = DecreaseLogoSize; //window, żeby móc odwołać się w konsoli. Tylko do debugowania!
// window.IncreaseLogoSize = IncreaseLogoSize;




init();
animate();


function init() {

    container = document.createElement('div');
    container.id = "threeJSContainer";
    container.classList.add('threeJS__container');
    threeJSContainer = document.getElementById('threeJSContainer');


    const loadingManager = new THREE.LoadingManager(() => {

        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');

        // optional: remove loader from DOM via event listener
        loadingScreen.addEventListener('transitionend', onTransitionEnd);

    });

    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    if (window.innerWidth <= 768) {
        camera.fov = 80;
    }
    camera.position.set(2.2, 20, 2);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xc6cbd8);
    // scene.background.color = 0xccaacc;


    scene.fog = new THREE.Fog(0xc6cbd8, 300, 900);
    //responsywnosc z fog

    lightA = new THREE.AmbientLight(0xfffffe, 0.1);
    scene.add(lightA);

    lightH = new THREE.HemisphereLight(0xffffff, 0x111319, 0.5);
    lightH.position.set(0, 30, 0);
    scene.add(lightH);

    // var helperH = new THREE.HemisphereLightHelper(lightH, 3);
    // scene.add(helperH);



    lightD = new THREE.DirectionalLight(0xFFEBDB, 0.55);
    // lightD.position.set(5, 13, -5, 0.6);
    // lightD.position.set(-3, 6, 6, 0.6);
    lightD.castShadow = true;
    lightD.shadow.mapSize.width = 4096;
    lightD.shadow.mapSize.height = 4096;
    scene.add(lightD);

    lightS = new THREE.SpotLight(0xFFEBAB, 0.5);
    lightS.position.set(-2, 2, -1, 0.6);
    lightS.distance = 30;
    lightS.penumbra = 1;
    lightS.decay = 1.5;
    // lightS.angle = Math.PI / 2;
    lightS.castShadow = true;
    lightS.shadow.mapSize.width = 4096;
    lightS.shadow.mapSize.height = 4096;
    scene.add(lightS);

    // scene.add(helperS);
    // ground
    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000, 1000), new THREE.MeshPhongMaterial({
        color: 0xc6cbd8,
        depthWrite: true
    }));
    //pi = 180 stopni
    mesh.rotation.x = -Math.PI / 2;
    // mesh.rotation.z = 0.5
    mesh.receiveShadow = true;
    scene.add(mesh);

    var grid = new THREE.GridHelper(700, 308, 0x000000, 0x000000);
    grid.material.opacity = 0.5;
    grid.material.transparent = true;
    scene.add(grid);

    // model
    var loader = new GLTFLoader(loadingManager);
    loader.load(path, function (gltf) {

        mixer = new THREE.AnimationMixer(gltf);

        gltf.asset; // Object


        gltf.scene.traverse(function (child) {

            if (child.isMesh) {
                console.log('ds');
                child.castShadow = true;
                child.receiveShadow = true;

            }

        });
        scene.add(gltf.scene);



    });



    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);


    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(2.2, 4, 1);
    controls.update();
    controls.enabled = false; //blocking orbit controls

    //moving mouse
    targetCamera = new THREE.Vector3().copy(controls.target)

    container.addEventListener("mousemove", onDocumentMouseMove, false);
    // document.addEventListener( 'touchstart', onTouchStart, false );
    container.addEventListener("touchmove", onTouchMove, false);

    function onTouchMove(event) {
        event.preventDefault();
        onDocumentMouseMove(event.touches[0]);
    }

    function onDocumentMouseMove(event) {
        const windowHalfX = window.innerWidth >> 1;
        const windowHalfY = window.innerHeight >> 1;

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

        mouseXpercent = mouseX / (window.innerWidth / 2);
        mouseYpercent = mouseY / (window.innerHeight / 2);
    }




    window.addEventListener('resize', onWindowResize, false);

    // gsap.registerPlugin(CustomEase);





    const buttonDecreaseLogo = {
        add: function () {
            DecreaseLogoSize();
        }
    }

    const buttonIncreaseLogo = {
        add: function () {
            IncreaseLogoSize()
        }
    }

    function toggleMouseMove() {
        if (onMouseMoveLogoRotation == true) {
            onMouseMoveLogoRotation = false;
        } else {
            onMouseMoveLogoRotation = true;
        }
    }

    const buttonToggleMouseMove = {
        add: function () {
            toggleMouseMove();
        }
    }


    $(window).on('load', function () {
        if (window.pageYOffset < window.innerHeight / 3) {
            IncreaseLogoSize();
            console.log("increase no scroll");
        } else if (window.pageYOffset >= window.innerHeight / 3 & referOffset >= window.pageYOffset) {
            DecreaseLogoSize();
            console.log('decrease scroll');
        } else if (referOffset < window.pageYOffset && jobsOffset + 400 >= window.pageYOffset) {
            FarAwayLogo();
        } else if (jobsOffset + 400 < window.pageYOffset) {
            JobsLogo();
        }
    });


    $(window).on('scroll', function () {

        if (window.pageYOffset < window.innerHeight / 3) {
            IncreaseLogoSize();
            console.log('increase scroll')
        } else if (window.pageYOffset >= window.innerHeight / 3 & referOffset >= window.pageYOffset) {
            DecreaseLogoSize();
            console.log('decrease scroll');
        } else if (referOffset < window.pageYOffset && jobsOffset + 600 >= window.pageYOffset) {
            FarAwayLogo();
        } else if (jobsOffset + 600 < window.pageYOffset) {
            JobsLogo();
        }
    });



    var gui = new GUI();

    var data = {
        color: lightA.color.getHex(),
        groundColor: lightH.groundColor.getHex(),
        skyColor: lightH.color.getHex(),
        color: lightD.color.getHex(),
        shadowMapSizeWidth: 4096,
        shadowMapSizeHeight: 4096,
        // backgroundColor: scene.background.color.getHex(),	
        mapsEnabled: true
        //pobieramy tu te informacje co już są	
    };



    //ambient//	
    const lightFolder = gui.addFolder('THREE.Light');
    // gui.add(light, 'intensity', 0, 2, 0.01);	
    lightFolder.addColor(data, 'color').onChange(() => {
        lightA.color.setHex(Number(data.color.toString().replace('#', '0x')));
    });
    lightFolder.add(lightA, 'intensity', 0, 4, 0.01);
    //ambient//	


    //hemisphere	
    const hemisphereLightFolder = gui.addFolder('THREE.HemisphereLight');
    hemisphereLightFolder.addColor(data, 'groundColor').onChange(() => {
        lightH.groundColor.setHex(Number(data.groundColor.toString().replace('#', '0x')));
    });
    hemisphereLightFolder.addColor(data, 'color').onChange(() => {
        lightH.color.setHex(Number(data.color.toString().replace('#', '0x')));
    });
    hemisphereLightFolder.add(lightH.position, "x", -200, 200, 1);
    hemisphereLightFolder.add(lightH.position, "y", -200, 200, 1);
    hemisphereLightFolder.add(lightH.position, "z", -200, 200, 1);
    hemisphereLightFolder.add(lightH, 'intensity', 0, 4, 0.01);
    //hemisphere	


    //directionalLight	
    const directionalLightFolder = gui.addFolder('THREE.DirectionalLight');
    directionalLightFolder.add(lightD.position, "x", -50, 50, 1);
    directionalLightFolder.add(lightD.position, "y", -50, 50, 1);
    directionalLightFolder.add(lightD.position, "z", -50, 50, 1);
    directionalLightFolder.add(lightD, 'intensity', 0, 4, 0.01)
    directionalLightFolder.addColor(data, 'color').onChange(() => {
        lightD.color.setHex(Number(data.color.toString().replace('#', '0x')));
    });
    directionalLightFolder.add(lightD.shadow.camera, "left", -30, 30, 1).onChange(() => lightD.shadow.camera.updateProjectionMatrix())
    directionalLightFolder.add(lightD.shadow.camera, "right", -30, 30, 1).onChange(() => lightD.shadow.camera.updateProjectionMatrix())
    directionalLightFolder.add(lightD.shadow.camera, "top", -30, 30, 1).onChange(() => lightD.shadow.camera.updateProjectionMatrix())
    directionalLightFolder.add(lightD.shadow.camera, "bottom", -30, 30, 1).onChange(() => lightD.shadow.camera.updateProjectionMatrix())
    directionalLightFolder.add(lightD.shadow.camera, "near", 0.1, 20).onChange(() => lightD.shadow.camera.updateProjectionMatrix())
    directionalLightFolder.add(lightD.shadow.camera, "far", 0.1, 20).onChange(() => lightD.shadow.camera.updateProjectionMatrix())
    directionalLightFolder.add(data, "shadowMapSizeWidth", [256, 512, 1024, 2048, 4096]).onChange(() => updateShadowMapSize())
    directionalLightFolder.add(data, "shadowMapSizeHeight", [256, 512, 1024, 2048, 4096]).onChange(() => updateShadowMapSize())
    //directionalLight	

    const spotlightLightFolder = gui.addFolder('THREE.SpotlightLight');
    spotlightLightFolder.add(lightS.position, "x", -50, 50, 1);
    spotlightLightFolder.add(lightS.position, "y", -50, 50, 1);
    spotlightLightFolder.add(lightS.position, "z", -50, 50, 1);
    spotlightLightFolder.add(lightS.shadow.camera, "near", 0.1, 200).onChange(() => lightS.shadow.camera.updateProjectionMatrix())
    spotlightLightFolder.add(lightS.shadow.camera, "far", 0.1, 200).onChange(() => lightS.shadow.camera.updateProjectionMatrix())
    spotlightLightFolder.add(lightS, 'intensity', 0, 4, 0.01)
    spotlightLightFolder.addColor(data, 'color').onChange(() => {
        lightS.color.setHex(Number(data.color.toString().replace('#', '0x')));
    });









    gui.add(buttonDecreaseLogo, "add").name('smaller logo gsap animation');
    gui.add(buttonIncreaseLogo, "add").name('bigger logo gsap animation');
    gui.add(buttonToggleMouseMove, "add").name('tgl rot&contr');
    gui.add(scene.fog, 'near', 1, 1500).name('fog.near');
    gui.add(scene.fog, 'far', 1, 1500).name('fog.far');
    gui.add(camera.position, 'x', -100, 100, 0.1).name('cameraPosition x');
    gui.add(camera.position, 'y', -100, 100, 0.1).name('cameraPosition y');
    gui.add(camera.position, 'z', -100, 100, 0.1).name('cameraPosition z');
    gui.add(camera, 'fov', 1, 120).onChange(camera.updateProjectionMatrix());
    gui.add(controls.target, 'x', -100, 100, 0.1).name('controlsTarget x');
    gui.add(controls.target, 'y', -100, 100, 0.1).name('controlsTarget y');
    gui.add(controls.target, 'z', -100, 100, 0.1).name('controlsTarget z');
    gui.closed = true;


    let colorTheme;
    //pos rot and scale go into local transform matrix which is by default automatically updated
    //Projection Matrix only needs update after FOV changes
    $(".projects__title").hover(
        function () {
            colorTheme = this.getAttribute("data-color");
            colorChange(colorTheme);
        }
    );
    $(".projects__title").mouseleave(
        function () {
            colorChange('#c6cbd8');
        }
    );
    $(".projects__title").scroll(
        function () {
            colorChange('#c6cbd8');
        }
    );


}


function onTransitionEnd(event) {

    event.target.remove();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function update() {
    // uncommenting will enable camera move on mouse move but disable controls target gui
    controls.update();
    // camera.lookAt(targetCamera);
    camera.updateProjectionMatrix();
}

function animate() {
    // if (window.pageYOffset < window.innerHeight / 3) {
    //     IncreaseLogoSize();
    //     console.log('increase scroll')
    // } else if (window.pageYOffset >= window.innerHeight / 3 & referOffset >= window.pageYOffset) {
    //     DecreaseLogoSize();
    //     console.log('decrease scroll');
    // } else if (referOffset < window.pageYOffset) {
    //     FarAwayLogo();
    // }

    update();
    // targetCamera.x += (-mouseXpercent * 15 - targetCamera.x) / 10;
    if (window.innerWidth > 768) {
        // targetCamera.z += (-mouseYpercent * 15 - targetCamera.z) / 10;
        targetCamera.y += (-mouseXpercent * 55 - targetCamera.y) / 10;
        // camera.lookAt(targetCamera);
    }

    if (onMouseMoveLogoRotation == false) {
        controls.update();
    }
    // targetCamera.rotation += (-mouseXpercent * 55) / 10;
    // mesh.rotation.y += (-mouseYpercent * 0.13 - mesh.rotation.y);

    // mesh.rotateY(Math.random() * 360 * 0.01745327)
    // mesh.translateZ(0
    // targetCamera.y += (-(mouseYpercent * 15) + 1 - targetCamera.y) / 15;

    // camera.lookAt(mesh.position);
    requestAnimationFrame(animate, renderer.domElement);

    var delta = clock.getDelta();
    if (mixer !== undefined) mixer.update(delta);

    renderer.render(scene, camera);

};

$('#threeJSContainer').prependTo('body');