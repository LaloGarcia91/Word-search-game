

//
//
//

function CreateBoard(rulesPassed) {
    /*
    In this function we will create the board table content which is a set or rows and cells. This cells will not be empty, each cells contains a letter.
    */

    var allDefinedWords = document.querySelectorAll('.js-selected_words');
    
    
    if( allDefinedWords.length == 0 ){
        alert('Please choose words to hide')
        return false;
    }
    
    // example of the parameter that this function SHOULD receive
    var rules = {
        load_board_here: rulesPassed.load_board_here /*,
        accept_reversed_words: rulesPassed.accept_reversed_words,
        accept_diagonal_words: rulesPassed.accept_diagonal_words,
        accept_horizontal_words: rulesPassed.accept_horizontal_words,
        accept_vertical_words: rulesPassed.accept_vertical_words
        */
    };


    // functions needed to call before creating (or re-creating) the board
    clearGameBoard();
    removeWordFoundClassFromTheSelectedWordsButtons();


    var loadTableHere = document.querySelector(rules.load_board_here);


    // create board
    var table = createNewElement({
        element:'table',
        classes:[
            'search_word_table',
            'js-game_board_table'
        ],
        insertElements:[
            {
                element:'tbody',
                classes:[
                    'js-puzzle_tbody'
                ]
            }
        ]
    });

    // load the board in the choosed selector
    loadTableHere.appendChild(table);


    // start doing the rest of the game creation
    createRowsWithCellsForTableBoard();
    startFittingWordsOnBoard();
    highlightAllWordsInTable();
}

//
//
//
//
//

function createRowsWithCellsForTableBoard(){
    /*
    This function will create the rows and cells for the game board.
    */

    var longestWordGiven = GetTheLongestWordFromThisSelectorsReference(".js-selected_words");
    var longestWordLength = longestWordGiven.length;
    var boardTbody = document.querySelector('.js-puzzle_tbody');
    var i, x;


    // create rows
    // The board length cells (horizontally and vertically) works by multiplying the longest word given, times 2.

    for(i=0; i<(longestWordLength*2)+10; i++){
        var newRow = createNewElement({
            element:"tr",
            classes:["js-board_rows"]
        });



        // create and append cells to row
        for(x=0; x<(longestWordLength*2)+10; x++){
            var newCell = createNewElement({
                element:"td",
                classes:[""],
                classes: ['words', 'js-cell_letters'],
                html: GetARandomLetter()
            });

            newRow.appendChild(newCell);
        }


        // append rows with cells to tbody board
        boardTbody.appendChild(newRow);
    }

}

//
//
//
//
//

function startFittingWordsOnBoard(){
    /*
    In this function we will start to fit each word on the board game
    */

    var allDefinedWords = document.querySelectorAll('.js-selected_words');

    Array.prototype.forEach.call(allDefinedWords, function(word){
        fitWordsInCells(word.getAttribute('data-word'));
    });

}

//
//
//
//
//

function fitWordsInCells(word){
    /*
    In this function we will fit the word letters in the correct table cells
    */
    var wordOrientationInfo = returnThisWordRowAndCellInfos(word);


    if(wordOrientationInfo){        
        /*
        Row index y Cell index deben estar fuera del loop, de lo contrario el programa no funciona como debe funcionar.
        */
        var rowIndex = wordOrientationInfo.rowIndex;
        var cellIndex = wordOrientationInfo.cellIndex;


        var letterIndex;
        for(letterIndex=0; letterIndex<word.length; letterIndex++){

            var thisRow = document.querySelectorAll('.js-board_rows')[rowIndex];
            var thisCell = thisRow.querySelectorAll('.js-cell_letters')[cellIndex];

            // this cell belongs mainly to 'x' word
            thisCell.setAttribute('data-belongs-to-the-word', word);
            
            // we still add another reference attribute of the name of the word to use it in the program
            thisCell.setAttribute('data-cell-sharing-the-letter-for-'+word, '');
            
            // add the letter index to the cell
            thisCell.textContent = word[letterIndex];


            switch(wordOrientationInfo.orientation){
                case 'horizontal-right-to-left':
                    cellIndex--;
                    break;

                case 'horizontal-left-to-right':
                    cellIndex++;
                    break;

                case 'vertical-top-to-bottom':
                    rowIndex++;
                    break;

                case 'vertical-bottom-to-top':
                    rowIndex--;
                    break;

                case 'diagonal-top-to-bottom-right':
                    rowIndex++;
                    cellIndex++;
                    break;

                case 'diagonal-top-to-bottom-left':
                    rowIndex++;
                    cellIndex--;
                    break;

                case 'diagonal-bottom-to-top-right':
                    rowIndex--;
                    cellIndex++;
                    break;

                case 'diagonal-bottom-to-top-left':
                    rowIndex--;
                    cellIndex--;
                    break;
            }
        }   
    }
}

//
//
//
//
//

function returnThisWordRowAndCellInfos(word){
    /*
    In this function we will return the row and cell index from where the word letters will start fitting. The function receives the word as a parameter. This function will also needs to test if the word will indeed fit in the board as well as if it overlaps another word letter.
    */


    while(true){
        var startFromThisRowAndCellIndex = getRowAndCellIndexForWordToStartFrom();
        var orientation = returnRandomOrientation();
        var testIfFits = testIfWordWillFitOnBoard(word, orientation, startFromThisRowAndCellIndex);


        if(testIfFits){
            var wordOrientationInfo = {
                rowIndex:startFromThisRowAndCellIndex.rowIndex,
                cellIndex:startFromThisRowAndCellIndex.cellIndex,
                orientation: orientation,
                word: word
            };

            // pass the filter
            var filterWordsToSeeIfOverlap = testIfWordLettersOverlap(word, wordOrientationInfo);

            if(filterWordsToSeeIfOverlap){
                return wordOrientationInfo;
            }

        } else {
            // console.log(word+" may be changing orientation.")
        }
    }

    return false;
}

//
//
//
//
//

function testIfWordWillFitOnBoard(word, wordOrientation, rowAndCellIndex){
    /*
    In this function we will test if the complete word will fit on the board. Since a letter might try to fit in a non-existent cell/row index. If that is the case, it will return false and the program will re-try with a different orientation and row/cells index
    */

    var rowIndex = rowAndCellIndex.rowIndex;
    var cellIndex = rowAndCellIndex.cellIndex;

    switch(wordOrientation){
        case 'horizontal-right-to-left':
            return CheckIfThisRowCellIndexExistInGame(rowIndex, cellIndex - word.length-1);

        case 'horizontal-left-to-right':
            return CheckIfThisRowCellIndexExistInGame(rowIndex, cellIndex + word.length-1);

        case 'vertical-top-to-bottom':
            return CheckIfThisRowCellIndexExistInGame(rowIndex + word.length-1, cellIndex);

        case 'vertical-bottom-to-top':
            return CheckIfThisRowCellIndexExistInGame(rowIndex - word.length-1, cellIndex);

        case 'diagonal-top-to-bottom-right':
            return CheckIfThisRowCellIndexExistInGame(rowIndex + word.length-1, cellIndex + word.length-1);

        case 'diagonal-top-to-bottom-left':
            return CheckIfThisRowCellIndexExistInGame(rowIndex + word.length-1, cellIndex - word.length-1);

        case 'diagonal-bottom-to-top-right':
            return CheckIfThisRowCellIndexExistInGame(rowIndex - word.length-1, cellIndex + word.length-1);

        case 'diagonal-bottom-to-top-left':
            return CheckIfThisRowCellIndexExistInGame(rowIndex - word.length-1, cellIndex - word.length-1);
    }

    // if any error
    return false;
}

//
//
//
//
//

function CheckIfThisRowCellIndexExistInGame(selectThisRowIndex, selectThisCellIndexFromRow){
    var allRows = document.querySelectorAll('.js-board_rows');

    try {
        allRows[selectThisRowIndex].querySelectorAll('.js-cell_letters')[selectThisCellIndexFromRow].innerHTML;
    }catch(e){
        return false;
    }

    return true;
}

//
//
//
//
//

function testIfWordLettersOverlap(checkThisCellLetter, wordOrientationInfo){
    /*
    In this function we will receive 2 parameters as HTML nodes, and we will check if a word letter (or letters) overlap with another word (or words) letters, if the word letter tries to overlap another word letter with the same letter. It will remain the same and this function will return true, otherwise it will return false and the program will re-try to fit the word somewhere else.
    */


    var rowIndex = wordOrientationInfo.rowIndex;
    var cellIndex = wordOrientationInfo.cellIndex;


    var letterIndex;
    for(letterIndex=0; letterIndex < checkThisCellLetter.length; letterIndex++){

        var currentRowInIteration = document.querySelectorAll('.js-board_rows')[rowIndex];
        var currentCellInIteration = currentRowInIteration.querySelectorAll('.js-cell_letters')[cellIndex];


        /*
        check if words share the same letter, otherwise return false and re-try another row and cells index as well as orientation
        */

        if(currentCellInIteration.getAttribute('data-belongs-to-the-word')){
            if(currentCellInIteration.textContent != checkThisCellLetter[letterIndex]){
                removeThisWordReferenceOfSharingLettersAttr(checkThisCellLetter);
                return false;
            }else {
                /*
                If a word letter shares the same letter with another word, we can console log that information. Although, the loop will keep going to check which other letters of the word may overlap and share the same letter with another word. Since the word may share the same letter with another word, other letters may also overlap but NOT share the same letter, so the program will return false, meaning, that this console log may still be logged.
                */

                var msg = "The word: "+currentCellInIteration.getAttribute('data-belongs-to-the-word')+" might be sharing the letter '"+currentCellInIteration.textContent+"' with the word: "+checkThisCellLetter;

                //console.log(msg);

                SaveWordsSharingLetterInTheCellAttribute(currentCellInIteration, currentCellInIteration.getAttribute('data-belongs-to-the-word'));
            }
        }


        switch(wordOrientationInfo.orientation){
            case 'horizontal-right-to-left':
                cellIndex--;
                break;

            case 'horizontal-left-to-right':
                cellIndex++;
                break;

            case 'vertical-top-to-bottom':
                rowIndex++;
                break;

            case 'vertical-bottom-to-top':
                rowIndex--;
                break;

            case 'diagonal-top-to-bottom-right':
                rowIndex++;
                cellIndex++;
                break;

            case 'diagonal-top-to-bottom-left':
                rowIndex++;
                cellIndex--;
                break;

            case 'diagonal-bottom-to-top-right':
                rowIndex--;
                cellIndex++;
                break;

            case 'diagonal-bottom-to-top-left':
                rowIndex--;
                cellIndex--;
                break;
        }

    }


    /*
    Return true if everything is ok
    */

    return true;
}

//
//
//
//
//

function returnRandomOrientation(){
    /*
    In this function we will return the random orientation selected for a given word
    */

    var orientations = [
        "horizontal-right-to-left",
        "horizontal-left-to-right",
        "vertical-top-to-bottom",
        "vertical-bottom-to-top",
        "diagonal-top-to-bottom-right",
        "diagonal-top-to-bottom-left",
        "diagonal-bottom-to-top-right",
        "diagonal-bottom-to-top-left"
    ];
    var randomIndex = GetRandomNumber(0, orientations.length);

    return orientations[randomIndex];
}

//
//
//
//
//

function removeThisWordReferenceOfSharingLettersAttr(word){
    /*
    In this function we will remove all the attributes references of the given word that other words letters may be holding. This works hand-on-hand with the function where the program is testing if a word letter overlaps another letter.
    */

    var thisAttrRef = 'data-cell-sharing-the-letter-for-'+word;
    var allCellsOfThisWord = document.querySelectorAll('['+thisAttrRef+']');

    Array.prototype.forEach.call(allCellsOfThisWord, function(wordLetterCell){
        wordLetterCell.removeAttribute(thisAttrRef);
    });

}

//
//
//
//
//

function getRowAndCellIndexForWordToStartFrom(){
    /*
    In this function we will select a random row and cell index from the board/table, from which the given word letters will start to fit in
    */

    var gameRows = document.querySelectorAll('.js-board_rows');
    var rowRandomIndex = GetRandomNumber(0, gameRows.length);

    var cellsInRow = gameRows[rowRandomIndex].childElementCount;
    var cellRandomIndex = GetRandomNumber(0, cellsInRow);

    return {
        rowIndex:rowRandomIndex,
        cellIndex:cellRandomIndex
    };
}

//
//
//
//
//

function removeWordFoundClassFromTheSelectedWordsButtons() {
    /*
    This function will remove the class from the buttons words that we choosed at the begining, 
    this class is added to this buttons everytime you find THAT word that the button has as text.
    */
    var allWords = document.querySelectorAll('.js-selected_words');
    Array.prototype.forEach.call(allWords, function (word) {
        word.classList.remove('css-js-right-letter-clicked');
    });
}

//
//
//
//
//

function SaveWordsSharingLetterInTheCellAttribute(cellThatSharesTheLetter, newWord){
    // this funcion will save the words that share a letter in a data attribute

    var attrRef = 'data-cell-sharing-the-letter-for-'+newWord;
    cellThatSharesTheLetter.setAttribute(attrRef,'');
}

//
//
//
//
//




