

//
//
//
//
//

function DetectClicksOnCellsLettersThatBelongToAWord(e) {
    /*
    In this function we will detect click on words letter within the board
    */

    try {

        var word = e.target.getAttribute('data-belongs-to-the-word');

        if( word.length > 0 ){
            if(e.target.classList.contains('css-js-right-letter-clicked')){
                e.target.classList.remove('css-js-right-letter-clicked');
            }else {
                e.target.classList.add('css-js-right-letter-clicked');
            }
        }

        checkIfWordWasFound();

    }catch(e){

    }

}

//
//
//
//
//

function checkIfWordWasFound() {
    /*
    In this function we will check if the word was found. Meaning, if all the letters of the word are selected.
    */

    var allWordsChoosed = GetAllWordsChoosedAsArray();
    var word;
    for(var i=0; i<allWordsChoosed.length; i++){
        word = allWordsChoosed[i];
        var wordReferenceBtn = document.querySelector("[data-word='" + word + "']");
        var check = CheckIfThisWordCellsHaveBeenFound(word);

        if( check ){
            // if the word currently in iteration has already been found, skip it
            if( !wordReferenceBtn.classList.contains('css-js-right-letter-clicked') ){
                wordReferenceBtn.classList.add('css-js-right-letter-clicked');
                alert("The word: "+word+", was found!");
            }
            
        } else {
            wordReferenceBtn.classList.remove('css-js-right-letter-clicked');
        }
        
    }

}

//
//
//
//
//

function CheckIfThisWordCellsHaveBeenFound(word){
    // this function will check if the cells that belong to 'x' word have been found

    var wordLettersSelectors = document.querySelectorAll("[data-cell-sharing-the-letter-for-"+word+"]");

    for(var i=0; i<wordLettersSelectors.length; i++){
        if( !wordLettersSelectors[i].classList.contains('css-js-right-letter-clicked') ){
            return false;
        }
    }

    return true;
}

//
//
//
//
//

function GetAllWordsChoosedAsArray(){
    // this function will check all of the words that we have choosed at the begining of the game

    var allWords = document.querySelectorAll('.js-selected_words');

    var acumulate = [];

    for(var i=0; i<allWords.length; i++){
        acumulate.push(allWords[i].getAttribute('data-word'));
    }

    return acumulate;
}

//
//
//
//
//



