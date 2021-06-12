let egg;
let hatch;
let poyomon;
let giveMeOrange;
let openedMouth;
let closedMouth;
let iLoveOrange;
let orange;
let mushroom;
let Tmad1;
let Tmad2;
//이미지

let myTokomon;

let xO = [];
let yO = [];
let xM = [];
let yM = [];



function preload(){
    egg = loadImage('토코몬캡쳐/알.png');
    hatch = loadImage('토코몬캡쳐/깨진알.png');
    poyomon = loadImage('토코몬캡쳐/포요몬.png');
    giveMeOrange = loadImage('토코몬캡쳐/오렌지먹고싶어.png');
    openedMouth = loadImage('토코몬캡쳐/토코몬입벌려.png');
    closedMouth = loadImage('토코몬캡쳐/토코몬기본.png');
    iLoveOrange = loadImage('토코몬캡쳐/오렌지좋아.PNG');
    orange = loadImage('토코몬캡쳐/오렌지.PNG');
    mushroom = loadImage('토코몬캡쳐/독버섯.PNG');
    Tmad1 = loadImage('토코몬캡쳐/화남1.PNG');
    Tmad2 = loadImage('토코몬캡쳐/화남2.PNG');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    imageMode(CENTER);

    myTokomon = new Tokomon;
}

function draw() {
    background(255);
//     image(egg, windowWidth/2, windowHeight/2);
//     textSize(20);
//     text('start', windowWidth/2-16, windowHeight/2 + 100); //시작화면

//     let d = dist(mouseX, mouseY, windowWidth/2, windowHeight/2);
//     if(d<100){
//         image(hatch, windowWidth/2, windowHeight/2);
//         if(mouseIsPressed){
//             image(poyomon, windowWidth/2, windowHeight/2, 150, 150); //스타트 눌렀을 때
//         }
//     }
// }
            myTokomon.display();
            myTokomon.move();
}


//게임 시작하기 
class Tokomon{

    constructor(){
        for(let i=0; i<10; i++){
            xO[i] = random(100, width-100);
            yO[i] = random(100, height-100);
            xM[i] = random(100, width-100);
            yM[i] = random(100, height-100);

            this.dO = dist(mouseX, mouseY, xO[i], yO[i]);
            this.dM = dist(mouseX, mouseY, xM[i], yM[i]);
            this.dT = dist(mouseX, mouseY, windowWidth/2, windowHeight/2);
        }
    }
    
    display(){
        background(255);
        image(closedMouth, windowWidth/2, windowHeight/2, 200, 200);

        for(let i=0; i<10; i++){
            image(orange, xO[i], yO[i], 100, 100);
            image(mushroom, xM[i], yM[i], 100, 100);
        }
    }

    move(){

        if(this.dO < 50){
            if(mouseIsPressed){
                xO[i] = mouseX;
                yO[i] = mouseY;
                if(this.dT < 200){
                    image(openedMouth, windowWidth/2, windowHeight/2, 210, 250);

                }
            }
        }
    }
}


