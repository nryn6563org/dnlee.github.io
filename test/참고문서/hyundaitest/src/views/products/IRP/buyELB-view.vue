<template>
    <router-view id="cancelELBView"
        :pageInfo="pageInfo"
        @runEmits="returnTransAccInfo">
    </router-view>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const $axios = inject('$axios')
const $router = useRouter()
const $route = useRoute()
const reserveELBListAPI = '/json/products/reserveELBList.json'
// 상품목록 구분자
const itemCode = $route.params.itemCode
const bankAccNumber = $route.params.bankAccNumber

const pageInfo = reactive({
    bankAccNumber: bankAccNumber,
    itemList: {
        itemCode: '', // 상품코드
        itemName: '', // 상품명
        buyDate: '', // 매수 날짜
        interestRate: '', // 금리
        maturityDate: '', // 만기날짜
        buyAmount: '', // 매수신청금액,
        reserveAmount: '', // 예약신청금액
        isComplete: true, // 처리여부
        possibleAmount: '' // 주문가능금액
    }
})
const preRun = () => {
    $axios.get(reserveELBListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 선택된 예약가능 상품 itemCode로 필터링
                const selectData = res.data.elbList.filter(arr => arr.itemCode === itemCode)[0]
                pageInfo.itemList.itemCode = selectData.itemCode
                pageInfo.itemList.itemName = selectData.itemName
                pageInfo.itemList.buyDate = selectData.buyDate
                pageInfo.itemList.interestRate = selectData.interestRate
                pageInfo.itemList.maturityDate = selectData.maturityDate
                pageInfo.itemList.transferLimit = selectData.transferLimit
                pageInfo.itemList.reserveAmount = selectData.reserveAmount
                pageInfo.itemList.isComplete = selectData.isComplete
                pageInfo.itemList.possibleAmount = selectData.possibleAmount
                console.log(pageInfo.itemList.itemCode)
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
preRun()
</script>