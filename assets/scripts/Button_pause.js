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
        btnLayout:{
            default:null,
            type: cc.Node,
        }
    },

    onBtnClicked: function(){
        if(cc.director.isPaused()){
            // cc.director.resume();
            // this.node.parent.opacity = 255;
        } else {
            cc.director.pause();
            this.btnLayout.active = true;
            // cc.log( this.btnLayout.isValid);
            // this.node.parent.opacity = 123;
        }
    },

    onContinueGame: function(){
        this.btnLayout.active = false;
        cc.director.resume();
    },

    onRestartGame: function(){
        cc.director.resume();
        cc.director.loadScene('Game');
    },

    onReturnGame: function(){
        cc.director.resume();
        cc.director.loadScene('Login');
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
