const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req, res) =>
{
    res.send('Tarefa lida');
})

// rota para criar uma tarefa
app.post('/create-task', (req, res) => {
  
  res.send('Tarefa criada')

})

// rota para deletar uma tarefa
app.delete('/delete-task', (req, res) => {
  
  res.send('Tarefa deletada')

})

// rota para atualizar tarefa
app.put('/update-task', (req, res) => {
  
  res.send('Tarefa atualizada')

})

app.listen(port, () => {
    console.log('Server running ...');
})
app.use(express.static(path.join(__dirname, 'public')));