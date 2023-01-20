<template>
    <!-- 부적합[부적정]상품 거래 확인서 -->
    <div id="modalArea" class="fullPopup">
        <div class="contentsArea">
            <h2>상품 위험등급</h2>
            <table>
                <colgroup>
                    <col width="144px">
                    <col width="*">
                </colgroup>
                <tr>
                    <th>금융투자상품</th>
                    <td>
                        <span class="bullet red">부적합</span>
                        DB차이나바이오헬스케어자(H)[주식]C-e
                    </td>
                </tr>
                <tr>
                    <th>상품위험등급</th>
                    <td>매우높은위험(1등급)</td>
                </tr>
            </table>
            <table>
                <colgroup>
                    <col width="144px">
                    <col width="*">
                </colgroup>
                <tr>
                    <th>금융투자상품</th>
                    <td>
                        <span class="bullet red">부적합</span>
                        DB차이나바이오헬스케어자(H)[주식]C-e
                    </td>
                </tr>
                <tr>
                    <th>상품위험등급</th>
                    <td>매우높은위험(2등급)</td>
                </tr>
            </table>
            <table>
                <colgroup>
                    <col width="144px">
                    <col width="*">
                </colgroup>
                <tr>
                    <th>금융투자상품</th>
                    <td>
                        <span class="bullet red">부적합</span>
                        DB차이나바이오헬스케어자(H)[주식]C-e
                    </td>
                </tr>
                <tr>
                    <th>상품위험등급</th>
                    <td>매우높은위험(2등급)</td>
                </tr>
            </table>
            <h2>고객 유의사항</h2>
            <ul class="listType01">
                <li><span class="fontPointBlue">투자자성향 대비 위험도가 높은 투자성 상품 가입시</span><span class="fontRed">금융회사는 투자권유를 할 수 없으므로 본인 판단 하에 투자여부를 결정하셔야 합니다.</span></li>
                <li><span class="fontPointBlue">투자권유를 희망하지 않는 경우</span> 금융회사는<br><span class="fontRed">적합성 원칙<button class="info"></button> 준수 의무를 부담하지 않습니다.</span></li>
                <li><span class="fontPointBlue">투자권유를 희망하지 않거나 설명을 요청하지 않는 경우</span> 금융회사는 <span class="fontRed">설명의무<button class="info"></button> 를 부담하지 않습니다.</span></li>
                <li>투자시 원금 손실이 발생할수 있으며, <span class="fontRed">투자 손익에 대한 책임은 모두 고객에게 귀속</span>됩니다.</li>
                <li>투자자성향 대비 고위험 상품에 투자하는 경우에는 <span class="fontRed">예상보다 더 큰 폭의 손실이 발생</span>할수 있습니다.</li>
            </ul>
            <div>
                귀하께서 투자권유를 희망하지 않더라도 <span class="weight700">적정성 원칙<button class="info"></button></span> 대상 투자성 상품을 가입하고자 할 경우에는 금융회사는 면담·질문 등을 통해 해당 상품이 귀하에게 부적정하다고 판단하는 경우 평가결과 및 그 사유를 기재한 적정성 판단 보고서를 제공하고 있으니 이를 충분히 검토하고 가입할 필요가 있습니다.
            </div>
            <h2>투자자 성향별 적합한 금융투자상품</h2>
            <ul class="listType01 typeList">
                <li><strong data-color="red">공격투자형</strong>(매우)높은 위험 이하 상품</li>
                <li><strong data-color="orange">적극투자형</strong>다소 높은 위험 이하 상품</li>
                <li><strong data-color="yellow">위험중립형</strong>보통 위험 이하 상품</li>
                <li><strong data-color="lightGreen">안전추구형</strong>낮은 위험 이하 상품</li>
                <li><strong data-color="green">안정형</strong>매우 낮은 위험 상품</li>
            </ul>
            <h2>고객 확인사항</h2>
            <p>본인은 투자자확인서 결과에 따른 <span class="fontRed">본인의 가입가능상품 등급보다 위험도가 높은 금융상품을 지정</span>하였으며, 이와 관련하여 <span class="fontRed">본인은 스스로 상품의 특성을 판단하여 해당 상품에 가입함을 확인합니다.</span></p>
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
    <!-- 적합성 원칙 툴팁 -->
<!-- <div>
    <p>적합성 원칙(금융소비자보호법 제17조)</p>
    소비자의 재산상황, 금융상품 취득 ·처분·경험 등 정보를 파악하고, 소비자에게
    부적합한 금융상품의 계약 체결 권유를 금지
</div> -->
<!-- 설명의무 -->
<!-- <div>
    <p>설명의무(금융소비자보호법 제19조)</p>
    금융상품의 중요사항을 소비자가 이해할 수 있도록 설명
</div> -->
<!-- 적정성의무 -->
<!-- <div>
    <p>적정성 원칙(금융소비자보호법 제18조)</p>
    소비자가 자발적으로 구매하려는 금융상품이 소비자의 재산 등에 비추어 부적정할 경우 그 사실을 소비자에게 고지하고 확인할 의무
</div> -->
</template>
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
            padding: 0;
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
                padding: 12px;
                color: var(--black);
                & .bullet { margin-bottom: 6px;}
            }
            & ~ table { margin-top: 8px;}
        }
        & h2 {
            margin: 32px 0 12px;
            line-height: 20px; font-size:1.142rem ;
            &:first-of-type { margin-top: 0;}
        }
        & > ul {
            margin: 0; padding: 0;
            &.typeList {
                padding: 20px;
                border: 1px solid var(--tableBottomLine); border-radius: 8px;
                & li{
                    padding: 0;
                    color: var(--tableTitleFont);
                    &::before{
                        display: none;
                    }
                }
                & strong {
                    display: inline-block; position: relative;
                    min-width: 90px;
                    padding: 0 0 0 20px;
                    color: var(--black);
                    &::before {
                        content: '';
                        position: absolute;
                        left: 0; top: calc(50% - 5px);
                        width: 10px; height: 10px;
                        border-radius: 100%;
                    }
                    &[data-color="red"]::before { background:rgba(247, 62, 36, 1) ;}
                    &[data-color="orange"]::before { background: rgba(255, 135, 50, 1);}
                    &[data-color="yellow"]::before { background:rgba(255, 211, 64, 1) ;}
                    &[data-color="lightGreen"]::before { background: rgba(215, 215, 50, 1);}
                    &[data-color="green"]::before { background: rgba(178, 217, 37, 1);}
                }
            }
        }
        & > div {
            padding: 20px; margin: 12px 0 0;
            border-radius: 8px;
            background: rgba(248, 248, 248, 1);
        }
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