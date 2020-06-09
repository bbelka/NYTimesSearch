var searchTerms = $("#search-term");
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

//Search button click event
search.on("click", function () {
    searchDiv.empty();
    searchFunc();
});

//Clear for click event
clear.on("click", function () {
    event.preventDefault();
    document.getElementById('theform').reset();
    searchDiv.empty();
});


//Pull search parameters from form
//Set query full url
function searchFunc() {
    event.preventDefault();
    var numberRec = $("#number-records").val()
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


    //get request to api
    $.ajax(
        {
            url: queryURL,
            method: "GET"
        }
    ).then(function (response) {

        result = response.response.docs

        //iterate over the results to build the results that will be appended to the page
        for (var i = 0; i < numberRec; i++) {

            //set new DOM elements to be appended
            var newDiv = $("<div>");
            var newA = $("<a>");
            var searchH3 = $("<h3>");
            var searchP = $("<p>");
            newA.attr("href", result[i].web_url);
            searchH3.text((i + 1) + "  " + result[i].headline.main);

            //if there is an image, create an image 
            if (result[i].multimedia[0]) {

                var newImg = $("<img>");
                newImg.attr("src", "https://www.nytimes.com/" + result[i].multimedia[0].url)
                newImg.attr("width", "100%");
                newImg.attr("height", "auto");
            };

            //append all of the pertinent information
            searchP.text(result[i].abstract);
            newA.append(searchH3);
            newDiv.append(newA);

            //if there's an image, append it
            if (newImg) {
                newDiv.append(newImg);
            }

            //append content to the page
            newDiv.append(searchP);
            searchDiv.append(newDiv);
        };
    })
};


