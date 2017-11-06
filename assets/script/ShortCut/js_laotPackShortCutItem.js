

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


        itemPrefab:{
            default:null,
            type:cc.Prefab
        },
    },

    // use this for initialization
    onLoad: function () {

        this.onInitItemList();
        
        this.onShowItemList();
        
    },
    onInitItemList: function () {
        var itemFrameUrl = cc.url.raw("resources/image/pack/PackItemFrame.png");
        var itemWebUrl = cc.url.raw("resources/image/pack/PackCobweb.png");
        var itemToolUrl = cc.url.raw("resources/image/pack/PackItemTools.png");

        this.packItemList = [];

        for (var index = 0; index <  SHORTCUT_ITEM_NUM; index++) {
            var element = {
                itemName: "",
                itemFrameUrl: itemFrameUrl,
                itemIconUrl: null,
                itemNum: ""
            };
            this.packItemList.push(element);
        }

        
        this.packItemList[4].itemName = "web";
        this.packItemList[4].itemIconUrl = itemWebUrl;
        this.packItemList[4].itemNum = "5";

        this.packItemList[1].itemName = "tool";
        this.packItemList[1].itemIconUrl = itemToolUrl;
        this.packItemList[1].itemNum = "9";
        

        cc.sys.localStorage.setItem("g_packItemNum", this.packItemList.length);
        for (var index = 0; index < this.packItemList.length; index++) {
            cc.sys.localStorage.setItem("g_packItemList" + (index + PACK_ITEM_NUM), JSON.stringify(this.packItemList[index]));
            cc.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + (index + PACK_ITEM_NUM));
        }

    },

    onShowItemList: function () {

        var itemNodeData = null;
        var g_packItemNum = cc.sys.localStorage.getItem("g_packItemNum");

        for (var index = PACK_ITEM_NUM; index < PACK_ITEM_NUM + SHORTCUT_ITEM_NUM; index++) {

            
            itemNodeData = JSON.parse(cc.sys.localStorage.getItem("g_packItemList" + index));
            var itemNode = cc.instantiate(this.itemPrefab);
            itemNode.name = "g_packItemList" + index;

            this.node.addChild(itemNode);

            itemNode.getComponent('js_pfbPackItemTmp').init({
                itemName: itemNodeData.itemName,
                itemFrame: itemNodeData.itemFrameUrl,
                itemIcon: itemNodeData.itemIconUrl,
                itemNum: itemNodeData.itemNum
            });

        }
        
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
