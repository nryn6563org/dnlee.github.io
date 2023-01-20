const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            css: {
                modules: {
                    auto: () => true,
                    localIdentName: '[local]' // class명 자동 변경 중지
                }
            }
        }
    }
})
