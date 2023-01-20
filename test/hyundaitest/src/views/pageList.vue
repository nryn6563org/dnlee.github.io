<template>
<div :class="[menuData.isHidden === true ? 'hiddenMenu' : '']">
    <ul>
        <li>{{ menuData.testLog }}</li>
        <li v-for="(menus, index) in menuData.menuList" :key="index">
            <a href="javascript:;"
                :id="menus.compName"
                @click="moveTo(menus.compName)">
                {{ menus.menuName }} - {{ menus.compName }}
            </a>
        </li>
    </ul>
</div>
</template>

<script setup>
import { reactive, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const $axios = inject('$axios')
const $toastMsg = inject('$toastMsg')
const $checkMobile = inject('$checkMobile')
const $changeAppUI = inject('$changeAppUI')
const pageListJSON = '/json/pageList.json'
const props = defineProps(['isHidden'])

const menuData = reactive({
    menuList: new Array(0),
    isHidden: false,
    testLog: navigator.userAgent
})

const moveTo = (compName) => {
    $router.push({ name: compName })
}

const preRun = () => {
    $axios.get(pageListJSON, {})
        .then(function(res) {
            menuData.menuList = res.data
        })
        .catch(function(err) {
            console.log(err)
        })
    if($checkMobile() === 'iPhone') {
        $toastMsg({ msg: 'iOS App 접근입니다..' })
    } else if($checkMobile() === 'android') {
        $toastMsg({ msg: 'ANDROID App 접근입니다.' })
    } else {
        $toastMsg({ msg: '웹페이지접근입니다.' })
    }
}
preRun()
// 모바일 UI테스트 코드 추가
onMounted(() => {
    setTimeout(() => {
        $changeAppUI('hideQmenu')
        $toastMsg({ msg: 'hideQmenu' })
    }, 1500)
    setTimeout(() => {
        $changeAppUI('showQmenu')
        $toastMsg({ msg: 'showQmenu' })
    }, 3000)
    setTimeout(() => {
        $changeAppUI('hideTitle')
        $toastMsg({ msg: 'hideTitle' })
    }, 4500)
    setTimeout(() => {
        $changeAppUI('showTitle')
        $toastMsg({ msg: 'showTitle' })
    }, 6000)
    setTimeout(() => {
        $changeAppUI('hideAll')
        $toastMsg({ msg: 'hideAll' })
    }, 7500)
    setTimeout(() => {
        $changeAppUI('showAll')
        $toastMsg({ msg: 'showAll' })
    }, 9000)
})
</script>

<style lang="postcss" scoped>
    .hiddenMenu {
        position: absolute; overflow: hidden !important;
        top: -1px; width: 100vw; height: 1px !important;
    }
    ul {
        padding: 5px 0; margin: 60px 0 20px;
        list-style: none;
        & > li {
            background: rgba(0,0,0,.08);
            & a {
                display: block;
                padding: 10px 20px;
                text-decoration: none; color: var(--black)
            }
            & + li { margin-top: 5px; }
        }
    }
</style>