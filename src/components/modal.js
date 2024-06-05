// функция открытия попапа
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

// функция закрытия попапа
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

// функция закрытия при нажатии 'Esc'
export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

// функция закрытия при 'клике' на оверлей
export function closePopupBackDropClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}
