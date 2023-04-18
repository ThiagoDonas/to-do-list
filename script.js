const submit = document.querySelector('#envio');
console.log(submit);
submit.addEventListener('click', function (e) {
  e.preventDefault();
  const name = document.querySelector('#Activity');
  console.log(name.value);
  const date = document.querySelector('#date');
  console.log(date.value);
});
