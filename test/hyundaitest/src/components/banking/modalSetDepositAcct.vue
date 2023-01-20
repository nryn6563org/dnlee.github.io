<!-- 입금지정서비스 계좌 안내-->
<template>
    <div id="disignatedCheck" role="dialog">
        <div :class="'bottomSheet' + [transInfo.step === 'info' ? '' : ' accList on']">
            <h1>
                {{ transInfo.step === 'info' ? '입금지정서비스 계좌 안내' : '계좌선택' }}
                <button type="button" class="modalClose"
                    @click="returnVal(false)">
                </button>
            </h1>
            <div class="contentsArea">
                <template v-if="transInfo.step === 'info'">
                    <p>선택하신 계좌는 입금계좌지정 서비스가 적용된 계좌입니다.  입금 미지정된 계좌로  이체 시 1일 100만원이하 이체만 가능합니다.</p>
                    <ul class="listType02">
                        <li>
                            <!-- 입금지정계좌 노출 -->
                            <button type="button"
                                @click="doChangeAcc()">
                                <h2>입금지정계좌로 이체하기</h2>
                                <p>
                                    {{ $codeToBank(transInfo.accList[0].bankCode).korName }}
                                    {{ transInfo.accList[0].bankCode === '263' ?
                                        $hmsecToDash(transInfo.accList[0].bankAccNumber) : transInfo.accList[0].bankAccNumber }}
                                    {{ transInfo.accList.length > 1 ? '외 ' + (transInfo.accList.length - 1) + '건' : '' }}
                                </p>
                            </button>
                        </li>
                        <li>
                            <!-- 클릭시 근거계좌정보 노출 -->
                            <button type="button"
                                @click="returnVal(true)">
                                <h2>입금미지정계좌로 이체하기</h2>
                                <p>1일 100만원 이하 이체 가능</p>
                            </button>
                        </li>
                        <li>
                            <!-- 출금계좌 변경팝업 노출 -->
                            <button type="button"
                                @click="returnVal(false)">
                                <h2>출금계좌 재선택하기</h2>
                            </button>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <ul>
                        <li v-for="(accInfo, index) in transInfo.accList" :key="index">
                            <a href="javascript:;"
                                @click="returnVal(accInfo)">
                                <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                                    :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                                <h1>{{ accInfo.ownerName }}</h1>
                                <p>
                                    {{ $codeToBank(accInfo.bankCode).korName }}
                                    {{ accInfo.bankCode === '263' ?
                                        $hmsecToDash(accInfo.bankAccNumber) : accInfo.bankAccNumber }}
                                </p>
                            </a>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, reactive, onMounted } from 'vue'
const $axios = inject('$axios')
const $modalStart = inject('$modalStart')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $toastMsg = inject('$toastMsg')
const emit = defineEmits(['runEmits'])
const myAccListAPI = '/json/banking/myAccList.json'

// 내계좌 목록 - json그대로 다시 불러온다.
const transInfo = reactive({
    step: 'info', // 진행 순서 info(안내) | list(목록선택)
    accList: [{
        bankCode: '',
        bankAccNumber: '',
        bankAccName: '',
        retainedAmount: '',
        bankAccTypeCode: '',
        availableCode: '',
        isDesignated: '',
        isPassed: ''
    }]
})

const returnVal = (vals) => {
    if(vals.isDesignated === false) {
        $toastMsg({
            msg: '선택계좌는 미지정계좌입니다.',
            className: ''
        })
    } else {
        emit('runEmits', vals)
    }
}

// 지정계좌 조회
const getDesignatedAcc = () => {
    $axios.get(myAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                transInfo.accList = res.data.accList
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}

// 지정계좌가 여러개 일 시 재 선택
const doChangeAcc = () => {
    if(transInfo.accList.length === 1) {
        returnVal(transInfo.accList[0])
    } else {
        transInfo.step = 'list'
    }
}

getDesignatedAcc()
// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('disignatedCheck')
})
</script>
<style lang="postcss" scoped>
    div[role="dialog"] > div.bottomSheet {
        &:not(.accList) {
            height: 409px;
        }
        padding-bottom: 0;
        & .contentsArea  > p {
            margin: 24px 0 0;
        }
    }
    div.accList {
        height: 380px;
        padding: 0;
        & h1 {
            padding: 22px 20px 0;
        }
        & div.contentsArea {
            overflow: auto;
            height: calc(100vh - 400px);
            border-top: 1px solid rgba(215, 215, 215, 1);
            & ul {
                list-style: none;
                padding: 8px 0 0 0; margin: 0;
                & li {
                    overflow: hidden; position: relative;
                    width: 100%;
                    padding: 0;
                    box-sizing: border-box;
                    & a {
                        display: block;
                        padding: 10px 20px 12px;
                        text-decoration: none;
                    }
                    & img {
                        position: absolute;
                        top: 16px; width: 36px;
                    }
                    & h1, & p {
                        margin: 0; padding: 0 0 0 52px;
                    }
                    & h1 {
                        margin-bottom: 2px;
                        font-size: 1.143rem; color: var(--black)
                    }
                    & p {
                        font-size: 1rem; color: var(--fontLightgray)
                    }
                    &+ li {
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>