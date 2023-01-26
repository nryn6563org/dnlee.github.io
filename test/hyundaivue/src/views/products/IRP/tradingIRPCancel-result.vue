<template>
<div>
    <section>
        <div class="titleInStep">
            <h1>
                주문취소가<br>
                완료되었습니다.
            </h1>
        </div>
        <ul class="productList">
            <!-- 반복리스트 : 오류메세지 li.err -->
            <li>
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    <span class="fontPointBlue">매도 취소 완료</span>
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    <span class="fontPointBlue">교체매매 취소 완료</span>
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
        <button type="button" class="h50 pointBlue"
            @click="$router.push({ name: 'tradingIRPHistory' })">확인</button>
    </div>
</div>
</template>
<script setup>
import { inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const emit = defineEmits(['runEmits'])
const props = defineProps(['transInfo'])

const pageInfo = reactive({
    pageList: [
        {
            isVisible: true,
            tradeType: '', // 거래유형 매도, 매수, 교체매매
            itemName: '', // 상품명
            isComplete: false // 처리여부 완료 오류
        },
        {
            isVisible: false,
            tradeType: '', // 거래유형 매도, 매수, 교체매매
            itemName: '', // 상품명
            isComplete: false // 처리여부 완료 오류
        }
    ]
})
</script>
<style lang="postcss" scoped>
.productList {
    padding-bottom: 24px;
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