<template>
    <div id="myAccList" role="dialog">
        <div class="bottomSheet">
            <div class="tabStyle04">
                <ul>
                    <li :class="myAccList.myAccBank === '263' ? 'on' : ''">
                        <a href="javascript:;"
                            @click="changeAccPlace('263')"
                            draggable="false">
                            현대차증권
                        </a>
                    </li>
                    <li :class="myAccList.myAccBank === '263' ? '' : 'on'">
                        <a href="javascript:;"
                            @click="changeAccPlace('')"
                            draggable="false">
                            다른은행
                        </a>
                    </li>
                </ul>
            </div>
            <div class="nonButton">
                <ul class="accList hmsecAcc noLine" v-if="myAccList.myAccBank === '263'">
                    <li v-for="(accInfo, index) in myAccList.accList" :key="index"
                        :class="props.options !== null &&
                            props.options.bankAccNumber === accInfo.bankAccNumber ? 'on' : ''">
                        <a href="javascript:;"
                            @click="returnAccInfo(accInfo)">
                            <h1 class="singleLine">{{ $hmsecToDash(accInfo.bankAccNumber) }} {{ $codeToAccType(accInfo.bankAccTypeCode) }}</h1>
                            <!-- <p>출금가능금액 {{ $priceToCommas(accInfo.retainedAmount) }} 원</p> -->
                        </a>
                    </li>
                </ul>
                <ul class="accList noLine" v-else
                    :class="{ 'noList' : checkOtherBank(myAccList.openAccList) === 0 }">
                    <li v-if="checkOtherBank(myAccList.openAccList) === 0">
                        <p>오픈뱅킹 가입 후 이용 가능해요</p>
                        <button type="button"
                            @click="goOpenBankJoin()">
                            오픈뱅킹 가입하기
                        </button>
                    </li>
                    <li v-else v-for="(accInfo, index) in myAccList.openAccList" :key="index"
                        :class="props.options !== null &&
                            (props.options.bankCode === accInfo.bankCode &&
                            props.options.bankAccNumber === accInfo.bankAccNumber) ? 'on' : ''">
                        <a href="javascript:;"
                            @click="returnAccInfo(accInfo)">
                            <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                                :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                            <h1>{{ $codeToBank(accInfo.bankCode).korName }}</h1>
                            <!-- <p>출금가능금액 {{ $priceToCommas(accInfo.retainedAmount) }} 원</p> -->
                            <p>{{ accInfo.bankAccNumber }}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, inject, onMounted } from 'vue'
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $codeToAccType = inject('$codeToAccType')
const $hmsecToDash = inject('$hmsecToDash')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const myAccListAPI = '/json/banking/myAccList.json'
const myOpenBankingAccListAPI = '/json/banking/myOpenBankingAccList.json'
// 화면 필요 변수
const myAccList = reactive({
    myAccBank: '263',
    accList: new Array(0),
    openAccList: new Array(0)
})
// 오픈뱅킹 계좌 리스트 가져오기
const getOpenAccList = () => {
    $axios.get(myOpenBankingAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                myAccList.openAccList = res.data.accList.filter(el => el.agreeWithdrawal === true)
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}

// 계좌리스트 가져오기
const getList = () => {
    $axios.get(myAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                myAccList.accList = res.data.accList
            }
            getOpenAccList()
        })
        .catch(function(err) {
            console.log(err)
        })
}
getList()

// 계좌 목록 종류 선택
const changeAccPlace = (bankCode) => {
    myAccList.myAccBank = bankCode
}
// 타행계좌 개수 체크
const checkOtherBank = (arr) => {
    let checkLength = 0
    if(arr.length !== 0) {
        checkLength = arr.filter(el => el.bankCode !== '263').length
    }
    return checkLength
}

// 계좌정보 리턴
const returnAccInfo = (accInfo) => {
    let retunInfo = false
    $modalEnd('myAccList')
    if(typeof accInfo !== 'undefined') retunInfo = accInfo
    emit('runEmits', retunInfo)
}

// 최초 실행 후 처리
onMounted(() => {
    $modalStart('myAccList', returnAccInfo)
})

</script>

<style lang="postcss" scoped>
#myAccList {
    & > div {
        height: calc(100% - 326px);
        padding: 0;
        & div {
            &:not(.tabStyle04) {
                height: calc(100% - 56px);
                /* height: 100%; */
                overflow-x: hidden;
            }
            &.tabStyle04 {
                overflow: auto;
                width: 100%;
                & li {
                    width: 50%;
                }
            }
        }
    }
    & .accList {
        margin: 0;
        & li {
            & .singleLine { font-weight: 400; }
            &.on .singleLine { font-weight: 700; }
        }
    }
}
</style>
