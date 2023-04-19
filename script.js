const forms = document.getElementById('myform');
const name = forms.elements.Atividade;
const date = forms.elements.Data;
const submit = forms.elements.submit;
let tarefas = [];
let tabela = document.getElementById('corpotabela');

function adicionarTarefas(name, date) {
  //tarefas = [...tarefas, { name, date }];
  tarefas.push({ name, date });
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function recuperarTarefas() {
  const temp = JSON.parse(localStorage.getItem('tarefas'));
  temp.forEach((tarefa) => {
    adicionarTarefas(tarefa.name, tarefa.date);
  });
  //tarefas = [...JSON.parse(localStorage.getItem('tarefas'))]
}

function editarTarefa(index) {
  const temp = tarefas[index];
  forms.elements.name.value = temp.name;
  forms.elements.date.value = temp.date;
}

function salvarTarefa(index, name, date) {
  tarefas[index] = { name, date };
  limpaForms();
}

function limpaForms() {
  forms.elements.name.value = null;
  forms.elements.date.value = null;
}

function removerLista(index) {
  tarefas.splice(index, 1);
}

function cretaeRow() {
  return document.createElement('tr');
}

function createColum() {
  return document.createElement('td');
}

function createButtonEdite() {
  const button = document.createElement('button');
  button.innerText = 'Editar';
  button.type = 'button';
  button.name = 'editar';
  return button;
}

function creteButtonExcluir() {
  const button = document.createElement('button');
  button.innerText = 'Excluir';
  button.type = 'button';
  button.name = 'excluir';
  console.log(button);
  return button;
}

function rendereizarTabela() {
  tabela.innerHTML = ' ';
  tarefas.forEach((tarefa) => {
    const linha = cretaeRow();
    const colunaName = createColum();
    const colunaDate = createColum();
    const buttonEdite = createButtonEdite();
    const buttonExcluir = creteButtonExcluir();
    colunaName.innerText = tarefa.name;
    colunaDate.innerText = tarefa.date;

    linha.appendChild(colunaName);
    linha.appendChild(colunaDate);
    linha.appendChild(buttonEdite);
    linha.appendChild(buttonExcluir);
    tabela.appendChild(linha);
  });
}

forms.addEventListener('submit', (e) => {
  e.preventDefault();
  adicionarTarefas(forms.elements.name.value, forms.elements.date.value);
  rendereizarTabela();
  limpaForms();
});

tabela.addEventListener('click button', (e) => {
  log.console('oi');
});

//recuperarTarefas();
if (tarefas.length > 0) {
  rendereizarTabela();
}
