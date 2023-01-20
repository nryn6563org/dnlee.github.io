<template>
    <!-- 위험자산 투자비율안내 -->
    <div id="modalArea" role="dialog">
        <div>
            <h1>
                위험자산 투자비율
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <p>
                    관련법령에 따라 IRP 및 DC가입자는 전체 적립금의 70%까지만 위험자산에 투자가 가능합니다.
                    위험자산 투자한도 초과시 위험자산이 증가하는 신규 운용지시가 제한될수 있으니 참고하시기 바랍니다.
                </p>
                <span>※ 위험자산 : 주식형펀드, 주식혼합형 펀드</span>
            </div>
            <!-- 버튼 영역 -->
            <div class="buttonArea"
                data-buttonLength="1">
                <button type="button" class="pointBlue h50"
                    @click="returnVal(false)"
                    >확인</button>
            </div>
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

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
.contentsArea {
    & p {
        margin: 0;
        font-size: 1.142rem;
    }
    & span { margin: 8px 0 0;}
}
div.buttonArea { left: 0;}
</style>