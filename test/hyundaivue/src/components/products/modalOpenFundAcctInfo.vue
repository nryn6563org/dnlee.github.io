<template>
    <!-- 펀드 계좌개설 안내 -->
    <div id="modalArea" role="dialog">
        <div class="bottomSheet">
            <h1>
                펀드 계좌개설 안내
                <button type="button" class="modalClose"
                    @click="returnVal()">
                </button>
            </h1>
            <div class="contentsArea">
                펀드거래 가능한 계좌가 없습니다.<br><br>
                펀드거래를 위해서는 금융상품 계좌개설이 필요합니다. <br><br>
                금융상품 계좌개설을 하시겠습니까?
            </div>
            <div class="buttonArea" data-buttonLength="2">
                <button type="button" class="white h50 w100"
                    @click="returnVal(true)"
                    >취소</button>
                <button type="button" class="pointBlue h50"
                    @click="returnVal(true)"
                    >금융상품 계좌개설</button>
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

onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
div.buttonArea[data-buttonLength="2"] {
    display: flex;
    & button{
        &.w100 {width:100px;}
        &.pointBlue {flex: 1;}
    }
}
</style>
