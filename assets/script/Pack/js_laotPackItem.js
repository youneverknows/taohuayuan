

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

        itemPrefab: {
            default: null,
            type: cc.Prefab
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

        for (var index = 0; index < PACK_ITEM_NUM; index++) {
            var element = {
                itemName: "",
                itemFrameUrl: itemFrameUrl,
                itemIconUrl: null,
                itemNum: ""
            };
            this.packItemList.push(element);
        }

        
        this.packItemList[0].itemName = "web";
        this.packItemList[0].itemIconUrl = itemWebUrl;
        this.packItemList[0].itemNum = "30";

        this.packItemList[1].itemName = "tool";
        this.packItemList[1].itemIconUrl = itemToolUrl;
        this.packItemList[1].itemNum = "10";

        /*this.packItemList = [
            {
                itemFrom: 'pack',
                itemName: 'web',
                itemFrameUrl: itemFrameUrl,
                itemIconUrl: itemWebUrl,
                itemNum: "5"
            },
            {
                itemFrom: 'pack',
                itemName: 'tool',
                itemFrameUrl: itemFrameUrl,
                itemIconUrl: itemToolUrl,
                itemNum: "10"
            },
            {
                itemFrom: 'pack',
                itemName: 'web',
                itemFrameUrl: itemFrameUrl,
                itemIconUrl: itemWebUrl,
                itemNum: "15"
            },
            {
                itemFrom: 'pack',
                itemName: 'tool',
                itemFrameUrl: itemFrameUrl,
                itemIconUrl: null,
                itemNum: ""
            },
            {
                itemFrom: 'pack',
                itemName: 'web',
                itemFrameUrl: itemFrameUrl,
                itemIconUrl: itemToolUrl,
                itemNum: "25"
            },
            {
                itemFrom: 'pack',
                itemName: 'tool',
                itemFrameUrl: itemFrameUrl,
                itemIconUrl: itemWebUrl,
                itemNum: "30"
            }
        ];*/

        cc.sys.localStorage.setItem("g_packItemNum", this.packItemList.length);
        for (var index = 0; index < this.packItemList.length; index++) {
            cc.sys.localStorage.setItem("g_packItemList" + index, JSON.stringify(this.packItemList[index]));
        }

    },

    onShowItemList: function () {

        var itemNodeData = null;
        var g_packItemNum = cc.sys.localStorage.getItem("g_packItemNum");

        for (var index = 0; index < g_packItemNum; index++) {

            //获取此节点的渲染相关信息
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

    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
