/*****************************************************************************************************
 * Objetivo: Arquivo responsável por realizar validações, consistencias e regras de negócio
 * para os filmes
 * Data: 30/01/2024
 * Autor: Cauã da Silva
 * Versão: 2.0
 ****************************************************************************************************/

const filmesDAO = require('../model/DAO/filme.js')
const ERROR_Messages = require('../modulo/config.js')

// Função para add novo filme
const setInserirNovoFilme = async function(dadosFilme) {

    //Cria objeto JSON para devolver os dados criados na requisição
    let novoFilmeJSON = {}
    
    //Validação de campos obrigatórios ou com digitação inválida.
    if (
        dadosFilme.nome == ''               || dadosFilme.nome == undefined                 || dadosFilme.nome.length > 80              ||
        dadosFilme.sinopse == ''            || dadosFilme.sinopse == undefined              || dadosFilme.sinopse.length > 65000        ||
        dadosFilme.duracao == ''            || dadosFilmes.duracao == undefined             || dadosFilme.duracao.length > 8            ||
        dadosFilme.data_lancamento == ''    || dadosFilme.data_lancamento == undefined      || dadosFilme.data_lancamento.length != 10  ||
        dadosFilme.foto_capa == ''          || dadosFilme.foto_capa == undefined            || dadosFilme.foto_capa.length > 200   ||                         ||
        dadosFilme.valor_unitario.length > 6
     ) {
        
        //Retorna o status code 400.
        return message.ERROR_REQUIRED_FIELDS

    }else{
        
        //encaminha os dados do filme para o DAO inserir o banco de dados.
        let novoFilme = await filmesDAO.insertFilme(dadosFilme)

        //Validação para verificar se o DAO inseriu os dados do BD
        if (novoFilme) {

            //Cria o JSON de retorno dos dados (201)
            novoFilmeJSON.filme = dadosFilme
            novoFilmeJSON.status = message.SUCCES_CREATED_ITEM.status
            novoFilmeJSON.status_code = message.SUCCES_CREATED_ITEM.status_code
            novoFilmeJSON.message = message.SUCCES_CREATED_ITEM.message

            return  novoFilmeJSON  //201

        } else {

            //Erro no servidor de DB
            return message.ERROR_INTERNAL_SERVER_DB //500

        }

    }
}


const setAtualizarFilme = async function() {

}

const setExcluirFilme = async function() {

}

const getListarFilmes = async function() {

    let filmesJson = {}

    let dadosFilmes = await filmesDAO.selectAllFilmes()

    if (dadosFilmes) {
        if (dadosFilmes.length > 0) {
            filmesJson.filmes = dadosFilmes
            filmesJson.quantidade = dadosFilmes.length
            filmesJson.status_code = 200

            return filmesJson

        } else {
            return ERROR_Messages.ERROR_NOTFOUND
        }
    } else {
        return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
    }
}

const getBuscarFilme = async function(id) {
    let idFilme = id

    let filmeJson = {}

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return ERROR_Messages.ERROR_INVALID_ID
    } else {
        let dadosFilme = await filmesDAO.selectFilmeById(idFilme)

        if (dadosFilme) {

            if (dadosFilme.length > 0) {
                filmeJson.filme = dadosFilme
                filmeJson.status_code = 200

                return filmeJson

            } else
                return ERROR_Messages.ERROR_NOTFOUND
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    }
}

const getFilmeNome = async function(name) {
    let nomeFilme = name

    let filmeJson = {}

    if (nomeFilme == '' || nomeFilme == undefined) {
        return ERROR_Messages.ERROR_INVALID_NAME
    } else {
        let dadosFilme = await filmesDAO.selectFilmeByName(nomeFilme)

        if (dadosFilme) {

            if (dadosFilme.length > 0) {

                filmeJson.filme = dadosFilme
                filmeJson.status_code = 200

                return filmeJson
            } else {
                return ERROR_Messages.ERROR_NOTFOUND
            }
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    }
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getFilmeNome
}