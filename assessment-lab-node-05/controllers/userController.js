const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.get('/cliente/12345', authMiddleware, (req, res) => {
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

router.post('/login', (req, res) => {
    const user = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com'
    };
  
    const token = jwt.sign(user, 'secret', {
      expiresIn: '1h' 
    });
  
    res.json({ token });
  });

module.exports = router;
