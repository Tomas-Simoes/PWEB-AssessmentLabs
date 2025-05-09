
document.getElementById('carregarDados').addEventListener('click', () => {
    fetch('/cliente/12345')
      .then(res => res.json())
      .then(data => {
        document.getElementById('clienteId').value = data.clienteId;
        document.getElementById('nome').value = data.nome;
        document.getElementById('rua').value = data.endereco.rua;
        document.getElementById('numero').value = data.endereco.numero;
        document.getElementById('cidade').value = data.endereco.cidade;
        document.getElementById('codigoPostal').value = data.endereco.codigoPostal;
  
        const consumo = data.consumo[0];
        document.getElementById('mes').value = consumo.mes;
        document.getElementById('ano').value = consumo.ano;
        document.getElementById('kWhConsumido').value = consumo.kWhConsumido;
        document.getElementById('custoTotal').value = consumo.custoTotal;
        document.getElementById('dataLeitura').value = consumo.dataLeitura;
  
        document.getElementById('tipoTarifa').value = data.informacoesAdicionais.tipoTarifa;
        document.getElementById('fornecedorEnergia').value = data.informacoesAdicionais.fornecedorEnergia;
        document.getElementById('contratoAtivo').value = data.informacoesAdicionais.contratoAtivo;
      })
      .catch(err => console.error('Erro ao buscar dados:', err));
  });