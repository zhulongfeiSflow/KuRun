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
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
        var dist = this.getPlayerDistance();
        
        //判断悟空是否会落下陷阱
        if(dist > 0 && dist < 50 &&
        this.player.getComponent('Player').isOnLand()
         ){
            this.player.getComponent('Player').died('bomb');
            return ;
        }
    },    

    //获取悟空与水桶的距离
    getPlayerDistance:function(){
        var playerPos = this.player.convertToWorldSpace( cc.v2(0, 0) );

        var barrelPosition = this.node.convertToWorldSpace( cc.v2(0, 0) );

        var dist = (playerPos.x - barrelPosition.x);

        return dist;
    },
});
