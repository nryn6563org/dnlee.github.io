<template>
    <div id="transAccList" class="bottomSheet">
        <div class="tabStyle03" @touchstart="$wideOpen($event, 'transAccList')">
            <ul :data-tabList="props.options.bankCode === '263' ? '3' : '2'">
                <li v-if="props.options.bankCode === '263'"
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
        <div class="contentsArea" v-if="transAccList.accType === 'recently'">
            <ul class="accList noLine useBtn"
                v-if="transAccList.recentlyLists.length !== 0">
                <li v-for="(accInfo,index) in transAccList.recentlyLists" :key="index">
                    <label>
                        <input type="checkbox">
                        <div></div>
                    </label>
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
                        <button type="button" class="favorite"
                            :class="{ 'on': accInfo.isSaved }"
                            @click.stop="addOften(accInfo)"
                            title="자주쓰는 계좌 등록">
                        </button>
                    </a>
                </li>
            </ul>
            <ul v-else class="noList">
                <li>
                    <p>등록된 계좌가 없습니다.</p>
                    <div></div>
                </li>
            </ul>
        </div>
        <div class="contentsArea" v-if="transAccList.accType === 'often'"
            @scroll="getMoreList">
            <ul class="accList noLine useBtn" v-if="transAccList.saveLists.length !== 0">
                <template v-for="(accInfo,index) in transAccList.saveLists" :key="index">
                    <li v-if="index < transAccList.saveListView">
                        <label>
                            <input type="checkbox">
                            <div></div>
                        </label>
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
                            <button type="button" class="favorite"
                                :class="{ 'on': accInfo.isSaved }"
                                @click.stop="addOften(accInfo)"
                                title="자주쓰는 계좌 등록">
                            </button>
                        </a>
                    </li>
                </template>
            </ul>
            <ul v-else class="noList">
                <li>
                    <p>등록된 계좌가 없습니다.</p>
                    <div></div>
                </li>
            </ul>
        </div>
        <div class="contentsArea" v-if="transAccList.accType === 'my'">
            <ul class="accList noLine">
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
</template>

<script setup>
import { reactive, inject, onMounted } from 'vue'
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $modalStart = inject('$modalStart')
const $toastMsg = inject('$toastMsg')
const $wideOpen = inject('$wideOpen')
const myAccListAPI = '/json/banking/myAccList.json'
const transAccListAPI = '/json/banking/transAccList.json'
const saveAccAPI = '/json/postTest.json'
const emit = defineEmits(['runEmits'])
const props = defineProps(['options'])
// 최초 실행 시 오픈뱅킹은 자주쓰는 계좌를 목록에 두지 않는다.
const firstSelected = props.options.bankCode === '263' ? 'recently' : 'often'
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
    $modalStart('transAccList')
})

</script>

<style lang="postcss" scoped>
#transAccList {
    position: absolute;
    width: 100%; height: calc(100% - 320px);
    z-index: 900;
    padding: 0;
    box-sizing: border-box;
    box-shadow: 0px -2px 16px rgba(0, 0, 0, 0.12);
    transition: height .2s ease-in;
    &.open {
        height: calc(100% - 134px);
    }
    & .tabStyle03 { margin: 20px 20px 0; }
    & .contentsArea {
        overflow: auto;
        height: calc(100% - 66px);
    }
}
</style>
