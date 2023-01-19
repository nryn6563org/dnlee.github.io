<template>
    <router-view id="reserveELBView"
        :pageInfo="pageInfo"
        @runEmits="returnTransAccInfo">
    </router-view>
</template>
<script setup>
import { inject, reactive } from 'vue'
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
        reserveFromDate: '', // 예약가능 시작날짜
        reserveToDate: '', // 예약가능 종료날짜
        buyDate: '', // 매수 날짜
        buyFromTime: '', // 매수 시작 시간
        buyToTime: '', // 매수 종료 시간
        interestRate: '', // 금리
        maturityDate: '', // 만기날짜
        transferLimit: '', // 예약가능 한도
        buyAmount: '', // 매수신청금액,
        isComplete: true // 처리여부
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
                pageInfo.itemList.reserveFromDate = selectData.reserveFromDate
                pageInfo.itemList.reserveToDate = selectData.reserveToDate
                pageInfo.itemList.buyDate = selectData.buyDate
                pageInfo.itemList.buyFromTime = selectData.buyFromTime
                pageInfo.itemList.buyToTime = selectData.buyToTime
                pageInfo.itemList.interestRate = selectData.interestRate
                pageInfo.itemList.maturityDate = selectData.maturityDate
                pageInfo.itemList.transferLimit = selectData.transferLimit
                pageInfo.itemList.buyAmount = selectData.buyAmount
                pageInfo.itemList.isComplete = selectData.isComplete
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
preRun()
</script>