<template>
    <div id="modalArea" class="fullPopup">
        <!-- 투자자 확인사항 -->
        <div class="contentsArea">
            <h2>투자자 체크리스트</h2>
            <ul class="listType01">
                <li>펀드의 명칭 및 종류가 무엇인지 숙지함</li>
                <li>펀드의 운용개념 및 방법에 대한 설명서를 읽음</li>
                <li>펀드 투자시 <span class="fontRed">투자원금이 보장되지 않는다는 사실 등 투자위험에 대한 내용을 숙지함</span></li>
                <li>펀드의 환매방법, 환매제한, 환매수수료, 환매매수수료 부과 기간 및 환매연기에 대하여 숙지함</li>
                <li>투자자 또는 펀드가 부담하는 각종 보수, 수수료, 비용 및 투자소득의 과세, 판매회사가 투자자에게 지속적으로 제공하는 서비스에 관한 내용에 대하여 숙지함</li>
                <li>투자자가 확인사항에 대한 <span class="fontRed">충분한 이해없이 확인했다고 동의할 경우, 추후 분쟁 시 투자자에게 불리하게 적용</span>될 수 잇음</li>
            </ul>
            <h2>해외투자 금융상품인 경우</h2>
            <ul class="listType01">
                <li>금융상품 투자에 따른 일반적인 위험(가격변동위험, 투자기업의 부도위험, 금리변동위험)외에 환율변동 위험이 있다는 사실과 해당 금융상품의 환위험 해지 여부 및 목표 환해지 비율에 대하여 숙지함</li>
                <li>투자대상 국가 또는 지역별 투자비율에 대하여 숙지함</li>
            </ul>
        </div>
        <div class="buttonArea" data-buttonLength="1">
            <button type="button" class="pointBlue h50"  @click="returnVal(true)">확인</button>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'

const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

// 최종 실행 시 return 함수
const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    const returnValue = vals || false
    emit('runEmits', returnValue)
    $modalEnd('modalArea')
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    div.fullPopup {
        & > div:not(.buttonArea) { padding-bottom: 47px;}
        & h2 {
            margin:0 0 12px;
             font-size: 1.142rem;
        }
        & ul + h2 { margin-top: 32px;}
        & span { font-weight: 500;}
    }
</style>