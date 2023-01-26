<template>
<div>
    <!-- 펀드상품검색 -->
    <section>
        <!-- tab메뉴 -->
        <div class="tabStyle04 h38 shadow">
            <ul data-tabList="4">
                <li :class="{ 'on': pageInfo.listType === '' }" >
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType=''">
                        전체
                    </a>
                </li>
                <li :class="{ 'on': pageInfo.listType === 'yield' }" >
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType='yield'">
                        수익률
                    </a>
                </li>
                <li :class="{ 'on': pageInfo.listType === 'setting' }" >
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType='setting'">
                        설정액
                    </a>
                </li>
                <li :class="{ 'on': pageInfo.listType === 'IRP' }" >
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType='IRP'">
                        IRP수익률
                    </a>
                </li>
            </ul>
        </div>
        <!-- 검색 영역 -->
        <div class="productSearch gray">
            <label for="fundSearchInput" class="search">
                <input type="search" id="fundSearchInput" placeholder="펀드명 검색"
                    @keyup="$checkButton($event)">
                <button title="검색" type="button"></button>
                <button title="내용삭제" class="resetInput" type="button" style="display: none"
                    @click="$resetInput('fundSearchInput', $event)"></button>
            </label>
            <button type="button" title="상세검색 설정" @click="runComp(fundSearchSetting)"></button>
            <div>
                <label for="onlyOnline">
                    <input type="checkbox" id="onlyOnline" checked>
                    <div>온라인 전용펀드</div>
                </label>
                <label for="investTendency">
                    <input type="checkbox" id="investTendency">
                    <div>투자성향에 맞는 펀드</div>
                </label>
            </div>
        </div>
        <div class="listSort">
            <button type="button" class="select"
                @click="runComp(reSelect)">3개월 수익률</button>
        </div>
        <!-- 상품리스트 -->
        <ul class="productList">
            <!-- 반복 목록 단위 -->
            <li>
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
                <a href="javascript:;" @click="runComp(fundCompareList)">
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
            <!-- // 반복 목록 단위 -->
            <li>
                <div class="bullets">
                    <span class="bullet red">매우높은위험</span>
                    <span class="bullet gray">해외주식형</span>
                    <span class="bullet bgRed">고난도</span>
                    <span class="bullet purple">베스트</span>
                    <button type="button" title="즐겨찾기"></button>
                </div>
                <a href="javascript:;" @click="$router.push({ name: 'fundView' })">
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
                <div class="bullets">
                    <span class="bullet yellow">다소높은위험</span>
                    <span class="bullet gray">해외주식형</span>
                    <button type="button" title="즐겨찾기"></button>
                </div>
                <a href="javascript:;" @click="$router.push({ name: 'fundView' })">
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
                <div class="bullets">
                    <span class="bullet blue">보통위험</span>
                    <span class="bullet gray">해외주식형</span>
                    <button type="button" title="즐겨찾기"></button>
                </div>
                <a href="javascript:;" @click="$router.push({ name: 'fundView' })">
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
        </ul>
    </section>
</div>
<component :is="componentsInfo.compName"
    :options="componentsInfo.compOption"
    @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import reSelect from '@/components/global/reSelect.vue'
import fundSearchSetting from '@/components/products/modalFundSearchSetting.vue' // 상세검색 설정
import fundCompareList from '@/components/products/modalFundCompare-list.vue' // 헤더 > 비교 버튼 > 펀드비교 목록
const $checkButton = inject('$checkButton')
const $resetInput = inject('$resetInput')
const $router = useRouter()

const typeSelect = [
    { listName: '1개월 수익률', listValue: '01' },
    { listName: '3개월 수익률', listValue: '02' },
    { listName: '6개월 수익률', listValue: '03' },
    { listName: '1년 수익률', listValue: '04' },
    { listName: '3년 수익률', listValue: '05' }
]

// 페이지 기초데이터
const pageInfo = reactive({
    listType: '' // ''(전체) / yield(수익률) / setting(설정액) / IRP(IRP수익률)
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
    if(comps === reSelect) {
        componentsInfo.compOption = {
            title: '수익률 선택',
            selected: '높은위험',
            listData: typeSelect,
            returned: directInput
        }
    }
}
// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        closeComponent()
        if(comps === reSelect) {
            closeComponent()
        }
    } else {
        closeComponent()
    }
}

</script>
<style lang="postcss" scoped>
div.listSort {
    margin-top: 8px;
}
</style>