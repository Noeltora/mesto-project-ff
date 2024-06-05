import "../pages/index.css";
import { initialCards } from "../pages/cards.js";
import { addCard, deleteCard, likeCard } from "../components/card.js";
import {
  openModal,
  closeModal,
  closePopupBackDropClick,
} from "../components/modal.js";

const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const addButtonPopup = document.querySelector(".profile__edit-button");
const closeButtonPopup = document.querySelectorAll(".popup__close");
const addButtonContent = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupFullImage = document.querySelector(".popup_type_image");
const popupCardImage = popupFullImage.querySelector(".popup__image");
const popupCaption = popupFullImage.querySelector(".popup__caption");

// Функция открытия full изображения карточки
function openCardImage(cardName, cardLink) {
  popupCardImage.src = cardLink;
  popupCardImage.alt = cardName;
  popupCaption.textContent = cardName;
  openModal(popupFullImage);
}

// Вывести карточки на страницу
initialCards.forEach((card) => {
  const result = addCard(card, deleteCard, likeCard, openCardImage);
  cardsContainer.append(result);
});

// слушатель открытия попапа
addButtonPopup.addEventListener("click", function () {
  openModal(popupEdit);
});

// слушатель закрытия попапа
closeButtonPopup.forEach(function (closeButton) {
  const popup = closeButton.closest(".popup");
  popup.classList.add("popup_is-animated");
  popup.addEventListener("mousedown", closePopupBackDropClick);
  closeButton.addEventListener("click", function () {
    closeModal(popup);
  });
});

// слушатель закрытия попапа по нажатию на оверлей
popups.forEach(function (popup) {
  popup.addEventListener("mousedown", closePopupBackDropClick);
});

// слушатель открытия карточки
addButtonContent.addEventListener("click", function () {
  openModal(popupNewCard);
});

// Находим форму в DOM
const formElementForProfile = document.forms["edit-profile"]; // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElementForProfile.querySelector(
  ".popup__input_type_name"
); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElementForProfile.querySelector(
  ".popup__input_type_description"
);
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmitForProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Выберите элементы, куда должны быть вставлены значения полей

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeModal(popupEdit);
  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementForProfile.addEventListener("submit", handleFormSubmitForProfile);

const formNewCardElement = document.forms["new-place"];
const newCardNameinput = formNewCardElement.querySelector(
  ".popup__input_type_card-name"
);
const newCardUrlInput = formNewCardElement.querySelector(
  ".popup__input_type_url"
);

// Функция вывода карточки

function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const cardData = {
    name: newCardNameinput.value,
    link: newCardUrlInput.value,
  };
  const result = addCard(cardData, deleteCard, likeCard, openCardImage);
  cardsContainer.prepend(result);
  newCardNameinput.value = "";
  newCardUrlInput.value = "";
  closeModal(popupNewCard);
}

formNewCardElement.addEventListener("submit", handleFormSubmitPlace);
