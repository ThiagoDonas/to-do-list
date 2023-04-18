const forms = document.getElementById('myform');
const nome = forms.elements.Atividade;
const date = forms.elements.Data;
const submit = forms.elements.submit;

submit.onclick = function (e) {
  e.preventDefault();
  const exist = document.getElementById(`${nome.value}${date.value}`);
  if (exist == null) {
    const tabela = document.getElementById('table');
    const row = table.insertRow(2);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.innerHTML = nome.value;
    cell2.innerHTML = date.value;
    cell3.innerHTML = `<input class= 'button'  id= ${nome.value}${date.value} type="submit" value="Editar"/>`;
    cell4.innerHTML = `<input class= 'button'  id= ${nome.value}${date.value} type="submit" value="Excluir"/>`;
  } else {
  }
  const buttontable = document.querySelectorAll('.button');
  buttontable.forEach(function (element) {
    element.onclick = function (e) {
      const input = e.srcElement;
      if (input.value == 'Excluir') {
        const tr = document.getElementById(`${input.id}`).parentElement
          .parentElement;
        tr.remove();
      }
      if (input.value == 'Editar') {
        const tr = document.getElementById(`${input.id}`).parentElement
          .parentElement;
        console.log(forms.elements.Atividade);
        console.log(tr.children[0]);
        forms.elements.Atividade.value = tr.children[0].textContent;
        forms.elements.Data.value = tr.children[1].textContent;
      }
    };
  });
};
