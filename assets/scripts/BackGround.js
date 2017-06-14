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
        player: {
            default:null,
            type: cc.Node
        },

        

        peachPrefab:{
            default:null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        // this.instantiatePeach();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },


    //初始化一个桃子精灵
    spawnNewPeach: function(peachPosition){

        var newPeach = cc.instantiate(this.peachPrefab);

        this.node.addChild(newPeach);

        newPeach.setPosition( peachPosition );

        newPeach.getComponent('Peach').player = this.player;
    },

    //背景动画开始前调用批量生成桃子
    instantiatePeach:function(){
        this.node.removeAllChildren();
        for(var i = -2000; i <= 1100; i+=150){

            var randY=cc.random0To1()*100;

            this.spawnNewPeach( cc.p(i,-25 + randY) );
        }
    }
});
