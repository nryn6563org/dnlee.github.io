<template>
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>다른 종류(클래스)펀드 보기</h1>
            <button class="modalClose" @click="returnVal()"></button>
        </div>
        <div class="contentsArea">
            <table>
                <colgroup>
                    <col width="*">
                    <col width="74px">
                    <col width="74px">
                </colgroup>
                <tr>
                    <th>펀드명</th>
                    <th>총보수<br>(연)</th>
                    <th>선취<br>수수료</th>
                </tr>
                <tr>
                    <td>
                        신한러시아증권자투자신탁(H)[주식]종류C-e
                        <p>수수료미징구 - 온라인</p>
                    </td>
                    <td>1.98%</td>
                    <td>0.000%</td>
                </tr>
                <tr>
                    <td>신한러시아증권자투자신탁(H)[주식]종류C2
                        <p>수수료미징구 - 온라인 -퇴직연금</p></td>
                    <td>2.39%</td>
                    <td>0.000%</td>
                </tr>
                <tr>
                    <td>신한러시아증권자투자신탁(H)[주식]종류C1<p>수수료미징구 - 온라인</p></td>
                    <td>2.49%</td>
                    <td>0.000%</td>
                </tr>
                <tr>
                    <td>신한러시아증권자투자신탁(H)[주식]종류C4<p>수수료미징구 - 온라인</p></td>
                    <td>2.19%</td>
                    <td>0.000%</td>
                </tr>
                <tr>
                    <td>신한러시아증권자투자신탁(H)[주식]종류C4<p>수수료미징구 - 온라인</p></td>
                    <td>2.19%</td>
                    <td>0.000%</td>
                </tr>
                <tr>
                    <td>신한러시아증권자투자신탁(H)[주식]종류C4<p>수수료미징구 - 온라인</p></td>
                    <td>2.19%</td>
                    <td>0.000%</td>
                </tr>
                <tr>
                    <td>신한러시아증권자투자신탁(H)[주식]종류C4<p>수수료미징구 - 온라인</p></td>
                    <td>2.19%</td>
                    <td>0.000%</td>
                </tr>
            </table>
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
    const returnValue = vals || false
    emit('runEmits', returnValue)
    $modalEnd('modalArea')
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
div.fullPopup > div:not(.buttonArea) { padding-bottom: 0;}
table {
    width: 100%;
    border-top: 1px solid var(--tableTopLine); border-collapse: collapse;
    & th, & td {
        padding: 0;
        vertical-align: middle; line-height: 1;
        &:not(:last-child) {border-right: 1px solid rgba(231, 231, 231, 1);}
    }
    & th {
        padding: 12px 0;
        border-bottom: 1px solid rgba(231, 231, 231, 1);
        background:rgba(250, 250, 250, 1);
        text-align: center;
        line-height: 21px;font-size:1rem; font-weight:400 ; color: var(--tableTitleFont);
        box-sizing: border-box;
    }
    & td {
        padding: 12px;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
        background: var(--white);
        line-height: 21px;text-align: center; font-size:1rem;
        &:first-child { text-align: left;}
        &:not(:last-child) {border-right: 1px solid rgba(220, 220, 220, 1);}
        & p {
            margin: 8px 0 0;
            line-height: 15px;font-size:0.857rem ; color:rgba(150, 150, 150, 1) ;
        }
    }
}
</style>