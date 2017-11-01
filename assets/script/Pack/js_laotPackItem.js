var PackItem = cc.Class({
    name: 'PackItem',
    properties: {
        itemName: '',
        itemFrame: cc.SpriteFrame,
        itemIcon: cc.SpriteFrame,
        itemNum: 0
    }
});

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
        //itemPrefab: cc.Prefab,
        items: {
            default: [],
            type: PackItem
        },

        itemPrefab:{
            default:null,
            type:cc.Prefab
        },

    },

    // use this for initialization
    onLoad: function () {
        //var itemPrefabTmp = cc.instantiate(this.t_prefab);
        //itemPrefabTmp.getChildByName("lelPackItemNum").getComponent(cc.Label).string  = 10;
        //itemPrefabTmp.getChildByName("btnPackItem").getComponent(cc.Sprite).spriteFrame.setTexture(cc.url.raw('res/Pack/btnPackCobweb.png')); 
        //itemPrefabTmp.parent = this.node;
        //this.node.addChild(itemPrefabTmp);

        //var itemPrefabTmp1 = cc.instantiate(this.t_prefab);
        //itemPrefabTmp1.getChildByName("lelPackItemNum").getComponent(cc.Label).string  = 30;
        //itemPrefabTmp1.getChildByName("btnPackItem").getComponent(cc.Sprite).spriteFrame.setTexture(cc.url.raw('res/Pack/btnPackItem.png')); 
        //itemPrefabTmp1.parent = this.node;
        
        // 加载 SpriteFrame
        /*var self = this;
        var loadPackFrame;
        var loadPackIcon1;
        var loadPackIcon2;
        cc.loader.loadRes("pack/PackItemFrame", cc.SpriteFrame, function (err, spriteFrame) {
            //self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            if(err) 
                return cc.log("load failed" + err);
            loadPackFrame = spriteFrame;
        });

        cc.loader.loadRes("pack/PackItemTools", cc.SpriteFrame, function (err, spriteFrame) {
            //self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            if(err) 
                return cc.log("load failed" + err);
            loadPackIcon1 = spriteFrame;
        });

        cc.loader.loadRes("pack/PackCobweb", cc.SpriteFrame, function (err, spriteFrame) {
            //self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            if(err) 
                return cc.log("load failed" + err);
            loadPackIcon2 = spriteFrame;
        });    
        
        this.items = new Array(16);
        cc.log("num "+ this.items.length);

        for(var i = 0; i < 16; ++i){
            var itemtmp = new Item;
            
            this.items[i].itemName = i;
            this.items[i].itemNum = i;
            this.items[i].itemFrame = loadPackFrame;
            if (i % 2 == 0){
                this.items[i].itemIcon = loadPackIcon1;
            }
            else{
                this.items[i].itemIcon = loadPackIcon2;
            }
        }*/

        for (var i = 0; i < this.items.length; ++i) {
            var item = cc.instantiate(this.itemPrefab);
            var data = this.items[i];
            if (data.itemIcon == null){
                item.getChildByName('btnPackItemIcon').active = false;
                item.getChildByName('lelPackItemNum').active = false;
            }

            this.node.addChild(item);
            item.getComponent('js_pfbPackItemTmp').init({
                itemName: data.itemName,
                itemFrame: data.itemFrame,
                itemIcon: data.itemIcon,
                itemNum: data.itemNum
            });
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
