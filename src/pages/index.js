import "../pages/index.css";
import { initialCards } from "../pages/cards.js";
import {
  addCard,
  deleteCard,
  likeCard,
  addNewCard,
} from "../components/card.js";
import {
  openCardImage,
  openPopup,
  closePopup,
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

//Для плавного открытия/закрытия попапа
popupEdit.classList.add("popup_is-animated");
popupFullImage.classList.add("popup_is-animated");
popupNewCard.classList.add("popup_is-animated");

// Вывести карточки на страницу
initialCards.forEach((card) => {
  const result = addCard(card, deleteCard, likeCard, openCardImage);
  cardsContainer.append(result);
});

// слушатель открытия попапа
addButtonPopup.addEventListener("click", function () {
  openPopup(popupEdit);
});

// слушатель закрытия попапа
closeButtonPopup.forEach(function (closeButton) {
  const popup = closeButton.closest(".popup");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });
});

// слушатель закрытия попапа по нажатию на оверлей
popups.forEach(function (popup) {
  popup.addEventListener("click", closePopupBackDropClick);
});

// слушатель открытия карточки
addButtonContent.addEventListener("click", function () {
  openPopup(popupNewCard);
});

// Находим форму в DOM
const formElement = document.forms["edit-profile"]; // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  let nameProfile = document.querySelector(".profile__title");
  let jobProfile = document.querySelector(".profile__description"); // Выберите элементы, куда должны быть вставлены значения полей

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

const formNewCardElement = document.forms["new-place"];
const newCardNameinput = formNewCardElement.querySelector(
  ".popup__input_type_card-name"
);
const newCardUrlInput = formNewCardElement.querySelector(
  ".popup__input_type_url"
);

// Функция вывода своей карточки

function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const result = addNewCard(
    newCardNameinput.value,
    newCardUrlInput.value,
    deleteCard,
    likeCard,
    openCardImage
  );
  cardsContainer.prepend(result);
  newCardNameinput.value = "";
  newCardUrlInput.value = "";
  closePopup(popupNewCard);
}

formNewCardElement.addEventListener("submit", handleFormSubmitPlace);
