<template>
    <div id="modalArea" role="dialog" class="on">
        <div class="on">
            <div class="contentsArea">
                <p>
                    연금계좌인출 금액을 확인하셨나요?
                </p>
            </div>
            <div class="buttonArea"
                data-buttonLength="1">
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
    #modalArea {
        & > div { padding-bottom: 98px;}
        & .contentsArea {
            & p {
                margin: 0;
                font-size: 1.14rem; line-height: 24px;
            }
        }
    }
</style>
