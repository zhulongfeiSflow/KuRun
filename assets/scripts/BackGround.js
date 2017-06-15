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
        },        

        pitfallPrefab:{
            default:null,
            type: cc.Prefab
        },

        barrelPrefab:{
            default:null,
            type: cc.Prefab
        },

        audioManager:{
            default: null,
            type: cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        // this.instantiatePeach();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    //实例化一个预制体
    initPrefab: function(prefab, position, script){
        var newPrefab = cc.instantiate(prefab);

        this.node.addChild(newPrefab);

        newPrefab.setPosition(position);
        newPrefab.getComponent(script).player = this.player;       
    },

    //背景动画开始前调用批量生成预制体
    instantiatePeach:function(){
        this.node.removeAllChildren();
        //布置桃子
        for(var i = -2000; i <= 1100; i+=150){

            var randY=cc.random0To1()*100;

            this.initPrefab( this.peachPrefab, cc.p(i,-25 + randY), 'Peach' );
        }
        //布置陷阱障碍物和水桶
        for(var i = -1500; i <= 1100; i+=1000){
            var randX=cc.random0To1()*500;

            if(cc.randomMinus1To1() > 0){
                this.initPrefab( this.pitfallPrefab, cc.p(i - randX,-233), 'Pitfall' );
            } else {
                this.initPrefab( this.barrelPrefab, cc.p(i - randX,-100), 'Barrel' );

            }
            
        }

    }
});
