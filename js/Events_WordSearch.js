// this file contains the events for the search-word puzzle.


document.querySelector('.js-random_word_search_btn').addEventListener('click', function () {

    CreateBoard({
        load_board_here: '#js-game-board-loader'
    });

}, false);

//
//

AttachEvent({
    event:'click',
    addTo:'.js-cell_letters',
    parentReference:document.body,
    callback:function(e){
        DetectClicksOnCellsLettersThatBelongToAWord(e);
    }
});

//
//

document.querySelector('.js-highlight_all_words_btn').addEventListener('change', function () {
    highlightAllWordsInTable();
}, false);

//
//

document.querySelector('.js-add_this_word_btn').addEventListener('click', function (e) {
    e.preventDefault();
    defineWordsToHideInGame(false);
}, false);

//
//

document.getElementById('js-predefined-words-btn').addEventListener('click', function (e) {
    e.preventDefault();
    defineWordsToHideInGame(true);
}, false);

//
//


