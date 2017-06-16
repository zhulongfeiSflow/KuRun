cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        isSound:true,
        
        jumpAudio:{
            default: null,
            url: cc.AudioClip,
        },

        scoreAudio:{
            default: null,
            url: cc.AudioClip,
        },

        dieAudio:{
            default: null,
            url: cc.AudioClip,
        },

        pirsonAudio:{
            default: null,
            url: cc.AudioClip,
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
        
        this.bg_prison = cc.audioEngine.play(this.pirsonAudio, true);
        cc.audioEngine.setVolume (this.bg_prison, 0.3);
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    playAudio:function(audioType){
        if(this.isSound){
            switch(audioType){
                case 'jump':cc.audioEngine.playEffect(this.jumpAudio, false);break;
                case 'score':cc.audioEngine.playEffect(this.scoreAudio, false);break;
                case 'die':cc.audioEngine.playEffect(this.dieAudio, false);break;
            }
        }
        
    },

    turnOnOrOffSound :function(){
        if(this.isSound){
            cc.audioEngine.pauseAll();
        } else {
            cc.audioEngine.resumeAll();
        }
        this.isSound = (this.isSound? false : true);

    }
});
