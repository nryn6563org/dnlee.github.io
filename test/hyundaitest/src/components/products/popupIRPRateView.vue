<template>
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>상품금리 상세보기</h1>
            <button class="modalClose" @click="returnVal()"></button>
        </div>
        <div class="contentsArea">
            <p>2022.08.31 기준</p>
            <table>
                <colgroup>
                    <col width="84px">
                    <col width="84px">
                    <col width="84px">
                    <col width="65px">
                </colgroup>
                <tr>
                    <th>기준일</th>
                    <th>직전대비(%p)</th>
                    <th>적용금리(%)</th>
                    <th>가입기간</th>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
                <tr>
                    <td>2022.09.02</td>
                    <td>8.58</td>
                    <td>4.50</td>
                    <td>12개월</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    $modalEnd('modalArea')
    emit('runEmits', vals)
}
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
p {
    margin:18px 0 10px;
    font-size: 0.857rem; color: rgba(140, 140, 140, 1);
}
table {
    width: 100%;
    border-top: 1px solid var(--tableTopLine); border-collapse: collapse;
    & th, & td {
        padding: 12px 0;
        vertical-align: middle; font-size: 0.857rem;
        &:not(:last-child) {border-right: 1px solid rgba(220, 220, 220, 1);}
    }
    & th {
        padding: 10px 0;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
        background:rgba(250, 250, 250, 1);
        font-weight:400 ; color: var(--tableTitleFont);
        text-align: center;
        box-sizing: border-box;
    }
    & td {
        padding: 12px 0;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
        background: var(--white);
        text-align: center;
        &:not(:last-child) {border-right: 1px solid rgba(220, 220, 220, 1);}
    }
}
</style>