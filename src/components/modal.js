const popupFullImage = document.querySelector(".popup_type_image");
const popupCardImage = popupFullImage.querySelector(".popup__image");
const popupCaption = popupFullImage.querySelector(".popup__caption");

// Функция открытия full изображения карточки
export function openCardImage(cardName, cardLink) {
  popupCardImage.src = cardLink;
  popupCardImage.alt = cardName;
  popupCaption.textContent = cardName;
  openPopup(popupFullImage);
}

// функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

// функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

// функция закрытия при нажатии 'Esc'
export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

// функция закрытия при 'клике' на оверлей
export function closePopupBackDropClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
