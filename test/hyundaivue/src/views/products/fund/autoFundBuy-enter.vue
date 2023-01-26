<template>
    <div id="autoFundEnter">
        <!-- 펀드 신규매수 금액입력 -->
        <section id="autoFundBuy">
            <div class="titleInStep">
                <h1>
                    매월 매수할 금액을<br>
                    입력해주세요.
                </h1>
                <span>
                    <strong>2</strong>/3
                </span>
            </div>
            <!-- 계좌정보들 -->
            <div class="roundBlock hasLink" href="javascript:;"
                @click="$router.push({ name: 'autoFundBuyStart' })">
                <ul class="accList noLine">
                    <li>
                        <a href="javascript:;">
                            <img src="/images/logos/004.png" alt="로고">
                            <p><strong>출금</strong> <span>{{ $codeToBank('004').korName }}</span></p>
                            <p>1234567890 홍길동</p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <img src="/images/logos/263.png" alt="로고">
                            <p><strong>입금</strong> <span>{{ $codeToBank('263').korName }}</span></p>
                            <p>
                                <!-- 현대차증권일 경우 '-'표시 -->
                                {{ $hmsecToDash(1234567890) }}
                                홍길동
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <hr>
            <!-- 다건매수일 때만 노출 -->
            <div class="listSort">
                <label for="samePrice">
                    <input type="checkbox" id="samePrice">
                    <div>이체금액 동일하게 입력</div>
                </label>
            </div>
            <!-- 자동이체 펀드 리스트 -->
            <ul class="productList delete">
                <!-- 반복 리스트 단위 -->
                <li>
                    <button type="button" title="삭제" class="del"></button>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                    </a>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" placeholder="금액입력"
                                readonly inputmode="none"
                                @click="runComp(regPrice)">
                            <!-- 유효성 에러일 시 포기 -->
                            <p>매수가능 금액을 초과하였습니다.</p>
                        </label>
                    </div>
                </li>
                <!-- // 반복리스트 단위 -->
                <li>
                    <button type="button" title="삭제" class="del"></button>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                    </a>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" placeholder="금액입력"
                                readonly inputmode="none"
                                @click="runComp(regPrice)">
                        </label>
                    </div>
                </li>
            </ul>
        </section>
        <div class="buttonArea div3_7">
             <button typw="button" class="h50 white" @click="$router.push({ name: 'autoFundBuyStart' })">이전</button>
             <button typw="button" class="h50 pointBlue" @click="$router.push({ name: 'autoFundBuyConfirm' })">확인</button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import regPrice from '@/components/banking/regPriceInput.vue'
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $router = useRouter()

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
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
}
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        closeComponent()
    } else {
        closeComponent()
    }
}

</script>
<style lang="postcss" scoped>
#autoFundEnter { padding-bottom: 76px; }
ul.productList {
    margin-bottom: 20px;
    & > li:last-child {
        border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
}
.accList > li {
    & a { padding-top: 0 !important; padding-bottom: 0 !important; }
    & img { top: 4px !important; }
    & + li { margin-top: 12px; }
}
.roundBlock {
    margin-bottom: 32px;
}
</style>