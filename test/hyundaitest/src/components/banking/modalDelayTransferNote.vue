<template>
    <!-- 지연이체 알림 팝업 -->
    <!-- 레이아웃 잡을 시 class on 추가 -->
    <div id="modalArea" role="dialog">
        <!-- 레이아웃 잡을 시 class on 추가 -->
        <div>
            <!-- 제목열 -->
            <h1>
                지연이체 알림
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <p>
                    이체출금 요청 <span class="fontUnderLn">100,000,000원</span>은<br>
                    <span class="fontUnderLn">오후(15:30)</span> 에 출금됩니다.
                    <br>
                    <br>
                    잔고 부족 시, 이체출금이 미처리 될 수 있으니 참고하여 주시기 바랍니다.
                </p>
            </div>
            <!-- 버튼 영역 -->
            <!-- 버튼의 경우 data-buttonLength="n" 2~5개까지 균등 분배 -->
            <div class="buttonArea"
                data-buttonLength="1">
                <!-- 뱅킹 > 이체관리 > 지연이체 출금메뉴로 이동 -->
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
        & h1 { margin-bottom: 24px;}
        & .contentsArea {
            & p {
                margin: 0;
                font-size: 1.14rem; line-height: 24px;
            }
        }
    }
</style>
