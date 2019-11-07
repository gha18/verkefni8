const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    const checkboxes = _items.getElementsByClassName('item__checkbox');
    const spans = _items.getElementsByClassName('item__text');
    items = _items;
    form = _form;
    const added = _form.querySelector('.form__button');
    const deleted = _items.getElementsByClassName('item__button');

    _form.addEventListener('submit', formHandler);

    for(i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('click', finish);
    }

    for(i = 0; i < spans.length; i++) {
      spans[i].addEventListener('click', edit);
    }

    added.addEventListener('click', add);

    for(i = 0; i < spans.length; i++) {
      deleted[i].addEventListener('click', deleteItem);
    }
    
    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();

    console.log('halló heimur');
  }

  function finish(e) {
    this.toggleAttribute('checked');
    this.parentNode.classList.toggle('item--done');
  }

  function edit(e) {
    var input = document.createElement('input');
    input.value = this.innerHTML;
    this.parentNode.insertBefore(input, this.nextSibling);
    this.parentNode.removeChild(this);
    input.classList.add('item__edit');
    input.select();

    input.addEventListener('keypress', commit);
  }

  function commit(e) {
    if(e.key === 'Enter') {
      var spantext = document.createElement('span');
      spantext.classList.add('item__text');
      spantext.innerHTML = this.value;
      this.parentNode.insertBefore(spantext, this.nextSibling);
      this.parentNode.removeChild(this);
    }
  }

  function add(e) {
    inValue = this.previousElementSibling.value;
    if(inValue.trim().length > 0) {
      var newItem = document.createElement('li');
      newItem.classList.add('item');
      items.appendChild(newItem);

      var newCheckbox = document.createElement('input');
      newCheckbox.setAttribute('type', 'checkbox');
      newCheckbox.setAttribute('class', 'item__checkbox');
      newItem.appendChild(newCheckbox);

      var newSpan = document.createElement('span');
      newSpan.setAttribute('class', 'item__text');
      newSpan.innerHTML = inValue;
      newItem.appendChild(newSpan);

      var newButton = document.createElement('button');
      newButton.setAttribute('class', 'item__button');
      newButton.innerHTML = 'Eyða';
      newItem.appendChild(newButton);

      this.previousElementSibling.value = "";
      this.previousElementSibling.select();

      text.init(form, items);
    }
  }

  function deleteItem(e) {
    document.querySelector('.items').removeChild(this.parentNode);
  }

  return {
    init: init
  }
})();
