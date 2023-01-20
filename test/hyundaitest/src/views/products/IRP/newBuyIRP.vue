<template>
<div>
    <section>
        <div class="titleInStep">
            <h1>
                상품가입이<br>
                완료되었습니다.
            </h1>
        </div>
        <ul class="productList">
            <!-- 반복리스트 : 오류메세지 li.err -->
            <li>
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    <span class="fontPointBlue">가입신청</span>
                    <p>가입일 <span>2022.08.12</span></p>
                </a>
            </li>
            <li class="err">
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    <span>오류메시지 출력</span>
                </a>
            </li>
        </ul>
    </section>
    <div class="bottomBtnArea">
        <button type="button" class="h50 white"
            @click="$router.push({ name: 'reserveELB' })">IRP 거래내역/취소</button>
            <!-- IRP상품매매 > 매수 > 매수비율입력 단계로 이동 -->
        <button type="button" class="h50 pointBlue"
            @click="$router.push({ name: 'tradingIRPBuy', params: { buyType: 'buy' }}), selectTabMenu('buy')">확인</button>
    </div>
</div>
</template>
<script setup>
import { inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const $dateToCommas = inject('$dateToCommas')
const pageInfo = reactive({
    pageList: [
        {
            isVisible: true,
            itemName: '', // 상품명
            status: '', // 처리여부 가입신청완료, 오류
            applyDate: new Date() // 가입일
        }
    ]
})
</script>
<style lang="postcss" scoped>
section { padding: 0 0 24px;}
.productList {
    border-top: 1px solid rgba(229, 229, 229, 1);
    & > li {
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        & + li { border-top: none;}
        /* 에러 */
        &.err {
            & > a > span { color: var(--red);}
        }
        & > a {
            & > span {
                display: block;
                margin-top: 12px;
            }
            & p {
                margin-top: 5px;
                color: rgba(140, 140, 140, 1);
                & span {
                    float: right;
                }
            }
        }
    }
}
</style>