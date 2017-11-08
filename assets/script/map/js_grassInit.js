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

        //获取地图
        this.tiledMap = this.node.parent.getComponent(cc.TiledMap);

        //添加碰撞分组
        this.node.group = "grass";
        

        //获取此节点的渲染相关信息
        var grassInfo = JSON.parse(cc.sys.localStorage.getItem(this.node.name));
        var spriteFrame = grassInfo.spriteFrame;
        var position = new cc.Vec2(grassInfo.positionX,grassInfo.positionY);
        var zOrder = grassInfo.zOrder;

        //添加精灵组件
        var sprite = this.node.addComponent(cc.Sprite);
        sprite.spriteFrame = window.mapSpriteAtlas.getSpriteFrame(spriteFrame);
        this.node.setPosition(this.tilePosition2RealPositon(position));

        //设置阶段的zOrder
        this.node.setLocalZOrder(zOrder);

        //添加矩形碰撞组件
        /* var boxCollider = this.node.addComponent(cc.BoxCollider);
        boxCollider.offset = new cc.Vec2(0,-30);
        boxCollider.size = new cc.Size(40,20); */

        //添加圆形碰撞组件
        var boxCollider = this.node.addComponent(cc.CircleCollider);
        boxCollider.offset = new cc.Vec2(0,-30);
        boxCollider.radius = 60; 
    },
    tilePosition2RealPositon(position){
        var mapSize = this.tiledMap.getMapSize();
        var tileSize = this.tiledMap.getTileSize();
        var x = (position.x-mapSize.width/2) * tileSize.width + tileSize.width / 2;
        var y = (mapSize.height/2 - position.y)*tileSize.height - tileSize.height / 2;
        return new cc.Vec2(x, y);
    },
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
