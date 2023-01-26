<template>
    <router-view id="openBankingBalance"
        :balanceInfo="balanceInfo"
        @runEmits="returnInfo">
    </router-view>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import 'v-calendar/dist/style.css'
const props = defineProps(['baseInfo'])
const $router = useRouter()
const $route = useRoute()
const balanceInfo = reactive({
    isAppUse: props.baseInfo.isAppUse,
    userName: props.baseInfo.userName,
    userCelphone: props.baseInfo.userCelphone,
    isConnectCall: props.baseInfo.isConnectCall,
    bankCode: '', // 은행코드
    bankAccNumber: '', // 계좌번호
    accList: new Array(0),
    // accList: [{
    //     bankCode: '', // 송부은행코드
    //     bankAccNumber: '', // 계좌번호
    //     transPrice: '', // 송부금액
    //     feePrice: '' // 수수료
    // }], // 이체계좌 정보
    resultInfo: { // 이체결과정보
        totalGetPrice: 0, // 총 입금 금액
        totalFeePrice: 0, // 총 수수료
        resultCode: '', // 결과 코드
        balance: '' // 잔금
    }
})

const returnInfo = (returnVals) => {
    if(returnVals !== false) {
        if($route.name === 'openBankingBalanceList') {
            balanceInfo.bankCode = returnVals.bankCode
            balanceInfo.bankAccNumber = returnVals.bankAccNumber
            balanceInfo.accList = returnVals.accList.filter(arr => arr.isChecked === true)
            $router.push({ name: 'openBankingBalanceConfirm' })
        } else if($route.name === 'openBankingBalanceConfirm') {
            balanceInfo.resultInfo.totalGetPrice = returnVals.totalGetPrice
            balanceInfo.resultInfo.totalFeePrice = returnVals.totalFeePrice
            balanceInfo.resultInfo.resultCode = returnVals.resultCode
            balanceInfo.resultInfo.balance = returnVals.balance
            balanceInfo.accList = returnVals.accList
            $router.push({ name: 'openBankingBalanceResult' })
        }
    } else {
        if($route.name === 'openBankingBalanceConfirm' || $route.name === 'openBankingBalanceResult') {
            $router.push({ name: 'openBankingBalanceList' })
        }
    }
}
</script>