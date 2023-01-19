<template>
    <div id="modalArea" class="fullPopup">
        <!-- 펀드투자 유의사항 -->
        <div class="contentsArea">
            <ul class="listType01">
                <li>고객님께서 선택하신 상품은 자본시장과 금융투자업에 관한 법률에 의하여 수탁회사(자산보관회사)에 안전하게 보관/관리되고 있습니다.</li>
                <li>이 금융상품은 예금자보호법에 따라 예금보험공사가 보호하지 않습니다.</li>
                <li>실적배당형 상품으로서 원본의 손실이 발생할 수 있으며, 과거의 운용실적이 미래의 운용성과를 보장하는 것은 아닙니다.</li>
                <li>펀드가입을 결정하시기 전에 펀드의 목적 투자전략, 위험 등에 관한 정보를 포함하고 있는 투자설명서를 반드시 읽어보시기 바랍니다. </li>
                <li>가입하신 상품의 결산일에 발생한 이익금에 대하여 자동으로 재투자 됩니다. 단, 상품의 특성에 따라 이익분배금이 현금으로 지급될 수 있습니다. </li>
                <li>
                    펀드에 대한 상담이 필요하신 경우 금융센터 (1588-6655)또는 영업점으로 문의하여 주시기바랍니다.
                    <a href="tel:1588-6655" class="fontPointBlue">스마트금융센터 전화연결</a>
                </li>
            </ul>
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
        & a {
            display: inline-block;
            padding: 0 32px 0 12px; margin: 6px 0 0;
            border: 1px solid rgba(210, 210, 210, 1); border-radius: 6px;
            background: rgba(245, 245, 245, 1)url('@/assets/images/global/arrow_right_gray.png') no-repeat right 12px  center / 6px auto ;
            line-height: 30px;
            text-decoration: none; word-break: keep-all;
        }
    }
</style>