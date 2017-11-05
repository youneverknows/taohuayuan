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
        var self = this;
        var isFirstLoadMap = cc.sys.localStorage.getItem("isFirstLoadMap");

        /* if(isFirstLoadMap == null || isFirstLoadMap == 1){
            cc.log("first load map");
            this.initMapData();
            cc.sys.localStorage.setItem("isFirstLoadMap",0);
        } */
        this.initMapData();

        cc.loader.loadRes("map/raw/mapResource",cc.SpriteAtlas,function(err,spriteAtlas) {
            if(err){
                cc.error(err);
                return;
            }
            window.mapSpriteAtlas = spriteAtlas;
            self.initMap();
        });
    },
    initMapData:function(){
        var grassTextureName = "Beach_beach_sign_07";
        this.grassInfo = [
            {
                spriteFrame:grassTextureName,
                positionX: 50,
                positionY: 30,
                zOrder:30
            },
            {
                spriteFrame:"DomPalma_DomPalma_6",
                positionX: 50,
                positionY: 33,
                zOrder:33
            }
        ];
        cc.sys.localStorage.setItem("grassInfoLength",this.grassInfo.length);
        for (var index = 0; index < this.grassInfo.length; index++) {
            cc.sys.localStorage.setItem("grassInfo"+index,JSON.stringify(this.grassInfo[index]));
        }
    },
    initMap:function(){
        var grassNode = null;
        var grassInfoLength = cc.sys.localStorage.getItem("grassInfoLength");
        for (var index = 0; index < grassInfoLength; index++) {
            grassNode = new cc.Node("grassInfo"+index);
            grassNode.parent = this.node;
            grassNode.addComponent("js_grassInit");
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
