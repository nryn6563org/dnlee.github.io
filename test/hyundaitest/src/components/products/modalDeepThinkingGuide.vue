<!-- 숙려제도 안내 -->
<!-- 다건 매수시 적정성원칙대상 상품이 포함된 경우 -->
<!-- <template>
    <div id="modalArea" role="dialog">
        <div class="bottomSheet">
            <h1>
                숙려제도 안내
                <button type="button" class="modalClose"
                    @click="returnVal(false)">
                </button>
            </h1>
            <div class="contentsArea">
                강화된 투자자 보호제도에 따라 숙려기간을 부여하는 상품이 포함되어 있습니다.<br>아래 숙려기간 부여 대상 상품은 1건씩 가입 가능합니다.
                <ul class="bgGray">
                    <li>
                        적정성원칙대상 상품
                        <p>DB차이나바이오헬스케어자(H)[주식]C-e</p>
                    </li>
                    <li>
                        고난도금융투자 상품
                        <p>DB차이나바이오헬스케어자(H)[주식]C-e</p>
                    </li>
                </ul>
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="returnVal(true)"
                    >확인</button>
            </div>
        </div>
    </div>
</template> -->
<!-- 숙려제도 안내  -->
<!-- <template>
    <div id="modalArea" role="dialog">
        <div class="bottomSheet">
            <h1>
                숙려제도 안내
                <button type="button" class="modalClose"
                    @click="returnVal(false)">
                </button>
            </h1>
            <div class="contentsArea">
                가입펀드는 강화된 투자자 보호제도에 따라 숙려기간을 부여하는 상품입니다.<br>
                <div class="bgGray">
                    가입의사를 표시하지 않은 경우<br>
                    <span class="fontUnderLnRed">상품가입이 자동취소</span> 됩니다.
                </div>
                숙려기간 내 투자 위험, 손실가능성, 최대원금손실가능액 제한 안내 (SMS발송) 받으시고, 2영업일의 숙려기간을 거쳐 상품가입의사 확정일에 발송되는 URL을 통해 최종 가입의사를 결정바랍니다.
                <p>
                    ※ 신규매수/펀드자동매수 시 신청불가 기간<br>
                    <span>숙려기간(2영업일) + 의사확정일(1영업일)에 매매 의사 확정전</span>
                </p>
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="returnVal(true)"
                    >확인</button>
            </div>
        </div>
    </div>
</template> -->
<!-- 숙려제도(+ 철회대상) 적용펀드 자동이체 신청시 -->
<template>
    <div id="modalArea" role="dialog">
        <div class="bottomSheet">
            <h1>
                숙려제도 안내
                <button type="button" class="modalClose"
                    @click="returnVal(false)">
                </button>
            </h1>
            <div class="contentsArea">
                가입펀드는 강화된 투자자 보호제도에 따라 숙려기간을 부여하는 상품입니다.<br>
                숙려기간(2영업일)+의사확정일(1영업일)에 매매의사 확정 후 자동이체입금등록 가능합니다.<br>
                <div class="left">
                    신청가능일 : 2022.08.22
                </div>
            </div>
            <div class="buttonArea">
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
        & ul {
            margin: 24px 0 4px ; padding: 20px;
            border-radius: 8px;
            list-style: none;
            & li {
                font-size: 1.142rem; font-weight: 500;
                /* color: rgba(40, 49, 58, 1); */
                & p {
                    position: relative;
                    margin: 6px 0 0; padding-left: 10px;
                    font-size: 1rem; font-weight: 400;
                    /* color: rgba(60, 60, 60, 1); */
                    &::before {
                        content: '';
                        position: absolute;
                        left: 0; top: 50%;
                        width: 4px; height: 4px;
                        border-radius: 100%;
                        background:rgba(60, 60, 60, 1) ;
                    }
                }
                & ~ li { margin-top: 16px;}
            }
        }
        & > div {
            margin:16px 0 ; padding: 20px;
            border-radius: 8px;
            background: rgba(246, 246, 246, 1);
            text-align: center; font-size: 1rem;
            & .fontUnderLnRed{ font-weight: 500;}
            &.left { text-align: left;}
        }
        & > p {
            margin:24px 0 0;
            font-size: 1rem ; font-weight: 500; color:rgba(112, 120, 132, 1) ;
            & span {
                display: inline-block;
                padding-left: 18px;
                font-weight: 400;
            }
        }
    }
</style>
