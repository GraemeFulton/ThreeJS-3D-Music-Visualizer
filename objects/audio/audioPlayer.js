


   /**
   * AudioLoader
   */
  function AudioPlayer(){
    
      this.sound ='objects/audio/sierra.ogg';
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.source;
      
  }
  
  
   AudioPlayer.prototype={
    constructor:AudioPlayer,

    /**
    * http://mdn.github.io/decode-audio-data/
    */
    // use XHR to load an audio track, and
    // decodeAudioData to decode it and stick it in a buffer.
    // Then we put the buffer into the source
    getData:function(){
        var thisObject = this;
        this.source = this.audioCtx.createBufferSource();
        request = new XMLHttpRequest();
    
        request.open('GET', this.sound, true);
    
        request.responseType = 'arraybuffer';
    
    
        request.onload = function() {
        
        var audioData = request.response;
    
        thisObject.audioCtx.decodeAudioData(audioData, function(buffer) {
            thisObject.source.buffer = buffer;
    
            thisObject.source.connect(thisObject.audioCtx.destination);
            thisObject.source.loop = true;
        },
          function(e){"Error with decoding audio data" + e.err});
        }

        request.send();  
      
    },
    /**
     * play music
     */
    playMusic:function(){
        this.getData();
        this.source.start(0);
    }
    
   }