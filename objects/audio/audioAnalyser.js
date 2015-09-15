   /**
   * AudioAnalyser
   * param- soundPath: path to your sound
   */
   
  function AudioAnalyser(soundPath){
      
      //set sound path to path argument
      this.sound = soundPath;
      
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.request = new XMLHttpRequest();
      this.source = this.audioCtx.createBufferSource();              

      this.sourceJs, this.analyser, this.audioArray = new Array();
      
      
      //publicly accessible music attributes
      this.boost = 0;
      
  }
  
  
   AudioAnalyser.prototype={
    constructor:AudioAnalyser,

    /**
    * http://mdn.github.io/decode-audio-data/
    */
    // use XHR to load an audio track, and
    // decodeAudioData to decode it and stick it in a buffer.
    // Then we put the buffer into the source
    loadAudio:function(){
    
        this.request.open('GET', this.sound, true);
        this.request.responseType = 'arraybuffer';
        
        var audioAnalyserInstance = this;
        //on load decode the audio
        this.request.onload = function() {
          audioAnalyserInstance.decodeAudio();
        }
        
        //then send the request
        this.request.send();  
      
    },
    decodeAudio:function(){
      
        var audioAnalyserInstance = this;
        this.audioCtx.decodeAudioData(this.request.response, function(decodedData) {
          
            audioAnalyserInstance.createAnalyser(decodedData);
        },
        function(e){"Error with decoding audio data" + e.err});
    },
    createAnalyser:function(buffer){
          
          var audioAnalyserInstance = this;
          /**from https://github.com/srchea/Sound-Visualizer/blob/master/js/audio.js */
          this.sourceJs = this.audioCtx.createScriptProcessor(2048, 1, 1);
          this.sourceJs.buffer = buffer;
          this.sourceJs.connect(this.audioCtx.destination);
          this.analyser = this.audioCtx.createAnalyser();
          this.analyser.smoothingTimeConstant = 0.6;
          this.analyser.fftSize = 512;

          
          this.source.buffer = buffer;
          this.source.connect(this.audioCtx.destination);
          this.source.loop = true;
            
          /**from https://github.com/srchea/Sound-Visualizer/blob/master/js/audio.js */
          this.source.connect(this.analyser);
          this.analyser.connect(this.sourceJs);
          this.source.connect(this.audioCtx.destination);
          
          this.sourceJs.onaudioprocess = function(e) {
              audioAnalyserInstance.analyseBoost();
           }

      
    },
    analyseBoost:function(){
      
          /**from https://github.com/srchea/Sound-Visualizer/blob/master/js/audio.js */      
          this.audioArray = new Uint8Array(this.analyser.frequencyBinCount);
          
          this.analyser.getByteFrequencyData(this.audioArray);
          
          this.boost = 0;
          
          for (var i = 0; i < this.audioArray.length; i++) {
              this.boost += this.audioArray[i];
           }
          
          this.boost = this.boost / this.audioArray.length;
    },
    
    /**
     * play music
     */
    play:function(){
        this.loadAudio();
        this.source.start(0);
    }
    
   }