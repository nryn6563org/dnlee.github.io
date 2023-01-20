<template>
    <!-- 레이아웃 잡을 시 class on 추가 -->
    <div id="modalArea" role="dialog">
        <!-- 레이아웃 잡을 시 class on 추가 -->
        <div class="bottomSheet">
            <!-- 제목열 -->
            <h1>
                제목영역
                <button type="button" class="modalClose"
                    @click="returnVal()">
                </button>
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                컨텐츠 내용
            </div>
            <!-- 버튼 영역 -->
            <!-- 버튼의 경우 data-buttonLength="n" 2~5개까지 균등 분배 -->
            <div class="buttonArea"
                data-buttonLength="2">
                <button type="button" class="white"
                    @click="returnVal()"
                    >아니요</button>
                <button type="button" class="pointBlue"
                    @click="returnVal(true)"
                    >예</button>
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
