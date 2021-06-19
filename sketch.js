let egg;
let hatch;
let giveMeOrange;
let openedMouth;
let closedMouth;
let iLoveOrange;
let orange;
let mushroom;
let Tmad;
let full;
let hungry;
let looksGood;
//이미지

let myTokomon;
let foods = []; 
//class

let stage = 0; //0;시작 1;인트로화면3초 2; 게임화면 3;배부른엔딩 4;배고픈엔딩
let mouth = false;
let startClick = false;

let totalO = 0;
let countO = 0;

let timer = 15;
let rnd;

function preload() {
    egg = loadImage('토코몬캡쳐/알.png');
    hatch = loadImage('토코몬캡쳐/깨진알.png');
    giveMeOrange = loadImage('토코몬캡쳐/오렌지먹고싶어.png');
    openedMouth = loadImage('토코몬캡쳐/토코몬입벌려.png');
    closedMouth = loadImage('토코몬캡쳐/토코몬기본.png');
    iLoveOrange = loadImage('토코몬캡쳐/오렌지좋아.PNG');
    orange = loadImage('토코몬캡쳐/오렌지.PNG');
    mushroom = loadImage('토코몬캡쳐/독버섯.PNG');
    Tmad = loadImage('토코몬캡쳐/화남3.jpeg');
    full = loadImage('토코몬캡쳐/배부른토코몬.PNG');
    hungry = loadImage('토코몬캡쳐/배고픈토코몬.PNG');
    looksGood = loadImage('토코몬캡쳐/오렌지먹고싶어.PNG');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // background(255);
    imageMode(CENTER);

    myTokomon = new Tokomon;

    for (let i = 0; i < 10; i++) {
        rnd = floor(random(2));

        if (rnd > 0) {
            totalO++;
        }
        foods[i] = new Food(rnd);
    }
    console.log(totalO);
}

function draw() {
    background(255);
    textSize(20);
    textAlign(CENTER, CENTER)
    let d = dist(mouseX, mouseY, windowWidth / 2, windowHeight / 2);

    if (stage == 0) {
        image(egg, windowWidth / 2, windowHeight / 2);
        text('부화하고 싶다..', windowWidth / 2, windowHeight / 2 + 100); //시작화면

        if (d < 100) {
            image(hatch, windowWidth / 2, windowHeight / 2);
            if (mouseIsPressed) {
                background(255);
                image(closedMouth, windowWidth / 2, windowHeight / 2, 150, 150); //스타트 눌렀을 때
                text('아싸!', windowWidth / 2, windowHeight / 2 + 100);
                startClick = true;
            }
        }
        if(!mouseIsPressed && startClick){
            stage = 1; 
        }

    } else if (stage == 1) {
        image(looksGood, windowWidth/2, windowHeight/2, 800, 600);
        textSize(30);
        text('오렌지..맛있겠다..', windowWidth/3, windowHeight/2 + 80);
        setTimeout(goToStage2, 3000);

    } else if (stage == 2) { //게임화면
        myTokomon.display();
        gameTime();
        for (let i = 0; i < 10; i++) {
            if (!foods[i].taken) {
                foods[i].display();
            }
            foods[i].move();
        }
        //if(countO == totalO){
            //
        // }
        
        // if(오렌지 다 먹으면){
        //     stage = 3;
        // }

    } else if (stage == 3) {
        image(full, windowWidth / 2, windowHeight / 2, 800, 500);
        textSize(30);
        text('배불러..', windowWidth / 2, windowHeight * 0.9);
    } else if (stage == 4) {
        image(hungry, windowWidth / 2, windowHeight / 2,800, 500);
        textSize(30);
        text('배고파..', windowWidth / 2, windowHeight * 0.9);
    }
}

function goToStage2() {
    stage = 2;
}

function gameTime() {
    textSize(20);
    text("밥시간", windowWidth/2, windowHeight/10 - 25);
    text(timer, windowWidth/2, windowHeight/10);
    if(frameCount % 60 == 0 && timer > 0){
        timer --;
    }
    if(timer == 0){
        stage = 4;
    }
}


//게임 시작하기
class Tokomon {
    constructor() {}

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
        this.kind = _kind;  //0 -> 버섯, 1 -> 오렌지
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

        this.isPressed = false;

    }

    display() {
        if (!this.taken) {
            if (this.kind == 0) {
                image(mushroom, this.x, this.y, this.foodSize, this.foodSize);
            } else if (this.kind == 1) {
                image(orange, this.x, this.y, this.foodSize, this.foodSize);
            }
        }
    }

    move() {
        this.d = dist(mouseX, mouseY, this.x, this.y);
        this.dT = dist(mouseX, mouseY, width / 2, height / 2);
        if (this.d < 40) { //food에 마우스 올리면
            this.foodSize = 110;
            if (mouseIsPressed) { //food누르면
                this.x = mouseX;
                this.y = mouseY;
                this.foodSize = 125;
                if (this.dT < 50) { //food를 토코몬에 가져다대면
                    mouth = true;
                    this.isPressed = true;
                } else {
                    mouth = false;
                }
            } else {
                this.foodSize = 110;
            }
        } else {
            this.foodSize = 100;
        }

        if (!mouseIsPressed && this.isPressed && this.dT < 50) { //food를 토코몬에서 놓으면
            this.taken = true;
            mouth = false;
            if (this.kind == 0) { //버섯 먹이면
                image(Tmad, windowWidth/2, windowHeight/2, 300, 300); 
            } else if (this.kind == 1) { //오렌지 먹이면
                image(iLoveOrange, windowWidth/2, windowHeight/2, 300, 300);
                countO ++;
            }


        }
    }

}
