<template>
<div>
    <div class="productSearch gray">
        <div class="cal range">
            <label for="fromData">
                <input id="fromDate" type="text" readonly
                    :value="$dateToCommas(pageInfo.fromDate)"
                    @click="runComp(regDate, 'fromDate')">
                <button @click="runComp(datePicker, 'fromDate')"></button>
            </label>
            <span>~</span>
            <label for="toData">
                <input id="toDate" type="text" readonly
                    :value="$dateToCommas(pageInfo.toDate)"
                    @click="runComp(regDate, 'toDate')">
                <button @click="runComp(datePicker, 'toDate')"></button>
            </label>
        </div>
        <div>
            <button type="button" class="select"
                @click="runComp(reSelect)">전체</button>
            <button type="button" class="select">신청일 최신순</button>
        </div>
        <p>※ 취소는 주문접수 당일에만 처리 가능합니다.</p>
    </div>
    <ul class="productList">
        <!-- 거래내역 목록 : 당일 거래건 한해 매매취소 가능 -->
        <li v-for="(list, index) in pageInfo.tradeList"  :key="index">
            <h1 class="fontBlue">매도</h1>
            <ol class="simpleBox">
                <li>
                    <span>처리상태</span>
                    <strong>접수</strong>
                </li>
                <li>
                    <span>신청일</span>
                    <strong>2022.08.11</strong>
                </li>
                <li>
                    <span>결제(예정)일</span>
                    <strong>2022.08.11</strong>
                </li>
            </ol>
            <div class="innerBtnBox">
                <button type="button"
                @click="runComp(popupIRPDetailView)">상세보기</button>
                <!-- 당일거래건 일경우만 노출 -->
                <button type="button"
                    @click="$router.push({ name: 'cancelIRPConfirm' })">매매 취소</button>
            </div>
        </li>
        <li>
            <h1 class="fontRed">매수</h1>
            <ol class="simpleBox">
                <li>
                    <span>처리상태</span>
                    <strong>접수</strong>
                </li>
                <li>
                    <span>신청일</span>
                    <strong>2022.08.11</strong>
                </li>
                <li>
                    <span>결제(예정)일</span>
                    <strong>2022.08.11</strong>
                </li>
            </ol>
            <div class="innerBtnBox">
                <button type="button"
                @click="runComp(popupIRPDetailView)">상세보기</button>
            </div>
        </li>
        <li>
            <h1>교체매매</h1>
            <ol class="simpleBox">
                <li>
                    <span>처리상태</span>
                    <strong>접수</strong>
                </li>
                <li>
                    <span>신청일</span>
                    <strong>2022.08.11</strong>
                </li>
                <li>
                    <span>결제(예정)일</span>
                    <strong>2022.08.11</strong>
                </li>
            </ol>
            <div class="innerBtnBox">
                <button type="button"
                @click="runComp(popupIRPDetailView)">상세보기</button>
            </div>
        </li>
    </ul>
</div>
<component :is="componentsInfo.compName"
    :options="componentsInfo.compOption"
    @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import regDate from '@/components/global/regDate.vue'
import datePicker from '@/components/global/datePicker.vue'
import reSelect from '@/components/global/reSelect.vue'
import popupIRPDetailView from '@/components/products/popupTradingIRP-detailView.vue' // 팝업 거래내역 상세페이지
import { keyBy } from 'lodash'
const props = defineProps(['pageInfo'])
const $dateToCommas = inject('$dateToCommas')
const pageInfo = reactive({
    viewType: '',
    fromDate: new Date(),
    toDate: new Date(),
    fundList: [
        { isComplete: false },
        { isComplete: true },
        { isComplete: false }
    ],
    typeSelect: [ // 셀렉트 박스관련
        { listName: '전체', listValue: '01' },
        { listName: '매수', listValue: '02' },
        { listName: '매도', listValue: '03' },
        { listName: '교체매매', listValue: '04' },
        { listName: '연금지급매도', listValue: '05' },
        { listName: '수수료매도', listValue: '06' }
    ],
    tradeList: [
        {
            tradeType: '매도', // 거래타입 : 매도, 매수, 교체매매
            status: '2', // 접수01, 처리완료02, 결제완료03
            applyDate: new Date(), // 신청일
            payDate: new Date() // 결제(예정)일
        }
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
    if(comps === regDate || comps === datePicker) {
        const options = []
        if(directInput === 'toDate') {
            options.checkedDate = pageInfo.toDate
            options.target = directInput
            options.minDate = pageInfo.fromDate
        } else {
            options.checkedDate = pageInfo.fromDate
            options.target = directInput
            options.maxDate = pageInfo.toDate
        }
        componentsInfo.compOption = options
    } else if(comps === reSelect) {
        componentsInfo.compOption = {
            title: '신청 구분',
            selected: '전체',
            listData: pageInfo.typeSelect,
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
.productSearch {
    & > div.cal {
        padding: 0;
    }
    & > div > button {
        flex: 1;
        & ~ button { margin-left: 12px;}
    }
    & > p {
        margin: 6px 0 0;
        font-size: 0.857rem; color: rgba(112, 120, 132, 1);
    }
}
.productList > li {
    & > h1 {
        margin: 0 0 12px;
        font-size: 1.142rem; font-weight: 500;
    }
    &:last-child { padding-bottom: 40px;}
}
</style>