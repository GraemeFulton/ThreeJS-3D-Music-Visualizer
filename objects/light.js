   /**
   * Light
   */
  function Light(){
    
    //use directional light
    this.directionalLight = new THREE.DirectionalLight( 0xff0000, 1.1);
    //set the position
    this.directionalLight.position.set(10, 2, 20);
    //enable shadow
    this.directionalLight.castShadow = true;
    //enable camera 
    this.directionalLight.shadowCameraVisible = true;
  }
  
  Light.prototype={
    constructor:Light,
    addLight:function(scene){
      //add light to the scene
      scene.add( this.directionalLight );
    
    }
  };