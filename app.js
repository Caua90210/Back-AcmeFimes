/**********************************\
 * Autor: Cauã da Silva   \
 * Versão: 1.2                     \
 **********************************/

/**
 * npm install prisma --save (realiza a conexão com o banco)
 * npm install @prisma/client --save (executa os scripts SQL)
 * npx prisma init
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./controller/funcoes.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors)
    next()

})

/*imports dos arquivos internos*/

const controllerFilmes = require('./controller/controller_filme.js')


//Criando um objeto para controlar a chega dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json()


// retorna os dados do arquivo json
app.get('/v1/acmefilmes/filmes', cors(), async(request, response, next) => {
    response.json(funcoes.getListaFilmes())
    response.status(200)
})

app.get('/v1/acmefilmes/filme/:id', cors(), async(request, response, next) => {

    let idFilme = request.params.id

    response.json(funcoes.getFilme(idFilme))
    response.status(200)
})

// retorna os dados do banco de dados
app.get('/v2/acmefilmes/filmes', cors(), async(request, response, next) => {
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    if (dadosFilmes) response.json(dadosFilmes), response.status(200)
    else response.json({ message: "nenhum registro encontrado" }), response.status(404)
})

app.get('/v2/acmefilmes/filme/:id', cors(), async(request, response, next) => {
    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

app.get('/v2/acmefilmes/filtro/filme/', cors(), async(request, response, next) => {
    let name = request.query.nome

    let dadosFilme = await controllerFilmes.getFilmeNome(name)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async function(request, response, next){


        //Recebe todos os dados encaminhados na requisição pelo body
       let dadosBody = request.body 
        
       //Ecaminha os dados para a controller enviar ao DAO
       let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody)

       
       response.status(resultDadosNovoFilme.status_code)
       response.json(resultDadosNovoFilme)
})

console.log("API funcionando na porta 8080")
app.listen(8080, () => {})