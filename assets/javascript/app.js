var gifPokerGame = {
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
                var randomResult = Math.floor(Math.random() * resp.data.length -1);
                var url = resp.data[randomResult].images.original.url;
                console.log(url);
                $(this).attr("src", url);
            })
        })
    }
}

$(document).on("click", ".cassinoToken", function () {
    gifPokerGame.selectedSubject = $(this).attr("subject");
    gifPokerGame.selectedSubject = gifPokerGame.selectedSubject.replace(/\s/g, "%20");
    gifPokerGame.retrieveSubject(gifPokerGame.selectedSubject);

})

$(document).on("click", ".addSubject", function (event) {
    event.preventDefault();
    gifPokerGame.inputSubject = $("#searcher").val().toUpperCase();
    gifPokerGame.addSubject(gifPokerGame.inputSubject);

})