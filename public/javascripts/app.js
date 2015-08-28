var $cuteDinos = $('#cuteDinos');


$(document).ready(function(){
    AJAXcall();

    $cuteDinos.on('click', '#getDeck', function(){
        $cuteDinos.empty();
        AJAXcall();
    });

    $cuteDinos.on('click', '#changeDino', function(){
        var dinos = ['dino1', 'dino2', 'dino3', 'dino4', 'dino5', 'dino6'];

        $('div').each(function(index){
            console.log($(this).data('id'));
        })


    });

    function AJAXcall(){
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/cute'})

            .done(function(data){
                var $buttonGenerate = $('<button>').text('Change Deck').attr('id','getDeck');
                $cuteDinos.prepend($buttonGenerate);
                displayNewDeck(data);

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