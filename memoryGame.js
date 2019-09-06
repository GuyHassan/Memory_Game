var sq = [].slice.call(document.querySelectorAll(".square")), //convert the queryselctorAll from nodelist to arraylist
    MatchOrNot = document.querySelector(".MatchOrNot"),
    imgButton = [].slice.call(document.querySelectorAll("#imgBtn")),
    resetButton = document.getElementById("res");
var objOfImgs = {
        listOfNumber: [3, 5, 2, 0, 4, 1, 2, 4, 0, 3, 1, 5],
        disney: ["img/Walt-Disney-PNG-Transparent-Image.png", "img/disney-transparent-2.png", "img/home.png", "img/WoodyLoginLightbox.png", "img/purchase.png", "img/disney-transparent-lion-king-4.png"],
        marvel: ["img/Marvel-Thanos-PNG-Free-Download.png", "img/Captain-Marvel-PNG-Transparent-Image.png", "img/Thanos-Infinity-Stone-Gauntlet-PNG-HD.png", "img/Marvel-Vision-Transparent-Background-1.png", "img/Captain-Marvel-PNG-Free-Download.png", "img/Captain-Marvel-PNG-Photos.png"],
    },
    numOfClicks = 0,
    maxClickRound = 2,
    squareRounds = [],
    isWin = 0,
    typeImg = objOfImgs.disney;
// "http://www.pngmart.com/files/7/Walt-Disney-PNG-Transparent-Image.png", "https://ui-ex.com/images/disney-transparent-2.png"
// "http://www.pngmart.com/files/9/Marvel-Thanos-PNG-Free-Download.png", "http://www.pngmart.com/files/9/Captain-Marvel-PNG-Transparent-Image.png"
//shuffle the list of image while the user click refresh
objOfImgs.listOfNumber = shuffle(objOfImgs.listOfNumber);
console.log(objOfImgs.listOfNumber)

//event listeners of buttons in a jumbotron
resetButton.addEventListener("click", () => resetFunc(typeImg))
imgButton[0].addEventListener("click", () => resetFunc(objOfImgs.disney));
imgButton[1].addEventListener("click", () => resetFunc(objOfImgs.marvel));

//main of logics for this game
function mainOfLogics(currNode) {
    i = currNode.currentTarget.getAttribute("id"); // get the current click and his index
    // check if the amount of click is maximum 2 at this round and is not the same index 
    if (numOfClicks < maxClickRound && sq[i] != null) {
        this.style.background = 'url(' + typeImg[objOfImgs.listOfNumber[i]] + ')';
        this.style.backgroundRepeat = "no-repeat";
        this.style.backgroundSize = "contain";
        this.style.backgroundPosition = "center center";
        squareRounds.push(this); //temporary array is catch the 2 object that clicked at this round
        numOfClicks++;
        //if the user click on the same square
        if (numOfClicks === 2 && squareRounds[0].getAttribute("id") === squareRounds[1].getAttribute("id")) {
            numOfClicks--;
            squareRounds.pop();
        }
        if (squareRounds.length > 1) {
            setTimeout(function() {
                //check if the 2 square is Match
                if (squareRounds[0].style.background === squareRounds[1].style.background) {
                    sq[sq.indexOf(squareRounds[0])].style.border = "2px dotted rgba(25, 250, 250, 0.5)";
                    sq[sq.indexOf(squareRounds[1])].style.border = "2px dotted rgba(25, 250, 250, 0.5)";
                    sq[sq.indexOf(squareRounds[0])] = null;
                    sq[sq.indexOf(squareRounds[1])] = null;
                    MatchOrNot.textContent = " !!כל הכבוד";
                    isWin++;
                    setInterval(function() {
                        MatchOrNot.textContent = "..לחץ על מנת להמשיך לשחק";
                        if (isWin === 6) {
                            MatchOrNot.textContent = "..מזל טוב !! ניצחת את המשחק";
                        }
                    }, 1300);
                } //if is Not Match
                else {
                    squareRounds[0].style.background = "rgba(238, 235, 235, 0.25)";
                    squareRounds[1].style.background = "rgba(238, 235, 235, 0.25)";
                }
                squareRounds = [];
                numOfClicks = 0;
            }, 800);
        }
    }
}

function addEvent() {
    for (let i = 0; i < sq.length; i++) {
        sq[i].addEventListener("click", mainOfLogics);
    }
}

function removeEvent() {
    for (let i = 0; i < sq.length; i++) {
        sq[i].removeEventListener("click", mainOfLogics);
    }
}
//bring back the site to start
function resetFunc(typeOfImg) {
    typeImg = typeOfImg;
    objOfImgs.listOfNumber = shuffle(objOfImgs.listOfNumber);
    sq = [].slice.call(document.querySelectorAll(".square"));
    sq.forEach(function(elem) {
        elem.style.background = "rgba(238, 235, 235, 0.25)";
        elem.style.border = "2px dotted rgba(179, 3, 3, 0.5)";
    })
    numOfClicks = isWin = 0;
    squareRounds = [];
    removeEvent();
    addEvent();
}
//shuffle the array of number image
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
addEvent();