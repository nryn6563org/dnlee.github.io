<template>
    <!-- 중도해지안내 -->
    <div id="modalArea" role="dialog">
        <div class="bottomSheet">
            <!-- 제목열 -->
            <h1>
                예약 안내
                <button type="button" class="modalClose"
                    @click="returnVal(false)">
                </button>
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <p>
                    이미 예약 신청한 상품입니다.<br>
                    예약 현황을 확인해 주세요.
                </p>
            </div>
            <div class="buttonArea"
                data-buttonLength="1">
                <button type="button" class="pointBlue h50"
                    @click="returnVal(false)"
                    >예약현황</button>
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
    $modalEnd('modalArea')
    emit('runEmits', vals)
}
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
p {
    margin: 16px 0 0;
    font-size: 1.142rem;
}
</style>