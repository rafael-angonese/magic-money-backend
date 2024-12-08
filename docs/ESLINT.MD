<- [README.md](../README.md)

# 🦚 **ESLint**

Para executar a verificação de melhorias de código com o ESLint basta executar o comando de lint.

```bash
$ pnpm run lint
```
Será exibido no console as sugestões de melhorias.

Para executar correções que o próprio ESLint consegue resolver basta executar o seguinte comando.
```bash
$ npm run lint-fix
```

Será feito a correção automagicamente do do código, é essencial conferir as correções feita pois podem introduzir bugs.

---

# 🌵 **Configurando seu Vs Code**

Por fim, é necessário configurar o VSCode para utilizar o ESLint e o Prettier para fazer sugestões e formatar o código, respectivamente.
Caso você ainda não as possua, instale a extensão do [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Como o Prettier está sendo utilizado como um plugin do ESLint, você não precisa da extensão `Prettier - Code formatter`

Caso seu projeto ainda não possua um arquivo `.vscode/settings.json`, será necessário criá-lo. Nesse arquivo, adicione as duas regras a seguir:

```json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  // "editor.formatOnSave": true, essa opção deve estar desabilitada
```
