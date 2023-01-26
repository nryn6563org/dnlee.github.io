<template>
    <router-view id="accTransfer"
        :joinInfo="joinInfo"
        @runEmits="returnJoinInfo">
    </router-view>
</template>
<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()

const joinInfo = reactive({
    agreeService: false,
    agreePolicy: false,
    agreeBankingUse: false,
    userEmail: '',
    accInfo: new Array(0)
    // accInfo: [
    //     {
    //         bankCode: '', // 은행코드
    //         bankAccNumber: '', // 계좌번호
    //         bankAccName: '', // 계좌명칭
    //         resultCode: '' // 등록결과
    //     }
    // ]
})

const returnJoinInfo = (returnVals) => {
    if(returnVals !== false) {
        // 인포페이지
        if($route.name === 'openBankingJoinInfo') {
            $router.push({ name: 'openBankingJoinAgreeService' })
        } else if($route.name === 'openBankingJoinAgreeService') {
            joinInfo.agreeService = returnVals.isCheckedAll
            joinInfo.userEmail = returnVals.userEmail
            $router.push({ name: 'openBankingJoinReg' })
        } else if($route.name === 'openBankingJoinReg') {
            returnVals.forEach((arr) => {
                const newObj = []
                newObj.bankCode = arr.bankCode
                newObj.bankAccNumber = arr.bankAccNumber
                newObj.bankAccName = arr.bankAccName
                newObj.resultCode = arr.resultCode
                joinInfo.accInfo.push(newObj)
            })
            $router.push({ name: 'openBankingJoinAgreeBanking' })
        } else if($route.name === 'openBankingJoinAgreeBanking') {
            joinInfo.agreeBankingUse = true
            $router.push({ name: 'openBankingJoinResult' })
        } else {
            $router.push({ name: 'openBankingJoinInfo' })
        }
    } else {
        $router.push({ name: 'openBankingJoinInfo' })
    }
}
</script>