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
        dadosFilme.nome == ''               || dadosFilme.nome == undefined             ||   dadosFilme.nome == null                      || dadosFilme.nome.length > 80              ||
        dadosFilme.sinopse == ''            || dadosFilme.sinopse == undefined          ||   dadosFilme.sinopse == null                   || dadosFilme.sinopse.length > 65000        ||
        dadosFilme.duracao == ''            || dadosFilme.duracao == undefined         ||   dadosFilme.duracao == null                  || dadosFilme.duracao.length > 8            ||
        dadosFilme.data_lancamento == ''    || dadosFilme.data_lancamento == undefined  ||   dadosFilme.data_lancamento == null           || dadosFilme.data_lancamento.length != 10  ||
        dadosFilme.foto_capa == ''          || dadosFilme.foto_capa == undefined        ||   dadosFilme.foto_capa == null                 || dadosFilme.foto_capa.length > 200        ||                      
        dadosFilme.valor_unitario.length > 6
     ) {
        
        //Retorna o status code 400.
        return ERROR_Messages.ERROR_REQUIRED_FIELDS

    }else{

        let validateStatus = false


        //Validação da data de relancaento, já que ela não é obrigatória no banco de dados
        if (
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != ''   &&
            dadosFilme.data_relancamento != undefined
            
            ) {
                //validação para verificar se a data está com a quantidade de digitos corretos
            if (dadosFilme.data_relancamento.length != 10) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                validateStatus = true
            }
        } else {
            validateStatus = true
            
        }

        if (validateStatus) {
                    //encaminha os dados do filme para o DAO inserir o banco de dados.
        let novoFilme = await filmesDAO.insertFilme(dadosFilme)

        //Validação para verificar se o DAO inseriu os dados do BD
        if (novoFilme) {

            let id = await filmesDAO.lastIdFilme()

            dadosFilme.id = id[0].id
            //Cria o JSON de retorno dos dados (201)
            novoFilmeJSON.filme = dadosFilme
            novoFilmeJSON.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
            novoFilmeJSON.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
            novoFilmeJSON.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message

            return  novoFilmeJSON  //201

        } else {

            //Erro no servidor de DB
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB //500

        }
        }


    }
}


const setAtualizarFilme = async function(dadosFilme, contentType, idFilme) {
    try {
        
        if(String(contentType).toLowerCase() == 'application/json'){

            let resultDadosFilme = {}
        
            //Validação para tratar campos obrigatórios e quantide de caracteres
            if( idFilme == ''                             || idFilme == undefined                      ||
                dadosFilme.nome == ''                     || dadosFilme.nome == undefined              || dadosFilme.nome.length > 80               ||
                dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined           || dadosFilme.sinopse.length > 65535         || 
                dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined           || dadosFilme.duracao.length > 8             || 
                dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined   || dadosFilme.data_lancamento.length > 10    || 
                dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined         || dadosFilme.foto_capa.length > 200         ||
                dadosFilme.valor_unitario.length > 5  
             ){
                
                return ERROR_Messages.ERROR_REQUIRED_FIELDS // 400
                
            }else{
                
                let dadosValidated = false
        
                // Validação de digitação para data de relancamento que não é um campo obrigatório
                if  (   dadosFilme.data_relancamento != null &&
                        dadosFilme.data_relancamento != ''   &&
                        dadosFilme.data_relancamento != undefined 
                    ){    
        
                        if(dadosFilme.data_relancamento.length != 10)
                            return ERROR_Messages.ERROR_REQUIRED_FIELDS // 400
                        else
                            dadosValidated = true
        
                } else {
                    dadosValidated = true
                }
        
                if(dadosValidated){
        
                    //Envia os dados para a model inserir no BD
                    let filmeAtualizado = await filmesDAO.updateFilme(dadosFilme, idFilme)
                                           
                    // Adiciona o ID do Filme no JSON para retornar
                    dadosFilme.id = idFilme

                    //Valida se o BD inseriu corretamente os dados
                    if(filmeAtualizado){
                        resultDadosFilme.status = ERROR_Messages.SUCCESS_UPDATED_ITEM.status
                        resultDadosFilme.status_code = ERROR_Messages.SUCCESS_UPDATED_ITEM.status_code
                        resultDadosFilme.ERROR_Messages = ERROR_Messages.SUCCESS_UPDATED_ITEM.ERROR_Messages
                        resultDadosFilme.filme = dadosFilme
                        return resultDadosFilme
                    }else {

                        return ERROR_Messages.ERROR_INTERNAL_SERVER_DB // 500

                    }
        
        
                } else {

                    return ERROR_Messages.ERROR_REQUIRED_FIELDS // 400

                }
                
            }
    
        }else{
            return ERROR_Messages.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        ERROR_Messages.ERROR_INTERNAL_SERVER // 500
    }

}

const setExcluirFilme = async function (id) {
    try {
        
        //Recebe o id do filme
        let idFilme = id

        let validacaoFilmes = await getBuscarFilme(idFilme)

        // Validação para ID vazio, indefinido
        if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){

            return ERROR_Messages.ERROR_INVALID_ID // 400

        // Validação se o item existe 
        } else if (validacaoFilmes.status == false) {
            
            return ERROR_Messages.ERROR_NOT_FOUND // 404

        } else {
            
            let resultDados = await filmesDAO.deleteFilme(idFilme)

            // Validação para verificar se os dados no servidor foram processados
            if(resultDados){                
                    
                return ERROR_Messages.SUCCESS_DELETED_ITEM // 200

            } else {

                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB // 500

            }

        }

    } catch (error) {
        ERROR_Messages.ERROR_INTERNAL_SERVER // 500
    }



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