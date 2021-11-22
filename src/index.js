const express = require('express')
const aluno = require('./aluno')

const app = express()
app.use(express.json())

app.post('/alunos/register', (req, res) => {
    const {status, message} = aluno.adicionarAluno(req.body)
    return res.status(status).json({ status, message})
})

app.get('/alunos', (_req, res) => {
    const {status, message, data} = aluno.listarAlunos()
    return res.status(status).json({message, data})
})

app.get('/alunos/:raAluno', (req, res) => {
    const {status, message, data} = aluno.buscarAluno(req.params.raAluno)
    return res.status(status).json({status, message, data})
})

app.put('/alunos/:raAluno', (req, res) => {
    const {status, message} = aluno.editarAluno(req.params.raAluno, req.body)
    return res.status(status).json({status, message})
})

app.delete('/alunos/:raAluno', (req, res) => {
    const {status, message} = aluno.excluirAluno(req.params.raAluno)
    return res.status(status).json({status, message})
})

app.listen(3000)