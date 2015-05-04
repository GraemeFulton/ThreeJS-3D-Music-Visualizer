    /**
   * Star Object
   */
  function Ball(){
	  this.geometry = new THREE.SphereGeometry(10, 32, 32);
	  this.material = new THREE.MeshPhongMaterial({
        // light
        specular: '#a9fcff',
        // intermediate
        color: '#00abb1',
        // dark
        emissive: '#006063',
        shininess: 500 
      });
	  this.ballShape = new THREE.Mesh(this.geometry, this.material);
  }
  
  /**
   * Starfield 
   */
  
  function BallTerrain(){
    this.balls = [];
  }
  
  /**
   * Starfield functions
   */
  BallTerrain.prototype = {
    
    constructor:BallTerrain,
    addBalls:function(scene){
      // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
      for ( var z= -1000; z < 1000; z+=50 ) {
    
          // Make a sphere (exactly the same as before). 
          var ball = new Ball();
          var sphere = ball.ballShape;
    
          // This time we give the sphere random x and y positions between -500 and 500
          sphere.position.x = Math.random() * 400 - 200;
          sphere.position.y = -10;
    
          // Then set the z position to where it is in the loop (distance of camera)
          sphere.position.z = z;
    
          //add the sphere to the scene
          scene.add( sphere );
    
          //finally push it to the stars array 
          this.balls.push(sphere); 
        }
    },
    animateBalls:function(){
      // loop through each star
      for(var i=0; i<this.balls.length; i++) {
        
        var ball = this.balls[i]; 
          
        // move it forward by a 10th of its array position each time 
        ball.position.z +=  0.25;
          
        // once the star is too close, reset its z position
        if(ball.position.z>1200) ball.position.z-=2000;   
      }
    }
    
  };
