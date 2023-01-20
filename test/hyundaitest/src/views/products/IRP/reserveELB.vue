<template>
<div>
    <!-- ELB-->
    <section>
        <!-- 계좌선택 -->
        <div class="selectMyAcc">
            <button type="button" class="select"
                @click="runComp(selectMyAccListInTypes)">
                {{ $codeToBank(pageInfo.bankCode).korName  + ' ' + $hmsecToDash(pageInfo.bankAccNumber) }}
            </button>
            <!-- 비밀번호 저장, 비밀번호 유효검토 완료 후 class에 'passed' 추가 -->
            <button type="button" :class="[pageInfo.isPassed ? 'passed' : '']"
                @click="runComp(regAccPassword)"></button>
        </div>
        <div class="tabStyle04 h38 shadow">
            <!--예약신청 reserve , 예약현황 status -->
            <ul data-tabList="2">
                <li class="widthS" :class="pageInfo.selectTabMenu === 'reserve' ? 'on' : ''"
                    @click="selectTabMenu('reserve'), $router.push({params: { type: 'reserve' } })">
                    <a href="javascript:;">예약신청</a>
                </li>
                <li class="widthS" :class="pageInfo.selectTabMenu === 'status' ? 'on' : ''"
                    @click="selectTabMenu('status'), $router.push({ params: { type: 'status' } })">
                    <a href="javascript:;">예약현황</a>
                </li>
            </ul>
        </div>
        <!-- 탭메뉴: 예약신청 -->
        <article v-if="pageInfo.selectTabMenu === 'reserve'"
            :class="pageInfo.itemList.length == 0 ? 'on' : ''">
            <template v-if="pageInfo.itemList.length == 0">
                <!-- 목록 없을 때 -->
                <ul class="noList">
                    <li>
                        <p>예약신청 중인 상품이 없습니다.</p>
                    </li>
                </ul>
            </template>
            <template v-if="pageInfo.itemList.length !== 0">
                <div class="listSort">
                    <label for="investType">
                        <input type="checkbox" id="investType">
                        <div>투자성향에 맞는 상품</div>
                    </label>
                </div>
                <ul class="productList">
                    <!-- 반복 리스트 -->
                    <li v-for="(list, index) in pageInfo.itemList" :key="index">
                        <!-- 기본 뱃지 영역 -->
                        <div class="bullets">
                            <!-- 위험도 class / red(매우높은위험) / orange(높은위험) / yellow(다소높은위험) /
                                lightBlue(보통위험) / blue(낮은위험) / green(매우낮은 위험) -->
                            <span class="bullet red">매우높은위험</span>
                        </div>
                        <!-- 타이틀 -->
                        <a href="javascript:;">
                            <h1>{{list.itemName}}</h1>
                        </a>
                        <ol class="simpleBox">
                            <li>
                                <span>연 수익률</span>
                                <strong class="fontRed weight700">{{list.annualReturn}}%</strong>
                            </li>
                            <li>
                                <span>매수(예정)일</span>
                                <span>{{list.buyDate}}</span>
                            </li>
                            <li>
                                <span>예약가능기간</span>
                                <span>{{list.reserveFromDate}}~{{list.reserveToDate}} {{list.reserveToTime}}</span>
                            </li>
                        </ol>
                        <div class="innerBtnBox">
                            <button type="button" :value="list.itemCode"
                                @click="resrveCheck($event, list.isResrve)">예약</button>
                        </div>
                    </li>
                </ul>
            </template>
        </article>
        <!-- 탭메뉴: 예약신청 -->
        <article v-if="pageInfo.selectTabMenu === 'status'"
            :class="pageInfo.reserveList.length == 0 ? 'on' : ''">
            <template v-if="pageInfo.reserveList.length == 0">
                <ul class="noList">
                    <li>
                        <p>예약 된 상품이 없습니다.</p>
                    </li>
                </ul>
            </template>
            <template v-if="pageInfo.reserveList.length !== 0">
                <ul class="productList">
                    <li v-for="(resList, index) in pageInfo.reserveList" :key="index">
                        <a href="javascript:;">
                            <h1>{{resList.itemName}}</h1>
                        </a>
                        <ol class="simpleBox">
                            <li>
                                <span>매수(예정)일시</span>
                                <span>{{resList.buyDate}} {{resList.buyFromTime}}~{{resList.buyToTime}}</span>
                            </li>
                            <li>
                                <span>금리</span>
                                <span>연 {{resList.interestRate}}%</span>
                            </li>
                            <li>
                                <span>만기</span>
                                <span>{{resList.maturityDate}}</span>
                            </li>
                            <li>
                                <span>예약신청금액</span>
                                <span>{{$priceToCommas(resList.reserveAmount)}}원</span>
                            </li>
                        </ol>
                        <div class="innerBtnBox">
                            <!-- 예약취소 : 오늘날짜 < 매수예정날짜 -->
                            <button type="button"
                                :value="resList.itemCode"
                                v-if="compareDate(resList.buyDate) === 'before'"
                                @click="actReserve($event, 'cancelELBConfirm')">예약 취소</button>
                            <!-- 매수 : 오늘날짜 == 매수예정날짜 -->
                            <button type="button"  class="fontRed"
                                v-if="compareDate(resList.buyDate) === 'before'"
                                :value="resList.itemCode"
                                @click="actReserve($event, 'buyELBEnter')">매수</button>
                            <!-- 청약마감 : 오늘날짜 > 매수예정날짜 -->
                            <button type="button" disabled
                                v-if="compareDate(resList.buyDate) === 'before'">청약마감</button>
                        </div>
                    </li>
                </ul>
            </template>
        </article>
    </section>
</div>
<component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue' // 계좌선택
import regAccPassword from '@/components/banking/regAccPassword.vue' // 비밀번호 입력
import bottomCheckReserve from '@/components/products/bottomCheckReserve.vue' // 바텀시트 예약확인안내
const $axios = inject('$axios')
const $router = useRouter()
const $route = useRoute()
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $priceToCommas = inject('$priceToCommas')
const $dateToCommas = inject('$dateToCommas')
const reserveELBListAPI = '/json/products/reserveELBList.json'
const props = defineProps(['pageInfo'])
// 최초 실행 탭 분기 praram - reserve(예약) / status(예약내역)
let pageType = $route.params.type
if(pageType === null || typeof pageType === 'undefined') pageType = 'reserve'
// 탭메뉴별 컴포넌트 실행
const pageInfo = reactive({
    bankCode: '263', // 은행코드
    bankAccNumber: '1254-8546500-004', // 계좌번호
    isPassed: true, // 비밀번호 입력확인 여부
    selectTabMenu: pageType, // 탭메뉴 선택 - 예약신청 reserve , 예약현황 status
    itemList: [ // 예약신청 목록
        // {
        //     itemCode: '',
        //     itemName: '미래에셋증권 ELB_예약용(8/13)', // 상품명
        //     investType: '', // 투자성향 - 매우높은위험 6 , 높은위험 5, 다소높은위험4, 보통위험3, 낮은위험2, 매우낮은위험1
        //     todayDate: '', // 오늘날짜
        //     buyDate: '2022.08.29', // 매수(예정)일
        //     reserveFromDate: '2022.08.26', // 예약가능기간 시작일
        //     reserveToDate: '2022.08.30', // 예약가능기간 종료일
        //     reserveToTime: '00:00', // 예약가능종료일 시간
        //     annualReturn: '32.84', // 연 수익률
        //     isResrve: false // 예약여부 체크
        // }
    ],
    reserveList: [ // 예약현황 목록
        // {
        //     itemCode: '',
        //     itemName: '미래에셋증권 ELB_예약용(8/13)', // 상품명
        //     buyDate: '2022.08.29', // 매수(예정)일
        //     buyFromTime: '10:00', // 매수 시간 from
        //     buyToTime: '12:00', // 매수 시간 to
        //     interestRate: '6.50', // 금리
        //     maturityDate: '2024.03.24', // 만기
        //     reserveAmount: 1000000 // 예약신청금액
        // }
    ]
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
// 컴포넌트 실행
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === selectMyAccListInTypes) {
        componentsInfo.compOption = {
            useAll: false,
            bankingType: 'hmsec',
            bankCode: pageInfo.bankCode,
            bankAccNumber: pageInfo.bankAccNumber
        }
    } else if(comps === regAccPassword) {
        componentsInfo.compOption = {
            bankCode: '263',
            bankAccNumber: '111'
        }
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        // closeComponent()
        if(comps === selectMyAccListInTypes) {
            pageInfo.bankCode = returnVals.bankCode
            pageInfo.bankAccNumber = returnVals.bankAccNumber
            pageInfo.isPassed = returnVals.isPassed
            if(!pageInfo.isPassed) {
                runComp(regAccPassword)
            } else {
                closeComponent()
            }
        } else if (comps === regAccPassword) {
            // closeComponent()
            if(returnVals) {
                pageInfo.isPassed = returnVals.isPassed // 비밀번호 입력 성공 여부
                // 패스워드 자동 저장체크
                if(returnVals.isPasswordSave) {
                    console.log('저장함수 호출')
                } else {
                    closeComponent()
                }
            } else {
                closeComponent()
                pageInfo.isPassed = false
            }
        }
    } else {
        closeComponent()
    }
}
// 날짜비교
const compareDate = (inputDate) => {
    let returnVal = 'today'
    const todayData = new Date()
    const inputDateArr = inputDate.split('.')
    const compareData = new Date(Number(inputDateArr[0]), Number(inputDateArr[1]), Number(inputDateArr[2]))
    if(todayData > compareData) {
        returnVal = 'after'
    } else if(todayData < compareData) {
        returnVal = 'before'
    }
    // console.log(returnVal)
    return returnVal
    // for (const i in pageInfo.reserveList) {
    // console.log(pageInfo.reserveList[i])
    // const buydate = new Array(0)
    // buydate = pageInfo.reserveList.buyDate.split('.')
    //     console.log(pageInfo.reserveList[i].buyDate)
    // }
}
// 탭메뉴 선택
const selectTabMenu = (menu) => {
    pageInfo.selectTabMenu = menu
}
// 예약여부체크
const resrveCheck = (ev, val) => {
    if(!val) {
        actReserve(ev, 'reserveELBView')
    } else {
        runComp(bottomCheckReserve)
    }
}
// 페이지이동
const actReserve = (ev, pageName) => {
    const codeValue = ev.target.value
    const bankAcc = pageInfo.bankAccNumber
    const name = pageName
    $router.push({ name: name, params: { itemCode: codeValue, bankAccNumber: bankAcc } })
}
const preRun = () => {
    $axios.get(reserveELBListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.itemList = res.data.elbList
                // 추후 별도 호출
                pageInfo.reserveList = res.data.elbList
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
preRun()
</script>
<style lang="postcss" scoped>
section {
    height: calc(100% - 126px);
    & article.on {
        height: calc(100% - 126px);
        & .noList { height: 100%;}
    }
}
.simpleBox {
    margin-top: 11px;
}
</style>