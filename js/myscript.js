/**
 * Created by gibsond on 10/1/2015.
 */
var canvas;
var sprite1;
var imageSprite1;
var angle  = 0;
var animatedSprite1;
var skyDiverSheet = new Image();
var isLoaded = false;
var ams;

skyDiverSheet.onload = function()
{
    console.log(skyDiverSheet);
    animatedSprite1 = new AnimatedSprite(200,200,skyDiverSheet,8);
    animatedSprite1.play(120,true);
    ams = new AnimatedMovingSprite(0,0,skyDiverSheet,8);
    ams.play(15,true);
    isLoaded = true;
};
skyDiverSheet.src = "images/skydiver_sheet.png";

window.onload = function(){
    canvas = document.getElementById("canvas1");
    var ctx;
    if( canvas && canvas.getContext)
    {
        ctx = canvas.getContext("2d");
        if(ctx)
        {
            sprite1 = new Sprite(50,50,50,50);
            var skyDiverImage = document.getElementById("skyDiverImage");
            imageSprite1 = new MovingImageSprite(100,100,skyDiverImage);

            imageSprite1.width = 50;
            imageSprite1.height=50;
            imageSprite1.setAngle(45);
            sprite1.drawBoundingBox(ctx);
            sprite1.fill = true;
            sprite1.stroke = false;
            sprite1.fillColor="#ff00ff";
            imageSprite1.draw(ctx);

            function gameLoop() {
                window.requestAnimationFrame(gameLoop);
                angle++;
                ctx.clearRect(0,0,800,400);
                if(isLoaded)
                {
                    console.log(animatedSprite1.fps);
                    animatedSprite1.draw(ctx);
                    ams.moveBy(1,1);
                    ams.setAngle(angle);
                    ams.update();
                    ams.draw(ctx);
                }
                sprite1.drawBoundingBox(ctx);
                imageSprite1.setAngle(angle);
                imageSprite1.moveBy(1,1);
                if( imageSprite1.x > 800 || imageSprite1.y > 400)
                {
                    imageSprite1.x = -imageSprite1.width;
                    imageSprite1.y = -imageSprite1.height;
                }
                imageSprite1.draw(ctx);
            }
            gameLoop();
        }
    }
};











