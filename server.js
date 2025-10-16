const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

//JOGOS

let Jogos = [
    {id : 1, nome: 'Lobotomy Corporation', Tags:['Indie','Management','PsychologicalHorror','2D'],preco:36},
    {id : 2, nome: 'Library of Ruina', Tags:['Indie','StoryRich','DeckBuilding','2D'],preco:46},
    {id : 3, nome: 'Balatro', Tags:['Indie','Roguelike','PsychologicalHorror','2D'],preco:50},
    {id : 4, nome: 'Hello Neighbor', Tags:['Indie','Puzzle','3D', 'PEAK'],preco:16},
    {id : 5, nome: 'Hello Kitty Island Adventure', Tags:['Indie','Cute','2D'],preco:270},
    {id : 6, nome: 'Touhou Kinjoukyou ～ Fossilized Wonders', Tags:['Indie','BulletHell','Difficult','2D'],preco:47},
    {id : 7, nome: 'Sonic Mania', Tags:['Platformer','Furries','2D'],preco:22},
    {id : 8, nome: 'Hades', Tags:['Indie','Roguelike', 'Furries','2.5D'],preco:25},
    {id : 9, nome: 'Grand Theft Auto: San Andreas', Tags:['Adventure','PEAK','3D'],preco:35},
    {id : 10, nome: 'Hollow Knight', Tags:['Indie','Metroidvania', 'Furries','2D'],preco:67},
    {id : 11, nome: "Five Nights at Freddy's: Security Breach", Tags:['Horror','Gore', 'Furries', '+18','3D'],preco:621},
    {id : 12, nome: "Deltarune", Tags:['GreatSoundtrack','RPG', 'Furries','StoryRich','[[BIG SHOT]]','2D'],preco:34},
    {id : 13, nome: "Super Mario World Switch 2 Edition", Tags:['Plataformer','Furries','2D'],preco:500},
    {id : 14, nome: "Super Mario Odyssey Switch 2 Edition", Tags:['Nipples','+18','Furries','Plataformer','[[MID SHOT]]','3D'],preco:600}
];

//PORT NO CONSOLE

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

GET /Jogos/Med
  -> Retorna a média de todos os jogos cadastrados.

POST /Jogos/idCreateMultiple
  -> Cria Mais de um Jogo de uma vez.
=====================================
    http://localhost:${port}/Jogos
=====================================
`);

});

// PEGA TODOS OS JOGOS

app.get("/Jogos", (req,res) => res.json(Jogos));

//PESQUISA POR ID

app.get("/Jogos/idSearch/:id", (req,res) => {
const id = parseInt(req.params.id);
const JogoEncontrado = Jogos.find(p => p.id === id);

// SE O JOGO FOI ENCONTRADO OU NÃO 
    
if(JogoEncontrado){
    res.json(JogoEncontrado)
}else{
    res.status(404).json({error : 'Jogo Não Encontrado.'})
}
});

// CRIAR JOGOS

app.post('/Jogos/idCreate', (req, res) => {
    const nome = req.body.nome;
    const Tags = req.body.Tags;
    const preco = req.body.preco; 
// FUNÇÃO MENOS EFICIENTE COMPARADA A DO FINAL
        let newID = 0
        const lastid = Jogos.length - 1
        while(newID <= (Jogos[lastid].id)){
        newID++
        } 

// NOVO JOGO 
    const novoJogo = {
        id: newID,
        nome: nome,
        Tags: Tags,
        preco: preco

    }

    Jogos.push(novoJogo);
    res.status(201).json(novoJogo)
});

//ATUALIZAÇÃO MENOS O ID

app.put('/Jogos/idUpdate/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome;
    const preco = req.body.preco;
    const Tags = req.body.Tags;


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

// DELETAR JOGO

app.delete('/Jogos/idDelete/:id', (req, res) => { 
    const id = parseInt(req.params.id);
    const IndexDel = Jogos.findIndex(p => p.id === id); // PESQUISA O ID PELO ARRAY 

    if(IndexDel !== -1){
        const JogoDeletado = Jogos.splice(IndexDel, 1);
        res.json(JogoDeletado[0])
    } else {
        res.status(404).json( {error: 'Jogo não encontrado'})
    }
})

// PESQUISAR POR PREÇO

app.get('/Jogos/precoSearch/:preco', (req, res) => {
    const precoM = parseInt(req.params.preco);
    const JogosSelecionados = []
    for(let i = 0; i < Jogos.length ;i++){
        if (Jogos[i].preco > precoM){
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

// ETC...

app.get("/Jogos/quantia", (req,res) => res.json({Quantia : `Atualmente existem ${(Jogos.length)} Cadastrados` }));

app.get("/Jogos/First", (req,res) => res.json({Quantia : `Primeiro jogo cadastrado foi : ${(Jogos[0].nome)}` }));

app.get("/Jogos/Last", (req,res) => res.json({Quantia : `Ultimo jogo cadastrado foi : ${(Jogos[Jogos.length - 1].nome)}` }));

// MEDIA DO PREÇO DOS JOGOS

app.get('/Jogos/Med', (req, res) => {
    let Sum = 0
    for(let i = 0; i < Jogos.length ;i++){
        Sum += Jogos[i].preco
    }

    let Med = Sum/Jogos.length
    res.json({Media : `A média de preço de todos os jogos cadastrados atualmente é : ${(Med)}` })
});


// CRIA MAIS DE UM 

app.post('/Jogos/idCreateMultiple', (req, res) => {
    const novosJogosArray = req.body; 
    const jogosAdicionados = []; 

    let ultimoId = 0;
    if (Jogos.length > 0) {
        ultimoId = Math.max(...Jogos.map(jogo => jogo.id)); 
    }

    for (const novoJogoData of novosJogosArray) {
        ultimoId++; 

        const novoJogo = {
            id: ultimoId,
            nome: novoJogoData.nome,
            Tags: novoJogoData.Tags,
            preco: novoJogoData.preco
        };

        Jogos.push(novoJogo); 
        jogosAdicionados.push(novoJogo); 
    }
    res.status(201).json(jogosAdicionados);
});

// EXEMPLOS PARA SEREM UTILIZADOS :

/*

{
  "nome": "Celeste",
  "Tags": ["Platformer", "Indie", "Difficult", "Pixel Art"],
  "preco": 28
}

{
  "nome": "Stardew Valley",
  "Tags": ["Farming", "Relaxing", "Indie", "2D"],
  "preco": 26
}

{
  "nome": "Undertale",
  "Tags": ["StoryRich", "RPG", "Indie", "2D"],
  "preco": 19
}

{
  "nome": "Risk of Rain 2",
  "Tags": ["Indie", "Roguelike", "Multiplayer", "3D"],
  "preco": 45
}

    
*/












