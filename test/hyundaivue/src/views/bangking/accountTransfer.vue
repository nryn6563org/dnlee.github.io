<template>
    <router-view id="accTransfer"
        :transInfo="transInfo"
        @runEmits="returnTransAccInfo">
    </router-view>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import 'v-calendar/dist/style.css'
const props = defineProps(['baseInfo'])
const $router = useRouter()
const $route = useRoute()
const transInfo = reactive({
    isAppUse: props.baseInfo.isAppUse,
    userName: props.baseInfo.userName,
    userCelphone: props.baseInfo.userCelphone,
    isConnectCall: props.baseInfo.isConnectCall,
    isConnectPhoneBook: props.baseInfo.isConnectPhoneBook,
    bankCode: '', // 은행코드
    bankAccNumber: '', // 계좌번호
    bankAccTypeCode: '', // 계좌 종류명 - 추후 common.js에서 타입명 및 타입코드 변경예정 현재 03만 연금계좌로 테스트중
    availableCode: '', // 계좌오류코드 - 정상 00으로 작업 / 01 - 우편물 반송 계좌 / 02 - 이체거래 제한(12개월 미사용)
    isDesignated: true, // 입금미지정계좌여부
    isLoanAcc: false, // 대출계좌 여부
    isContract: true, // 약정계좌 여부
    isDelayTrans: false, // 지연이체 계좌일 시
    retainedAmount: 0, // 잔고 - 표기용
    possibleAmount: 0, // 출금가능 금액
    isPassed: false,
    sendAccInfo: new Array(0),
    // sendAccInfo: [{
    //     ownerName: '', // 계좌주명
    //     bankCode: '', // 송부은행코드
    //     bankAccNumber: '', // 계좌번호
    //     bankAccName: '', // 계좌명칭
    //     sendPrice: '', // 송부금액
    //     isPhoneNumber: false, // 휴대폰으로 전송인지 여부
    //     isSaved: false, // 자주찾는계좌여부
    //     isQuick: false, // 퀵지정 여부
    //     senderText: '', //  내 통장 표시
    //     reciverText: '', // 받는 분통장 표시
    //     feePrice: '' // 수수료
    // }], // 이체계좌 정보
    resultInfo: { // 이체결과정보
        totalFeePrice: 0,
        resultCode: '',
        useLoan: '', // 대출금
        balance: '', // 잔금
        isReserve: false, // 예약이체 여부
        reserveDate: '', // 예약일
        reserveTime: '', // 예약시간 am / pm
        messengerType: 'sms' // 메세지 전송 타입
    }
})
const resetDate = () => {
    transInfo.bankCode = ''
    transInfo.bankAccNumber = ''
    transInfo.bankAccTypeCode = ''
    transInfo.availableCode = ''
    transInfo.isDesignated = true
    transInfo.isLoanAcc = false
    transInfo.isContract = true
    transInfo.isDelayTrans = false
    transInfo.retainedAmount = 0
    transInfo.possibleAmount = 0
    transInfo.isPassed = false
    transInfo.sendAccInfo = new Array(0)
    transInfo.resultInfo.totalFeePrice = 0
    transInfo.resultInfo.resultCode = ''
    transInfo.resultInfo.useLoan = ''
    transInfo.resultInfo.balance = ''
    transInfo.resultInfo.isReserve = false
    transInfo.resultInfo.reserveDate = ''
    transInfo.resultInfo.reserveTime = ''
    transInfo.resultInfo.messengerType = 'sms'
}
const returnTransAccInfo = (returnVals) => {
    if(returnVals) {
        if($route.name === 'accountTransferMain') {
            // 단건계좌이체 - 내 계좌, 송부계좌선택
            transInfo.bankCode = returnVals.bankCode
            transInfo.bankAccNumber = returnVals.bankAccNumber
            transInfo.bankAccTypeCode = returnVals.bankAccTypeCode
            transInfo.availableCode = returnVals.availableCode
            transInfo.retainedAmount = returnVals.retainedAmount
            transInfo.isDelayTrans = returnVals.isDelayTrans
            transInfo.isPassed = returnVals.isPassed
            transInfo.sendAccInfo = returnVals.sendAccInfo
            $router.push({ name: 'accountTransferEnter' })
        } else if($route.name === 'accountTransferEnter') {
            // 단건계좌이체 - 이체금액입력
            transInfo.isLoanAcc = returnVals.isLoanAcc // 대출계좌 여부
            transInfo.possibleAmount = returnVals.possibleAmount // 출금가능 금액
            transInfo.sendAccInfo[0].sendPrice = returnVals.sendPrice // 송부금액
            transInfo.sendAccInfo[0].senderText = '' // 내 통장 표시
            transInfo.sendAccInfo[0].reciverText = '' //  받는 분통장 표시
            if(transInfo.bankCode === '263') {
                $router.push({ name: 'accountTransferConfirm' })
            } else {
                $router.push({ name: 'accountOpenTransferConfirm' })
            }
        } else if($route.name === 'accountTransferConfirm') {
            // 단건계좌이체 - 이체정보 확인
            transInfo.resultInfo.resultCode = returnVals.resultCode
            transInfo.resultInfo.useLoan = returnVals.useLoan
            transInfo.resultInfo.balance = returnVals.balance
            transInfo.resultInfo.isReserve = returnVals.isReserve
            transInfo.resultInfo.reserveDate = returnVals.reserveDate
            transInfo.resultInfo.reserveTime = returnVals.reserveTime
            transInfo.sendAccInfo[0].feePrice = returnVals.feePrice
            transInfo.resultInfo.messengerType = returnVals.messengerType
            transInfo.sendAccInfo[0].reciverText = returnVals.reciverText
            transInfo.sendAccInfo[0].senderText = returnVals.senderText
            $router.push({ name: 'accountTransferResult' })
        } else if($route.name === 'accountOpenTransferConfirm') {
            // 단건오픈뱅킹계좌이체 - 이체정보 확인
            transInfo.resultInfo.resultCode = returnVals.resultCode
            transInfo.sendAccInfo[0].feePrice = returnVals.feePrice
            transInfo.resultInfo.balance = returnVals.balance
            transInfo.resultInfo.messengerType = returnVals.messengerType
            transInfo.sendAccInfo[0].reciverText = returnVals.reciverText
            transInfo.sendAccInfo[0].senderText = returnVals.senderText
            $router.push({ name: 'accountOpenTransferResult' })
        } else if($route.name === 'accountMultiTransferMain') {
            // 다계좌이체 - 내 계좌, 송부계좌 선택 및 금액확인
            if(typeof (returnVals) !== 'boolean') {
                transInfo.bankCode = returnVals.bankCode
                transInfo.bankAccNumber = returnVals.bankAccNumber
                transInfo.bankAccName = returnVals.bankAccName
                transInfo.retainedAmount = returnVals.retainedAmount
                transInfo.totalRetained = returnVals.totalRetained
                transInfo.isPassed = returnVals.isPassed
                transInfo.selectAccType = returnVals.selectAccType
                transInfo.bankAccTypeCode = returnVals.bankAccTypeCode
                transInfo.availableCode = returnVals.availableCode
                transInfo.isDesignated = returnVals.isDesignated
                transInfo.isDelayTrans = returnVals.isDelayTrans
                transInfo.sendAccInfo = returnVals.sendAccInfo
                $router.push({ name: 'accountMultiTransferEnter' })
            } else {
                $router.push({ name: 'accountMultiTransferConfirm' })
            }
        } else if($route.name === 'accountMultiTransferEnter') {
            // 다계좌이체 - 금액입력
            const reData = new Array(0)
            for(const i in returnVals) {
                reData[i] = {}
                reData[i].ownerName = returnVals[i].ownerName
                reData[i].bankCode = returnVals[i].bankCode
                reData[i].bankAccNumber = returnVals[i].bankAccNumber
                reData[i].bankAccName = returnVals[i].bankAccName
                reData[i].sendPrice = returnVals[i].sendPrice
                reData[i].isPhoneNumber = returnVals[i].isPhoneNumber
                reData[i].isSaved = returnVals[i].isSaved
                reData[i].isQuick = returnVals[i].isQuick
                reData[i].senderText = returnVals[i].senderText
                reData[i].reciverText = returnVals[i].reciverText
            }
            transInfo.sendAccInfo = reData
            $router.push({ name: 'accountMultiTransferMain' })
        } else if($route.name === 'accountMultiTransferConfirm') {
            // 다계좌이체 - 이체정보 확인
            transInfo.resultInfo.resultCode = returnVals.resultInfo.resultCode
            transInfo.resultInfo.useLoan = returnVals.resultInfo.useLoan
            transInfo.resultInfo.balance = returnVals.resultInfo.balance
            transInfo.resultInfo.totalFeePrice = returnVals.resultInfo.totalFeePrice
            transInfo.sendAccInfo = returnVals.sendAccInfo
            $router.push({ name: 'accountMultiTransferResult' })
        }
    } else {
        if($route.name === 'accountTransferEnter' || $route.name === 'accountTransferConfirm' || $route.name === 'accountTransferResult' ||
            $route.name === 'accountOpenTransferConfirm' || $route.name === 'accountOpenTransferResult' ||
            $route.name === 'accountOpenTransferConfirm' || $route.name === 'accountOpenTransferResult') {
            resetDate()
            $router.push({ name: 'accountTransferMain' })
        } else if($route.name === 'accountMultiTransferEnter' || $route.name === 'accountMultiTransferConfirm' || $route.name === 'accountMultiTransferResult') {
            resetDate()
            $router.push({ name: 'accountMultiTransferMain' })
        }
    }
}
</script>