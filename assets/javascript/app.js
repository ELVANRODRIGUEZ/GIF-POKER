var gifPokerGame = {
    gameOn: false,
    cardsOnTable: false,
    farePaid: false,
    inputSubject: "",
    selectedSubjectArr: [],
    selectedSubject: "",
    retrievedGifsArr: [],
    apiKey: "14e0EMJf2PozsDqZWomXegmjtEWeSgIU",
    addSubject: function (subjectToAdd) {
        if (subjectToAdd != "") {
            var subjectsBlock = $(".selectedSubjects");
            var toBeAddedSubject =
                "<span class='newSubject'>" +
                subjectToAdd +
                "</span><img class='cassinoToken' subject='" +
                subjectToAdd +
                "' src='assets/images/CassinoCoin.png'>";

            subjectsBlock.append(toBeAddedSubject);
            $("#searcher").val("");

        }

    },

    retrieveSubject: function (subject) {
        var queryURL =
            "https://api.giphy.com/v1/gifs/search?api_key=" +
            gifPokerGame.apiKey + "&q=" +
            subject +
            "&rating=PG-13&lang=es";

        console.log(subject);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (resp) {
            console.log(resp);
            $(".gifImages").each(function (i) {
                var randomResult = Math.floor(Math.random() * resp.data.length);
                var url = resp.data[randomResult].images.original.url;
                console.log(url);
                $(this).attr("src", url);
            })
        })

    },

    displayHand: function () {
        if (!this.cardsOnTable) {
            $("#slot1").css("visibility", "visible");
            $("#slot1").animate({
                left: "+=50"
            }, 100, function () {});
            setTimeout(function () {
                $("#slot2").css("visibility", "visible");
                $("#slot2").animate({
                    left: "+=200"
                }, 200, function () {});
            }, 100);
            setTimeout(function () {
                $("#slot3").css("visibility", "visible");
                $("#slot3").animate({
                    left: "+=350"
                }, 300, function () {});
            }, 300);
            setTimeout(function () {
                $("#slot4").css("visibility", "visible");
                $("#slot4").animate({
                    left: "+=500"
                }, 400, function () {});
            }, 600);

            this.cardsOnTable = true;
        }

    }
}

$(document).on("click", ".cassinoToken", function () {
    gifPokerGame.selectedSubject = $(this).attr("subject");
    gifPokerGame.selectedSubject = gifPokerGame.selectedSubject.replace(/\s/g, "%20");
    gifPokerGame.retrieveSubject(gifPokerGame.selectedSubject);
    gifPokerGame.farePaid = true;
    $("#pokerMaze").css("filter", "drop-shadow(15px 15px 5px black)");
    $("#pokerMaze").css("margin-right", "5px");

})

$(".addSubject").on("click", function (event) {
    event.preventDefault();
    gifPokerGame.inputSubject = $("#searcher").val().toUpperCase();
    gifPokerGame.addSubject(gifPokerGame.inputSubject);

})

$("#pokerMaze").on("click", function () {
    if (gifPokerGame.farePaid) {
        gifPokerGame.displayHand();
        $(this).css("filter", "drop-shadow(5px 5px 5px black)");
        $(this).css("margin-right", 0);
        gifPokerGame.farePaid = false;
    }
})

$(document).on("mouseover", ".newSubject", function () {
    $(this).css("cursor", "not-allowed");
    $(this).css("background-color", "red");

})

$(document).on("mouseout", ".newSubject", function () {
    $(this).css("background-color", "rgb(0, 0, 0)");

})

$(document).on("click", ".newSubject", function () {
    var subject = $(this).text();
    $(this).remove();
    $("img[subject*='" + subject + "']").remove();
})