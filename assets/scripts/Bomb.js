cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            default: null,
            type:cc.Node,
        }
    },

    //高层导弹帧事件
    judgeDown:function(){
        if(this.player.getComponent('Player').canbeHitByHighBomb() ){
            this.bombHit();
        }
    },

    //底层导弹帧事件    
    judgeJump:function(){
        if( this.player.getComponent('Player').isOnLand() ){
            this.bombHit();
        }
    },

    spwanBomb:function(){
        if(Math.random()>0.5){
            this.getComponent(cc.Animation).play('bomb_high');
        }else{
            this.getComponent(cc.Animation).play('bomb_low');
        }
    },

    bombHit:function(){
        this.getComponent(cc.Animation).stop();
        this.unschedule(this.spwanBomb);

        this.player.getComponent('Player').died('bomb');   
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
