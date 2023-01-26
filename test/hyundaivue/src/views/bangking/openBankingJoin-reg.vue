<template>
<div>
    <section id="openBankingJoinReg">
        <div class="titleInStep">
            <h1>등록할 계좌를 선택하세요</h1>
            <p>한번에 최대 10개, 활동 상태 계좌만 등록 가능합니다.</p>
        </div>
        <div class="tabStyle04 h38">
            <ul data-tabList="3">
                <li :class="{ 'on' : pageInfo.accType === 'bank' }">
                    <a href="javascript:;"
                        draggable="false"
                        @click="pageInfo.accType = 'bank'">
                        은행
                    </a>
                </li>
                <li :class="{ 'on' : pageInfo.accType === 'securities' }">
                    <a href="javascript:;"
                        draggable="false"
                        @click="pageInfo.accType = 'securities'">
                        증권
                    </a>
                </li>
                <li :class="{ 'on' : pageInfo.accType === 'etc' }">
                    <a href="javascript:;"
                        draggable="false"
                        @click="pageInfo.accType = 'etc'">
                        기타
                    </a>
                </li>
            </ul>
        </div>
        <template v-for="(accTypes, index) in accTypeArr" :key="index">
            <div class="listSort" v-if="pageInfo.accInfo.filter(arr => arr.accType === accTypes).length !== 0 && accTypes === pageInfo.accType">
                <label :for="'selectAllAcc' + accTypes">
                    <input type="checkbox" :id="'selectAllAcc' + accTypes"
                        @change="checkAll($event)">
                    <div>전체선택</div>
                </label>
            </div>
            <ul class="accList dropDown" v-if="accTypes === pageInfo.accType"
                :class="{ 'noList' : pageInfo.accInfo.filter(arr => arr.accType === accTypes).length === 0 }">
                <template v-if="pageInfo.accInfo.filter(arr => arr.accType === accTypes).length === 0">
                    <li>
                        <p>계좌를 찾을 수 없습니다.</p>
                        <div></div>
                    </li>
                </template>
                <template v-else>
                    <template v-if="accTypes === pageInfo.accType">
                        <li v-for="(bankInfo, index) in pageInfo.accInfo.filter(arr => arr.accType === accTypes)" :key="index">
                            <a href="javascript:;" class="titleButton" @click="groupView($event, bankInfo)">
                                <img :src="'/images/logos/' + bankInfo.bankCode + '.png'"
                                    :alt="$codeToBank(bankInfo.bankCode).korName + ' 로고'" />
                                <h2 class="singleLine">
                                    {{ $codeToBank(bankInfo.bankCode).korName }}
                                    ({{ bankInfo.accList.filter(arr => arr.isChecked === true).length  }}/{{ bankInfo.accList.length }})
                                </h2>
                            </a>
                            <transition name="slideVertical">
                                <template v-if="bankInfo.isOpened">
                                    <ul class="productList noLine select">
                                        <li v-for="(accInfo, index) in bankInfo.accList" :key="index">
                                            <label :for="'acc' + bankInfo.bankCode + index">
                                                <input type="checkbox" :id="'acc' + bankInfo.bankCode + index"
                                                    :disabled="!accInfo.isActive"
                                                    v-model= accInfo.isChecked
                                                    @change="changeCheck($event, accInfo)">
                                                <div></div>
                                            </label>
                                            <div class="bullets">
                                                <span :class="'bullet' + [ accInfo.isActive === true ? ' lightBlue' : ' white' ]">
                                                    {{ accInfo.isActive ? '활동' : '비활동' }}
                                                </span>
                                            </div>
                                            <a href="javascript:;"
                                                @click="changeCheck('acc' + bankInfo.bankCode + index, accInfo)">
                                                <h2>{{ accInfo.bankAccName }}</h2>
                                                <p class="gray">{{ accInfo.bankAccNumber }}</p>
                                            </a>
                                        </li>
                                    </ul>
                                </template>
                            </transition>
                        </li>
                    </template>
                </template>
            </ul>
        </template>
    </section>
    <div class="bottomBtnArea">
        <ol class="simpleBox">
            <li>
                <span>찾는 계좌가 없으시다면 ?</span>
                <strong>
                    <a href="javascript:;" class="inArrow noLine black"
                        @click="runComp(regAccNumber)">계좌 직접 등록하기</a>
                </strong>
            </li>
        </ol>
    </div>
    <div class="buttonArea">
        <button class="h50 pointBlue"
            :disabled="pageInfo.checkedCount === 0"
            @click="doRegAcc()">선택계좌 등록({{ pageInfo.checkedCount }}/10)</button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>

<script setup>
import { reactive, inject, markRaw } from 'vue'
import regAccNumber from '@/components/banking/regAccNumber.vue'
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $toastMsg = inject('$toastMsg')
const $runAlert = inject('$runAlert')
const myOtherBankAccListAPI = '/json/banking/myOtherBankAccList.json'
const emit = defineEmits(['runEmits'])
const props = defineProps(['joinInfo'])

const pageInfo = reactive({
    accType: 'bank', // bank(은행) / securities(증권) / etc(기타)
    accInfo: new Array(0),
    checkedCount: 0 // 화면용 등록확인 계좌 개수
})
const accTypeArr = ['bank', 'securities', 'etc']

// 그룹 생성 및 계좌 매칭
const groupCheck = (listInfo) => {
    const newObj = listInfo
    let accTypeName = ''
    if(Number(listInfo.bankCode) < 200) {
        accTypeName = 'bank'
    } else if(Number(listInfo.bankCode) > 200 && Number(listInfo.bankCode) < 500) {
        accTypeName = 'securities'
    } else if(Number(listInfo.bankCode) > 500) {
        accTypeName = 'etc'
    }
    const addKeyVal = { isChecked: false }
    Object.assign(addKeyVal, newObj)
    const parentObj = pageInfo.accInfo.filter(arr => arr.bankCode === newObj.bankCode)
    // 신규 은행목록 생성
    if(parentObj.length === 0 || pageInfo.accInfo.length === 0) {
        const newGroup = { bankCode: newObj.bankCode, isOpened: false, accType: accTypeName, accList: new Array(0) }
        newGroup.accList.push(newObj)
        pageInfo.accInfo.push(newGroup)
    } else {
        parentObj[0].accList.push(addKeyVal)
    }
}

// 그룹(행별) 생성 및 행 내 리스트 재소팅
const getOtherAcc = () => {
    // 은행/증권/기타 구분하여 호출 시 param으로 구분값 전송
    $axios.get(myOtherBankAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                for(const i in res.data.accList) {
                    groupCheck(res.data.accList[i])
                }
            } else {
                // 기타 에러상황
            }
        })
        .catch(function(err) {
            // API에러
            console.log(err)
        })
}

// 그룹 항목 열기 닫기
const groupView = (ev, obj) => {
    let target = ev.target
    if(target.tagName !== 'A') target = ev.target.closest('a')
    if(target.classList.contains('noList') === false) {
        if(target.classList.contains('on') === true) {
            target.classList.remove('on')
            obj.isOpened = false
        } else {
            target.classList.add('on')
            obj.isOpened = true
        }
    }
}

// 은행항목 선택
const changeCheck = (ev, obj) => {
    if(obj.isActive) {
        let targetEl = ev.target
        console.log(ev)
        if(typeof ev === 'string') {
            targetEl = document.getElementById(ev)
            targetEl.checked = !targetEl.checked
        }
        if(targetEl.checked === true) {
            if(pageInfo.checkedCount < 10) {
                obj.isChecked = true
                pageInfo.checkedCount++
            } else {
                $toastMsg({ msg: '계좌는 총 10개까지만 등록이 가능합니다.' })
                obj.isChecked = false
                targetEl.checked = false
            }
        } else {
            obj.isChecked = false
            if(pageInfo.checkedCount > 0) pageInfo.checkedCount--
        }
        isAll()
    }
}

// 전체항목이 선택되었는지 체크
const isAll = () => {
    let checkedCount = 0
    const nowViewList = pageInfo.accInfo.filter(arr => arr.accType === pageInfo.accType)
    for (let i = 0; i < nowViewList.length; i++) {
        nowViewList[i].accList.forEach((el) => { if(el.isChecked === false && el.isActive === true) checkedCount++ })
    }
    if(checkedCount === 0) {
        document.getElementById('selectAllAcc' + pageInfo.accType).checked = true
    } else {
        document.getElementById('selectAllAcc' + pageInfo.accType).checked = false
    }
}

// 전체항목 체크, 체크 해제
const checkAll = (ev) => {
    const isChecked = ev.target.checked
    const nowViewList = pageInfo.accInfo.filter(arr => arr.accType === pageInfo.accType)
    for (let groupCnt = 0; groupCnt < nowViewList.length; groupCnt++) {
        if(isChecked === true) {
            for(let listCnt = 0; listCnt < nowViewList[groupCnt].accList.length; listCnt++) {
                if(pageInfo.checkedCount < 10 && nowViewList[groupCnt].accList[listCnt].isActive === true) {
                    nowViewList[groupCnt].accList[listCnt].isChecked = true
                    pageInfo.checkedCount++
                } else if(pageInfo.checkedCount >= 10) {
                    $toastMsg({ msg: '10개까지만 선택이 가능합니다.' })
                    // ev.target.checked = false
                    nowViewList[groupCnt].accList[listCnt].isChecked = false
                    break
                }
            }
        } else {
            for(let listCnt = 0; listCnt < nowViewList[groupCnt].accList.length; listCnt++) {
                nowViewList[groupCnt].accList[listCnt].isChecked = false
                pageInfo.checkedCount--
                if(pageInfo.checkedCount < 0) pageInfo.checkedCount = 0
            }
        }
    }
}

// 컴포넌트 세팅
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
    componentsInfo.compName = markRaw(comps)
}
// 컴포넌트 실행 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === regAccNumber) {
        // 본인계좌 검증 성공시 등록 프로세스
        const reObj = returnVals
        const addCheck = { isActive: true }
        Object.assign(reObj, addCheck)
        groupCheck(reObj)
        // 본인계과 등록 검증 실패시 프로세스
        // $runAlert({ msg: '출금계좌는 본인 명의의 계좌만 오픈뱅킹 계좌로 등록하실 수 있습니다.' })
    }
    closeComponent()
}

// 등록 실행
const doRegAcc = () => {
    const returnAcc = new Array(0)
    // 등록프로세스 및 등록 결과 등록
    pageInfo.accInfo.forEach((arr) => {
        arr.accList.forEach((el) => {
            if(el.isChecked) {
                const reObj = el
                const addCheck = { resultCode: 'A0000' }
                Object.assign(reObj, addCheck)
                returnAcc.push(reObj)
            }
        })
    })
    emit('runEmits', returnAcc)
}

// 최초 실행
getOtherAcc()

</script>

<style lang="postcss" scoped>
#openBankingJoinReg { height: auto; min-height: calc(100% - 188px); }
.noList { min-height: 360px; }
.listSort { margin: 0; padding-left: 20px; padding-right: 20px; }
.bottomBtnArea { display: block; padding-top: 20px; padding-bottom: 96px; }
.accList:not(.noList) { border-bottom: 1px solid var(--listBorder); }
.productList { padding: 10px 20px !important; background: var(--listBg); }
</style>