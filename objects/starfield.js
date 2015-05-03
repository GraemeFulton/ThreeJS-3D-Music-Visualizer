    /**
   * Star Object
   */
  function Star(){
	  this.geometry = new THREE.SphereGeometry(0.5, 32, 32);
	  this.material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
	  this.starShape = new THREE.Mesh(this.geometry, this.material);
  }
  
  /**
   * Starfield 
   */
  
  function StarField(){
    this.stars = [];
  }
  
  /**
   * Starfield functions
   */
  StarField.prototype = {
    
    constructor:StarField,
    addStars:function(scene){
      // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
      for ( var z= -1000; z < 1000; z+=20 ) {
    
          // Make a sphere (exactly the same as before). 
          var star = new Star();
          var sphere = star.starShape;
    
          // This time we give the sphere random x and y positions between -500 and 500
          sphere.position.x = Math.random() * 1000 - 500;
          sphere.position.y = Math.random() * 1000 - 500;
    
          // Then set the z position to where it is in the loop (distance of camera)
          sphere.position.z = z;
    
          // scale it up a bit
          sphere.scale.x = sphere.scale.y = 2;
    
          //add the sphere to the scene
          scene.add( sphere );
    
          //finally push it to the stars array 
          this.stars.push(sphere); 
        }
    },
    animateStars:function(){
      // loop through each star
      for(var i=0; i<this.stars.length; i++) {
        
        var star = this.stars[i]; 
          
        // move it forward by a 10th of its array position each time 
        star.position.z +=  i/10;
          
        // once the star is too close, reset its z position
        if(star.position.z>1000) star.position.z-=2000;   
      }
    }
    
  };
