<template>
    <div>
        <!-- 투자정보확인 -->
        <section id="newFundBuy">
            <div class="titleInStep">
                <h1>
                    투자정보를<br>
                    확인해주세요.
                </h1>
                <span>
                    <strong class="fontPointBlue">2</strong>/4
                </span>
            </div>
            <h4 class="gray">이익금을 펀드에 다시 투자 할까요?</h4>
            <div class="innerBtnBox">
                <label for="no">
                    <input type="radio" id="no" name="reinvestmentCheck"
                        :value="false"
                        v-model="pageInfo.reInvest">
                    <div class="check">
                        <span>아니오</span>
                    </div>
                </label>
                <label for="yes">
                    <input type="radio" id="yes" name="reinvestmentCheck"
                        :value="true"
                        v-model="pageInfo.reInvest">
                    <div class="check">
                        <span>네, 재투자해요</span>
                    </div>
                </label>
            </div>
            <h4 class="gray">운용보고서는 어디로 받아보시겠어요?</h4>
            <div class="innerBtnBox">
                <label for="not">
                    <input type="radio" id="not" name="receivedCheck"
                        :value="false"
                        v-model="pageInfo.reportRevice">
                    <div class="check">
                        <span>미수령</span>
                    </div>
                </label>
                <label for="email">
                    <input type="radio" id="email" name="receivedCheck"
                        :value="true"
                        v-model="pageInfo.reportRevice">
                    <div class="check">
                        <span>이메일</span>
                    </div>
                </label>
            </div>
            <label>
                <input type="text" id="userEmail" class="h50"
                    placeholder="이메일을 입력해주세요"
                    :disabled="!pageInfo.reportRevice"
                    :v-model="pageInfo.userEmail"
                    @keyup="$checkButton($event)">
                <button type="button" class="resetInput" style="display: none"
                    @click="$resetInput('userEmail', $event)"></button>
            </label>
        </section>
        <div class="bottomBtnArea align01">
             <button typw="button" class="h50 white" @click="$router.push({ name: 'newFundBuyStart' })">이전</button>
             <button typw="button" class="h50 pointBlue" @click="$router.push({ name: 'newFundBuyAgree' })">다음</button>
        </div>
    </div>
</template>
<script setup>
import { inject, reactive } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const $resetInput = inject('$resetInput')
const $checkButton = inject('$checkButton')

const pageInfo = reactive({
    reInvest: null,
    reportRevice: null,
    userEmail: ''
})

</script>
<style lang="postcss" scoped>
#newFundBuy {
    & div.innerBtnBox {
        margin-bottom: 25px; padding: 0 20px;
    }
    & > label {
        width: calc(100% - 40px);
        margin: -12px 20px 0; margin-top: -12px;
        box-sizing: border-box;
        & > input {
            width: 100%;
        }
    }
}
section {
    /* & div {
        padding:0 20px;
        & ~ div { margin-top: 20px;}
        & p {
            margin: 0 0 6px;
            color:var(--tableTopLine) ;
        }
        & label:not(.email) {
            width: calc(100%/2 - 6px);
            & ~ label:not(.email) { margin: 0 0 0 12px;}
            & input[type="radio"]:checked + div.check { background: var(--white);}
            & div.check {
                padding: 0;
                background: rgba(245, 245, 245, 1);
                text-align: center;    font-weight: 500;
                & span {
                    padding: 0 0 0 20px;
                    background: url('@/assets/images/global/icon_check.png') no-repeat left  center / 13px auto;
                }
            }
        }
        & label.email {
            width: 100%;
            margin: 6px 0 0;
            & input { width: 100%;}
        }
    } */
}
</style>