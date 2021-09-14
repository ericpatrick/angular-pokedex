# Angular Pokedex

Essa é uma implementação simples de uma pokedex feita em Angular. Nessa pokedex foi implementada a lista dos 151 pokemons com um recurso de busca. Foi feito um controle de exibição das imagens para que os recursos de rede fossem consumidos conforme o usuário necessite visualizar os pokemons, seja por meio do evento de scroll ou por meio da busca.

## instalação e execução

Para instalar as dependências do projeto execute o seguinte comando:

`npm install`

Após isso basta rodar o comando `ng serve` para compilar e rodar o servidor. O projeto executará no endereço [http://localhost:4200](http://localhost:4200).

## Estrutura do projeto

A estrutura de pasta do projeto, no geral, segue o padrão já estabelecido pelo Angular. Contudo foi feito uma adição a essa estrutura a fim de deixar o projeto mais organizado. No momento da escrita desse documento, a aplicação possui apenas um módulo (`main`). Dentro da pasta `main` temos as pastas `components`, `models` e `services`. A pasta `components` contem os comoponentes do módulo, assim como `services` contem os serviços e `models` contem os modelos de domíno da aplicação.

## Compilação

Para compilar o projeto em modo de desenvolvimento execute o comando `ng build`. O resultado da compilação estará na pasta `dist` na raiz do projeto. Esta poderá ser servida pelo servidor web da sua preferência.

Para compilar o projeto em modo de produção basta adicionar o parâmetro `--configuration production` ao comando `ng build`.

## Testes

Para rodar os testes unitários basta executar o comando `ng test`.

Para os testes de integração é necessário dois requisitos: ter o Chrome instalado na máquina onde os testes irão executar e ter a aplicação rodando no endereço `http://localhost:4200`. Após isso basta executar o comando `npm run cy:open`, caso queira ver os testes rodando no browser, ou `npm run cy:run` para que os mesmos rodem em linha de comando.

## Pontos a melhorar

- Utilizar uma ferramenta de report de erros (como o sentry) para facilitar a detecção de erros em produção
- Retornar do backend imagens com resoluções melhores, ou várias imagens em diferentes resoluções, para reduzir a quantidade de media queries
- AUmentar a cobertura de teste dos serviços e implementar testes para os componentes visuais
