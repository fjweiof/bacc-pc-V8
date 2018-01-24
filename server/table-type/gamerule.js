const inspect=require('util').inspect;

var shuffle = require('gy-shuffle'),
    baccaratHand = require('./baccarat-hand'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');
var pThirdCard = -1;
var playerThirdCard;

var debugout=require('debugout')(require('yargs').argv.debugout);

var shoe;

function Game() {
  EventEmitter.call(this);

  var game = this;
  this.onPlayerInputNeeded;
  this.onEnd;
  this.player=new baccaratHand();
  this.banker=new baccaratHand();

  var handsPlayed = 0;

//   this.begin = function() {
//    while(shoe.length >= 14) {
//      console.log("-----------------");
//      handsPlayed++;
//      banker = new baccaratHand();
//      player = new baccaratHand();
//      shoe.deal(2, [player, banker]);
//      displayGameStatus();
//      checkNaturals();
//      console.log("-----------------");
//    }
  
//    console.log("Hands Played : " + handsPlayed);
//    this.emit('end');
//   };

  this.begin = function() {
    shoe = shuffle.shuffle({numberOfDecks: 8});

    // console.log("========================================");
    // console.log("Starting New Shoe.");
    var burnCard = shoe.draw();
    var burnCardValue = 0;

    if(burnCard.description.toLowerCase() === 'ace')
      burnCardValue = 1;
    else if(burnCard.sort >= 10)
      burnCardValue = 10;
    else
      burnCardValue = burnCard.sort;
    
    this.emit('burn', {burnCard:burnCard, burnMore:burnCardValue});

    // console.log("Burn Card : " + burnCard.toShortDisplayString() + ". Burning " + (burnCardValue + 1) + " for " + burnCardValue);
    for(var i = 1 ; i <= burnCardValue ; i++)
      shoe.draw();
    // console.log("Shoe length : " + shoe.length);
    // console.log("========================================");
    this.leftCards=shoe.length;
  };

  this.playHand =function() {
    // console.log("-----------------");
    handsPlayed++;
    this.banker.init();
    this.player.init();
    shoe.deal(2, [this.player, this.banker]);
    this.emit('draw', {player:this.player, banker:this.banker});
    displayGameStatus.call(this);
    checkNaturals.call(this);
    // console.log("-----------------");
  }

  function checkNaturals() {
    var playerScore = this.player.s=this.player.score();
    var bankerScore = this.banker.s=this.banker.score();

    var r={playerPair:false, bankerPair:false};
    if (this.player.cards[0].sort==this.player.cards[1].sort) r.playerPair=true; 
    if (this.banker.cards[0].sort==this.banker.cards[1].sort) r.bankerPair=true;

    if (playerScore === 8 && bankerScore < 8) {
      // console.log('P');
      r.playerTian=true;
      r.win='player';
    } else if (playerScore === 9 && bankerScore < 9) {
      // console.log('P');
      r.playerTian=true;
      r.win='player';
    } else if (bankerScore === 8 && playerScore < 8) {
      // console.log('B');
      r.bankerTian=true;
      r.win='banker';
    } else if (bankerScore === 9 && playerScore < 9) {
      // console.log('B');
      r.bankerTian=true;
      r.win='banker';
    } else if (bankerScore === 8 && playerScore === 8) {
      // console.log('T');
      r.bankerTian=r.playerTian=true
      r.win='tie';
    } else if (bankerScore === 9 && playerScore === 9) {
      // console.log('T');
      r.bankerTian=r.playerTian=true
      r.win='tie';
    } else {
      return thirdCardDraw.call(this);
    }
    this.emit('result', r);
  }

  function thirdCardDraw() {
    var playerScore = this.player.score();
    var bankerScore = this.banker.score();

    // When player score is < 6
    if (playerScore < 6 && playerScore >= 0) {
      // console.log("Drawing third card for player");
      playerThirdCard = shoe.draw();
      this.player.push(playerThirdCard);
      this.emit('draw', {player:this.player});

      // Check banker drawing rules if third card between 0 and 9...
      pThirdCard = playerThirdCard.sort;
      if(pThirdCard >= 0 && pThirdCard <= 9) {
        if (bankerScore === 3 && pThirdCard != 8 ) {
          // console.log("Banker 3 and player third Card is not 8");
          var bankerThirdCard = shoe.draw();
          this.banker.push(bankerThirdCard);
          this.emit('draw', {banker:this.banker});
          return checkWinner.call(this);
        } else if (bankerScore === 4 && (
            pThirdCard >= 2 && pThirdCard <= 7 )) {
          // console.log("Banker 4 and player third card between 2 and 7");
          var bankerThirdCard = shoe.draw();
          this.banker.push(bankerThirdCard);
          this.emit('draw', {banker:this.banker});
          return checkWinner.call(this);
        } else if (bankerScore === 5 && (
            pThirdCard >= 4 && pThirdCard <= 7 )) {
          // console.log("Banker 5 and player third card between 4 and 7");
          var bankerThirdCard = shoe.draw();
          this.banker.push(bankerThirdCard);
          this.emit('draw', {banker:this.banker});
          return checkWinner.call(this);
        } else if (bankerScore === 6 && (
            pThirdCard >= 6 && pThirdCard <= 7 )) {
          // console.log("Banker 6 and player 3rd card between 6 and 7");
          var bankerThirdCard = shoe.draw();
          this.banker.push(bankerThirdCard);
          this.emit('draw', {banker:this.banker});
          return checkWinner.call(this);
        }
      }
    }

    if(bankerScore >= 0 && bankerScore <= 5) {
      // console.log("bankerscore between 0 and 5");
      var bankerThirdCard = shoe.draw();
      this.banker.push(bankerThirdCard);
      this.emit('draw', {banker:this.banker});
      return checkWinner.call(this);
    } else {
      // None of the condition satisfied
      // console.log("None of the conditions satisfied.");
      return checkWinner.call(this);
    }
  }

  function checkWinner() {
    var playerScore = this.player.s=this.player.score();
    var bankerScore = this.banker.s=this.banker.score();
    var r={playerPair:false, bankerPair:false};
    if (this.player.cards[0].sort==this.player.cards[1].sort) r.playerPair=true; 
    if (this.banker.cards[0].sort==this.banker.cards[1].sort) r.bankerPair=true;
    if (playerScore > bankerScore) {
      displayGameStatus.call(this);
      // console.log('P');
      r.win='player';
      //this.emit('input', handleInput);
    } else if (bankerScore > playerScore) {
      displayGameStatus.call(this);
      // console.log('B');
      r.win='banker';
      //this.emit('input', handleInput);
    } else {
      displayGameStatus.call(this);
      // console.log('T');
      r.win='tie';
      //this.emit('input', handleInput);
    }
    this.emit('result', r);
  }

  function displayGameStatus() {
    debugout('Player: %s (%d)', this.player.toString(), this.player.score());
    debugout('Banker: %s (%d)', this.banker.toString(), this.banker.score());
    debugout("Deck Size : " + shoe.length);
    this.leftCards=shoe.length;
  }
}

util.inherits(Game, EventEmitter);
module.exports = Game;

if (module==require.main) {
    var BaccaratGame = Game,
    game = new BaccaratGame(),
    input = process.openStdin();

    input.setEncoding('utf8');

    function showSuit(cards) {
      var str=cards[0].suit+' '+cards[0].description;
      if (cards.length==1) return str;
      for (var i=1; i<cards.length; i++) {
        str+=', '+cards[i].suit+' '+cards[i].description;
      }
      return str;
    }
    function showR(o) {
      var str='';
      if (o.player) {
        str+='player:'+showSuit(o.player.cards);
      }
      if (o.banker) {
        str+=' | banker:'+showSuit(o.banker.cards);
      }
      return str;
    }
    game.on('input', function(callback){
        input.once('data', function(command){
            // callback(command.substring(0, command.length -1));
            game.begin();game.playHand();
        });
    })
    // .on('burn', console.log)
    // .on('draw', function(o) {console.log(showR(o))})
    // .on('result', function(o) {console.log(showR(o))})
    .on('end', function(){
        input.destroy();
    });
    game.begin();
    for (var i=0; i<10; i++) {
      console.log('============', i, '================');
      game.playHand();
    }
}