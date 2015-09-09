  /**
   * Ground
   */
  function Ground(perlinNoise){
    
     //create the ground material using MeshLambert Material
     this.groundMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide}  );

     //create the plane geometry
     this.geometry = new THREE.PlaneGeometry(240,800,300,300);
     
     //make the terrain bumpy with perlin noise
     for (var i = 0, l = this.geometry.vertices.length; i < l; i++) {
          var vertex = this.geometry.vertices[i];
          var value = perlinNoise.noise(vertex.x / 10, vertex.y /10, 0);
          vertex.z = value *6;
      }
      
      //ensure light is computed correctly
      this.geometry.computeFaceNormals();
      this.geometry.computeVertexNormals();
      
<<<<<<< HEAD
      this.groundMaterial.map = new THREE.ImageUtils;
      this.groundMaterial.map.wrapS = this.groundMaterial.map.wrapT = THREE.RepeatWrapping;
      this.groundMaterial.map.repeat.set(1024, 1024);

=======
>>>>>>> f44091ae89266fa8fd6a89909e50248ac8b5d827
      //create the ground form the geometry and material
      this.ground = new THREE.Mesh(this.geometry,this.groundMaterial); 
  }
  
  
  /**
   * Terrain array
   */
  function Terrain(){
    
    this.floor = [];
    
  }
  
  /**
   * Terrain functions
   */
  Terrain.prototype={
    
    constructor: Terrain,
<<<<<<< HEAD
    
    addGround:function(scene, perlinNoise){
        for ( var z= 0; z < 1; z++ ) {
=======
    addGround:function(scene, perlinNoise){
        for ( var z= -1600; z < 1600; z+=800 ) {
>>>>>>> f44091ae89266fa8fd6a89909e50248ac8b5d827
    
  	      var floor = new Ground(perlinNoise);
          var ground = floor.ground;
          //rotate 90 degrees around the xaxis so we can see the terrain 
          ground.rotation.x = -Math.PI/-2;

          // Then set the z position to where it is in the loop (distance of camera)
          ground.position.z = z;
          ground.position.y -=4;

          //add the ground to the scene
          scene.add(ground); 
          //finally push it to the ground array 
          this.floor.push(ground); 
        }
    },
<<<<<<< HEAD
    
=======
>>>>>>> f44091ae89266fa8fd6a89909e50248ac8b5d827
    animateFloor(){
        // loop through each star
        for(var i=0; i<this.floor.length; i++) {
          
          var ground = this.floor[i]; 
            
          // move it forward by a 10th of its array position each time 
          ground.position.z +=  0.25;
            
          // once the star is too close, reset its z position
          if(ground.position.z>400) ground.position.z-=1600;   
        }
    }
    
<<<<<<< HEAD
  };
=======
  };
>>>>>>> f44091ae89266fa8fd6a89909e50248ac8b5d827
