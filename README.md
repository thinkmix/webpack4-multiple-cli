# webpack4多页脚手架
> 基于webpack4搭建

## Features
+ 完善的eslint配置
+ 合理的架构目录搭建

# node版本
v14.1.0

# 命令
``` bash
# 安装依赖
$ yarn install

# 开发
$ yarn dev

# 编译
$ yarn build

# 包分析
$ yarn build --report
```

# 架构目录
```
├── build [webpack配置]
├── src
│   ├── assets [公共资源]
│   ├── api [接口]
│   ├── layouts [公共布局]
│   ├── styles [公共样式]
│   ├── plugins [插件]
│   ├── utils[公共工具]
│   └── pages
│       ├── pc [pc端页面]
│       └── mobile[移动端]
└── postcss.config.js
```