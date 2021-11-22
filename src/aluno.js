const cpfCnpj = require('cpf-cnpj-validator')
const cpfValidator = cpfCnpj.cpf;

const alunos = [
    {
        nome: 'José Fernando',
        curso: 'Direito',
        semestre: 3,
        cpf: 12256572021,
        ra: 586235,
        cidade: 'Pompeia'
    },
    {
        nome: 'Camila Souza',
        curso: 'Sistemas da Informação',
        semestre: 6,
        cpf: 52956293095,
        ra: 586276,
        cidade: 'Marília'
    },
    {
        nome: 'Daniel Ferreira',
        curso: 'Ciência da Computação',
        semestre: 2,
        cpf: 29334146001,
        ra: 586277,
        cidade: 'Marília'
    },
    {
        nome: 'Reinaldo Porte Peres',
        curso: 'Ciência da Computação',
        semestre: 8,
        cpf: 11968158014,
        ra: 555555,
        cidade: 'Marília'
    },
    {
        nome: 'João Pedro Santos',
        curso: 'Ciência da Computação',
        semestre: 8,
        cpf: 39813594020,
        ra: 555577,
        cidade: 'Marília'
    }
]

const listarAlunos = () => {
    return {status: 200, message: 'Listagem realizada com sucesso',  data: alunos}
}

const buscarAluno = raAluno => {
    const aluno = alunos.find(aluno => aluno.ra === Number.parseInt(raAluno))
    if(aluno){
        return {status: 200, message: 'Busca realizada com sucesso',  data: aluno}
    }
    
    return {status: 404, message: 'Aluno não encontrado'}
}

const excluirAluno = raAluno => {
    const {status, message, data} = buscarAluno(raAluno)

    if(!data){
        return {status, message}
    }

    let novaListaAlunos = alunos.filter(aluno => aluno.ra !== Number.parseInt(raAluno))
    alunos.length = 0

    novaListaAlunos.forEach(aluno => {
        alunos.push(aluno)
    })

    return {status: 200, message: 'Deleção realizada'}
}

const adicionarAluno = data => {
    const camposFaltantes = []

    if(!data.nome){
        camposFaltantes.push(' nome')
    } 
    if(!data.curso){
        camposFaltantes.push(' curso')
    }
    if(!data.semestre){
        camposFaltantes.push(' semestre')
    }
    if(!data.cpf){
        camposFaltantes.push(' cpf')
    }
    if(!data.ra){
        camposFaltantes.push(' ra')
    }
    if(!data.cidade){
        camposFaltantes.push(' cidade')
    }

    if(camposFaltantes.length > 0){
        return {status: 400, message: `Preencher os campos:${camposFaltantes.toString()}`}
    }
    
    if(typeof data.cpf !== 'number'){
        return {status: 400, message: 'CPF inválido'}
    } else if(!cpfValidator.isValid(data.cpf.toString())){
        return {status: 400, message: 'CPF inválido'}
    } else if(alunos.find(aluno => aluno.cpf === data.cpf)) {
        return {status: 400, message: 'CPF já cadastrado'}
    }

    if(typeof data.ra !== 'number'){
        return {status: 400, message: 'RA inválido'}
    } else if(alunos.find(aluno => aluno.ra === data.ra)) {
        return {status: 400, message: 'RA já cadastrado'}
    }

    if(typeof data.semestre !== 'number'){
        return {status: 400, message: 'Semestre inválido'}
    }
    if(typeof data.nome !== 'string'){
        return {status: 400, message: 'Nome inválido'}
    }
    if(typeof data.curso !== 'string'){
        return {status: 400, message: 'Curso inválido'}
    }
    if(typeof data.cidade !== 'string'){
        return {status: 400, message: 'Cidade inválida'}
    }

    alunos.push(data);
    return {status: 201, message: 'Aluno cadastrado'}
}

const editarAluno = (raAluno, bodyData) => {
    
    const {status, message, data} = buscarAluno(raAluno)

    if(!data){
        return {status, message}
    }
    
    let alunoEmEdicao = data;
    
    const camposFaltantes = []

    if(!bodyData.nome){
        camposFaltantes.push(' nome')
    } 
    if(!bodyData.curso){
        camposFaltantes.push(' curso')
    }
    if(!bodyData.semestre){
        camposFaltantes.push(' semestre')
    }
    if(!bodyData.cpf){
        camposFaltantes.push(' cpf')
    }
    if(!bodyData.cidade){
        camposFaltantes.push(' cidade')
    }

    if(camposFaltantes.length > 0){
        return {status: 400, message: `Preencher os campos${camposFaltantes.toString()}`}
    }
    
    if(typeof bodyData.cpf !== 'number'){
        return {status: 400, message: 'CPF inválido'}
    } else if(!cpfValidator.isValid(bodyData.cpf.toString())){
        return {status: 400, message: 'CPF inválido'}
    } else if(alunos.find(aluno => aluno.cpf === bodyData.cpf && aluno.cpf !== data.cpf)) {
        return {status: 400, message: 'CPF já em uso em outro cadastro'}
    }

    if(typeof bodyData.semestre !== 'number'){
        return {status: 400, message: 'Semestre inválido'}
    }
    if(typeof bodyData.nome !== 'string'){
        return {status: 400, message: 'Nome inválido'}
    }
    if(typeof bodyData.curso !== 'string'){
        return {status: 400, message: 'Curso inválido'}
    }
    if(typeof bodyData.cidade !== 'string'){
        return {status: 400, message: 'Cidade inválida'}
    }

    alunoEmEdicao.nome = bodyData.nome
    alunoEmEdicao.cpf = bodyData.cpf
    alunoEmEdicao.semestre = bodyData.semestre
    alunoEmEdicao.cidade = bodyData.cidade
    alunoEmEdicao.curso = bodyData.curso

    const alunosAtualizados = alunos.filter(aluno => aluno.ra !== alunoEmEdicao.ra)
    alunos.length = 0;

    alunosAtualizados.forEach(novoDado => {
        alunos.push(novoDado);
    })
    alunos.push(alunoEmEdicao);

    return {status: 200, message: 'Dados atualizados'}
}

module.exports = {listarAlunos, buscarAluno, adicionarAluno, editarAluno, excluirAluno}