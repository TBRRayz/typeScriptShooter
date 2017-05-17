var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Ball = (function () {
    function Ball(l, p) {
        this.level = l;
        this.player = p;
        this.div = document.createElement("ball");
        this.level.div.appendChild(this.div);
        this.x = this.player.x + 20;
        this.y = this.player.y;
        this.width = 20;
        this.height = 20;
        this.speed = 5;
        this.alive = true;
    }
    Ball.prototype.update = function () {
        this.y -= this.speed;
        this.draw();
    };
    Ball.prototype.hitDragon = function () {
        console.log('hit');
        if (this.alive) {
            this.level.div.removeChild(this.div);
            this.alive = false;
        }
    };
    Ball.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Ball;
}());
var Dragons = (function () {
    function Dragons(l) {
        this.level = l;
        this.alive = true;
        this.x = Math.floor(Math.random() * 916) + 1;
        this.y = -108;
        this.width = 120;
        this.height = 60;
    }
    Dragons.prototype.update = function () {
        this.draw();
        this.y = this.y + this.speed;
        if (this.y > 1000) {
            if (this.alive == true) {
                this.level.div.removeChild(this.div);
                this.level.lives = this.level.lives - 1;
                this.alive = false;
            }
        }
    };
    Dragons.prototype.dragonHit = function () {
        console.log("hoi");
        if (this.alive == true) {
            this.level.div.removeChild(this.div);
            this.level.points++;
            this.alive = false;
        }
    };
    Dragons.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Dragons;
}());
var dragonRed = (function (_super) {
    __extends(dragonRed, _super);
    function dragonRed(l) {
        _super.call(this, l);
        this.speed = 2;
        this.div = document.createElement("dragonred");
        this.level.div.appendChild(this.div);
    }
    return dragonRed;
}(Dragons));
var dragonBlue = (function (_super) {
    __extends(dragonBlue, _super);
    function dragonBlue(l) {
        _super.call(this, l);
        this.speed = 3;
        this.div = document.createElement("dragonblue");
        this.level.div.appendChild(this.div);
    }
    return dragonBlue;
}(Dragons));
var DragonGreen = (function (_super) {
    __extends(DragonGreen, _super);
    function DragonGreen(l) {
        _super.call(this, l);
        this.speed = 4;
        this.div = document.createElement("dragongreen");
        this.level.div.appendChild(this.div);
    }
    return DragonGreen;
}(Dragons));
var View = (function () {
    function View(g) {
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        this.button = document.createElement("btn");
        this.div.appendChild(this.button);
    }
    return View;
}());
var EndView = (function (_super) {
    __extends(EndView, _super);
    function EndView(g) {
        _super.call(this, g);
        this.game = g;
        this.button.innerHTML = "click F5 voor restart";
        this.button.addEventListener("click", this.onClick.bind(this));
    }
    EndView.prototype.onClick = function () {
        this.removeView();
        this.game.showLevelView();
    };
    EndView.prototype.removeView = function () {
        this.div.remove();
    };
    return EndView;
}(View));
var Player = (function () {
    function Player(l) {
        var _this = this;
        this.directionX = 0;
        this.directionY = 0;
        this.speed = 0;
        this.level = l;
        this.div = document.createElement("player");
        this.level.div.appendChild(this.div);
        this.directionX = 0;
        this.directionY = 0;
        this.speed = 5;
        this.x = 400;
        this.y = 640;
        this.width = 61;
        this.height = 102;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 39:
                this.directionX = 1;
                break;
            case 37:
                this.directionX = -1;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 39:
                this.directionX = 0;
                break;
            case 37:
                this.directionX = 0;
                break;
        }
    };
    Player.prototype.move = function () {
        this.x = this.x + this.speed * this.directionX;
        this.y = this.y + this.speed * this.directionY;
    };
    Player.prototype.update = function () {
        if (this.x <= 0) {
            this.speed = 0;
            this.x = 1;
        }
        else if (this.x >= 960) {
            this.speed = 0;
            this.x = 959;
        }
        else {
            this.speed = 5;
        }
    };
    Player.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Player;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.hasOverlap = function (c1, c2) {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    };
    return Utils;
}());
var Level = (function () {
    function Level(g) {
        var _this = this;
        this.dragonsArry = new Array();
        this.ballArry = new Array();
        this.game = g;
        this.div = document.createElement("level");
        document.body.appendChild(this.div);
        this.pointsText = document.createElement("text");
        document.body.appendChild(this.pointsText);
        this.livesText = document.createElement("text2");
        document.body.appendChild(this.livesText);
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        this.playBal = false;
        this.utils = new Utils();
        this.dragonCount = 0;
        this.intervalTime = 2000;
        this.points = 0;
        this.lives = 10;
        this.shoot = true;
        this.timeid = setInterval(this.createDragon.bind(this), this.intervalTime);
        this.player = new Player(this);
    }
    Level.prototype.createDragon = function () {
        this.random = Math.floor(Math.random() * 3) + 1;
        if (this.random <= 1) {
            this.dragonsArry.push(new dragonRed(this));
        }
        else if (this.random > 2) {
            this.dragonsArry.push(new DragonGreen(this));
        }
        else {
            this.dragonsArry.push(new dragonBlue(this));
        }
        this.dragonCount++;
        console.log(this.random);
    };
    Level.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 32:
                if (this.shoot == true) {
                    this.shootBall();
                    this.shoot = false;
                }
                break;
        }
    };
    Level.prototype.shootBall = function () {
        this.ballArry.push(new Ball(this, this.player));
        if (this.playBal == false) {
            this.playBal = true;
        }
    };
    Level.prototype.update = function () {
        this.player.move();
        this.player.update();
        this.pointsText.innerHTML = "points: " + this.points + "";
        this.livesText.innerHTML = "lives: " + this.lives + "";
        if (this.shoot == false) {
            this.shoot = true;
        }
        if (this.lives <= 0) {
            this.removeView();
            this.game.showEndView();
        }
        for (var i = 0; i < this.dragonsArry.length; i++) {
            this.dragonsArry[i].update();
        }
        if (this.playBal == true) {
            for (var i = 0; i < this.ballArry.length; i++) {
                this.ballArry[i].update();
            }
        }
        for (var i = 0; i < this.dragonsArry.length; i++) {
            for (var _i = 0, _a = this.ballArry; _i < _a.length; _i++) {
                var b = _a[_i];
                if (this.utils.hasOverlap(b, this.dragonsArry[i])) {
                    this.dragonsArry[i].dragonHit();
                }
            }
        }
    };
    Level.prototype.draw = function () {
        this.player.draw();
    };
    Level.prototype.removeView = function () {
        this.div.remove();
    };
    return Level;
}());
var Game = (function () {
    function Game() {
        this.level = new Level(this);
        this.showStartView();
    }
    Game.prototype.showStartView = function () {
        this.currentView = new StartView(this);
    };
    Game.prototype.showLevelView = function () {
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.gameLoop = function () {
        this.level.update();
        this.level.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.showEndView = function () {
        cancelAnimationFrame(this.gameLoop.bind(this));
        this.currentView = new EndView(this);
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var StartView = (function (_super) {
    __extends(StartView, _super);
    function StartView(g) {
        _super.call(this, g);
        this.game = g;
        this.button.innerHTML = "START DE GAME!";
        this.button.addEventListener("click", this.onClick.bind(this));
    }
    StartView.prototype.onClick = function () {
        this.removeView();
        this.game.showLevelView();
    };
    StartView.prototype.removeView = function () {
        this.div.remove();
    };
    return StartView;
}(View));
//# sourceMappingURL=main.js.map