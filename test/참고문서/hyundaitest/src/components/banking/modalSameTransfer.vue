<template>
    <!-- 레이아웃 잡을 시 class on 추가 -->
    <div id="modalArea" role="dialog">
        <!-- 레이아웃 잡을 시 class on 추가 -->
        <div class="bottomSheet">
            <!-- 제목열 -->
            <h1>
                중복이체여부 확인
                <button type="button" class="modalClose"
                    @click="returnVal()">
                </button>
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <p>
                    당일 동일 계좌로 동일한 금액의 이체거래가 있습니다. 중복이체는 아닌지 다시 한번 확인하여 수시기 바랍니다.<br>이체거래를 계속 진행하시겠어요?
                </p>
            </div>
            <!-- 버튼 영역 -->
            <!-- 버튼의 경우 data-buttonLength="n" 2~5개까지 균등 분배 -->
            <div class="buttonArea"
                data-buttonLength="2">
                <button type="button" class="white h50 w100"
                    @click="returnVal(false)"
                    >취소</button>
                <button type="button" class="pointBlue h50"
                    @click="returnVal(true)"
                    >이체하기</button>
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
    emit('runEmits', vals)
    $modalEnd('modalArea')
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    #modalArea {
        & div.bottomSheet > h1 {margin-bottom: 27px;}
        & .contentsArea {
            & p {
                margin: 0;
                line-height: 24px;
            }
        }
        & div.buttonArea[data-buttonLength="2"] {
            display: flex;
            & button{
                &.w100 {width:100px;}
                &.pointBlue {flex: 1;}
            }
        }
    }
</style>
