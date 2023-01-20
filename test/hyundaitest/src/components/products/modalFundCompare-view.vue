<template>
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>펀드비교 상세</h1>
            <button class="modalClose" @click="returnVal()"></button>
        </div>
        <div class="remakeTable onewayTouch">
            <div class="verticalShadow"></div>
            <div class="horizonShadow"></div>
            <div class="fixedArea dataArea">
                <table>
                    <colgroup>
                        <col width="36px">
                        <col width="52px">
                    </colgroup>
                    <caption>종목 고정테이블로 펀드명 구성되어 있습니다.</caption>
                    <thead>
                        <tr>
                            <th colspan="2">펀드명</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="2">운용사</th>
                        </tr>
                        <tr>
                            <th colspan="2">기준가</th>
                        </tr>
                        <tr>
                            <th colspan="2">설정액</th>
                        </tr>
                        <tr>
                            <th colspan="2">설정일</th>
                        </tr>
                        <tr>
                            <th colspan="2">위험등급</th>
                        </tr>
                        <tr>
                            <th colspan="2">
                                평가등급<br>
                                <span >(제로인)</span>
                            </th>
                        </tr>
                        <tr>
                            <th colspan="2">
                                총보수<span>(연)</span>
                            </th>
                        </tr>
                        <tr>
                            <th rowspan="3" class="alignCenter">수<br>익<br>률<br></th>
                            <th class="alignCenter">3개월</th>
                        </tr>
                        <tr>
                            <th class="alignCenter">6개월</th>
                        </tr>
                        <tr>
                            <th class="alignCenter">1년</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="dataArea">
                <table>
                    <caption>종목 유동테이블로 운용사,기준가, 설정액, 설정일, 위험&amp;평가등급, 총보수(연),수익률  구성되어있습니다.</caption>
                    <thead>
                        <tr class="titleRow">
                            <!-- 반복 단위 -->
                            <td>
                                <!-- 펀드명 -->
                                <h2>KB스타코리아리버스인덱스증권투</h2>
                                <!-- 클래스 -->
                                <span>C-F</span>
                                <!-- 상세보기링크 -->
                                <button type="button" title="상세보기"
                                    @click="viewFund('seq')"></button>
                            </td>
                            <td>
                                <h2>미래에셋차이나그로스증권자1호(주식)</h2>
                                <span>C-P2ERS</span>
                                <button type="button" title="상세보기"
                                    @click="viewFund('seq')"></button>
                            </td>
                            <td>
                                <h2>한투크레딧ESG증권자1호(채권)C-F</h2>
                                <span>C-P2ERS</span>
                                <button type="button" title="상세보기"
                                    @click="viewFund('seq')"></button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>한국투자신탁운용</td>
                            <td>미래에셋자산운용</td>
                            <td>유겸피에스지자산운용</td>
                        </tr>
                        <tr>
                            <td>
                                1,007.73원<br>
                                <span class="fontRed iconUp">5.10</span>
                            </td>
                            <td>
                                1,007.73원<br>
                                <span class="fontRed iconUp">5.10</span>
                            </td>
                            <td>
                                1,007.73원<br>
                                <span class="fontPointBlue iconDown">5.10</span>
                            </td>
                        </tr>
                        <tr>
                            <td>18.5억</td>
                            <td>18.5억</td>
                            <td>18.5억</td>
                        </tr>
                        <tr>
                            <td>2020.07.15</td>
                            <td>2020.07.15</td>
                            <td>2020.07.15</td>
                        </tr>
                        <tr>
                            <td>초고위험</td>
                            <td>고위험</td>
                            <td>고위험</td>
                        </tr>
                        <tr>
                            <td>
                                <p>1등급</p>
                                <!-- img 등급별 @/assets/images/products/fundGrade' + 등급숫자 + '_inline.png -->
                                <img src="@/assets/images/products/fundGrade1_inline.png" alt="제로인평가 1등급">
                            </td>
                            <td>
                                <p>2등급</p>
                                <img src="@/assets/images/products/fundGrade2_inline.png" alt="제로인평가 2등급">
                            </td>
                            <td>
                                <p>5등급</p>
                                <img src="@/assets/images/products/fundGrade5_inline.png" alt="제로인평가 5등급">
                            </td>
                        </tr>
                        <tr>
                            <td>0.99%</td>
                            <td>1.99%</td>
                            <td>0.99%</td>
                        </tr>
                        <tr>
                            <td class="fontRed">
                                5.10%
                                <div>차트영역</div>
                            </td>
                            <td class="fontBlue">
                                -3.10%
                                <div>차트영역</div>
                            </td>
                            <td class="fontBlue">
                                -3.10%
                                <div>차트영역</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="fontRed">15.10%</td>
                            <td class="fontRed">23.10%</td>
                            <td class="fontRed">23.10%</td>
                        </tr>
                        <tr>
                            <td class="fontRed">15.10%</td>
                            <td class="fontRed">23.10%</td>
                            <td class="fontRed">23.10%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const $onewaySwipe = inject('$onewaySwipe')
const $tableSameHeight = inject('$tableSameHeight')
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $router = useRouter()

// 최종 실행 시 return 함수
const emit = defineEmits(['runEmits'])
const returnVal = () => {
    emit('runEmits', false)
    $modalEnd('modalArea')
}

const viewFund = (seq) => {
    $router.push({ name: 'fundView', params: seq })
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
    $onewaySwipe()
    $tableSameHeight()
})

</script>
<style lang="postcss" scoped>
    .remakeTable {
        overflow-y: hidden;
        height: 100%; max-height: calc(100% - 60px) !important;
        padding: 0 !important; margin: 20px 20px 0;
        border-top: 1px solid var(--tableTopLine); border-collapse: collapse;
        border-bottom: 1px solid var(--tableTopLine); border-collapse: collapse;
        & div.fixedArea {
            width: 92px;
        }
        & table {
            min-width: 100%;
            & thead {
                background: rgba(255,255,255,1);
                z-index: 5;
            }
            & tr {
                overflow: hidden;
            }
            & th, & td {
                padding: 12px;
                vertical-align: middle; line-height: 1;
                box-sizing: border-box;
            }
            & th {
                border-bottom: 1px solid rgba(220, 220, 220, 1); border-right: 1px solid rgba(220, 220, 220, 1);
                background:rgba(250, 250, 250, 1);
                text-align: left;
                line-height: 16px;font-size: 0.857rem; font-weight:400 ; color: var(--tableTitleFont);
                & span {
                    display:inline-block;
                    /* margin-top: 4px; */
                    font-size: 0.714rem;
                }
            }
            & td {
                /* overflow: hidden; position: relative; */
                border-bottom: 1px solid rgba(220, 220, 220, 1);
                text-align: center; font-size: 0.857rem; line-height: 17px;
                & + td {
                    border-left: 1px solid rgba(220, 220, 220, 1);
                }
                /* 변동가 */
                & span {
                    display: inline-block;
                    margin-top: 6px; padding-left: 14px;
                    line-height: 15px;
                }
                /* 등급 */
                & p {
                    margin: 0 0 6px;
                }
                /* 등급이미지 */
                & img {
                    height: 10px; width: auto;
                }
                /* 차트영역 */
                & div {
                    height: 26px;
                    margin-top: 12px;
                    background: #ccc;
                }
            }
            & tr.titleRow {
                & td {
                    position: relative;
                    z-index: 20;
                    vertical-align: top;
                    text-align: left;
                    padding-bottom: 32px;
                    /* 펀드명 */
                    & h2 {
                        overflow: hidden;
                        max-width: calc((100vw - 182px)/2); min-height: 50px; max-height: 84px;
                        margin: 0 0 8px; padding: 0;
                        text-align: left;
                        font-size: 1rem; word-break: break-all; font-weight: 400;
                    }
                    & span {
                        position: absolute;
                        left: 12px; bottom: 14px;
                        padding: 0; margin: 0;
                        color: var(--fontLightgray)
                    }
                    & button {
                        position: absolute; display: block;
                        right: 12px; bottom: 12px; width: 16px; height: 16px;
                        padding: 0; border: none; border-radius: 8px; border: 2px solid var(--fontDeepgray);
                        background: transparent url('@/assets/images/global/arrow_right_bold.png') no-repeat 4px center / 5px;
                        font-size: 0.857rem; font-weight: 400; line-height: 1.5rem;
                        opacity: .6; z-index: 21;
                    }
                }
            }
        }
    }
</style>