const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const scene = new THREE.Scene();
const cubeGroup = new THREE.Group();

const initWebGL = () =>{

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial( { color: 0xff9900 } );
  const cube = new THREE.Mesh( geometry, material );

  for(let i = 0; i < 10; i++){
    const newCube = cube.clone();
    newCube.position.set(i * 2, 0, 0);
    newCube.userData.focus = false;
    cubeGroup.add(newCube);
  }

  scene.add(cubeGroup);

  camera.position.z = 22;
  camera.position.x = 10;

  const animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  };

  animate();
}

const initRayCaster = () => {
  window.addEventListener('mousemove', onMouseMove);
}

// const onMouseMove = ( event ) => {

//   const raycaster = new THREE.Raycaster();
//   const mouse = new THREE.Vector2();

// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//   raycaster.setFromCamera( mouse, camera );
//   const intersects = raycaster.intersectObjects( cubeGroup.children );

//   for(const currentCube of cubeGroup.children){
//     currentCube.userData.hover = false;
//   }

//   if(intersects.length > 0){
//     for(const interset of intersects){
//       interset.object.userData.hover = true;
//     }
//   }
//   testCube();
// }

// const testCube = () => {
//   for(const currentCube of cubeGroup.children){
//     if(currentCube.userData.hover){
//       currentCube.scale.set(1.25,1.25,1.25);
//       if(!currentCube.userData.focus){
//         currentCube.userData.focus = true;
//         console.log(currentCube.uuid + ' : focus!');
//         // The function you want to call when the cube is just getting focused.
//       }
//     }
//     else{
//       currentCube.scale.set(1.0,1.0,1.0);
//       if(currentCube.userData.focus){
//         currentCube.userData.focus = false;
//       }
//     }
//   }
// }

let focusedCube = undefined;

const onMouseMove = (event) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObjects( cubeGroup.children );

  if(intersects.length>0){
    const newFocusedCube = intersects[0].object;
    if(newFocusedCube.uuid != focusedCube?.uuid){
      focusedCube = newFocusedCube;
      focusedCube.scale.set(1.25,1.25,1.25);
      console.log('got a new cube!');
    }
  }
  else{
    if(focusedCube){
      focusedCube.scale.set(1.0,1.0,1.0);
    }
    focusedCube = undefined;
  }
}

initWebGL();
initRayCaster();
