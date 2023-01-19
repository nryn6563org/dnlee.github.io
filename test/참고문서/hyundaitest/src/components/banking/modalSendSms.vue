<template>
    <div id="sendSMS" class="fullPopup">
        <div class="header">
            <h1>휴대폰 문자보내기</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <template v-if="pageInfo.step === 'info'">
            <div class="contentsArea">
                <article>
                    <h4 class="gray">메세지 내용</h4>
                    <label for="sendMassage">
                        <textarea id="sendMassage" v-model="pageInfo.sendMsg"></textarea>
                    </label>
                    <h4 class="gray">보내는 사람</h4>
                    <label for="senderInfo">
                        <input id="senderInfo" type="text" class="h50" disabled
                            :value="props.options.userName + ' ' + $phoneToDashes(props.options.userCelphone)">
                    </label>
                    <h4 class="gray">받는 사람</h4>
                    <label for="searchPhoneBook" class="search">
                        <input type="search" class="h50"
                            id="searchPhoneBook" name="searchPhoneBook"
                            readonly inputmode="none"
                            placeholder="성명, 연락처 검색/입력"
                            v-model="pageInfo.phoneSearchKeyWord"
                            @click="findPhoneBook()">
                        <button title="검색" type="button"
                            @click="findPhoneBook()"></button>
                        <span class="gray">휴대폰 문자메시지는 통신사 사정으로 메시지 도착이 지연되거나 메시지 전달 실패할 수 있습니다.</span>
                    </label>
                </article>
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="doSend()"
                    >보내기</button>
            </div>
        </template>
        <template v-else>
            <div class="contentsArea phoneBook">
                <label for="searchPhoneBook" class="search">
                    <input type="search" class="h50"
                        id="searchPhoneBook"
                        name="searchPhoneBook"
                        placeholder="성명, 연락처 검색/입력"
                        v-model="pageInfo.phoneSearchKeyWord"
                        @keyup="doSearchPhone($event); $checkButton($event)">
                    <button title="검색" type="button"
                        @click="doSearchPhone('searchPhoneBook')"></button>
                    <button title="내용삭제" class="resetInput" type="button" style="display: none"
                        @click="$resetInput('searchPhoneBook', $event); doSearchPhone('searchPhoneBook')"></button>
                </label>
                <div>
                    <ul class="noList" v-if="pageInfo.phoneBookList.length === 0">
                        <li>
                            <img src="@/assets/images/global/bg_emptyList.png" alt="목록 없음 알림" /><br>
                            <strong>저장된 연락처가 없습니다.</strong><br>
                            전화번호 직접입력하여<br>
                            이체하실 수 있습니다.<br>
                            <button type="button"
                                v-if="/^[0-9]+$/.test(pageInfo.phoneSearchKeyWord) && pageInfo.phoneSearchKeyWord !== ''"
                                @click="searchEnd(pageInfo.phoneSearchKeyWord)">
                                {{ pageInfo.phoneSearchKeyWord }} 연락처로 보내기
                            </button>
                            <template v-else>
                                <div style="height: 50px; margin-top: 12px;"> </div>
                            </template>
                        </li>
                    </ul>
                    <ul v-else class="accList noLine" :class="{ 'noList' : pageInfo.phoneBookSearchResult.length === 0 }">
                        <!-- 정상 노출  -->
                        <template v-if="pageInfo.phoneBookSearchResult.length !== 0">
                            <li v-for="(phoneBook, index) in pageInfo.phoneBookSearchResult" :key="index">
                                <a href="javascript:;" @click="searchEnd(phoneBook.phoneNumber)">
                                    <img src="@/assets/images/banking/icon_people.png" alt="연락처 아이콘" />
                                    <h1>{{ phoneBook.userName }}</h1>
                                    <p>{{ $phoneToDashes(phoneBook.phoneNumber) }}</p>
                                </a>
                            </li>
                        </template>
                        <!-- 검색결과 없이 숫자만 입력했을 시  -->
                        <template v-else>
                            <li>
                                <p>
                                    <strong>연락처에 없는 친구네요.</strong><br>
                                    전화번호 직접입력하여<br>
                                    이체하실 수 있습니다.<br>
                                </p>
                                <button type="button"
                                    v-if="/^[0-9]+$/.test(pageInfo.phoneSearchKeyWord) && pageInfo.phoneSearchKeyWord !== ''"
                                    @click="searchEnd(pageInfo.phoneSearchKeyWord)">
                                    {{ pageInfo.phoneSearchKeyWord }} 연락처로 보내기
                                </button>
                                <template v-else>
                                    <div></div>
                                </template>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $phoneToDashes = inject('$phoneToDashes')
const $priceToCommas = inject('$priceToCommas')
const $checkButton = inject('$checkButton')
const $toastMsg = inject('$toastMsg')
const $resetInput = inject('$resetInput')
const $axios = inject('$axios')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const phoneBookAPI = '/json/global/phoneBook.json'

const pageInfo = reactive({
    step: 'info', // info(보내기 화면) / search(검색화면)
    sendMsg: props.options.userName + '님께서 ' + props.options.reciverName + '고객님 계좌로' + $priceToCommas(props.options.sendPrice) + '원 송금하셨습니다.', // 최초 송부 메세지 세팅
    sendPhoneNumber: '', // 실제 송부할 폰번호
    phoneSearchKeyWord: '', // 검색용 키워드
    phoneBookList: new Array(0), // 전체 연락처 리스트
    phoneBookSearchResult: new Array(0) // 화면 출력용 리스트
})

// 연락처 목록 가져오기
const getPhoneBookLists = () => {
    $axios.get(phoneBookAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.phoneBookList = res.data.phoneBookList
                pageInfo.phoneBookSearchResult = res.data.phoneBookList
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
// 연락처 검색
const doSearchPhone = (target) => {
    if(typeof (target) === 'string') {
        pageInfo.phoneSearchKeyWord = document.getElementById(target).value
    }
    // 화면 확인 진행용
    // 검색 시 phoneBookList는 유지 phoneBookSearchResult를 통해 화면에 표기된다.
    if(pageInfo.phoneSearchKeyWord === '') {
        pageInfo.phoneBookSearchResult = pageInfo.phoneBookList
    } else {
        pageInfo.phoneBookSearchResult = []
    }
}

// 전화번호 검색
const findPhoneBook = () => {
    pageInfo.step = 'search'
    pageInfo.phoneSearchKeyWord = ''
    if(pageInfo.phoneBookList.length === 0) {
        getPhoneBookLists()
    }
}

// 검색 결과내 번호 입력
const searchEnd = (returnNumber) => {
    pageInfo.sendPhoneNumber = returnNumber
    pageInfo.step = 'info'
}

// 메세지 전송 실패시 toast 성공시 emit false
const doSend = () => {
    // 메세지 전송 결과 실패체크 관련 임시
    $axios.get('/json/postTest.json', {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 메세지 성공 시나리오
                $toastMsg({ msg: '메세지를 성공적으로 전송하였습니다.' })
            } else {
                $toastMsg({ msg: '메세지 전송에 실패하였습니다..' })
            }
            returnVal()
        })
        .catch(function(err) {
            // 에러상황
            console.log(err)
        })
}

// 일반 종료
const returnVal = () => {
    $modalEnd('sendSMS')
    emit('runEmits', false)
}
// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('sendSMS')
})
</script>
<style lang="postcss" scoped>
.contentsArea {
    & > div { overflow: auto; height: calc(100% - 62px); }
    & h4 {
        padding: 0;
        margin-top: 24px;
        &:first {
            margin-top: 20px;
        }
    }
    & label {
        width: 100%;
        & > *:not(button) { width: 100%; }
    }
    & ul.accList {
        width: 100%; height: 100%;
        box-sizing: border-box;
        & > li > a { padding-left: 0; padding-right: 0; }
    }
}

div.fullPopup { height: 100%; }
</style>