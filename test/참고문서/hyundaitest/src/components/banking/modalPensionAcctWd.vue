<template>
    <!-- 레이아웃 잡을 시 class on 추가 -->
    <div id="modalArea" role="dialog">
        <!-- 레이아웃 잡을 시 class on 추가 -->
        <div>
            <!-- 제목열 -->
            <h1>
                연금계좌인출 확인
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <ul class="bgBlue transInfoConfirm">
                    <li>
                        <span>실제 이체금액</span>
                        <p class="fontPointBlue">{{ $priceToCommas(props.options.pensionInfo.totalAccWithdrawal) }}원</p>
                    </li>
                </ul>
                <p>신청내용</p>
                <table>
                    <colgroup>
                        <col width="126px">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <th>이체금액</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.trnsferPrice) }}원</td>
                    </tr>
                    <tr>
                        <th>비과세 출금액</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.texFreeWithdrawal) }}원</td>
                    </tr>
                    <tr>
                        <th>과세 대상출금액</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.texWithdrawal) }}원</td>
                    </tr>
                    <tr>
                        <th>해지사유</th>
                        <td>{{ props.options.pensionInfo.closeReason }}</td>
                    </tr>
                    <tr>
                        <th>기타소득세</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.otherTax) }}원 </td>
                    </tr>
                    <tr>
                        <th>기타소득의<br>지방소득세</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.otherLocalTax) }}원</td>
                    </tr>
                    <tr>
                        <th>연금소득세</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.pensionTax) }}원</td>
                    </tr>
                    <tr>
                        <th>연금소득세<br>지방소득세</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.pensionLocalTax) }}원</td>
                    </tr>
                    <tr>
                        <th>해지가산세</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.terminationTax) }}원</td>
                    </tr>
                    <tr>
                        <th>해지가산세의<br>지방소득세</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.terminationLocalTax) }}원</td>
                    </tr>
                    <tr>
                        <th>이체수수료</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.feePrice) }}원</td>
                    </tr>
                    <tr data-type="total">
                        <th>계좌 총 출금액</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.totalAccWithdrawal) }}원</td>
                    </tr>
                    <tr data-type="taxTotal">
                        <th>과세 총합</th>
                        <td>{{ $priceToCommas(props.options.pensionInfo.totalTax) }}원</td>
                    </tr>
                </table>
            </div>
            <!-- 버튼 영역 -->
            <!-- 버튼의 경우 data-buttonLength="n" 2~5개까지 균등 분배 -->
            <div class="buttonArea"
                data-buttonLength="1">
                <button type="button" class="pointBlue"
                    @click="returnVal()"
                    >확인</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    emit('runEmits', false)
    $modalEnd('modalArea')
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    .contentsArea {
        position: relative;
        /* max-height: calc(100vh - 200px); */
        padding-bottom: 30px;
        box-sizing: border-box;
        /* scroll 완료시 display none  */
        &::after {
            content: '';
            position: fixed;
            width: 100%; height: 50px;
            bottom: 70px; left: 0;
            /* background: red; */
            box-shadow: inset 0 -50px 30px -20px rgb(255,255,255,.85)
        }
        & .transInfoConfirm {
            margin: 0;
            font-size: 1rem;
            & li p { font-weight: 700;}
        }
        & > p {
            margin: 24px 0 11px;
            font-size: 14px; color: var(--fontLightgray);
        }
        /* table */
        & table {
            width: 100%;
            margin:0 ;
            border-top: 1px solid var(--tableTopLine); border-collapse: collapse;border-spacing: 0;
            & th {
                padding: 13px 12px;
                border-bottom: 1px solid rgba(220, 220, 220, 1); border-right: 1px solid rgba(220, 220, 220, 1);
                background: rgba(250, 250, 250, 1);
                line-height: 21px; text-align: left; font-size: 1rem; color: var(--tableTitleFont);   font-weight: 400;
            }
            & td {
                padding: 0 12px 0 0;
                border-bottom: 1px solid rgba(220, 220, 220, 1);
                text-align: right; font-size: 1rem;
            }
            & [data-type="total"]{
                & th {
                    border-right: none;
                    background: rgba(242, 245, 249, 1);
                    font-weight: 500; color: var(--black);
                }
                & td {
                    background: rgba(242, 245, 249, 1);
                    font-weight: 700; color: var( --pointBlue);
                }
            }
            & [data-type="taxTotal"]{
                & th {
                    border-right: none;
                    background: var(--white);
                    font-weight: 500; color: var(--black);
                }
                & td {font-weight: 700;}
            }
        }
    }
</style>
