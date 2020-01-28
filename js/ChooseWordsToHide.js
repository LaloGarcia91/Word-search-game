//


function defineWordsToHideInGame(usePredefinedWords) {

    switch(usePredefinedWords){
        case false:
            var addThisWord = document.querySelector('.js-given_word');
            if( AddThisWord(addThisWord.value) ){
                // clear the value of the input used to add the word
                addThisWord.value = '';
            }
            break;

        case true:
            GenerateThePredefinedWords();
            break;
    }

}

//
//
//
//
//

function AddThisWord(thisWord){

    if (thisWord.length > 2) {
        var displayWordsHere = document.querySelector('.js-word-selected-display-wrapper');

        if( !CheckForNoDuplicateWordsChoosed(thisWord) ){
            return false;
        }

        displayWordsHere.appendChild(createNewElement({
            element:'button',
            text:thisWord,
            classes:[
                'js-selected_words',
                'selected_words_btns'
            ],
            attributes:[
                ["data-word", thisWord]
            ]
        }));

        return true;

    } else {
        alert('Please provide at least 3 characters.');
    }

    return false;
}

//
//
//
//
//

function GenerateThePredefinedWords(){
    // here, we will get an array of predefined words

    // choosed words #
    var howManyWords = document.getElementById('js-choose-predefined-words-number').value;

    // list of predefined words
    var allPredefinedWordsList = WordsList();

    //
    var randomWordsArray = [], randomIndex;

    // check if words # is greater than 0
    if( howManyWords > 0 ){
        //
        var displayWordsHere = document.querySelector('.js-word-selected-display-wrapper');
        displayWordsHere.innerHTML = '';

        var newWordAboutToAdd, i=0;

        while(i <= howManyWords){
            randomIndex = Math.floor(Math.random() * allPredefinedWordsList.length);
            newWordAboutToAdd = allPredefinedWordsList[randomIndex];

            // start fitting random words in the array (if the current word in iteration does NOT exist in the array)
            if( randomWordsArray.indexOf(newWordAboutToAdd) < 0 ){
                randomWordsArray.push(newWordAboutToAdd);

                // add the word
                AddThisWord(newWordAboutToAdd);

                // since the word didn't exist in the array already, we can continue to the next iteration
                i++;
            } 
            
            // break loop if it takes too long
            if( i >= allPredefinedWordsList.length ){
                alert('Sorry, there are only '+allPredefinedWordsList.length+' predefined words. Please consider adding more words manually.')
                break;
            }
            
            // continue the loop until the array length is the same as the words # choosed
        }

    } else {
        alert('Please choose the words # you want on the puzzle.')
    }

    return randomWordsArray;
}

//
//
//
//
//

function CheckForNoDuplicateWordsChoosed(thisWordWasGiven){
    /* 
        check if the words given haven't been already given before, 
        this is to prevent repetitive words on the game.
    */

    var i;
    var allGivenWordsSoFar = document.querySelectorAll(".js-selected_words");

    for (i = 0; i < allGivenWordsSoFar.length; i++) {
        var check_word = allGivenWordsSoFar[i].textContent;

        if (check_word === thisWordWasGiven) {
            alert("Sorry, you already added the word: " + thisWordWasGiven + ".");
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





