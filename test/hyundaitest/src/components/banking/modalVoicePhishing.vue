<!-- 피해예방 안내 -->
<template>
    <div id="modalArea" role="dialog">
        <template v-if="pageInfo.step === 'guide'">
            <div class="bottomSheet" data-name="guide">
                <h1>
                    보이스피싱 피해예방 안내
                    <button type="button" class="modalClose"
                        @click="returnVal()">
                    </button>
                </h1>
                <div class="contentsArea">
                    <h2>
                        <strong>금융사기,보이스피싱</strong>이 의심되는<br>
                        <span class="fontUnderLnRed">이체 요청</span>을 받으셨습니까?
                    </h2>
                    <ul class="listType01 gray">
                        <li>검찰, 경찰, 금융감독원이나 모르는 사람이 전화로 요청</li>
                        <li>대출하기 위해 수수료,기존 대출금 상환을 요청하며 이체 요청</li>
                        <li>문자, 메신저를 통해 친구,가족 등 지인의 이체 요청</li>
                    </ul>
                </div>
                <div class="buttonArea"
                    data-buttonLength="2">
                    <button type="button" class="white h50 w100"
                        @click="goToWarning()"
                        >예</button>
                    <button type="button" class="pointBlue h50"
                        @click="returnVal(false)"
                        >아니요(거래계속)</button>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="on" data-name="warning">
                <h1>
                    보이스피싱 피해주의
                </h1>
                <div class="contentsArea">
                    <p>
                        보이스피싱 예방 문진에 “예”를 선택하여 보이스피싱 피해가 의심됩니다. 보이스피싱 위험 확인 후 다시 거래해 주세요.<br><br>
                        검찰, 경찰 등 정부기관, 공공기관은 어떠한 경우에도 개인 계좌 등으로 돈을 이체하도록 요구하지 않습니다.
                    </p>
                    <ul class="listType01 gray">
                        <li>안전조치, 범죄조사 등 목적의 자금 이체 요청</li>
                        <li>전화로 대출 권유 시 입금요구 하면 100% 사기입니다.</li>
                        <li>신용등급을 상향 목적의 입금 요청</li>
                        <li>고금리대출을 지정해주는 계좌로 선입금 요청</li>
                        <li>햇살론 등 저금리 정부지원 자금으로 대환대출 제안</li>
                    </ul>
                </div>
                <div class="buttonArea"
                    data-buttonLength="1">
                    <button type="button" class="pointBlue h50"
                        @click="returnVal(true)"
                        >확인</button>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

// 최종 실행 시 return 함수
const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    const returnValue = vals || false
    emit('runEmits', returnValue)
    $modalEnd('modalArea')
}
const pageInfo = reactive({
    step: 'guide' // 페이지 스텝 info(최초안내) | warning(상세확인)
})
const goToWarning = () => {
    pageInfo.step = 'warning'
}
// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    #modalArea{
        /* 피해예방 안내 */
        & > div[data-name="guide"] {
            padding-bottom: 94px;
            & .contentsArea{
                & h2 {
                    margin: 27px 0 24px; padding: 48px 0 0;
                    background: url('@/assets/images/global/icon_phishing.png') no-repeat center top /42px auto ;
                    font-size: 1.428rem; font-weight: 400; line-height: 27px; text-align: center;
                    & span { font-weight: 700;}
                }
            }
            & .buttonArea[data-buttonLength="2"] {
                display: flex;
                & button{
                    &.w100 {width:100px;}
                    &.pointBlue {flex: 1;}
                }
            }
        }
        /* 피해주의 */
        & > div[data-name="warning"] {
            & > h1 + div.contentsArea { max-height: calc(100vh - 200px);}
            & .contentsArea {
                & p {
                    margin:0 0 24px;
                    font-size: 1rem; line-height: 21px;
                }
            }
        }
        /* 거래차단팝업 */
        & > div[data-name="blockTrans"]{
            padding-bottom: 94px;
            & p {
                    margin:0;
                    font-size:1.142rem; line-height: 24px;
                }
        }
    }
</style>