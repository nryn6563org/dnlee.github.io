<template>
    <!-- 펀드 매도 정보입력 -->
    <div id="modalFundSell" class="fullPopup">
        <div class="header">
            <h1>펀드 매도</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div id="modalFundSellEnter" class="contentsArea">
            <div class="titleInStep">
                <h1>
                    매도정보를<br>
                    입력해주세요.
                </h1>
            </div>
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
            <hr>
            <ul class="productList delete">
                <!-- 리스트 반복단위-->
                <li>
                    <button type="button" class="del"></button>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    </a>
                    <ol class="simpleBox">
                        <li>
                            <span>매도가능금액</span>
                            <strong>
                                {{ $priceToCommas(pageInfo.fundList[0].totallPrice) }}원
                                ({{ $priceToCommas(pageInfo.fundList[0].totalUnit) }}좌)</strong>
                        </li>
                    </ol>
                    <h4 class="gray">매도유형</h4>
                    <div class="tab">
                        <label for="allSell01">
                            <input type="radio" id="allSell01" name="sellType01" :value="true"
                                v-model="pageInfo.fundList[0].isAllPrice">
                            <div>전액 매도</div>
                        </label>
                        <label for="part01">
                            <input type="radio" id="part01" name="sellType01" :value="false"
                                v-model="pageInfo.fundList[0].isAllPrice">
                            <div>일부 매도</div>
                        </label>
                    </div>
                    <template v-if="pageInfo.fundList[0].isAllPrice">
                        <!-- 매도 유형이 전액, 매도금액이 가능금액과 일치할 경우 경우 -->
                        <h4 class="gray">계좌 해지여부</h4>
                            <div class="tab">
                            <label for="del01">
                                <input type="radio" id="del01" name="checkEnd01">
                                <div>계좌해지(삭제)</div>
                            </label>
                            <label for="keep01">
                                <input type="radio" id="keep01" name="checkEnd01" checked>
                                <div>계좌유지</div>
                            </label>
                        </div>
                    </template>
                    <template v-else>
                        <!-- 매도 유형이 일부매도, 매도금액이 가능금액보다 적을 시-->
                        <h4 class="gray">일부매도 기준</h4>
                        <div class="tab">
                            <label for="amount01">
                                <input type="radio" id="amount01" name="standard01" value="price"
                                    v-model="pageInfo.fundList[0].priceDiv">
                                <div>금액</div>
                            </label>
                            <label for="unit01">
                                <input type="radio" id="unit01" name="standard01"  value="unit"
                                    v-model="pageInfo.fundList[0].priceDiv">
                                <div>좌수</div>
                            </label>
                        </div>
                    </template>
                    <!-- 매도 유형이 전액 매도일 경우 -->
                    <h4 class="gray">
                        {{ pageInfo.fundList[0].priceDiv === 'price' ? '매도금액' : '매도좌수' }}
                    </h4>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" inputmode="none" readonly
                                :placeholder="pageInfo.fundList[0].priceDiv === 'price' ? '금액을 입력해주세요' : '좌수를 입력해주세요'"
                                @click="runComp(regPrice)"
                                :value="pageInfo.fundList[0].regNumber ===  0 || pageInfo.fundList[0].regNumber ===  '' ?
                                    '' : $priceToCommas(pageInfo.fundList[0].regNumber) + (pageInfo.fundList[0].priceDiv === 'price' ? '원': '좌')">
                        </label>
                        <!-- 전액매도 & 자동이체 설정된 케이스만 노출 -->
                        <label for="confirm"
                            v-if="pageInfo.fundList[0].isAllPrice && pageInfo.fundList[0].isAutoTransfer">
                            <input type="checkbox" id="confirm">
                            <div>자동이체 신청해지(해지 시 취소불가)</div>
                        </label>
                    </div>
                </li>
                <!-- 반복리스트 단위 끝 -->
                <li>
                    <button type="button" class="del"></button>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    </a>
                    <ol class="simpleBox">
                        <li>
                            <span>매도가능금액</span>
                            <strong>
                                {{ $priceToCommas(pageInfo.fundList[1].totallPrice) }}원
                                ({{ $priceToCommas(pageInfo.fundList[1].totalUnit) }}좌)</strong>
                        </li>
                    </ol>
                    <h4 class="gray">매도유형</h4>
                    <div class="tab">
                        <label for="allSell02">
                            <input type="radio" id="allSell02" name="sellType02" :value="true"
                                v-model="pageInfo.fundList[1].isAllPrice">
                            <div>전액 매도</div>
                        </label>
                        <label for="part02">
                            <input type="radio" id="part02" name="sellType02" :value="false"
                                v-model="pageInfo.fundList[1].isAllPrice">
                            <div>일부 매도</div>
                        </label>
                    </div>
                    <template v-if="pageInfo.fundList[1].isAllPrice">
                        <h4 class="gray">계좌 해지여부</h4>
                            <div class="tab">
                            <label for="del02">
                                <input type="radio" id="del02" name="checkEnd02">
                                <div>계좌해지(삭제)</div>
                            </label>
                            <label for="keep02">
                                <input type="radio" id="keep02" name="checkEnd02" checked>
                                <div>계좌유지</div>
                            </label>
                        </div>
                    </template>
                    <template v-else>
                        <h4 class="gray">일부매도 기준</h4>
                        <div class="tab">
                            <label for="amount02">
                                <input type="radio" id="amount02" name="standard02" value="price"
                                    v-model="pageInfo.fundList[1].priceDiv">
                                <div>금액</div>
                            </label>
                            <label for="unit02">
                                <input type="radio" id="unit02" name="standard02" value="unit"
                                    v-model="pageInfo.fundList[1].priceDiv">
                                <div>좌수</div>
                            </label>
                        </div>
                    </template>
                    <h4 class="gray">
                        {{ pageInfo.fundList[1].priceDiv === 'price' ? '매도금액' : '매도좌수' }}
                    </h4>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" inputmode="none" readonly
                                :placeholder="pageInfo.fundList[1].priceDiv === 'price' ? '금액을 입력해주세요' : '좌수를 입력해주세요'"
                                @click="runComp(regPrice)"
                                :value="pageInfo.fundList[1].regNumber ===  0 || pageInfo.fundList[1].regNumber ===  '' ?
                                    '' : $priceToCommas(pageInfo.fundList[1].regNumber) + (pageInfo.fundList[1].priceDiv === 'price' ? '원': '좌')">
                        </label>
                        <label for="confirm"
                            v-if="pageInfo.fundList[1].isAllPrice && pageInfo.fundList[1].isAutoTransfer">
                            <input type="checkbox" id="confirm">
                            <div>자동이체 신청해지(해지 시 취소불가)</div>
                        </label>
                    </div>
                </li>
            </ul>
            <div class="emptydiv" :class="{ 'on' : componentsInfo.compName === regPrice }"></div>
        </div>
        <div class="buttonArea"
            data-buttonLength="2">
            <!-- <button type="button" class="h50 white"
                @click="returnVal(true)"
                >이전</button> -->
            <button type="button" class="h50 pointBlue"
            @click="returnVal()"
                >다음</button>
        </div>
        <component :is="componentsInfo.compName"
            :options="componentsInfo.compOption"
            @runEmits="closeComp" />
    </div>
</template>
<script setup>
import { inject, reactive, onMounted, markRaw } from 'vue'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue'
import regPrice from '@/components/banking/regPrice.vue'
import regAccPassword from '@/components/banking/regAccPassword.vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $priceToCommas = inject('$priceToCommas')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const props = defineProps(['options'])
let focusElement = HTMLElement // 금액입력진행 확인용

// 퍼포먼스용 세팅
const pageInfo = reactive({
    fundList: [
        { isAllPrice: true, priceDiv: 'price', isAutoTransfer: true, totallPrice: 1000000, totalUnit: 500, regNumber: 500 },
        { isAllPrice: true, priceDiv: 'unit', isAutoTransfer: false, totallPrice: 1000000, totalUnit: 500, regNumber: '' }
    ]
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
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === selectMyAccListInTypes) {
        componentsInfo.compOption = {
            bankingType: 'hmsec',
            bankCode: '263',
            bankAccNumber: '111'
        }
    } else if (comps === regPrice) {
        focusElement = document.activeElement
        focusElement.classList.add('on')
        const moveTop = focusElement.getBoundingClientRect().top - 180
        setTimeout(() => {
            document.getElementById('modalFundSellEnter').scrollBy({
                top: moveTop,
                left: 0,
                behavior: 'smooth'
            })
            document.getElementById('modalFundSellEnter').style.overflow = 'hidden'
        }, 100)
    } else if (comps === regAccPassword) {
        componentsInfo.compOption = {
            bankingType: 'hmsec',
            bankCode: '263',
            bankAccNumber: '111'
        }
    }
}
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === selectMyAccListInTypes) {
            closeComponent()
        } else if (comps === regPrice) {
            focusElement.classList.remove('on')
            document.getElementById('modalFundSellEnter').style.overflow = 'auto'
            closeComponent()
        } else if (comps === regAccPassword) {
            closeComponent()
        }
    } else {
        closeComponent()
    }
}
const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    emit('runEmits', vals)
    $modalEnd('modalFundSell')
}

onMounted(() => {
    $modalStart('modalFundSell')
})
</script>
<style lang="postcss" scoped>
.contentsArea {
    padding-right: 0 !important; padding-bottom: 86px !important; padding-left: 0 !important;
    & > hr {
        margin-top: 32px !important;
    }
}
.selectMyAcc {
    padding-top: 0; padding-bottom: 0;
}
.productList {
    & .simpleBox {
        margin-top: 26px;
        & strong {
            font-size: 1.143rem; font-weight: 400;
        }
    }
    & .tab div { font-size: 1rem; }
    & h4 { margin: 28px 0 6px; padding: 0; }
    & > li > div:not(.tab) {
        & label + label { margin-top: 28px; }
    }
}
</style>