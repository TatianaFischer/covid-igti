//Dados globais/conceito de funções imediatas para não poluir a variável global/

(() => {
  document.getElementById('combo').addEventListener('change', handlerChange);
  document.getElementById('today').addEventListener('change', handlerChange);

  (async () => {
    let response = await Promise.allSettled([
      fetch('https://api.covid19api.com/countries'),
      fetch('https://api.covid19api.com/summary'),
    ]);

    if (reponse[0].status == 'fulfielled') {
      loadCountries(await response[0].value.json());
    }
    if (response[1].status == 'fulfielled') {
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
  active.innerText = formatData(new Date(data.Global.Date));

  document.getElementById('actives').innerText = 'Atualização';
}
