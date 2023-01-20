<template>
    <div>
        <!-- 펀드 신규매수 완료 -->
        <section id="autoFundBuy">
            <div class="titleInStep">
                <h1>
                    반복투자정보를<br>
                    입력해주세요.
                </h1>
                <span>
                    <strong>3</strong>/3
                </span>
            </div>
            <!-- 계좌정보들 -->
            <div class="roundBlock">
                <ul class="accList noLine">
                    <li>
                        <a href="javascript:;">
                            <img src="/images/logos/004.png" alt="로고">
                            <p><strong>출금</strong> <span>{{ $codeToBank('004').korName }}</span></p>
                            <p>1234567890 홍길동</p>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <img src="/images/logos/263.png" alt="로고">
                            <p><strong>입금</strong> <span>{{ $codeToBank('263').korName }}</span></p>
                            <p>
                                <!-- 현대차증권일 경우 '-'표시 -->
                                {{ $hmsecToDash(1234567890) }}
                                홍길동
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <hr>
            <!-- 다건매수일 때만 노출 -->
            <div class="listSort">
                <label for="samePrice">
                    <input type="checkbox" id="samePrice">
                    <div>이체금액 동일하게 입력</div>
                </label>
            </div>
            <ul class="productList delete">
                <!-- 반복 리스트 단위 -->
                <li>
                    <button type="button" title="삭제" class="del"></button>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                    </a>
                    <div>
                        <h4 class="gray">이체일</h4>
                        <button type="button" class="h50 select dimmed"
                            @click="runComp(reSelect)">
                            <span>이체일 선택</span>
                        </button>
                        <h4 class="gray">
                            저축기간
                            <button class="info" type="button"
                                @click="$viewTip($event)">
                                <div class="tip01">만기일 이후에는 자동이체가 처리되지 않아 총 이체 횟수는 1년에 12회 미만으로 처리될 수 있습니다.</div>
                            </button>
                        </h4>
                        <div class="innerBtnBox">
                            <label for="date1Y">
                                <input type="radio" id="date1Y" name="dateCheck">
                                <div class="check">1년</div>
                            </label>
                            <label for="date3Y">
                                <input type="radio" id="date3Y" name="dateCheck">
                                <div class="check">3년</div>
                            </label>
                            <label for="date5Y">
                                <input type="radio" id="date5Y" name="dateCheck">
                                <div class="check">5년</div>
                            </label>
                        </div>
                        <div class="cal range noButton"
                            @click="runComp(monthScrollPicker)">
                            <label for="fromDate">
                                <input id="fromDate" type="text" class="h50" readonly
                                    :value="$monthToCommas(new Date())">
                            </label>
                            <span>~</span>
                            <label for="toDate">
                                <input id="toDate" type="text" class="h50" readonly
                                    :value="$monthToCommas(new Date())">
                            </label>
                        </div>
                        <label for="retry01" class="checkRetry">
                            <input type="checkbox" id="retry01">
                            <div>
                                재입금 신청(실패 시 D+2 일 출금 재시도)
                                <button class="info" type="button" @click="$viewTip($event)">
                                    <div class="tip02">재입금 신청시 지정이체출금일+2영업일에 상대금융기관 출금계좌에서 재출금 처리되어 익영업일 등록한 계좌(상품)로 입금됩니다.</div>
                                </button>
                            </div>
                        </label>
                    </div>
                </li>
                <!-- // 반복리스트 단위 -->
                <li>
                    <button type="button" title="삭제" class="del"></button>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                    </a>
                    <div>
                        <h4 class="gray">이체일</h4>
                        <button type="button" class="h50 select dimmed"
                            @click="runComp(reSelect)">
                            <span>이체일 선택</span>
                        </button>
                        <h4 class="gray">
                            저축기간
                            <button class="info" type="button"
                                @click="$viewTip($event)">
                                <div class="tip01">만기일 이후에는 자동이체가 처리되지 않아 총 이체 횟수는 1년에 12회 미만으로 처리될 수 있습니다.</div>
                            </button>
                        </h4>
                        <div class="innerBtnBox">
                            <label for="date1Y">
                                <input type="radio" id="date1Y" name="dateCheck">
                                <div class="check">1년</div>
                            </label>
                            <label for="date3Y">
                                <input type="radio" id="date3Y" name="dateCheck">
                                <div class="check">3년</div>
                            </label>
                            <label for="date5Y">
                                <input type="radio" id="date5Y" name="dateCheck">
                                <div class="check">5년</div>
                            </label>
                        </div>
                        <div class="cal range noButton"
                            @click="runComp(monthScrollPicker)">
                            <label for="fromDate">
                                <input id="fromDate" type="text" class="h50" readonly
                                    :value="$monthToCommas(new Date())">
                            </label>
                            <span>~</span>
                            <label for="toDate">
                                <input id="toDate" type="text" class="h50" readonly
                                    :value="$monthToCommas(new Date())">
                            </label>
                        </div>
                        <label for="retry01" class="checkRetry">
                            <input type="checkbox" id="retry01">
                            <div>
                                재입금 신청(실패 시 D+2 일 출금 재시도)
                                <button class="info" type="button" @click="$viewTip($event)">
                                    <div class="tip02">재입금 신청시 지정이체출금일+2영업일에 상대금융기관 출금계좌에서 재출금 처리되어 익영업일 등록한 계좌(상품)로 입금됩니다.</div>
                                </button>
                            </div>
                        </label>
                    </div>
                </li>
            </ul>
        </section>
        <div class="buttonArea div3_7">
             <button typw="button" class="h50 white" @click="$router.push({ name: 'autoFundBuyEnter' })">이전</button>
             <button typw="button" class="h50 pointBlue" @click="$router.push({ name: 'autoFundBuyResult' })">확인</button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { computed, inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import monthScrollPicker from '@/components/global/monthScrollPicker.vue'
import reSelect from '@/components/global/reSelect.vue'
const $monthToCommas = inject('$monthToCommas')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $viewTip = inject('$viewTip')
const $router = useRouter()

// 일자 세팅
const selectDays = computed(() => {
    const dateData = new Array(0)
    for(let i = 0; i < 28; i++) {
        const listData = []
        const addObj = { listValue: i + 1, listName: i + 1 < 10 ? '0' + (i + 1) + '일' : i + 1 + '일' }
        Object.assign(listData, addObj)
        dateData.push(listData)
    }
    return dateData
})
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

const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === monthScrollPicker) {
        componentsInfo.compOption = {
            fromDate: new Date(),
            toDate: new Date(),
            fixDate: 'fromDate'
        }
    } else if(comps === reSelect) {
        componentsInfo.compOption = {
            title: '이체일자 선택',
            listData: selectDays
        }
    }
}
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    closeComponent()
}

// console.log(selectDays)
</script>
<style lang="postcss" scoped>
#autoFundBuy { padding-bottom: 76px; }
ul.productList {
    margin-bottom: 20px;
    & > li > div:last-child {
        margin-top: 0;
    }
    & > li:last-child {
        border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
    & h4 {
        margin-top: 28px; padding: 0;
    }
    & button.select {
        width: 100%;
    }
    & .innerBtnBox {
        margin-bottom: 12px;
    }
    & .checkRetry {
        margin-top: 28px;
        & div {
            font-size: 1rem;
        }
    }
}
.accList > li {
    & a { padding-top: 0 !important; padding-bottom: 0 !important; }
    & img { top: 4px !important; }
    & + li { margin-top: 12px; }
}
.roundBlock {
    margin-bottom: 32px;
}
/* 팁메세지 부분 별도 선언 */
.tip01 {
    top: 20px;
    left: -22px;
}
.tip02 {
    top: -122px;
    left: -235px;
}
</style>