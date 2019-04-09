
// Gloval Variables
var appID = "67c2050d"; // edamamAPI application ID
var appKey = "02528f14c7626f63be40279b3e984811"; // edamamAPI application key
var searchParam = ""; // the search param to use for the api query
var excluded = ""; // ingredient to exclude from results (for future functionality)
var diet = ""; // diet selector
var health = ""; // health selector
var from = 0; // index of the first result to return from the API
var to = 5; // index of the last result to return from the API
var regEx = /[^a-zA-Z\s]/gi; //only letters and spaces

// Constructor
function listIngredients(ingre) {
var ingList = $('<ul>');    
    for (var i = 0; i < ingre.length; i++) {
        var ing = $('<li>').text(ingre[i].text);
        ingList.append(ing);
    }
    return ingList;
};
function showRecipe(recipeurl,recipeing,recipeimg,recipelabel) {
    var link = $('<a>').attr({
        'href': recipeurl,
        'target': '_blank'
    });
   
    var card = $('<article>').addClass('card').append($('<picture>').addClass('thumbnail')
        .append($('<img>').attr('src',recipeimg))).append($('<div>').addClass('card-content').append(listIngredients(recipeing))
        .append($('<p>').addClass('category category__01').text(recipelabel)))
        .append($('<footer>').addClass('footerCard').append($('<div>').addClass('post-meta')
        .append($('<span>').addClass('redirect').append($('<a>').attr('href',recipeurl).text('view this recipe'))
        )));


    $('.result').append(card);
};


function apiSuccess(json) {
    for (var i = 0; i < json.hits.length; i++) {
        for (var i = 0; i < json.hits.length; i++) {
                showRecipe(json.hits[i].recipe.shareAs,json.hits[i].recipe.ingredients,json.hits[i].recipe.image,json.hits[i].recipe.label);           
                 }
    }
}

// API
function runAPI() {
    var apiURL = "https://api.edamam.com/search?app_id=" + appID + "&app_key=" + appKey + "&q=" + searchParam + "&excluded=" + excluded + "&from=" + from + "&to=" + to + diet + health;
    $.ajax({
        type: "GET",
        dataType: "json",
        async: "false",
        url: apiURL,
        success: function (json) { 
            apiSuccess(json);
            $('#searchBox').attr('placeholder', 'What do you want to cook?');

        },
        
    });
}

$(document).ready(function () {

    $('#searchBtn').click(function () {
        if ($('#searchBox').val() !== "") {
            from = 0;
            to = 40;

            $('.result').empty();
            searchParam = $('#searchBox').val();
            runAPI();

        }
    });
});

    
