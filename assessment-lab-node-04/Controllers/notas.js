const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require("mongoose")
var minhas_notas

const NotasSchema = new mongoose.Schema({
    nota: Number,
    cod: Number,
    nomeDisciplina: String,
    nomeProfessor: String,
});

const Notas = mongoose.model('Notas', NotasSchema, 'notas'); 


function setNotas(novasNotas) {
    minhas_notas = novasNotas;
}

router.get('/', (req, res) => {
    console.log(minhas_notas)
    res.send('Hello World wadawdawd!')
})

router.post("/", async (req, res) => {
    const value = req.body.valor;
    const cod = req.body.cod;
    const nomeDisciplina = req.body.nomeDisciplina;
    const nomeProfessor = req.body.nomeProfessor;
    if (value === undefined) {
        return res.status(400).json({erro : "nao existe valor"})
    } else {
        minhas_notas.notas[req.params.index].nota = value;
        const novaNota = new Notas({
            nota: value,
            cod: cod,
            nomeDisciplina: nomeDisciplina,
            nomeProfessor: nomeProfessor
        });
        await novaNota.save();
        // fs.writeFileSync('./Shared/ficheiro_notas.json', JSON.stringify(minhas_notas, null, 2));

        return res.status(200).json({mnsg : "valor adicionado"});
    }
})

router.post("/atualizarNota/:index", async (req, res) =>{
    const value = req.body.valor;
    if(value === undefined) {
        return res.status(400).json({erro : "nao existe valor"})
    } else {
        minhas_notas.notas[req.params.index].nota = value;
        console.log(minhas_notas)
        await Notas.findByIdAndUpdate(req.params.index, { nota: value });
        // fs.writeFileSync('./Shared/ficheiro_notas.json', JSON.stringify(minhas_notas, null, 2));
        return res.status(200).json({mnsg : "valor adicionado"});
    }
})


router.get("/notaByIndex/:index", async (req, res) => {
    const data = await Notas.findById(id).exec();
    console.log(`A nota no index ${req.params.index} é ${data}`);
    res.send(`A nota no index ${req.params.index} é ${data}`);
})

router.patch("/atualizarNotaPatch/:index", async (req, res) => {
    const value = req.body.valor;
    const index = parseInt(req.params.index);

    if(value === undefined) {
        return res.status(400).json({erro : "nao existe valor"})
    } else {
        console.log(`Index recebido:`, index);
        console.log(`Valor recebido:`, req.body.valor);
        minhas_notas.notas[index].nota = value;
        console.log("Notas:", minhas_notas);
        await Notas.findByIdAndUpdate(req.params.index, { nota: value });


        return res.status(200).json({mnsg : "valor adicionado"});
    }
})

router.delete("/deletarNota/:index", async (req, res) => {
    const index = parseInt(req.params.index);

    if(index === undefined) {
        return res.status(400).json({erro : "nao existe valor"})
    } else {
        console.log(`Index recebido:`, index);
        minhas_notas.splice(index, 1);
        console.log("Notas:", minhas_notas);
        // fs.writeFileSync('./Shared/ficheiro_notas.json', JSON.stringify(minhas_notas, null, 2));
        await Produto.findByIdAndDelete(index);

        return res.status(200).json({mnsg : "valor deletado"});
    }
})

router.delete("/", (req, res) =>{
    console.log("Notas Antes:", minhas_notas);
    minhas_notas = {"notas": []}
    console.log("Notas:", minhas_notas);
    // fs.writeFileSync('./Shared/ficheiro_notas.json', JSON.stringify(minhas_notas, null, 2));
    return res.status(200).json({mnsg : "valor deletado"});

})

module.exports = { router, setNotas};