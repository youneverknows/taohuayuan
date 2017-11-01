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
        // ..s'pe
        animation:{
            default:null,
            type:cc.Animation
        },
        sprite:{
            default:null,
            type:cc.Sprite
        },

    },

    // use this for initialization
    onLoad: function () {
        this.animation = this.node.getComponent(cc.Animation);
        this.sprite = this.node.getComponent(cc.Sprite); 
        this.speed = 3;
        this.keyCode = null;
        this.isKeyDown = false;
        this.setInputControl();
    },

    setInputControl:function(){
        var self = this;
        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event){
                self.keyCode = keyCode;
                self.isKeyDown = true;
                
            },
            onKeyReleased: function(keyCode, event){
                if(self.keyCode == keyCode){
                    self.isKeyDown = false;
                }
            }
        }, self.node);
    },
    updateMajorPosition:function(){
        var nextPosition = this.node.getPosition();
        if(this.isKeyDown){
            switch(this.keyCode) {
                case cc.KEY.up:
                    nextPosition.y += this.speed;
                    break;
                case cc.KEY.down:
                    //this.node.rotation = 180;
                    nextPosition.y -= this.speed;
                    break;
                case cc.KEY.left:
                    //this.node.rotation = -90;
                    nextPosition.x -= this.speed;
                    break;
                case cc.KEY.right:
                    //this.node.rotation = 90;
                    nextPosition.x += this.speed;
                    break;
             }
             this.node.setPosition(nextPosition); 
        }
        this.startOrStopAnimation();
    },
    startOrStopAnimation:function() {
        if(this.isKeyDown){
            switch(this.keyCode) {
                case cc.KEY.up:
                    if(!this.animation.getAnimationState("majorCharacterBack").isPlaying){
                        this.animation.play("majorCharacterBack");
                    }
                    break;
                case cc.KEY.down:
                    if(!this.animation.getAnimationState("majorCharacterFront").isPlaying){
                        this.animation.play("majorCharacterFront");
                    }
                    break;
                case cc.KEY.left:
                    if(!this.animation.getAnimationState("majorCharacterLeft").isPlaying){
                        this.animation.play("majorCharacterLeft");
                    }
                    break;
                case cc.KEY.right:
                    if(!this.animation.getAnimationState("majorCharacterRight").isPlaying){
                        this.animation.play("majorCharacterRight");
                    }
                    break;
            }
        }
        else if(this.isKeyDown == false){
            switch(this.keyCode) {
                case cc.KEY.up:
                    if(this.animation.getAnimationState("majorCharacterBack").isPlaying){
                        this.animation.stop("majorCharacterBack");
                    }
                    break;
                case cc.KEY.down:
                    if(this.animation.getAnimationState("majorCharacterFront").isPlaying){
                        this.animation.stop("majorCharacterFront");
                    }
                    break;
                case cc.KEY.left:
                    if(this.animation.getAnimationState("majorCharacterLeft").isPlaying){
                        this.animation.stop("majorCharacterLeft");
                    }
                    break;
                case cc.KEY.right:
                    if(this.animation.getAnimationState("majorCharacterRight").isPlaying){
                        this.animation.stop("majorCharacterRight");
                    }
                    break;
            }
            this.animation.setCurrentTime(0);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.updateMajorPosition();
    },
});
