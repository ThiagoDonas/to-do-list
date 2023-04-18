const forms = document.getElementById('myform');
const nome = forms.elements.Atividade;
const date = forms.elements.Data;
const submit = forms.elements.submit;
submit.onclick = function (e) {
  e.preventDefault();
  const tabela = document.getElementById('table');
  const row = table.insertRow(1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  cell1.innerHTML = nome.value;
  cell2.innerHTML = date.value;
};
