$(document).ready(function () {

    var newbuttons=[];
    var wilcount = 0;
    var presidents = ["Barack Obama", "Vladimir Putin", "Emmanuel Macron", "Sergio Mattarella", "Raúl Castro"];

    for (var i = 0; i < presidents.length; i++) {
        var olddiv = $("<div>");

        var newbutton = $("<button style=margin-left:5px;>");
        newbutton.addClass("btn btn-primary");
        // oldbuttons.attr('id', 'butt-'+wilcount);
        newbutton.attr('data-president', presidents[i]);
        
        newbutton = newbutton.text(presidents[i]);
        newbuttons.push(newbutton)

        $(".buttons").append(newbutton);
    }


    $("#add-items").on("click", function (event) {

        var toDoTask = $("#name-input").val().trim();
        newbuttons = $("<button style=margin-left:5px;>");
        newbuttons.addClass("btn btn-primary");
        newbuttons.attr('id', 'butt-' + wilcount);
        newbuttons.attr('data-president', toDoTask);
        newbuttons = newbuttons.text(toDoTask);
        $(".buttons").append(newbuttons);
        event.preventDefault();
        wilcount++;
    })





    $(".buttons").on("click", function (event) {
        console.log(event)
        $(".Gif").empty();

        var president = $(event.target).attr("data-president");
        console.log(newbuttons);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            president + "&api_key=76l4XOO9P5tDLkdPqlkSDxbzf1kczSLH&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);
            results = response.data;

            for (var i = 0; i < results.length; i++) {

                var PresidentDiv = $('<div class="gifall">');
                var p = $("<p>").text("Rating: " + results[i].rating);
                console.log(response)
                var PresidentImage = $("<img>");
                PresidentImage.attr('id', "still");
                //  PresidentImage.attr('data-state',"still" );
                PresidentImage.attr("src", results[i].images.fixed_height_still.url);
                PresidentImage.attr('newsrc', results[i].images.fixed_height.url);
                PresidentImage.attr('oldsrc', results[i].images.fixed_height_still.url);
                PresidentDiv.append(p);
                PresidentDiv.append(PresidentImage);
                $(".Gif").prepend(PresidentDiv);

            }
        });

        $(document.body).on("click", ".Gif", function (event) {
            // var state =(event.target).attr("data-state");
            var state = $(event.target).attr("id");
            console.log(state)
            if (state === "still") {
                $(event.target).attr("src", $(event.target).attr("newsrc"));
                $(event.target).attr("id", "animate");
            } else {
                $(event.target).attr("src", $(event.target).attr("oldsrc"));
                $(event.target).attr("id", "still");
            }
        });
    });



});

