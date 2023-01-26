<template>
    <!-- 레이아웃 잡을 시 class on 추가 -->
    <div id="modalArea" role="dialog">
        <!-- 레이아웃 잡을 시 class on 추가 -->
        <div>
            <!-- 제목열 -->
            <h1>
                지연이체 서비스 안내
                <button type="button" class="modalClose"
                    @click="returnVal(false)"></button>
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <ul class="listType01">
                    <li>지연이체서비스는 이체를 요청한 때부터 일정시간 경과 후 자금의 이체를 지급하도록 하는 제도입니다</li>
                    <li>전자금융망(인터넷뱅킹, 모바일뱅킹, 텔레뱅킹)을 이용하는 개인 및 법인 고객이 신청 가능합니다.<br>
                        - 자동화기기(ATM)거래는 해당되지 않습니다.<br>
                        - IRP, 신탁계좌는 신청 불가합니다.
                    </li>
                    <li><strong>지연이체출금 시간</strong>: <span class="fontUnderLn">(오전)10시/(오후)13시, 16시, 17</span>시 입니다.<br>
                        * 이체접수 마지막 시간은 15시 입니다.
                    </li>
                    <li>지연이체 서비스 등록 계좌가 지정한 금액 이하로 이체를 요청한 경우 즉시 출금됩니다. </li>
                    <li>지연이체서비스 신청 계좌라도 약정계좌로의 송금, 종합계좌 내 대체송금, 동일명의 본인종합계좌로의 송금시에는 지연이체 거래가 예외 적용되어 즉시이체 처리됩니다. </li>
                    <li>지연이체 서비스 등록 계좌가 즉시 이체를 원할 경우 서비스 해지 후 이체를 진행하면 가능합니다. </li>
                    <li>출금처리 시간에 잔액이 부족한 경우 미처리 될 수 있습니다. </li>
                    <li>휴일 및 영업외 시간의 경우, 출금이체 서비스가 제공되지 않습니다. </li>
                    <li>문의사항은 당사 스마트금융센터(1588-6655) 또는 가까운 영업점으로 문의 바랍니다. </li>
                    <li>
                        지연이체거래신청계좌의 이체신청 시간대별 실출금시간안내 예시
                        <table>
                            <colgroup>
                                <col width="50%">
                                <col width="50%">
                            </colgroup>
                            <tr>
                                <th>이체 신청 기간</th>
                                <td>이체 신청 기간</td>
                            </tr>
                            <tr>
                                <th>6시~8시</th>
                                <td>10시 이체실행</td>
                            </tr>
                            <tr>
                                <th>8시~11시</th>
                                <td>13시 이체실행</td>
                            </tr>
                            <tr>
                                <th>11시~14시</th>
                                <td>16시 이체실행</td>
                            </tr>
                            <tr>
                                <th>14시~15시</th>
                                <td>17시 이체실행</td>
                            </tr>
                        </table>
                    </li>
                    <li>15시 ~ 16시 신청분은 지연이체거래신청이 되어 있더라도 즉시출금 됩니다</li>
                </ul>
            </div>
            <!-- 버튼 영역 -->
            <!-- 버튼의 경우 data-buttonLength="n" 2~5개까지 균등 분배 -->
            <div class="buttonArea"
                data-buttonLength="1">
                <button type="button" class="pointBlue h50"
                    @click="returnVal(true)"
                    >확인</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
// 모달 실행 모션 on 추가 함수
const $modalStart = inject('$modalStart')
// 모달 종료 모션 on 제거 함수
const $modalEnd = inject('$modalEnd')

// 최종 실행 시 return 함수
const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    emit('runEmits', vals)
    $modalEnd('modalArea')
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
.contentsArea {
    & .listType01 {
        margin: 0 0 24px;
    }
    & table {
        width: 100%;
        margin: 24px 0 ;
        border-top: 1px solid var(--tableTopLine); border-collapse: collapse;border-spacing: 0;
        & tr:first-of-type {
            & th, & td {
                border-top: 1px solid var(--tableTopLine);
                background:#FAFAFA;
                font-size: 1rem; color: var(--tableTitleFont);
            }
        }
        & th {
            padding: 13px 0 13px 20px;
            border-right: 1px solid rgba(231, 231, 231, 1); border-bottom: 1px solid rgba(231, 231, 231, 1);
            line-height: 21px; text-align: left; font-size: 1.142rem; font-weight: 400;
        }
        & td {
            border-bottom: 1px solid rgba(220, 220, 220, 1);
            text-align: center; font-size: 1.142rem;
        }
    }
}
</style>
