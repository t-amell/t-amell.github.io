
let modal = document.getElementById("consentModal");
let wrongModal =  document.getElementById("wrongAnswerModal");
let grid = document.getElementById("grid");
let instructions = document.getElementById("instructions");
let agreeButton = document.getElementById("agreeButton");
let toggleButton = document.getElementById("toggleButton");
let midSurvey = document.getElementById("midSurvey");

var playThrough = 0;
var timeoutIds = [];
var sequence = [];
var answer = [];
var colors = ["green", "red", "yellow", "blue"];
var allowedToPlay = false;
var correct = true;

var userMidSurvey = "";

function closeModal() {
    toggleVisual([toggleButton], [modal])
    beginStudy();
}

function beginStudy() {
    toggleVisual([grid], [agreeButton]);
    instructions.innerHTML = "Remember this sequence!"
    getSequence();
}

function getSequence() {
    var slot = Math.floor(Math.random() * 4);
    sequence.push(colors[slot]);
    playSequence();
}

function playerClick(color) {
    if(!allowedToPlay){
        return;
    }
    switch(color){
        case "red":
            document.getElementById(color).src="colors/" + color + "Up.png";
            setTimeout(function(){
                document.getElementById(color).src="colors/" + color + ".png";
            }, 150);
            break;
        case "green":
            document.getElementById(color).src="colors/" + color + "Up.png";
            setTimeout(function(){
                document.getElementById(color).src="colors/" + color + ".png";
            }, 150);
            break;
        case "yellow":
            document.getElementById(color).src="colors/" + color + "Up.png";
            setTimeout(function(){
                document.getElementById(color).src="colors/" + color + ".png";
            }, 150);
            break;
        case "blue":
            document.getElementById(color).src="colors/" + color + "Up.png";
            setTimeout(function(){
                document.getElementById(color).src="colors/" + color + ".png";
            }, 150);
            break;
        default:
            break;
    }   
    enterSequence(color);
}

function playSequence() {

    sequence.forEach((color, index) => {
        timeoutIds.push(setTimeout(function(){
            document.getElementById(color).src="colors/" + color + "Up.png";
        }, (index * 1500) + 500));
        timeoutIds.push(setTimeout(function(){
            document.getElementById(color).src="colors/" + color + ".png";
        }, ((index + 1) * 1500) - 500));
    }); 
    timeoutIds.push(setTimeout(function(){
        instructions.innerHTML = "Repeat the sequence!"
        allowedToPlay = true;
    }, (sequence.length * 1500) - 500));
}

function enterSequence(color) {
    answer.push(color);
	if(!allowedToPlay){
		return;
	}
    compareAnswer();
}

function compareAnswer(){
	answer.forEach((color, index) => {
        if(sequence[index] != color) {
            toggleVisual([wrongModal], [grid])
            correct = false;
            console.log("Incorrect")
        }
    });
    if (correct && answer.length == sequence.length) {
        console.log("Correct");
        setTimeout(function(){
            restartGrid();
        }, 150);
    }
}

function toggleVisual(toShow, toHide) {
    toShow.forEach((element) => {
        element.style.display = "block";
    })
    toHide.forEach((element) => {
        element.style.display = "none";
    })
}

function toggleModal() {
    resetColors();
    if (modal.style.display == "none") {
        toggleVisual([modal], [grid]);
    } else {
        toggleVisual([grid], [modal]);
        instructions.innerHTML = "Remember this sequence!"
        playSequence();
    }
}

function restartGrid(){
    allowedToPlay = false;
    resetColors();
    if (!correct){
        answer = [];
        sequence = [];
        correct = true;
    }
    if (playThrough > 4) {
        beginEndingSurvey();
    } else {
        if (answer.length >= 5) {
            answer = [];
            sequence = [];
            toggleVisual([midSurvey], [grid, toggleButton]);
        } else {
            toggleVisual([grid, toggleButton], [midSurvey, wrongModal])
            answer = [];
            instructions.innerHTML = "Remember this sequence!"
            getSequence();
        }
    }
}

function resetColors(){
    timeoutIds.forEach((id) => {
        clearTimeout(id);
    });
    colors.forEach((color) => {
        document.getElementById(color).src="colors/" + color + ".png";
    });
}

function concat(){
    userMidSurvey += playThrough + ": \n" + "Pleasant Rating: " + document.getElementById("pleasantRating").value + "\n" 
    + "Enhance Rating: " + document.getElementById("enhanceRating").value + "\n";
    console.log(userMidSurvey);
    playThrough++;
    restartGrid();
}

function beginEndingSurvey(){
    sendEmail();
}

function sendEmail() {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "hci.simon.says@gmail.com",
      Password: "hcidavekopec",
      To: 'hci.simon.says@gmail.com',
      From: "hci.simon.says@gmail.com",
      Subject: "Test Results",
      Body: userMidSurvey,
    });
  }