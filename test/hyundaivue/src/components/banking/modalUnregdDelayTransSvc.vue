<template>
    <!-- 미가입 지연이체서비스 -->
    <!-- 레이아웃 잡을 시 class on 추가 -->
    <div id="modalArea" role="dialog">
        <!-- 레이아웃 잡을 시 class on 추가 -->
        <div class="bottomSheet">
            <!-- 제목열 -->
            <h1>
                지연이체 서비스
                <button type="button" class="modalClose"
                    @click="returnVal()">
                </button>
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <h2>지연이체 서비스 <span class="fontRed">미등록계좌</span></h2>
                <ul class="listType01 gray">
                    <li>1일 100만원까지 보안매체 없이 즉시 이체가능합니다.</li>
                    <li>1인 1모바일 기기만 등록가능합니다.</li>
                    <li>기기변경 시 재등록 필요합니다.</li>
                </ul>
            </div>
            <!-- 버튼 영역 -->
            <!-- 버튼의 경우 data-buttonLength="n" 2~5개까지 균등 분배 -->
            <div class="buttonArea"
                data-buttonLength="1">
                <button type="button" class="pointBlue h50"
                    @click="returnVal(true)"
                    >지연이체 서비스 등록</button>
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
    .contentsArea {
        & h2 {
            margin: 0 0 24px; padding: 43px 0 0;
            background: url('@/assets/images/global/icon_phishing.png') no-repeat center top /42px auto ;
            font-size: 1.285rem; font-weight:400 ;
            text-align: center;
        }
        & ul {
            margin-bottom: 10px;
        }
    }
</style>