<template>
    <section id="returnFunds">
        <div class="tabStyle04 h38 shadow">
            <ul data-tabList="2">
                <li :class="{'on' : pageInfo.listType === 'reg'}">
                    <a href="javascript:;" @click="pageInfo.listType = 'reg'">
                        자금반환청구
                    </a>
                </li>
                <li :class="{'on' : pageInfo.listType === 'result'}">
                    <a href="javascript:;" @click="pageInfo.listType = 'result'">
                        신청결과조회
                    </a>
                </li>
            </ul>
        </div>
        <div class="controlArea gray">
            <div class="tab">
                <label for="month01">
                    <input type="radio" id="month01" name="selectMonth" value="1"
                        v-model="pageInfo.sortBy.rangeMonth">
                    <div>1개월</div>
                </label>
                <label for="month02">
                    <input type="radio" id="month02" name="selectMonth" value="3"
                        v-model="pageInfo.sortBy.rangeMonth">
                    <div>3개월</div>
                </label>
                <label for="month03">
                    <input type="radio" id="month03" name="selectMonth" value="6"
                        v-model="pageInfo.sortBy.rangeMonth">
                    <div>6개월</div>
                </label>
                <label for="month04">
                    <input type="radio" id="month04" name="selectMonth"  value=""
                        v-model="pageInfo.sortBy.rangeMonth">
                    <div>직접입력</div>
                </label>
            </div>
            <div class="cal" v-if="pageInfo.sortBy.rangeMonth === ''">
                <label for="fromDate">
                    <input id="fromDate" type="text" class="h50" readonly
                        :value="$dateToCommas(pageInfo.sortBy.fromDate)"
                        @click="runComp(regDate, 'fromDate')">
                    <button @click="runComp(datePicker, 'fromDate')"></button>
                </label>
                <span>~</span>
                <label for="toDate">
                    <input id="toDate" type="text" class="h50" readonly
                        :value="$dateToCommas(pageInfo.sortBy.toDate)"
                        @click="runComp(regDate, 'toDate')">
                    <button @click="runComp(datePicker, 'toDate')"></button>
                </label>
            </div>
        </div>
        <template v-if="pageInfo.listType === 'reg'">
            <ul class="noList" v-if="pageInfo.regList.length === 0">
                <li>
                    <p>등록된 이체 건이 없습니다.</p>
                    <div></div>
                </li>
            </ul>
            <template v-else>
                <template v-for="(transList, index) in pageInfo.regList" :key="index">
                    <h5>{{ transList.transferDate }}</h5>
                    <ul class="productList">
                        <li v-for="(transInfo, index) in transList.transferInfo" :key="index">
                            <ol class="simpleBox dist8">
                                <li class="titleBlock">
                                    <span class="font12">{{ transInfo.timeStemp.substring(11) }}</span>
                                    <a href="javascript:;" class="inArrow blue"
                                        @click="runComp(modalRegReturnFund, transInfo)">자금반환신청</a>
                                </li>
                                <li>
                                    <span>출금</span>
                                    <p>
                                        {{ transInfo.ownerName }}
                                        {{ $codeToBank(transInfo.bankCode).korName }}
                                        {{ transInfo.bankAccNumber }}
                                    </p>
                                </li>
                                <li>
                                    <span>입금</span>
                                    <p>
                                        {{ transInfo.transOwnerName }}
                                        {{ $codeToBank(transInfo.transBankCode).korName }}
                                        {{
                                            transInfo.transBankCode === '263' ?
                                            $hmsecToDash(transInfo.transBankAccNumber) : transInfo.transBankAccNumber
                                        }}
                                    </p>
                                </li>
                                <li>
                                    <span>이체금액</span>
                                    <h1>{{ $priceToCommas(transInfo.transPrice) }}원</h1>
                                </li>
                            </ol>
                        </li>
                    </ul>
                </template>
            </template>
        </template>
        <template v-else>
            <ul class="noList" v-if="pageInfo.resultList.length === 0">
                <li v-if="pageInfo.resultList.length === 0">
                    <p>등록된 신청 건이 없습니다.</p>
                    <div></div>
                </li>
            </ul>
            <template v-else>
                <template v-for="(resultInfo, index) in pageInfo.resultList" :key="index">
                <h5>{{ resultInfo.transferDate }}</h5>
                    <ul class="productList">
                        <li v-for="(transInfo, index) in resultInfo.transferInfo" :key="index">
                            <ol class="simpleBox dist8">
                                <li class="titleBlock">
                                    <span class="font12">{{ transInfo.timeStemp.substring(11) }}</span>
                                    <a href="javascript:;" class="inArrow"
                                        :class="[ transInfo.resultInfo.resultCode === '02' ? 'red' : 'blue' ]"
                                        @click="runComp(modalReturnFundResult, transInfo)">
                                        {{
                                            transInfo.resultInfo.resultCode === '00' ? '반환완료' :
                                            transInfo.resultInfo.resultCode === '01' ? '반환진행중' : '반환출금거절'
                                        }}
                                    </a>
                                </li>
                                <li>
                                    <span>출금</span>
                                    <p>
                                        {{ transInfo.ownerName }}
                                        {{ $codeToBank(transInfo.bankCode).korName }}
                                        {{ transInfo.bankAccNumber }}
                                    </p>
                                </li>
                                <li>
                                    <span>입금</span>
                                    <p>
                                        {{ transInfo.transOwnerName }}
                                        {{ $codeToBank(transInfo.transBankCode).korName }}
                                        {{
                                            transInfo.transBankCode === '263' ?
                                            $hmsecToDash(transInfo.transBankAccNumber) : transInfo.transBankAccNumber
                                        }}
                                    </p>
                                </li>
                                <li>
                                    <span>이체금액</span>
                                    <h1>{{ $priceToCommas(transInfo.transPrice) }}원</h1>
                                </li>
                            </ol>
                        </li>
                    </ul>
                </template>
            </template>
        </template>
    </section>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>

<script setup>
import { inject, reactive, watch, markRaw } from 'vue'
import regDate from '@/components/global/regDate.vue'
import datePicker from '@/components/global/datePicker.vue'
import modalRegReturnFund from '@/components/banking/modalRegReturnFund.vue'
import modalReturnFundResult from '@/components/banking/modalReturnFundResult.vue'
import modalRetunResultErr from '@/components/banking/modalRetunResultErr.vue'
const $dateToCommas = inject('$dateToCommas')
const $priceToCommas = inject('$priceToCommas')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $runAlert = inject('$runAlert')
const $axios = inject('$axios')
const returnFundsListAPI = '/json/banking/returnFundsList.json'
const returnFundsResultListAPI = '/json/banking/returnFundsResultList.json'
const retunFundProcessAPI = '/json/banking/retunFundProcess.json'
const props = defineProps(['baseInfo'])

// 기초 페이지 정보
const pageInfo = reactive({
    listType: 'reg', // reg(자금반환청구 목록) / result(신청결과 조회)
    regList: new Array(0),
    resultList: new Array(0),
    sortBy: {
        toDate: new Date(),
        fromDate: new Date(),
        rangeMonth: 1
    }
})


// 개월 변경 선택시 마다 조회 기간 변경
watch(() => pageInfo.sortBy.rangeMonth, () => {
    if(pageInfo.sortBy.rangeMonth !== '') {
        const moveDate = new Date(JSON.parse(JSON.stringify(pageInfo.sortBy.toDate)))
        pageInfo.sortBy.fromDate = new Date(moveDate.setMonth(moveDate.getMonth() - Number(pageInfo.sortBy.rangeMonth)))
    } else {
        pageInfo.sortBy.toDate = new Date()
        pageInfo.sortBy.fromDate = new Date()
    }
})

watch(() => pageInfo.listType, () => {
    pageInfo.sortBy.rangeMonth = 1
    if(pageInfo.sortBy.rangeMonth === 'reg') {
        getRegList()
    } else {
        getResultList()
    }
})

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
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
    if(comps === modalRegReturnFund) {
        componentsInfo.compOption = {
            transCode: directInput.transCode,
            timeStemp: directInput.timeStemp,
            bankCode: directInput.bankCode,
            ownerName: directInput.ownerName,
            bankAccNumber: directInput.bankAccNumber,
            transPrice: directInput.transPrice,
            transBankCode: directInput.transBankCode,
            transOwnerName: directInput.transOwnerName,
            transBankAccNumber: directInput.transBankAccNumber
        }
    } else if(comps === regDate || comps === datePicker) {
        const options = []
        if(directInput === 'toDate') {
            options.checkedDate = pageInfo.sortBy.toDate
            options.target = directInput
            options.minDate = pageInfo.sortBy.fromDate
        } else {
            options.checkedDate = pageInfo.sortBy.fromDate
            options.target = directInput
            options.maxDate = pageInfo.sortBy.toDate
        }
        componentsInfo.compOption = options
    } else if(comps === modalRetunResultErr) {
        componentsInfo.compOption = directInput
    } else if(comps === modalReturnFundResult) {
        componentsInfo.compOption = directInput
    }
}
// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === modalRegReturnFund) {
            // 반환청구 api 호출 후 결과값 반환
            // 전달 값 returnVals 하위
            // └ reasonCode : 사유 코드 / 01(계좌입력오류) / 02(금액입력오류) / 03(이중입금) / 04(고객 반환의사 표시로 재청구)
            // └ regDate : 신청일자 기준 팝업 시작 new Date()로 처리
            // └ regPrice : 신청금액
            // └ returnBankAccNumber: 환불 계좌 번호
            // └ returnBankCode: 환불 계좌 은행코드
            // └ returnPriceType: 금액 구분 / all(전액) / custom (부분) - 실제 미사용으로 추측
            // └ transCode: 원거래 코드
            $axios.get(retunFundProcessAPI, {})
                .then(function(res) {
                    if(res.data.affective === 200) {
                        // 등록성공
                        closeComponent(true)
                        $runAlert({ msg: '자금반환 신청이 정상 접수되었습니다.<br><span>반환기간은 접수일로부터 최대 30일입니다.</span>' })
                    } else if(res.data.affective === 202) {
                        // 등록실패
                        // 리턴 에러코드 (임시)
                        // 01(1년 초과 거래 내역) / 02(자금반환 거절 건 - 거절일자 30일 초과)
                        // 03(자금반환 거절 건 - 거절일자 30일 이하) / 04(반환 거절건) / 05(반환처리 완료)
                        closeComponent(true)
                        runComp(modalRetunResultErr, res.data.resultInfo)
                    } else {
                        // 기타 오류
                    }
                })
                .catch(function(err) {
                    console.log(err)
                    closeComponent()
                })
        } else if(comps === regDate || comps === datePicker) {
            const directInput = componentsInfo.compOption.target
            if(directInput === 'toDate') {
                pageInfo.sortBy.toDate = returnVals
            } else {
                pageInfo.sortBy.fromDate = returnVals
            }
            closeComponent()
        } else if(comps === modalRetunResultErr) {
            // 에러케이스 03일 시 재 신청 케이스
            // 재 신청 진행 프로세스 필요
            closeComponent()
        } else {
            closeComponent()
        }
    } else {
        closeComponent()
    }
}

const getResultList = () => {
    $axios.get(returnFundsResultListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.resultList = res.data.transList
            }
        })
        .catch(function(err) {
            // API에러
            console.log(err)
        })
}

const getRegList = () => {
    $axios.get(returnFundsListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.regList = res.data.transList
            }
        })
        .catch(function(err) {
            // API에러
            console.log(err)
        })
}
// 최초 1회 실횅
getRegList() // 자금반환청구 목록
// getResultList() // 신청결과 목록
</script>

<style lang="postcss" scoped>
#returnFunds { height: calc(100% - 160px); min-height: calc(100% - 160px); }
.productList > li { padding-bottom: 18px !important; }
.titleBlock { padding-bottom: 4px; }
.cal { margin-top: 10px; }
</style>

