/*************************************************************************
 * Objetivo: Arquivo responsável pelas variaveis globais, onde haverão
 * mensagens, status code e outros conteudos para o projeto.
 * 
 * Data: 20/02/2024
 * Autor: Cauã da Silva
 * Versão: 1.0
 ************************************************************************/

/***********************Mensagens de erro******************************* */
const ERROR_INVALID_ID = { status: false, status_code: 400, message: "Id invalido" }

const ERROR_NOTFOUND = { status: false, status_code: 404, message: "Nenhum item encontrado" }

const ERROR_INTERNAL_SERVER_DB = { status: false, status_code: 500, message: "Ocorreram erros no processamento da DB. Contate o administrador da API" }

const ERROR_INVALID_NAME = { status: false, status_code: 400, message: "Formato de Nome Invalido" }

const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: "Existem campos requeridos e não foram preenchidos, ou não atendem aos critérios de digitação!" }

/***********************Mensagens de sucesso******************************* */
const SUCCESS_CREATED_ITEM = {status: true, status_code: 201, message: "Item criado com sucesso"}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOTFOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INVALID_NAME,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM
}