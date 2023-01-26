<template>
    <section id="saveAcc"
        :class="{ 'groupArea' : pageInfo.saveType === 'group' }">
        <div class="tabStyle04">
            <ul data-tabList="3">
                <li :class="{ 'on' : pageInfo.saveType === 'often' }">
                    <a href="javascript:;"
                        draggable="false"
                        @click="pageInfo.saveType = 'often'">
                        자주
                    </a>
                </li>
                <li :class="{ 'on' : pageInfo.saveType === 'quick' }">
                    <a href="javascript:;"
                        draggable="false"
                        @click="pageInfo.saveType = 'quick'">
                        퀵
                    </a>
                </li>
                <li :class="{ 'on' : pageInfo.saveType === 'group' }">
                    <a href="javascript:;"
                        draggable="false"
                        @click="pageInfo.saveType = 'group'">
                        다계좌
                    </a>
                </li>
            </ul>
        </div>
        <!-- 그룹이 아닐 시 -->
        <ul v-if="pageInfo.saveType !== 'group' && pageInfo.accList.length === 0"
            :class="{ 'emptyList' :  pageInfo.accList.length === 0 }">
            <!-- 조회 계좌 목록이 없을 시 -->
            <li>
                <img src="@/assets/images/global/bg_emptyList.png" alt="목록 없음 알림" /><br>
                등록된 계좌가 없습니다.<br>
                <button type="button">
                    최근 이체계좌 보기
                </button>
            </li>
        </ul>
        <template v-else-if="pageInfo.saveType !== 'group' && pageInfo.accList.length !== 0">
            <draggable
                :list="pageInfo.accList"
                :disabled="!pageInfo.useDraggalbe"
                item-key="id"
                @start="pageInfo.dragging = true"
                @end="pageInfo.dragging = false"
                handle=".handle"
                tag="ul"
                class="accList noLine useBtn">
                <template #item="{ element }">
                    <li>
                        <a href="javascript:;"
                            @click="runViewAccInfo($event, element)">
                            <img :src="'/images/logos/' + element.bankCode + '.png'"
                                :alt="$codeToBank(element.bankCode).korName + ' 로고'" />
                            <h2>
                                {{ element.ownerName }}
                                <span class="fontPointBlue"
                                    v-if="pageInfo.saveType === 'quick'">
                                    {{ $priceToCommas(element.sendPrice) + '원' }}
                                </span>
                            </h2>
                            <p>
                                {{ $codeToBank(element.bankCode).korName }}
                                {{ element.bankCode === '263' ? $hmsecToDash(element.bankAccNumber) :
                                    element.bankAccNumber  }}
                            </p>
                            <button v-if="!pageInfo.useDraggalbe"
                                type="button" class="favorite on"
                                @click.prevent="removeSave(element)"
                                title="자주쓰는 계좌 등록">
                            </button>
                            <button v-else
                                type="button" class="handle"
                                title="노출순서변경">
                            </button>
                        </a>
                    </li>
                </template>
            </draggable>
        </template>
        <!-- 그룹계좌일 시 -->
        <ul v-else class="productList dropDown"
            :class="{ 'noList' :  pageInfo.groupList.length === 0 }">
            <li v-if="pageInfo.groupList.length === 0">
                <p>
                    생성된 그룹 계좌가 없습니다.<br>
                    그룹관리에서 그룹을 생성해보세요<br>
                </p>
                <button type="button"
                    @click="runComp(regName, 'group')">
                    그룹추가
                </button>
            </li>
            <!-- 그룹 계좌일 시 -->
            <template v-else>
                <li>
                    <a href="javascript:;" @click="runComp(manageAccGroup)">(임시)그룹관리 실행 버튼</a>
                </li>
                <li v-for="(groups, index) in pageInfo.groupList" :key="index">
                    <a href="javascript:;" @click="groupView($event, groups)">
                        <h1>
                            {{ groups.groupName }}
                            <span>계좌 {{ pageInfo.accList.filter(arr => arr.groupCode === groups.groupCode).length }}건</span>
                        </h1>
                    </a>
                    <transition name="slideVertical">
                        <div v-if="groups.isOpened">
                            <draggable
                                v-if="groups.accList.length !== 0"
                                :list="groups.accList"
                                :disabled="!pageInfo.useDraggalbe"
                                item-key="id"
                                @start="pageInfo.dragging = true"
                                @end="pageInfo.dragging = false"
                                handle=".handle"
                                tag="ul"
                                class="accList noLine useBtn">
                                <template #item="{ element }">
                                    <li>
                                    <a href="javascript:;"
                                        @click="runViewAccInfo($event, element)">
                                        <img :src="'/images/logos/' + element.bankCode + '.png'"
                                            :alt="$codeToBank(element.bankCode).korName + ' 로고'" />
                                        <h2>{{ element.ownerName }}</h2>
                                        <p>
                                            {{ $codeToBank(element.bankCode).korName }}
                                            {{ element.bankCode === '263' ? $hmsecToDash(element.bankAccNumber) :
                                                element.bankAccNumber  }}
                                        </p>
                                        <button v-if="!pageInfo.useDraggalbe"
                                            type="button" class="on favorite"
                                            @click.prevent="removeSave(element, groups.accList)"
                                            title="퀵 계좌 등록">
                                        </button>
                                        <button v-else
                                            type="button" class="handle"
                                            title="노출순서변경">
                                        </button>
                                    </a>
                                </li>
                                </template>
                            </draggable>
                            <!-- 이체정보관련 버튼 -->
                            <ol class="simpleBox">
                                <!-- 버튼 : 예약이체 일때 거래내역조회 , 잔액조회 미노출-->
                                <hr>
                                <li class="circleStBtnArea">
                                    <button class="icoChangeOrder"
                                        :class="{ 'on' : pageInfo.useDraggalbe === true }"
                                        @click="pageInfo.useDraggalbe = !pageInfo.useDraggalbe">
                                        <span>순서변경</span>
                                    </button>
                                    <button :class="'icoPlus right'"
                                        @click="runComp(regAccNumber, groups.groupCode)">
                                        <span>계좌 추가</span>
                                    </button>
                                </li>
                            </ol>
                        </div>
                    </transition>
                </li>
            </template>
        </ul>
    </section>
    <div class="buttonArea" v-if="pageInfo.saveType !== 'group'">
        <button class="h50"
            @click="pageInfo.useDraggalbe = !pageInfo.useDraggalbe">순서변경</button>
        <button class="h50 pointBlue"
            @click="runComp(regAccNumber)">계좌추가</button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, watch, markRaw } from 'vue'
import draggable from 'vuedraggable'
import regAccNumber from '@/components/banking/regAccNumber.vue' // 직접 출금계좌 정보 입력
import regPriceInfoInput from '@/components/banking/regPriceInfoInput.vue' // 금액입력
import viewAccInfo from '@/components/banking/viewAccInfo.vue' // 선택계좌 상세, 이체하기
import regName from '@/components/banking/regName.vue' // 이름입력(그룹명 입력용)
import manageAccGroup from '@/components/banking/manageAccGroup.vue'
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $toastMsg = inject('$toastMsg')
const $priceToCommas = inject('$priceToCommas')
const transAccListAPI = '/json/banking/transAccList.json'
const myTransGroupAPI = '/json/banking/myTransGroup.json'
const props = defineProps(['baseInfo'])

const pageInfo = reactive({
    saveType: 'often', // 저장된 계좌 타입 often(자주쓰는) / quick(퀵 계좌) / group (그룹계좌)
    accList: new Array(0), // 계좌리스트
    groupList: new Array(0), // 그룹리스트 - 그룹별 계좌목록 재 생성 - accList로 구성
    useDraggalbe: false, // 드래그 사용여부 - 페이지 전체 영향
    dragging: false // 이벤트 시작 종료용 변수
})

// 퀵계좌 시 임시 계좌 저장
const tempAccInfo = reactive({
    ownerName: '',
    sendPrice: '',
    bankCode: '',
    bankAccNumber: ''
})

watch(() => pageInfo.saveType, (next, prev) => {
    if(prev !== next) {
        // 목록 초기화 - 실행속도에 따라 결정필요
        // pageInfo.accList = new Array(0)
        if(next === 'group') {
            getGroupList()
        } else {
            getAccList(pageInfo.saveType)
        }
        pageInfo.useDraggalbe = false
    }
})

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
    if(comps === regPriceInfoInput) {
        componentsInfo.compOption = {
            ownerName: tempAccInfo.ownerName,
            bankCode: tempAccInfo.bankCode,
            bankAccNumber: tempAccInfo.bankAccNumber,
            groupCode: directInput
        }
    } else if(comps === regName) {
        componentsInfo.compOption = { type: directInput }
    } else if(comps === viewAccInfo) {
        componentsInfo.compOption = {
            ownerName: directInput.ownerName,
            bankCode: directInput.bankCode,
            bankAccNumber: directInput.bankAccNumber,
            saveType: pageInfo.saveType,
            sendPrice: directInput.sendPrice
        }
    }
}
// 컴포넌트 실행 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === regAccNumber) {
        if(pageInfo.saveType !== 'quick') {
            // 저장계좌 프로세스
            // retrunVals.ownerName : 계좌주 / retrunVals.bankCode : 은행코드 / returnVals.bankAccNumber : 계좌번호
            // 그룹계좌일 시 그룹코드 - componentsInfo.groupCode
            // 성공시나리오, 실패시나리오 모두 토스트 처리
            $toastMsg({ msg: '자주 사용하는 계좌에 등록되었습니다.' })
            closeComponent()
        } else if(pageInfo.saveType === 'quick') {
            tempAccInfo.ownerName = returnVals.ownerName
            tempAccInfo.bankCode = returnVals.bankCode
            tempAccInfo.bankAccNumber = returnVals.bankAccNumber
            runComp(regPriceInfoInput)
        }
    } else if(comps === regPriceInfoInput) {
        tempAccInfo.sendPrice = returnVals
        $toastMsg({ msg: '퀵 계좌에 등록되었습니다.' })
        closeComponent()
    } else if(comps === regName) {
        // 등록프로세스 후 groupCode 부여 여부 확인 - 그룹관리 페이지 동일
        const addObj = []
        addObj.groupName = returnVals.returnName
        addObj.groupCode = ''
        addObj.isOpened = false
        addObj.accList = new Array(0)
        pageInfo.groupList.push(addObj)
        closeComponent()
    } else {
        closeComponent()
    }
}

const runViewAccInfo = (ev, accInfo) => {
    if(ev.target.tagName.toLowerCase() !== 'button') runComp(viewAccInfo, accInfo)
}

// 계좌 리스트 조회
const getAccList = (saveType) => {
    $axios.get(transAccListAPI, { saveType: saveType })
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.accList = res.data.accList
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}

// 그룹리스트 > 계좌리스트 조회
const getGroupList = () => {
    $axios.get(myTransGroupAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 자주, 퀵 화면에서 삭제용 스크립트
                // pageInfo.groupList = res.data.accList
                const groupArr = new Array(0)
                for(const i in res.data.groupList) {
                    if(res.data.groupList[i].groupCode !== 'often' &&
                        res.data.groupList[i].groupCode !== 'quick' &&
                        res.data.groupList[i].groupCode !== 'save') {
                        const listObj = res.data.groupList[i]
                        const addOption = { isOpened: false, accList: new Array(0) }
                        Object.assign(listObj, addOption)
                        groupArr.push(listObj)
                    }
                }
                pageInfo.groupList = groupArr
                // 그룹 재 편성 이후 각 그룹 accList에 해당 계좌 배치
                $axios.get(transAccListAPI, { saveType: 'group' })
                    .then(function(res) {
                        if(res.data.affective === 200) {
                            for(const i in res.data.accList) {
                                const groupObj = res.data.accList[i]
                                const sendArr = pageInfo.groupList.filter(arr => arr.groupCode === groupObj.groupCode)
                                if(sendArr.length !== 0) {
                                    sendArr[0].accList.push(groupObj)
                                }
                            }
                        }
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}

// 다계좌 그룹 목록 펼침/닫힘
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

// 즐겨찾기 계좌 삭제
const removeSave = (el, target) => {
    // 삭제 로직 실행 후 화면 데이터에서 삭제
    let arrTarget = pageInfo.accList
    if(typeof (target) !== 'undefined') {
        arrTarget = target
    }
    arrTarget.splice(arrTarget.indexOf(el), 1)
    $toastMsg({ msg: '계좌가 삭제되었습니다.' })
}

// 최초 often으로 계좌 조회
getAccList(pageInfo.saveList)

</script>

<style lang="postcss" scoped>
#saveAcc { height: calc(100% - 126px); padding-bottom: 76px; }
.noList { height: 100%; }
.productList {
    &:not(.noList) > li:last-of-type {
        border-bottom: 1px solid var(--listBorder);
    }
    & > li {
        & > a {
            padding-top: 3px !important; padding-bottom: 3px !important;
            & h1 {
                font-weight: 500 !important;
                & span {
                    margin-left: 8px;
                    font-size: 0.857rem; color: var(--fontLightgray); font-weight: 400 !important;
                }
            }
        }
        & > div {
            padding: 0 !important;
            background: var(--listBg);
            & .circleStBtnArea {
                margin-bottom: 18px; padding: 0 20px;
            }
            & .accList {
                margin: 0;
            }
            & hr { width: calc(100% - 40px); margin-top: 3px; margin-left: 20px; }
        }
    }
}

</style>