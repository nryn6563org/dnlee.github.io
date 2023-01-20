<template>
    <!-- 펀드 매도 정보입력 -->
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>펀드 알리미 설정</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div id="fundNote" class="contentsArea">
            <ul class="optionsList">
                <li>
                    <p>만기안내</p>
                    <label for="endAlert">
                        <input type="checkbox" id="endAlert"
                            v-model="pageInfo.endAlert">
                        <div class="switch"></div>
                    </label>
                </li>
                <li>
                    <p>환매시 결정금액</p>
                    <label for="decisionPrice">
                        <input type="checkbox" id="decisionPrice"
                            v-model="pageInfo.decisionPrice">
                        <div class="switch"></div>
                    </label>
                </li>
                <li>
                    <p>수익률 알림</p>
                    <label for="earn">
                        <input type="checkbox" id="earn"
                            v-model="pageInfo.isEarn">
                        <div class="switch"></div>
                    </label>
                    <template v-if="pageInfo.isEarn">
                        <div class="innerBtnBox">
                            <label for="monthly">
                                <input type="radio" id="monthly" name="earn">
                                <div class="check">매월 초</div>
                            </label>
                            <label for="weekly">
                                <input type="radio" id="weekly" name="earn">
                                <div class="check">매주 초</div>
                            </label>
                        </div>
                    </template>
                </li>
                <li>
                    <p>수익률 감시</p>
                    <label for="watch">
                        <input type="checkbox" id="watch"
                            v-model="pageInfo.isWatch">
                        <div class="switch"></div>
                    </label>
                    <template v-if="pageInfo.isWatch">
                        <!-- checked 일때 노출 -->
                        <div class="txtArea">
                            <p>상한 수익률</p>
                            <label>
                                <strong>+</strong>
                                <input type="text" placeholder="입력하세요"
                                    inputmode="none" readonly
                                    @click="runComp(regPrice)">
                                <span>이상</span>
                            </label>
                        </div>
                        <div class="txtArea">
                            <p>하한 수익률</p>
                            <label>
                                <strong>-</strong>
                                <input type="text" placeholder="입력하세요"
                                    inputmode="none" readonly
                                    @click="runComp(regPrice)">
                                <span>이하</span>
                            </label>
                        </div>
                    </template>
                </li>
            </ul>
            <div class="emptydiv" :class="{ 'on' : componentsInfo.compName === regPrice }"></div>
        </div>
        <div class="buttonArea div3_7">
            <button type="button" class="h50 white"
                @click="returnVal(true)">취소</button>
            <button type="button" class="h50 pointBlue"
                @click="returnVal(true)">저장</button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { reactive, inject, onMounted, markRaw } from 'vue'
import regPrice from '@/components/banking/regPrice.vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const emit = defineEmits(['runEmits'])
let focusElement = HTMLElement

// 퍼포먼스 확인용
const pageInfo = reactive({
    endAlert: true,
    decisionPrice: false,
    isEarn: true,
    isWatch: true
})

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
const closeComponent = (nowRun) => {
    if(!nowRun) {
        setTimeout(() => {
            componentsInfo.compName = null
            componentsInfo.compOption = null
        }, 600)
    } else {
        componentsInfo.compName = null
        componentsInfo.compOption = null
    }
}
// 컴포넌트 실행
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === regPrice) {
        focusElement = document.activeElement
        focusElement.classList.add('on')
        const moveTop = focusElement.getBoundingClientRect().top - 240
        setTimeout(() => {
            document.getElementById('fundNote').scrollBy({
                top: moveTop,
                left: 0,
                behavior: 'smooth'
            })
            document.getElementById('fundNote').style.overflow = 'hidden'
        }, 100)
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === regPrice) {
            focusElement.classList.remove('on')
            document.getElementById('fundNote').style.overflow = 'auto'
            closeComponent()
        }
    } else {
        closeComponent()
    }
}

const returnVal = (vals) => {
    emit('runEmits', vals)
    $modalEnd('modalArea')
}

onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
/* 옵션형 목록 */
ul.optionsList {
    margin: 20px 0 4px;
}
.innerBtnBox {
    height: 40px;
}

</style>