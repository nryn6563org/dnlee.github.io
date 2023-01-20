<template>
    <!-- 최초 진입 시 투자성향 및 동의의 미 진행 시 페이지는 노출되지 않는다. -->
    <div v-if="newFundBuyInfo.isPossible" id="newFundBuy">
        <!-- 펀드신규매수 -->
        <section>
            <div class="titleInStep">
                <h1>
                    매수금액을<br>
                    입력해주세요.
                </h1>
                <span>
                    <strong>1</strong>/4
                </span>
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
                            <span class="bullet lightBlue">적합</span>
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
        </section>
        <div class="buttonArea div3_7">
            <button typw="button" class="h50 white">이전</button>
            <button typw="button" class="h50 pointBlue" @click="$router.push({ name: 'newFundBuyInvestConfirm' })">다음</button>
        </div>
        <div class="emptydiv" :class="{ 'on': componentsInfo.compName === regPrice }"></div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue'
import regPrice from '@/components/banking/regPriceInput.vue'
import regAccPassword from '@/components/banking/regAccPassword.vue'
import modalInvestGuide from '@/components/products/modalInvestGuide.vue' // 투자성향확인
import modalNewFundBuyNote from '@/components/products/modalNewFundBuyNote.vue' // 펀드투자 유의사항 팝업
import modalOpenFundAcctInfo from '@/components/products/modalOpenFundAcctInfo.vue' // 펀드 계좌 개설안내
import modalDeepThinkingGuide from '@/components/products/modalDeepThinkingGuide.vue' // 숙려제도 안내
import modalCheckInvestInfo from '@/components/products/modalCheckInvestInfo.vue' // 투자권유 희망 및 투자자정보 제공여부 확인
import modalIncongruityConfirm from '@/components/products/modalIncongruityConfirm.vue' // 부적합[부적정]상품 거래 확인서

const $router = useRouter()
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const props = defineProps(['baseInfo'])

const newFundBuyInfo = reactive({
    isPossible: true // 펀드 신규매수 조건 모두 충족 후
})
// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
// 컴포넌트 애니메이션을 위해 nowRun === true가 아니면 600의 셋타임을 갖는다
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
    if(comps === selectMyAccListInTypes) {
        componentsInfo.compOption = {
            bankingType: 'hmsec',
            bankCode: '263',
            bankAccNumber: '111'
        }
    } else if (comps === regPrice) {
        // 화면 포커스 이벤트
        componentsInfo.compOption = { sendPrice: '' }
    } else if (comps === regAccPassword) {
        componentsInfo.compOption = {
            bankCode: '263',
            bankAccNumber: '111'
        }
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === selectMyAccListInTypes) {
            closeComponent()
        } else if (comps === regPrice) {
            closeComponent()
        } else if (comps === regAccPassword) {
            closeComponent()
        } else {
            closeComponent()
        }
    } else {
        closeComponent()
    }
}

// runComp(modalInvestGuide)
</script>
<style lang="postcss" scoped>
#newFundBuy > section { padding-bottom: 76px; }
.selectMyAcc { padding-top: 0; padding-bottom: 0; }
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