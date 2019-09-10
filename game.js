exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function() {
    var players = [];
    var places = [6];
    var purses = [6];
    var inPenaltyBox = [6];
    var popQuestions = [];
    var scienceQuestions = [];
    var sportsQuestions = [];
    var rockQuestions = [];
    var currentPlayer = 0;
    var isGettingOutOfPenaltyBox = false;

    var didPlayerWin = () => {
        return !(purses[currentPlayer] == 6)
    };

    var currentCategory = () => {
        if(places[currentPlayer] == 0 || places[currentPlayer] == 4 || places[currentPlayer] == 8){
            return 'Pop';
        } else if (places[currentPlayer] == 1 || places[currentPlayer] == 5 || places[currentPlayer] == 9){
            return 'Science';
        } else if (places[currentPlayer] == 2 || places[currentPlayer] == 6 || places[currentPlayer] == 10){
            return 'sports';
        } else {
            return 'Rock'
        }
    };

    this.createRockQuestion = (index) => {
        return "Rock Question "+ index;
    };

    for(var question = 0; question < 50; question++){
        popQuestions.push("Pop Question "+ question);
        scienceQuestions.push("Science Question "+ question);
        sportsQuestions.push("Sports Question "+ question);
        rockQuestions.push(this.createRockQuestion(question));
    };

    this.isPlayable = (howManyPlayers) => {
        return howManyPlayers >= 2;
    };

    this.add = (playerName) => {
        players.push(playerName);
        places[this.howManyPlayers() - 1] = 0;
        purses[this.howManyPlayers() - 1] = 0;
        inPenaltyBox[this.howManyPlayers() - 1] = false;

        console.log(playerName + " was added");
        console.log("They are player number " + players.length);

        return true;
    };

    this.howManyPlayers = () => {
        return players.length;
    };


    var askQuestion = () => {
        if(currentCategory() == 'Pop')
            console.log(popQuestions.shift());
        if(currentCategory() == 'Science')
            console.log(scienceQuestions.shift());
        if(currentCategory() == 'Sports')
            console.log(sportsQuestions.shift());
        if(currentCategory() == 'Rock')
            console.log(rockQuestions.shift());
    };

    this.roll = (roll) => {
        console.log(players[currentPlayer] + " is the current player");
        console.log("They have rolled a " + roll);

        if(inPenaltyBox[currentPlayer]){
            if(roll % 2 != 0){
                isGettingOutOfPenaltyBox = true;

                console.log(players[currentPlayer] + " is getting out of the penalty box");
                places[currentPlayer] = places[currentPlayer] + roll;
                if(places[currentPlayer] > 11){
                    places[currentPlayer] = places[currentPlayer] - 12;
                }

                console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
                console.log("The category is " + currentCategory());
                askQuestion();
            }else{
                console.log(players[currentPlayer] + " is not getting out of the penalty box");
                isGettingOutOfPenaltyBox = false;
            }
        }else{

            places[currentPlayer] = places[currentPlayer] + roll;
            if(places[currentPlayer] > 11){
                places[currentPlayer] = places[currentPlayer] - 12;
            }

            console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
            console.log("The category is " + currentCategory());
            askQuestion();
        }
    };

    this.wasCorrectlyAnswered = function(){
        if(inPenaltyBox[currentPlayer]){
            if(isGettingOutOfPenaltyBox){
                console.log('Answer was correct!!!!');
                purses[currentPlayer] += 1;
                console.log(players[currentPlayer] + " now has " +
                    purses[currentPlayer]  + " Gold Coins.");

                var winner = didPlayerWin();
                currentPlayer += 1;
                if(currentPlayer == players.length)
                    currentPlayer = 0;

                return winner;
            }else{
                currentPlayer += 1;
                if(currentPlayer == players.length)
                    currentPlayer = 0;
                return true;
            }



        }else{

            console.log("Answer was correct!!!!");

            purses[currentPlayer] += 1;
            console.log(players[currentPlayer] + " now has " +
                purses[currentPlayer]  + " Gold Coins.");

            var winner = didPlayerWin();

            currentPlayer += 1;
            if(currentPlayer == players.length)
                currentPlayer = 0;

            return winner;
        }
    };

    this.wrongAnswer = function(){
        console.log('Question was incorrectly answered');
        console.log(players[currentPlayer] + " was sent to the penalty box");
        inPenaltyBox[currentPlayer] = true;

        currentPlayer += 1;
        if(currentPlayer == players.length)
            currentPlayer = 0;
        return true;
    };
};

var notAWinner = false;

var game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

var gen = require('random-seed');
var random = gen('seedvalue');

do{

    game.roll(Math.floor(random(6)) + 1);

    if(Math.floor(random(10)) == 7){
        notAWinner = game.wrongAnswer();
    }else{
        notAWinner = game.wasCorrectlyAnswered();
    }

}while(notAWinner);