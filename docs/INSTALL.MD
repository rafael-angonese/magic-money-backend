<- [README.md](../README.md)

# 🦝 **Dependências**
- AWS S3.
- PostgreSQL.
- Node.js.

---

# 🎮 **Ambiente de desenvolvimento**

Para executar o ambiente de desenvolvimento deste projeto é necessário possuir o node instalado em sua máquina.

```bash
$ node --version
v20.6.1
```

Possuir um gerenciador de pacotes `yarn`/`pnpm`/`npm`.

por padrão vamos utilizar o pnpm, mas pode ser utilizado qualquer outro.

```bash
# para verificar se possui o gerenciador de pacotes instalado
$ pnpm --version
9.4.0
```
---

### 🐫 **Instale as dependências**

```bash
$ pnpm install

# Alternativamente ou preferencialmente voce pode instalar as dependências exatas do lock file
$ pnpm ci
```
---

### **📦 PostgreSQL**

Nesse projeto existe um arquivo chamado `Dockerfile-db`

```bash
# versão do docker
$ docker --version
Docker version 27.3.1, build ce12230
```

```bash
$ docker build -t magic-money-postgresql -f Dockerfile-db .
```

```bash
$ docker run -d --name magic-money-postgresql -p 5432:5432 magic-money-postgresql
```

---

### 🌬 **ENV**

Crie um arquivo .env com base no arquivo [.env.example](../.env.example)

**IMPORTANTE** : Substitua a váriavel APP_KEY, use o comando

```
node ace generate:key
```

---

### **🚀 Migrations and Seeders**

Para executar migrations:

```bash
node ace migration:run
```

Para executar seeders:

```bash
node ace db:seed
```

---

### **🚀 Execute a aplicação**

```bash
$ pnpm run dev
```

- A api estará rodando na porta 3333.
- Acesse [`<http://localhost:3333>`](http://localhost:3333)

---
