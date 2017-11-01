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

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.opacity = 100;
            var delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.opacity = 255;
        }, this.node);

        this.node.active = false;
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
