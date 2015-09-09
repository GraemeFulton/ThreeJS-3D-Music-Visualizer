   /**
   * Light
   */
  function Light(){
    
    //use directional light
    this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9);
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
<<<<<<< HEAD
  };
=======
  };
>>>>>>> f44091ae89266fa8fd6a89909e50248ac8b5d827
