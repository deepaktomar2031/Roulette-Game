window.onload = function () {
    if (Phaser) {

        var wheel,ball;
        
        var game = new Phaser.Game(800, 600, Phaser.AUTO, "gameContainer", {
            init: function () {
                console.log("Phaser state init is called!!");
                game.state.disableVisibilityChange = false;
                game.scaleAlignHorizontally = true;
                game.scaleAlignVertivally = true;
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                game.scale.fullScreenTarget = game.canvas.parent;
            },

            preload: function () {
                console.log("Phaser state preload is called!!");
                var loadBar = document.getElementById("progressBar");
                var loadPercent = document.getElementById("progressPercent");
                var loaderDiv = document.getElementById("loader");

                game.load.onFileComplete.add(function (progress) {
                    loadBar.style.width = progress + "%";
                    loadPercent.innerHTML = progress + "%";
                });

                game.load.onLoadComplete.add(function () {
                    loaderDiv.style.display = "none";
                });

                game.load.image("base", "assets/Wheel_Base.png");
                game.load.image("wheel", "assets/Wheel.png");
                game.load.image("frame", "assets/Outer_Frame.png");
                game.load.image("ball", "assets/Ball.png");                
                game.load.bitmapFont("normal", "assets/Normal_Value.png", "assets/Normal_Value.fnt");
                game.load.atlasJSONHash("buttons", "assets/Base_Sprite.png", "assets/Base_Sprite.json");
                game.load.spritesheet("dove", "assets/Dove.png", 182, 162, 23, 0, 2);
            },

            create: function () {
                console.log("Phaser state create is called!!");
                var base = game.add.image(game.world.centerX, game.world.centerY, "base");
                base.anchor.set(0.5);

                wheel = game.add.image(game.world.centerX, game.world.centerY, "wheel");
                wheel.anchor.set(0.5);

                var frame = game.add.image(game.world.centerX, game.world.centerY, "frame");
                frame.anchor.set(0.5);

                ball = game.add.image(game.world.centerX, game.world.centerY, "ball");
                ball.anchor.set(0.5);
                ball.pivot.set(250, 0);

                var button = game.add.button(0, 0, "buttons", function () {
                    if (game.scale.isFullScreen) {
                        game.scale.stopFullScreen();
                    } else {
                        game.scale.startFullScreen();
                    }
                }, this, "Feature_btn_Over.png", "Feature_btn_normal.png", "Feature_btn_Down.png");
                button.hitArea = new Phaser.Circle(button.centerX,button.centerY,125);
            
                var btnpause = game.add.button(200, 0, "buttons", function () {
                    game.paused = !game.paused;
                }, this, "Pro_Over.png", "Pro_Normal.png", "Pro_Down.png");
            
                var statusText = game.add.bitmapText(game.world.centerX, game.world.centerY, "normal", "Status", 50);
                statusText.anchor.set(0.5);
                statusText.visible = false;

                game.onPause.add(function () {
                    console.log("Game Paused");
                    statusText.text = "Game Paused";
                    statusText.visible = true;
                });

                game.onResume.add(function () {
                    console.log("Game Resumed");
                    statusText.text = "Game Resumed";
                    statusText.visible = true;

                    // game.add.tween(statusText).to({
                    //     alpha: 0,
                    //     angle: 359
                    // }, 1000, Phaser.Easing.Cubic.Out, true, 1000, 0, false);
                    game.add.tween(statusText.scale).to({
                        x: 0,
                        y: 0
                    }, 1000, Phaser.Easing.Cubic.Out, true, 1000, 0, false)
                        .onComplete.addOnce(() => {
                            statusText.visible = false;
                            // statusText.alpha = 1;
                            // statusText.angle = 0;
                            // statusText.scale.set(1);
                        });
                });
            },

            update: function () {
                console.log("Phaser state update is called!!");

                wheel.angle += 1;
                if (ball.pivot.x > 125) {
                    ball.angle -= 2;
                    ball.pivot.x -= 0.1;
                } else {
                    ball.angle += 1;
                }
            }
        })
    }
}