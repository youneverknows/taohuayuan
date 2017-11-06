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
        isBoxing : false,
        //碰撞的Nodeitem
        nodeItemBoxing: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {

        var self = this;

        //获取碰撞检测系统
        var manager = cc.director.getCollisionManager();

        //默认碰撞检测系统是禁用的，如果需要使用则需要以下方法开启碰撞检测系统
        manager.enabled = true;
        
        //默认碰撞检测系统的 debug 绘制是禁用的，如果需要使用则需要以下方法开启 debug 绘制
        //manager.enabledDebugDraw = true;

        var nodeItemIcon = this.node;

        //节点起始位置
        var originItemIconX = nodeItemIcon.x;
        var originItemIconY = nodeItemIcon.y;
        
        nodeItemIcon.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (nodeItemIcon.getComponent(cc.Sprite).spriteFrame != null)
            {
                nodeItemIcon.opacity = 100;
                var delta = event.touch.getDelta();
                nodeItemIcon.x += delta.x;
                nodeItemIcon.y += delta.y;
                //nodeItemNum.active = false;
                //nodeItemNum.x += delta.x;
                //nodeItemNum.y += delta.y;
            }
            
        });
        nodeItemIcon.on(cc.Node.EventType.TOUCH_END, function () {
            nodeItemIcon.opacity = 255;
            //nodeItemNum.active = true;
            cc.log(self.isBoxing);
            if (self.isBoxing == true)
            {
                nodeItemIcon.x = originItemIconX;
                nodeItemIcon.y = originItemIconY;

                cc.log(self.node.parent.name);
                cc.log(self.nodeItemBoxing.parent.name);

                var itemNodeDataA = JSON.parse(cc.sys.localStorage.getItem(self.node.parent.name));
                var itemNodeDataB = JSON.parse(cc.sys.localStorage.getItem(self.nodeItemBoxing.parent.name));

                cc.sys.localStorage.setItem(self.node.parent.name, JSON.stringify(itemNodeDataB));
                cc.sys.localStorage.setItem(self.nodeItemBoxing.parent.name, JSON.stringify(itemNodeDataA));

                self.nodeItemBoxing.parent.getComponent('js_pfbPackItemTmp').init({
                    itemName: itemNodeDataA.itemName,
                    itemFrame: itemNodeDataA.itemFrameUrl,
                    itemIcon: itemNodeDataA.itemIconUrl,
                    itemNum: itemNodeDataA.itemNum
                });

                self.node.parent.getComponent('js_pfbPackItemTmp').init({
                    itemName: itemNodeDataB.itemName,
                    itemFrame: itemNodeDataB.itemFrameUrl,
                    itemIcon: itemNodeDataB.itemIconUrl,
                    itemNum: itemNodeDataB.itemNum
                });
            }
            else{
                //nodeItemIcon.x = originItemIconX;
                //nodeItemIcon.y = originItemIconY;
            }


        });
    },

    onCollisionEnter: function (other) {

        this.isBoxing = true;
        this.nodeItemBoxing = other.node;
    },
    
    onCollisionStay: function (other) {
        cc.log('on collision stay');
        this.isBoxing = true;
        this.nodeItemBoxing = other.node;
    },
    
    onCollisionExit: function () {
        this.isBoxing = false;
        //this.node.color = cc.Color.WHITE;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
