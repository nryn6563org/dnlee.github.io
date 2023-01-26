<template>
    <router-view id="bankConnect"
        :transInfo="transInfo"
        @runEmits="returnTransAccInfo">
    </router-view>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps(['baseInfo'])
const $router = useRouter()
const $route = useRoute()

const transInfo = reactive({
    isAppUse: props.baseInfo.isAppUse,
    userName: props.baseInfo.userName,
    bankCode: '', // 은행코드
    bankAccNumber: '', // 계좌번호
    possibleAmount: 0, // 출금가능 금액
    reciveAccInfo: {
        ownerName: '', // 계좌주명
        bankCode: '', // 송부은행코드
        bankAccNumber: '', // 계좌번호
        possibleAmount: 0, // 출금가능 금액
        sendPrice: '' // 송부금액
    }, // 출금계좌 정보
    resultInfo: { // 이체결과정보
        resultCode: '',
        transDate: null
    }
})

const resetPage = () => {
    transInfo.bankCode = ''
    transInfo.bankAccNumber = ''
    transInfo.possibleAmount = 0
    transInfo.reciveAccInfo.ownerName = ''
    transInfo.reciveAccInfo.bankCode = ''
    transInfo.reciveAccInfo.bankAccNumber = ''
    transInfo.reciveAccInfo.possibleAmount = 0
    transInfo.reciveAccInfo.sendPrice = ''
    transInfo.reciveAccInfo.ownerName = ''
    transInfo.resultInfo.resultCode = ''
    transInfo.resultInfo.transDate = null
}

const returnTransAccInfo = (returnVals) => {
    if(returnVals) {
        if($route.name === 'transManageBankConnectMain') {
            transInfo.bankCode = returnVals.bankCode
            transInfo.bankAccNumber = returnVals.bankAccNumber
            transInfo.possibleAmount = returnVals.possibleAmount
            transInfo.reciveAccInfo.ownerName = returnVals.reciveAccInfo.ownerName
            transInfo.reciveAccInfo.bankCode = returnVals.reciveAccInfo.bankCode
            transInfo.reciveAccInfo.bankAccNumber = returnVals.reciveAccInfo.bankAccNumber
            transInfo.reciveAccInfo.possibleAmount = returnVals.reciveAccInfo.possibleAmount
            transInfo.reciveAccInfo.sendPrice = returnVals.reciveAccInfo.sendPrice
            $router.push({ name: 'transManageBankConnectConfirm' })
        } else if($route.name === 'transManageBankConnectConfirm') {
            transInfo.resultInfo.resultCode = returnVals.resultCode
            transInfo.resultInfo.transDate = returnVals.transDate
            $router.push({ name: 'transManageBankConnectResult' })
        }
    } else {
        // 초기화 컴포넌트
        resetPage()
        $router.push({ name: 'transManageBankConnectMain' })
    }
}

</script>