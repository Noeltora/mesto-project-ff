// Функция создания карточки

export function addCard(cardData, deleteFn, likeFn, fullCardImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeForCardButton = cardElement.querySelector(".card__like-button");

  const cardTargetImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteFn(cardElement);
  });

  likeForCardButton.addEventListener("click", () => {
    likeFn(likeForCardButton);
  });

  cardTargetImage.addEventListener("click", () => {
    fullCardImage(cardData.name, cardData.link);
  });

  return cardElement;
}

// Функция удаления карточки

export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка карточки
export function likeCard(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

// Функция создания своей карточки
export function addNewCard(
  placeValue,
  urlValue,
  deleteFn,
  likeFn,
  fullCardImage
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeForNewCardButton = cardElement.querySelector(".card__like-button");

  const cardTargetImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = urlValue;
  cardElement.querySelector(".card__image").alt = placeValue;
  cardElement.querySelector(".card__title").textContent = placeValue;

  deleteButton.addEventListener("click", () => {
    deleteFn(cardElement);
  });

  likeForNewCardButton.addEventListener("click", () => {
    likeFn(likeForNewCardButton);
  });

  cardTargetImage.addEventListener("click", () => {
    fullCardImage(placeValue, urlValue);
  });

  return cardElement;
}
