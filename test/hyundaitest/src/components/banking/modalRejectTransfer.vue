<template>
    <div id="modalArea" role="dialog">
        <div data-name="blockTrans">
            <div class="contentsArea">
                <p>입력하신 정보는 안전한 금융거래를 위한 확인절차가 필요합니다.이체 불가하오니, 양해 바랍니다. </p>
            </div>
            <div class="buttonArea"
                data-buttonLength="">
                <button type="button" class="pointBlue h50"
                    @click="returnVal()"
                        >확인</button>
            </div>
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
    emit('runEmits', false)
    $modalEnd('modalArea')
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    #modalArea{
        /* 거래차단팝업 */
        & > div[data-name="blockTrans"]{
            padding-bottom: 94px;
            & p {
                    margin:0;
                    font-size:1.142rem; line-height: 24px;
                }
        }
    }
</style>