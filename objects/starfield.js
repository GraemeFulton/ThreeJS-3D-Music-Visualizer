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
<<<<<<< HEAD
          sphere.position.x = this.randomBetween(-800, 800);
          sphere.position.y = this.randomBetween(50, 300);
=======
          sphere.position.x = Math.random() * 1000 - 500;
          sphere.position.y = Math.random() * 1000 - 500;
>>>>>>> f44091ae89266fa8fd6a89909e50248ac8b5d827
    
          // Then set the z position to where it is in the loop (distance of camera)
          sphere.position.z = z;
    
          // scale it up a bit
<<<<<<< HEAD
          sphere.scale.x = sphere.scale.y = 1.5;
=======
          sphere.scale.x = sphere.scale.y = 2;
>>>>>>> f44091ae89266fa8fd6a89909e50248ac8b5d827
    
          //add the sphere to the scene
          scene.add( sphere );
    
          //finally push it to the stars array 
          this.stars.push(sphere); 
        }
    },
<<<<<<< HEAD
    animateStars:function(camera){
=======
    animateStars:function(){
>>>>>>> f44091ae89266fa8fd6a89909e50248ac8b5d827
      // loop through each star
      for(var i=0; i<this.stars.length; i++) {
        
        var star = this.stars[i]; 
          
<<<<<<< HEAD
        // move it forward by a 50th of its array position each time 
        star.position.z +=  i/50;   
        
       //if the camera has moved past the entire square, move the square
        if((star.position.z - 800)>camera.position.z){
            
            star.position.z-=(800*2);
          }
         //if the camera has moved past the entire square in the opposite direction, move the square the opposite way
          else if((star.position.z + 800)<camera.position.z){
            
            star.position.z+=(800*2);
          } 
       
       
       //x positions
       if((star.position.x - 800)>camera.position.x){
            
            star.position.x-=(800*2);
          }
           //if the camera has moved past the entire square in the opposite direction, move the square the opposite way
          else if((star.position.x + 800)<camera.position.x){
            
            star.position.x+=(800*2);
          }
        
        
      }
    },
    /**
     * randomBetween
     * @params: min, max
     * @returns: random number between min and max
     */
    randomBetween:function(min, max) {
      if (min < 0) {
          return min + Math.random() * (Math.abs(min)+max);
      }else {
          return min + Math.random() * max;
      }
    }
    
  };
=======
        // move it forward by a 10th of its array position each time 
        star.position.z +=  i/10;
          
        // once the star is too close, reset its z position
        if(star.position.z>1000) star.position.z-=2000;   
      }
    }
    
  };
>>>>>>> f44091ae89266fa8fd6a89909e50248ac8b5d827
