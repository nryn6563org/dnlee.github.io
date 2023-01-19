<!-- 투자성향 확인 -->
<!-- 공격투자형 red / 적극투자형 orange / 위헙중립형 yellow / 안전추구형 lightGreen / 안전형 green -->
<!-- <template>
    <div id="modalArea" role="dialog">
        <div class="bottomSheet">
            <h1>
                투자성향 확인
                <button type="button" class="modalClose"
                @click="returnVal()">
            </button>
        </h1>
        <div class="contentsArea">
            <div class="bgGray">
                <h2>김현대님의 투자성향은<br><span class="fontUnderLn">위험중립형</span>입니다.</h2>
                <span>
                    <img src="@/assets/images/products/bg_investType_green.png" alt="">
                </span>
                <p>마지막등록 2022.08.17</p>
            </div>
            <p>
                선택하신 상품중 고객님의 투자성향보다<br> <span class="fontUnderLnRed">높은 위험등급의 상품</span>이 포함되어 있습니다.
            </p>
            <p>고객님의 투자성향에<br>적합한 상품입니다.</p>
        </div>
        <div class="buttonArea" data-buttonLength="2">
            <button type="button" class="white h50"
                @click="returnVal(true)"
                >투자성향 확인</button>
            <button type="button" class="pointBlue h50"
                @click="returnVal(true)"
                >확인</button>
        </div>
    </div>
</div>
</template> -->
<!-- 투자권유 미희망 & 정보 미제공  / 2년경과 재등록 / 투자성향 미등록 -->
<template>
    <div id="modalArea" role="dialog">
        <div class="bottomSheet">
            <h1>
                투자성향 확인
                <button type="button" class="modalClose"
                @click="returnVal(false)">
            </button>
        </h1>
        <!-- <div class="contentsArea">
            <div class="bgGray infoBox">
                <div>
                    <p>투자권유<br><strong class="fontPointBlue">미희망</strong></p>
                    <p>투자자정보<br><strong>미제공</strong></p>
                </div>
                <p>마지막등록 2022.08.17</p>
            </div>
            <p>
                투자권유를 희망하지 않거나,<br>투자자정보를 제공하지 않는 경우<br><span class="fontUnderLnRed">고객님께 투자권유를 할 수 없습니다.</span>
            </p>
        </div> -->
        <!-- <div class="contentsArea">
            <div class="bgGray weight500">
                투자자성향진단을 하신지<br>2년이 지났습니다.
                <p>마지막등록 2022.08.17</p>
            </div>
            <p>
                투자자정보는 2년까지만 유효하므로<br>투자자정보를 다시 제공하여야 합니다.<br> <span class="fontUnderLn">다시 투자자정보 제공을 진행하시겠습니까?</span>
            </p>
        </div> -->
        <div class="contentsArea">
            <div class="bgGray weight500 txtBox">
                투자자정보 분석결과가 없습니다.
            </div>
            <p>
                투자자성향을 분석하시면,<br><span class="fontUnderLn">고객님의 투자성향에 맞는 상품을<br>추천해 드립니다.</span>
            </p>
        </div>
        <div class="buttonArea" data-buttonLength="2">
            <button type="button" class="white h50"
                @click="returnVal(true)"
                >투자성향 확인</button>
            <button type="button" class="pointBlue h50"
                @click="returnVal(true)"
                >확인</button>
        </div>
    </div>
</div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    emit('runEmits', vals)
    $modalEnd('modalArea')
}

onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    .contentsArea {
        & > div {
            padding: 24px 16px 9px;
            text-align: center;
            & h2 {
                margin: 0 0 12px;
                font-size: 1.142rem; font-weight: 400;
                & .fontUnderLn {
                    font-weight: 500; color: var(--black);
                }
            }
            & p {
                margin: 32px 0 0 ;
                text-align: right;
                font-size: 0.857rem; color: rgba(173, 173, 173, 1);
            }
            & > span {
                display: block;
                background: url('@/assets/images/products/bg_investType.png') no-repeat center top 8px / 288px 8px;
                /* background-color: red; */
                & img {
                    width: 100%;
                    max-width: 266px;
                }
            }
            &.txtBox { padding-bottom: 24px;}
        }
        & > div.infoBox {
            /* padding: 24px 16px; */
            text-align: center;
            & > div {
                display: flex;
                justify-content: space-between;
                & p {
                    width: 50%;
                    margin: 0; padding: 4px 0;
                    text-align: center; color: var(--black);
                    & ~ p { border-left: 1px solid rgba(217, 217, 217, 1);}
                }
                & strong {
                    display: inline-block;
                    padding-top: 3px;
                    font-size: 1.142rem;
                }
            }
            & p {
                margin-top: 24px;
                /* margin: 0; */
                font-weight: 400;
            }
        }
        & p {
            margin: 24px 0 6px;
            font-size: 1rem; text-align: center;
        }
    }
</style>
