<template>
    <h1>공통디자인-Tab</h1>
    <h2>style01 - 더보기 버튼 없음</h2>
    <div  class="tabStyle01">
        <div class="swipeArea">
            <ul>
                <li class="on">
                    <a href="javascript:;"
                        draggable="false">
                        호가
                    </a>
                </li>
                <li v-for="(list,index) in state.menuList" :key="index">
                    <a href="javascript:;"
                        draggable="false">
                            {{ list.menuName }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <h2>style02 - 더보기 버튼 0</h2>
    <div class="tabStyle02">
        <div class="swipeArea">
            <ul>
                <li class="on">
                    <a href="javascript:;"
                        draggable="false">
                        호가
                    </a>
                </li>
                <li v-for="(list,index) in state.menuList" :key="index">
                    <a href="javascript:;"
                        draggable="false">
                            {{ list.menuName }}
                    </a>
                </li>
            </ul>
        </div>
        <!-- only tabStyle02  -->
        <button type="button">v</button>
        <!-- //only tabStyle02  -->
    </div>
    <h2>style03</h2>
    <div class="tabStyle03">
        <ul data-tabList="4">
            <li class="on">
                <a href="javascript:;">최근</a>
            </li>
            <li>
                <a href="javascript:;">자주/퀵</a>
            </li>
            <li>
                <a href="javascript:;">내 계좌</a>
            </li>
            <li>
                <a href="javascript:;">최근</a>
            </li>
            <!-- <li>
                <a href="javascript:;">자주/퀵</a>
            </li>
            <li class="on">
                <a href="javascript:;">내 계좌</a>
            </li> -->
        </ul>
    </div>
    <div class="tabStyle03">
        <ul data-tabList="3">
            <li >
                <a href="javascript:;">최근</a>
            </li>
            <li>
                <a href="javascript:;">자주/퀵</a>
            </li>
            <li class="on">
                <a href="javascript:;">내 계좌</a>
            </li>
        </ul>
    </div>
    <h2>style04 </h2>
    <div class="tabStyle04">
        <ul data-tabList="4">
            <li class="on">
                <a href="javascript:;"
                    draggable="false">
                    호가
                </a>
            </li>
            <li>
                <a href="javascript:;"
                    draggable="false">
                    가운데
                </a>
            </li>
            <li>
                <a href="javascript:;"
                    draggable="false">
                    호가
                </a>
            </li>
            <li>
                <a href="javascript:;"
                    draggable="false">
                    호가
                </a>
            </li>
        </ul>
    </div>
    <div class="tabStyle04">
        <ul data-tabList="2">
            <li class="on">
                <a href="javascript:;"
                    draggable="false">
                    호가
                </a>
            </li>
            <li>
                <a href="javascript:;"
                    draggable="false">
                    가운데
                </a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { inject, reactive, onMounted } from 'vue'
// 글로벌변수 사용불가로 재 로드
const $autoWidthCheck = inject('$autoWidthCheck')
const $isMobile = inject('$isMobile')
const $swipeBind = inject('$swipeBind')

const state = reactive({
    menuList: [
        { menuName: '최근', menuCode: 'new' },
        { menuName: '차트', menuCode: 'all' },
        { menuName: '시간별', menuCode: 'code1' },
        { menuName: '일자별', menuCode: 'code2' },
        { menuName: '거래량', menuCode: 'code3' },
        { menuName: '최근', menuCode: 'code4' }
        // { menuName: '전체', menuCode: 'code5' },
        // { menuName: '주식', menuCode: 'code6' },
        // { menuName: 'ETF', menuCode: 'code7' },
        // { menuName: 'ETN', menuCode: 'code8' }
    ]
})

onMounted(() => {
    $autoWidthCheck()
    if(!$isMobile()) {
        $swipeBind()
    }
})
</script>
