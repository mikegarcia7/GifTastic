// Function to run on Document Ready
$(document).ready(function(){
  $("#button-container").on("click", ".button", getAPI)
  addButton();
}); 

// Set Array for Animals
  var animals = ["dog", "cat", "goldfish", "hamster"];
  
// Function for turning strings from array into buttons
  function addButton () {
    var input = $("#animal-input").val();
    animals.push(input);
    $("#button-container").text("");
    
    for (var i = 0; i < animals.length -1; i++) {
    var button = "<button class='button' data-animal='" + animals[i] + "'>" + animals[i] + "</button>";
    $("#button-container").append(button);
    } 
  }

  // Function for getting API using ajax
  function getAPI(){

    var animal = $(this).attr("data-animal");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=bq5lk4y7zXt3GASIjmOI9dv05tCZTpxm&limit=11";
      

        $.ajax({
          url: queryURL,
          method: "GET",
        }).then(function(response) {
          var results = response.data;
  
  
          for (var i = 0; i <= results.length; i++) {
  
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var gifDiv = $("<div>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var animalImage = $("<img>");
    
              animalImage.attr("src", results[i].images.fixed_height_still.url);
              animalImage.attr("data-animate", results[i].images.fixed_height.url);
              animalImage.attr("data-still", results[i].images.fixed_height_still.url);
              animalImage.attr("data-state", "still");  
              animalImage.addClass("gif");
  
              gifDiv.append(p);
              gifDiv.append(animalImage);
  
              $("#gifs-appear-here").prepend(gifDiv);       
          }
        };
      });
  }
      
// Function to stop and animate gifs
$(document).on("click", ".gif",function() { 
  
  var state = $(this).attr("data-state");
  console.log(state)
  if (state === "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});
