<template>
    <div id="transAccList" class="bottomSheet">
        <div class="tabStyle03">
            <ul data-tabList="3">
                <li :class="transAccList.accType === 'recently' ? 'on' : ''">
                    <a href="javascript:;"
                        @click="transAccList.accType = 'recently'"
                        draggable="false">
                        최근
                    </a>
                </li>
                <li :class="transAccList.accType === 'save' ? 'on' : ''">
                    <a href="javascript:;"
                        @click="transAccList.accType = 'save'"
                        draggable="false">
                        자주/퀵
                    </a>
                </li>
                <li :class="transAccList.accType === 'my' ? 'on' : ''">
                    <a href="javascript:;"
                        @click="closeModal(true)"
                        draggable="false">
                        직접입력
                    </a>
                </li>
            </ul>
        </div>
        <div class="contentsArea" v-if="transAccList.accType === 'recently'">
            <ul class="accList noLine select"
                v-if="transAccList.recentlyLists.length !== 0">
                <li v-for="(accInfo, index) in transAccList.recentlyLists" :key="index">
                    <label :for="'recently'+index">
                        <input type="checkbox" :id="'recently'+index"
                            data-accGroup="recently"
                            v-model="accInfo.isChecked"
                            :title="'즐겨찾기 계좌' + (index + 1)" />
                            <div></div>
                    </label>
                    <a href="javascript:;" @click="accInfo.isChecked=!accInfo.isChecked">
                        <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                            :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                        <h1>{{ accInfo.ownerName }}</h1>
                        <p>
                            {{ $codeToBank(accInfo.bankCode).korName }}
                            {{ accInfo.bankCode === '263' ? $hmsecToDash(accInfo.bankAccNumber) :
                                accInfo.bankAccNumber  }}
                        </p>
                    </a>
                </li>
            </ul>
            <ul v-else class="noList">
                <li>
                    <p>
                        최근 입금계좌가 없습니다.
                    </p>
                </li>
            </ul>
        </div>
        <div class="contentsArea" v-if="transAccList.accType === 'save'">
            <ul class="accList noLine select dropDown">
                <li v-for="(groups, index) in transAccList.groupNameLists" :key="index" class="groupArea">
                    <label :for="'groups'+ groups.groupCode" class="gorupTitle">
                        <input type="checkbox" :id="'groups'+ groups.groupCode"
                                @change="groupAdd($event)"
                                :data-accGroup="groups.groupCode"
                                :disabled="transAccList.groupLists.length === 0 ||
                                    transAccList.groupLists.filter(arr => arr.groupCode === groups.groupCode).length === 0"
                                :checked="transAccList.groupLists.filter(arr => arr.groupCode === groups.groupCode).length === transAccList.groupLists.filter(arr => arr.groupCode === groups.groupCode && arr.isChecked === true).length ? true : false"
                                :title="groups.groupName +' 그룹 전체 선택/해제'" />
                        <div></div>
                    </label>
                    <a href="javascript:;"
                        :class="{ 'noList': transAccList.groupLists.filter(arr => arr.groupCode === groups.groupCode).length === 0, 'on': groups.isOpened }"
                        @click="groups.isOpened = !groups.isOpened">
                        <span :class="groups.groupCode">
                            {{
                                groups.groupCode === 'often' ? '자주' :
                                groups.groupCode === 'quick' ? '퀵' : '그룹'
                            }}
                        </span>
                        <h1>{{ groups.groupName }}</h1>
                        <p>계좌 {{ transAccList.groupLists.filter(arr => arr.groupCode === groups.groupCode).length }}건</p>
                    </a>
                    <template v-if="transAccList.groupLists.filter(arr => arr.groupCode === groups.groupCode).length !== 0">
                        <transition name="slideVertical">
                            <ul class="accList noLine select"
                                v-if="groups.isOpened">
                                <li v-for="(accInfo,index) in transAccList.groupLists.filter(arr => arr.groupCode === groups.groupCode)" :key="index">
                                    <label :for="'group'+ groups.groupCode +index">
                                        <input type="checkbox" :id="'group'+ groups.groupCode +index"
                                                :data-accGroup="groups.groupCode"
                                                v-model="accInfo.isChecked"
                                                :title="groups.groupName + '그룹 계좌' + (index + 1)" />
                                        <div></div>
                                    </label>
                                    <a href="javascript:;" @click="accInfo.isChecked = !accInfo.isChecked">
                                        <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                                            :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                                        <h1>{{ accInfo.ownerName }}</h1>
                                        <p>
                                            {{ $codeToBank(accInfo.bankCode).korName }}
                                            {{ accInfo.bankCode === '263' ? $hmsecToDash(accInfo.bankAccNumber) :
                                                accInfo.bankAccNumber  }}
                                        </p>
                                    </a>
                                </li>
                            </ul>
                        </Transition>
                    </template>
                </li>
            </ul>
        </div>
        <div class="buttonArea">
            <button type="button" class="pointBlue h50"
                @click="returnAccInfo(false)">
                선택완료
            </button>
        </div>
    </div>
</template>

<script setup>
import { reactive, inject, onMounted } from 'vue'
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const transAccListAPI = '/json/banking/transAccList.json'
const myTransGroupAPI = '/json/banking/myTransGroup.json'
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
// 화면 필요 변수
const transAccList = reactive({
    accType: 'recently', // 탭별 명칭 recently(자주) | save(자주/퀵)
    recentlyLists: new Array(0), // 최근 입금계좌
    groupNameLists: new Array(0), // 지정 그룹목록
    groupLists: new Array(0) // 자주/퀵/그룹 통합
})

const preSaveLists = props.options ? props.options : new Array(0)
// 계좌리스트 가져오기
// 호출순서는 최근 > 자주 > 퀵 > 내계좌 순서로 호출한다.
// 동시 송출의 오류를 막기 위해 모두 then시점에 각각 실행한다.
// 자주, 귁은 각각 get param은 saveType으로 often, quick으로 구분한다.
// 그룹계좌 불러오기
const getGroupList = () => {
    $axios.get(transAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                const groupLists = new Array(0)
                for(const i in res.data.accList) {
                    groupLists[i] = {}
                    Object.assign(groupLists[i], res.data.accList[i])
                    let checked = false
                    if(preSaveLists.filter(arr => arr.bankCode === res.data.accList[i].bankCode && arr.bankAccNumber === res.data.accList[i].bankAccNumber).length >= 1) {
                        checked = true
                    }
                    groupLists[i].isChecked = checked
                }
                transAccList.groupLists = groupLists
            } else {
                // 오류일 시
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
// 등록 그룹 세팅
const getGroupNameList = () => {
    $axios.get(myTransGroupAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                res.data.groupList.forEach(el => {
                    const newObj = el
                    const addObj = { isOpened: false }
                    Object.assign(newObj, addObj)
                    transAccList.groupNameLists.push(newObj)
                })
            } else {
                // 에러상황
            }
            getGroupList()
        })
        .catch(function(err) {
            // API에러 상황
            console.log(err)
        })
}

// 최근계좌 불러오기
const getRecentlyList = () => {
    $axios.get(transAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 최근계좌 세팅 - json은 임시로 동일사용
                // 자주쓰는 계좌 세팅
                const groupLists = new Array(0)
                for(const i in res.data.accList) {
                    groupLists[i] = {}
                    Object.assign(groupLists[i], res.data.accList[i])
                    let checked = false
                    if(preSaveLists.filter(arr => arr.bankCode === res.data.accList[i].bankCode && arr.bankAccNumber === res.data.accList[i].bankAccNumber).length >= 1) {
                        checked = true
                    }
                    groupLists[i].isChecked = checked
                }
                transAccList.recentlyLists = groupLists
            } else {
                // 오류일 시
            }
            // getOftenList()
            getGroupNameList()
        })
        .catch(function(err) {
            console.log(err)
        })
}

// 선택 계좌 변수 저장 및
const returnAccInfo = () => {
    const returnAcc = new Array(0)
    for(const i in transAccList.recentlyLists) {
        if(transAccList.recentlyLists[i].isChecked) {
            const nowList = transAccList.recentlyLists[i]
            const addInfo = {
                ownerName: nowList.ownerName,
                bankCode: nowList.bankCode,
                bankAccNumber: nowList.bankAccNumber,
                bankAccName: nowList.bankAccName,
                sendPrice: '',
                isPhoneNumber: false,
                isSaved: nowList.isSaved,
                isQuick: nowList.isQuick,
                senderText: '', //  받는 분통장 표시
                reciverText: '' // 내 통장 표시
            }
            returnAcc.push(addInfo)
        }
    }
    for(const i in transAccList.groupLists) {
        if(transAccList.groupLists[i].isChecked) {
            const nowList = transAccList.groupLists[i]
            const addInfo = {
                ownerName: nowList.ownerName,
                bankCode: nowList.bankCode,
                bankAccNumber: nowList.bankAccNumber,
                bankAccName: nowList.bankAccName,
                sendPrice: '',
                isPhoneNumber: false,
                isSaved: nowList.isSaved,
                isQuick: nowList.isQuick,
                senderText: '', //  받는 분통장 표시
                reciverText: '' // 내 통장 표시
            }
            returnAcc.push(addInfo)
        }
    }
    $modalEnd('transAccList')
    emit('runEmits', returnAcc)
}
// 직접 입력으로 이동
const closeModal = (val) => {
    $modalEnd('transAccList')
    emit('runEmits', val)
}

// 그룹 내 목록 보기
const groupView = (ev) => {
    let parentTarget = ev.target.parentNode
    if(parentTarget.tagName === 'A') parentTarget = ev.target.parentNode.parentNode
    parentTarget.classList.contains('on') ? parentTarget.classList.remove('on') : parentTarget.classList.add('on')
}

// 전체계좌 추가 삭제
const groupAdd = (ev) => {
    const targetGroupCode = ev.target.getAttribute('data-accGroup')
    const changeTargets = transAccList.groupLists.filter(arr => arr.groupCode === targetGroupCode)
    // 추가
    for(const i in changeTargets) {
        if(ev.target.checked) {
            changeTargets[i].isChecked = true
        } else {
            changeTargets[i].isChecked = false
        }
    }
}


// 계좌 전체 불러오기
getRecentlyList()


// 최초 실행 후 처리
onMounted(() => {
    $modalStart('transAccList')
})

</script>

<style lang="postcss" scoped>
#transAccList {
    position: absolute;
    width: 100%; height: calc(100% - 132px) !important;
    padding: 0;
    box-sizing: border-box; box-shadow: 0px -2px 16px rgba(0, 0, 0, 0.12);
}
div.tabStyle03 {
    margin: 20px 20px 0;
}
div.contentsArea {
    overflow: auto;
    height: calc(100% - 46px);
    padding-bottom: 90px;
    box-sizing: border-box;
}
div.buttonArea {
    margin-left: 0 !important;
}
ul.accList {
    & ul.accList {
        margin: 0 0 0 -34px;
        background: rgba(248, 248, 248, 1);
        & li { margin-left: 20px }
    }
}
</style>
