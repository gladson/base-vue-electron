# APP BASE - ELECTRON VUE.JS

## Vue CLI 3 => [LINK](https://cli.vuejs.org)

### Instalation

```shell
$ yarn global add @vue/cli
$ yarn global add @vue/cli-init
```

### Create project

```shell
vue create NOME_DO_PROJETO
```

## Vue CLI 3 plugin for Electron => [LINK](https://nklayman.github.io)

#### Before you begin

```shell
$ yarn global add --production=true windows-build-tools
```

### Instalation

```shell
$ vue add electron-builder
```

## Project (Vue and Electron)

### Project install (node_modules)

```shell
$ yarn install
```

### Compiles and hot-reloads for development

#### For Vue:

```shell
$ yarn run serve
```

#### For Vue and Electron:

```shell
$ yarn electron:serve
```

### Compiles and minifies for production

#### For Vue:

```shell
$ yarn run build
```

#### For Vue and Electron:

```shell
$ yarn electron:build
```

### Run your tests

```shell
$ yarn run test
```

### Lints and fixes files

```shell
$ yarn run lint
```

## Want to help me?

Read the angular community guideline: [contributing][contributing]

[contributing]: /CONTRIBUTING.md