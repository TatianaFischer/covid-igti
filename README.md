# covid-igti
JavaScript - Covid API

* Construção de um Dashboard com os números da Covid-19, a ser consumido de uma API utilizando JavaScript puro e HTML.
* Implementar em JavaScript puro, HTML e CSS uma aplicação para apresentação dos números da COVID-19 de um determinado país para uma data específica. A URL base para consumo da API com os dados da COVID é https://api.covid19api.com/. 
* A aplicação deverá possuir os 4 indicadores retornados pela API, sendo eles Total Confirmados, Total de Mortes, Total Recuperados e Total Ativos. Além de apresentar os números desses indicadores, será necessário apresentar a informação diária de cada um deles, bem como o indicador de aumento ou redução comparado com o dia anterior (seta). 
* foram utilizadas as rotas “/countries” e “/summary” para carregar as informações dos países no combo e os números globais, respectivamente.

```
 "countriesRoute": {
    "Name": "Get List Of Countries",
    "Description": "Returns all countries and associated provinces. The country_slug variable is used for country specific data",
    "Path": "/countries"
  }
,
  "summaryRoute": {
    "Name": "Summary of new and total cases per country",
    "Description": "A summary of new and total cases per country",
    "Path": "/summary"
  },
```

* Nas informações por país, foi utilizada a rota “By Country All Status”. Mais detalhes e exemplos podem ser avaliados na documentação da API: https://documenter.getpostman.com/view/10808728/SzS8rjbc.
* A página inicial carregará as informações globais da rota “/summary”, não sendo necessária a apresentação dos números diários no primeiro load.
* Utilizem o fetch para consumo da API e os conceitos apresentados nas videoaulas para implementação do trabalho.
* Os números diários não são fornecidos já calculados pela API. Será necessário realizar um cálculo com as informações que a API disponibiliza.

```
/countries

  {
    "Country": "Saint Helena",
    "Slug": "saint-helena",
    "ISO2": "SH"
  },


/summary

{
ID: "f3534896-ae09-449b-9c7d-ffe74fb53cc8",
Message: "",
Global: {
NewConfirmed: 247656,
TotalConfirmed: 182823735,
NewDeaths: 5005,
TotalDeaths: 3961388,
NewRecovered: 153569,
TotalRecovered: 120271421,
Date: "2021-07-03T18:54:41.672Z"
},
Countries: [
{
ID: "5ea9ca03-754e-4b7e-95dc-949d9f63a496",
Country: "Afghanistan",
CountryCode: "AF",
Slug: "afghanistan",
NewConfirmed: 0,
TotalConfirmed: 120216,
NewDeaths: 0,
TotalDeaths: 4962,
NewRecovered: 0,
TotalRecovered: 72700,
Date: "2021-07-03T18:54:41.672Z",
Premium: { }
}, (...)
```


