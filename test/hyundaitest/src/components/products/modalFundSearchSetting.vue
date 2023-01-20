<template>
    <div id="modalArea" class="fullPopup">
        <div class="contentsArea">
            <form action="">
                <!-- 투자지역-->
                <div data-align="3">
                    <h4><strong>투자지역</strong></h4>
                    <label for="allArea">
                        <input type="checkbox" id="allArea" name="investArea" checked>
                        <div class="check">전체</div>
                    </label>
                    <label for="kor">
                        <input type="checkbox" id="kor" name="investArea">
                        <div class="check">국내</div>
                    </label>
                    <label for="overseas">
                        <input type="checkbox" id="overseas" name="investArea">
                        <div class="check">해외</div>
                    </label>
                </div>
                <!-- 펀드유형 -->
                <div data-align="3">
                    <h4><strong>펀드유형</strong></h4>
                    <label for="allType">
                        <input type="checkbox" id="allType" name="type" checked>
                        <div class="check">전체</div>
                    </label>
                    <label for="stock">
                        <input type="checkbox" id="stock" name="type">
                        <div class="check">주식형</div>
                    </label>
                    <label for="stockMix">
                        <input type="checkbox" id="stockMix" name="type">
                        <div class="check">주식혼합형</div>
                    </label>
                    <label for="bond">
                        <input type="checkbox" id="bond" name="type">
                        <div class="check">채권형</div>
                    </label>
                    <label for="bondMix">
                        <input type="checkbox" id="bondMix" name="type">
                        <div class="check">채권혼합형</div>
                    </label>
                    <label for="fofs">
                        <input type="checkbox" id="fofs" name="type">
                        <div class="check">재간접형</div>
                    </label>
                    <label for="mmf">
                        <input type="checkbox" id="mmf" name="type">
                        <div class="check">MMF</div>
                    </label>
                    <label for="derivative">
                        <input type="checkbox" id="derivative" name="type">
                        <div class="check">주식파생형</div>
                    </label>
                    <label for="specialAsset">
                        <input type="checkbox" id="specialAsset" name="type">
                        <div class="check">특별자산파생</div>
                    </label>
                </div>
                <!-- 위험등급-->
                <div data-align="2">
                    <h4><strong>위험등급</strong></h4>
                    <label for="allRisk" class="all">
                        <input type="checkbox" id="allRisk" name="riskGrade" checked>
                        <div class="check">전체</div>
                    </label>
                    <label for="veryHigh">
                        <input type="checkbox" id="veryHigh" name="riskGrade">
                        <div class="check">매우 높은 위험</div>
                    </label>
                    <label for="high">
                        <input type="checkbox" id="high" name="riskGrade">
                        <div class="check">높은 위험</div>
                    </label>
                    <label for="little">
                        <input type="checkbox" id="little" name="riskGrade">
                        <div class="check">다소 높은 위험</div>
                    </label>
                    <label for="nomal">
                        <input type="checkbox" id="nomal" name="riskGrade">
                        <div class="check">보통 위험</div>
                    </label>
                    <label for="low">
                        <input type="checkbox" id="low" name="riskGrade">
                        <div class="check">낮은 위험</div>
                    </label>
                    <label for="veryLow">
                        <input type="checkbox" id="veryLow" name="riskGrade">
                        <div class="check">매우 낮은 위험</div>
                    </label>
                </div>
                <!-- 펀드규모-->
                <div data-align="2">
                    <h4><strong>펀드규모</strong></h4>
                    <label for="allVolume" class="all" >
                        <input type="checkbox" id="allVolume" name="volume">
                        <div class="check">전체</div>
                    </label>
                    <label for="under50">
                        <input type="checkbox" id="under50" name="volume" checked>
                        <div class="check">50억 미만</div>
                    </label>
                    <label for="under100">
                        <input type="checkbox" id="under100" name="volume">
                        <div class="check">50억~100억 미만</div>
                    </label>
                    <label for="under500">
                        <input type="checkbox" id="under500" name="volume">
                        <div class="check">100억~500억 미만</div>
                    </label>
                    <label for="under1000">
                        <input type="checkbox" id="under1000" name="volume">
                        <div class="check">500억~1000억 미만</div>
                    </label>
                    <label for="under5000">
                        <input type="checkbox" id="under5000" name="volume">
                        <div class="check">1000억~5000억 미만</div>
                    </label>
                    <label for="more5000">
                        <input type="checkbox" id="more5000" name="volume">
                        <div class="check">5000억 이상</div>
                    </label>
                </div>
                <!-- 제로인평가 -->
                <div data-align="2">
                    <h4><strong>평가등급(제로인)</strong></h4>
                    <label for="allZeroin" class="all">
                        <input type="checkbox" id="allZeroin">
                        <div class="check">전체</div>
                    </label>
                    <label for="gradeA">
                        <input type="checkbox" id="gradeA" checked>
                        <div class="check">1등급
                            <!-- <img src="@/assets/images/products/icon_fundGrade1.png" alt="제로인평가 1등급" > -->
                            <!-- 체크됐을 때 -->
                            <img src="@/assets/images/products/icon_fundGrade1_on.png" alt="제로인평가 1등급">
                        </div>
                    </label>
                    <label for="gradeB">
                        <input type="checkbox" id="gradeB">
                        <div class="check">2등급
                            <img src="@/assets/images/products/icon_fundGrade2.png" alt="제로인평가 2등급">
                            <!-- <img src="@/assets/images/products/icon_fundGrade2_on.png" alt="제로인평가 2등급"> -->
                        </div>
                    </label>
                    <label for="gradeC">
                        <input type="checkbox" id="gradeC">
                        <div class="check">3등급
                            <img src="@/assets/images/products/icon_fundGrade3.png" alt="제로인평가 3등급">
                            <!-- <img src="@/assets/images/products/icon_fundGrade3_on.png" alt="제로인평가 3등급"> -->
                        </div>
                    </label>
                    <label for="gradeD">
                        <input type="checkbox" id="gradeD">
                        <div class="check">4등급
                            <img src="@/assets/images/products/icon_fundGrade4.png" alt="제로인평가 4등급">
                            <!-- <img src="@/assets/images/products/icon_fundGrade4_on.png" alt="제로인평가 4등급"> -->
                        </div>
                    </label>
                    <label for="gradeF">
                        <input type="checkbox" id="gradeF">
                        <div class="check">5등급
                            <img src="@/assets/images/products/icon_fundGrade5.png" alt="제로인평가 5등급">
                            <!-- <img src="@/assets/images/products/icon_fundGrade5_on.png" alt="제로인평가 5등급"> -->
                        </div>
                    </label>
                    <label for="gradeFail">
                        <input type="checkbox" id="gradeFail">
                        <div class="check">등급없음</div>
                    </label>
                </div>
                <!-- 운용사 -->
                <div data-align="2" class="accordionList">
                    <h4><strong>운용사</strong></h4>
                    <div>
                        <label for="allManager">
                            <input type="checkbox" id="allManager">
                            <div>전체</div>
                        </label>
                        <label for="koreainvestment">
                            <input type="checkbox" id="koreainvestment">
                            <div>한국밸류자산</div>
                        </label>
                        <label for="goldenBridge">
                            <input type="checkbox" id="goldenBridge">
                            <div >골드브릿지자산</div>
                        </label>
                        <label for="kyoboitm">
                            <input type="checkbox" id="kyoboitm">
                            <div >교보악사자산</div>
                        </label>
                        <label for="daol">
                            <input type="checkbox" id="daol">
                            <div >다올자산</div>
                        </label>
                        <label for="daishin">
                            <input type="checkbox" id="daishin">
                            <div >대신자산</div>
                        </label>
                        <label for="lazard">
                            <input type="checkbox" id="lazard">
                            <div >라자드코리아자산</div>
                        </label>
                        <label for="midas">
                            <input type="checkbox" id="midas">
                            <div >마이다스자산</div>
                        </label>
                    </div>
                </div>
            </form>
        </div>
        <div class="buttonArea div3_7">
            <button type="button" class="white h50">초기화</button>
            <button type="button" class="pointBlue h50"  @click="returnVal(true)">적용</button>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'

const $modalStart = inject('$modalStart')
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
    div.fullPopup {
        & .contentsArea {
            padding-bottom: 86px;
        }
        & div {
            & ~ div { margin-top: 24px;}
            & [data-align="3"] {
                & label {
                    width: calc(100%/3 - 6px);
                }
                & label:not(:nth-of-type(3n)) { margin-right: 8px;}
            }
            & [data-align="2"] {
                & label.all { width: 100%;}
                & label:not(.all) {
                    width: calc(100%/2 - 4px);
                }
                & label:not(:nth-of-type(odd)) { margin-right: 8px;}
            }
            & h4 { padding: 0; }
            & input[type="checkbox"] + div.check {
                padding: 0;
                border-color: rgba(236, 236, 236, 1);
                background:rgba(249, 249, 249, 1);
                text-align: center; color: rgba(140, 140, 140, 1); font-weight: 400;
                & img {
                    height: 10px;
                    padding-left: 4px;
                }
            }
            & input[type="checkbox"]:checked + div.check {
                border-color: var(--pointBlue);
                background:var(--white);
                color: var(--pointBlue); font-weight: 500;
            }
            & label {
                 margin-top: 4px;
            }
        }
        /* 아코디언스타일 */
        & .accordionList {
            & > div {
                padding: 12px 0 0;
                & label {
                    margin:0 8px 16px 0;
                    &:nth-of-type(2n) { margin-right: 0;}
                }
            }
        }
    }
</style>