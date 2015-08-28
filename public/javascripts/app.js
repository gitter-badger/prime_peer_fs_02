$(document).ready(function(){

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/cute'})

        .done(function(data){
            var shuffled = shuffle(data);
            var cute5 = shuffled.splice(0, 5);

            var $cuteDinos = $('#cuteDinos');

            cute5.forEach(function(elem){
                var $div = $('<div>').html('<img src=\"' + elem.imgLink + '\" alt=\"' + elem.id + '\">');
                    $cuteDinos.append($div);
            })
        })

        .fail(function(jqXHR, textStatus, errorThrown){
            console.log('There was an error');
        })
        .always(function(){
            console.log('AJAX complete');
        })
});

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