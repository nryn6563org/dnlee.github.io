<!-- 입금미지정계좌 이체한도 -->
<template>
    <!-- 레이아웃 잡을 시 class on 추가 -->
    <div id="modalArea" role="dialog">
        <!-- 레이아웃 잡을 시 class on 추가 -->
        <div>
            <!-- 제목열 -->
            <h1>
                {{ props.options.bankCode !== '263' ? '오픈뱅킹 이체한도 안내' :
                    props.options.isDesignated ? '이체한도조회' : '입금미지정계좌 이체한도' }}
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <!-- 오픈뱅킹일 시 -->
                <!-- 1일 이체한도는 고정 1천만원 -->
                <template v-if="props.options.bankCode !== '263'">
                    <div>
                        <span>1일 이체한도</span>
                        <p>3,000,000원</p>
                    </div>
                    <p>오픈뱅킹 1일 이체한도는 전 금융기관 합산 1일 3백만원으로, 현대차증권 이체한도와는 별도로 운영합니다. 단, 출금기관의 계좌별 이체한도가 적용될 수 있습니다. </p>
                </template>
                <!-- 연금일 시 -->
                <!-- 현재 임시로 당일이체 한도로 값을 지정 -->
                <template v-else-if="props.options.bankAccTypeCode === '03'">
                    <div>
                        <span>실제출금액</span>
                        <p>{{ $priceToCommas(translimit.todayRemaining) }}원</p>
                    </div>
                    <p>이체수수료가 포함되지 않은 금액이므로, 이체수수료 합산 시 금액이 달라질 수 있습니다.</p>
                </template>
                <!-- 미지정 계좌일 시 -->
                <!-- 현재 임시로 당일이체 한도로 값을 지정 -->
                <template v-else-if="!props.options.isDesignated">
                    <div>
                        <span>이체한도</span>
                        <p>{{ $priceToCommas(translimit.todayRemaining) }}원</p>
                    </div>
                    <p>입금지정 서비스 가입 계좌로, 미지정된 계좌로 이체하는 경우, 1일 100만원 이내로 이체 가능합니다.</p>
                </template>
                <!-- 일반 정상의 경우 -->
                <template v-else>
                    <div class="basicTable">
                        <table>
                            <colgroup>
                                <col width="100px">
                                <col width="*">
                            </colgroup>
                            <tr>
                                <th>약정</th>
                                <td>
                                    1회 {{ $priceToCommas(translimit.contractOnce) }}원<br>
                                    1일 {{ $priceToCommas(translimit.contractOneDay) }}원
                                </td>
                            </tr>
                            <tr>
                                <th>미약정<br>3등급
                                </th>
                                <td>
                                    1회 {{ $priceToCommas(translimit.UncontractedOnce) }}원<br>
                                    1일 {{ $priceToCommas(translimit.UncontractedOneDay) }}원
                                </td>
                            </tr>
                            <tr>
                                <th>당일이체<br>잔여한도</th>
                                <td>{{ $priceToCommas(translimit.todayRemaining) }}원</td>
                            </tr>
                        </table>
                    </div>
                </template>
            </div>
            <!-- 버튼 영역 -->
            <div class="buttonArea"
                data-buttonLength="1">
                <button type="button" class="pointBlue h50"
                    @click="returnVal(false)"
                    >확인</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted } from 'vue'
const $axios = inject('$axios')
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const transLimitCheckAPI = '/json/banking/transLimitCheck.json'
const pensionTransCheckAPI = '/json/banking/pensionTransCheckAPI.json'

const returnVal = (vals) => {
    emit('runEmits', vals)
    $modalEnd('modalArea')
}

const translimit = reactive({
    contractOnce: 0, // 약정 1회 한도
    contractOneDay: 0, // 약정 1일 한도
    UncontractedOnce: 0, // 미약정 1회 한도
    UncontractedOneDay: 0, // 미약정 1일 한도
    todayRemaining: 0 // 당일이체 잔여한도
})
// 잔액 조회
const transLimitCheck = () => {
    if(props.options.bankAccTypeCode !== '03') {
        $axios.get(transLimitCheckAPI, {})
            .then(function(res) {
                if(res.data.affective === 200) {
                    const limitData = res.data.limitPrice
                    translimit.contractOnce = limitData.contractOnce
                    translimit.contractOneDay = limitData.contractOneDay
                    translimit.UncontractedOnce = limitData.UncontractedOnce
                    translimit.UncontractedOneDay = limitData.UncontractedOneDay
                    translimit.todayRemaining = limitData.todayRemaining
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    } else {
        $axios.get(pensionTransCheckAPI, {})
            .then(function(res) {
                if(res.data.affective === 200) {
                    translimit.todayRemaining = res.data.pensionInfo.totalAccWithdrawal
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    }
}
transLimitCheck()


// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    div[role="dialog"] > div:not(.bottomSheet) {
        & .contentsArea {
            & > div:not(.basicTable) {
                display: flex;
                justify-content: space-between;
                padding: 0 0 12px;
                border-bottom: 1px solid rgba(215, 215, 215, 1);
                & span {
                    font-size: 1.142rem;
                }
                & p {
                    margin: 0;
                    font-size: 1.142rem; font-weight: 700;
                }
            }
            & > p {
                margin: 0; padding: 8px 0 0;
                font-size: 1.143rem;
                word-break: break-all;
            }
        }
    }
</style>
