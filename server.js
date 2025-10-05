const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let Jogos = [
    {id : 1, nome: 'Lobotomy Corporation', Tags:['Indie','Management','PsychologicalHorror','2D'],preco:36},
    {id : 2, nome: 'Library of Ruina', Tags:['Indie','StoryRich','DeckBuilding','2D'],preco:46},
    {id : 3, nome: 'Balatro', Tags:['Indie','Roguelike','PsychologicalHorror','2D'],preco:50},
    {id : 4, nome: 'Hello Neighbor', Tags:['Indie','Puzzle','3D'],preco:16},
    {id : 5, nome: 'Hello Kitty Island Adventure', Tags:['Indie','Cute','2D'],preco:270},
    {id : 6, nome: 'Touhou Kinjoukyou ～ Fossilized Wonders', Tags:['Indie','BulletHell','Difficult','2D'],preco:47},
    {id : 7, nome: 'Sonic mania', Tags:['Platformer','2D'],preco:22}

];

app.listen(port, () => {
    console.log(`
=====================================
            API de Jogos                
=====================================

GET /Jogos
  -> Retorna todos os jogos cadastrados.

GET /Jogos/idSearch/:id
  -> Retorna um jogo pelo ID.

POST /Jogos/idCreate
  -> Cria um novo jogo.

PUT /Jogos/idUpdate/:id
  -> Atualiza um jogo pelo ID.

DELETE /Jogos/idDelete/:id
  -> Deleta um jogo pelo ID.

GET /Jogos/precoSearch/:preco
  -> Retorna todos os jogos com preço maior que o valor fornecido.

GET /Jogos/quantia
  -> Retorna a quantidade de jogos cadastrados.

GET /Jogos/First
  -> Retorna o primeiro jogo cadastrado.

GET /Jogos/Last
  -> Retorna o último jogo cadastrado.
=====================================
    http://localhost:${port}/Jogos
=====================================
`);

});

app.get("/Jogos", (req,res) => res.json(Jogos));

app.get("/Jogos/idSearch/:id", (req,res) => {
const id = parseInt(req.params.id);
const JogoEncontrado = Jogos.find(p => p.id === id);

if(JogoEncontrado){
    res.json(JogoEncontrado)
}else{
    res.status(404).json({error : 'Jogo Não Encontrado.'})
}
});

app.post('/Jogos/idCreate', (req, res) => {
    const nome = req.body.nome;
    const Tags = req.body.Tags;
    const preco = req.body.preco; 
        let newID = 0
        const lastid = Jogos.length - 1
        while(newID < (Jogos[lastid].id)){
        newID++
        } 

    const novoJogo = {
        id: newID+1,
        nome: nome,
        Tags: Tags,
        preco: preco

    }

    Jogos.push(novoJogo);
    res.status(201).json(novoJogo)
});

app.put('/Jogos/idUpdate/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;
    const { Tags } = req.body;
    const { preco } = req.body;

    const Jogoupd = Jogos.find(p => p.id === id);
    if(Jogoupd) {
        Jogoupd.nome= nome;
        Jogoupd.Tags= Tags;
        Jogoupd.preco= preco;

        res.json(Jogoupd)

    } else {
        res.status(404).json( {error: 'Jogo não encontrado'})
    }
});

app.delete('/Jogos/idDelete/:id', (req, res) => { 
    const id = parseInt(req.params.id);
    const IndexDel = Jogos.findIndex(p => p.id === id); 

    if(IndexDel !== -1){
        const JogoDeletado = Jogos.splice(IndexDel, 1);
        res.json(JogoDeletado[0])
    } else {
        res.status(404).json( {error: 'Jogo não encontrado'})
    }
})

app.get('/Jogos/precoSearch/:preco', (req, res) => {
    const precoM = parseInt(req.params.preco);
    const JogosSelecionados = []
    for(let i = 0; i < Jogos.length ;i++){
        if (Jogos[i].preco < precoM){
            JogosSelecionados.push(Jogos[i])
        }else{

        }
    }
    
    if (JogosSelecionados.length == 0){
        res.status(404).json( {error: 'Nenhum Jogo Encontrado com o preço selecionado.'})
    } else {
        res.json(JogosSelecionados)
    }

});

app.get("/Jogos/quantia", (req,res) => res.json({Quantia : `Atualmente existem ${(Jogos.length)} Cadastrados` }));

app.get("/Jogos/First", (req,res) => res.json({Quantia : `Primeiro jogo cadastrado foi : ${(Jogos[0].nome)}` }));

app.get("/Jogos/Last", (req,res) => res.json({Quantia : `Ultimo jogo cadastrado foi : ${(Jogos[Jogos.length - 1].nome)}` }));

