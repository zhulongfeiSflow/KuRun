cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            default: null,
            type:cc.Node,
        },
        
        bg:{
            default: null,
            type:cc.Node,
        }
    },

    judgeDown:function(){
        if(this.player.getComponent('Player').state == 'down'){
            console.log("down--------------");
        }else{
            this.hit();
        }
    },

    judgeJump:function(){
        if(this.player.getComponent('Player').state == 'jump'){
            console.log("jump--------------");
        }else{
            this.hit();
        }
    },

    spwanBomb:function(){
        if(Math.random()>0.5){
            this.getComponent(cc.Animation).play('bomb_high');
        }else{
            this.getComponent(cc.Animation).play('bomb_low');
        }
    },

    hit:function(){
        this.player.stopAllActions();
        this.player.getComponent('Player').state='died';
        this.player.getComponent(cc.Animation).stop();
        this.player.getComponent(cc.Animation).play('player_hit');
        this.bg.getComponent(cc.Animation).stop();        
        this.getComponent(cc.Animation).stop();
        this.unschedule(this.spwanBomb);
    },

    // use this for initialization
    onLoad: function () {

        let self = this;

        this.schedule(this.spwanBomb, 3);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
