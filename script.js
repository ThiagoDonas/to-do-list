const forms = document.getElementById('myform');
let tarefas = [];
let tabela = document.getElementById('corpotabela');
let editando = false;
let tabelaFiltrada = null;
let inputFiltro = document.getElementById('filtro');
console.log(tabelaFiltrada);
function filtraTabela() {
  textoFiltro = inputFiltro.value.toUpperCase();
  if (textoFiltro.length >= 1 && textoFiltro.length <= 3) return;
  tabelaFiltrada = tarefas.filter(function (tarefa) {
    return (
      tarefa.name.toUpperCase().indexOf(textoFiltro) > -1 ||
      tarefa.date.toUpperCase().indexOf(textoFiltro) > -1 ||
      tarefa.hora.toUpperCase().indexOf(textoFiltro) > -1
    );
  });
  rendereizarTabela();
}

function adicionarTarefas(name, date, hora) {
  //tarefas = [...tarefas, { name, date }];
  tarefas.push({ name, date, hora });
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function recuperarTarefas() {
  JSON.parse(localStorage.getItem('tarefas')).forEach((tarefa) => {
    adicionarTarefas(tarefa.name, tarefa.date, tarefa.hora);
  });
  //tarefas = [...JSON.parse(localStorage.getItem('tarefas'))]
}

function editarTarefa(index) {
  editando = index;
  forms.elements.name.value = tarefas[index].name;
  forms.elements.date.value = tarefas[index].date;
  forms.elements.hora.value = tarefas[index].hora;
}

function salvarTarefa(index, name, date, hora) {
  tarefas[index] = { name, date, hora };
  limpaForms();
}

function limpaForms() {
  forms.elements.name.value = null;
  forms.elements.date.value = null;
  forms.elements.hora.value = null;
}

function removerLista(index) {
  tarefas.splice(index, 1);
  rendereizarTabela();
}

function cretaeRow() {
  return document.createElement('tr');
}

function createColum() {
  return document.createElement('td');
}

function createButtonEdite() {
  const button = document.createElement('button');
  return button;
}

function creteButtonExcluir() {
  const button = document.createElement('button');
  return button;
}

function insertTextButton(button, text) {
  button.innerText = text;
}

function rendereizarTabela() {
  tabela.innerHTML = ' ';
  let filtro = tarefas;
  if (tabelaFiltrada) {
    filtro = tabelaFiltrada;
  } else {
    filtro = tarefas;
  }
  filtro.forEach((tarefa) => {
    let linha = cretaeRow();
    let colunaName = createColum();
    let colunaDate = createColum();
    let colunaHora = createColum();
    let colunaBottaoEdite = createColum();
    let colunaBottaoExcluir = createColum();
    let buttonEdite = createButtonEdite();
    insertTextButton(buttonEdite, 'Editar');
    buttonEdite.addEventListener('click', (e) => {
      e.stopPropagation;
      editarTarefa(filtro.indexOf(tarefa));
    });
    let buttonExcluir = creteButtonExcluir();
    insertTextButton(buttonExcluir, 'Excluir');
    buttonExcluir.addEventListener('click', (e) => {
      e.stopPropagation;
      removerLista(filtro.indexOf(tarefa));
    });
    colunaName.innerText = tarefa.name;
    colunaDate.innerText = tarefa.date;
    colunaHora.innerText = tarefa.hora;
    colunaBottaoEdite.appendChild(buttonEdite);
    colunaBottaoExcluir.appendChild(buttonExcluir); //
    linha.appendChild(colunaName);
    linha.appendChild(colunaDate);
    linha.appendChild(colunaHora);
    linha.appendChild(colunaBottaoEdite);
    linha.appendChild(colunaBottaoExcluir);
    tabela.appendChild(linha);
  });
}

forms.addEventListener('submit', (e) => {
  e.preventDefault();
  if (editando || editando === 0) {
    salvarTarefa(
      editando,
      forms.elements.name.value,
      forms.elements.date.value,
      forms.elements.hora.value
    );
    editando = false;
  } else {
    adicionarTarefas(
      forms.elements.name.value,
      forms.elements.date.value,
      forms.elements.hora.value
    );
  }
  rendereizarTabela();
  limpaForms();
});

inputFiltro.addEventListener('input', (e) => {
  filtraTabela();
});
//recuperarTarefas();
if (tarefas.length > 0) {
  rendereizarTabela();
}
