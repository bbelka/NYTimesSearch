var searchTerms = $("#search-term");
// var numberRec = $("#number-records")
var startYear = $("#start-year")
var endYear = $("#end-year");
var search = $("#src-btn");
var clear = $("#clear-btn");
var searchDiv = $("#searchRow");
var searchQuery
var queryTerm
var beginYear
var endYear
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=AexBs82F271plW5NYllpAgocdxd0Q2Dw"

search.on("click", function () {
    searchDiv.empty();
    searchFunc();
});

clear.on("click", function () {
    event.preventDefault();
    // $("input", "select", ".searchRow").reset();
    document.getElementById('theform').reset();
    searchDiv.empty();
    // numberRec.selectedIndex = -1;
});

function searchFunc() {
    event.preventDefault();
    var numberRec = $("#number-records").val()
    console.log(numberRec);
    searchQuery = "&q=" + ($("#search-term").val().trim());
    queryURL = queryURL + searchQuery;
    if (startYear.val()) {
        startYear = startYear.val().trim();
        queryURL = queryURL + "&begin_date=" + startYear + "0101";
    }
    if (endYear.val()) {
        endYear = endYear.val().trim();
        queryURL = queryURL + "&end_date=" + endYear + "1231";
    }
    console.log(queryURL);
    // if (numberRec <= 10) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        result = response.response.docs
        console.log(result);
        for (var i = 0; i < numberRec; i++) {
            var newDiv = $("<div>");
            var newA = $("<a>");
            var searchH3 = $("<h3>");
            var searchP = $("<p>");
            newA.attr("href", result[i].web_url);
            searchH3.text((i + 1) + "  " + result[i].headline.main);
            if (result[i].multimedia[0]) {
                var newImg = $("<img>");
                newImg.attr("src", "https://www.nytimes.com/" + result[i].multimedia[0].url)
                newImg.attr("width", "100%");
                newImg.attr("height", "auto");
            };
            searchP.text(result[i].abstract);
            newA.append(searchH3);
            newDiv.append(newA);
            if (newImg) {
                newDiv.append(newImg);
            }
            newDiv.append(searchP);
            searchDiv.append(newDiv);
            console.log("fin")
        };
    })
    // } else {
    //     console.log(queryURL)
    //     for (x = 0; x < (numberRec / 10); x++) {
    //         // queryURL = queryURL + "&page=" + x;
    //         // console.log(queryURL)
    //         $.ajax({
    //             url: queryURL + "&page=" + x,
    //             method: "GET"
    //         }).then(function (response) {
    //             console.log(queryURL)
    //             result = response.response.docs
    //             console.log(result);
    //             var numberRec = $("#number-records").val()
    //             console.log(numberRec);
    //             for (var i = 0; i < numberRec; i++) {
    //                 var newDiv = $("<div>");
    //                 var newA = $("<a>");
    //                 var searchH3 = $("<h3>");
    //                 var searchP = $("<p>");
    //                 newA.attr("href", result[i].web_url);
    //                 searchH3.text(result[i].headline.main);
    //                 if (result[i].multimedia[0]) {
    //                     var newImg = $("<img>");
    //                     newImg.attr("src", "https://www.nytimes.com/" + result[i].multimedia[0].url)
    //                     newImg.attr("width", "100%");
    //                     newImg.attr("height", "auto");
    //                 };
    //                 searchP.text(result[i].abstract);
    //                 newA.append(searchH3);
    //                 newDiv.append(newA);
    //                 if (newImg) {
    //                     newDiv.append(newImg);
    //                 }
    //                 newDiv.append(searchP);
    //                 searchDiv.prepend(newDiv);
    //             };
    //         });
    //     }
    // };
};


