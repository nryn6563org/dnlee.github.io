<template>
    <!-- 추천상품 선정기준 -->
    <div id="modalArea" class="fullPopup">
        <div class="contentsArea">
            <!-- 타이틀 -->
            <h2>매 분기 선정위원회가 내부기준에 따라 선정</h2>
            <p>매 분기 거시경제 상황에 따라 Top-Down 방식으로 유망지역과 섹터를 선정, 동종 유형 펀드의 기간별 수익률/변동성/설정액 등을 종합적으로 고려하여 추천펀드를 최종 선정</p>
            <ul class="listType01 gray">
                <li class="title">※ 알려드립니다.</li>
                <li>본 자료는 정보제공을 목적으로 합니다.</li>
                <li>투자자는 금융투자상품에 대하여 증권사로부터 충분한 설명을 받을 권리가  있으며, 투자 전 (간이)투자설명서 및 집합투자규약을 반드시 읽어보시기 바랍니다.</li>
                <li>집합투자증권은 예금자보호법에 따라 예금보험공사가 보호하지 않습니다.</li>
                <li>집합투자증권은 자산가격 변동, 환율 변동, 신용등급 하락 등에 따라 투자원금의 손실(0~100%)이 발생할 수 있으며, 그 손실은 투자자에게 귀속됩니다.</li>
                <li>증권거래비용, 기타비용이 추가로 발생할 수 있습니다.</li>
                <li>과거의 운용실적이 미래의 수익률을 보장하는 것은 아닙니다.</li>
                <li>종류형 펀드의 경우, 종류별 집합투자증권에 부과되는 보수·수수료 차이로 운용실적이 달라질 수 있습니다.</li>
                <li>MMF는 시가와 장부가의 차이가 ±0.5%를 초과하거나 초과할 우려가 있는 경우 시가로 전환됩니다.</li>
                <li>하이일드 채권/레버리지형은 투자원금 손실이 크게 발생할 수 있습니다.</li>
                <li>레버리지 펀드(2배, 인버스, 인버스 2배)의 기간 수익률은 추종하는 기초자산(지수)의 일간 수익률과 차이가 발생할 수 있습니다.</li>
                <li>과세기준 및 과세방법은 향후 세법개정 등에 따라 변동될 수 있습니다.</li>
            </ul>
            <span>현대차증권 준법감시인 심사필 제00-0000호<br>(2022.01.01~2022.12.31)</span>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'

const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    const returnValue = vals || false
    emit('runEmits', returnValue)
    $modalEnd('modalArea')
}

onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    div.fullPopup {
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
    }
</style>