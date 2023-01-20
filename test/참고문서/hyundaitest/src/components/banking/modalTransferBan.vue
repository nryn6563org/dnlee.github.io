<!-- 이체거래제한 -->
<template>
    <!-- 레이아웃 잡을 시 class on 추가 -->
    <div id="modalArea" role="dialog">
        <!-- 레이아웃 잡을 시 class on 추가 -->
        <div class="bottomSheet">
            <!-- 제목열 -->
            <h1>
                이체 거래 제한
                <button type="button" class="modalClose"
                    @click="doClose()">
                </button>
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <p>최근 12개월 이상 온라인 접속기록이 없는 경우 장기미사용 계좌로 분류되어 타행이체 거래가 제한됩니다. 거래 제한 해제 후 이용해주세요.</p>
            </div>
            <!-- 버튼 영역 -->
            <!-- 버튼의 경우 data-buttonLength="n" 2~5개까지 균등 분배 -->
            <div class="buttonArea"
                data-buttonLength="">
                <!-- 안심거래서비스 > 이체제한 해지 메뉴로 이동 -->
                <button type="button" class="pointBlue h50"
                    >거래 제한 해제</button>
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

const doClose = () => {
    $modalEnd('modalArea')
    emit('runEmits', false)
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
