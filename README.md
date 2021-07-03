# covid-igti
JavaScript - Covid API

* Construção de um Dashboard com os números da Covid-19, a ser consumido de uma API utilizando JavaScript puro e HTML.
* Implementar em JavaScript puro, HTML e CSS uma aplicação para apresentação dos números da COVID-19 de um determinado país para uma data específica. A URL base para consumo da API com os dados da COVID é https://api.covid19api.com/. 
* A aplicação deverá possuir os 4 indicadores retornados pela API, sendo eles Total Confirmados, Total de Mortes, Total Recuperados e Total Ativos. Além de apresentar os números desses indicadores, será necessário apresentar a informação diária de cada um deles, bem como o indicador de aumento ou redução comparado com o dia anterior (seta). 
* foram utilizadas as rotas “/countries” e “/summary” para carregar as informações dos países no combo e os números globais, respectivamente.
* Nas informações por país, foi utilizada a rota “By Country All Status”. Mais detalhes e exemplos podem ser avaliados na documentação da API: https://documenter.getpostman.com/view/10808728/SzS8rjbc.
* A página inicial carregará as informações globais da rota “/summary”, não sendo necessária a apresentação dos números diários no primeiro load.
* Utilizem o fetch para consumo da API e os conceitos apresentados nas videoaulas para implementação do trabalho.
* Os números diários não são fornecidos já calculados pela API. Será necessário realizar um cálculo com as informações que a API disponibiliza.


