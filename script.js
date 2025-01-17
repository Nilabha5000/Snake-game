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
    constructor(head,x,y){
        this.x = x;
        this.y = y;
        this.head = head;
        this.size = 50;
    }
    
    isEaten(){
        return (
            this.head.x < this.x + this.size &&
            this.head.x + this.size > this.x &&
            this.head.y < this.y + this.size &&
            this.head.y + this.size > this.y
        );
    }

    update(){

        if(this.isEaten()){
            this.x = Math.floor(Math.random() * Window.width-50);
            this.y = Math.floor(Math.random() * (Window.height - 50) + 50);
            score++;
        }
    }
    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x ,this.y , 50 , 50);
    }
}

let snakeTail = [new SnakeBody(Window.width/2,Window.height/2,"green")];
let fruit = new Fruit(snakeTail[0],snakeTail[0].x, snakeTail[0].y-70);
document.addEventListener("keyup",(event)=>{
    switch(event.key){
        case 'w':
            snakeTail[0].velocityX = 0;
            snakeTail[0].velocityY = -2;
        break;
        case 's':
            snakeTail[0].velocityX = 0;
            snakeTail[0].velocityY = 2;
        break;
        case 'a':
            snakeTail[0].velocityX = -2;
            snakeTail[0].velocityY = 0;
        break;
        case 'd':
            snakeTail[0].velocityX = 2;
            snakeTail[0].velocityY = 0;
        break;

    }
});

function animate(){
    ctx.clearRect(0,0,Window.width, Window.height);
    ctx.fillStyle = "black";
    ctx.fillText("Score : "+score,10,30);
    snakeTail[0].update();
    snakeTail[0].draw();

    fruit.update();
    fruit.draw();
    requestAnimationFrame(animate);
}
animate();