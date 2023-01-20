<!-- 지연이체 안내 팝업 -->
<template>
        <div id="modalArea" role="dialog">
        <div>
            <div class="contentsArea">
                <p>
                    지연이체 대상건입니다.
                </p>

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
