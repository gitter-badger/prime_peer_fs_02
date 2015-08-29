var $cuteDinos = $('#cuteDinos');


$(document).ready(function(){
    initDeck();

    $cuteDinos.on('click', '#getDeck', function(){
        $cuteDinos.empty();
        initDeck();
    });


    function initDeck(){
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/cute'})

            .done(function(data){

                var deck = data;
                var $buttonGenerate = $('<button>').text('Change Deck').attr('id','getDeck');
                $cuteDinos.prepend($buttonGenerate);
                displayNewDeck(deck);

                //swap Dino event handler
                $cuteDinos.on('click', '#changeDino', function(){

                    var displayedDinos = [];
                    var swapDino;
                    var i = 0;
                    var $newDino = $('<div>');

                    //store displayed Dinos in an array, then sort.
                    $('div').each(function(){
                        displayedDinos.push($(this).data('id'));
                        displayedDinos.sort();
                    });

                    console.log("Current Dinos: " + displayedDinos);

                    //iterates through the displayedDinos array and stores the one that is missing in swapDino
                    while(displayedDinos[i] == 'dino' + (i+1)){
                        swapDino = ('dino' + (i + 2));
                        i++;
                    };

                    console.log("Replace with: " + swapDino);

                    $newDino.html(swapDino);
                    $(this).parent().replaceWith($newDino);

                });


            })

            .fail(function(jqXHR, textStatus, errorThrown){
                console.log('There was an error');
            })
            .always(function(){
                console.log('AJAX complete');
            })

    }

});

function displayNewDeck(data){
    var shuffled = shuffle(data);
    var cute5 = shuffled.splice(0, 5);

    cute5.forEach(function(elem){
        var $buttonChange = $('<button>').text('Swap Dino').attr('id','changeDino').attr('data-id', elem.id);
        var $div = $('<div>').attr('data-id',elem.id).html('<img src=\"' + elem.imgLink + '\" alt=\"' + elem.id + '\">').append($buttonChange);
        $cuteDinos.append($div);
    });
    return cute5;
}


function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}