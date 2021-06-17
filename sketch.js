let egg;
let hatch;
let poyomon;
let giveMeOrange;
let openedMouth;
let closedMouth;
let iLoveOrange;
let orange;
let mushroom;
let Tmad;
let full;
let hungry;
//이미지

let myTokomon;
let foods = [];

let stage = 0; //0;시작 1;게임 2;엔딩
let mouth = false;
// let numberM;
// let numberO;


function preload() {
    egg = loadImage('토코몬캡쳐/알.png');
    hatch = loadImage('토코몬캡쳐/깨진알.png');
    poyomon = loadImage('토코몬캡쳐/포요몬.png');
    giveMeOrange = loadImage('토코몬캡쳐/오렌지먹고싶어.png');
    openedMouth = loadImage('토코몬캡쳐/토코몬입벌려.png');
    closedMouth = loadImage('토코몬캡쳐/토코몬기본.png');
    iLoveOrange = loadImage('토코몬캡쳐/오렌지좋아.PNG');
    orange = loadImage('토코몬캡쳐/오렌지.PNG');
    mushroom = loadImage('토코몬캡쳐/독버섯.PNG');
    Tmad = loadImage('토코몬캡쳐/화남3.jpeg');
    full = loadImage('토코몬캡쳐/배부른토코몬.PNG');
    hungry = loadImage('토코몬캡쳐/배고픈토코몬.PNG');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    imageMode(CENTER);

    myTokomon = new Tokomon;

    for (let i = 0; i < 10; i++) {
        foods[i] = new Food(floor(random(2)));
        
    }
}

function draw() {
    background(255);
    let d = dist(mouseX, mouseY, windowWidth / 2, windowHeight / 2);

    if (stage == 0) {
        image(egg, windowWidth / 2, windowHeight / 2);
        textSize(20);
        text('start', windowWidth / 2 - 16, windowHeight / 2 + 100); //시작화면

        if (d < 100) {
            image(hatch, windowWidth / 2, windowHeight / 2);
            if (mouseIsPressed) {
                image(poyomon, windowWidth / 2, windowHeight / 2, 150, 150); //스타트 눌렀을 때
                stage = 1;
            }
        }
    } else if (stage == 1) {
        myTokomon.display();
        
        for (let i = 0; i < 10; i++) {
            foods[i].display();
            // foods[i].move();
            foods[i].mouseCheck();
        }
        // if(오렌지 다 먹으면){
        //     stage = 2;
        // }else if (시간 안에 오렌지 다 못 먹으면){
        //     stage = 3;
        // }
    } else if(stage == 2){
        image(full, windowWidth/2, windowHeight/2, windowWidth/1.5, windowHeight/1.5);
        textSize(20);
        text('배불러..', windowWidth/2-16, windowHeight*0.9)
    } else if(stage == 3){
        image(hungry, windowWidth/2, windowHeight/2, windowWidth/1.5, windowHeight/1.5);
        textSize(20);
        text('배고파..', windowWidth/2-16, windowHeight*0.9)
    }
}

function mousePressed(){
    if(stage == 1){
        for (let i = 0; i < 10; i++) {
            if(foods[i].overOrange = true){
                foods[i].foodPressed();
            }
        }
    }
}

function mouseDragged(){
    if(stage == 1){
        for (let i = 0; i < 10; i++) {
            if(foods[i].locked = true){
                foods[i].foodDragged();
            }
        }
    }
}

function mouseReleased(){
    if(stage == 1){
        for (let i = 0; i < 10; i++) {
            if(foods[i].locked = false){
                foods[i].foodReleased();
            }
        }
    }
}


//게임 시작하기
class Tokomon {
    constructor() {
        }
        
        display() {
            background(255);
            if (!mouth) {
                image(closedMouth, windowWidth / 2, windowHeight / 2, 200, 200);
            } else {
                image(openedMouth, windowWidth / 2, windowHeight / 2, 210, 250);
            }
        }
}


class Food {
    constructor(_kind) {
        this.kind = _kind;
        this.x = random(100, width - 100);
        this.y = random(100, height - 100);
        this.foodSize = 100;
        this.d;
        this.taken = false;

        this.xOffset = mouseX - this.x;
        this.yOffset = mouseY - this.y;
        this.overOrange = false;
        this.overMushroom = false;

        this.locked = false;

        this.takenM = false;
        this.takenO = false;

        //0 -> m, 1 -> O
        // if (this.kind == 0) {
        //     image(Tmad, windowWidth/2,windowHeight/2);
        // }
    }
    
    display() {
        if (!this.taken) {
            if (this.kind == 0) {
                image(mushroom, this.x, this.y, this.foodSize, this.foodSize);
            } else if(this.kind == 1){
                image(orange, this.x, this.y, this.foodSize, this.foodSize);
            }
        }
    }
    
    // move() {
    //     this.d = dist(mouseX, mouseY, this.x, this.y);
    //     this.dT = dist(mouseX, mouseY, width / 2, height / 2);
    //     if (this.d < 40) {
    //         if (mouseIsPressed) {
    //             this.x = mouseX;
    //             this.y = mouseY;
    //                 if (!this.taken && this.dT < 50) {
    //                     mouth = true;
    //                     this.taken = true;
    //                     if(this.kind == 0){
    //                         image(Tmad, windowWidth/2, windowHeight/2); //버섯 먹이면
    //                         // this.numberM -= 1;
    //                     }else if(this.kind == 1){
    //                         image(iLoveOrange, windowWidth/2, windowHeight/2, 200, 200); //오렌지 먹이면
    //                         // this.numberO -= 1;
    //                     }
    //                 } else {
    //                     mouth = false;
    //                 }
    //         }
    //     }
    // }

    mouseCheck() {
        this.d = dist(mouseX, mouseY, this.x, this.y);
        if (this.d < 40) {
            this.overOrange = true;
            if(!this.locked){
                this.foodSize = 120;
            }
        }else {
            this.foodSize = 100;
            this.overOrange = false;
        }
    }


    foodPressed(){
        this.dT = dist(mouseX, mouseY, width / 2, height / 2);

        if(this.overOrange = true){
            this.locked = true;
            this.foodSize = 120;  
            if (!this.taken && this.dT < 50) {
                mouth = true;
                this.taken = true;
                  if(this.kind == 0){
                     image(Tmad, windowWidth/2, windowHeight/2); //버섯 먹이면
                    //  this.numberM -= 1;
                 }else if(this.kind == 1){
                    image(iLoveOrange, windowWidth/2, windowHeight/2, 200, 200); //오렌지 먹이면
                    // this.numberO -= 1;
                   }
            } else {
                    mouth = false;
                }         
        }else{
            this.locked = false;
            this.foodSize = 100;
        }
    }

    foodDragged(){
        if(this.locked = true) {
            this.x = mouseX - this.xOffset;
            this.y = mouseY - this.yOffset;
            this.foodSize = 120;
        }
    }

    foodReleased(){
        this.locked = false;
        this.foodSize = 100;
    }

}