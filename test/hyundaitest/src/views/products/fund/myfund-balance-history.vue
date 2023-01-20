<template>
    <article :class="{ 'notBottom' : props.pageInfo.bankCode === '' && props.pageInfo.bankAccNumber === '' }">
        <div class="tab">
            <label for="all">
                <input type="radio" id="all" name="viewtype"
                    value=""
                    v-model="pageInfo.viewType">
                <div>전체</div>
            </label>
            <label for="sell">
                <input type="radio" id="sell" name="viewtype"
                    value="sell"
                    v-model="pageInfo.viewType">
                <div>매도</div>
            </label>
            <label for="buy">
                <input type="radio" id="buy" name="viewtype"
                    value="buy"
                    v-model="pageInfo.viewType">
                <div>매수</div>
            </label>
        </div>
        <div class="cal range">
            <label for="fromDate">
                <input id="fromDate" type="text" readonly
                    :value="$dateToCommas(pageInfo.fromDate)"
                    @click="runComp(regDate, 'fromDate')">
                <button @click="runComp(datePicker, 'fromDate')"></button>
            </label>
            <span>~</span>
            <label for="toDate">
                <input id="toDate" type="text" readonly
                    :value="$dateToCommas(pageInfo.toDate)"
                    @click="runComp(regDate, 'toDate')">
                <button @click="runComp(datePicker, 'toDate')"></button>
            </label>
        </div>
        <div class="listSort">
            <!-- 전체 계좌 시 비노출 -->
            <label for="allAcct"
                v-if="props.pageInfo.bankCode !== '' && props.pageInfo.bankAccNumber !== ''">
                <input type="checkbox" id="allAcct">
                <div>전체선택</div>
            </label>
            <label for="checkCanceled" class="checkCanceled">
                <input type="checkbox" id="checkCanceled">
                <div>취소가능만 보기</div>
            </label>
        </div>
        <ul class="productList" :class="{ 'select' : props.pageInfo.bankCode !== '' && props.pageInfo.bankAccNumber !== '' }">
            <!-- 반복 리스트 -->
            <li>
                <label>
                    <input type="checkbox">
                    <div></div>
                </label>
                <button type="button" class="del"></button>
                <a href="javascript:;">
                    <h1>
                        NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                        <!-- red(신규매수) / blue(매도) -->
                        <span class="bullet red">신규매수</span>
                    </h1>
                </a>
                <ol class="simpleBox">
                    <li>
                        <span>처리상태</span>
                        <p class="fontLightGray">신청중</p>
                    </li>
                    <li>
                        <span>신청금액</span>
                        <p class="fontLightGray">10,000,000원</p>
                    </li>
                    <li>
                        <span>신청일</span>
                        <p class="fontLightGray">2022.08.11</p>
                    </li>
                    <li>
                        <span>결제(예정)일</span>
                        <p class="fontLightGray">2022.08.11</p>
                    </li>
                </ol>
                <div class="innerBtnBox">
                    <button type="button" v-if="pageInfo.fundList[0].isComplete"
                        @click="runComp(modalFundCancelConfirm)">주문 취소</button>
                </div>
            </li>
            <!-- // 반복 리스트 -->
            <li>
                <label>
                    <input type="checkbox">
                    <div></div>
                </label>
                <button type="button" class="del"></button>
                <a href="javascript:;">
                    <h1>
                        NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                        <!-- red(신규,추가 매수) / blue(매도) -->
                        <span class="bullet blue">매도</span>
                    </h1>
                </a>
                <ol class="simpleBox">
                    <li>
                        <span>처리상태</span>
                        <p class="fontLightGray">신청중</p>
                    </li>
                    <li>
                        <span>신청금액</span>
                        <p class="fontLightGray">10,000,000원</p>
                    </li>
                    <li>
                        <span>신청일</span>
                        <p class="fontLightGray">2022.08.11</p>
                    </li>
                    <li>
                        <span>결제(예정)일</span>
                        <p class="fontLightGray">2022.08.11</p>
                    </li>
                </ol>
                <div class="innerBtnBox">
                    <button type="button" v-if="pageInfo.fundList[1].isComplete"
                        @click="runComp(modalFundCancelConfirm)">주문 취소</button>
                </div>
            </li>
            <li>
                <label>
                    <input type="checkbox">
                    <div></div>
                </label>
                <button type="button" class="del"></button>
                <a href="javascript:;">
                    <h1>
                        NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                        <span class="bullet red">신규매수</span>
                    </h1>
                </a>
                <ol class="simpleBox">
                    <li>
                        <span>처리상태</span>
                        <p class="fontLightGray">신청중</p>
                    </li>
                    <li>
                        <span>신청금액</span>
                        <p class="fontLightGray">10,000,000원</p>
                    </li>
                    <li>
                        <span>신청일</span>
                        <p class="fontLightGray">2022.08.11</p>
                    </li>
                    <li>
                        <span>결제(예정)일</span>
                        <p class="fontLightGray">2022.08.11</p>
                    </li>
                </ol>
                <div class="innerBtnBox">
                    <button type="button" v-if="pageInfo.fundList[2].isComplete"
                        @click="runComp(modalFundCancelConfirm)">주문 취소</button>
                </div>
            </li>
        </ul>
    </article>
    <div class="buttonArea" v-if="props.pageInfo.bankCode !== '' && props.pageInfo.bankAccNumber !== ''">
        <button type="button" class="black h50"
            @click="runComp(modalFundCancelConfirm)">주문 취소</button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>

<script setup>
import { inject, reactive, markRaw } from 'vue'
import regDate from '@/components/global/regDate.vue'
import datePicker from '@/components/global/datePicker.vue'
import modalFundCancelConfirm from '@/components/products/modalFundBalance-cancelConfirm.vue' // 펀드 거래취소 확인
import modalFundCancelResult from '@/components/products/modalFundBalance-cancelResult.vue' // 펀드 거래취소 완료
const props = defineProps(['pageInfo'])
const $dateToCommas = inject('$dateToCommas')
const pageInfo = reactive({
    viewType: '',
    fromDate: new Date(),
    toDate: new Date(),
    fundList: [
        { isComplete: false },
        { isComplete: true },
        { isComplete: false }
    ]
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
// 컴포넌트 실행
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === regDate || comps === datePicker) {
        const options = []
        if(directInput === 'toDate') {
            options.checkedDate = pageInfo.toDate
            options.target = directInput
            options.minDate = pageInfo.fromDate
        } else {
            options.checkedDate = pageInfo.fromDate
            options.target = directInput
            options.maxDate = pageInfo.toDate
        }
        componentsInfo.compOption = options
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === modalFundCancelConfirm) {
        runComp(modalFundCancelResult)
    } else {
        closeComponent()
    }
}
</script>

<style lang="postcss" scoped>
article {
    min-height: calc(100% - 194px);
    padding-bottom: 84px !important;
    &.notBottom { padding-bottom: 0 !important; }
}
.tab { margin: 20px 20px 12px; }
.cal.range {
    width: calc(100% - 40px);
    margin: 0 20px;
}
.productList { margin-bottom: 6px; }
.checkCanceled { margin-left: auto; }
.simpleBox {
    margin-top: 12px;
}
</style>