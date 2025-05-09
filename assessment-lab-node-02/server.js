const express = require('express')
const app = express()
const port = 3000
const path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); // ou 'public' se usares uma pasta pública

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cliente/12345', (req, res) => {
    res.json({
      clienteId: "12345",
      nome: "João Silva",
      endereco: {
        rua: "Rua Exemplo",
        numero: "42",
        cidade: "Lisboa",
        codigoPostal: "1234-567"
      },
      consumo: [{
        mes: "Janeiro",
        ano: 2023,
        kWhConsumido: 250,
        custoTotal: 35.50,
        dataLeitura: "2023-01-31"
      }],
      informacoesAdicionais: {
        tipoTarifa: "Residencial",
        fornecedorEnergia: "Empresa XYZ",
        contratoAtivo: true
      }
    });
});


app.listen(port, () => {
  console.log(`ASLabNode web running on ${port}`)
})

