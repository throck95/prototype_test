var Moveable = {
    moveBy: function(x,y){
        this.x += x;
        this.y += y;
    }
};

var Animated = {
    update: function() {
        var date = new Date();
        var currentTime = date.getTime();
        var deltaTime = currentTime - this.lastUpdateTime;
        if(deltaTime >= 1000/this.fps) {
            this.lastUpdateTime = currentTime;
            if(this.isPlaying) {
                this.currentFrame++;
                if(this.currentFrame >= this.numberOfFrames) {
                    if(this.loop) {
                        this.currentFrame = 0;
                    }
                    else {
                        this.stop();
                        this.currentFrame--;
                    }
                }
            }
        }
    },
    play:function(fps,loop){
        this.fps = fps;
        this.loop = loop;
        this.isPlaying = true;
    },
    draw:function(graphics){
        graphics.save();
        graphics.translate(this.getCenterX(),this.getCenterY());
        graphics.rotate(this.angle);
        var sw = this.img.width/this.numberOfFrames;
        var sx = this.currentFrame * sw;
        var sy = 0;
        var sh = this.img.height;
        graphics.drawImage(this.img,sx,sy,sw,sh,-this.width/2, -this.height/2,
                                                                    this.width, this.height);
        graphics.rotate(-this.angle);
        graphics.translate(-this.getCenterX(),-this.getCenterY());
        graphics.restore();
    },
    stop: function(){
        this.isPlaying = false;
    },
    goToFrame: function(n){
        this.currentFrame = n;
    }

};

var Sprite = Class.create({
    initialize: function(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.strokeColor = "#000";
        this.fillColor = "#000";
        this.stroke = true;
        this.fill = false;
    },
    getCenterX: function()
    {
        return this.x + this.width/2;
    },
    getCenterY: function(){
        return this.y + this.height/2;
    },
    getCenter: function()
    {
        return {x: this.getCenterX(), y: this.getCenterY()};
    },
    drawBoundingBox: function(graphics){
        graphics.save();
        if( this.fill)
        {
            graphics.fillStyle = this.fillColor;
            graphics.fillRect(this.x, this.y, this.width, this.height);
        }
        if(this.stroke)
        {
            graphics.strokeStyle = this.strokeColor;
            graphics.strokeRect(this.x, this.y, this.width, this.height);
        }
        graphics.restore();
    }
});



var ImageSprite = Class.create(Sprite,{
    initialize: function($super,x,y,img){
        $super(x,y,img.width,img.height);
        this.img = img;
        this.angle = 0;
    },
    draw: function(graphics){
        graphics.save();
        graphics.translate(this.getCenterX(),this.getCenterY());
        graphics.rotate(this.angle);
        graphics.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
        graphics.rotate(-this.angle);
        graphics.translate(-this.getCenterX(),-this.getCenterY());
        graphics.restore();
    },
    setAngle: function(angle)
    {
        this.angle = angle * Math.PI/180;
    }

});

var MovingSprite = Class.create(Sprite,Moveable);
var MovingImageSprite = Class.create(ImageSprite, Moveable);
var AnimatedSprite = Class.create(Sprite,{
    initialize: function($super,x,y,img,numberOfFrames){
        $super(x,y,img.width/numberOfFrames,img.height);
        this.img = img;
        this.fps = 30;
        this.loop = true;
        this.currentFrame = 0;
        this.numberOfFrames = numberOfFrames;
        this.isPlaying = true;
        this.lastUpdateTime = (new Date()).getTime();
        this.angle = 0;
    },
    setAngle: function(angle)
    {
        this.angle = angle * Math.PI/180;
    }
},Animated);

var AnimatedMovingSprite = Class.create(AnimatedSprite,{
    initialize: function($super,x,y,img,numberOfFrames){
        $super(x,y,img,numberOfFrames);
    }
},Moveable);
























