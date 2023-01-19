<template>
    <div>
        <!-- IRP 상세   -->
        <section>
            <!-- 선택IRP 기본정보 - 불렛 / 타이틀 / 금리 & 만기 -->
            <div class="topArea">
                <div class="basicInfo">
                    <div class="bullets">
                        <!-- 위험도 class / red(매우높은위험) / orange(높은위험) / yellow(다소높은위험) /
                            lightBlue(보통위험) / blue(낮은위험) / green(매우낮은 위험)
                            원리금보장 class / red(예적금)/ yellow(RP) / lightBlue(원리금보장형보험) / purple(어음)
                            펀드유형 class / gray (주식형,주식혼합형,채권혼합형,채권형,MMF,재간접형,부동산 간접,기타)
                            고난도 class.bgRed /
                        -->
                        <span class="bullet red">예적금 </span>
                    </div>
                    <h1>IBK플레인바닐라EMP[혼합-재간접형]Ae</h1>
                    <button type="button" title="즐겨찾기" class="on"></button>
                </div>
                <p>2022.03.03 기준</p>
                <ul>
                    <li>
                        <p>적용금리</p>
                        <h1 class="fontRed">20.20%</h1>
                    </li>
                    <li>
                        <p>만기</p>
                        <h1>12개월</h1>
                    </li>
                </ul>
            </div>
            <article>
                <!-- 상품정보 확인 -->
                <div class="bgBlueGray">
                    <h1><span class="underline">상품정보</span>를<br>확인해 보세요.</h1>
                    <h2>상품 정보</h2>
                    <table>
                        <colgroup>
                            <col width="106px">
                            <col width="*">
                        </colgroup>
                        <tr>
                            <th>이자지급</th>
                            <td>만기 일시지급</td>
                        </tr>
                        <tr>
                            <th>중도해지 이율</th>
                            <td>만기해지를 포함하여 3회 이내 중도해지 시 별도의 중도해지 이율 적용</td>
                        </tr>
                        <tr>
                            <th>상품제공기관</th>
                            <td>DB손해보험</td>
                        </tr>
                        <tr>
                            <th>예금자보호</th>
                            <td>
                                퇴직연금 예금자보호 대상<br>
                                (하단 ‘유의사항'으로 상세 확인)
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- 설명서 & 특양 파일다운 -->
                <div>
                    <h1><span class="underline">상품설명서 및 특약</span>을<br>확인해 주세요.</h1>
                    <button title="파일 다운로드" class="h50">상품설명서</button>
                    <button title="파일 다운로드" class="h50">특약</button>
                </div>
                <!-- 일자별 상품금리 -->
                <div class="bgBlueGray">
                    <h1><span class="underline">일자별 상품금리</span>를<br>확인해 보세요.</h1>
                    <p class="hasBtn">
                        2022.08.31 기준
                        <a href="javascript:;" class="inArrow gray"
                            @click="runComp(popupIRPRateView)">더보기</a>
                    </p>
                    <table class="rowStyle">
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
                    </table>
                </div>
                <!-- 유의사항 -->
                <div>
                    <h1>유의사항</h1>
                    <ul class="listType01">
                        <li>근로자퇴직급여 보장법의 규정에 따라 노동부에 규약을 신고한 사업자 및 해당 사업장의 근로자만 가입이가능</li>
                        <li>만기해지 포함하여 3회 이내에서 분할해지 가능 (단, 퇴직급여를 연금형태로 지급하기 위한 인출 및 확정급여형 퇴직연금가입자에게 퇴직급여를 지급하기 위한 인출의 경우 분할지급 횟수에서 제외)</li>
                        <li>퇴직급여 지급 및 연금지급 등 특별중도해지 사유에 해당 시 특별중도해지 이율 적용</li>
                        <li>만기도래시 최초계약기간 단위로 자동만기연장</li>
                    </ul>
                    <p class="guideTxt">
                        이 예금은 예금자보호법에 따라 예금보험공사가 보호하되, 보호한도는 다른 예금 보호대상 금융상품과는 별도로 1인당 "최고 5천만원"입니다.
                        단, 2개 이상 퇴직연금에 가입한 경우 합하여 5천만원까지 보호합니다.
                        (단, 우체국예금보험에관한법률 제4조에 의거, 우체국예금은 국가가 전액 지급 보장)
                    </p>
                </div>
            </article>
        </section>
        <div class="buttonArea">
            <button typw="button" class="h50 pointBlue">매수하기</button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp"/>
</template>
<script setup>
import { reactive, markRaw } from 'vue'
import popupIRPRateView from '@/components/products/popupIRPRateView.vue' // 상품금리 상세보기
const props = defineProps(['pageInfo'])

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
const closeComponent = (nowRun) => {
    if(!nowRun) {
        setTimeout(() => {
            componentsInfo.compName = null
            componentsInfo.compOption = null
        }, 600)
    } else {
        componentsInfo.compName = null
        componentsInfo.compOption = null
    }
}
// 컴포넌트 실행
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    closeComponent()
}
</script>
<style lang="postcss" scoped>
/* 선택상품 기본정보 */
.topArea {
    & > p {
        margin: 20px 20px 4px;
        font-size: 0.857rem; color: rgba(150, 150, 150, 1);
        text-align: right;
    }
    & > ul {
        overflow: hidden;
        margin: 0 20px; padding: 21px 0;
        list-style: none;
        border: 1px solid rgba(142, 158, 245, 1);border-radius: 16px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.16);
        & li {
            float: left;
            width: 50%;
            padding: 0 0 0 32px;
            box-sizing: border-box;
            &:first-child{
                border-right: 1px solid rgba(235, 235, 235, 1);
            }
            & > p {
                margin: 0;
                color: rgba(130, 130, 130, 1);
            }
            & > h1 {
                margin: 2px 0 0;
                font-size: 1.714rem;
            }
        }
    }
}
/* 선택상품 기본정보:불렛 / 타이틀*/
.basicInfo {
    position: relative;
    padding: 0 20px;
    & > h1 {
        width: calc(100% - 56px);
        margin: 8px 0 0;
        font-size:1.428rem ;
    }
    & > button {
        position: absolute;
        right: 30px; top: 0;
        width: 20px; height: 20px;
        padding: 0; margin-top: 2px;
        border: none;
        background:url('@/assets/images/banking/icon_favorite.png') no-repeat center / 20px;
        &.on {
            background:url('@/assets/images/banking/icon_favorite_on.png') no-repeat center / 20px;
        }
    }
}
/* 컨텐츠 */
article {
    padding-top: 40px; padding-bottom: 76px;
    & > div {
        padding: 38px 20px 60px;
        /* 영역별 타이틀 */
        & h1 {
            position: relative;
            z-index: 2;
            margin: 0;
            font-weight: 500; font-size: 1.428rem;
            & .underline {
                position: relative;
                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0px; left: 0; right: 0;
                    z-index: -1;
                    height: 14px;
                    background:  rgba(107, 142, 255, 0.2);
                }
            }
        }
        & h2 {
            margin: 20px 0 12px;
            font-size: 1.07rem; font-weight: 400;
        }
        & table {
            width: 100%;
            border-top: 1px solid var(--tableTopLine); border-collapse: collapse;
            & th, & td {
                padding: 0;
                vertical-align: middle;
                &:not(:last-child) {border-right: 1px solid rgba(220, 220, 220, 1);}
            }
            & th {
                padding: 10px 0;
                border-bottom: 1px solid rgba(240, 240, 240, 1);
                background:rgba(250, 250, 250, 1);
                font-size:1rem; font-weight:400 ; color: var(--tableTitleFont);
                text-align: center;
                box-sizing: border-box;
            }
            & td {
                padding: 12px;
                border-bottom: 1px solid rgba(240, 240, 240, 1);
                background: var(--white);
                text-align: center; font-size:1rem;
                &:not(:last-child) {border-right: 1px solid rgba(220, 220, 220, 1);}
            }
            &.rowStyle {
                & th, & td {
                    padding: 12px 0;
                    font-size: 0.857rem;
                }
            }
        }
        & ul.listType01 {
            margin: 18px 0;
        }
        /* 파일 버튼 */
        & > button {
            width: 100%; position: relative;
            padding: 0 0 0 20px; margin-top: 20px;
            background: var(--white);
            text-align: left; box-sizing: border-box;
            &::after {
                content: '';
                position: absolute;
                right: 20px; top: calc(50% - 10px);
                width: 20px; height:20px ;
                background: url('@/assets/images/global/arrow_gray.png') no-repeat center / 10px auto;
                transform: rotate(268deg);
            }
            & ~ button { margin-top: 8px;}
        }
        & > p {
            margin: 0;
            &.hasBtn {
                margin: 20px 0 10px;
                font-size: 0.857rem; color: var(--fontLightgray);
                & a {
                    float: right;
                    text-decoration: none;
                }
            }
            &.guideTxt {
                position: relative;
                padding: 0 0 0 17px;
                color: rgba(112, 120, 132, 1);
                &::before {
                    content: '※';
                    position: absolute;
                    left: 0; top: 0;
                }
            }
        }
        &:last-child { padding-bottom: 34px;}
    }
}
</style>