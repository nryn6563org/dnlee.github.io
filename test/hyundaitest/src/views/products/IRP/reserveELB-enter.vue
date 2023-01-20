<template>
<div>
    <!-- IRP ELB 예약 -  금액입력 포커스이동 확인 필요-->
    <section id="reserveELB">
        <div class="titleInStep">
            <h1>
                예약금액을<br>
                입력해주세요.
            </h1>
        </div>
        <!-- 계좌선택 -->
        <div class="selectMyAcc">
            <button class="white select" type="button"
                @click="runComp(selectMyAccListInTypes)">
                {{ $codeToBank(pageInfo.bankCode).korName  + ' ' + $hmsecToDash(pageInfo.bankAccNumber) }}
            </button>
            <!-- 비밀번호 저장, 비밀번호 유효검토 완료 후 class에 'passed' 추가 -->
            <button type="button" :class="[pageInfo.isPassed ? 'passed' : '']"
                @click="runComp(regAccPassword)"></button>
        </div>
        <hr>
        <ul class="roundBox">
            <li>
                <strong>{{props.pageInfo.itemList.itemName}}</strong>
            </li>
            <hr>
            <li>
                <span>예약가능기간</span>
                <p>{{props.pageInfo.itemList.reserveFromDate}}~{{props.pageInfo.itemList.reserveToDate}}</p>
            </li>
            <li>
                <span>매수(예정)일시</span>
                <p>{{props.pageInfo.itemList.buyDate}} {{props.pageInfo.itemList.buyFromTime}}~{{props.pageInfo.itemList.buyToTime}}</p>
            </li>
            <li>
                <span>금리</span>
                <p>연 {{props.pageInfo.itemList.interestRate}}%</p>
            </li>
            <li>
                <span>만기</span>
                <p>{{props.pageInfo.itemList.maturityDate}}</p>
            </li>
            <li>
                <span>예약가능 한도</span>
                <p>{{$priceToCommas(props.pageInfo.itemList.transferLimit)}}원</p>
            </li>
        </ul>
        <div class="inputBox">
            <label class="price">
                <input type="text" class="h50" placeholder="예약신청금액 입력"
                    inputmode="none" readonly
                    @focus="runComp(regPrice)">
            </label>
            <p>10,000원 이상, 10,000원 단위로 예약</p>
        </div>
        <p>
            ※ ELB 예약신청은 상품매수의 효력이 없습니다. 반드시 매수당일 간이/투자설명서를 확인 후 매수 하시기 바랍니다.
        </p>
    </section>
    <!-- div3_7로 수정해야함 -->
    <div class="bottomBtnArea align01">
        <button typw="button" class="h50 white"
            @click="$router.push({ name: 'reserveELB', params: { type: 'reserve' }})">이전</button>
        <button typw="button" class="h50 pointBlue"
            @click="$router.push({ name: 'reserveELBResult' })">예약신청</button>
    </div>
    <div class="emptydiv" :class="{ 'on': componentsInfo.compName === regPrice }"></div>
</div>
<component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue' // 계좌선택
import regAccPassword from '@/components/banking/regAccPassword.vue' // 비밀번호 입력
import regPrice from '@/components/banking/regPrice.vue' // 금액입력
const $axios = inject('$axios')
const $route = useRoute()
const $router = useRouter()
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $dateToCommas = inject('$dateToCommas')
const $priceToCommas = inject('$priceToCommas')
const reserveELBListAPI = '/json/products/reserveELBList.json'
const props = defineProps(['pageInfo'])
let focusElement = HTMLElement
const pageInfo = reactive({
    bankCode: '263', // 은행코드
    bankAccNumber: props.pageInfo.bankAccNumber, // 계좌번호
    isPassed: true, //
    itemCode: props.pageInfo.itemList.itemCode, // 상품코드
    buyAmount: '' // 입력받은 매수신청금액
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
    } else if (comps === regPrice) {
        // 화면 포커스 이벤트
        focusElement = document.activeElement
        focusElement.classList.add('on')
        document.getElementById('reserveELB').style.overflow = 'hidden'
        const moveTop = focusElement.getBoundingClientRect().top - 200
        setTimeout(() => {
            document.getElementById('reserveELB').scrollBy({
                top: moveTop,
                left: 0,
                behavior: 'smooth'
            })
        }, 100)
        componentsInfo.compOption = { sendPrice: '' }
    } else if(comps === regAccPassword) {
        componentsInfo.compOption = {
            bankCode: '263',
            bankAccNumber: pageInfo.bankAccNumber
        }
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === selectMyAccListInTypes) {
            pageInfo.bankCode = returnVals.bankCode
            pageInfo.bankAccNumber = returnVals.bankAccNumber
            pageInfo.isPassed = returnVals.isPassed
            if(!pageInfo.isPassed) {
                runComp(regAccPassword)
            } else {
                closeComponent()
            }
        } else if (comps === regPrice) {
            document.getElementById('reserveELB').style.overflow = 'auto'
            if(focusElement.classList.contains('on')) focusElement.classList.remove('on')
            closeComponent()
        } else if (comps === regAccPassword) {
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
</script>
<style lang="postcss" scoped>
section > p {
    margin: 0 20px 44px;
    color: rgba(112, 120, 132, 1);
}
section > hr {
    margin: 32px 0 24px;
}
.selectMyAcc {
    padding: 0 20px;
}
.inputBox {
    margin: 28px 20px 24px; padding: 0 0 22px;
    border-bottom:1px solid rgba(215, 215, 215, 1);
    & p {
        margin: 8px 0 0;
        font-size: 0.857rem; color: rgba(173, 173, 173, 1);
    }
}
</style>