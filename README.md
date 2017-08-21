# knit-cli
前端开发脚手架工具

## 更新
接入了Vue-cli脚手架，可以生成webpack类的模版

## 安装
```
npm install knit-cli -g
```

## 使用
```
  Usage: knit <command> [options]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    list   List all the templates
    init   Generate a new project from a template
```

## Commands
### list
```
$ knit list

    Please select a development template:

  ★  simple -- gulp + browser-sync + jade + less + es5
  ★  vue -- A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction.
  ★  vue-pwa -- PWA template for vue-cli based on the webpack template
```

### init
```
$ knit init 

Template name: my-tpl-name

Project name: new-project-name

```

