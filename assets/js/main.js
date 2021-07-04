//Dados globais/conceito de funções imediatas para não poluir a variável global/

(() => {
  document.getElementById('combo').addEventListener('change', handlerChange);
  document.getElementById('today').addEventListener('change', handlerChange);

  (async () => {
    let response = await Promise.allSettled([
      fetch('https://api.covid19api.com/countries'),
      fetch('https://api.covid19api.com/summary'),
    ]);
    console.log({ response });
    if (response[0].status == 'fulfilled') {
      loadCountries(await response[0].value.json());
    }
    if (response[1].status == 'fulfilled') {
      loadSummary(await response[1].value.json());
    }
  })();
})();

// carregamento dos países
function loadCountries(data) {
  let combo = document.getElementById('combo');

  //Ordenação oderdem alfabéticas dos paises:
  data.sort((a, b) => {
    let x = a.Country.toUpperCase();
    let y = b.Country.toUpperCase();

    return x === y ? 0 : x > y ? 1 : -1;
  });

  for (index in data) {
    combo.options[combo.options.length] = new Option(
      data[index].Country,
      data[index].Country,
    );
  }
}

// carregamento dos dados globais
function loadSummary(data) {
  let confirmed = document.getElementById('confirmed');
  let death = document.getElementById('death');
  let recovered = document.getElementById('recovered');
  let active = document.getElementById('active');

  confirmed.innerText = data.Global.TotalConfirmed.toLocaleString('PT');
  death.innerText = data.Global.TotalDeaths.toLocaleString('PT');
  recovered.innerText = data.Global.TotalRecovered.toLocaleString('PT');
  active.innerText = formatDate(new Date(data.Global.Date));

  document.getElementById('actives').innerText = 'Atualização';
}

// manipulador de evento:

function handlerChange() {
  let country = document.getElementById('combo').value;
  if (country != 'Global') {
    let startDate = new Date(document.getElementById('today').value);

    //cálculo das diferenças de dados de 3 dias antes:
    let endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 1,
      -3,
      0,
      1,
      0,
    );

    startDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - 1,
      -3,
      0,
      0,
      0,
    );

    fetch(
      `https://api.covid19api.com/country/${country}?from=${startDate}&to=${endDate}`,
    )
      .then((response) => response.json())
      .then((json) => loadDate(json));
  }
}

function loadDate(data) {
  console.log(data, 'dados');
  console.log(data[1], 'data[1]');

  //pegar as datas de antes de ontem (data[0]) e de ontem (data[1]):
  let yConfirmedDelta = data[1].Confirmed - data[0].Confirmed;
  console.log(yConfirmedDelta, 'yConfirmedDelta');

  let yDeathDelta = data[1].Deaths - data[0].Deaths;
  console.log(yDeathDelta, 'yDeathDelta');

  let yRecoveredDelta = data[1].Recovered - data[0].Recovered;
  console.log(yRecoveredDelta, 'yRecoveredDelta');

  let yActiveDelta = data[1].Active - data[0].Active;
  console.log(yActiveDelta, 'yActiveDelta');

  let tConfirmedDelta = data[2].Confirmed - data[1].Confirmed;
  console.log(tConfirmedDelta, 'tConfirmedDelta');

  let tDeathDelta = data[2].Deaths - data[1].Deaths;
  let tRecoveredDelta = data[2].Recovered - data[1].Recovered;
  let tActiveDelta = data[2].Active - data[1].Active;

  document.getElementById('confirmed').innerText =
    data[2].Confirmed.toLocaleString('PT');
  document.getElementById('death').innerText =
    data[2].Deaths.toLocaleString('PT');
  document.getElementById('recovered').innerText =
    data[2].Recovered.toLocaleString('PT');
  document.getElementById('active').innerText =
    data[2].Active.toLocaleString('PT');
  document.getElementById('actives').innerText = 'Total Ativos';

  insertDailyData(
    'tconfirmed',
    tConfirmedDelta,
    yConfirmedDelta < tConfirmedDelta,
  );

  insertDailyData('tdeath', tDeathDelta, yDeathDelta < tDeathDelta);

  insertDailyData(
    'trecovered',
    tRecoveredDelta,
    yRecoveredDelta < tRecoveredDelta,
  );
  insertDailyData(
    'tactive',
    tActiveDelta,
    yActiveDelta,
    yActiveDelta - tActiveDelta,
  );
}

function insertDailyData(element, value, increase) {
  if (increase) {
    document.getElementById(element).innerHTML = `
      <img src= '/assets/img/up.png'> Diário ${value.toLocaleString('PT')}
    `;
  } else {
    document.getElementById(element).innerHTML = `
      <img src= '/assets/img/down.png'> Diário ${value.toLocaleString('PT')}
    `;
  }
}

function formatDate(data) {
  console.log(data, 'data2');
  let d = data;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes(),
  ].map((c) => c.slice(-2));

  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
