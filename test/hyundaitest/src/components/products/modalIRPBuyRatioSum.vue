<template>
    <!-- 위험자산 투자비율안내 -->
    <div id="modalArea" role="dialog">
        <div>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <p>매수비율 합계는 100%가 되어야 합니다.</p>
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
}
div.buttonArea { left: 0;}
</style>