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
        shininess: 10 
      });
	  this.ballShape = new Physijs.SphereMesh(
                        new THREE.IcosahedronGeometry( 4, 2 ),
                        new THREE.MeshLambertMaterial(),
                        undefined,
                        { restitution: Math.random() * 1.5 }
                    );
  }
  
  /**
   * ball field 
   */
  
  function BallTerrain(audioPlayer){
    this.balls = [];
    this.audioBoost = audioPlayer.boost
  }
  
  /**
   * ball field functions
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
          sphere.position.x = this.randomBetween(-1500, 1500);
          sphere.position.y = 20;
    
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
    },
     /**
     * moveWithCamera
     * when the camera gets past the first terrain, put the other in front of it
     */
     
   moveWithCamera:function(camera){
     var reGenPos = 800;
     var dropHeight= 80;
      // loop through each ball
      for(var i=0; i<this.balls.length; i++) {
        
        var ball = this.balls[i]; 
          
        // move it forward by a 50th of its array position each time 

                   // ball.__dirtyPosition = true;  
        
       //if the camera has moved past the entire square, move the square
        if((ball.position.z - 1000)>camera.position.z){
                    ball.position.z +=  i/50; 
            ball.position.z-=((reGenPos+(i*2))*2);
            ball.position.y=dropHeight;
                        ball.__dirtyPosition = true;
          }
         //if the camera has moved past the entire square in the opposite direction, move the square the opposite way
          else if((ball.position.z + 1000)<camera.position.z){
                ball.position.z +=  i/50;     
            ball.position.z+=((reGenPos+(i*2))*2);
                        ball.position.y=dropHeight;
            ball.__dirtyPosition = true;
          } 
       
       
       //x positions
       else if((ball.position.x - 1000)>camera.position.x){
                 ball.position.z +=  i/50;    
            ball.position.x-=((reGenPos+(i*2))*2);
                        ball.position.y=dropHeight;
                        ball.__dirtyPosition = true;
          }
           //if the camera has moved past the entire square in the opposite direction, move the square the opposite way
          else if((ball.position.x + 1000)<camera.position.x){
                ball.position.z +=  i/50;     
            ball.position.x+=((reGenPos+(i*2))*2);
                        ball.position.y=dropHeight;
                        ball.__dirtyPosition = true;
          }
        
        
      }
    },
    /**
     * animate with audio
     */
    respondToAudio:function(){
      
        for(var i=0; i<this.balls.length; i++) {
                    
             var ball = this.balls[i]; 
                        ball.__dirtyPosition = true;                  
             ball.position.y = this.audioBoost
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