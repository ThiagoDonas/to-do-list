const forms = document.getElementById('myform');
const name = forms.elements.Atividade;
const date = forms.elements.Data;
const submit = forms.elements.submit;
let tarefas = [];
let tabela = document.getElementById('corpotabela');
let editeButtons = [];
let deleteButtons = [];
let editando = false;
let saveId;

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

function createButtonEdite(index) {
  const button = document.createElement('button');
  button.innerText = 'Editar';
  button.id = index;
  button.type = 'button';
  button.name = 'editar';
  return button;
}

function creteButtonExcluir(index) {
  const button = document.createElement('button');
  button.innerText = 'Excluir';
  button.id = index;
  button.type = 'button';
  button.name = 'excluir';
  return button;
}

function rendereizarTabela() {
  tabela.innerHTML = ' ';
  tarefas.forEach((tarefa) => {
    const linha = cretaeRow();
    const colunaName = createColum();
    const colunaDate = createColum();
    const buttonEdite = createButtonEdite(tarefas.indexOf(tarefa));
    const buttonExcluir = creteButtonExcluir(tarefas.indexOf(tarefa));
    colunaName.innerText = tarefa.name;
    colunaDate.innerText = tarefa.date;
    linha.appendChild(colunaName);
    linha.appendChild(colunaDate);
    linha.appendChild(buttonEdite);
    linha.appendChild(buttonExcluir);
    tabela.appendChild(linha);
  });
  editeButtons = document.getElementsByName('editar');
  deleteButtons = document.getElementsByName('excluir');
}

function editarLinhaTabela() {
  if (editeButtons != null) {
    editeButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        editarTarefa(button.id);
        editando = true;
        saveId = button.id;
      });
    });
  }
}

function excluirLinhaTabela() {
  if (deleteButtons != null) {
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        removerLista(button.id);
        rendereizarTabela();
      });
    });
  }
}

forms.addEventListener('submit', (e) => {
  e.preventDefault();
  if (editando) {
    salvarTarefa(saveId, forms.elements.name.value, forms.elements.date.value);
    editando = false;
  } else {
    adicionarTarefas(forms.elements.name.value, forms.elements.date.value);
  }
  rendereizarTabela();
  limpaForms();
});

tabela.addEventListener('mouseover', (e) => {
  editarLinhaTabela();
});

tabela.addEventListener('mouseover', (e) => {
  excluirLinhaTabela();
});

recuperarTarefas();
if (tarefas.length > 0) {
  rendereizarTabela();
}
