<template>
    <!-- 펀드 추가매수 입력 -->
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>펀드 추가매수</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div class="contentsArea">
            <div class="titleInStep">
                <h1>
                    매수금액을<br>
                    입력해주세요
                </h1>
            </div>
            <!-- 계좌정보 -->
            <div class="selectMyAcc">
                <button type="button" class="select"
                    @click="runComp(selectMyAccListInTypes)">
                    {{ $codeToBank('263').korName }}
                    {{ $hmsecToDash('123465790') }}
                </button>
                <!-- 비밀번호 저장, 비밀번호 유효검토 완료 후 class에 'passed' 추가 -->
                <button type="button" class="passed"
                    @click="runComp(regAccPassword)"></button>
            </div>
            <div class="controlAcc">
                <p>매수가능금액 : 8,158,000원</p>
                <button type="button">충전하기</button>
            </div>
            <hr>
            <!-- 다건매수일때 노출 -->
            <div class="listSort">
                <label for="samePriceAll">
                    <input type="checkbox" id="samePriceAll">
                    <div>매수금액 동일하게 입력</div>
                </label>
            </div>
            <!-- 매수펀드 리스트 -->
            <ul class="productList delete">
                <!-- 반복 목록 단위 -->
                <li>
                    <button type="button" class="del" title="삭제"></button>
                    <!-- 타이틀, 안내, 수수료, 기간 -->
                    <a href="javascript:;">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class
                            <!-- lightBlue(적합) / red(부적합) -->
                            <span class="bullet lightBlue">적합</span>
                        </h1>
                    </a>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" placeholder="매수금액 입력"
                                inputmode="none" readonly
                                @focus="runComp(regPrice)">
                            <p>매수가능 금액을 초과하였습니다.</p>
                        </label>
                    </div>
                </li>
                <!-- // 반복 목록 단위 -->
                <li>
                    <button type="button" class="del" title="삭제"></button>
                    <a href="javascript:;">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class
                            <span class="bullet red">부적합</span>
                        </h1>
                    </a>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" placeholder="매수금액 입력"
                                inputmode="none" readonly
                                @focus="runComp(regPrice)">
                        </label>
                    </div>
                </li>
                <li>
                    <button type="button" class="del" title="삭제"></button>
                    <a href="javascript:;">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class
                            <span class="bullet red">부적합</span>
                        </h1>
                    </a>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" placeholder="매수금액 입력"
                                inputmode="none" readonly
                                @focus="runComp(regPrice)">
                        </label>
                    </div>
                </li>
            </ul>
            <div class="emptydiv" :class="{ 'on': componentsInfo.compName === regPrice }"></div>
        </div>
        <div class="buttonArea">
            <button typw="button" class="h50 pointBlue"
                @click="returnVal(true)">다음</button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, onMounted, markRaw } from 'vue'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue'
import regPrice from '@/components/banking/regPrice.vue'
import regAccPassword from '@/components/banking/regAccPassword.vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
let focusElement = HTMLElement
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
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === selectMyAccListInTypes || comps === regAccPassword) {
        componentsInfo.compOption = {
            bankingType: 'hmsec',
            bankCode: '263',
            bankAccNumber: '111'
        }
    } else if (comps === regPrice) {
        focusElement = document.activeElement
        focusElement.classList.add('on')
        document.getElementById('modalArea').style.overflow = 'hidden'
        const moveTop = focusElement.getBoundingClientRect().top - 200
        setTimeout(() => {
            document.getElementById('modalArea').scrollBy({
                top: moveTop,
                left: 0,
                behavior: 'smooth'
            })
        }, 100)
        componentsInfo.compOption = { sendPrice: '' }
    }
}
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === regPrice) {
            document.getElementById('modalArea').style.overflow = 'auto'
            if(focusElement.classList.contains('on')) focusElement.classList.remove('on')
        }
        closeComponent()
    } else {
        closeComponent()
    }
}
const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    const returnValue = vals || false
    emit('runEmits', returnValue)
    $modalEnd('modalArea')
}

onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
.contentsArea {
    padding-left: 0 !important; padding-right: 0 !important;
}
.selectMyAcc {
    padding-top: 0; padding-bottom: 0;
}
.controlAcc {
    display: flex;
    padding: 9px 20px 31px;
    justify-content: space-between;
    align-items: center;
    & > p {
        margin: 0; padding: 0;
        color: rgba(112, 120, 132, 1); font-weight: 400;
    }
    & > button {
        height: 1.5rem;
        padding: 0 0 0 20px; border: none; border-radius: 0;
        background: transparent url('@/assets/images/global/icon_Inq_history_blue.png') no-repeat left center / 16px;
        line-height: 1.5rem; color: var(--pointBlue);
    }
}
</style>