<template>
<div>
    <!-- IRP ELB 매수 완료 -->
    <section>
        <div class="titleInStep">
            <h1>
                매수신청이<br>
                완료되었습니다.
            </h1>
        </div>
        <ul class="productList dropDown">
            <li>
                <a href="javascript:;">
                    <h1>{{props.pageInfo.itemList.itemName}}</h1>
                    <p class="fontPointBlue">매수신청</p>
                </a>
                <ol class="squareBox">
                    <li>
                        <span>매수신청금액</span>
                        <p>{{$priceToCommas(props.pageInfo.itemList.reserveAmount)}}</p>
                    </li>
                    <li>
                        <span>신청일</span>
                        <p>{{props.pageInfo.itemList.buyDate}}</p>
                    </li>
                    <li>
                        <span>만기일</span>
                        <p>{{props.pageInfo.itemList.maturityDate}}</p>
                    </li>
                </ol>
            </li>
        </ul>
        <p>
            ※ 주문 취소는 매수신청 당일 낮 12시(정오)까지 가능합니다.
        </p>
        <p>
            ※ 주문 취소는 ‘IRP 거래내역/취소’ 화면에서 취소가능 시간 내 가능합니다.
        </p>
    </section>
    <div class="bottomBtnArea">
        <!-- 성공 (예약현황, 확인 노출) , 오류 (확인 노출) -->
        <button typw="button" class="h50 white"
            @click="$router.push({ name: 'tradingIRPHistory' })">IRP 거래내역/취소</button>
        <button typw="button" class="h50 pointBlue"
            @click="$router.push({ name: 'reserveELB', params: { type: 'status' } })">확인</button>
    </div>
</div>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const $dateToCommas = inject('$dateToCommas')
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['pageInfo'])
const pageInfo = reactive({
    buyIRPList: [
        {
            isVisible: true,
            bankCode: '263', // 내계좌 기관코드
            bankAccNumber: '12365456556', // 계좌번호
            itemName: '상품명 미래에셋증권ELB_예약용(8/13)', // 상품명
            possibleAmount: '25000000', // 주문가능금액
            reserveAmount: '500000', // 예약신청금액
            buyAmount: '500000', // 매수금액
            buyDate: '2022.08.05', // 신청일
            maturityDate: '2024.06.31' // 만기날짜
        },
        {
            isVisible: false,
            bankCode: '263', // 내계좌 기관코드
            bankAccNumber: '12365456556', // 계좌번호
            itemName: '상품명 미래에셋증권ELB_예약용(8/13)', // 상품명
            possibleAmount: '25000000', // 주문가능금액
            reserveAmount: '500000', // 예약신청금액
            buyAmount: '500000', // 매수금액
            buyDate: '2022.08.05', // 신청일
            maturityDate: '2024.06.31' // 만기날짜
        }
    ]
})
</script>
<style lang="postcss" scoped>
section > p {
    margin: 0 20px 8px;
    color: rgba(112, 120, 132, 1);
}
.productList {
    margin-bottom:24px ;
    border-top: 1px solid rgba(215, 215, 215, 1); border-bottom: 1px solid rgba(215, 215, 215, 1);
    & a::after { display: none;}
}
</style>