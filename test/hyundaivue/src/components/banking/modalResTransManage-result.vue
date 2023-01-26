<!-- 풀팝업 예약이체 확인 -->
<template>
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>이체결과</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div class="contentsArea">
            <!-- 타이틀 -->
            <div class="centerTitle">
                <h2 class="resultPass">
                    <strong>{{transInfo.sendAccInfo.ownerName}}</strong>에게<br>
                    <strong>{{ $priceToCommas(transInfo.sendAccInfo.sendPrice) }}원</strong>을 보냈습니다.
                </h2>
            </div>
            <!-- 이체정보내용-->
            <ol class="roundBox">
                <li>
                    <span>출금</span>
                    <strong>{{$codeToBank(transInfo.sendAccInfo.sendBankCode).korName}} {{transInfo.sendAccInfo.sendBankAccNumber}}</strong>
                </li>
                <li>
                    <span>입금</span>
                    <strong>{{$codeToBank(transInfo.sendAccInfo.receiveBankCode).korName}} {{transInfo.sendAccInfo.receiveBankAccNumber}}</strong>
                </li>
                <li>
                    <span>수수료</span>
                    <strong>{{transInfo.sendAccInfo.feePrice}}원</strong>
                </li>
            </ol>
            <ol class="simpleBox dist18">
                <!-- 예약일시 : 예약이체건일때만 노출 -->
                <li>
                    <span>예약일시</span>
                    <strong>{{transInfo.sendAccInfo.reserveDate}} {{transInfo.sendAccInfo.reserveTime}}</strong>
                </li>
                <hr>
                <!-- 받는분 표시정보 -->
                <li>
                    <span>받는 분에게 표시</span>
                    <strong>{{transInfo.sendAccInfo.reciverText}}</strong>
                </li>
                <!-- 내통장 표시정보 -->
                <li>
                    <span>내 통장에 표시</span>
                    <strong>{{transInfo.sendAccInfo.senderText}}</strong>
                </li>
                <hr>
            </ol>
        </div>
        <!-- 확인버튼-->
        <div class="buttonArea">
            <button type="button" class="lightBlue h50"
            @click="runComp(regAccPassword)">이체 취소하기</button>
            <button type="button" class="h50 pointBlue"
            @click="returnVal(true)">확인</button>
        </div>
        <component :is="componentsInfo.compName"
            :options="componentsInfo.compOptions"
            @runEmits="closeComp"/>
    </div>
</template>
<script setup>
import { inject, reactive, onMounted, markRaw } from 'vue'
import regAccPassword from '@/components/banking/regAccPassword.vue'

const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $axios = inject('$axios')
const $priceToCommas = inject('$priceToCommas')
const $codeToBank = inject('$codeToBank')
const $runAlert = inject('$runAlert')
const reserveTransAPI = '/json/banking/myReserveTransView.json'
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])

const transInfo = reactive({
    sendAccInfo:
        {
            ownerName: '', // 입금계좌주명
            receiveBankCode: '', // 입금은행코드
            receiveBankAccNumber: '', // 입금계좌번호
            sendBankCode: '', // 출금 은행코드
            sendBankAccNumber: '', // 출금 계좌번호
            reserveDate: '', // 예약일
            reserveTime: '', // 예약시간 am / pm
            senderText: '', //  받는 분통장 표시
            reciverText: '', // 내 통장 표시
            feePrice: 0, // 수수료
            sendPrice: 100000
        }

})

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOptions: null
})

// 컴포넌트 초기화
const closeComponent = (nowRun) => {
    if(!nowRun) {
        setTimeout(() => {
            componentsInfo.compName = null
            componentsInfo.compOptions = null
        }, 600)
    } else {
        componentsInfo.compName = null
        componentsInfo.compOptions = null
    }
}
// 컴포넌트 시작
const runComp = (comps) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === regAccPassword) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOptions = {
            bankCode: props.bankCode,
            bankAccNumber: props.bankAccNumber
        }
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === regAccPassword) {
            doSend()
        }
    } else {
        closeComponent()
    }
}

const doSend = () => {
    $axios.get('/json/postTest.json', {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 메세지 성공 시나리오
                $runAlert({ msg: '정상적으로 취소 되었습니다.' })
            } else {
                $runAlert({ msg: '메세지 전송에 실패하였습니다..' })
            }
            $modalEnd('modalArea')
            emit('runEmits', false)
        })
        .catch(function(err) {
            // 에러상황
            console.log(err)
        })
}

// 예약이체 상세정보 호출
const getResTransInfo = () => {
    $axios.get(reserveTransAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                transInfo.sendAccInfo = res.data.sendAccInfo[0]
            }
        })
}
getResTransInfo()

const returnVal = (vals) => {
    const returnValue = vals || false
    emit('runEmits', returnValue)
    $modalEnd('modalArea')
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
.roundBox {
    margin: 0 0 18px;
}
.buttonArea {
    flex-wrap: wrap;
    & > button {
        width: 100%;
        & + button { margin-top: 12px; margin-left: 0; }
    }
}
</style>