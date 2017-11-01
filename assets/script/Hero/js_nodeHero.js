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
        pgsHeroHpBar: {
            type: cc.ProgressBar,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        this.node.getChildByName("lbeHeroLevel").getComponent(cc.Label).string  = "Lv:9999";
        this.pgsHeroHpBar.progress = 0.0;
        // this.node.getChildByName("pgsHeroHp").progress = 0.8;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.pgsHeroHpBar.progress < 1)
        {
            this.pgsHeroHpBar.progress += 0.01;
        }
        else
        {
            this.pgsHeroHpBar.progress = 0;
        }
    },
});
