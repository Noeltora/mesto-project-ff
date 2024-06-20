import { deleteInitialCards, toggleLikeMark } from "./api";
import { closeModal, openModal } from "./modal";

const popupDeleteCard = document.querySelector(".popup_type_delete-card");
let deletedCard = false;
let deletedCardId = false;

// Функция создания карточки
export function addCard(cardData, deleteFn, likeFn, fullCardImage, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeForCardButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const cardTargetImage = cardElement.querySelector(".card__image");

  cardTargetImage.src = cardData.link;
  cardTargetImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  likeCounter.textContent = cardData.likes.length;

  if (cardData.likes.some((like) => like._id === userId)) {
    likeForCardButton.classList.add("card__like-button_is-active");
  }

  if (userId === cardData.owner._id) {
    deleteButton.addEventListener("click", () => {
      deleteFn(cardElement, cardData._id);
    });
  } else {
    deleteButton.remove();
  }

  likeForCardButton.addEventListener("click", (evt) => {
    likeFn(evt, cardData._id, likeCounter);
  });

  cardTargetImage.addEventListener("click", () => {
    fullCardImage(cardData.name, cardData.link);
  });

  return cardElement;
}

// Функция открытия попапа удаления карточки с присваиванием
export function deleteCard(cardElement, cardId) {
  deletedCard = cardElement;
  deletedCardId = cardId;

  openModal(popupDeleteCard);
}

// Функция лайка карточки
export function likeCard(evt, cardId, likeCounter) {
  toggleLikeMark(
    cardId,
    evt.target.classList.contains("card__like-button_is-active")
  )
    .then((result) => {
      evt.target.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = result.likes.length;
    })
    .catch((err) => console.log(err));
}

//Функция удаления карточки
export function agreeWithDeleteCard() {
  if (deletedCard && deletedCardId) {
    deleteInitialCards(deletedCardId)
      .then(() => {
        deletedCard.remove();
        closeModal(popupDeleteCard);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
