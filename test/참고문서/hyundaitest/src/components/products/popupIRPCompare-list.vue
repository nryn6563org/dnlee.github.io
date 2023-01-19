<template>
<div id="fundCompareList" class="fullPopup">
    <div class="header">
        <h1>관심/비교</h1>
        <button class="modalClose" @click="returnVal()"></button>
    </div>
    <div class="contentsArea">
        <!-- tab메뉴 -->
        <div class="tabStyle04 h38 shadow sticky">
            <ul data-tabList="2">
                <li :class="{ 'on' : pageInfo.listType === 'favorite' }">
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType='favorite'">
                        관심 펀드
                    </a>
                </li>
                <li :class="{ 'on' : pageInfo.listType === 'often' }">
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType='often'">
                        최근 본 펀드
                    </a>
                </li>
            </ul>
        </div>
        <!-- 상품리스트 -->
        <ul class="productList select" :class="{ 'noList' : pageInfo.productList.length === 0 }">
            <!-- 등록개수가 0일 시 -->
            <li class="noList" v-if="pageInfo.productList.length === 0">
                <span></span>
                <p>입출금 내역이 없습니다.</p>
            </li>
            <!-- 선택된 값이 3개 초과일 시 overSelect() 실행 -->
            <!-- 펀드 개수 단위 -->
            <template v-else>
                <!-- 반복 단위 -->
                <li>
                    <label for="product1">
                        <input id="product1" type="checkbox"
                            v-model="pageInfo.productList[0].isChecked">
                        <div></div>
                    </label>
                    <!-- 기본 뱃지 영역 -->
                    <div class="bullets">
                        <!-- 위험도 class / red(매우높은위험) / orange(높은위험) / yellow(다소높은위험) /
                            lightBlue(보통위험) / blue(낮은위험) / green(매우낮은 위험) -->
                        <span class="bullet red">매우높은위험</span>
                        <span class="bullet gray">해외주식형</span>
                        <span class="bullet bgRed">고난도</span>
                        <span class="bullet purple">베스트</span>
                        <!-- 즐겨찾기 여부에 따른 class="on" 추가 -->
                        <button type="button" class="on" title="즐겨찾기"></button>
                    </div>
                    <!-- 타이틀, 안내, 수수료, 기간 -->
                    <a href="javascript:;" @click="pageInfo.productList[0].isChecked =! pageInfo.productList[0].isChecked">
                        <dl>
                            <dt>
                                <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                                수수료선취 - 온라인
                            </dt>
                            <dd>
                                3개월<br>
                                <strong>3.41%</strong>
                            </dd>
                        </dl>
                    </a>
                    <!-- 태그영역 -->
                    <p>
                        <strong>온라인</strong>
                        <strong>차이나백마주</strong>
                        <strong>해외주식</strong>
                    </p>
                </li>
                <!-- //반복 단위 -->
                <li>
                    <label for="product2">
                        <input id="product2" type="checkbox"
                            v-model="pageInfo.productList[1].isChecked">
                        <div></div>
                    </label>
                    <div class="bullets">
                        <span class="bullet red">매우높은위험</span>
                        <span class="bullet gray">해외주식형</span>
                        <span class="bullet bgRed">고난도</span>
                        <span class="bullet purple">베스트</span>
                        <button type="button" title="즐겨찾기"></button>
                    </div>
                    <a href="javascript:;" @click="pageInfo.productList[1].isChecked =! pageInfo.productList[1].isChecked">
                        <dl>
                            <dt>
                                <h1>KB스타코리아리버스인덱스증권투자신탁(주식-파생형)A-E클래스</h1>
                                수수료선취 - 온라인
                            </dt>
                            <dd>
                                3개월<br>
                                <strong>13.73%</strong>
                            </dd>
                        </dl>
                    </a>
                    <!-- 태그영역 -->
                    <p>
                        <strong>온라인</strong>
                        <strong>ISA</strong>
                        <strong>2차전지</strong>
                    </p>
                </li>
                <li>
                    <label for="product3">
                        <input id="product3" type="checkbox"
                            v-model="pageInfo.productList[2].isChecked">
                        <div></div>
                    </label>
                    <div class="bullets">
                        <span class="bullet yellow">다소높은위험</span>
                        <span class="bullet gray">해외주식형</span>
                        <button type="button" title="즐겨찾기"></button>
                    </div>
                    <a href="javascript:;" @click="pageInfo.productList[2].isChecked =! pageInfo.productList[2].isChecked">
                        <dl>
                            <dt>
                                <h1>유리차이나백마주뉴웨이브증권투자신탁[주식]C/C-P1e</h1>
                                수수료선취 - 온라인 - 퇴직연금
                            </dt>
                            <dd>
                                3개월<br>
                                <strong>13.44%</strong>
                            </dd>
                        </dl>
                    </a>
                    <!-- 태그영역 -->
                    <p>
                        <strong>온라인</strong>
                        <strong>차이나백마주</strong>
                        <strong>차이나</strong>
                        <strong>전기차</strong>
                    </p>
                </li>
                <li>
                    <label for="product4">
                        <input id="product4" type="checkbox"
                            v-model="pageInfo.productList[3].isChecked">
                        <div></div>
                    </label>
                    <div class="bullets">
                        <span class="bullet blue">보통위험</span>
                        <span class="bullet gray">해외주식형</span>
                        <button type="button" title="즐겨찾기"></button>
                    </div>
                    <a href="javascript:;" @click="pageInfo.productList[3].isChecked =! pageInfo.productList[3].isChecked">
                        <dl>
                            <dt>
                                <h1>메리츠차이나증권투자신탁[주식]종류C-Pe2</h1>
                                수수료선취 - 온라인 - 퇴직연금
                            </dt>
                            <dd>
                                3개월<br>
                                <strong>13.44%</strong>
                            </dd>
                        </dl>
                    </a>
                    <!-- 태그영역 -->
                    <p>
                        <strong>온라인</strong>
                        <strong>차이나</strong>
                        <strong>전기차</strong>
                    </p>
                </li>
            </template>
        </ul>
    </div>
    <div class="buttonArea"
        data-buttonLength="2">
        <!-- 버튼 공통 선택된 값이 없을 시 disabled 처리 -->
        <button type="button" class="white h50"
            :disabled="pageInfo.productList.filter(arr => arr.isChecked === true).length === 0"
            @click="$router.push({ name: 'newFundBuyStart' })">
            매수하기
            {{
                pageInfo.productList.filter(arr => arr.isChecked === true).length
            }}/{{
                pageInfo.productList.length
            }}
        </button>
        <!-- 펀드 비교목록 팝업 -->
        <button type="button" class="pointBlue h50"
            :disabled="pageInfo.productList.filter(arr => arr.isChecked === true).length < 2 ||
                pageInfo.productList.filter(arr => arr.isChecked === true).length > 3"
            @click="runComp(fundCompareView)">
                비교하기
                {{
                    pageInfo.productList.filter(arr => arr.isChecked === true).length
                }}/3
            </button>
    </div>
</div>
<component :is="componentsInfo.compName"
    :options="componentsInfo.compOption"
    @runEmits="closeComp" />
</template>
<script setup>
import { reactive, inject, onMounted, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import fundCompareView from '@/components/products/modalFundCompare-view.vue' // 펀드비교 목록
const $runAlert = inject('$runAlert')
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $router = useRouter()
const emit = defineEmits(['runEmits'])

// 기본 퍼포먼스용 데이타
const pageInfo = reactive({
    listType: 'favorite', // favorite(관심) / often(최근 본 펀드)
    productList: [
        { isChecked: false },
        { isChecked: false },
        { isChecked: false },
        { isChecked: false },
        { isChecked: false },
        { isChecked: false },
        { isChecked: false }
    ]
})

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
// 컴포넌트 애니메이션을 위해 nowRun === true가 아니면 600의 셋타임을 갖는다
const closeComponent = (nowRun) => {
    if(!nowRun) {
        setTimeout(() => {
            componentsInfo.compName = null
            componentsInfo.compOption = null
        }, 600)
    } else {
        componentsInfo.compName = null
        componentsInfo.compOption = null
    }
}
// 컴포넌트 실행 전체
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
}
// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        closeComponent()
    } else {
        closeComponent()
    }
}
// 비교펀드 최대 3개이상 선택시
const overSelect = () => {
    $runAlert({ msg: '펀드비교할 상품은 최대 3개까지 가능합니다.' })
}
// 모달 종료
const returnVal = () => {
    $modalEnd('fundCompareList')
    emit('runEmits', false)
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('fundCompareList')
})

</script>
<style lang="postcss" scoped>
div.fullPopup {
    & .contentsArea {
        position: relative;
        height: calc(100% - 70px);
        max-height: calc(100% - 70px);
        padding: 0;
        /* & div.tabStyle04 {
            position: sticky;
            background: #ccc;
            top: 0;
            z-index: 10;
            & li:not(.on) {
                border-color: transparent;
            }
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
        } */
    }
}
</style>