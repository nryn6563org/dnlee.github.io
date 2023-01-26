<template>
<div>
    <!-- IRP 만기현황/만기예약매수 -->
    <section>
        <!-- 계좌선택 -->
        <div class="selectMyAcc">
            <button type="button" class="select"
                @click="runComp(selectMyAccListInTypes)">
                {{ $codeToBank(pageInfo.bankCode).korName  + ' ' + $hmsecToDash(pageInfo.bankAccNumber) }}
            </button>
            <!-- 비밀번호 저장, 비밀번호 유효검토 완료 후 class에 'passed' 추가 -->
            <button type="button" :class="[pageInfo.isPassed ? 'passed' : '']"
                @click="runComp(regAccPassword)"></button>
        </div>
        <!-- 날짜선택 -->
        <div class="bgLightGray">
            <div class="cal">
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
        </div>
        <!-- 목록 -->
        <ul class="productList">
            <li v-for="(item, index) in pageInfo.itemList" :key="index">
                <a href="javascript:;">
                    <!-- <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁</h1> -->
                    <h1>{{item.itemName}}</h1>
                </a>
                <ol class="simpleBox">
                    <li>
                        <span>평가금액</span>
                        <span>{{$priceToCommas(item.marketValue)}}원</span>
                    </li>
                    <li>
                        <span>만기예정일</span>
                        <span>{{item.maturityDate}}</span>
                    </li>
                    <li v-if="item.itemType == '01'">
                        <span>현재 예약매수방법</span>
                        <span>동일상품</span>
                    </li>
                </ol>
                <div class="innerBtnBox" v-if="item.itemType == '01'">
                    <button type="button" :value="item.itemCode"
                        @click="actReserve($event)"
                    >예약매수 변경</button>
                </div>
            </li>
        </ul>
    </section>
</div>
<component :is="componentsInfo.compName"
    :options="componentsInfo.compOption"
    @runEmits="closeComp"/>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import regDate from '@/components/global/regDate.vue'
import datePicker from '@/components/global/datePicker.vue'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue' // 계좌선택
import regAccPassword from '@/components/banking/regAccPassword.vue' // 비밀번호 입력
const $axios = inject('$axios')
const $router = useRouter()
const $route = useRoute()
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $dateToCommas = inject('$dateToCommas')
const $priceToCommas = inject('$priceToCommas')
const expiryIRPListAPI = '/json/products/expiryIRPList.json'

const pageInfo = reactive({
    viewType: '',
    fromDate: new Date(),
    toDate: new Date(),
    bankCode: '',
    bankAccNumber: '',
    isPassed: false, // 비밀번호 입력확인 여부
    itemList: [
        {
            // itemCode: '', // 상품코드
            // itemType: '', // 상품유형 예금 01, 실적배당형 02, RP 03, ELS 04
            // itemName: '', // 상품명
            // buyDate: '', // 매수일
            // marketValue: 0, // 평가금액
            // maturityDate: '', // 만기(예정)일
            // interestRate: '' // 적용금리
        }
    ]
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
// 컴포넌트 실행
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === selectMyAccListInTypes) {
        componentsInfo.compOption = {
            useAll: false,
            bankingType: 'hmsec',
            bankCode: pageInfo.bankCode,
            bankAccNumber: pageInfo.bankAccNumber
        }
    } else if(comps === regAccPassword) {
        componentsInfo.compOption = {
            bankCode: '263',
            bankAccNumber: '111'
        }
    } else if(comps === regDate || comps === datePicker) {
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
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        // closeComponent()
        if(comps === selectMyAccListInTypes) {
            pageInfo.bankCode = returnVals.bankCode
            pageInfo.bankAccNumber = returnVals.bankAccNumber
            pageInfo.isPassed = returnVals.isPassed
            if(!pageInfo.isPassed) {
                runComp(regAccPassword)
            } else {
                closeComponent()
            }
        } else if (comps === regAccPassword) {
            // closeComponent()
            if(returnVals) {
                pageInfo.isPassed = returnVals.isPassed // 비밀번호 입력 성공 여부
                // 패스워드 자동 저장체크
                if(returnVals.isPasswordSave) {
                    console.log('저장함수 호출')
                } else {
                    closeComponent()
                }
            } else {
                closeComponent()
                pageInfo.isPassed = false
            }
        }
    } else {
        closeComponent()
    }
}
// 페이지이동
const actReserve = (ev) => {
    const codeValue = ev.target.value
    $router.push({ name: 'expiryReserveIRPBuy', params: { itemCode: codeValue } })
}
const preRun = () => {
    $axios.get(expiryIRPListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.itemList = res.data.irpList
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
preRun()
</script>
<style lang="postcss" scoped>
ul.productList:not(.noList) > li > a > h1 {
    padding: 0 30px 0 0;
    background: url('@/assets/images/global/arrow_right_s18.png') no-repeat right top 2px / 18px auto ;
}
.selectMyAcc { padding: 12px 20px 16px;}
.bgLightGray {
    padding: 16px 20px;
}
</style>