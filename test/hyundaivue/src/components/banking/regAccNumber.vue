<template>
    <div id="bankAccInsert" role="dialog">
        <div :class="(accInfo.compStep !== 'checkFail' ? 'bottomSheet ' : '')
            + (accInfo.compStep !== 'bankSelect' ? 'on ' : '')
            + accInfo.compStep">
            <!-- 은행증권사 선택 -->
            <template v-if="accInfo.compStep === 'bankSelect'">
                <div class="tabStyle04">
                    <ul>
                        <li class="on"
                            @click="moveToX('bankList')">
                            은행
                        </li>
                        <li @click="moveToX('secList')">
                            증권
                        </li>
                    </ul>
                </div>
                <div class="accList" @scroll="checkBankAcc">
                    <ul id="bankList">
                        <li v-for="(bankList, index) in bankListArr.bankList" :key="index"
                            @click="insertBankCD($event, bankList)">
                            <img :src="'/images/logos/' + bankList + '.png'"
                                :alt="$codeToBank(bankList).korName" />
                            {{ $codeToBank(bankList).korName }}
                        </li>
                    </ul>
                    <ul id="secList">
                        <li v-for="(secList, index) in bankListArr.secList" :key="index"
                            @click="insertBankCD($event, secList)">
                            <img :src="'/images/logos/' + secList + '.png'"
                                :alt="$codeToBank(secList).korName" />
                            {{ $codeToBank(secList).korName }}
                        </li>
                    </ul>
                </div>
            </template>
            <!-- // 은행증권사 선택 -->
            <!-- 계좌번호 입력 -->
            <template v-if="accInfo.compStep === 'numberPad'">
                <h1>
                    <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                        :alt="$codeToBank(accInfo.bankCode).korName" />
                    {{ $codeToBank(accInfo.bankCode).korName }}
                </h1>
                <input type="text"
                    inputmode="none"
                    maxlength="14"
                    :value="accInfo.bankCode === '263' ? $hmsecToDash(accInfo.bankAccNumber) : accInfo.bankAccNumber"
                    readonly
                    placeholder="계좌번호 입력 (‘-’제외)"
                    title="계좌번호 입력">
                <ul>
                    <li v-for="(numberKey, index) in keyPadArr" :key="index">
                        <template v-if="typeof (numberKey) === 'number'">
                            <button type="button"
                                @click="addNumber(numberKey, ev)"
                                >
                                {{ numberKey }}
                            </button>
                        </template>
                        <template v-else-if="numberKey === 'del'">
                            <button type="button"
                                class="deleteCnt"
                                @click="delteNumber(ev)"
                                title="번호한자리 삭제"
                                >
                            </button>
                        </template>
                    </li>
                </ul>
                <div class="buttonArea">
                    <button type="button" class="pointBlue h50"
                        @click="checkAccNumber">입력완료</button>
                </div>
            </template>
            <!-- // 계좌번호 입력 -->
            <!-- 계좌조회 성공 -->
            <template v-if="accInfo.compStep === 'checkPass'">
                <h1>
                    예금주 확인
                    <button type="button" class="modalClose"
                        @click="$modalEnd('bankAccInsert')">
                        닫기
                    </button>
                </h1>
                <div class="blueNote">
                    <h2>{{ accInfo.ownerName }}</h2>
                    <p>받는 분 성함이 맞나요?</p>
                </div>
                <div class="buttonArea"
                    data-buttonLength="2">
                    <button type="button" class="white h50"
                        @click="modelend">아니요</button>
                    <button type="button" class="pointBlue h50"
                        @click="emitAccInfo">예, 맞아요</button>
                </div>
            </template>
            <!-- // 계좌조회 성공 -->
            <!-- 계좌조회 실패 -->
            <template v-if="accInfo.compStep === 'checkFail'">
                <h1>계좌번호 확인</h1>
                <div class="blueNote">
                    <h2>{{ $codeToBank(accInfo.bankCode).korName + ' (' + accInfo.bankAccNumber + ')' }}</h2>
                    <p>올바른 계좌번호인지 다시 확인해 주세요.</p>
                </div>
                <div class="buttonArea">
                    <button type="button" class="pointBlue h50"
                        @click="modelend">확인</button>
                </div>
            </template>
            <!-- // 계좌조회 실패 -->
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted } from 'vue'
const emit = defineEmits(['runEmits'])
const $codeToBank = inject('$codeToBank')
const $runAlert = inject('$runAlert')
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $hmsecToDash = inject('$hmsecToDash')
const $axios = inject('$axios')
// 송금받는 계좌 유효성 검토
const accCheckApi = '/json/banking/accCheck.json'

// 은행및 증권사 코드
const bankListArr = ({
    bankList: [
        '004', // 국민은행
        '090', // 카카오뱅크
        '003', // 기업은행
        '011', // 농협은행
        '088', // 신한은행
        '002', // 산업은행
        '020', // 우리은행
        '027', // 한국씨티은행
        '081', // 하나은행
        '023', // SC제일은행
        '039', // 경남은행
        '034', // 광주은행
        '031', // 대구은행
        '055', // 도이치은행
        '060', // 뱅크오브아메리카
        '032', // 부산은행
        '064', // 산림조합중앙회
        '050', // 저축은행
        '045', // 새마을금고
        '007', // 수협은행
        '048', // 신협중앙회
        '071', // 우체국
        '037', // 전북은행
        '035', // 제주은행
        '067', // 중국건설은행
        '062', // 중국공상은행
        '063', // 중국은행
        '061', // BNP파리바은행
        '054', // HSBC은행
        '057', // JP모간체이스은행
        '089', // 케이뱅크
        '092' // 토스뱅크
    ],
    secList: [
        '263', // 현대차증권
        '261', // 교보증권
        '227', // 다올투자증권
        '267', // 대신증권
        '287', // 메리츠증권
        '238', // 미래에셋증권
        '290', // 부국증권
        '240', // 삼성증권
        '291', // 신영증권
        '278', // 신한투자증권
        '209', // 유안타증권
        '280', // 유진투자증권
        '265', // 이베스트투자증권
        '288', // 카카오페이증권
        '292', // 케이프투자증권
        '264', // 키움증권
        '271', // 토스증권
        '270', // 하나증권
        '262', // 하이투자증권
        '243', // 한국투자증권
        '294', // 한국포스증권
        '269', // 한화투자증권
        '224', // BNK투자증권
        '279', // DB금융투자
        '225', // IBK투자증권
        '218', // KB증권
        '247', // NH투자증권
        '266' // SK증권
    ]
})
// 키패드 키 배열
const keyPadArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del']
// 진행상태 및 계좌
const accInfo = reactive({
    // compStep: 'bankSelect',
    compStep: 'bankSelect', // 진행 순서는 bankSelect -> numberPad -> checkPass, checkFail 로 구성된다.
    bankCode: '',
    bankAccNumber: '',
    ownerName: ''
})


// 키패드 입력 - 넘버키 눌렀을때
const addNumber = (number) => {
    if(accInfo.bankAccNumber === '') {
        accInfo.bankAccNumber = number
    } else {
        accInfo.bankAccNumber = accInfo.bankAccNumber * 10 + number
    }
}
// 키패드 입력 - 지우기 눌렀을때
const delteNumber = () => {
    if(accInfo.bankAccNumber < 10) {
        accInfo.bankAccNumber = ''
    } else {
        accInfo.bankAccNumber = Math.floor(Number(accInfo.bankAccNumber / 10))
    }
}
// 1단계 은행,증권 선택 후 번호입력 전환
const insertBankCD = (ev, selectedBankCode) => {
    let checkEl = ev.target
    if(checkEl.tagName === 'IMG') {
        checkEl = checkEl.parentNode
    }
    checkEl.classList.add('on')
    accInfo.bankCode = selectedBankCode
    if (accInfo.bankCode !== '' && accInfo.bankCode !== null) {
        accInfo.compStep = 'numberPad'
    } else {
        $runAlert({
            title: '오류',
            msg: '잘못된 요청입니다. <br> 다시 시작해주세요',
            isBottom: false
        })
    }
}
// 입력계좌 유효성 확인
const checkAccNumber = () => {
    $axios.get(accCheckApi, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 성공 계좌 확인 처리
                accInfo.ownerName = res.data.accInfo.ownerName
                accInfo.compStep = 'checkPass'
            } else {
                // fail 처리
                accInfo.compStep = 'checkFail'
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
// 계좌확인 성공 후 부모창 송부
const emitAccInfo = () => {
    $modalEnd('bankAccInsert')
    const retunAcc = {
        ownerName: accInfo.ownerName,
        bankCode: accInfo.bankCode,
        bankAccNumber: accInfo.bankAccNumber
    }
    emit('runEmits', retunAcc)
}
// 모달 종료
const modalend = () => {
    $modalEnd('bankAccInsert')
    emit('runEmits', false)
}
// 은행, 증권 이동
const moveToX = (targetID) => {
    const targetEL = document.getElementById(targetID)
    const moveTop = targetEL.offsetTop - targetEL.parentNode.offsetTop
    targetEL.parentNode.scrollTo({ top: moveTop, behavior: 'smooth' })
}
// 자동 탭 전환
const checkBankAcc = (ev) => {
    const checkTop = document.getElementById('secList').offsetTop - ev.target.offsetTop
    const tabArea = ev.target.parentNode.children[0].children[0]
    if(ev.target.scrollTop >= checkTop) {
        tabArea.children[0].classList.remove('on')
        tabArea.children[1].classList.add('on')
    } else {
        tabArea.children[0].classList.add('on')
        tabArea.children[1].classList.remove('on')
    }
}

onMounted(() => {
    $modalStart('bankAccInsert', modalend)
})

</script>
<style lang="postcss" scoped>
    #bankAccInsert * { transition: height .6s ease, transform .6s ease, opacity .4s ease }
    div.bankSelect {
        height: 516px;
        padding: 0; margin: 0;
        & .tabStyle04 {
            overflow: auto;
            width: 100%;
            & li {
                width: 50%;
                text-align: center;
            }
        }
        & div:not(.tabStyle04) {
            overflow: auto;
            height: 460px;
            & > ul {
                overflow: hidden;
                margin: 0; padding: 20px;
                list-style: none;
                & > li {
                    float: left; overflow: hidden; position: relative;
                    width: calc((100% - 20px)/3); height: 100px;
                    padding-top: 60px; margin-right: 10px; border-radius: 8px;
                    background: var(--tableTitleBg);
                    color: var(--fontDeepgray); text-align: center; font-size: 0.857rem; box-sizing: border-box;
                    & img {
                        position: absolute;
                        top: 19px; left: calc(50% - 18px); width: 36px;
                    }
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    &:nth-child(n+4) {
                        margin-top: 10px;
                    }
                    &.on {
                        border: 1px solid var(--pointBlue)
                    }
                }
            }
        }
    }
    div.numberPad {
        padding: 0;
        height: 478px;
        & h1 {
            margin: 0; padding: 24px 20px;
            font-weight: 500; font-size: 1.143rem; line-height: 33px;
            & img {
                width: 33px;
                margin: -3px 8px 0 0;
                vertical-align: middle;
            }
        }
        & input {
            width: calc(100vw - 40px) !important;
            margin: 0 20px 24px;
            &:read-only {
                background: #fff
            }
        }
        & div.buttonArea {
            left: 20px;
        }
    }
    div.checkPass {
        height: 264px;
        & h2 {
            padding: 0; margin: 0 0 8px;
            font-size: 1.429rem; line-height: 1; font-weight: 500;
        }
        & p {
            margin: 0; padding: 0;
            font-size: 1rem; color: var(--tableTopLine);
        }
    }
    div.checkFail {
        height: 258px;
        & h2 {
            padding: 0; margin: 0 0 8px;
            font-size: 1.143rem; line-height: 1.500rem; font-weight: 500;
        }
        & p {
            margin: 0; padding: 0;
            font-size: 1rem; color: var(--tableTopLine);
        }
    }
</style>