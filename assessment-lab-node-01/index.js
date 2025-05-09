const express = require("express");
const app = express()
const port = 3001;

app.use(express.json());
let minhas_notas = [20, 10, 15, 17];


app.get('/', (req, res) => {
//   minhas_notas.forEach(element =>{
//     console.log(element);
//   });
  res.send('Hello World wadawdawd!')
})

app.post("/", (req, res) => {
    const value = req.body.valor;
    if (value === undefined) {
        return res.status(400).json({erro : "nao existe valor"})
    } else {
        minhas_notas.push(value);
        return res.status(200).json({mnsg : "valor adicionado"});
    }
})

app.post("/atualizarNota/:index", (req, res) =>{
    const value = req.body.valor;
    if(value === undefined) {
        return res.status(400).json({erro : "nao existe valor"})
    } else {
        minhas_notas[req.params.index] = value;
        return res.status(200).json({mnsg : "valor adicionado"});
    }
})


app.get("/notaByIndex/:index", (req, res) => {
    console.log(`A nota no index ${req.params.index} é ${minhas_notas[req.params.index]}`);
    res.send(`A nota no index ${req.params.index} é ${minhas_notas[req.params.index]}`);
})

app.patch("/atualizarNotaPatch/:index", (req, res) => {
    const value = req.body.valor;
    const index = parseInt(req.params.index);

    if(value === undefined) {
        return res.status(400).json({erro : "nao existe valor"})
    } else {
        console.log(`Index recebido:`, index);
        console.log(`Valor recebido:`, req.body.valor);
        minhas_notas[index] = value;
        console.log("Notas:", minhas_notas);

        return res.status(200).json({mnsg : "valor adicionado"});
    }
})

app.delete("/deletarNota/:index", (req, res) => {
    const index = parseInt(req.params.index);

    if(index === undefined) {
        return res.status(400).json({erro : "nao existe valor"})
    } else {
        console.log(`Index recebido:`, index);
        minhas_notas.splice(index, 1);
        console.log("Notas:", minhas_notas);

        return res.status(200).json({mnsg : "valor deletado"});
    }
})

app.delete("/", (req, res) =>{
    console.log("Notas Antes:", minhas_notas);
    minhas_notas = [];
    console.log("Notas:", minhas_notas);
    return res.status(200).json({mnsg : "valor deletado"});

})


app.listen(port, () => {
  console.log(`ASLabNode web running on ${port}`)
})

