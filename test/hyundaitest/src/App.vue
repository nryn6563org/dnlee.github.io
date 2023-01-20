<template>
    <!-- 앱 실행용 메뉴 -->
    <!-- <pageList :isHidden="true"></pageList> -->
    <!-- 웹헤더 구성 -->
    <header v-if="baseInfoData.isAppUse"></header>
    <!-- // 웹헤더 구성 -->
    <router-view
        :baseInfo="baseInfoData" />
    <!-- 웹푸터 구성 -->
    <footer v-if="baseInfoData.isAppUse"></footer>
    <!-- //웹푸터 구성 -->
</template>

<script setup>
import { getCurrentInstance, inject, reactive } from 'vue'
import pageList from '@/views/pageList.vue'
// 기본 높이값 세팅
const $fixMWebHeight = inject('$fixMWebHeight')

const baseInfoData = {
    isAppUse: true,
    userName: '김현대',
    userCelphone: '01000001234',
    isConnectCall: true,
    isConnectPhoneBook: true
}

const resultDate = reactive({
    resData: null
})

$fixMWebHeight()

const app = getCurrentInstance()
app.appContext.config.globalProperties.$baseInfoData = baseInfoData
app.appContext.config.globalProperties.$resultDate = resultDate

</script>

<style lang="postcss">
@import '@/assets/css/componentStyle.css';
@import '@/assets/css/globalStyle.css';
@import '@/assets/css/layout.css';

#hmsec {
    overflow: auto;
}
</style>
