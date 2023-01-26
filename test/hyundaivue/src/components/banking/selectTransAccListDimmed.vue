<template>
    <div id="transAccListDimmed" role="dialog">
        <div id="transAccList" class="bottomSheet">
            <div class="tabStyle03">
                <ul :data-tabList="props.options === null ? '3' : '2'">
                    <li v-if="props.options === null"
                        :class="transAccList.accType === 'recently' ? 'on' : ''">
                        <a href="javascript:;"
                            @click="transAccList.accType = 'recently'"
                            draggable="false">
                            최근
                        </a>
                    </li>
                    <li :class="transAccList.accType === 'often' ? 'on' : ''">
                        <a href="javascript:;"
                            @click="transAccList.accType = 'often'"
                            draggable="false">
                            자주/퀵
                        </a>
                    </li>
                    <li :class="transAccList.accType === 'my' ? 'on' : ''">
                        <a href="javascript:;"
                            @click="transAccList.accType = 'my'"
                            draggable="false">
                            내 계좌
                        </a>
                    </li>
                </ul>
            </div>
            <div class="nonButton" v-if="transAccList.accType === 'recently'">
                <ul v-if="transAccList.recentlyLists.length !== 0">
                    <li v-for="(accInfo,index) in transAccList.recentlyLists" :key="index">
                        <a href="javascript:;"
                            @click="returnAccInfo(accInfo)">
                            <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                                :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                            <h1>{{ accInfo.ownerName }}</h1>
                            <p>
                                {{ $codeToBank(accInfo.bankCode).korName }}
                                {{ accInfo.bankCode === '263' ? $hmsecToDash(accInfo.bankAccNumber) :
                                    accInfo.bankAccNumber  }}
                            </p>
                        </a>
                        <button type="button"
                            :class="[accInfo.isSaved ? 'on' : '']"
                            @click="addOften(accInfo)"
                            title="자주쓰는 계좌 등록">
                        </button>
                    </li>
                </ul>
                <ul v-else class="emptyList">
                    <li>
                        <img src="@/assets/images/global/bg_emptyList.png" alt="목록 없음 알림" /><br>
                        최근 입금계좌가 없습니다.<br><br><br><br><br><br>
                    </li>
                </ul>
            </div>
            <div class="nonButton" v-if="transAccList.accType === 'often'"
                @scroll="getMoreList">
                <ul v-if="transAccList.saveLists.length !== 0">
                    <template v-for="(accInfo,index) in transAccList.saveLists" :key="index">
                        <li v-if="index < transAccList.saveListView">
                            <a href="javascript:;"
                                @click="returnAccInfo(accInfo)">
                                <span :class="[accInfo.saveType === 'often' ? '' : 'quick']">
                                    {{ accInfo.saveType === 'often' ? '자주' : '퀵' }}
                                </span>
                                <h1>{{ accInfo.ownerName }}</h1>
                                <p>
                                    {{ $codeToBank(accInfo.bankCode).korName }}
                                    {{ accInfo.bankCode === '263' ? $hmsecToDash(accInfo.bankAccNumber) :
                                        accInfo.bankAccNumber  }}
                                </p>
                            </a>
                            <button type="button"
                                :class="[accInfo.isSaved ? 'on' : '']"
                                @click="addOften(accInfo)"
                                title="자주쓰는 계좌 등록">
                            </button>
                        </li>
                    </template>
                </ul>
                <ul v-else class="emptyList">
                    <li>
                        <img src="@/assets/images/global/bg_emptyList.png" alt="목록 없음 알림" /><br>
                        등록된 계좌가 없습니다.<br><br><br><br><br><br>
                    </li>
                </ul>
            </div>
            <div class="nonButton" v-if="transAccList.accType === 'my'">
                <ul class="myList">
                    <li v-for="(accInfo,index) in transAccList.myaccList" :key="index">
                        <a href="javascript:;"
                            @click="returnAccInfo(accInfo)">
                            <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                                :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                            <h1>
                                <span class="fontPointBlue"
                                    v-if="accInfo.isContract">
                                    약정
                                </span>
                                {{ accInfo.bankAccName === '' ? '내 계좌' :  accInfo.bankAccName }}
                            </h1>
                            <p>
                                {{ $codeToBank(accInfo.bankCode).korName }}
                                {{ accInfo.bankCode === '263' ? $hmsecToDash(accInfo.bankAccNumber) :
                                    accInfo.bankAccNumber  }}
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
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
const $toastMsg = inject('$toastMsg')
const myAccListAPI = '/json/banking/myAccList.json'
const transAccListAPI = '/json/banking/transAccList.json'
const saveAccAPI = '/json/postTest.json'
const emit = defineEmits(['runEmits'])
const props = defineProps(['options'])
// 최초 실행 시 오픈뱅킹은 자주쓰는 계좌를 목록에 두지 않는다.
const firstSelected = props.options === null ? 'recently' : 'often'
// 화면 필요 변수
const transAccList = reactive({
    accType: firstSelected, // 탭별 명칭 recently(자주) | often(자주/퀵) | my(내 계좌)
    recentlyLists: new Array(0), // 최근 입금계좌
    saveListTotalCount: 0, // 자주,퀵 계좌 총 개수
    saveListView: 20, // 자주,퀵 계좌 총 개수
    saveLists: new Array(0), // 자주,퀵 계좌
    myaccList: new Array(0) // 내 계좌
})
// 계좌리스트 가져오기
// 호출순서는 최근 > 자주 > 퀵 > 내계좌 순서로 호출한다.
// 동시 송출의 오류를 막기 위해 모두 then시점에 각각 실행한다.
// 자주, 귁은 각각 get param은 saveType으로 often, quick으로 구분한다.
// 내계좌 불러오기
const getMyList = () => {
    $axios.get(myAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                transAccList.myaccList = res.data.accList
            } else {
                // 요류일 시
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
// 자주쓰는 퀵계좌 불러오기
const getQuickList = () => {
    $axios.get(transAccListAPI, { saveType: 'quick' })
        .then(function(res) {
            if(res.data.affective === 200) {
                transAccList.saveListTotalCount += res.data.saveListTotalCount
                const quickList = new Array(0)
                for(const i in res.data.accList) {
                    quickList[i] = {}
                    Object.assign(quickList[i], res.data.accList[i])
                    quickList[i].saveType = 'quick'
                }
                transAccList.saveLists = [
                    ...transAccList.saveLists,
                    ...quickList
                ]
            } else {
                // 오류일 시
            }
            getMyList()
        })
        .catch(function(err) {
            console.log(err)
        })
}
// 자주쓰는 계좌 불러오기
const getOftenList = () => {
    $axios.get(transAccListAPI, { saveType: 'often' })
        .then(function(res) {
            if(res.data.affective === 200) {
                transAccList.saveListTotalCount += res.data.saveListTotalCount
                const oftenList = new Array(0)
                for(const i in res.data.accList) {
                    oftenList[i] = {}
                    Object.assign(oftenList[i], res.data.accList[i])
                    oftenList[i].saveType = 'often'
                }
                transAccList.saveLists = oftenList
            } else {
                // 오류일 시
            }
            getQuickList()
        })
        .catch(function(err) {
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
                transAccList.recentlyLists = res.data.accList
            } else {
                // 오류일 시
            }
            getOftenList()
        })
        .catch(function(err) {
            console.log(err)
        })
}
// 자주/퀵 계좌 20개 이상일 시 10개씩 추가 읽기
const getMoreList = (ev) => {
    // saveListTotalCount: 0, // 자주,퀵 계좌 총 개수
    // saveListView: 20, // 자주,퀵 계좌 총 개수
    if(transAccList.accType === 'save') {
        const scrollMax = ev.target.children[0].scrollHeight - ev.target.offsetHeight
        if(ev.target.scrollTop >= scrollMax) {
            transAccList.saveListView = (transAccList.saveListView + 10) > transAccList.saveListTotalCount ? transAccList.saveListTotalCount : transAccList.saveListView + 10
        }
    }
}

// 선택계좌 정보 보내기
const returnAccInfo = (accInfo) => {
    const retunAcc = {
        ownerName: accInfo.ownerName ? accInfo.ownerName : true,
        bankCode: accInfo.bankCode,
        bankAccNumber: accInfo.bankAccNumber
    }
    $modalEnd('transAccListDimmed')
    emit('runEmits', retunAcc)
}

const addOften = (accInfo) => {
    // $axios.post(saveAccAPI, { accInfo })
    $axios.get(saveAccAPI, { accInfo })
        .then(function(res) {
            if(res.data.affective === 200) {
                accInfo.isSaved = !accInfo.isSaved
                if(accInfo.isSaved) {
                    $toastMsg({
                        msg: '자주 사용하는 계좌로 등록되었습니다.'
                    })
                } else {
                    $toastMsg({
                        msg: '자주 사용하는 계좌에서 삭제되었습니다.'
                    })
                }
            } else {
                // 저장실패시 토스트 호출
                $toastMsg({
                    msg: '등록에 실패하였습니다. 잠시후 다시 시도해주세요.'
                })
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}

getRecentlyList()


// 최초 실행 후 처리
onMounted(() => {
    $modalStart('transAccListDimmed')
})

</script>

<style lang="postcss" scoped>
    #transAccList {
        position: absolute;
        width: 100%; height: calc(100% - 320px) !important;
        padding-bottom: 0;
        box-sizing: border-box;
        box-shadow: 0px -2px 16px rgba(0, 0, 0, 0.12);
        & > div:not(.tabStyle03) {
            overflow: auto;
            height: calc(100% - 44px);
            & ul {
                list-style: none;
                padding: 8px 0 0 0; margin: 0;
                & li {
                    overflow: hidden; position: relative;
                    width: 100%;
                    padding: 0;
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
                        /* 자주,퀵 구분 */
                        & > span {
                            display: block;
                            height: 36px;
                            border-radius: 50%;
                            background-color: var(--pointBlue);
                            font-size: 0.857rem; text-align: center; color: rgba(255,255,255,1); line-height: 36px; font-weight: 500;
                            &.quick {
                                font-size: 1.143rem;
                            }
                        }
                    }
                    & button {
                        float: left;
                        width: 20px; height: 20px;
                        margin: 24px 0 0; padding: 0; border: none;
                        background:url('@/assets/images/banking/icon_favorite.png') no-repeat center / 20px;
                        &.on {
                            background:url('@/assets/images/banking/icon_favorite_on.png') no-repeat center / 20px;
                        }
                    }
                    &+ li {
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>
