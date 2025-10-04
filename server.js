const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let Jogos = [
    {id : 1, nome: 'Lobotomy Corporation', Tags:['Indie','Management','PsychologicalHorror','2D'],Preco:36},
    {id : 2, nome: 'Library of Ruina', Tags:['Indie','StoryRich','DeckBuilding','2D'],Preco:46},
    {id : 3, nome: 'Balatro', Tags:['Indie','Roguelike','PsychologicalHorror','2D'],Preco:50},
    {id : 4, nome: 'Hello Neighbor', Tags:['Indie','peak','Puzzle','3D'],Preco:16},
    {id : 5, nome: 'Hello Kitty Island Adventure', Tags:['Indie','Casual','Cute','2D'],Preco:270},
    {id : 6, nome: 'Touhou Kinjoukyou ～ Fossilized Wonders', Tags:['Indie','BulletHell','Difficult','2D'],Preco:47},
    {id : 7, nome: 'Sonic mania', Tags:['Platformer','FastPaced','GreatSoundtrack','2D'],Preco:22}

];

app.listen(port, () => {
    console.log(`Servidor em execução: http://localhost:${port}`);
});

app.get("/Jogos", (req,res) => res.json(Jogos));

app.get("/Jogos/:id", (req,res) => {
const id = parseInt(req.params.id);
const Jogos = Jogos.find(p => p.id === id);

if(pessoa){
    res.json(Jogos)
}else{
    res.status(404).json({error : 'Jogo Não Encontrada.'})
}
});

// app.post('/Jogos', (req, res) => {
//     const nome = req.body.nome;

    

//     const novaPessoa = {
//         id: Jogos.length + 1,
//         nome: nome
//     }

//     pessoas.push(novaPessoa);
//     res.status(201).json(novaPessoa)
// });

// app.put('/pessoas/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const { nome } = req.body;
//     const pessoa = pessoas.find(p => p.id === id);
//     if(pessoa) {
//         pessoa.nome= nome;
//         res.json(pessoa)

//     } else {
//         res.status(404).json( {error: 'Pessoa não encontrada'})
//     }
// });

// app.delete('/pessoas/:id', (req, res) => { 
//     const id = parseInt(req.params.id);
//     const index = pessoas.findIndex(p => p.id === id); // INDEX LIBRARY OF RUINA??!?!??!?!?!?

//     if(index !== -1){
//         const pessoaDeletada = pessoas.splice(index, 1);
//         res.json(pessoaDeletada[0])
//     } else {
//         res.status(404).json( {error: 'Pessoa não encontrada'})
//     }
// })

