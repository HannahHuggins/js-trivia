    var players = [];
    var places = [6];
    var score = [6];
    var inPenaltyBox = [6];
    var popQuestions = [];
    var scienceQuestions = [];
    var sportsQuestions = [];
    var rockQuestions = [];
    var currentPlayer = 0;
    var isGettingOutOfPenaltyBox = false;

    var didPlayerWin = () => {
        return !(score[currentPlayer] == 6)
    };


function currentSpace(){



}
function currentCategory(){
      var places = 2;
      var categories = ['pop', 'science', 'sports', 'rock'];

        if(places == 0 || places == 4 || places == 8){
            console.log(categories[0])
        } else if (places == 1 || places == 5 || places == 9){
            console.log(categories[1])
        } else if (places == 2 || places == 6 || places == 10){
            console.log(categories[2])

        } else {
            console.log(categories[3])
        }

    };

    function Question(index){
    return "Question "+ index;
    for(var question = 0; question < 50; question++){
        popQuestions.push("Pop Question "+ question);
        scienceQuestions.push("Science Question "+ question);
        sportsQuestions.push("Sports Question "+ question);
        rockQuestions.push(this.createRockQuestion(question));
    };
};


    this.isPlayable = (howManyPlayers) => {
        return howManyPlayers >= 2;
    };

    this.add = (playerName) => {
        players.push(playerName);
        places[this.howManyPlayers() - 1] = 0;
        score[this.howManyPlayers() - 1] = 0;
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

    function roll() {

    var roll_dice = Math.floor(Math.random()*6 + 1);
    console.log(roll_dice)
        console.log(players[currentPlayer] + " is the current player");
        console.log("They have rolled a " + roll);

        if(inPenaltyBox[currentPlayer]){
            if(roll % 2 != 0){
                isGettingOutOfPenaltyBox = true;

                console.log(players[currentPlayer] + " is getting out of the penalty box");
                places[currentPlayer] = places[currentPlayer] + roll;
            } else if(places[currentPlayer] > 11){
                    places[currentPlayer] = places[currentPlayer] - 12;
                }

                console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
                console.log("The category is " + currentCategory());
                askQuestion();
            }else{
                console.log(players[currentPlayer] + " is not getting out of the penalty box");
                isGettingOutOfPenaltyBox = false;
            }


            places[currentPlayer] = places[currentPlayer] + roll;
            if(places[currentPlayer] > 11){
                places[currentPlayer] = places[currentPlayer] - 12;
            }

            console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
            console.log("The category is " + currentCategory());
            askQuestion();
        }


    function wasCorrectlyAnswered(){
        if(inPenaltyBox[currentPlayer]){
            if(isGettingOutOfPenaltyBox){
                console.log('Answer was correct!!!!');
                score[currentPlayer] += 1;
                console.log(players[currentPlayer] + " now has " +
                    score[currentPlayer]  + " Gold Coins.");

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

            score[currentPlayer] += 1;
            console.log(players[currentPlayer] + " now has " +
                score[currentPlayer]  + " Gold Coins.");

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








currentCategory();