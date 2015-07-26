  /**
   * Surface
   */
  function PerlinSurface(perlinNoise, width, height){
    
     //create the ground material using MeshLambert Material
     this.groundMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide}  );

     //create the plane geometry
     this.geometry = new THREE.PlaneGeometry(width,height,300,300);
     
     //make the terrain bumpy with perlin noise
     for (var i = 0, l = this.geometry.vertices.length; i < l; i++) {
          var vertex = this.geometry.vertices[i];
          var value = perlinNoise.noise(vertex.x / 10, vertex.y /10, 0);
          vertex.z = value *6;
      }
      
      //ensure light is computed correctly
      this.geometry.computeFaceNormals();
      this.geometry.computeVertexNormals();
      
      //convert geometry to buffer geometry as it's less memory intensive
      //src: http://stackoverflow.com/questions/18262868/transforming-geometry-to-buffergeometry (what a hero)
      var bufferGeometry = new THREE.BufferGeometry().fromGeometry( this.geometry) 
      this.geometry='';
      //create the ground form the geometry and material
      this.surface = new THREE.Mesh(bufferGeometry,this.groundMaterial); 
      

  }
  
  
  /**
   * Terrain array
   */
  function TerrainMatrix(){
    
    this.floor = [];
    this.tileHeight=400;
    this.tileWidth=400;
    this.tileRowNumber = 3;
    
  }
  
  /**
   * Terrain functions
   */
  TerrainMatrix.prototype={
    
    constructor: TerrainMatrix,
    
    /**
     * createTerrainMatrix
     * @TODO: create the matrix of terrains - need to add 9 bits of terrain
     */
    createTerrainMatrix:function(scene, perlinNoise){
          
          var xPos=0;
          //we want a 3 by 3 matrix
          for(var x = 1; x<4; x+=1){
            console.log(x)
            if(x==1){
              xPos= -this.tileWidth;
            }
            else if(x==2){
              xPos= this.tileWidth;
            }
            else if (x==3){
              xPos = 0
            }
          
            //every 100px on the z axis, add a bit of ground
            for ( var z= this.tileHeight; z > (this.tileHeight * -this.tileRowNumber); z-=this.tileHeight ) {
        
              //Create the perlin noise for the surface of the ground
      	      var perlinSurface = new PerlinSurface(perlinNoise, this.tileWidth, this.tileHeight);
              var ground = perlinSurface.surface;
              //rotate 90 degrees around the xaxis so we can see the terrain 
              ground.rotation.x = -Math.PI/-2;
              // Then set the z position to where it is in the loop (distance of camera)
              ground.position.z = z;
              ground.position.y -=4;
              
              ground.position.x =xPos;
    
              //add the ground to the scene
              scene.add(ground); 
              //finally push it to the floor array 
              this.floor.push(ground); 
            }
          }
      
    },
    
    /**
     * moveWithCamera
     * when the camera gets past the first terrain, put the other in front of it
     */
     moveWithCamera(camera){
        // loop through each star
        for(var i=0; i<this.floor.length; i++) {
          
          //if the camera has moved past the entire square, move the square
          if((this.floor[i].position.z - this.tileHeight)>camera.position.z){
            
            this.floor[i].position.z-=(this.tileHeight*2);
          }
         //if the camera has moved past the entire square in the opposite direction, move the square the opposite way
          else if((this.floor[i].position.z + this.tileHeight)<camera.position.z){
            
            this.floor[i].position.z+=(this.tileHeight*2);
          }
          
          //x positions
          else if((this.floor[i].position.x - this.tileWidth)>camera.position.x){
            
            this.floor[i].position.x-=(this.tileWidth*2);
          }
          //if the camera has moved past the entire square in the opposite direction, move the square the opposite way
          else if((this.floor[i].position.x + this.tileWidth)<camera.position.x){
            
            this.floor[i].position.x+=(this.tileWidth*2);
          }
           
        }
       
     }
    
  };
