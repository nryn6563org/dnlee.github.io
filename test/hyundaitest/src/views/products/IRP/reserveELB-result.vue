<template>
<div>
    <!-- IRP ELB 예약 완료 -->
    <section>
        <div class="titleInStep">
            <h1>
                예약신청이<br>
                완료되었습니다.
            </h1>
        </div>
        <ul class="productList dropDown">
            <!-- 성공 / 오류 :  성공 - 예약정보 리스트 노출 / 오류 - 오류 리스트 노출  -->
            <li v-if="props.pageInfo.itemList.isComplete">
                <a href="javascript:;">
                    <h1>{{props.pageInfo.itemList.itemName}}</h1>
                </a>
                <ol class="squareBox">
                    <li>
                        <span>계좌번호</span>
                        <strong>{{props.pageInfo.bankAccNumber}}</strong>
                    </li>
                    <li>
                        <span>매수(예정)일시</span>
                        <strong>{{props.pageInfo.itemList.buyDate}} 오전 {{props.pageInfo.itemList.buyFromTime}}~{{props.pageInfo.itemList.buyToTime}}</strong>
                    </li>
                    <li>
                        <span>금리</span>
                        <strong>연 {{props.pageInfo.itemList.interestRate}}%</strong>
                    </li>
                    <li>
                        <span>만기</span>
                        <strong>{{props.pageInfo.itemList.maturityDate}}</strong>
                    </li>
                    <li>
                        <span>예약가능 한도</span>
                        <strong>{{$priceToCommas(props.pageInfo.itemList.transferLimit)}}원</strong>
                    </li>
                </ol>
            </li>
            <!-- 오류 -->
            <li v-else-if="!props.pageInfo.itemList.isComplete">
                <a href="javascript:;">
                    <h1>{{props.pageInfo.itemList.itemName}}</h1>
                    <p class="fontRed">오류메시지 출력</p>
                </a>
            </li>
        </ul>
        <p>
            ※ ELB 예약신청은 상품매수의 효력이 없습니다. 반드시 매수당일 간이/투자설명서를 확인 후 매수 하시기 바랍니다.
        </p>
    </section>
    <div class="bottomBtnArea">
        <!-- 처리성공: 버튼 예약현황/확인 , 오류: 확인버튼만 -->
        <button typw="button" class="h50 white"
            v-if="props.pageInfo.itemList.isComplete"
            @click="$router.push({ name: 'reserveELB', params: { type: 'status' } })">예약현황</button>
        <button typw="button" class="h50 pointBlue"
            @click="$router.push({ name: 'reserveELB', params: { type: 'status' } })">확인</button>
    </div>
</div>
</template>
<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const $dateToCommas = inject('$dateToCommas')
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['pageInfo'])
// console.log(props.pageInfo.itemList)
</script>
<style lang="postcss" scoped>
section > p {
    margin: 0 20px 44px;
    color: rgba(112, 120, 132, 1);
}
.productList {
    margin-bottom:24px ;
    border-top: 1px solid rgba(215, 215, 215, 1); border-bottom: 1px solid rgba(215, 215, 215, 1);
    & a::after { display: none;}
}
</style>