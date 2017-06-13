cc.Class({
    extends: cc.Component,

    properties: {

        jumpHeight: 0,

        jumpDuration: 0,

        state: 'run',

        jumpAudio:{
            default: null,
            url: cc.AudioClip,
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    run:function(){
        this.getComponent(cc.Animation).play('player_run');
        this.state = 'run';
    },

    jump:function(){
        if(this.state == 'run'){
            this.state = 'jump';
            this.getComponent(cc.Animation).stop();
            this.node.runAction(cc.sequence(cc.jumpBy(this.jumpDuration, cc.p(0,0), this.jumpHeight, 1),
            cc.callFunc(function(){
                this.run();
            }, this)));
            
            cc.audioEngine.playEffect(this.jumpAudio, false);
        }
    },

    down:function(){
        if(this.state == 'run'){
            this.state = 'down';
            this.node.runAction(cc.scaleTo(0.05, 1, 0.5));
        }
    },

    downRelease:function(){
        if(this.state == 'down'){
            this.node.runAction(cc.sequence(cc.scaleTo(0.0, 1, 1),
            cc.callFunc(function(){
                this.run();
            }, this)));
        }
    },

    //帧时间调用
    gameOver: function(){
        cc.director.loadScene('Game');
    },
});
