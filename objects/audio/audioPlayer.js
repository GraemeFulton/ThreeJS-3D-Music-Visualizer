


   /**
   * AudioLoader
   */
  function AudioPlayer(){
    
      this.sound ='objects/audio/sierra.ogg';
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.source;
      
      //from https://github.com/srchea/Sound-Visualizer/blob/master/js/audio.js
      this.source, this.sourceJs;
      this.analyser;
      this.audioArray = new Array();
      this.boost = 0;
      
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
          
          /**from https://github.com/srchea/Sound-Visualizer/blob/master/js/audio.js */
          thisObject.sourceJs = thisObject.audioCtx.createScriptProcessor(2048, 1, 1);
          thisObject.sourceJs.buffer = buffer;
          thisObject.sourceJs.connect(thisObject.audioCtx.destination);
          thisObject.analyser = thisObject.audioCtx.createAnalyser();
          thisObject.analyser.smoothingTimeConstant = 0.6;
          thisObject.analyser.fftSize = 512;
          /**from https://github.com/srchea/Sound-Visualizer/blob/master/js/audio.js */
          
            thisObject.source.buffer = buffer;
    
            thisObject.source.connect(thisObject.audioCtx.destination);
            thisObject.source.loop = true;
            
            
            /**from that dude atain^^ */
             thisObject.source.connect(thisObject.analyser);
              thisObject.analyser.connect(thisObject.sourceJs);
              thisObject.source.connect(thisObject.audioCtx.destination);
        
              thisObject.sourceJs.onaudioprocess = function(e) {
                thisObject.audioArray = new Uint8Array(thisObject.analyser.frequencyBinCount);
               thisObject.analyser.getByteFrequencyData(thisObject.audioArray);
               thisObject.boost = 0;
                for (var i = 0; i < thisObject.audioArray.length; i++) {
                        thisObject.boost += thisObject.audioArray[i];
                 }
                    thisObject.boost = thisObject.boost / thisObject.audioArray.length;
              }
              /******/
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