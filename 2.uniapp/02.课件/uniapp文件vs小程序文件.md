# uniapp文件vs小程序文件

1. uniapp文件
   1. manifest.json
      1. 效果类似于小程序中的project.config.json,相当于是项目的说明书
      2. 目前已知重点:小程序appId在此处设置
   2. **pages.json**
      1. 效果类似于小程序中的app.json+所有页面的json文件,相当于是小程序的全局配置
      2. 目前已知重点:整个项目的页面信息在此处配置,其中globalStyle属性相当于是以前的window
   3. main.js+App.vue
      1. 效果类似于app.js+app.wxss,相当于在注册整个小程序应用
      2. App.vue文件中的style标签用来书写全局公共样式
   4. unpackage文件夹
      1. 该文件夹内部存放的是已经编译成小程序的uniapp项目
      2. 注意:**禁止修改该文件夹内部的代码,否则重新编译之后代码会全部丢失**
   5. pages文件夹
      1. 该文件夹与小程序中的pages几乎一模一样,用于存放所有的页面
      2. 由于每个页面的json都被集成到pages.json中,所以在此处只有存在.vue文件
         1. 文件中的template对应每个页面的wxml
         2. 文件中的script对应每个页面的js
         3. 文件中的style对应每个页面的wxss

