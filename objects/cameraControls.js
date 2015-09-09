   /**
   * CameraControls
   */
  function CameraControls(){

  }
  
  CameraControls.prototype={
    constructor:CameraControls,

    update:function(camera, keyboard, clock){
      
      var delta = clock.getDelta(); // seconds.
    	var moveDistance = 150 * delta; // 200 pixels per second
    	var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
    	
    	// local transformations
    
    	// move forwards/backwards/left/right
    	if ( keyboard.pressed("up") )
    		camera.translateZ( -moveDistance );
    	if ( keyboard.pressed("down") )
    		camera.translateZ(  moveDistance );
    
    	// rotate left/right
    	//var rotation_matrix = new THREE.Matrix4().identity();
    	if ( keyboard.pressed("left") )
    		camera.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
    	if ( keyboard.pressed("right") )
    	 	camera.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
      
    	
    	if ( keyboard.pressed("P") )
    	{
    		camera.position.set(0,1,0);
    		camera.rotation.set(0,0,0);
    	}
      
    }
  };