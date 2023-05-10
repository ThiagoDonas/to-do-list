const forms = document.getElementById('myform');
let tarefas = [];

let tarefasPorAno = new Map();
let tabela;
let editando = false;
let tabelaFiltrada = new Map();
let inputFiltro = document.getElementById('filtro');

function mesTarefa(date) {
  return new Date(date).getMonth();
}

function ordenaTarefas(tarefasDoMes) {
  let tarefasDoMesOrdenada = tarefasDoMes.sort((tarefa1, tarefa2) => {
    let dateTarefa1 = new Date(tarefa1.date).getDate();
    let dateTarefa2 = new Date(tarefa2.date).getDate();
    if (dateTarefa1 > dateTarefa2) {
      return 1;
    } else if (dateTarefa1 < dateTarefa2) {
      return -1;
    } else {
      let timeTarefa1 = new Date(`${tarefa1.date} ${tarefa1.hora}`).getTime();
      let timeTarefa2 = new Date(`${tarefa2.date} ${tarefa2.hora}`).getTime();
      if (timeTarefa1 > timeTarefa2) {
        return 1;
      } else if (timeTarefa1 < timeTarefa2) {
        return -1;
      }
      return 0;
    }
  });
  return tarefasDoMesOrdenada;
}

function anoTarefa(date) {
  return new Date(date).getFullYear();
}

function adicionarTarefas(name, date, hora) {
  let anoDaTarefa = anoTarefa(date);
  let mesDaTarefa = mesTarefa(date);

  if (tarefasPorAno.has(`${anoDaTarefa}`)) {
    let adicionaTarefa = tarefasPorAno.get(`${anoDaTarefa}`);
    adicionaTarefa[mesDaTarefa].push({ name, date, hora });
    adicionaTarefa[mesDaTarefa] = ordenaTarefas(adicionaTarefa[mesDaTarefa]);
    tarefasPorAno.set(`${anoDaTarefa}`, adicionaTarefa);
  } else {
    tarefasPorAno.set(`${anoDaTarefa}`, [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ]);
    let adicionaTarefa = tarefasPorAno.get(`${anoDaTarefa}`);
    adicionaTarefa[mesDaTarefa].push({ name, date, hora });
    tarefasPorAno.set(`${anoDaTarefa}`, adicionaTarefa);
  }
  tarefas.push({ name, date, hora });
  localStorage.setItem(
    'tarefas',
    JSON.stringify(Object.fromEntries(tarefasPorAno))
  );
}

function isJsonString(string) {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
}

function recuperarTarefas() {
  if (
    isJsonString(localStorage.getItem('tarefas')) &&
    localStorage.getItem('tarefas')
  ) {
    let tipoArmazenado = typeof localStorage.getItem('tarefas');
    let tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'));
    let tarefas = new Map(Object.entries(tarefasSalvas));
    for (var [key, tarefasDoAno] of tarefas) {
      if (
        tarefasSalvas &&
        tipoArmazenado === 'string' &&
        typeof tarefasSalvas === 'object' &&
        tarefasDoAno &&
        tarefasDoAno.length > 0
      ) {
        tarefasDoAno.forEach((tarefas) =>
          tarefas.forEach((tarefa) => {
            if (tarefa.name && tarefa.date && tarefa.hora) {
              adicionarTarefas(tarefa.name, tarefa.date, tarefa.hora);
            }
          })
        );
      }
    }
  } else {
    let tipoArmazenado = typeof localStorage.getItem('tarefas');
    let tarefasSalvas = JSON.parse(`"${localStorage.getItem('tarefas')}"`);
    let tarefas = new Map(Object.entries(tarefasSalvas));
    for (let [key, tarefasDoAno] of tarefas) {
      if (
        tarefasSalvas &&
        tipoArmazenado === 'string' &&
        typeof tarefasSalvas === 'object' &&
        tarefasDoAno &&
        tarefasDoAno.length > 0
      ) {
        tarefasDoAno.forEach((tarefas) =>
          tarefas.forEach((tarefa) => {
            if (tarefa.name && tarefa.date && tarefa.hora) {
              adicionarTarefas(tarefa.name, tarefa.date, tarefa.hora);
            }
          })
        );
      }
    }
  }
}

function editarTarefa(index, date) {
  editando = index;
  let anoDaTarefa = anoTarefa(date);
  let mesDaTarefa = mesTarefa(date);
  let adicionaTarefa = tarefasPorAno.get(`${anoDaTarefa}`);
  forms.elements.name.value = adicionaTarefa[mesDaTarefa][index].name;
  forms.elements.date.value = adicionaTarefa[mesDaTarefa][index].date;
  forms.elements.hora.value = adicionaTarefa[mesDaTarefa][index].hora;
}

function salvarTarefa(index, name, date, hora) {
  let anoDaTarefa = anoTarefa(date);
  let mesDaTarefa = mesTarefa(date);
  let adicionaTarefa = tarefasPorAno.get(`${anoDaTarefa}`);
  adicionaTarefa[mesDaTarefa][index] = { name, date, hora };
  tarefasPorAno.set(`${anoDaTarefa}`, adicionaTarefa);
  limpaForms();
}

function limpaForms() {
  forms.elements.name.value = null;
  forms.elements.date.value = null;
  forms.elements.hora.value = null;
}

function removerTarefa(index, date) {
  let anoDaTarefa = anoTarefa(date);
  let mesDaTarefa = mesTarefa(date);
  let adicionaTarefa = tarefasPorAno.get(`${anoDaTarefa}`);
  adicionaTarefa[mesDaTarefa].splice(index, 1);
  tarefasPorAno.set(`${anoDaTarefa}`, adicionaTarefa);

  localStorage.setItem('tarefas', JSON.stringify(tarefasPorAno));

  rendereizarTabela();
}

function cretaeRow() {
  return document.createElement('tr');
}

function createColum() {
  return document.createElement('td');
}

function createButton() {
  return document.createElement('button');
}

function insertTextButton(button, text) {
  button.innerText = text;
}

function colocaEventoNoBotaoEdite(button, index, date) {
  button.addEventListener('click', (e) => {
    e.stopPropagation;
    editarTarefa(index, date);
  });
}

function colocaEventoNoBotaoExcluir(button, index, date) {
  button.addEventListener('click', (e) => {
    e.stopPropagation;
    removerTarefa(index, date);
  });
}

function filtraTabela() {
  textoFiltro = inputFiltro.value.toUpperCase().trim();

  if (textoFiltro.length >= 0 && textoFiltro.length < 3) {
    tabelaFiltrada = new Map();
    console.log('oi');
  } else {
    for (let [key, tarefasDoAno] of tarefasPorAno) {
      let arrayTarefas = [];

      tarefasDoAno.forEach((tarefas) => {
        let temp = tarefas.filter(function (tarefa) {
          return (
            tarefa.name.toUpperCase().indexOf(textoFiltro) > -1 ||
            tarefa.date.toUpperCase().indexOf(textoFiltro) > -1 ||
            tarefa.hora.toUpperCase().indexOf(textoFiltro) > -1
          );
        });
        arrayTarefas.push(temp);
      });
      tabelaFiltrada.set(`${key}`, arrayTarefas);
    }
  }
  console.log(tabelaFiltrada);
  rendereizarTabela();
}

function limpaTabela() {
  for (let i = 0; i < 12; i++) {
    tabela = document.getElementById(`${i}`);
    tabela.innerHTML = ' ';
  }
}

function renderizaTabelaPorMes(tarefasDoMes, mesDaTarefa) {
  tabela = document.getElementById(`${mesDaTarefa}`);
  let filtro = tarefasDoMes;
  filtro.forEach((tarefa) => {
    let linha = cretaeRow();
    let colunaName = createColum();
    let colunaDate = createColum();
    let colunaHora = createColum();
    let colunaBottaoEdite = createColum();
    let colunaBottaoExcluir = createColum();
    let buttonEdite = createButton();
    let buttonExcluir = createButton();
    insertTextButton(buttonEdite, 'Editar');
    colocaEventoNoBotaoEdite(buttonEdite, filtro.indexOf(tarefa), tarefa.date);
    insertTextButton(buttonExcluir, 'Excluir');
    colocaEventoNoBotaoExcluir(
      buttonExcluir,
      filtro.indexOf(tarefa),
      tarefa.date
    );
    colunaName.innerText = tarefa.name;
    colunaDate.innerText = tarefa.date;
    colunaHora.innerText = tarefa.hora;
    colunaBottaoEdite.appendChild(buttonEdite);
    colunaBottaoExcluir.appendChild(buttonExcluir);
    linha.appendChild(colunaName);
    linha.appendChild(colunaDate);
    linha.appendChild(colunaHora);
    linha.appendChild(colunaBottaoEdite);
    linha.appendChild(colunaBottaoExcluir);
    tabela.appendChild(linha);
  });
}
function rendereizarTabela() {
  limpaTabela();
  if (tabelaFiltrada.size != 0) {
    for (let [key, tarefasDoAno] of tabelaFiltrada) {
      tarefasDoAno.forEach((tarefas) => {
        renderizaTabelaPorMes(tarefas, tarefasDoAno.indexOf(tarefas));
      });
    }
  } else {
    for (let [key, tarefasDoAno] of tarefasPorAno) {
      tarefasDoAno.forEach((tarefas) => {
        renderizaTabelaPorMes(tarefas, tarefasDoAno.indexOf(tarefas));
      });
    }
  }
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
      forms.elements.name.value.trim(),
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

recuperarTarefas();

if (tarefas.length > 0) {
  rendereizarTabela();
}
