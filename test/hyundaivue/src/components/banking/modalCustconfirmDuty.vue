<!-- 고객확인의무 팝업 -->
<template>
    <div id="modalArea" role="dialog">
        <div>
            <div class="contentsArea">
                <p>특정금융거래보고법 등 관련 법률에 따라 고객확인의무 등록 후 처리 가능합니다.</p>
            </div>
            <div class="buttonArea"
                data-buttonLength="1">
                <button type="button" class="pointBlue h50"
                    @click="returnVal(true)"
                    >확인</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'
// 모달 실행 모션 on 추가 함수
const $modalStart = inject('$modalStart')
// 모달 종료 모션 on 제거 함수
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
    div[role="dialog"] > div:not(.bottomSheet) {
        padding-bottom: 94px;
        & > h1 {margin-bottom: 24px;}
        & .contentsArea > p {
            margin: 0;
        }
    }
</style>