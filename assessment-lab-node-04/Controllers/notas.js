const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Notas = require('../models/notas');

let minhas_notas = { notas: [] };

function setNotas(novasNotas) {
  minhas_notas = novasNotas;
}

router.use((req, res, next) => {
  const now = new Date(Date.now());
  console.log("A request was made [ " + req.method + " ] Date : " + now.toLocaleString());
  next();
});

router.get('/', async (req, res) => {
  try {
    const allNotas = await Notas.find({});
    console.log(minhas_notas);
    res.status(200).json(allNotas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar notas", detalhes: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body !== undefined) {
      const { nota, codigoDisciplina, nomeDisciplina, nomeProfessor } = req.body;
      
      if (nota === undefined) {
        return res.status(400).json({ erro: "nota não fornecida" });
      } else {
        const novaNota = new Notas({
          nota: nota,
          codigoDisciplina: codigoDisciplina,
          nomeDisciplina: nomeDisciplina,
          nomeProfessor: nomeProfessor
        });
        
        const savedNota = await novaNota.save();
        
        // Update in-memory object
        minhas_notas.notas.push({
          nota: nota,
          codigoDisciplina: codigoDisciplina,
          nomeDisciplina: nomeDisciplina,
          nomeProfessor: nomeProfessor
        });
        
        return res.status(200).json({
          msg: "valor adicionado",
          nota: savedNota
        });
      }
    } else {
      return res.status(400).json({ erro: "corpo da requisição vazio" });
    }
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao salvar nota", detalhes: error.message });
  }
});

// Update note by ID
router.post("/:id", async (req, res) => {
  try {
    const { nota } = req.body;
    
    if (nota === undefined) {
      return res.status(400).json({ erro: "nota não fornecida" });
    } else {
      const updatedNota = await Notas.findByIdAndUpdate(
        req.params.id,
        { nota: nota },
        { new: true }
      );
      
      if (!updatedNota) {
        return res.status(404).json({ erro: "Nota não encontrada" });
      }
      
      // Update in-memory note if found
      const index = minhas_notas.notas.findIndex(nota => 
        nota._id && nota._id.toString() === req.params.id
      );
      
      if (index !== -1) {
        minhas_notas.notas[index].nota = nota;
      }
      
      console.log(minhas_notas);
      return res.status(200).json({ msg: "valor atualizado", nota: updatedNota });
    }
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao atualizar nota", detalhes: error.message });
  }
});

router.put("/notas/:id", async (req, res) => {
  try {
    const atualizacoes = req.body;

    if (Object.keys(atualizacoes).length === 0) {
      return res.status(400).json({ erro: "Nenhum dado para atualizar foi fornecido" });
    }

    const notaAtualizada = await Notas.findByIdAndUpdate(
      req.params.id,
      atualizacoes,
      { new: true }
    );

    if (!notaAtualizada) {
      return res.status(404).json({ erro: "Nota não encontrada" });
    }

    // Atualizar em minhas_notas (caso tenha sido carregado antes)
    const index = minhas_notas.notas.findIndex(nota =>
      nota._id && nota._id.toString() === req.params.id
    );

    if (index !== -1) {
      minhas_notas.notas[index] = {
        ...minhas_notas.notas[index],
        ...atualizacoes
      };
    }

    res.status(200).json({ msg: "Nota atualizada com sucesso", nota: notaAtualizada });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar nota", detalhes: error.message });
  }
});

// Get note by ID
router.get("/notaById/:id", async (req, res) => {
  try {
    const data = await Notas.findById(req.params.id).exec();
    
    if (!data) {
      return res.status(404).json({ erro: "Nota não encontrada" });
    }
    
    console.log(`A nota com ID ${req.params.id} é ${data.nota}`);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar nota", detalhes: error.message });
  }
});

// Delete note by ID
router.delete("/deletarNota/:id", async (req, res) => {
  try {
    const deletedNota = await Notas.findByIdAndDelete(req.params.id);
    
    if (!deletedNota) {
      return res.status(404).json({ erro: "Nota não encontrada" });
    }
    
    const index = minhas_notas.notas.findIndex(nota => 
      nota._id && nota._id.toString() === req.params.id
    );
    
    if (index !== -1) {
      minhas_notas.notas.splice(index, 1);
    }
    
    console.log("Notas:", minhas_notas);
    return res.status(200).json({ msg: "valor deletado", nota: deletedNota });
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar nota", detalhes: error.message });
  }
});

// Delete all notes
router.delete("/", async (req, res) => {
  try {
    console.log("Notas Antes:", minhas_notas);
    
    await Notas.deleteMany({});
    minhas_notas = { notas: [] };
    
    console.log("Notas Depois:", minhas_notas);
    return res.status(200).json({ msg: "todas as notas foram deletadas" });
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar todas as notas", detalhes: error.message });
  }
});

module.exports = { router, setNotas };