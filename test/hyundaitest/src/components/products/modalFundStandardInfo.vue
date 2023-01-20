<template>
    <!-- 추천상품 선정기준 -->
    <div id="modalArea" role="dialog">
        <div>
            <h1>추천상품 선정기준</h1>
            <div class="contentsArea">
                <!-- 타이틀 -->
                <p>추천상품은 매분기 거시 경제 상황에 따라 Top-Down 방식으로 유망지역과 섹터를 선정, 동종 유형 펀드의 기간별 수익률/변동성/설정액 등을 종합적으로 고려하여 선정합니다.</p>
                <span>현대차증권 준법감시인 심사필 제00-0000호<br>(2022.01.01~2022.12.31)</span>
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="returnVal()">
                    확인
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'

const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

const emit = defineEmits(['runEmits'])
const returnVal = () => {
    emit('runEmits', false)
    $modalEnd('modalArea')
}

onMounted(() => {
    $modalStart('modalArea', returnVal)
})
</script>
<style lang="postcss" scoped>
p { padding: 0; margin: 0 0 8px; }
span { padding: 0; margin: 0;}
    /* div.fullPopup {
        & > div:not(.buttonArea) {
            padding-bottom: 0;
            max-height: calc(100% - 24px);
            & > h2 {
                margin: 0 0 14px;
                line-height: 1; font-size:1.142rem ;
            }
            & > p {
                margin: 0;
                font-size:1rem ;
            }
            & > ul {
                margin: 24px 0 12px;
                & li.title {
                    padding: 0 0 4px;
                    font-size:1.142rem; font-weight: 700;
                    &::before { background: none;}
                }
            }
            & > span {
                display: block;
                text-align: right; line-height: 18px; font-size: 0.857rem; color:rgba(112, 120, 132, 1) ;
            }
        }
    } */
</style>