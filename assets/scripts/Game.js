cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            default:null,
            type: cc.Node,
        }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        this.node.on('touchstart', function(event){
            var visibleSize = cc.director.getVisibleSize();
            if(event.getLocationX()<visibleSize.width/2){
                self.player.getComponent('Player').down();
            }else{
                self.player.getComponent('Player').jump();
            }
        });

        this.node.on('touchend', function(event){
            var visibleSize = cc.director.getVisibleSize();
            if(event.getLocationX()<visibleSize.width/2){
                self.player.getComponent('Player').downRelease();
            }else{
                //self.player.getComponent('Player').jump();
            }
        });

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
