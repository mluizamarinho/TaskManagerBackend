# TaskManagerBackend

O Task Manager visa auxiliar equipes a organizarem suas atividades. 


Rodando o Backend

Suba o Docker:

Execute o seguinte comando para iniciar o banco de dados com Docker Compose:

bash

    docker compose up


Configurar o Prisma:

Após o banco de dados estar rodando, execute o comando abaixo para sincronizar o esquema do Prisma com o banco de dados:

bash

    npx prisma db push


Executar o servidor:

Por fim, inicie o servidor do backend:

bash

    npm run dev



Rodando o Frontend

    Instalar as dependências do React:

    Navegue até a pasta do frontend e instale as dependências necessárias:

    bash

cd frontend
npm install

Executar o servidor do frontend:

Execute o seguinte comando para iniciar o servidor de desenvolvimento do React:

bash

    npm run dev

