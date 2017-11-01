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
        itemName: '',
        itemFrame: cc.Sprite,
        itemIcon: cc.Button,
        itemNum: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        
        //获取碰撞检测系统
        var manager = cc.director.getCollisionManager();

        //默认碰撞检测系统是禁用的，如果需要使用则需要以下方法开启碰撞检测系统
        manager.enabled = true;
        
        //默认碰撞检测系统的 debug 绘制是禁用的，如果需要使用则需要以下方法开启 debug 绘制
        manager.enabledDebugDraw = true;

        var nodeItemIcon = this.node.getChildByName('btnPackItemIcon');
        var nodeItemNum = this.node.getChildByName('lelPackItemNum');

        nodeItemIcon.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            nodeItemIcon.opacity = 100;
            var delta = event.touch.getDelta();
            nodeItemIcon.x += delta.x;
            nodeItemIcon.y += delta.y;
            nodeItemNum.active = false;
            nodeItemNum.x += delta.x;
            nodeItemNum.y += delta.y;
        });
        nodeItemIcon.on(cc.Node.EventType.TOUCH_END, function () {
            nodeItemIcon.opacity = 255;
            nodeItemNum.active = true;
        });
    },

    init: function (data) {
        this.itemName = data.itemName;
        this.itemFrame.spriteFrame = data.itemFrame;
        this.itemIcon.normalSprite = data.itemIcon;
        this.itemIcon.pressedSprite = data.itemIcon;
        this.itemIcon.hoverSprite = data.itemIcon;
        this.itemIcon.disabledSprite = data.itemIcon;
        this.itemNum.string = data.itemNum;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
