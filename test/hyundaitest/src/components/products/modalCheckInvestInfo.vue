<template>
    <div id="modalArea" class="fullPopup">
        <div class="contentsArea">
            <h2>투자자 확인사항</h2>
            <table>
                <colgroup>
                    <col width="144px">
                    <col width="*">
                </colgroup>
                <tr>
                    <th>투자권유 희망여부</th>
                    <td>투자권유를 희망하지 않음</td>
                </tr>
                <tr>
                    <th>투자자정보 제공여부</th>
                    <td>투자자정보를 제공함</td>
                </tr>
            </table>
            <ul class="listType01">
                <li>투자권유를 희망하지 않거나 투자자정보를 제공하지 않는 경우에는 고객의 별도의사가 있기 전까지 회사가 투자 권유를 할 수 없습니다.</li>
                <li>투자시 <span class="fontRed">원금 손실</span>이 발생할 수 있으며, <span class="fontRed">투자 손익에 대한 책임은 모두 고객에게 귀속</span>됩니다.</li>
            </ul>
            <h2>고객 유의사항 <button type="button" class="info"></button></h2>
            <ul class="listType01">
                <li>투자권유를 희망하지 않거나 투자자정보를 제공하지 않는 경우 금융회사는 적합성 원칙 준수 의무를 부담하지 않습니다.</li>
                <li>투자권유를 희망하지 않거나 설명을 요청하지 않는 경우 금융회사는 설명의무를 부담하지 않습니다.</li>
            </ul>
        </div>
        <div class="buttonArea"
            data-buttonLength="2">
            <label for="agree">
                <input type="checkbox" id="agree">
                <div>본인은 상기내용을 읽고 해당 내용을 충분히 인지하였으며 이에 동의합니다.</div>
            </label>
            <button type="button" class="white h50"
                >취소</button>
            <button type="button" class="pointBlue h50"
                >확인</button>
        </div>
    </div>
</template>
<!-- 고객 유의사항_툴팁 -->
<!-- <ul class="listType01">
    <li>
        적합성 원칙(금융소비자보호법 제17조)
        <p>소비자의 재산상황, 금융상품 취득 ·처분·경험 등 정보를 파악하고, 소비자에게
        부적합한 금융상품의 계약 체결 권유를 금지</p>
    </li>
    <li>
        설명의무(금융소비자보호법 제19조)
        <p>금융상품의 중요사항을 소비자가 이해할 수 있도록 설명</p>
    </li>
</ul> -->
<script setup>
import { inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    const returnValue = vals || false
    emit('runEmits', returnValue)
    $modalEnd('modalArea')
}

onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    .contentsArea{
        & table {
            width: 100%;
            padding: 0; margin: 0 0 12px;
            border-collapse: collapse; border-top: 1px solid var(--tableTopLine);
            & th, & td {
                border-bottom: 1px solid rgba(220, 220, 220, 1);
            }
            & th {
                padding: 0 12px;
                border-right: 1px solid rgba(220, 220, 220, 1);
                background: var(--tableTitleBg);
                text-align: left; line-height: 40px; font-weight: 400; color: rgba(100, 100, 100, 1);
            }
            & td {
                padding: 0 12px;
                text-align: center; color: var(--black);
            }
        }
        & h2 {
            margin: 0 0 12px;
            line-height: 20px; font-size:1.142rem ;
        }
        & ul { margin-bottom: 32px;}
        & .info {
            width: 16px;
            height: 16px;
            transform: translateY(2px);
        }
    }
    .buttonArea {
        background: var(--white);
        & label {
            padding: 24px 0;
            border-top: 1px solid var(--listBorder);
        }
    }
</style>