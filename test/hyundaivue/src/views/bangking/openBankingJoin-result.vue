<template>
<div>
    <section id="openBankingRegResult">
        <div class="centerTitle">
            <h2 class="resultPass">
                계좌 <strong>{{ pageInfo.successCount }}건</strong>이<br>
                <strong>등록 완료</strong>되었어요.
            </h2>
        </div>
        <div class="roundBlock gray" v-for="(bankInfo, index) in pageInfo.accInfo" :key="index">
            <div>
                <strong>
                    <img :src="'/images/logos/' + bankInfo.bankCode + '.png'"
                        :alt="$codeToBank(bankInfo.bankCode).korName + ' 로고'" />
                    {{ $codeToBank(bankInfo.bankCode).korName }}
                </strong>
                <div>
                    <span class="bullet blue" v-if="bankInfo.successCount !== 0">{{ bankInfo.successCount }}건 완료</span>
                    <span class="bullet red" v-if="bankInfo.failCount !== 0">{{ bankInfo.failCount }}건 실패</span>
                </div>
            </div>
            <hr>
            <ul class="productList noLine">
                <li v-for="(accList, index) in bankInfo.accList" :key="index">
                    <div class="bullets">
                        <span class="bullet" :class="[ accList.resultCode === 'A0000' ? 'blue' : 'red' ]">
                            {{ accList.resultCode === 'A0000' ? '성공' : '실패' }}
                        </span>
                    </div>
                    <a href="javascript:;">
                        <h2>{{ accList.bankAccName }}</h2>
                        <p class="gray">{{ accList.bankAccNumber }}</p>
                    </a>
                </li>
            </ul>
        </div>
    </section>
    <div class="bottomBtnArea circleStBtnArea">
        <button class="icoPlus right">
            <span>계좌 추가등록</span>
        </button>
    </div>
    <div class="buttonArea">
        <button type="button" class="pointBlue h50"
            @click="emit('runEmits', false)">
            확인
        </button>
    </div>
</div>
</template>

<script setup>
import { inject, reactive } from 'vue'
const $codeToBank = inject('$codeToBank')
const props = defineProps(['joinInfo'])
const pageInfo = reactive({
    successCount: 0, // 화면용 성공 카운트
    failCount: 0, // 화면용 실패 카운트
    accInfo: new Array(0)
})

const preRun = () => {
    const bankLists = props.joinInfo.accInfo
    for(const i in bankLists) {
        const parentObj = pageInfo.accInfo.filter(arr => arr.bankCode === bankLists[i].bankCode)
        if(bankLists[i].resultCode === 'A0000') {
            pageInfo.successCount++
        } else {
            pageInfo.failCount++
        }
        if(pageInfo.accInfo.length === 0 || parentObj.length === 0) {
            const bankObj = []
            const ObjInfo = { bankCode: bankLists[i].bankCode, successCount: 0, failCount: 0, accList: new Array(0) }
            Object.assign(bankObj, ObjInfo)
            bankObj.accList.push(bankLists[i])
            if(bankLists[i].resultCode === 'A0000') {
                bankObj.successCount++
            } else {
                bankObj.failCount++
            }
            pageInfo.accInfo.push(bankObj)
        } else {
            parentObj[0].accList.push(bankLists[i])
            if(bankLists[i].resultCode === 'A0000') {
                parentObj[0].successCount++
            } else {
                parentObj[0].failCount++
            }
        }
    }
}
preRun()
</script>

<style lang="postcss" scoped>
#openBankingRegResult { height: auto; min-height: calc(100% - 188px); }
.roundBlock {
    /* 해당페이지만 존재 */
    & > div {
        display: flex;
        padding: 0 20px;
        align-items: center;
        justify-content: space-between;
        & strong { line-height: 36px; }
        & img {
            width: 36px;
            margin-right: 12px;
            vertical-align: middle;
        }
    }
    & hr { margin-bottom: 8px; }
    & + .roundBlock { margin-top: 18px; }
}
.bottomBtnArea { padding: 20px 20px 96px; }
</style>