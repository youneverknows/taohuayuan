var ShortCutItem = cc.Class({
    name: 'ShortCutItem',
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
        items: {
            default: [],
            type: ShortCutItem
        },

        itemPrefab:{
            default:null,
            type:cc.Prefab
        },
    },

    // use this for initialization
    onLoad: function () {

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
