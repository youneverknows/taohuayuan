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
        
        majorCharactor:{
            default:null,
            type:cc.Node
        },
        mapNode:{
            default:null,
            type:cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.zoomRatio = this.node.getComponent(cc.Camera).zoomRatio;
        this.winSize = cc.director.getVisibleSize();
        this.mapPosition = this.mapNode.getPosition();
        this.map = this.mapNode.getComponent(cc.TiledMap);
        this.mapSize = new cc.Size();
        this.mapSize.width = this.map.getMapSize().width * this.map.getTileSize().width;
        this.mapSize.height = this.map.getMapSize().height * this.map.getTileSize().height;
    },
    updateCameraPosition:function(){
        if(this.zoomRatio*(this.mapSize.width/2 - (Math.abs(this.majorCharactor.getPosition().x))) > this.winSize.width/2){
            this.node.x = this.majorCharactor.getPosition().x + this.mapPosition.x;
        }
        if(this.zoomRatio*(this.mapSize.height/2 - (Math.abs(this.majorCharactor.getPosition().y))) > this.winSize.height/2){
            this.node.y = this.majorCharactor.getPosition().y + this.mapPosition.y;
        }
        //this.node.setPosition(this.majorCharactor.getPosition());
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.updateCameraPosition();
    },
});
