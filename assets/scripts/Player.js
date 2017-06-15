cc.Class({
    extends: cc.Component,

    properties: {

        jumpHeight: 0,

        jumpDuration: 0,

        state: 'run',

        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        
        backGround:{
            default: null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.gameManager = cc.director.getScene().getChildByName('GameManager').getComponent('GameManager');
        this.audioManager = cc.director.getScene().getChildByName('AudioManager').getComponent('AudioManager');
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
            this.audioManager.playAudio('jump');

        }else if(this.state == 'jump'){
            this.state = 'jump2';
            this.getComponent(cc.Animation).stop();
            //结束第一次跳跃
            this.node.stopAllActions();
            //二次跳跃回到原来在画布中位置
            this.node.runAction(cc.sequence(cc.jumpTo(this.jumpDuration, cc.p(-243,-96), this.jumpHeight*1.5 , 1.5),
            cc.callFunc(function(){
                this.run();
            }, this)));
            this.audioManager.playAudio('jump');
        }
    },

    down:function(){
        if(this.state == 'run'){
            this.state = 'down';
            this.node.runAction(cc.scaleTo(0.05, 0.7, 0.7));
            this.getComponent(cc.Animation).play('player_down');
        }
    },

    downRelease:function(){
        if(this.state == 'down'){
            this.node.runAction(cc.sequence(cc.scaleTo(0.0, 1, 1),
            cc.callFunc(function(){
                this.node.runAction(cc.rotateTo(0,0));
                this.run();
            }, this)));
        }        
    },

    died: function(dieType){
        if(this.state != 'died'){
            this.backGround.getComponent(cc.Animation).stop();
            //跳跃动作的停止
            this.node.stopAllActions();
            this.node.getComponent(cc.Animation).stop();
            this.state='died';
            switch(dieType){
                case 'fall':this.node.getComponent(cc.Animation).play('player_fall');break;
                case 'bomb':this.node.getComponent(cc.Animation).play('player_glint');break;
            }
            this.audioManager.playAudio('die');
        }        
    },

    //是否在陆地
    isOnLand: function(){
        if(this.state != 'jump' && this.state != 'jump2'){
            return true;
        }
        return false;
    },

    //能否被高层导弹击中
    canbeHitByHighBomb:function(){
        if(this.state == 'run' || this.state == 'jump'){
            return true;
        }
        return false;
    },

    //游戏结束帧时间调用
    gameOver: function(){
        cc.director.loadScene('Game');
    },

    //吃桃子增加得分
    gainScore: function(){
        this.gameManager.addScore();

        this.scoreDisplay.string = 'Score:' + this.gameManager.getScore().toString();
        
    },
});
