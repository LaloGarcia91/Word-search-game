
function AttachEvent(info){
    /*
        this function is meant to be used to attach events to dynamic created elements
    */


    var thisInfo = {
        event:info.event,
        addTo:info.addTo,
        parentReference:info.parentReference,
        callback:info.callback
    };

    //
    ClickThisSelector = thisInfo.parentReference;


    // apply the event to either the parent given (if any), or apply a default parent for the event (body)
    ClickThisSelector.addEventListener(thisInfo.event, function(e){
        
        switch(thisInfo.addTo[0]){
            case '#':
                var thisId = thisInfo.addTo.slice(1);
                if(e.target.getAttribute('id') == thisId){
                    thisInfo.callback(e);
                }
                break;

            case '.':
                var thisClassName = thisInfo.addTo.slice(1);
                if(e.target.classList.contains(thisClassName)){
                    thisInfo.callback(e);
                }
                break;

            default:
                return false;
        }

    }, false);
}

//
//
//
//
//


function highlightAllWordsInTable() {
    var thisCheckbox = document.querySelector('.js-highlight_all_words_btn');
    var selectedWords = document.querySelectorAll('.js-selected_words');

    var availableColors = ['red', 'lightpink', 'lightblue', 'blue', 'lightgreen', 'orangered', 'orange', 'yellow', 'lightgrey', 'purple', 'grey'];



    var gameBoardWordsLetters = document.querySelectorAll('[data-belongs-to-the-word]');
    if(gameBoardWordsLetters.length > 0){
        Array.prototype.forEach.call(selectedWords, function(wordBtnReference){
            var word = wordBtnReference.textContent;
            var randomIndex = GetRandomNumber(0, availableColors.length);
            var wordCells = document.querySelectorAll("[data-belongs-to-the-word='" + word + "']");

            var i;
            for(i=0; i<wordCells.length; i++){
                /*
                If highlight words btn is checked, then highlight words with colors, if not, remove the colors to default
                */
                if(thisCheckbox.checked){
                    wordCells[i].style.backgroundColor = availableColors[randomIndex];
                }else {
                    wordCells[i].style.backgroundColor = "white";
                }

            }

        });
    } else {
        alert("There are no words hidden, please start the game.")
    }


}

//
//
//
//
//

function clearGameBoard(){
    var tableLoader = document.getElementById('js-game-board-loader');
    tableLoader.innerHTML = "";
}

//
//
//
//
//

function GetARandomLetter() {
    var all_letters = "abcdefghijklmnopqrstuvwxyz";
    all_letters = all_letters.split("");

    var random_index = Math.floor(Math.random() * all_letters.length);

    return all_letters[random_index];
}

//
//
//
//
//

function GetRandomNumber(min, max, float) {
    var final = Math.random() * (max - min) + min;

    if (parseInt(float)) {
        return final.toFixed(float);
    } else {
        return parseInt(final);
    }

}

//
//
//
//
//

function GetTheLongestWordFromThisSelectorsReference(className) {

    var i;
    var longestWord = "";
    var currentWordOnIteration;
    var selectors = document.querySelectorAll(className);

    for (i = 0; i < selectors.length; i++) {
        currentWordOnIteration = selectors[i].textContent;

        if (longestWord.length < currentWordOnIteration.length) {
            longestWord = currentWordOnIteration;
        }

    }

    return longestWord;

}