cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        
        
    },

    init: function (data) {

        //cc.log("data == "+JSON.stringify(data));

        this.itemName = data.itemName;

        //cc.log("data.itemFrameUrl == "+data.itemFrame);
        this.node.getChildByName('spPackItemBg').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(data.itemFrame);
        
        if (data.itemIcon != null)
        {
            this.node.getChildByName('btnPackItemIcon').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(data.itemIcon);
            this.node.getChildByName('btnPackItemIcon').getChildByName('lelPackItemNum').getComponent(cc.Label).string = data.itemNum;
            
        }
        else
        {
            this.node.getChildByName('btnPackItemIcon').getComponent(cc.Sprite).spriteFrame = null;
            this.node.getChildByName('btnPackItemIcon').getChildByName('lelPackItemNum').getComponent(cc.Label).string = null;
        }
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
