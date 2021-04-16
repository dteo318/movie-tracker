function addCardReveal(card, movie_name, movie_description) {
  // Create card reveal elements
  const card_reveal_holder = document.createElement("div");
  card_reveal_holder.className = "card-reveal";
  //   Creating movie title element
  const card_title = document.createElement("span");
  card_title.className = "card-title activator grey-text text-darken-4";
  card_title.textContent = movie_name;
  const card_movie_icon = document.createElement("i");
  card_movie_icon.className = "material-icons right";
  card_movie_icon.textContent = "movie";
  card_title.appendChild(card_movie_icon);
  //   Adding title to reveal card
  card_reveal_holder.appendChild(card_title);
  //   Creating card description elements
  const card_description = document.createElement("p");
  card_description.textContent = movie_description;
  //   Adding movie description to reveal card
  card_reveal_holder.appendChild(card_description);
  //   Adding reveal card to card
  card.appendChild(card_reveal_holder);
}

function addCardImage(card) {
  //   Creating card image elements
  const card_image_holder = document.createElement("div");
  card_image_holder.className =
    "card-image waves-effect waves-block waves-light";
  const card_image = document.createElement("img");
  card_image.className = "activator";
  //   Setting image source
  const image_source = "static/images/marvel_infinity_war.jpg";
  card_image.src = image_source;
  //   Adding card image to image container
  card_image_holder.appendChild(card_image);
  //   Adding image to card
  card.appendChild(card_image_holder);
}

function addCardContent(card, movie_name) {
  // Creating card content elements
  const card_content_holder = document.createElement("div");
  card_content_holder.className = "card-content";
  //   Creating card movie title element
  const card_title = document.createElement("span");
  card_title.className = "card-title activator grey-text text-darken-4";
  card_title.textContent = movie_name;
  const card_movie_icon = document.createElement("i");
  card_movie_icon.className = "material-icons right";
  card_movie_icon.textContent = "movie";
  card_title.appendChild(card_movie_icon);
  //   Adding title element to card content holder
  card_content_holder.appendChild(card_title);
  //   Creating trigger to edit movie
  const edit_movie_trigger_holder = document.createElement("p");
  const edit_movie_trigger = document.createElement("a");
  edit_movie_trigger.className = "modal-trigger";
  edit_movie_trigger.href = "#edit-saved-movie";
  edit_movie_trigger.textContent = "Edit Movie";
  edit_movie_trigger_holder.appendChild(edit_movie_trigger);
  //   Adding trigger to card content holder
  card_content_holder.appendChild(edit_movie_trigger_holder);
  //   Adding card content to card
  card.appendChild(card_content_holder);
}

function addWatchedMovieCard(cards_row, movie_name, movie_description) {
  //   Creating card container
  const card_column = document.createElement("div");
  card_column.className = "col m4";
  const card = document.createElement("div");
  card.className = "card small hoverable";
  //   Adding card content
  addCardImage(card);
  addCardContent(card, movie_name);
  addCardReveal(card, movie_name, movie_description);
  //   Adding card to its column
  card_column.appendChild(card);
  //   Adding column to card's row
  cards_row.appendChild(card_column);
}

function populateWatchedList(watched_list_container) {
  for (let i = 1; i <= 3; i++) {
    const num_cards = 3;
    const cards_row = document.createElement("div");
    cards_row.className = "row";

    for (let c = 0; c < num_cards; c++) {
      const movie_description =
        "Here is some more information about this product that is only revealed once clicked on.";
      addWatchedMovieCard(cards_row, "Infinity War", movie_description);
    }

    watched_list_container.appendChild(cards_row);
  }
}

function getMovieImage(movie_id, image) {
  const image_base_url = "http://image.tmdb.org/t/p/";
  const image_size = "original";
  const query_string =
    movie_database_api + `movie/${movie_id}/images?api_key=` + api_key;
  fetch(query_string)
    .then((response) => response.json())
    .then((data) => {
      try {
        const image_url =
          image_base_url + image_size + data.backdrops[0].file_path;
        image.src = image_url;
      } catch (err) {
        console.log("Image not found");
        image.src = "static/images/marvel_infinity_war.jpg";
      }
    });
}

function createSearchResultCard(
  results_container,
  result_title,
  result_image,
  result_overview,
  result_id
) {
  // Creating card grid containers
  const result_row = document.createElement("div");
  result_row.className = "row";
  const result_col = document.createElement("div");
  result_col.className = "col s12";
  //   Creating card container
  const card = document.createElement("div");
  card.className = "card";
  //   Card image
  const image_container = document.createElement("div");
  image_container.className = "card-image";
  //   Image
  const image = document.createElement("img");
  getMovieImage(result_id, image);
  image_container.appendChild(image);
  //   Card title
  const card_title = document.createElement("span");
  card_title.className = "card-title";
  card_title.textContent = result_title;
  image_container.appendChild(card_title);
  //   Adding image container to card
  card.appendChild(image_container);
  //   Card Content
  const content_container = document.createElement("div");
  content_container.className = "card-content";
  const content = document.createElement("p");
  content.textContent = result_overview;
  content_container.appendChild(content);
  //   Adding content container to card
  card.appendChild(content_container);
  //   Adding add movie action
  const card_action = document.createElement("div");
  card_action.className = "card-action";
  const action = document.createElement("a");
  action.textContent = "Add movie to watched";
  card_action.appendChild(action);
  card.appendChild(card_action);
  //   Adding card to container
  result_col.appendChild(card);
  result_row.appendChild(result_col);
  //   Adding to result
  results_container.appendChild(result_row);
}

function renderMovieCards(resultArr) {
  const search_results_container = document.getElementById("search-results");
  resultArr.forEach((resultObj) => {
    createSearchResultCard(
      search_results_container,
      resultObj.title,
      "static/images/marvel_infinity_war.jpg",
      resultObj.overview,
      resultObj.id
    );
  });
}

function searchMovie(movie_name) {
  const query = movie_name.trim().replace(" ", "+");
  const request_string =
    movie_database_api + "search/movie?api_key=" + api_key + "&query=" + query;
  console.log(request_string);
  fetch(request_string)
    .then((response) => response.json())
    .then((data) => {
      renderMovieCards(data.results);
    });
}

const watched_list = document.getElementById("watched-list-cards");
const api_key = "343bf88c8c21a39b03ed932f7cc2e015";
const movie_database_api = "https://api.themoviedb.org/3/";

populateWatchedList(watched_list);

const add_watched_movie_search = document.getElementById("search-bar");
const add_movie_button = document.getElementById("add-movie-button");

// Focus on search bar when add movie clicked
add_movie_button.onclick = function () {
  add_watched_movie_search.value = "";
  add_watched_movie_search.focus();
};

// To listen for movie searches
add_watched_movie_search.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const search_results_container = document.getElementById("search-results");
    const query_terms = add_watched_movie_search.value;
    search_results_container.innerHTML = "";
    searchMovie(query_terms);
  }
});
