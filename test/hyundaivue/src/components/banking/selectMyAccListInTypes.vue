<template>
    <div id="myAccList" role="dialog">
        <div class="bottomSheet">
            <h1>
                계좌 선택
                <button type="button" class="modalClose"
                    @click="closeModal(false)"></button>
            </h1>
            <div>
                <ul>
                    <li v-if="props.options.useAll"
                        :class="{ 'on' : props.options.bankCode === '' && props.options.bankAccNumber === '' }">
                        <a href="javascript:;" @click="closeModal({
                            bankCode: '', bankAccNumber: ''
                        })">
                            <h1>전체계좌</h1>
                        </a>
                    </li>
                    <li v-for="(accInfo, index) in myAccList.accList" :key="index"
                        :class="{ 'on' : props.options.bankCode === accInfo.bankCode && Number(props.options.bankAccNumber) === Number(accInfo.bankAccNumber) }">
                        <a href="javascript:;" @click="closeModal(accInfo)">
                            <template v-if="props.options.bankingType === 'hmsec'">
                                <h1>
                                    {{ $hmsecToDash(accInfo.bankAccNumber) }}
                                    [{{ $codeToAccType(accInfo.bankAccTypeCode) }}]
                                    {{ accInfo.bankAccName }}
                                </h1>
                            </template>
                            <template v-else-if="props.options.bankingType === 'hmsecPrice'">
                                <h2>{{ $hmsecToDash(accInfo.bankAccNumber) }}</h2>
                                <p>출금가능금액 {{ $priceToCommas(accInfo.retainedAmount) }}원</p>
                            </template>
                            <template v-else>
                                <div>
                                    <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                                        :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                                    <h2>{{ $codeToBank(accInfo.bankCode).korName }}</h2>
                                    <p>{{ accInfo.bankAccNumber }}</p>
                                </div>
                            </template>
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
    accList: new Array(0)
})
// 계좌리스트 가져오기
const getList = () => {
    let runAPI = myAccListAPI
    if(props.options.bankingType === 'openBanking') runAPI = myOpenBankingAccListAPI
    $axios.get(runAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                myAccList.accList = res.data.accList
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
getList()

// 종료 함수
const closeModal = (returns) => {
    $modalEnd('myAccList')
    emit('runEmits', returns)
}

// 최초 실행 후 처리
onMounted(() => {
    $modalStart('myAccList')
})

</script>

<style lang="postcss" scoped>
#myAccList {
    & > div.bottomSheet {
        height: calc(100% - 330px);
        padding: 0;
        &.multiLine {
            height: calc(100% - 324px);
        }
        & > h1 {
            margin: 0; padding: 20px;
        }
        & > div {
            overflow: auto;
            height: calc(100% - 67px);
            & ul {
                list-style: none;
                padding: 0; margin: 0;
                & li {
                    overflow: hidden;
                    padding: 0 20px;
                    & a {
                        margin: 0; padding: 0;
                        color: inherit; text-decoration: none;
                        & h1 {
                        margin: 0; padding: 18px 0 !important;
                        font-size: 1.143rem;
                        }
                        & h2 {
                            margin: 14px 0 0; padding: 0;
                            font-size: 1.143rem;
                        }
                        & p {
                            margin: 0 0 15px; padding: 0;
                            font-size: 1rem;
                        }
                        & > div {
                            position: relative;
                            padding-left: 52px;
                            & > img {
                                position: absolute;
                                left: 0; top: 8px; width: 32px; height: 32px;
                            }
                        }
                    }
                    &.on h1 { color: var(--pointBlue); }
                    &:not(.on) h1 { font-weight: 400; }
                }
                & li + li { margin-top: 0; }
                & li.on {
                    background: rgba(244,246,253,1) url('@/assets/images/global/icon_select_on.png') no-repeat calc(100% - 20px) center / 15px;
                }
            }
        }
    }
}
</style>
