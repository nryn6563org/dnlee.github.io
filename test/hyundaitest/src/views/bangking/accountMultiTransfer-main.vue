<template>
<div>
    <!-- 다계좌이체홈 -->
    <section id="multiTrMain">
        <!-- 계좌정보-->
        <!--pw 입력여부 .off(미입력) / 계좌개수 체크 .hasOne(1개일때)-->
        <div class="selectBankingMyAcc" :class="{ 'hasOne': transInfo.accCount === 1, 'off': !transInfo.isPassed }">
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
                <!-- 계좌번호 -->
                <p>
                    {{ $codeToBank(transInfo.bankCode).korName }}
                    {{ transInfo.bankCode === '263' ? $hmsecToDash(transInfo.bankAccNumber) : transInfo.bankAccNumber }}
                </p>
                <!-- 계좌 금액정보 -->
                <h2>{{ $priceToCommas(transInfo.retainedAmount) }}원</h2>
            </button>
        </div>
        <!-- 계좌리스트 영역-->
        <!-- <article> -->
        <!-- 토탈 이체건수 -->
        <div class="TransTotalArea"
            v-if="transInfo.isPassed">
            <h1>총<strong>{{ transInfo.sendAccInfo.length }}</strong>건</h1>
            <div>
                <strong>
                    {{ $priceToCommas(priceTotal()) }}원
                </strong>
                <span>출금가능금액 {{ $priceToCommas(transInfo.totalRetained) }}원</span>
            </div>
        </div>
        <!-- 계좌 리스트 -->
        <template v-if="transInfo.isPassed">
            <ul class="accList delete" :class="{ 'noList': transInfo.sendAccInfo.length === 0 }">
                <!-- 0건일 경우 .noList -->
                <li v-if="transInfo.sendAccInfo.length === 0">
                    <p>등록된 이체 건이 없습니다.</p>
                    <button type="button"
                        @click="runComp(selectTransMultiAccList)">계좌추가</button>
                </li>
                <template v-else>
                    <li v-for="(accList,index) in transInfo.sendAccInfo" :key="index">
                        <!-- 예금주 정보 -->
                        <a href="javascript:;">
                            <button class="del" type="button"
                                @click="deleteList(accList)">삭제</button>
                            <img :src="'/images/logos/' + accList.bankCode + '.png'"
                                :alt="$codeToBank(accList.bankCode).korName + ' 로고'" />
                            <h2>{{ accList.ownerName }}
                                <span class="fontPointBlue"
                                    v-if="accList.sendPrice !== ''">{{ accList.sendPrice }}원</span>
                            </h2>
                            <p>
                                {{ $codeToBank(accList.bankCode).korName }}
                                {{ accList.bankCode === '263' ? $hmsecToDash(accList.bankAccNumber) : accList.bankAccNumber }}
                            </p>
                        </a>
                        <!-- 계좌 삭제버튼 -->
                    </li>
                </template>
                <!-- 각 계좌별 금액입력 완료 된 리스트 -->
            </ul>
            <!-- 이체정보관련 버튼 / .noList 일경우 미노출-->
            <div class="circleStBtnArea right" v-if="transInfo.sendAccInfo.length !== 0">
                <button class="icoPlus right"
                    @click="runComp(selectTransMultiAccList)"
                    ><span>계좌 추가</span>
                </button>
            </div>
        </template>
        <!-- </article> -->
    </section>
    <!-- 하단 이체하기 .noList 일경우 미노출-->
    <div class="buttonArea" v-if="transInfo.sendAccInfo.length !== 0">
        <button class="h50 pointBlue"
        @click="doConfirm()">등록된 <span>{{ transInfo.sendAccInfo.length }}건</span>이체하기</button>
    </div>
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
import selectTransMultiAccList from '@/components/banking/selectTransMultiAccList.vue' // 출금계좌 선택
import modalMailReturn from '@/components/banking/modalMailReturn.vue' // 비밀번호 입력 후 -> 우편물 수취 확인 미진행 계좌 | availableCode: 01
import modalTransferBan from '@/components/banking/modalTransferBan.vue' // 비밀번호 입력 후 -> 장기미사용자 노출 | availableCode: 02
import modalCustconfirmDuty from '@/components/banking/modalCustconfirmDuty.vue' // 비밀번호 입력 후 ->  비활동계좌, CDD 정보 없을 경우 노출 | availableCode: 03
import modalRealNameUnknown from '@/components/banking/modalRealNameUnknown.vue' // 비밀번호 입력 후 -> 실명미확인 계좌일 경우 노출 | availableCode: 04
import modalSetDepositAcct from '@/components/banking/modalSetDepositAcct.vue' // 비밀번호 입력 후 -> 입금계좌 지정신청된 계좌일 때 노출 | availableCode: 05

const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const myAccListAPI = '/json/banking/myAccList.json'
const myAccInfoAPI = '/json/banking/myAccInfo.json'
const emit = defineEmits(['runEmits'])
const props = defineProps(['transInfo'])

const transInfo = reactive({
    accCount: 1,
    bankCode: props.transInfo.bankCode, // 내계좌 기관코드 최초 정보 로드 시 현대차 증권 코드로 호출
    bankAccNumber: props.transInfo.bankAccNumber, // 내계좌번호
    bankAccName: props.transInfo.bankAccName, // 내계좌번호
    retainedAmount: props.transInfo.retainedAmount, // 출금가능금액(잔고) - 소액대출통장의 경우에 따라 변경여지 있음
    totalRetained: 0, // 소액대출일 시 총 계좌 잔고 노출 - 화면용
    isPassed: props.transInfo.isPassed, // 비밀번호 입력확인 여부
    bankAccTypeCode: props.transInfo.bankAccTypeCode, // 계좌종류 코드 *현재 03을 임시로 연금계좌로 설정
    availableCode: props.transInfo.availableCode, // 계좌 상태 코드 00(정상) / 01(우편물반송계좌) / 02(장기미사용계좌) / 03(비활동계좌, CDD 정보 없을 경우 노출) / 04(실명미확인 계좌)
    isDesignated: props.transInfo.isDesignated, // 입금미지정계좌여부
    isDelayTrans: props.transInfo.isDelayTrans,
    sendAccInfo: props.transInfo.sendAccInfo // 송부 계좌목록 - 형태는 accountTransfer.vue 참조
})

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
            componentsInfo.compName = markRaw(comps)
            componentsInfo.compOption = {
                bankCode: transInfo.bankCode,
                bankAccNumber: transInfo.bankAccNumber
            }
        }
    } else if(comps === selectMyAccList) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = {
            bankCode: transInfo.bankCode,
            bankAccNumber: transInfo.bankAccNumber
        }
    } else if(comps === selectTransMultiAccList) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = transInfo.sendAccInfo
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
    } else if(comps === selectTransMultiAccList) {
        if(typeof returnVals === 'boolean') {
            if(returnVals === true) {
                closeComponent(true)
                runComp(regAccNumber)
            } else {
                closeComponent()
            }
        } else {
            closeComponent()
            const saveData = transInfo.sendAccInfo
            if (saveData.length === 0) {
                transInfo.sendAccInfo = returnVals
            } else {
                // 중복계좌 체크 후 추가하기
                for(const i in returnVals) {
                    if(saveData.filter(arr => arr.bankCode === returnVals[i].bankCode && arr.bankAccNumber === returnVals[i].bankAccNumber).length === 0) {
                        transInfo.sendAccInfo.push(returnVals[i])
                    }
                }
                // 선택 삭제된 계좌 체크 후
                for(const i in saveData) {
                    if(returnVals.filter(arr => arr.bankCode === returnVals[i].bankCode && arr.bankAccNumber === returnVals[i].bankAccNumber).length === 0) {
                        transInfo.sendAccInfo.splice(i, 1)
                    }
                }
            }
            if(transInfo.sendAccInfo.length !== 0) {
                emit('runEmits', transInfo)
            }
        }
    } else if(comps === modalMailReturn || comps === modalTransferBan || comps === modalCustconfirmDuty) {
        // 오류코드 01, 02, 03
        if(transInfo.accCount !== 1) {
            runComp(selectMyAccList)
        } else {
            transInfo.isPassed = false
        }
    } else if(comps === modalRealNameUnknown || comps === modalSetDepositAcct) {
        console.log(returnVals)
        // 오류코드 04 / 인증계좌오류
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
                    runComp(selectTransMultiAccList)
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
    } else if(comps === regAccNumber) {
        console.log(returnVals)
        if(returnVals !== false) {
            const addAcc = {}
            const addData = {
                bankCode: returnVals.bankCode,
                bankAccNumber: returnVals.bankAccNumber,
                ownerName: returnVals.ownerName,
                sendPrice: ''
            }
            Object.assign(addAcc, addData)
            transInfo.sendAccInfo.push(addAcc)
            console.log(transInfo)
            emit('runEmits', transInfo)
        } else {
            closeComponent()
        }
    } else {
        closeComponent()
    }
}

// 오류코드 모달 호출
const checkAvailable = () => {
    let rerunComps = null
    if(transInfo.availableCode === '00' && transInfo.isDesignated) {
        // 정상
        closeComponent()
        getMyAccDetail()
    } else if(transInfo.availableCode === '00' && !transInfo.isDesignated) {
        // 입금 미지정 계좌
        rerunComps = modalSetDepositAcct
        runComp(rerunComps)
    } else {
        switch (transInfo.availableCode) {
        case '01': rerunComps = modalMailReturn; break // 우편물 반송리턴
        case '02': rerunComps = modalTransferBan; break // 장기미사용자 노출
        case '03': rerunComps = modalCustconfirmDuty; break // 비활동계좌, CDD 정보 없을 경우 노출
        case '04': rerunComps = modalRealNameUnknown; break // 실명미확인 계좌
        default : rerunComps = selectTransMultiAccList
        }
        runComp(rerunComps)
    }
}

// 금액 입력으로 이동
const doConfirm = () => {
    emit('runEmits', true)
}

// 계좌 내 출금액 전체 조회
const priceTotal = () => {
    const target = transInfo.sendAccInfo
    let totalPrice = 0
    for (const i in target) {
        totalPrice += target[i].sendPrice
    }
    return totalPrice
}
// 선택계좌 삭제
const deleteList = (target) => {
    transInfo.sendAccInfo.splice(transInfo.sendAccInfo.indexOf(target), 1)
}

// 내계좌 출금금액 상세(대출가능액 포함)
// 기획상 정책 없음 - 일반 계좌일 시 잔고, 대출계좌일 시 잔고, 대출가능액 - 후 출금 가능액과 비교
const getMyAccDetail = () => {
    $axios.get(myAccInfoAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                transInfo.totalRetained = res.data.accInfo.possibleAmount
                if(res.data.accInfo.isLoanAcc) {
                    transInfo.totalRetained += res.data.accInfo.loanLimit
                }
                if(transInfo.totalRetained > res.data.accInfo.remainingLimit) {
                    transInfo.totalRetained = res.data.accInfo.remainingLimit
                }
            }
        })
        .catch(function(err) {
            // API 오류시
            console.log(err)
        })
}

// 최초 실행 시 기본 계좌 조회 및 페이지정보 확보
const preRun = () => {
    if(transInfo.bankCode !== '' && transInfo.bankAccNumber !== '') {
        transInfo.accCount = props.transInfo.accCount
        transInfo.bankCode = props.transInfo.bankCode
        transInfo.bankAccNumber = props.transInfo.bankAccNumber
        transInfo.bankAccName = props.transInfo.bankAccName
        transInfo.retainedAmount = props.transInfo.retainedAmount
        transInfo.isDesignated = props.transInfo.isDesignated
        transInfo.bankAccTypeCode = props.transInfo.bankAccTypeCode
        transInfo.availableCode = props.transInfo.availableCode
        transInfo.isPassed = props.transInfo.isPassed
        transInfo.isDelayTrans = props.transInfo.isDelayTrans
        if(transInfo.accCount === 1 && !transInfo.isPassed) {
            runComp(regAccPassword)
        } else {
            checkAvailable()
        }
    } else {
        $axios.get(myAccListAPI, {})
            .then(function(res) {
                if(res.data.affective === 200) {
                    const hmsecAcc = res.data.accList.filter(el => el.bankCode === '263')
                    if(transInfo.bankAccNumber !== '') {
                        transInfo.accCount = hmsecAcc.length
                        getMyAccDetail()
                    } else {
                        // 최초 실행시 내 계좌 개수 및 최초 선택 계좌 데이터 세팅
                        transInfo.accCount = hmsecAcc.length
                        transInfo.bankCode = '263'
                        transInfo.bankAccNumber = hmsecAcc[0].bankAccNumber
                        transInfo.bankAccName = hmsecAcc[0].bankAccName
                        transInfo.retainedAmount = hmsecAcc[0].retainedAmount
                        transInfo.isDesignated = hmsecAcc[0].isDesignated
                        transInfo.bankAccTypeCode = hmsecAcc[0].bankAccTypeCode
                        transInfo.availableCode = hmsecAcc[0].availableCode
                        transInfo.isPassed = hmsecAcc[0].isPassed
                        transInfo.isDelayTrans = hmsecAcc[0].isDelayTrans
                        if(transInfo.accCount === 1 && !transInfo.isPassed) {
                            runComp(regAccPassword)
                        } else {
                            checkAvailable()
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
}
preRun()
</script>

<style lang="postcss" scoped>
#multiTrMain {
    overflow: auto;
    height: calc(100% - 50px);
    padding: 0 0 98px;
    box-sizing: border-box;
}
div.TransTotalArea {
    /* position: sticky;
    top: 0; z-index: 2; */
    & > div { text-align: right; }
}
ul.noList {
    height: calc(100% - 188px);
}
ul.accList:not(.noList) > li:last-child { border-bottom: 1px solid rgba(229, 229, 229, 1); }
div.circleStBtnArea.right {
    margin-top: 18px; margin-right: 20px;
}
</style>