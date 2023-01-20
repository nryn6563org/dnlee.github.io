<template>
    <section id="openBankingInquiry">
        <ul class="accList "
            :class="{ 'noList' : pageInfo.accList.length === 0 }">
            <li v-if="pageInfo.accList.length === 0">
                <p>등록된 계좌가 없습니다.</p>
                <div></div>
            </li>
            <template v-else>
                <li v-for="(accInfo, index) in pageInfo.accList" :key="index">
                    <a href="javascript:;">
                        <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                            :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                        <h1>{{ $codeToBank(accInfo.bankCode).korName }} {{ accInfo.bankAccNumber }}</h1>
                        <p>{{ accInfo.bankAccName }}</p>
                    </a>
                    <div class="innerBtnBox">
                        <button type="button" class="lightBlue"
                            @click="runComp(bottomAccSetting, {data: accInfo, type:'delete'})">삭제하기</button>
                        <button type="button" class="borderBlue"
                            @click="runComp(bottomAccSetting, {data: accInfo})">출금동의</button>
                    </div>
                </li>
            </template>
        </ul>
    </section>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>

<script setup>
import { inject, reactive, markRaw } from 'vue'
import bottomAccSetting from '@/components/banking/bottomAccSetting.vue'
const $codeToBank = inject('$codeToBank')
const $toastMsg = inject('$toastMsg')
const $axios = inject('$axios')
const myOpenBankingAccListAPI = '/json/banking/myOpenBankingAccList.json'
const props = defineProps(['baseInfo'])

const pageInfo = reactive({
    balanceVisible: true,
    totalBalance: 0,
    sortBy: {
        optionCode: '',
        optionText: '전체'
    },
    visibleList: new Array(0),
    accList: new Array(0)
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
// 컴포넌트 실행 전체
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === bottomAccSetting) {
        const runType = directInput.type ? directInput.type : directInput.data.agreeWithdrawal ? 'cancel' : 'agree'
        componentsInfo.compOption = {
            bankCode: directInput.data.bankCode,
            bankAccNumber: directInput.data.bankAccNumber,
            type: runType
        }
    }
}
// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === bottomAccSetting) {
            if(componentsInfo.compOption.type === 'delete') {
                $toastMsg({ msg: '삭제가 완료되었습니다.' })
            } else if(componentsInfo.compOption.type === 'cancel') {
                $toastMsg({ msg: '출금동의가 해지되었습니다.' })
            } else {
                $toastMsg({ msg: '출금동의 처리되었습니다.' })
            }
            closeComponent()
        }
    } else {
        closeComponent()
    }
}

const preRun = () => {
    $axios.get(myOpenBankingAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.accList = res.data.accList
            } else {
                // 기타 에러시
            }
        })
        .catch(function(err) {
            // API에러시
            console.log(err)
        })
}

preRun()
</script>

<style lang="postcss" scoped>
/* 뱅킹조회 화면 전용 UI */
.controlArea {
    display: flex; justify-content: space-between;
    & button {
        padding: 0 12px;
    }
    & button + button {
        margin-left: 8px;
    }
    & button:nth-child(1) {
        flex-grow: 1;
        text-align: left;
        padding: 0 12px;
    }
}
</style>