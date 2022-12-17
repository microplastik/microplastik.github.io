import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import { OrbitControls } from './jsm/OrbitControls.js';
import { ConvexBufferGeometry } from './jsm/ConvexGeometry.js';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './jsm/postprocessing/UnrealBloomPass.js';
import { BadTVShader } from 'bad-tv-shader'
// console.info(BadTVShader)
var group, camera, scene, renderer, controls, composer, material, matcap, effect, material2, material22;
// THREE.BadTVShader = BadTVShader
const awaitmaterial = new Promise(resolve=>{window.materialresolve = resolve})
const position_data = require("./ppositions.json")
var params = {
    exposure: 1,
    bloomStrength: 0.15,
    bloomThreshold: 0.1,
    bloomRadius: 10
};

var API = {
    color: 0xffffff,
    exposure: 1.0
};
export function LabyrinthItem() {
    var clock = new THREE.Clock();
    init();
    animate();
    async function init() {
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById("labapp").appendChild( renderer.domElement );
        // camera
        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set( 155, 0, - 40 );
        scene.add( camera );
        scene.background = new THREE.Color( 0xae020f );
        // scene.background = new THREE.Color( 0xc45e5e );
        scene.fog = new THREE.FogExp2( 0xfa0315, 0.0015 );
        // controls

        composer = new EffectComposer( renderer );
        var renderPass = new RenderPass( scene, camera );
        var badTVPass = new ShaderPass( BadTVShader );

        var bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), .5, 0.4, 0.1 );
        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;
        badTVPass.renderToScreen = true;
        composer.addPass( renderPass );
        composer.addPass( badTVPass );
        composer.addPass( bloomPass );
        controls = new OrbitControls( camera, renderer.domElement );
        controls.minDistance = 50;
        controls.maxDistance = 50;
        controls.maxPolarAngle = Math.PI / 2;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.5;
        badTVPass.uniforms['distortion'].value = 0.5
        badTVPass.uniforms['distortion2'].value = 0.5
        badTVPass.uniforms['rollSpeed'].value = 1
        badTVPass.uniforms['speed'].value = 1
        // controls.enabled = false
        scene.add( new THREE.AmbientLight( 0xae020f, 0.1 ) );
        // light
        var light = new THREE.PointLight( 0xfa0315, 0.12 );
        camera.add( light );
            light = new THREE.DirectionalLight( 0xffffff, 0.1 );
            light.position.set( 1, 1, 1 );
        scene.add( light );
            light = new THREE.DirectionalLight( 0xfa0315, 1 );
            light.position.set( - 1, - 1, - 1 );
        scene.add( light );
            light = new THREE.AmbientLight( 0x222222, 1 );
        scene.add( light );


        var geometry = new THREE.BoxBufferGeometry( 100, 100, 100 );


        var manager = new THREE.LoadingManager( renderer );

        var loader = new THREE.TextureLoader( manager );

        // matcap = loader.load( 'textures/matcaps/grey.png', ()=> {
        //     matcap.encoding = THREE.sRGBEncoding;
        // })
        // material = new THREE.MeshMatcapMaterial( {
        //     color: API.color,
        //     matcap: matcap,
        //     opacity: 1,
        //     // transparent:true
        // } );

        var matcap2 = loader.load( '/static/textures/matcaps/black.png', ()=> {
            matcap2.encoding = THREE.sRGBEncoding;
        })
        var material2 = new THREE.MeshMatcapMaterial( {
            color: API.color,
            matcap: matcap2,
            opacity: 0.95,
            // transparent:true
        } );
        awaitmaterial.then(()=>{
            group = new THREE.Group();
            const positions = []
            for ( var i = 0; i < 1000; i ++ ) {
                var mesh = new THREE.Mesh( geometry, material2 );
                // LOAD FROM JSON
                mesh.position.x = position_data[i].position.x
                mesh.position.y = position_data[i].position.y
                mesh.position.z = position_data[i].position.z
                mesh.rotation.x = position_data[i].rotation._x
                mesh.rotation.y = position_data[i].rotation._y
                //GENERATE
                // mesh.position.x = Math.random() * 2000 - 1000;
                // mesh.position.y = Math.random() * 2000 - 1000;
                // mesh.position.z = Math.random() * 2000 - 1000;
                // mesh.rotation.x = Math.random() * 2 * Math.PI;
                // mesh.rotation.y = Math.random() * 2 * Math.PI;
                // positions[i] = {position:mesh.position, rotation:mesh.rotation}
                mesh.matrixAutoUpdate = false;
                mesh.updateMatrix();
                group.add( mesh );
            }
            window.ppositions = positions
            scene.add( group );

            var width = window.innerWidth || 2;
            var height = window.innerHeight || 2;
            window.addEventListener( 'resize', onWindowResize, false );
        })
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    function animate() {
        requestAnimationFrame( animate );
        controls.update();

        // effect.render( scene, camera );
        render();
    }
    function render() {
        renderer.render( scene, camera );
        composer.render(0.1);
    }
    const record_player = "/static/walk_knot_t53_arches/scene.gltf"
    const pyramid = "/static/low_poly_khafre/scene.gltf"

    const ploader = new GLTFLoader();
    ploader.load(
        pyramid,
        ( gltf ) => {
            var model = gltf.scene;
            awaitmaterial.then(()=>{
                model.traverse ( ( o ) => {
                    if ( o.isMesh ) {
                      // note: for a multi-material mesh, `o.material` may be an array,
                      // in which case you'd need to set `.map` on each value.
                      o.material = material22
                    }
                });
            })
            // called when the resource is loaded
            scene.add( gltf.scene );
            const scalefactor = 0.002
            gltf.scene.scale.set(scalefactor,scalefactor,scalefactor) // scale here
            // gltf.scene.rotation = 120
            let mesh = gltf.scene.children[ 0 ];
            mesh.material = material
            gltf.scene.rotation.z = Math.PI;
            gltf.scene.position.y = 25
            // console.log(gltf.scene)
            // window.gltf_scene = gltf.scene
        },
        ( xhr ) => {
            // called while loading is progressing
            // console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
        },
        ( error ) => {
            // called when loading has errors
            console.error( 'An error happened', error );
        },
    );

    const rloader = new GLTFLoader();
    rloader.load(
        record_player,
        ( gltf ) => {
            var model = gltf.scene;
            model.traverse ( ( o ) => {
                if ( o.isMesh ) {
                  // note: for a multi-material mesh, `o.material` may be an array,
                  // in which case you'd need to set `.map` on each value.
                  // o.material = material
                  material22 = o.material
                  window.materialresolve()
                }
            });
            // called when the resource is loaded
            scene.add( gltf.scene );
            const scalefactor = 0.4
            gltf.scene.scale.set(scalefactor,scalefactor,scalefactor) // scale here
            gltf.scene.position.y = -10
            gltf.scene.position.x = 0
            gltf.scene.position.z = 0
            
            // console.log(gltf.scene)
            // window.gltf_scene = gltf.scene
        },
        ( xhr ) => {
            // called while loading is progressing
            // console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
        },
        ( error ) => {
            // called when loading has errors
            console.error( 'An error happened', error );
        },
    );
}