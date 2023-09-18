class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    /* o i recebe a referencia aos atributos  do objeto despesa 
    this[i] faz referencia ao valor contido em cada atributo de despesa */
    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == null || this[i] == ''){
                return false
            }
        }

        return true 
    }
}

class Bd {

    //verifica a existencia do id em local storage
    constructor(){
        let id = localStorage.getItem('id')

        /*
        o processo de criacao da chave id
        com o valor 0 sera feito sempre no momento da 
        construcao do objeto Bd desde que ainda nao exista 
        uma instrucao para o objeto id 
        armazenado em local storage 
        caso exista o retorno sera o valor armazenado 
        */

        //se id for vazio e somado o valor 0
        if(id === null){
            localStorage.setItem('id', 0)
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }
    gravar(despesa){
        //recebemos um objeto literal na funcao 
        //e o transformamos em um objeto JSON
         
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(despesa))

        localStorage.setItem('id', id)

        /*
            sempre quando houver a tentativa 
            de gravacao o valor 1 sera retornado
            ----------------------------------------
            se o processo de gravacao for 
            bem sucedido o valor e atualizado a partir da chave id 
            com o novo id
            produzido pelo metodo proximo id
        */
    }

    recuperarTodosRegistros(){

        //array despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recuperar todas as despesas cadastradas em localstorage
        for(let i = 1; i <=id; i++){

            //recuperar a despesa 
            let despesa = JSON.parse(localStorage.getItem(i))

            /*existe a possibilidade de haver índices que foram 
            removidos ou pulados neste caso o indice sera pulado do registro
             */
            if(despesa == null){
                continue
            }

            despesas.push(despesa)
           
        }

        return despesas
    }

    pesquisar(despesa){

        let despesasFiltradas = []
        despesasFiltradas = this.recuperarTodosRegistros()
       
        console.log(despesa)
        console.log(despesasFiltradas)
        //ano
        if(despesa.ano != ''){
            console.log('filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //mes
        if(despesa.mes != ''){
            console.log('filtro de mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //dia
        if(despesa.dia != ''){
            console.log('filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo 
        if(despesa.tipo != ''){
            console.log('tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)

        }

        //descricao
        if(despesa.descricao != ''){
            console.log('descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)

        }

        //valor
        if(despesa.valor != ''){
            console.log('valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        
        
      console.log(despesasFiltradas)
    }

}

let bd = new Bd()

function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value)

        if(despesa.validarDados()){
           bd.gravar(despesa)
           //dialog de sucesso
           console.log('dados validos')
            document.getElementById('modalTitulo').innerHTML = 'Registro inserido com sucesso'
            document.getElementById('tema_titulo').className = 'modal-header text-success'
            document.getElementById('conteudoModal').innerHTML = 'Despesa cadastrada com sucesso!'
            document.getElementById('btn_Voltar').className = 'btn btn-success'
            document.getElementById('btn_Voltar').innerHTML = 'Voltar'
            
           $('#modalRegistraDespesa').modal('show')
           //limpa campos
           ano.value = ''
           mes.value = ''
           dia.value = ''
           tipo.value = ''
           descricao.value = ''
           valor.value = ''

        }else{
            //dialog de erro
            console.log('dados invalidos')
            document.getElementById('modalTitulo').innerHTML = 'Erro na gravação'
            document.getElementById('tema_titulo').className = 'modal-header text-danger'
            document.getElementById('conteudoModal').innerHTML = 'Existem campos obrigatórios que não foram preenchidos'
            document.getElementById('btn_Voltar').className = 'btn btn-danger'
            document.getElementById('btn_Voltar').innerHTML = 'Voltar e corrigir'
            
            $('#modalRegistraDespesa').modal('show')
            

        }

}

function carregaListaDespesas(){
    let despesas = []
    despesas = bd.recuperarTodosRegistros()

    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    //percorrendo o array despesas, listando cada despesa de forma dinamica
    despesas.forEach(function(d){

        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //criando as colunas 
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //ajusto da linha tipo para exibir o texto e nao o id do atributo tipo
            switch(d.tipo){
                case '1': d.tipo = 'Alimentaçao'
                    break
                case '2': d.tipo = 'Educação'
                    break
                case '3': d.tipo = 'Lazer'
                    break
                case '4': d.tipo = 'Saúde'
                    break
                case  '5': d.tipo = 'Transporte'
                    break
            }
        linha.insertCell(1).innerHTML = d.tipo

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}

function pesquisaDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes,dia, tipo, descricao, valor)

    bd.pesquisar(despesa)
}