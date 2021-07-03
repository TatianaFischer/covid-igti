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
