<template>
<div>
    <!-- 이체홈 -->
    <section id="accTransfer">
        <!-- 계좌정보-->
        <!--pw 입력여부 .off(미입력) / 계좌개수 체크 .hasOne(1개일때)-->
        <div :class="'transHome' + [transInfo.accCount === 1 ? ' hasOne' : ''] + [!transInfo.isPassed ? ' off' : '']">
            <button
                @click="runComp(regAccPassword)">
                <img v-if="transInfo.isPassed" :src="'/images/logos/' + transInfo.bankCode + '.png'"
                    :alt="$codeToBank(transInfo.bankCode).korName + ' 로고'" />
                <span v-if="componentsInfo.compName === null && !transInfo.isPassed"
                    :class="componentsInfo.compName === null && !transInfo.isPassed ? 'on' : ''">
                    자물쇠를 선택하여 비밀번호를 입력해 주세요.
                </span>
            </button>
            <!-- 팝업 -->
            <button @click="runComp(selectMyAccList)">
            <!-- <button @click="runModal(modalTransferBan)"> -->
                <!-- 계좌번호 -->
                <p>
                    {{ $codeToBank(transInfo.bankCode).korName }}
                    {{ transInfo.bankCode === '263' ? $hmsecToDash(transInfo.bankAccNumber) : transInfo.bankAccNumber }}
                </p>
                <!-- 계좌 금액정보 -->
                <h2>{{ $priceToCommas(transInfo.retainedAmount) }}원</h2>
            </button>
        </div>
        <template v-if="transInfo.isPassed">
            <!-- 탭메뉴 -->
            <div class="tabStyle04 h38">
                <ul data-tabList="2">
                    <li :class="transInfo.selectAccType === 'accNumber' ? 'on' : ''"
                        @click="selectAccType('accNumber')">
                        <a href="javascript:;"
                            >
                            계좌번호
                        </a>
                    </li>
                    <li :class="transInfo.selectAccType === 'celphone' ? 'on' : ''"
                        @click="selectAccType('celphone')">
                        <a href="javascript:;"
                            draggable="false">
                            휴대폰
                        </a>
                    </li>
                </ul>
            </div>
        </template>
        <!-- 계좌번호로 이체계좌 선택 -->
        <template v-if="transInfo.isPassed && transInfo.selectAccType === 'accNumber'">
            <div class="selectBank">
                <button class="h50 white" type="button"
                    @click="runComp(regAccNumber)">
                    <span :class="transInfo.sendAccInfo[0].bankCode === '' ? '' : 'fontBlack'">
                        {{ transInfo.sendAccInfo[0].bankCode === '' ? '은행/증권사 선택' : $codeToBank(transInfo.sendAccInfo[0].bankCode).korName }}
                    </span>
                </button>
                <label for="transAccNumber">
                    <input type="text" class="h50" readonly
                        placeholder="계좌번호 입력 (‘-’제외)"
                        :value="transInfo.sendAccInfo[0].bankAccNumber"
                        @focus="runComp(regAccNumber)">
                </label>
            </div>
        </template>
        <!-- 휴대폰으로 이체계좌 선택 -->
        <template v-if="transInfo.isPassed && transInfo.selectAccType === 'celphone'">
            <div class="selectBank">
                <label for="searchPhoneBook">
                    <input type="text" class="h50"
                        id="searchPhoneBook"
                        name="searchPhoneBook"
                        placeholder="성명, 연락처 검색/입력"
                        v-model="transInfo.phoneSearchKeyWord"
                        @keyup="doSearchPhone($event)">
                    <button type="button" class="buttonSearch" title="검색"
                        @click="doSearchPhone('searchPhoneBook')"></button>
                </label>
            </div>
            <div class="phoneBook">
                <ul class="emptyList" v-if="transInfo.phoneBookList.length === 0">
                    <li>
                        <img src="@/assets/images/global/bg_emptyList.png" alt="목록 없음 알림" /><br/>
                        <strong>저장된 연락처가 없습니다.</strong><br>
                        전화번호 직접입력하여<br>
                        이체하실 수 있습니다.<br/><br/><br/><br/><br/>
                    </li>
                </ul>
                <ul v-else :class="transInfo.phoneBookSearchResult.length === 0 ? 'emptyList' : ''">
                    <!-- 정상 노출  -->
                    <template v-if="transInfo.phoneBookSearchResult.length !== 0">
                        <li v-for="(phoneBook, index) in transInfo.phoneBookSearchResult" :key="index">
                            <a href="javascript:;" @click="runComp(regName, phoneBook.phoneNumber)">
                                <img src="@/assets/images/banking/icon_phoneBook.png" alt="연락처 아이콘" />
                                <h1>{{ phoneBook.userName }}</h1>
                                <p>{{ $phoneToDashes(phoneBook.phoneNumber) }}</p>
                            </a>
                        </li>
                    </template>
                    <!-- 검색결과 없이 숫자만 입력했을 시  -->
                    <template v-else-if="!/^[0-9]+$/.test(transInfo.phoneSearchKeyWord)">
                        <li>
                            <img src="@/assets/images/global/bg_emptyList.png" alt="목록 없음 알림" /><br/>
                            <strong>연락처에 없는 친구네요.</strong><br>
                            전화번호 직접입력하여<br>
                            이체하실 수 있습니다.<br/><br/><br/><br/><br/>
                        </li>
                    </template>
                    <!-- 검색결과 없이 숫자외 입력했을 시  -->
                    <template v-else-if="/^[0-9]+$/.test(transInfo.phoneSearchKeyWord)">
                        <li>
                            <img src="@/assets/images/global/bg_emptyList.png" alt="목록 없음 알림" /><br/>
                            <strong>연락처에 없는 친구네요.</strong><br>
                            전화번호 직접입력하여<br>
                            이체하실 수 있습니다.<br/>
                            <button type="button" @click="runComp(regName, phoneBook.phoneNumber)">
                            {{ transInfo.phoneSearchKeyWord }} 연락처로 보내기
                            </button>
                        </li>
                    </template>
                </ul>
            </div>
        </template>
    </section>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>

<script setup>
import { inject, reactive, markRaw } from 'vue'
import regAccPassword from '@/components/banking/regAccPassword.vue' // 비밀번호 입력
import selectMyAccList from '@/components/banking/selectMyAccList.vue' // 내 계좌선택
import regAccNumber from '@/components/banking/regAccNumber.vue' // 직접 출금계좌 정보 입력
import selectTransAccList from '@/components/banking/selectTransAccList.vue' // 출금계좌 선택
import regName from '@/components/banking/regName.vue' // 연락처 선택 시 실명입력
import modalMailReturn from '@/components/banking/modalMailReturn.vue' // 비밀번호 입력 후 -> 우편물 수취 확인 미진행 계좌 | availableCode: 01
import modalTransferBan from '@/components/banking/modalTransferBan.vue' // 비밀번호 입력 후 -> 장기미사용자 노출 | availableCode: 02
import modalCustconfirmDuty from '@/components/banking/modalCustconfirmDuty.vue' // 비밀번호 입력 후 ->  비활동계좌, CDD 정보 없을 경우 노출 | availableCode: 03
import modalRealNameUnknown from '@/components/banking/modalRealNameUnknown.vue' // 비밀번호 입력 후 -> 실명미확인 계좌일 경우 노출 | availableCode: 04
import modalSetDepositAcct from '@/components/banking/modalSetDepositAcct.vue' // 비밀번호 입력 후 -> 입금계좌 지정신청된 계좌일 때 노출 | availableCode: 05
import modalAccessRights from '@/components/banking/modalAccessRights.vue' // 연락처 탭 -> 접근허용x경우 -> 접근권한 설정 팝업 노출

const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const $phoneToDashes = inject('$phoneToDashes')
const myAccListAPI = '/json/banking/myAccList.json'
const phoneBookAPI = '/json/global/phoneBook.json'
const emit = defineEmits(['runEmits'])
const props = defineProps(['transInfo'])

const transInfo = reactive({
    accCount: 1,
    bankCode: '263', // 내계좌 기관코드 최초 정보 로드 시 현대차 증권 코드로 호출
    bankAccNumber: '', // 내계좌번호
    retainedAmount: '', // 출금가능금액(잔고) - 소액대출통장의 경우에 따라 변경여지 있음
    isPassed: false, // 비밀번호 입력확인 여부
    selectAccType: 'accNumber', // 계좌번호 휴대폰 선택 accNumber, celphone
    bankAccTypeCode: '00', // 계좌종류 코드 *현재 03을 임시로 연금계좌로 설정
    availableCode: '00', // 계좌 상태 코드 00(정상) / 01(우편물반송계좌) / 02(장기미사용계좌) / 03(비활동계좌, CDD 정보 없을 경우 노출) / 04(실명미확인 계좌)
    isDesignated: true, // 입금미지정계좌여부
    isDelayTrans: false,
    sendAccInfo: [
        {
            ownerName: '', // 계좌주명
            bankCode: '', // 송부은행코드
            bankAccNumber: '', // 송금계좌번호
            isSaved: '', // 자주찾는 계좌여부
            isQuick: '', // 퀵계좌 여부
            isPhoneNumber: false // 휴대폰으로 이체 여부
        }
    ],
    phoneSearchKeyWord: '', // 검색용 키워드
    phoneBookList: new Array(0), // 전체 연락처 리스트
    phoneBookSearchResult: new Array(0) // 화면 출력용 리스트
})

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 계좌 선택 타입 변경
const selectAccType = (types) => {
    transInfo.selectAccType = types
    if(types === 'accNumber') {
        runComp(selectTransAccList)
    } else {
        closeComponent(true)
        if(props.transInfo.isConnectPhoneBook) {
            if(transInfo.phoneBookList.length === 0) {
                getPhoneBookLists()
            }
        } else {
            runComp(modalAccessRights)
        }
    }
}

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

// 컴포넌트 실행 전체
const runComp = (comps, directInput) => {
    // markRaw뒤에 컴포넌트 명 입력
    // 현재 실행중인 컴포넌트 중복 방지
    if(componentsInfo.compName !== null || componentsInfo.compOption !== null) {
        closeComponent(true)
    }
    if(comps === regAccPassword) {
        // 계좌 비밀번호 입력 prop으로 인해 별도 실행처리
        if(!transInfo.isPassed) {
            componentsInfo.compName = markRaw(regAccPassword)
            componentsInfo.compOption = {
                bankCode: transInfo.bankCode,
                bankAccNumber: transInfo.bankAccNumber
            }
        }
    } else if(comps === regName) {
        transInfo.sendAccInfo[0].bankAccNumber = directInput
        componentsInfo.compName = markRaw(regName)
        componentsInfo.compOption = { type: 'realName' }
    } else {
        componentsInfo.compName = markRaw(comps)
    }
}

// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === regAccPassword) {
        // 계좌 비밀번호 입력 결과 리턴
        if(returnVals) {
            transInfo.isPassed = returnVals.isPassed // 비밀번호 입력 성공 여부
            // 패스워드 자동 저장체크
            if(returnVals.isPasswordSave) {
                console.log('저장함수 호출')
            }
            // 계좌 오류 코드에 따른 리턴
            checkAvailable()
        } else {
            closeComponent()
            transInfo.isPassed = false
        }
    } else if(comps === selectMyAccList) {
        // 내 계좌번호 선택 리턴
        if(returnVals) {
            transInfo.bankCode = returnVals.bankCode
            transInfo.bankAccNumber = returnVals.bankAccNumber
            transInfo.bankAccName = returnVals.bankAccName
            transInfo.retainedAmount = returnVals.retainedAmount
            transInfo.isPassed = returnVals.isPassed
            transInfo.bankAccTypeCode = returnVals.bankAccTypeCode
            transInfo.availableCode = returnVals.availableCode
            transInfo.isDesignated = returnVals.isDesignated
            transInfo.isDelayTrans = returnVals.isDelayTrans
            if(!transInfo.isPassed) {
                runComp(regAccPassword)
            } else {
                checkAvailable()
            }
        } else {
            closeComponent()
        }
    } else if(comps === selectTransAccList || comps === regAccNumber) {
        // 계좌선택 혹은 직접 계좌 입력 시
        if(returnVals !== false) {
            const ownerName = returnVals.ownerName === true ? props.transInfo.userName : returnVals.ownerName
            const bankAccName = returnVals.bankAccName ? returnVals.bankAccName : ''
            transInfo.sendAccInfo[0].ownerName = ownerName
            transInfo.sendAccInfo[0].bankCode = returnVals.bankCode
            transInfo.sendAccInfo[0].bankAccNumber = returnVals.bankAccNumber
            transInfo.sendAccInfo[0].bankAccName = bankAccName
            transInfo.sendAccInfo[0].isSaved = returnVals.isSaved
            transInfo.sendAccInfo[0].isQuick = returnVals.isQuick
            transInfo.sendAccInfo[0].isPhoneNumber = false
            // 금액입력으로 이동
            regPrice()
        } else {
            runComp(selectTransAccList)
        }
        // 송부계좌 선택
    } else if(comps === regName) {
        // 연락처 실명입력
        if(returnVals === false) {
            transInfo.sendAccInfo[0].bankAccNumber = ''
            closeComponent()
        } else {
            transInfo.sendAccInfo[0].ownerName = returnVals.returnName
            transInfo.sendAccInfo[0].bankCode = ''
            transInfo.sendAccInfo[0].isPhoneNumber = true
            transInfo.sendAccInfo[0].isSaved = false
            transInfo.sendAccInfo[0].isQuick = false
            // 금액입력으로 이동
            regPrice()
        }
    } else if(comps === modalMailReturn || comps === modalTransferBan || comps === modalCustconfirmDuty) {
        // 오류코드 01, 02, 03
        closeComponent(true)
        if(transInfo.accCount !== 1) {
            runComp(selectMyAccList)
        } else {
            transInfo.isPassed = false
        }
    } else if(comps === modalRealNameUnknown || comps === modalSetDepositAcct) {
        console.log(returnVals)
        // 오류코드 04 / 인증계좌오류
        closeComponent(true)
        if(typeof (returnVals) === 'boolean') {
            if(returnVals === false) {
                if(transInfo.accCount !== 1) {
                    runComp(selectMyAccList)
                } else {
                    transInfo.isPassed = false
                }
            } else {
                if(!transInfo.isPassed) {
                    runComp(regAccPassword)
                } else {
                    runComp(selectTransAccList)
                }
            }
        } else {
            transInfo.bankCode = returnVals.bankCode
            transInfo.bankAccNumber = returnVals.bankAccNumber
            transInfo.bankAccName = returnVals.bankAccName
            transInfo.retainedAmount = returnVals.retainedAmount
            transInfo.isPassed = returnVals.isPassed
            transInfo.bankAccTypeCode = returnVals.bankAccTypeCode
            transInfo.availableCode = returnVals.availableCode
            transInfo.isDesignated = returnVals.isDesignated
            if(!transInfo.isPassed) {
                runComp(regAccPassword)
            } else {
                checkAvailable()
            }
        }
    } else if(comps === modalAccessRights) {
        selectAccType('accNumber')
    } else {
        closeComponent()
    }
}

// 오류코드 모달 호출
const checkAvailable = () => {
    let rerunComps = null
    if(transInfo.availableCode === '00' && transInfo.isDesignated && transInfo.selectAccType === 'accNumber') {
        // 정상
        rerunComps = selectTransAccList
    } else if(transInfo.availableCode === '00' && !transInfo.isDesignated) {
        // 입금 미지정 계좌
        rerunComps = modalSetDepositAcct
    } else {
        switch (transInfo.availableCode) {
        case '01': rerunComps = modalMailReturn; break // 우편물 반송리턴
        case '02': rerunComps = modalTransferBan; break // 장기미사용자 노출
        case '03': rerunComps = modalCustconfirmDuty; break // 비활동계좌, CDD 정보 없을 경우 노출
        case '04': rerunComps = modalRealNameUnknown; break // 실명미확인 계좌
        default : rerunComps = selectTransAccList
        }
    }
    runComp(rerunComps)
}


// 연락처 목록 가져오기
const getPhoneBookLists = () => {
    $axios.get(phoneBookAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                transInfo.phoneBookList = res.data.phoneBookList
                transInfo.phoneBookSearchResult = res.data.phoneBookList
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
// 연락처 검색
const doSearchPhone = (target) => {
    if(typeof (target) === 'string') {
        transInfo.phoneSearchKeyWord = document.getElementById(target).value
    }
    // 화면 확인 진행용
    // 검색 시 phoneBookList는 유지 phoneBookSearchResult를 통해 화면에 표기된다.
    if(transInfo.phoneSearchKeyWord === '') {
        transInfo.phoneBookSearchResult = transInfo.phoneBookList
    } else {
        transInfo.phoneBookSearchResult = []
    }
}

// 금액 입력으로 이동
const regPrice = () => {
    const propTransInfo = {
        bankCode: transInfo.bankCode,
        bankAccNumber: transInfo.bankAccNumber,
        bankAccTypeCode: transInfo.bankAccTypeCode,
        availableCode: transInfo.availableCode,
        isDesignated: transInfo.isDesignated,
        sendAccInfo: [
            {
                ownerName: transInfo.sendAccInfo[0].ownerName,
                bankCode: transInfo.sendAccInfo[0].bankCode,
                bankAccNumber: transInfo.sendAccInfo[0].bankAccNumber,
                isPhoneNumber: transInfo.sendAccInfo[0].isPhoneNumber,
                isSaved: transInfo.sendAccInfo[0].isSaved,
                isQuick: transInfo.sendAccInfo[0].isQuick,
                sendPrice: ''
            }
        ]
    }
    emit('runEmits', propTransInfo)
}

// 최초 실행 시 기본 계좌 조회 및 페이지정보 확보
const preRun = () => {
    $axios.get(myAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 최초 실행시 내 계좌 개수 및 최초 선택 계좌 데이터 세팅
                const hmsecAcc = res.data.accList.filter(el => el.bankCode === '263')
                transInfo.accCount = hmsecAcc.length
                transInfo.bankCode = '263'
                transInfo.isDesignated = hmsecAcc[0].isDesignated
                transInfo.bankAccNumber = hmsecAcc[0].bankAccNumber
                transInfo.retainedAmount = hmsecAcc[0].retainedAmount
                transInfo.isDesignated = hmsecAcc[0].isDesignated
                transInfo.bankAccTypeCode = hmsecAcc[0].bankAccTypeCode
                transInfo.bankAccName = hmsecAcc[0].bankAccName
                transInfo.availableCode = hmsecAcc[0].availableCode
                transInfo.isPassed = hmsecAcc[0].isPassed
                if(transInfo.accCount === 1 && !transInfo.isPassed) {
                    // 내 계좌가 1개이고 비밀번호 입력이 필요할 시
                    runComp(regAccPassword)
                } else if(transInfo.isPassed && transInfo.selectAccType === 'accNumber') {
                    // 내 계좌가 비밀번호 인증되었고 계좌번호로 실행했을 시
                    // runComp(selectTransAccList)
                    checkAvailable()
                } else if(transInfo.isPassed && transInfo.selectAccType === 'celphone') {
                    // 내 계좌가 비밀번호 인증되었고 휴대폰으로 화면 진입시 - 불가상황 (에러방지)
                    if(!props.transInfo.isConnectPhoneBook) {
                        runComp(modalAccessRights)
                    } else {
                        getPhoneBookLists()
                    }
                }
            } else {
                console.log('에러상황')
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
preRun()

</script>

<style lang="postcss" scoped>
    #accTransfer {
        height: calc(100% - 50%)
    }
    section {
        background-color: var(--tableTitleBg);
    }
    /* 증권사 선택 */
    .selectBank {
        box-shadow: inset 0 4px 20px -20px rgba(0,0,0,0.8);
        padding: 20px 20px 0;
        & > button {
            width: 100%;
            padding: 0 0 0 12px; margin-bottom: 8px ;
            background: var(--white) url('@/assets/images/global/arrow_black.png') no-repeat right 6px center / 24px auto;
            text-align: left; color: rgba(173, 173, 173, 1); font-weight: 400;
        }
        & > label {
            display: block; position: relative;
            & input[type="text"] {
                width: 100%;
            }
            & button.buttonSearch {
                position: absolute; display: block !important;
                top: 0; right: 0; width: 50px; height: 50px;
                border-radius: 6px;
                background: transparent url('@/assets/images/global/button_search.png') no-repeat center / 15px;
            }
        }
    }
    .phoneBook {
        overflow: auto;
        height: calc(100% - 212px);
        margin-top: 20px;
        background-color: rgba(255,255,255,1);
        & ul {
            list-style: none;
            padding: 8px 0 0 0; margin: 0;
            & li {
                overflow: hidden; position: relative;
                width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                & a {
                    display: block; float: left;
                    width: calc(100% - 20px);
                    padding: 10px 0 12px;
                    text-decoration: none;
                    & img, & > span {
                        position: absolute;
                        top: 16px; width: 36px;
                    }
                    & h1, & p {
                        margin: 0; padding: 0 0 0 52px;
                    }
                    & h1 {
                        margin-bottom: 2px;
                        font-size: 1.143rem; color: var(--black); font-weight: 500;
                    }
                    & p {
                        font-size: 1rem; color: var(--fontLightgray)
                    }
                    & img {
                        position: absolute;
                        top: 16px; width: 36px;
                    }
                }
            }
        }
    }

</style>