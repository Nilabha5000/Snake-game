const Window = document.getElementById("window");
const ctx = Window.getContext('2d');
Window.width = 1000;
Window.height = 700;
ctx.font = '30px Arial'; // Font size and family
ctx.textAlign = 'left'; // Align text to the left
let score = 0;

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
                this.y = Math.floor(Math.random() * (Window.height - 50)) + 50;
            } while (this.Sbody.some(segment => 
                segment.x < this.x + this.size &&
                segment.x + this.size > this.x &&
                segment.y < this.y + this.size &&
                segment.y + this.size > this.y
            ));
            let lastSegment = this.Sbody[this.Sbody.length-1];
            let obj = new SnakeBody(lastSegment.x,lastSegment.y,"green");
            if(lastSegment.velocityX === -2){
                obj.x = lastSegment.x-50;
            }
            else if(lastSegment.velocityX === 2){
                obj.x = lastSegment.x+50;
            }
            else if(lastSegment.velocityY === -2){
                obj.y = lastSegment.y-50;
            }
            else if(lastSegment.velocityY === 2){
                obj.y = lastSegment.y+50;
            }
            obj.velocityX = lastSegment.velocityX;
            obj.velocityY = lastSegment.velocityY;
            this.Sbody.push(obj);
            score++;
        }
    }
    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x ,this.y , 50 , 50);
    }
}

let snakeTail = [new SnakeBody(Window.width/2,Window.height/2,"blue")];
let fruit = new Fruit(snakeTail,snakeTail[0].x, snakeTail[0].y-70);

function updateSnakeBody(){
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
        updateSnakeBody();
    }
    switch(event.key){
        case 'w':
           
               
               head.velocityX = 0;
               head.velocityY = -2;
           
        break;
        case 's':
                head.velocityX = 0;
                head.velocityY = 2;
            break;

           
        case 'a':
                head.velocityX = -2;
                head.velocityY = 0;
            
        break;
        case 'd':
                head.velocityX = 2;
                head.velocityY = 0;
            
        break;

    }
});

function animate(){
    ctx.clearRect(0,0,Window.width, Window.height);
    ctx.fillStyle = "black";
    ctx.fillText("Score : "+score,10,30);
   snakeTail[0].update();
    snakeTail.forEach((segment)=>{
        segment.draw();
    });

    fruit.update();
    fruit.draw();
    requestAnimationFrame(animate);
}
animate();

//What is the problem in this code?