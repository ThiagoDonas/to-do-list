const forms = document.getElementById('myform');
const nome = forms.elements.Atividade;
const date = forms.elements.Data;
const submit = forms.elements.submit;
submit.onclick = function (e) {
  e.preventDefault();
  const tabela = document.getElementById('table');
  const row = table.insertRow(2);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  cell1.innerHTML = nome.value;
  cell2.innerHTML = date.value;
  cell3.innerHTML = `<input class= 'button'  id= ${nome.value} type="submit" value="Editar"/>`;
  cell4.innerHTML = `<input class= 'button'  id= ${nome.value} type="submit" value="Excluir"/>`;
  const buttontable = document.querySelectorAll('.button');
  buttontable.forEach(function (element) {
    element.onclick = function (e) {
      const input = e.srcElement;
      if (input.value == 'Excluir') {
        const tr = document
          .getElementById(`${input.id}`)
          .parentElement.parentElement.remove();
      }
      if (input.value == 'Editar') {
        const tr = document
          .getElementById(`${input.id}`)
          .parentElement.parentElement.remove();
      }
    };
  });
};
