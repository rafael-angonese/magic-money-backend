<- [README.md](../README.md)

# **🎒 Guia de commits**

O padrão de commits utilizado é baseado no:
- [Git Karma](https://karma-runner.github.io/0.8/dev/git-commit-msg.html).
- [Conventional Commits](https://www.conventionalcommits.org/).

os commits seguem a seguinte estrutura:

```bash
$ [type](optional scope): [subject]
```

### Tipos:

- `feat`: Usado para a criação de uma nova funcionalidade.
- `fix`: Usado para a correção de alguma funcionalidade e/ou bug no código.
- `docs`: Usado para atualização da documentação.
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: Usado para refatorar código sem alterar sua funcionalidade apenas melhoria.
    - `perf`: Usado para atualizar e/ou configurar performance.
- `test`: Usado para criação, ajustes, e refatoração de testes.
- `build`: Usado para atualizações de ferramentas de build, pipeline de CI/CD, dependências, versão do projeto.
- `chore`: Usado quando não há alterações no código de produção/fonte mais sim no ambiente de desenvolvimento ex: Instalação de libs, configurações de package.json, configuração de Docker, etc.


### Exemplos

```
feat: add email notifications on new direct messages
```

```
feat(cart): add button to add products into wish list
```

```
fix(api): handle empty message in request body
```

```
fix(api): fix wrong calculation of request body checksum
```

```
fix: add missing parameter to service call
```

```
perf: decrease memory footprint for determine unique visitors by using HyperLogLog
```

```
build: update dependencies
```

```
build(release): `bump version to 1.0.0
```

```
refactor: implement fibonacci number calculation as recursion
```
```
style: remove empty line
```

---

## **😜😍 Gitmoji**

Para adicionar os emojis nos commits é utilizado a ferramenta gitmoji:

- [Gitmoji.dev](https://gitmoji.dev/)
- [Gitmoji Github](https://github.com/carloscuesta/gitmoji)

```bash
# para instalar com o npm
$ npm i -g gitmoji-cli

# verificar a instalação
$ gitmoji -v

# para utilizar
$ gitmoji

# para fazer commits
$ gitmoji -c
```

---
