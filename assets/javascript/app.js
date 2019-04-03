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

        this.flipCoin();
        setTimeout(function () {
            gifPokerGame.flipCard();
        }, 500);
    },

    displayHand: function () {
        if (!this.cardsOnTable) {
            this.flipCard();
            $("#slot1").css("visibility", "visible");
            $("#slot1").animate({
                left: "+=50"
            }, 100, function () {});
            setTimeout(function () {
                $("#slot2").css("visibility", "visible");
                gifPokerGame.flipCard();
                $("#slot2").animate({
                    left: "+=200"
                }, 200, function () {});
            }, 100);
            setTimeout(function () {
                $("#slot3").css("visibility", "visible");
                gifPokerGame.flipCard();
                $("#slot3").animate({
                    left: "+=350"
                }, 300, function () {});
            }, 300);
            setTimeout(function () {
                $("#slot4").css("visibility", "visible");
                gifPokerGame.flipCard();
                $("#slot4").animate({
                    left: "+=500"
                }, 400, function () {});
            }, 600);

            this.cardsOnTable = true;
        }

    },

    flipCard: function () {
        var cardFlipSound = new Audio("assets/sounds/CardFlip.mp3");
        cardFlipSound.volume = .6;
        cardFlipSound.play();
    },

    flipCoin: function () {
        var flipCoinpSound = new Audio("assets/sounds/CoinThrow.mp3");
        flipCoinpSound.volume = .6;
        flipCoinpSound.play();
    }

}

$(document).on("click", ".cassinoToken", function () {
    gifPokerGame.selectedSubject = $(this).attr("subject");
    gifPokerGame.selectedSubject = gifPokerGame.selectedSubject.replace(/\s/g, "%20");
    gifPokerGame.retrieveSubject(gifPokerGame.selectedSubject);
    gifPokerGame.farePaid = true;
    setTimeout(function () {
        $("#pokerMaze").css("filter", "drop-shadow(15px 15px 5px black)");
        $("#pokerMaze").css("margin-right", "5px");
        $("#pokerMaze").attr("src", "assets/images/PokerMaze2.png")
    }, 800);
    if (gifPokerGame.cardsOnTable) {
        $("#slot1").css("left", "-50px");
        $("#slot1").css("visibility", "hidden");
        $("#slot2").css("left", "-200px");
        $("#slot2").css("visibility", "hidden");
        $("#slot3").css("left", "-350px");
        $("#slot3").css("visibility", "hidden");
        $("#slot4").css("left", "-500px");
        $("#slot4").css("visibility", "hidden");
        gifPokerGame.cardsOnTable = false;
    }

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
        $("#pokerMaze").attr("src", "assets/images/PokerMaze.png")
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

$("#searcher").on("keydown", function (event) {
    if (event.which == "13") {
        event.preventDefault();
        gifPokerGame.inputSubject = $("#searcher").val().toUpperCase();
        gifPokerGame.addSubject(gifPokerGame.inputSubject);
    }
})