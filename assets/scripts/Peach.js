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

        pickRadius:0
    },

    //获取悟空与桃子的距离
    getPlayerDistance:function(){
        var playerPos = this.player.convertToWorldSpace( cc.v2(72, 72) );

        var peachPosition = this.node.convertToWorldSpace( cc.v2(35, 25) );

        var dist = cc.pDistance(playerPos, peachPosition);

        return dist;
    },

    // use this for initialization
    onLoad: function () {
        this.audioManager = cc.director.getScene().getChildByName('AudioManager').getComponent('AudioManager');
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var dist = this.getPlayerDistance();
        if(dist < this.pickRadius){
            this.onPiacked();
            return ;
        }
    },

    onPiacked: function(){
        // 播放吃桃子音效
        this.audioManager.playAudio('score');
                
        this.player.getComponent('Player').gainScore();
        this.node.destroy();
    }
});
