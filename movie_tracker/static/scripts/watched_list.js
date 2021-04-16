const watched_list = document.getElementById("watched-list-cards");

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

populateWatchedList(watched_list);
