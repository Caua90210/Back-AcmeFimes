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

const lastIdFilme = async function(){
  try {
    let sql = `select cast(last_insert_id() as DECIMAL) as id from tbl_filme limit 1`
    
    let result = await prisma.$queryRawUnsafe(sql)
    console.log(result);
    if(result){
        return result  
      }else{
      return false
      }

  } catch (error) {
    return false
  }
}

const insertFilme = async function(dadosFilme) {
    
    try {
        let sql
        if(
            dadosFilme.data_relancamento != '' && 
            dadosFilme.data_relancamento != null &&
            dadosFilme.data_relancamento != undefined
         ){

            sql = `insert into tbl_filme
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

        }else{
            sql = `insert into tbl_filme
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
                           null,
                           '${dadosFilme.foto_capa}',
                            '${dadosFilme.valor_unitario}'
   
           )`
        }

        
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

const updateFilme = async function(dadosFilme, id) {
   
    try {

        let sql

        if(dadosFilme.data_relancamento == null || dadosFilme.data_relancamento == '' || dadosFilme.data_relancamento == undefined){    
            
            sql = `update tbl_filme set 
                                        nome = '${dadosFilme.nome}',
                                        sinopse = '${dadosFilme.sinopse}',
                                        duracao = '${dadosFilme.duracao}',
                                        data_lancamento = '${dadosFilme.data_lancamento}',
                                        data_relancamento = null,
                                        foto_capa = '${dadosFilme.foto_capa}',
                                        valor_unitario = ${dadosFilme.valor_unitario}
                                    where id = ${id}`
            
        } else {

            sql = `update tbl_filme set 
                                        nome = '${dadosFilme.nome}',
                                        sinopse = '${dadosFilme.sinopse}',
                                        duracao = '${dadosFilme.duracao}',
                                        data_lancamento = '${dadosFilme.data_lancamento}',
                                        data_relancamento = '${dadosFilme.data_relancamento}',
                                        foto_capa = '${dadosFilme.foto_capa}',
                                        valor_unitario = ${dadosFilme.valor_unitario}
                                    where id = ${id}`

        }

        // Executa o sciptSQL no DB (devemos usar o comando execute e não o query)
        // O comando execute deve ser utilizado para INSERT, UPDATE, DELETE
        let resultStatus = await prisma.$executeRawUnsafe(sql)
        console.log(sql)

        // Validação para verificar se o insert funcionou no DB
        if(resultStatus)
            return true
        else
            return false

    } catch (error) {
        
        return false

    }
}

const deleteFilme = async function(id) {
    try {
        let sql = `delete from tbl_filme where id = ${id}`
        let rsFilme = await prisma.$executeRawUnsafe(sql)
        return rsFilme
    } catch (error) {
        return false
    }
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
    selectFilmeByName,
    lastIdFilme
}