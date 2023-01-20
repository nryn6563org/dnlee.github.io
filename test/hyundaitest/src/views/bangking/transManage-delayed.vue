<template>
    <div>
        <section id="delayedTransfer">
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
                    <!-- 계좌번호 -->
                    <p>
                        {{ $codeToBank(transInfo.bankCode).korName }}
                    </p>
                    <h2> {{ transInfo.bankCode === '263' ? $hmsecToDash(transInfo.bankAccNumber) : transInfo.bankAccNumber }}</h2>
                </button>
            </div>
            <template v-if="transInfo.isPassed">
                <!-- 탭메뉴 -->
                <div class="tabStyle04 h38 shadow">
                    <ul data-tabList="2">
                        <li :class="transInfo.selectTabMenu === 'wdCancel' ? 'on' : ''"
                            @click="selectTabMenu('wdCancel')">
                            <a href="javascript:;"
                                draggable="false">
                                지연이체 출금취소
                            </a>
                        </li>
                        <li :class="transInfo.selectTabMenu === 'change' ? 'on' : ''"
                            @click="selectTabMenu('change')">
                            <a href="javascript:;"
                                draggable="false">
                                신청/변경/해지
                            </a>
                        </li>
                    </ul>
                </div>
                <template v-if="transInfo.selectTabMenu === 'wdCancel'">
                    <!--처리상태 선택-->
                    <div class="controlArea">
                        <div class="tab">
                            <label for="all">
                                <input type="radio" id="all" name="delayedTransManage" value ="all" checked
                                @change="filterList($event)">
                                <div>전체</div>
                            </label>
                            <label for="incomplete">
                                <input type="radio" id="incomplete" name="delayedTransManage" value ="01"
                                @change="filterList($event)">
                                <div>미처리</div>
                            </label>
                            <label for="complete">
                                <input type="radio" id="complete" name="delayedTransManage" value ="00"
                                @change="filterList($event)">
                                <div>처리완료</div>
                            </label>
                            <label for="cancel">
                                <input type="radio" id="cancel" name="delayedTransManage" value ="02"
                                @change="filterList($event)">
                                <div>취소완료</div>
                            </label>
                        </div>
                    </div>
                    <ul class="noList" v-if="transInfo.delayTransList.length === 0">
                        <li>
                            <p>최근 입금계좌가 없습니다.</p>
                            <div></div>
                        </li>
                    </ul>
                    <ul v-else class="productList">
                        <li v-for="(lists, index) in transInfo.filterData" :key="index">
                            <ol class="simpleBox">
                                <li>
                                    <span class="bullet"
                                        :class="statusArr.filter(el => el.code === lists.status)[0].class">
                                        {{ statusArr.filter(el => el.code === lists.status)[0].text }}
                                    </span>
                                </li>
                                <li>
                                    <h1>
                                        {{ $codeToBank(lists.bankCode).korName }}
                                        {{ lists.bankCode === '263' ? $hmsecToDash(lists.bankAccNumber) : lists.bankAccNumber }}
                                        {{ lists.ownerName }}
                                    </h1>
                                </li>
                                <li>
                                    <span>
                                        <span>
                                            처리일시
                                            {{ lists.completeDate }}
                                            <!-- 오전 오후에 대한 체크 값 개발시 논의 필요 -->
                                            {{ lists.completeTime }}
                                        </span>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        신청매체
                                        <!-- 신청매체에 대한 구분 정의 없어서 string으로 임시 처리 -->
                                        {{ lists.regdDevice }}
                                    </span>
                                </li>
                                <li class="right">
                                    <span>
                                        수수료
                                        {{ lists.feePrice === '0' ? '-' : $priceToCommas(lists.feePrice) }}
                                    </span>
                                </li>
                                <li class="right">
                                    <h2>
                                        이체금액
                                        <strong>{{ $priceToCommas(lists.sendPrice) }}</strong>
                                    </h2>
                                </li>
                                <li class="innerBtnBox" v-if="lists.status === '01'">
                                    <button type="button" class="lightBlue">이체 취소하기</button>
                                </li>
                            </ol>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <!-- tab2. 신청/변경/해지 .change-->
                    <ul class="productList">
                        <li v-for="(lists, index) in transInfo.myAccList" :key="index">
                            <ol class="simpleBox">
                                <li>
                                    <span class="bullet"
                                        :class="{ 'red': !lists.isDelayTrans }">
                                        {{ lists.isDelayTrans ? '등록' : '미등록' }}
                                    </span>
                                </li>
                                <li>
                                    <h1>
                                        {{ $codeToBank(lists.bankCode).korName }}
                                        {{ lists.bankCode === '263' ? $hmsecToDash(lists.bankAccNumber) : lists.bankAccNumber }}
                                        {{ lists.ownerName }}
                                    </h1>
                                </li>
                                <template v-if="lists.isDelayTrans">
                                    <li>
                                        <span>
                                            등록일
                                            {{lists.isDelayTranInfo.updateDate}}
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            은행이체약정여부
                                            {{ lists.isContract ? '약정' : '미약정' }}
                                        </span>
                                    </li>
                                    <li class="right">
                                        <span>
                                            수수료
                                            {{ lists.feePrice === '0' ? '-' : $priceToCommas(lists.feePrice) }}
                                        </span>
                                    </li>
                                    <li class="right">
                                        <span>지연이체금액<strong>{{$priceToCommas(lists.isDelayTranInfo.transLimitPrice)}}원</strong></span>
                                    </li>
                                    <li class="innerBtnBox">
                                        <button type="button" class="lightBlue"
                                            @click="doFinish()">해지하기</button>
                                        <button type="button" class="borderBlue"
                                            @click="runComp(reSelect, 'regChange')">변경하기</button>
                                    </li>
                                </template>
                                <template v-else>
                                    <template v-if="lists.isDelayTranInfo !== null">
                                        <li>
                                            <span>
                                                해지일
                                                {{ lists.isDelayTranInfo.updateDate }}
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                은행이체약정여부
                                                {{ lists.isContract ? '약정' : '미약정' }}
                                            </span>
                                        </li>
                                    </template>
                                    <li class="innerBtnBox">
                                        <button type="button" class="borderBlue"
                                            @click="runComp(regAccPassword, 'regDelay')">등록하기</button>
                                    </li>
                                </template>
                            </ol>
                        </li>
                    </ul>
                </template>
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
import modalDelayTransSvcInfo from '@/components/banking/modalDelayTransSvcInfo.vue' //  지연이체서비스 INFO Btn
import reSelect from '@/components/global/reSelect.vue' //  셀렉트 바텀시트
import modalUnregdDelayTransSvc from '@/components/banking/modalUnregdDelayTransSvc.vue' // 지연이체서비스 가입계좌가 아닌경우

const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const $toastMsg = inject('$toastMsg')
const $runAlert = inject('$runAlert')
const myAccListAPI = '/json/banking/myAccList.json' // 내계좌목록
const mydelayTransistAPI = '/json/banking/myDelayTransList.json' // 지연이체 목록
const emit = defineEmits(['runEmits'])
const props = defineProps(['transInfo'])

const transInfo = reactive({
    accCount: 1,
    bankCode: '263', // 내계좌 기관코드 최초 정보 로드 시 현대차 증권 코드로 호출
    bankAccNumber: '',
    isPassed: false, // 비밀번호 입력확인 여부
    isDelayTrans: false, // 지연이체 여부
    selectTabMenu: 'wdCancel', // tab Menu 선택 wdCancel , change
    myAccList: new Array(0),
    delayTransList: new Array(0),
    // [
    //     {
    //         status: '', // 01미처리 , 02처리완료 , 03취소완료
    //         ownerName: '', // 입금자명
    //         bankCode: '', // 입금은행코드
    //         bankAccNumber: '', // 입금은행 계좌
    //         completeDate: '', // 처리 날짜
    //         completeTime: '', // 오전am 오후 pm
    //         regdDevice: '', // 신청매체
    //         reasonForCancle: '', // 취소사유
    //         feePrice: 0,
    //         sendPrice: 1000000
    //     }
    // ],
    filterData: new Array(0)
})
const statusArr = [
    { code: '00', text: '처리완료', class: 'red' },
    { code: '01', text: '미처리', class: 'bgRed' },
    { code: '02', text: '취소완료', class: 'red' }
]
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
    if(comps === regAccPassword) {
        console.log(directInput)
        // 계좌 비밀번호 입력 prop으로 인해 별도 실행처리
        if(!transInfo.isPassed) {
            componentsInfo.compName = markRaw(comps)
            componentsInfo.compOption = {
                bankCode: transInfo.bankCode,
                bankAccNumber: transInfo.bankAccNumber,
                type: directInput
            }
        } else {
            componentsInfo.compName = markRaw(comps)
            componentsInfo.compOption = {
                type: directInput
            }
        }
    } else if(comps === modalUnregdDelayTransSvc) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = {
            bankCode: transInfo.bankCode, // 기본전재는 현대차증권(263) 이지만 추후 확장위해서 전송
            bankAccNumber: transInfo.bankAccNumber
        }
    } else if(comps === reSelect) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = {
            title: '지연이체금액 설정',
            listData: [
                { listName: '100,000원 이상', listValue: 100000 },
                { listName: '1,000,000원 이상', listValue: 1000000 },
                { listName: '10,000,000원 이상', listValue: 10000000 }
            ],
            type: directInput
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
        if(componentsInfo.compOption.type !== 'regDelay') {
            if(returnVals) {
                transInfo.isPassed = returnVals.isPassed // 비밀번호 입력 성공 여부
                // 패스워드 자동 저장체크
                if(returnVals.isPasswordSave) {
                    console.log('저장함수 호출')
                }
                if(!returnVals.isDelayTrans) {
                    runComp(modalUnregdDelayTransSvc)
                    transInfo.delayTransList = new Array(0)
                } else {
                    getDelayTransList()
                }
            } else {
                closeComponent()
                transInfo.isPassed = false
            }
        } else {
            // 지연이체관리 등록시
            if(returnVals) {
                transInfo.isPassed = returnVals.isPassed // 비밀번호 입력 성공 여부
                // 패스워드 자동 저장체크
                if(returnVals.isPasswordSave) {
                    console.log('저장함수 호출')
                }
                runComp(reSelect, 'regChange')
            } else {
                closeComponent()
            }
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
            if(transInfo.accCount === 1 && !transInfo.isPassed) {
                // 내 계좌가 1개이고 비밀번호 입력이 필요할 시
                runComp(regAccPassword)
            } else if(transInfo.isPassed) {
                // 비밀번호 체크 후 지연이체 관리 계좌가 아닐 시
                if(!transInfo.isDelayTrans) {
                    getDelayTransList()
                } else {
                    transInfo.delayTransList = new Array(0)
                    runComp(modalUnregdDelayTransSvc)
                }
            } else {
                closeComponent()
            }
        } else {
            closeComponent()
        }
    } else if(comps === modalUnregdDelayTransSvc) {
        // 지연이체 계좌 설정
        if(returnVals === true) {
            runComp(reSelect)
        } else {
            // 등록 취소(종료) 시
            $toastMsg({ msg: '지연이체 계좌 등록을 취소하였습니다.' })
            transInfo.isPassed = false
            runComp(selectMyAccList)
        }
    } else if(comps === reSelect) {
        // 지연이체 계좌 설정 등록
        if(componentsInfo.compOption.type !== 'regChange') {
            if(returnVals !== false) {
                // 등록 성공 시
                $toastMsg({ msg: '지연이체 계좌에 등록되었습니다.' })
                // 이체 등록 실패시
                // $toastMsg('지연이체 계좌에 등록에 실패하였습니다.')
                closeComponent()
            } else {
                // 등록 취소(종료) 시
                $toastMsg({ msg: '지연이체 계좌 등록을 취소하였습니다.' })
                transInfo.isPassed = false
                runComp(selectMyAccList)
            }
        } else {
            if(returnVals !== false) {
                // 등록 성공 시
                $runAlert({ msg: '정상적으로 처리 되었습니다..' })
                // 이체 등록 실패시
                // $runAlert('지연이체 계좌에 등록에 실패하였습니다.')
                closeComponent()
            } else {
                // 등록 취소(종료) 시
                $toastMsg({ msg: '지연이체 계좌 변경을 취소하였습니다.' })
                closeComponent()
            }
        }
    } else {
        closeComponent()
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
                transInfo.isDesignated = hmsecAcc[0].isDesignated
                transInfo.bankAccNumber = hmsecAcc[0].bankAccNumber
                transInfo.retainedAmount = hmsecAcc[0].retainedAmount
                transInfo.isDesignated = hmsecAcc[0].isDesignated
                transInfo.bankAccTypeCode = hmsecAcc[0].bankAccTypeCode
                transInfo.bankAccName = hmsecAcc[0].bankAccName
                transInfo.availableCode = hmsecAcc[0].availableCode
                transInfo.isPassed = hmsecAcc[0].isPassed
                // 지연이체 등록여부 내 계좌목록 저장
                transInfo.myAccList = res.data.accList
                if(transInfo.accCount === 1 && !transInfo.isPassed) {
                    // 내 계좌가 1개이고 비밀번호 입력이 필요할 시
                    runComp(regAccPassword)
                } else if(transInfo.isPassed) {
                    // 비밀번호 체크 후 지연이체 관리 계좌가 아닐 시
                    if(!transInfo.isDelayTrans) {
                        getDelayTransList()
                    } else {
                        transInfo.delayTransList = new Array(0)
                        runComp(modalUnregdDelayTransSvc)
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
// 지연이체 탭메뉴 선택
const selectTabMenu = (menu) => {
    transInfo.selectTabMenu = menu
}
// 지연이체 목록 가져오기
const getDelayTransList = () => {
    $axios.get(mydelayTransistAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                transInfo.delayTransList = res.data.transList
                transInfo.filterData = res.data.transList
            }
        })
}
const filterList = (ev) => {
    if(ev.target.checked) {
        const filterCode = ev.target.value
        if(filterCode === 'all') {
            transInfo.filterData = transInfo.delayTransList
        } else {
            transInfo.filterData = transInfo.delayTransList.filter(arr => arr.status === filterCode)
        }
    }
}
// 지연이체 해지
const doFinish = () => {
    $runAlert({ msg: '정상적으로 해지 처리 되었습니다.' })
}
</script>
<style lang="postcss" scoped>
#delayedTransfer { min-height: calc(100% - 50px); height: calc(100% - 50px); }
.controlArea { padding-bottom: 0; }
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
    & .innerBtnBox { padding-top: 10px; }
}
.noList { height: calc(100% - 204px) }
</style>