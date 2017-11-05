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
    },

    // use this for initialization
    onLoad: function () {
        this.animation = this.node.getComponent(cc.Animation);
        this.sprite = this.node.getComponent(cc.Sprite); 
        this.tiledMap = this.node.parent.getComponent(cc.TiledMap);
        this.boxCollider = this.node.getComponent(cc.BoxCollider);
        this.node.group = "map";
        this.speed = 2;
        this.colliders = [];
        this.keyCode = null;
        this.isKeyDown = false;
        this.setInputControl();
    },
    onCollisionEnter: function (other, self) {
        var keyCode = this.keyCode;
        var tempPositon = this.node.getPosition();
        var rect1Pos = other.offset.add(other.node.getPosition());
        var rect2Pos = self.offset.add(self.node.getPosition());
        var colliderArea = this.calcCollisionArea(rect1Pos,other.size,rect2Pos,self.size);
        var collider = other;
        this.colliders.push(collider);
        switch(this.keyCode) {
            case cc.KEY.up:
                tempPositon.y -= colliderArea.y + 1;
                break;
            case cc.KEY.down:
                tempPositon.y += colliderArea.y + 1;
                break;
            case cc.KEY.left:
                tempPositon.x += colliderArea.x + 1;
                break;
            case cc.KEY.right:
                tempPositon.x -= colliderArea.x + 1;
                break;
        }
        this.node.setPosition(tempPositon);
        
        //cc.log("enter "+other.node.name);
        //cc.log(other.node.name + "collider area is "+colliderArea);
    },
    onCollisionStay: function (other, self) {

    },
    onCollisionExit: function (other, self) {
        for (var index = 0; index < this.colliders.length; index++) {
            var collider = this.colliders[index];
            if(collider.node.name == other.node.name){
                this.colliders.splice(index,1);
                //cc.log("remove "+other.node.name);
                return;
            } 
        }
    },
    calcCollisionArea:function(rect1,size1,rect2,size2) {
        rect1 = rect1.sub(new cc.Vec2(size1.width/2,size1.height/2));
        rect2 = rect2.sub(new cc.Vec2(size2.width/2,size2.height/2));
        var endx = Math.max(rect1.x + size1.width,rect2.x+size2.width);
        var startx = Math.min(rect1.x,rect2.x);
        var width = size1.width + size2.width - (endx - startx);

        var endy = Math.max(rect1.y + size1.height,rect2.y+size2.height);
        var starty = Math.min(rect1.y,rect2.y);
        var height = size1.height + size2.height - (endy - starty);

        return new cc.Vec2(width,height);
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
        this.nextPosition = this.node.getPosition();
        if(this.isKeyDown){
            switch(this.keyCode) {
                case cc.KEY.up:
                    this.nextPosition.y += this.speed;
                    break;
                case cc.KEY.down:
                    //this.node.rotation = 180;
                    this.nextPosition.y -= this.speed;
                    break;
                case cc.KEY.left:
                    //this.node.rotation = -90;
                    this.nextPosition.x -= this.speed;
                    break;
                case cc.KEY.right:
                    //this.node.rotation = 90;
                    this.nextPosition.x += this.speed;
                    break;
            }
            /* if(!this.isCollision){
                this.node.setPosition(this.nextPosition); 
                this.node.setLocalZOrder(this.realPosition2tilePosition(this.nextPosition).y);
            } */
            if(this.isNextPostionAccessible(this.nextPosition)){
                this.node.setPosition(this.nextPosition); 
                this.node.setLocalZOrder(this.realPosition2tilePosition(this.nextPosition).y);
            }
        }
        this.startOrStopAnimation();
    },
    isNextPostionAccessible(nextPosition){
        for (var index = 0; index < this.colliders.length; index++) {
            var collider = this.colliders[index];
            var otherPos = collider.offset.add(collider.node.getPosition());
            var selfPos = this.boxCollider.offset.add(nextPosition);
            var nextColliderArea = this.calcCollisionArea(otherPos,collider.size,selfPos,this.boxCollider.size);
            //cc.log(colliderInfo.collider.node.name + " collider next area is "+nextColliderArea);
            if(nextColliderArea.x > 0 || nextColliderArea.y > 0){
                return false;
            }
        }
        return true;
    },
    realPosition2tilePosition:function(position){
        var tempPositon = new cc.Vec2(position.x,position.y);
        var mapSize = this.tiledMap.getMapSize();
        var tileSize = this.tiledMap.getTileSize();
        tempPositon.x = tempPositon.x + mapSize.width*tileSize.width/2;
        tempPositon.y = tempPositon.y + mapSize.height*tileSize.height/2;
        var x = tempPositon.x / tileSize.width;
        var y = (mapSize.height*tileSize.height - tempPositon.y) / tileSize.height;
        return new cc.Vec2(x, y);
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
