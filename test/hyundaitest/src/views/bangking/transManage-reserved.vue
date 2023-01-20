<template>
    <div>
        <!--예약이체관리-->
        <section id="reservedTransfer">
            <!--pw 입력여부 .off(미입력) / 계좌개수 체크 .hasOne(1개일때)-->
            <div class="selectBankingMyAcc"
                :class="{ 'hasOne' : transInfo.accCount === 1, 'off': !transInfo.isPassed }">
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
                    </p>
                    <h2>{{ transInfo.bankCode === '263' ? $hmsecToDash(transInfo.bankAccNumber) : transInfo.bankAccNumber }}</h2>
                </button>
            </div>
            <template v-if="transInfo.isPassed">
                <!-- 날짜별 예약이체-->
                <ul class="dateList noList" v-if="transInfo.transferBydate.length == 0">
                    <li>
                        <p>예약이체 내역이 없습니다.</p>
                        <div></div>
                    </li>
                </ul>
                <template v-else>
                    <div v-for="(dateNum , index) in transInfo.transferBydate" :key="index">
                        <h5>{{ dateNum.transferDate }}</h5>
                        <ul class="productList">
                            <li v-for=" (infoList, index) in dateNum.transferInfo" :key="index">
                                <!-- 예금주 정보-->
                                <ol class="simpleBox">
                                    <li>
                                        <h1>{{ infoList.ownerName }}</h1>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="runModal(modalResTranslnfo)">
                                            {{ $codeToBank(infoList.bankCode).korName }}
                                            {{ infoList.bankCode === '263' ? $hmsecToDash(infoList.bankAccNumber) : infoList.bankAccNumber }}
                                        </a>
                                    </li>
                                    <li>
                                        <span>
                                            이체기간 {{ infoList.reserveDateFrom }} ~ {{ infoList.reserveDateTo }}
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            예약시간 {{ infoList.reserveTime === 'am' ? '오전(9:30)' : '오후(3:50)' }}
                                        </span>
                                    </li>
                                    <li class="right">
                                        <span>
                                            수수료
                                            {{ infoList.feePrice === '0' ? '-' :  $priceToCommas(infoList.feePrice) + '원'}}
                                        </span>
                                    </li>
                                    <li class="right">
                                        <h2>이체금액<strong>{{$priceToCommas(infoList.sendPrice)}}</strong></h2>
                                    </li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                </template>
                <!-- 이체정보관련 버튼 -->
                <div class="right circleStBtnArea">
                    <!-- 이체추가 -->
                    <button class="icoPlus right" @click="moveToAccTrans()"><span>예약이체 추가하기</span></button>
                </div>
            </template>
        </section>
        <component :is="componentsInfo.compName"
            :options="componentsInfo.compOption"
            @runEmits="closeComp"/>
    </div>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import modalResTranslnfo from '@/components/banking/modalResTransManage-result.vue' // 예약이체 상세 내역 풀팝업
import modalResTransferNote from '@/components/banking/modalResTransferNote.vue' // 예약이체 안내 팝업 (예약 옵션 내 예약이체 안내 버튼)
import regAccPassword from '@/components/banking/regAccPassword.vue' // 비밀번호 입력
import selectMyAccList from '@/components/banking/selectMyAccList.vue' // 내 계좌선택

const $router = useRouter()
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const myAccListAPI = '/json/banking/myAccList.json'
const reserveTransAPI = '/json/banking/myReserveTransList.json'

const transInfo = reactive({
    accCount: 1,
    bankCode: '263', // 내계좌 기관코드 최초 정보 로드 시 현대차 증권 코드로 호출
    bankAccNumber: '',
    isPassed: false, // 비밀번호 입력확인 여부
    retainedAmount: 0,
    transferBydate: [
        {
            transferDate: '', // 날짜
            transferInfo: [ // 날짜별 예약이체 목록
                {
                    ownerName: '', // 계좌주명
                    bankCode: '', // 송부은행코드
                    bankAccNumber: '', // 계좌번호
                    reserveDateFrom: '', // 예약기간 시작
                    reserveDateTo: '', // 예약기간 끝
                    reserveTime: 'am', // 예약시간 am(오전 (9:30)) / pm(오후 (15:50))
                    feePrice: 0, // 수수료
                    sendPrice: 0 // 이체금액
                }
            ]
        }
    ]
})

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null,
    emits: null
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
    // markRaw뒤에 컴포넌트 명 입력
    // 현재 실행중인 컴포넌트 중복 방지
    if(componentsInfo.compName !== null || componentsInfo.compOption !== null) {
        closeComponent(true)
    }
    componentsInfo.compName = markRaw(comps)
    if(comps === regAccPassword) {
        // 계좌 비밀번호 입력 prop으로 인해 별도 실행처리
        if(!transInfo.isPassed) {
            componentsInfo.compOption = {
                bankCode: transInfo.bankCode,
                bankAccNumber: transInfo.bankAccNumber
            }
        }
    } else if(comps === modalResTranslnfo) {
        componentsInfo.compOption = {
            bankCode: transInfo.bankCode,
            bankAccNumber: transInfo.bankAccNumber
        }
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
            getResTransList() // 예약이체 목록 호출
            closeComponent()
            // 패스워드 자동 저장체크
            if(returnVals.isPasswordSave) {
                console.log('저장함수 호출')
            }
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
                getResTransList() // 예약이체 목록 호출
                closeComponent()
            }
        } else {
            closeComponent()
        }
    } else {
        closeComponent()
        // getResTransList()
    }
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
                transInfo.bankAccNumber = hmsecAcc[0].bankAccNumber
                transInfo.bankAccTypeCode = hmsecAcc[0].bankAccTypeCode
                transInfo.bankAccName = hmsecAcc[0].bankAccName
                transInfo.isPassed = hmsecAcc[0].isPassed
                if(transInfo.accCount === 1 && !transInfo.isPassed) {
                    // 내 계좌가 1개이고 비밀번호 입력이 필요할 시
                    runComp(regAccPassword)
                } else if (transInfo.isPassed) {
                    getResTransList()
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

// 예약이체 목록 가져오기
const getResTransList = () => {
    $axios.get(reserveTransAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                transInfo.transferBydate = res.data.transList // 날짜별
                transInfo.transferBydate.transferInfo = res.data.transList.transferInfo // 해당날짜 예약이체 목록
            }
        })
}
// 예약이체추가
const moveToAccTrans = () => {
    $router.push({ name: 'accountTransfer' })
}
// 모달
const runModal = (comps) => {
    // markRaw뒤에 컴포넌트 명 입력
    componentsInfo.compName = markRaw(comps)
    componentsInfo.emits = consoleValue
}
const consoleValue = (returnVals) => {
    console.log(returnVals)
    closeComponent()
}
</script>
<style lang="postcss" scoped>
#reservedTransfer { min-height: calc(100% - 50px); }
.productList {
    & h1, & a {
        font-size: 1.143rem !important;
    }
    & a {
        width: 100%;
        padding: 0; margin: 0; background: url('@/assets/images/global/arrow_right_s20.png') no-repeat right center / 20px;
        color: inherit; text-decoration: none;
    }
    & h2 {
        margin: 0; padding: 0;
        font-size: 1rem; font-weight: 400;
        & strong {
            padding-left: 4px;
            font-size: 1.429rem; font-weight: 700; line-height: 1.25;
        }
    }
    & .right > span { font-size: 0.857rem; line-height: 1.25;  }
}
.circleStBtnArea { padding: 18px 0; margin: 0 20px; border-top: 1px solid var(--listBorder); }
</style>