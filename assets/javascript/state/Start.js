/**
 * Created by stryker on 2014.03.22..
 */
define(['module/HUD'],function(HUD){
    var _game = null,
        _nextState = null,
        _activationKey = null;
    
    //Start State
    var _Start = {                    
        create: function(){
            //creating the titel screen
            HUD.createTitle(' 太空侵略者 \n 按下空格键开始');
            
            //Seeting up the Physics for the game
            _game.physics.startSystem(Phaser.Physics.ARCADE); 
            
            //Starting the next state(Play) after the spacebar is down
            _game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(function(){
                _game.state.start(_nextState);
            });                        
        }            
    }

    return{
        init: function(game,nextState){
            _game = game;
            _nextState = nextState;
        },
        getStartState: function(){
            return(_Start);
        }

    }
})