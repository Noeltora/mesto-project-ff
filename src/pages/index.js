import "../pages/index.css";
import {
  createCard,
  deleteCard,
  likeCard,
  agreeWithDeleteCard,
} from "../components/card.js";
import {
  openModal,
  closeModal,
  closePopupBackDropClick,
} from "../components/modal.js";
import { clearValidation, enableValidation } from "../components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  patchUserInfo,
  postNewCard,
  patchUserAvatar,
} from "../components/api.js";

const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const addButtonPopup = document.querySelector(".profile__edit-button");
const popupEditAvatar = document.querySelector(".popup_type_avatar-edit");
const closeButtonPopup = document.querySelectorAll(".popup__close");
const addButtonContent = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupFullImage = document.querySelector(".popup_type_image");
const popupCardImage = popupFullImage.querySelector(".popup__image");
const popupCaption = popupFullImage.querySelector(".popup__caption");
const formNewCardElement = document.forms["new-place"];
const formPopupAvatar = document.forms["edit-avatar"];
const formPopupDeleteCard = document.forms["delete-card"];
const newCardNameinput = formNewCardElement.querySelector(
  ".popup__input_type_card-name"
);
const newCardUrlInput = formNewCardElement.querySelector(
  ".popup__input_type_url"
);
const formElementForProfile = document.forms["edit-profile"];
const nameInput = formElementForProfile.querySelector(
  ".popup__input_type_name"
);
const jobInput = formElementForProfile.querySelector(
  ".popup__input_type_description"
);
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const avatarForProfile = document.querySelector(
  ".popup__input_type_avatar-url"
);
const profileImage = document.querySelector(".profile__image");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Функция открытия full изображения карточки
function openCardImage(cardName, cardLink) {
  popupCardImage.src = cardLink;
  popupCardImage.alt = cardName;
  popupCaption.textContent = cardName;
  openModal(popupFullImage);
}

// функция ожидания загрузки
function renderLoading(isLoading) {
  const loadButton = document.querySelector(".popup_is-opened .popup__button");
  if (loadButton) {
    loadButton.textContent = isLoading ? "Сохранение..." : "Сохранить";
  }
}

// функция вывода карточек
function presentCards(cards, userId) {
  cards.forEach((card) => {
    const newCard = createCard(
      card,
      deleteCard,
      likeCard,
      openCardImage,
      userId
    );
    cardsContainer.append(newCard);
  });
}

// слушатель открытия попапа профиля
addButtonPopup.addEventListener("click", function () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  // очистка ошибок валидации вызовом clearValidation
  clearValidation(popupEdit, validationConfig);
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
  formNewCardElement.reset();
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
});

function handleFormSubmitForProfile(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const about = jobInput.value;

  renderLoading(true);
  patchUserInfo(name, about)
    .then((info) => {
      nameProfile.textContent = info.name;
      jobProfile.textContent = info.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(popupEdit);
    });
}

// отправка формы профиля
formElementForProfile.addEventListener("submit", handleFormSubmitForProfile);

function handleSubmitForAvatarProfile(evt) {
  evt.preventDefault();
  renderLoading(true);

  patchUserAvatar(avatarForProfile.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(popupEditAvatar);
    });
}

// отправка формы фото профиля
formPopupAvatar.addEventListener("submit", handleSubmitForAvatarProfile);

// открытие фото профиля
profileImage.addEventListener("click", () => {
  openModal(popupEditAvatar);
});

// Функция вывода карточки
function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const cardData = {
    name: newCardNameinput.value,
    link: newCardUrlInput.value,
  };
  renderLoading(true);

  postNewCard(cardData.name, cardData.link)
    .then((newCard) => {
      const result = createCard(
        newCard,
        deleteCard,
        likeCard,
        openCardImage,
        newCard.owner._id
      );
      cardsContainer.prepend(result);
      formNewCardElement.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
      closeModal(popupNewCard);
    });
}

// отправка формы карточки
formNewCardElement.addEventListener("submit", handleFormSubmitPlace);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation(validationConfig);

function presentProfile(user) {
  nameProfile.textContent = user.name;
  jobProfile.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
}

//отправка формы удаления карточки
formPopupDeleteCard.addEventListener("submit", agreeWithDeleteCard);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    presentProfile(user);
    presentCards(cards, user._id);
  })
  .catch((err) => console.log(err));
