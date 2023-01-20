<!--접근권한 설정-->
<template>
    <div id="modalArea" role="dialog">
        <template v-if="runPageData.step === 'info'">
            <div>
                <h1>
                    접근권한 설정안내
                    <button type="button" class="modalClose"
                        @click="returnVal()">
                    </button>
                </h1>
                <div class="contentsArea">
                    <ul class="listType01 gray">
                        <li>
                            휴대폰 연락처 등록된 주소록 읽기 권한을  허용하시겠습니까?
                        </li>
                        <li>
                            거부시 연락체 이체 서비스를 이용하실 수 없습니다.
                        </li>
                    </ul>
                </div>
                <div class="buttonArea"
                    data-buttonLength="2">
                    <button type="button" class="white h50"
                        @click="returnVal('refusal')"
                        >거부</button>
                    <button type="button" class="pointBlue h50"
                        >허용</button>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="contentsArea on">
                <p>휴대폰 연락처 접근 권한이 없어 연락처 이체 서비스를 이용하실 수 없습니다.</p>
                <div class="buttonArea"
                    data-buttonLength="1">
                    <button type="button" class="pointBlue h50"
                        @click="returnVal(true)"
                        >확인</button>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

// 최종 실행 시 return 함수
const emit = defineEmits(['runEmits'])

const runPageData = reactive({
    step: 'info' // 페이지 진행과정 info(안내) | result(결과)
})

const returnVal = (vals) => {
    if(vals === 'refusal') {
        runPageData.step = 'result'
    } else {
        $modalEnd('modalArea')
        runPageData.step = 'step'
        emit('runEmits', vals)
    }
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