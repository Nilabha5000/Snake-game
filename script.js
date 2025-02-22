const Window = document.getElementById("window");
const ctx = Window.getContext('2d');
Window.width = 1000;
Window.height = 700;
ctx.font = '30px Arial'; // Font size and family
ctx.textAlign = 'left'; // Align text to the left
let score = 0;
const eatSound = new Audio("sound/eat.mp3");
class SnakeBody{
    constructor(x,y ,color){
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.color = color;
    }
    update(){
       
        this.x += this.velocityX;
        this.y += this.velocityY;
        if(this.x < 0)
            this.x = 0;
        if(this.y < 50)
            this.y = 50;
        if(this.y > (Window.height-50))
            this.y = (Window.height-50);
        if(this.x > (Window.width-50))
            this.x = (Window.width-50);
        
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x ,this.y , 50 , 50);
    }
      
}

class Fruit{
    constructor(Sbody,x,y){
        this.x = x;
        this.y = y;
        this.Sbody = Sbody;
        this.size = 50;
    }
    
    isEaten(){
        return (
            this.Sbody[0].x < this.x + this.size &&
            this.Sbody[0].x + this.size > this.x &&
            this.Sbody[0].y < this.y + this.size &&
            this.Sbody[0].y + this.size > this.y
        );
    }

    update(){

        if(this.isEaten()){
            do {
                this.x = Math.floor(Math.random() * (Window.width - 50));
                this.y = Math.floor(Math.random() * (Window.height - 50));
            } while (this.Sbody.some(segment => 
                segment.x < this.x + this.size &&
                segment.x + this.size > this.x &&
                segment.y < this.y + this.size &&
                segment.y + this.size > this.y
            ));
            let lastSegment = this.Sbody[this.Sbody.length-1];
            let obj = new SnakeBody(lastSegment.x,lastSegment.y,"skyblue");
            if(lastSegment.velocityX === -35){
                obj.x = lastSegment.x-50;
            }
            else if(lastSegment.velocityX === 35){
                obj.x = lastSegment.x+50;
            }
            else if(lastSegment.velocityY === -35){
                obj.y = lastSegment.y-50;
            }
            else if(lastSegment.velocityY === 35){
                obj.y = lastSegment.y+50;
            }
            obj.velocityX = lastSegment.velocityX;
            obj.velocityY = lastSegment.velocityY;
            this.Sbody.push(obj);
            score++;
            eatSound.play();
        }

    }
    draw(){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(
            this.x + this.size / 2,
            this.y + this.size / 2, 
            this.size / 2,          
            0,                     
            Math.PI * 2             
        );
        ctx.fill();
    }
}

let snakeTail = [new SnakeBody(Window.width/2,Window.height/2,"blue")];
let fruit = new Fruit(snakeTail,snakeTail[0].x+400, snakeTail[0].y-200);

function updateSnakeBody(){
    let head = snakeTail[0];
    for(let i = snakeTail.length-1; i > 0; --i){
        snakeTail[i].x = snakeTail[i - 1].x;
        snakeTail[i].y = snakeTail[i - 1].y;

        snakeTail[i].velocityX = snakeTail[i-1].velocityX;
        snakeTail[i].velocityY = snakeTail[i-1].velocityY;
    }
}
window.addEventListener("keyup",(event)=>{
    let head = snakeTail[0];
    if(event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd'){
        head.update();
        updateSnakeBody();
    }
    switch(event.key){
        case 'w':
           
            if(head.velocityY === 0){
               head.velocityX = 0;
               head.velocityY = -35;
           }
           
        break;
        case 's':
            if(head.velocityY === 0){
                head.velocityX = 0;
                head.velocityY = 35;
            }
                
            break;

           
        case 'a':
            if(head.velocityX === 0){
                head.velocityX = -35;
                head.velocityY = 0;
            }
            
        break;
        case 'd':
            if(head.velocityX === 0){
                head.velocityX = 35;
                head.velocityY = 0;
            }
               
            
        break;

    }
});
function checkCollision() {
    let head = snakeTail[0];
    for (let i = 1; i < snakeTail.length; i++) {
        if (head.x < snakeTail[i].x + 50 &&
            head.x + 50 > snakeTail[i].x &&
            head.y < snakeTail[i].y + 50 &&
            head.y + 50 > snakeTail[i].y) {
        }
    }
}
function animate(){
    ctx.clearRect(0,0,Window.width, Window.height);
    ctx.fillStyle = "black";
    ctx.fillText("Score : "+score,10,30);

    for(let i = 1; i < snakeTail.length; ++i)
          snakeTail[i].draw();
    snakeTail[0].draw();
    //if(snakeTail.length > 50)
      checkCollision();
    fruit.update();
    fruit.draw();
    requestAnimationFrame(animate);
}
animate();