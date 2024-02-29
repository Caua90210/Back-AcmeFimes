/*****************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o CRUD no banco de dados MySql
 * Data: 30/01/2024
 * Autor: Cauã da Silva
 * Versão: 1.0
 ****************************************************************************************************/

const { PrismaClient } = require('@prisma/client')

/**
 * $queryRawUnsafe(sql) --encaminha uma variavel
 * $queryRaw('select * from tbl_filme') -- encaminha o script direto
 */

const prisma = new PrismaClient()

const insertFilme = async function() {
    
    try {
        
        let sql = `insert into tbl_filme
         (
                        nome, 
                        sinopse,
                        duracao,
                        data_lancamento,
                        data_relancamento,
                        foto_capa,
                        valor_unitario

            )values(

                        '${dadosFilme.nome}',
                        '${dadosFilme.sinopse}',
                        '${dadosFilme.duracao}',
                        '${dadosFilme.data_lancamento}',
                        '${dadosFilme.data_relancamento}',
                        '${dadosFilme.foto_capa}',
                         '${dadosFilme.valor_unitario}'

        )`

        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados
        //(insert, update e delete)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (select)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
          return true  
        }else{
        return false
        }

    } catch (error) {
    return false   
    }


}

const updateFilme = async function() {

}

const deleteFilme = async function() {

}

const selectAllFilmes = async function() {
    try {
        let sql = 'select * from tbl_filme'

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    } catch (error) {
        return false
    }

}

const selectFilmeById = async function(id) {

    try {
        let sql = `select * from tbl_filme where id=${id}`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    } catch (error) {
        return false
    }
}

const selectFilmeByName = async function(name) {
    try {
        let sql = `select * from tbl_filme where nome like "%${name}%"`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectFilmeById,
    selectFilmeByName
}