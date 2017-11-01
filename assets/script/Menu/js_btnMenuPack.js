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

        pack: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.node.getComponent(cc.Button).node.on('click', this.callback, this);
    },

    callback: function (event) {
        //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 Button 组件
        var button = event.detail;
        cc.log("click..");
        
        if (this.pack.active == true)
        {
            this.pack.active = false;

        }
        else
        {
            this.pack.active = true;

        }
        
        //do whatever you want with button
        //另外，注意这种方式注册的事件，也无法传递 customEventData
     }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
