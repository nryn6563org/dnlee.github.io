<template>
<div>
    <!-- IRP ELB 예약 취소확인 -->
    <section>
        <div class="titleInStep">
            <h1>
                예약신청을<br>
                취소 하시겠습니까?
            </h1>
        </div>
        <ul class="productList dropDown">
            <li>
                <a href="javascript:;">
                    <h1>{{props.pageInfo.itemList.itemName}}</h1>
                </a>
                <ol class="squareBox">
                    <li>
                        <span>매수(예정)일</span>
                        <p>{{props.pageInfo.itemList.buyDate}}</p>
                    </li>
                    <li>
                        <span>금리</span>
                        <p>{{props.pageInfo.itemList.interestRate}}%</p>
                    </li>
                    <li>
                        <span>만기</span>
                        <p>{{props.pageInfo.itemList.maturityDate}}</p>
                    </li>
                    <li>
                        <span>예약신청금액</span>
                        <p>{{$priceToCommas(props.pageInfo.itemList.buyAmount)}}원</p>
                    </li>
                </ol>
            </li>
        </ul>
    </section>
    <div class="bottomBtnArea align01">
        <button typw="button" class="h50 white"
            @click="$router.push({ name: 'reserveELB', params: { type: 'status' } })">이전</button>
        <button typw="button" class="h50 pointBlue"
            @click="$router.push({ name: 'cancelELBResult' })">확인</button>
    </div>
</div>
</template>
<script setup>
import { inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const $dateToCommas = inject('$dateToCommas')
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['pageInfo'])
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