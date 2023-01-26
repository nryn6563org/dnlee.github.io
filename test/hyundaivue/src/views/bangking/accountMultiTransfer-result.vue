<template>
<div>
    <!-- 다계좌이체 결과확인 -->
    <section id="multiTrResult">
        <div class="centerTitle">
            <h2 class="resultPass">
                총 <strong>{{ $priceToCommas(resultInfo.totalTransPrice) }}원</strong><br>
                <strong>{{ props.transInfo.sendAccInfo.length }}건</strong>을 이체했습니다.
            </h2>
        </div>
        <!-- 이체정보내용-->
        <ol class="roundBox dist8">
            <li>
                <span>출금</span>
                <strong>
                    {{ $codeToBank(props.transInfo.bankCode).korName  }}
                    {{ props.transInfo.bankCode === '263' ? $hmsecToDash(props.transInfo.bankAccNumber) : props.transInfo.bankAccNumber }}
                </strong>
            </li>
            <li>
                <span>수수료</span>
                <strong v-if="resultInfo.totalFeePrice === 0" class="fontPointBlue">무료</strong>
                <strong v-else>{{ $priceToCommas(resultInfo.totalFeePrice) }}원</strong>
            </li>
            <li>
                <span>잔액</span>
                <strong>{{ $priceToCommas(props.transInfo.resultInfo.balance) }}원</strong>
            </li>
        </ol>
        <hr>
        <!--이체정보 목록-->
        <ul class="accList dropDown">
            <!-- 다계좌이체 리스트 -->
            <li v-for="(accInfo, index) in props.transInfo.sendAccInfo" :key="index"
                :class="{ 'on': slideLists.viewIndex[index].isOpen }">
                <!-- 계좌정보 -->
                <a href="javascript:;" @click="slideLists.viewIndex[index].isOpen = !slideLists.viewIndex[index].isOpen">
                    <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                            :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                    <h2>
                        <!-- 지연이체 계좌 여부 체크 개발 논의 필요 등록 계좌 내 등록 금액으로 판단 -->
                        <!-- <span class="bullet red">지연</span> -->
                        {{ accInfo.ownerName }}
                        <span class="fontPointBlue">{{ $priceToCommas(accInfo.sendPrice) }}원</span>
                    </h2>
                    <p>
                        {{ $codeToBank(accInfo.bankCode).korName }}
                        {{ accInfo.bankCode === '263' ? $hmsecToDash(accInfo.bankAccNumber) : accInfo.bankAccNumber }}
                    </p>
                </a>
                <transition name="slideVertical">
                    <!-- on일때 노출 -->
                    <ol class="squareBox dist8" v-if="slideLists.viewIndex[index].isOpen">
                        <li>
                            <span>수수료</span>
                            <p v-if="accInfo.feePrice === 0" class="fontPointBlue">무료</p>
                            <p v-else>{{ $priceToCommas(accInfo.feePrice) }}원</p>
                        </li>
                        <li>
                            <span>받는 분에게 표시</span>
                            <p>{{ accInfo.reciverText }}</p>
                        </li>
                        <li>
                            <span>내 통장에 표시</span>
                            <p>{{ accInfo.senderText }}</p>
                        </li>
                        <hr>
                        <!-- 이체결과 확인페이지에서만 노출 -->
                        <li class="circleStBtnArea">
                            <button :class="'icoPlus' + [ accInfo.isQuick ? ' on' : '' ]"
                                @click="saveAcc($event, accInfo, 'isQuick')">
                                <span>퀵 계좌등록</span>
                            </button>
                            <button :class="'icoPlus right' + [ accInfo.isSave ? ' on' : '' ]"
                                @click="saveAcc($event, accInfo, 'isSave')">
                                <span>자주쓰는 계좌등록</span>
                            </button>
                        </li>
                    </ol>
                </transition>
            </li>
        </ul>
    </section>
    <!--하단 버튼 -->
    <div class="buttonArea div3_7">
            <button class="white h50"
                @click="runComp(reSelect, 'group')">그룹등록</button>
            <button class="pointBlue h50"
                @click="emit('runEmits', false)">확인</button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import regName from '@/components/banking/regName.vue' // 실명입력
import reSelect from '@/components/global/reSelect.vue' // 셀렉트 공통 바텀시트 실행
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const $toastMsg = inject('$toastMsg')
const myTransGroupAPI = '/json/banking/myTransGroup.json'
const emit = defineEmits(['runEmits'])
const props = defineProps(['transInfo'])

const resultInfo = reactive({
    totalTransPrice: 0,
    totalFeePrice: 0,
    selectedGroupCode: ''
})

// 슬라이드 실행용
const slideLists = reactive({
    viewIndex: new Array(0)
})
for(const i in props.transInfo.sendAccInfo) {
    const insertData = { isOpen: false }
    slideLists.viewIndex.push(insertData)
}
// 슬라이드 실행
const changeView = (ev, index) => {
    let target = ev.target
    if(ev.target.tagName !== 'Li') target = ev.target.closest('li')
    if(target.classList.contains('on')) {
        target.classList.remove('on')
        slideLists.viewIndex[index].isOpen = false
    } else {
        target.classList.add('on')
        slideLists.viewIndex[index].isOpen = true
    }
}

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
// 일반 모달 실행
const runComp = (comps, directInput) => {
    if(comps === regName) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = { type: directInput }
    } else if (comps === reSelect) {
        $axios.get(myTransGroupAPI, {})
            .then(function(res) {
                if(res.data.affective === 200) {
                    const checkData = res.data.groupList.filter(arr => arr.groupCode !== 'quick' && arr.groupCode !== 'save')
                    const groupData = new Array(0)
                    for(const i in checkData) {
                        const addList = []
                        addList.listValue = checkData[i].groupCode
                        addList.listName = checkData[i].groupName
                        groupData.push(addList)
                    }
                    componentsInfo.compName = markRaw(comps)
                    componentsInfo.compOption = {
                        title: '계좌 그룹선택',
                        falseButton: '그룹추가',
                        trueButton: '저장',
                        selected: resultInfo.selectedGroupCode,
                        listData: groupData
                    }
                } else {
                    // 데이터 에러
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    }
}


// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === reSelect) {
        if(typeof (returnVals) !== 'boolean') {
            // 등록 정보 리턴
            // 계좌 목록
            // const groupName = returnVals.returnName
            // const groupAcc = props.transInfo.sendAccInfo
            closeComponent()
            $toastMsg({ msg: '등록되었습니다.' })
        } else if(returnVals) {
            closeComponent(true)
            setTimeout(() => {
                runComp(regName, 'group')
            })
        } else {
            closeComponent()
        }
    } else if(comps === regName) {
        // const groupName = returnVals.returnName
        // const groupAcc = props.transInfo.sendAccInfo
        closeComponent()
        $toastMsg({ msg: '등록되었습니다.' })
    } else {
        closeComponent()
    }
}

// 계좌 저장 - 퀵, 자주쓰는
const saveAcc = (ev, accInfo, saveType) => {
    // 등록 계좌정보 accInfo
    const saveTypeName = saveType === 'isQiock' ? '퀵 계좌' : '자주 사용하는 계좌'
    const evTarget = ev.target.tagName === 'SPAN' ? ev.target.parentNode : ev.target
    if(evTarget.classList.contains('on')) {
        // 등록프로세스
        evTarget.classList.remove('on')
        $toastMsg({ msg: saveTypeName + '에서 삭제되었습니다.' })
    } else {
        // 해지 프로세스
        evTarget.classList.add('on')
        $toastMsg({ msg: saveTypeName + '로 등록되었습니다.' })
    }
}

const preRun = () => {
    for(const i in props.transInfo.sendAccInfo) {
        resultInfo.totalFeePrice += props.transInfo.sendAccInfo[i].feePrice
        resultInfo.totalTransPrice += props.transInfo.sendAccInfo[i].sendPrice
    }
}

// 최초 입력정보 없을 시 이체 초기페이지로 이동
if(props.transInfo.bankCode === '' && props.transInfo.bankAccNumber === '') {
    emit('runEmits', false)
} else {
    preRun()
}

</script>
<style lang="postcss" scoped>
#multiTrResult {
    padding-bottom: 76px;
    & > hr { margin-top: 20px; }
}
.accList { border-bottom: 1px solid var(--listBorder); margin-bottom: 14px; }
.circleStBtnArea { margin-bottom: 2px; }
</style>