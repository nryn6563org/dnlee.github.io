<template>
    <div>
        <!-- 펀드신규 매수 자동이체-->
        <section id="autoFundBuy">
            <div class="titleInStep">
                <h1>
                    매달 투자금액이 출금 될<br>
                    계좌를 입력해주세요.
                </h1>
                <span>
                    <strong>1</strong>/3
                </span>
            </div>
            <!-- 출금계좌정보 -->
            <div class="selectAcc">
                <h2>
                    출금계좌 선택
                    <button type="button" class="mySaveAcc"
                        @click="runComp(selectTransAccListDimmed)">자주/퀵계좌</button>
                </h2>
                <button class="h50 white" type="button"
                    @click="runComp(regAccNumber)">
                    <span class="dimmed">은행/증권사 선택</span>
                    <!-- 계좌 선택 완료 시
                    class="dimmed" 삭제
                    {{ $codeToBank('263').korName }}
                    {{ $hmsecToDash('123465790') }}
                    //계좌선택 완료 시-->
                </button>
                <label for="transAccNumber">
                    <input type="text" class="h50" readonly inputmode="none"
                    placeholder="계좌번호 입력 (‘-’제외)"
                    @focus="runComp(regAccNumber)">
                </label>
            </div>
            <hr>
             <!-- 입금계좌정보 -->
             <div class="selectAcc">
                <h2>입금계좌 선택</h2>
                <button class="h50 white" type="button"
                    @click="runComp(selectMyAccListInTypes)">
                        {{ $codeToBank('263').korName }}
                        {{ $hmsecToDash('123465790') }}
                </button>
            </div>
        </section>
        <div class="bottomBtnArea">
             <button typw="button" class="h50 pointBlue" @click="$router.push({ name: 'autoFundBuyEnter' })">다음</button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue'
import selectTransAccListDimmed from '@/components/banking/selectTransAccListDimmed.vue'
import regAccNumber from '@/components/banking/regAccNumber.vue' // 직접 출금계좌 정보 입력
const $router = useRouter()
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const props = defineProps(['baseInfo'])

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
    if(comps === selectMyAccListInTypes || comps === regAccNumber) {
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
        closeComponent()
    } else {
        closeComponent()
    }
}

</script>
<style lang="postcss" scoped>
    section {
        & > hr {
            margin: 28px 0 24px;
        }
    }
</style>