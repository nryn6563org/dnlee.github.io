<template>
    <div id="scrollArea" @scroll="scrollAct($event)">
        <!-- 펀드 상세 -->
        <section id="fundViewArea">
            <div class="topArea">
                <!-- 선택펀드 기본정보-->
                <div class="fundList">
                    <div class="fundType">
                        <!-- 위험도 class / red(매우높은위험) / orange(높은위험) / yellow(다소높은위험) /
                            lightBlue(보통위험) / blue(낮은위험) / green(매우낮은 위험) -->
                        <span class="bullet blue">낮은위험 </span>
                        <span class="bullet gray">기타</span>
                        <button type="button" title="즐겨찾기" class="on"></button>
                    </div>
                    <h1>유리차이나 백마주 뉴웨이브 증권투자신탁[주식]C/C-P1e</h1>
                    <div class="fundDetail">
                        <ul>
                            <li>수수료미청구</li>
                            <li>온라인</li>
                            <li>퇴직연금</li>
                        </ul>
                    </div>
                </div>
                <!-- 기준가 & 수익률 -->
                <div class="priceInfo">
                    <p>2022.03.03 기준</p>
                    <ul>
                        <li>
                            <p>기준가</p>
                            <h1>1,224.77<span class="fontBlue iconDown">8.74</span></h1>
                        </li>
                        <li>
                            <p>수익률(3개월)</p>
                            <h1 class="fontBlue">-10.05%</h1>
                        </li>
                    </ul>
                </div>
                <!-- 배너슬라이드 -->
                <swiper
                    :pagination="true"
                    :modules="swiperModules"
                    :slides-per-view="1"
                    :space-between="20"
                    class="fundBanner">
                    <swiper-slide>
                        <div>
                            <h2>
                                주요내용
                                <p>이 펀드에 대한 주요 내용을<br>영상으로 쉽게 이해해 보세요!</p>
                            </h2>
                            <a href="javascript:;" title="유투브 이동"><img src="@/assets/images/global/sns_yuutube.png" alt="유투브 로고"></a>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div>
                            <h2>
                                주요내용
                                <p>이 펀드에 대한 주요 내용을 영상으로 쉽게 이해해 보세요!</p>
                            </h2>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <h1 class="headerTitle">
                <!-- vue router history back : router.go(-1) -->
                <button type="button" title></button>
                NH-Amundi코리아2배인버스레버리지증권투자신탁 [주식-파생재간접형]Class
            </h1>
            <!-- tab메뉴 -->
            <div class="tabStyle04 h40">
                <ul data-tabList="4">
                    <li :class="transManageInfo.selectTabMenu === 'fundInfo' ? 'on' : ''"
                        @click="selectTabMenu('fundInfo')">
                        <a href="javascript:;"
                            draggable="false">
                            펀드정보
                        </a>
                    </li>
                    <li :class="transManageInfo.selectTabMenu === 'yield' ? 'on' : ''"
                        @click="selectTabMenu('yield')">
                        <a href="javascript:;"
                            draggable="false">
                            수익률/기준가
                        </a>
                    </li>
                    <li :class="transManageInfo.selectTabMenu === 'ristAnal' ? 'on' : ''"
                        @click="selectTabMenu('ristAnal')">
                        <a href="javascript:;"
                            draggable="false">
                            위험분석
                        </a>
                    </li>
                    <li :class="transManageInfo.selectTabMenu === 'asset' ? 'on' : ''"
                        @click="selectTabMenu('asset')">
                        <a href="javascript:;"
                            draggable="false">
                            자산구성
                        </a>
                    </li>
                </ul>
            </div>
            <!-- 펀드정보 탭 -->
            <article v-if="transManageInfo.selectTabMenu === 'fundInfo'">
                <div>
                    <h1><span class="underline">펀드 정보</span>를<br>확인해 보세요.</h1>
                    <div class="gradeInfo">
                        <!-- gradeA, gradeB, gradeC,gradeE,gradeF, fail -->
                        <span class="riskGrade gradeD">
                            <h3>보통 위험</h3>
                            <p>위험등급</p>
                        </span>
                        <!-- gradeA, gradeB, gradeC,gradeE,gradeF-->
                        <span class="zeroinGrade gradeC">
                            <h3>3등급</h3>
                            <p>평가등급(제로인)</p>
                        </span>
                    </div>
                    <h2>펀드 정보</h2>
                    <table>
                        <colgroup>
                            <col width="100px">
                            <col width="*">
                        </colgroup>
                        <tr>
                            <th>펀드유형</th>
                            <td>재간접형</td>
                        </tr>
                        <tr>
                            <th>설정일</th>
                            <td>2019.01.14</td>
                        </tr>
                        <tr>
                            <th>운영규모</th>
                            <td>55.60억원</td>
                        </tr>
                        <tr>
                            <th>운용사</th>
                            <td>하나USB자산운용</td>
                        </tr>
                    </table>
                </div>
                <div class="bgBlueGray">
                    <h1><span class="underline">펀드 투자시 고려할 비용</span>은<br>얼마나 될까요?</h1>
                    <table>
                        <colgroup>
                            <col width="100px">
                            <col width="*">
                        </colgroup>
                        <tr>
                            <th>선취수수료</th>
                            <td>없음</td>
                        </tr>
                        <tr>
                            <th>환매수수료</th>
                            <td>없음</td>
                        </tr>
                        <tr>
                            <th>펀드보수(연)</th>
                            <td>연 1.3000% <button title="보수정보" class="info"></button></td>
                        </tr>
                    </table>
                </div>
                <div>
                    <h1><span class="underline">매매 기준가 적용일</span>은<br> 언제일까요?</h1>
                    <p>펀드는 가입(매수)신청일이나 환매(매도)신청일에 바로 처리되지 않고, 펀드별 영업일 적용 기준에 따라 처리됩니다.</p>
                    <h2>펀드 정보</h2>
                    <table>
                        <colgroup>
                            <col width="112px">
                            <col width="100px">
                            <col width="100px">
                        </colgroup>
                        <tr>
                            <th>구분</th>
                            <th>기준가 적용일</th>
                            <th>매수(가입)일</th>
                        </tr>
                        <tr>
                            <th>17시 이전 신청</th>
                            <td>3영업일</td>
                            <td>3영업일</td>
                        </tr>
                        <tr>
                            <th>17시 이후 신청</th>
                            <td>4영업일</td>
                            <td>4영업일 </td>
                        </tr>
                    </table>
                    <h2>환매(매도)</h2>
                    <table>
                        <colgroup>
                            <col width="112px">
                            <col width="100px">
                            <col width="100px">
                        </colgroup>
                        <tr>
                            <th>구분</th>
                            <th>기준가 적용일</th>
                            <th>지급일</th>
                        </tr>
                        <tr>
                            <th>17시 이전 신청</th>
                            <td>3영업일</td>
                            <td>3영업일</td>
                        </tr>
                        <tr>
                            <th>17시 이후 신청</th>
                            <td>4영업일</td>
                            <td>4영업일 </td>
                        </tr>
                    </table>
                </div>
                <div class="bgBlueGray">
                    <h1><span class="underline ">투자설명서 및 보고서를</span><br>확인해 주세요.</h1>
                    <ul class="fileList">
                        <li>
                            <button title="파일 다운로드" class="h50">(간이)투자설명서</button>
                        </li>
                        <li>
                            <button title="파일 다운로드" class="h50">투자설명서</button>
                        </li>
                        <li>
                            <button title="파일 다운로드" class="h50">집약투자규약</button>
                        </li>
                        <li>
                            <button title="파일 다운로드" class="h50">운용보고서</button>
                        </li>
                    </ul>
                </div>
                <button type="다른 종류펀드 보기" @click="runComp(modalMoreFundList)">다른 종류(클래스) 펀드<span class="fontPointBlue">7개</span></button>
            </article>
            <!-- 수익률/기준가 -->
            <article class="yield" v-if="transManageInfo.selectTabMenu === 'yield'">
                <div>
                    <h1><span class="underline">수익률</span>을<br>확인해 보세요.</h1>
                    <div>
                        <form action="">
                            <div>
                                <label for="oneMonth">
                                    <input type="radio" id="oneMonth" name="date">
                                    <div class="blue">1개월</div>
                                </label>
                                <label for="threeMonth">
                                    <input type="radio" id="threeMonth" name="date">
                                    <div class="blue">3개월</div>
                                </label>
                                <label for="sixMonth">
                                    <input type="radio" id="sixMonth" name="date">
                                    <div class="blue">6개월</div>
                                </label>
                                <label for="oneYear">
                                    <input type="radio" id="oneYear" name="date">
                                    <div class="blue">1년</div>
                                </label>
                                <label for="threeYears">
                                    <input type="radio" id="threeYears" name="date">
                                    <div class="blue">3년</div>
                                </label>
                            </div>
                        </form>
                        <div class="chart">
                            차트영역
                        </div>
                    </div>
                    <h2>
                        기간수익률 <span>(2022.06.16기준)</span>
                    </h2>
                    <table>
                        <colgroup>
                            <col width="33.3%">
                            <col width="33.3%">
                            <col width="33.3%">
                        </colgroup>
                        <tr>
                            <th>구분</th>
                            <th>펀드</th>
                            <th>벤치마크</th>
                        </tr>
                        <tr>
                            <th>1개월</th>
                            <td class="fontBlue">-0.76%</td>
                            <td class="fontBlue">-3.38%</td>
                        </tr>
                        <tr>
                            <th>3개월</th>
                            <td class="fontBlue">-4.84%</td>
                            <td class="fontBlue">-3.38%</td>
                        </tr>
                        <tr>
                            <th>6개월</th>
                            <td class="fontBlue">-0.76%</td>
                            <td class="fontBlue">-3.38%</td>
                        </tr>
                        <tr>
                            <th>1년</th>
                            <td class="fontBlue">-0.76%</td>
                            <td class="fontBlue">-3.38%</td>
                        </tr>
                        <tr>
                            <th>3년</th>
                            <td class="fontRed">15.97%</td>
                            <td class="fontRed">3.38%</td>
                        </tr>
                        <tr>
                            <th>YTM</th>
                            <td class="fontRed">29.64%</td>
                            <td class="fontRed">3.38%</td>
                        </tr>
                        <tr>
                            <th>설정일이후</th>
                            <td class="fontRed">32.64%</td>
                            <td class="fontRed">13.38%</td>
                        </tr>
                    </table>
                </div>
                <div class="bgBlueGray">
                    <h1><span class="underline">기준가</span>를<br>확인해 보세요.</h1>
                    <div>
                        <form action="">
                                <div>
                                    <label for="price1Month">
                                        <input type="radio" id="price1Month" name="basePrice">
                                        <div class="blue">1개월</div>
                                    </label>
                                    <label for="price3Month">
                                        <input type="radio" id="price3Month" name="basePrice">
                                        <div class="blue">3개월</div>
                                    </label>
                                    <label for="price6Month">
                                        <input type="radio" id="price6Month" name="basePrice">
                                        <div class="blue">6개월</div>
                                    </label>
                                    <label for="price1Year">
                                        <input type="radio" id="price1Year" name="basePrice">
                                        <div class="blue">1년</div>
                                    </label>
                                    <label for="price3Years">
                                        <input type="radio" id="price3Years" name="basePrice">
                                        <div class="blue">3년</div>
                                    </label>
                                </div>
                        </form>
                        <div class="chart"> 차트영역</div>
                    </div>
                    <h2>
                        기간수익률<span>(2022.07.16기준)</span>
                        <a href="javascript:;" class="inArrow noLine gray"
                            @click="runComp(moreYield)">더보기</a>
                    </h2>
                    <table>
                        <colgroup>
                            <col width="33.3%">
                            <col width="33.3%">
                            <col width="33.3%">
                        </colgroup>
                        <tr>
                            <th>일자</th>
                            <th>기준가</th>
                            <th>설정액</th>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                    </table>
                </div>
            </article>
            <!-- 위험분석 -->
            <article v-if="transManageInfo.selectTabMenu === 'ristAnal'">
                <div class="analysisTable">
                    <h1><span class="underline">지표분석</span>을<br>참고해 보세요.</h1>
                    <div data-name="standard">
                        <h2>
                            표준 편차
                        </h2>
                        <p>통계적인 방법을 통해 수익률 변동폭을 측정, 과거의 수익률 등락 정도를 확인할 수 있는 지표 표준편차가 클수록 수익률 변동폭이 큼</p>
                    </div>
                    <table>
                        <colgroup>
                            <col width="77px">
                            <col>
                            <col>
                            <col>
                            <col>
                        </colgroup>
                        <tr>
                            <th>구분</th>
                            <th>3개월</th>
                            <th>6개월</th>
                            <th>1년</th>
                            <th>3년</th>
                        </tr>
                        <tr>
                            <th>펀드</th>
                            <td>2.14</td>
                            <td>2.24</td>
                            <td>0.84</td>
                            <td class="fontRed">9.49</td>
                        </tr>
                        <tr>
                            <th>%순위</th>
                            <td>84</td>
                            <td>65</td>
                            <td>43</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <th>동일유형</th>
                            <td>2.14</td>
                            <td>2.24</td>
                            <td>0.84</td>
                            <td class="fontRed">11.49</td>
                        </tr>
                    </table>
                    <div data-name="sharpIndex">
                        <h2>
                            샤프지수
                        </h2>
                        <p>수익률을 위험(표준편차)로 나눠 계산,위험 조정성과로 많이 사용되는 지표위험의 한 단위당 수익률을 나타내어값이 높을수록 성공적 투자성과</p>
                    </div>
                    <table>
                        <colgroup>
                            <col width="77px">
                            <col>
                            <col>
                            <col>
                            <col>
                        </colgroup>
                        <tr>
                            <th>구분</th>
                            <th>3개월</th>
                            <th>6개월</th>
                            <th>1년</th>
                            <th>3년</th>
                        </tr>
                        <tr>
                            <th>펀드</th>
                            <td class="fontBlue">-2.14</td>
                            <td class="fontBlue">-2.24</td>
                            <td class="fontBlue">-0.84</td>
                            <td class="fontRed">0.49</td>
                        </tr>
                        <tr>
                            <th>%순위</th>
                            <td>84</td>
                            <td>65</td>
                            <td>43</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <th>동일유형</th>
                            <td class="font Blue">-2.14</td>
                            <td class="font Blue">-2.24</td>
                            <td class="font Blue">-0.84</td>
                            <td class="fontRed">0.49</td>
                        </tr>
                    </table>
                </div>
            </article>
            <!-- 자산구성 -->
            <article v-if="transManageInfo.selectTabMenu === 'asset'">
                <div>
                    <h1><span class="underline">자산구성</span>을<br>확인해 보세요.</h1>
                    <h2>총자산 구성</h2>
                    <div class="chart">
                        차트영역
                    </div>
                    <h2>국가별 투자비중</h2>
                    <table>
                        <colgroup>
                            <col width="*">
                            <col width="100px">
                        </colgroup>
                        <tr>
                            <th>상위 국가</th>
                            <th>비중(%)</th>
                        </tr>
                        <tr>
                            <td>미국</td>
                            <td>48.71</td>
                        </tr>
                        <tr>
                            <td>한국</td>
                            <td>7.85</td>
                        </tr>
                        <tr>
                            <td>홍콩</td>
                            <td>4.61</td>
                        </tr>
                        <tr>
                            <td>덴마크</td>
                            <td>4.49</td>
                        </tr>
                        <tr>
                            <td>스페인</td>
                            <td>3.49</td>
                        </tr>
                    </table>
                    <button type="button" title="더보기" class="moreList">더보기</button>
                </div>
                <div class="bgBlueGray" >
                    <h1><span class="underline">보유종목 현황</span>을<br>확인해 보세요.</h1>
                    <form action="">
                        <div>
                            <label for="stock">
                                <input type="radio" id="stock" name="type" checked>
                                <div class="blue">주식</div>
                            </label>
                            <label for="bond">
                                <input type="radio" id="bond" name="type">
                                <div class="blue">채권</div>
                            </label>
                        </div>
                    </form>
                    <table data-name="ownListTable">
                        <colgroup>
                            <col width="*">
                            <col width="74px">
                        </colgroup>
                        <tr>
                            <th>종목명</th>
                            <th>비중(%)</th>
                        </tr>
                        <tr>
                            <td>VANGUARD S&P 500 ETF</td>
                            <td>48.71</td>
                        </tr>
                        <tr>
                            <td>GLOBAL X NASD 100 COV CALL ETF</td>
                            <td>7.85</td>
                        </tr>
                        <tr>
                            <td>Invesco QQQ Trust Seris 1</td>
                            <td>4.61</td>
                        </tr>
                        <tr>
                            <td>SPDR Portfolio S&P 500 High Di</td>
                            <td>4.49</td>
                        </tr>
                        <tr>
                            <td>VANGUARD INFO TECH ETF</td>
                            <td>3.49</td>
                        </tr>
                        <tr>
                            <td>iShares Semiconductor ETF</td>
                            <td>3.49</td>
                        </tr>
                        <tr>
                            <td>Consumer Staples Select Sector</td>
                            <td>3.49</td>
                        </tr>
                        <tr>
                            <td>VANGUARD UTILITIES ETF</td>
                            <td>3.49</td>
                        </tr>
                        <tr>
                            <td>맥쿼리인프라</td>
                            <td>3.49</td>
                        </tr>
                        <tr>
                            <td>Health Care SPDR(ETF)</td>
                            <td>3.49</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <h1>유의사항
                        <!-- <button type="button" title="더보기"> 더보기</button> -->
                    </h1>
                    <ul class="listType01">
                        <li>이 금융상품은 예금자보호법에 따라 예금보호공사 보호하지 않으며, 실적배당 상품으로서 투자원금의 손실이 날수 있습니다.</li>
                        <li>집한투증권은 운용결과에 따른 이익 또는 손실이 투자자에게 귀속됩니다.</li>
                        <li>집한투증권은 취득하기 전에 투자대상,보수,수수료 및 환매방법 등에 관하여 (간이)투자설명서를 반드시 읽어보시기 바랍니다.</li>
                    </ul>
                </div>
            </article>
        </section>
        <div class="buttonArea" :class="{ 'bgBlueGray' : transManageInfo.selectTabMenu === 'yield' }">
             <button typw="button" class="h50 pointBlue" @click="$router.push({ name: 'newFundBuyStart' })">매수하기</button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { reactive, markRaw, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'
import moreYield from '@/components/products/popupYield.vue'
import modalMoreFundList from '@/components/products/modalMoreFundList.vue'
import 'swiper/css'
const props = defineProps(['baseInfo'])
const $router = useRouter()

const swiperModules = [Pagination]
const transManageInfo = reactive({
    selectTabMenu: 'fundInfo' // 수익률 yield , 위험분석 ristAnal, 자산구성 asset
})

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
// 컴포넌트 애니메이션을 위해 nowRun === true가 아니면 600의 셋타임을 갖는다
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
// 일반 모달 종료
const runComp = (comps, directInput) => {
    // markRaw뒤에 컴포넌트 명 입력
    // 현재 실행중인 컴포넌트 중복 방지
    componentsInfo.compName = markRaw(comps)
}

// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    // const comps = componentsInfo.compName
    closeComponent()
}


// 탭메뉴 선택
const selectTabMenu = (menu) => {
    transManageInfo.selectTabMenu = menu
}

const scrollAct = (e) => {
    const scrollTop = e.target.scrollTop
    const targetTitle = document.querySelector('.headerTitle')
    const targetTab = document.querySelector('.tabStyle04')
    // 좌표
    const relativeTop = targetTitle.getBoundingClientRect().top
    if (scrollTop > 0 && relativeTop <= 0) {
        targetTitle.classList.add('on')
        targetTab.classList.add('on')
    } else {
        targetTitle.classList.remove('on')
        targetTab.classList.remove('on')
    }
}
watch(() => transManageInfo.selectTabMenu, () => {
    const targetTitle = document.querySelector('#scrollArea')
    const topAreaHeight = document.querySelector('.topArea').offsetHeight + 55
    targetTitle.scrollTo({ top: topAreaHeight, behavior: 'smooth' })
})
// runModal(modalMoreFundList)
</script>
<style lang="postcss" scoped>
section {
    /* 최상단 해당 펀드 정보 */
    /* padding-bottom: 90px; */
    & .fundList {
        padding: 0 20px;
        & .fundType {
            & span ~ span { margin-left:4px ; }
            & > button {
                float: right;
                width: 20px; height: 20px;
                padding: 0; margin-top: 2px;
                border: none;
                background:url('@/assets/images/banking/icon_favorite.png') no-repeat center / 20px;
                &.on {
                    background:url('@/assets/images/banking/icon_favorite_on.png') no-repeat center / 20px;
                }
            }
        }
        & > h1 {
            position: relative;
            width: calc(100% - 56px);
            margin: 8px 0 0;
            line-height: 24px; font-size:1.428rem ;
            box-sizing: border-box;
            & > span {
                position: absolute;
                top:2px; left: -23px;
                font-size: 1.285rem; font-weight: 500;
            }
        }
        & .fundDetail {
            margin: 4px 0 0;
            & ul {
                overflow: hidden; display: inline-block; position: relative;
                margin: 0; padding: 0;
                list-style: none;
                & li {
                    position: relative; float: left;
                    line-height: 18px; font-size:0.857rem; color:rgba(150, 150, 150, 1) ;
                    & ~ li {
                        margin-left: 4px ; padding-left: 8px;
                        &::before {
                            content: '-';
                            position: absolute;
                            left: 0; top: 0;
                        }
                    }
                    &:first-child{
                        padding: 0 0 0 4px;
                        &::before {
                            content: '(';
                            position: absolute;
                            left: 0px; top: 0;
                            /* margin: 0 4px 0 0 ; */
                        }
                    }
                    &:last-child::after {
                        content: ')';
                        right: 0; top: 0;
                    }
                }
            }
        }
    }
    /*기준가 & 수익률*/
    & .priceInfo {
        padding: 0 20px; margin-top: 20px;
        & > p {
            margin: 0 0 8px; padding: 0 12px 0 0;
            font-size: 0.857rem; color:rgba(150, 150, 150, 1);
            text-align: right;
        }
        & > ul {
            overflow: hidden;
            margin: 0; padding: 0 24px;
            list-style: none;
            border: 1px solid rgba(142, 158, 245, 1);border-radius: 16px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.16);
            & li {
                float: left;
                padding: 24px 0 20px ;
                &:first-child{
                    padding-right: 14px;
                    border-right: 1px solid rgba(235, 235, 235, 1);
                }
                &:last-child { padding-left: 15px;}
                & > p {
                    margin: 0 0 5px;
                    color: rgba(130, 130, 130, 1); line-height:16px;
                }
                & > h1 {
                    margin: 0;
                    font-size: 1.714rem;
                    & span {
                        padding: 0 0 0 20px;
                        font-size:0.857rem ;
                        &.iconUp, &.iconDown {
                            background-position: left 8px center;
                        }
                    }
                }
            }
        }
    }
    /* 상세 */
    & h1.headerTitle {
        overflow: hidden; position: relative;
        height: 40px;
        z-index: -1; margin: 0; padding: 0;
        background: var(--white);
        opacity: 0;
        font-size: 1.125rem; line-height: 50px;
        word-break: break-all; text-overflow: ellipsis;  white-space: nowrap; box-sizing:border-box;
        &.on {
            position: sticky;
            height: 50px;
            top: 0px; z-index: 3; padding: 0 30px 0 40px;
            opacity: 1;
        }
        & button {
            position: absolute;
            left: 12px ; top: calc(50% - 12px);
            width: 24px; height: 24px;
            padding: 0;
            border-radius: 0; border: none;
            background: url('@/assets/images/global/arrow_right.png') no-repeat center / 7px auto;
            transform: rotateY(180deg);
        }
    }
    & article {
        &:not(.yield) { padding-bottom: 90px; }
        &.yield {
            & > div:last-child {
                padding-bottom: 90px;
            }
        }
        & > div {
            padding: 40px 20px 60px;
            &:first-of-type { padding-top: 0px;}
            &:last-child { padding-bottom: 4px;}
            /* 타이틀 */
            & > h1 {
                position: relative;
                z-index: 2;
                margin: 0;
                line-height: 27px; font-weight: 500; font-size: 1.428rem;
                /* 더보기버튼 */
                & > button {
                    float: right;
                    padding: 0 20px 0 0;
                    border: none;
                    background: url('@/assets/images/global/arrow_right_gray.png') no-repeat right 3px center / 7px auto;
                    line-height: 27px; font-size: 1rem; font-weight: 400; color: rgba(128, 128, 128, 1);
                }
            }
            & > h2 {
                margin: 0 0 12px;
                line-height: 19px; font-weight: 400; font-size: 1.071rem;
                & span {
                    font-size:0.857rem ; color: rgba(150, 150, 150, 1);
                }
                & a { float: right; }
            }
            & > p {
                margin: 16px 0 32px;
                font-weight: 400; color: rgba(128, 128, 128, 1); line-height: 19px;
            }
            & > h1 + h2 {margin-top: 20px;}
            & > table + h2 { margin-top: 33px;}
            & > h2 + p { margin: 8px 0 20px; }
            & > h1 + table { margin-top: 33px;}
            & table {
                width: 100%;
                border-top: 1px solid var(--tableTopLine); border-collapse: collapse;
                & th, & td {
                    padding: 0;
                    vertical-align: middle; line-height: 1;
                    &:not(:last-child) {border-right: 1px solid rgba(220, 220, 220, 1);}
                }
                & th {
                    border-bottom: 1px solid rgba(240, 240, 240, 1);
                    background:rgba(250, 250, 250, 1);
                    text-align: center;
                    line-height: 40px;font-size:1rem; font-weight:400 ; color: var(--tableTitleFont);
                    box-sizing: border-box;
                }
                & td {
                    border-bottom: 1px solid rgba(240, 240, 240, 1);
                    background: var(--white);
                    line-height: 40px; text-align: center; font-size:1rem;
                    &:not(:last-child) {border-right: 1px solid rgba(220, 220, 220, 1);}
                }
                &[data-name="ownListTable"]{
                    margin-top:16px ;
                    & th, & td {
                        border-bottom: 1px solid rgba(231, 231, 231, 1);
                    }
                }
            }
            & ul.fileList {
                margin: 20px 0 0; padding: 0;
                list-style: none;
                & li {
                    & button {
                        width: 100%; position: relative;
                        padding: 0 0 0 20px;
                        /* border: none; */
                        /* background: var(--white) url('@/assets/images/global/icon_file_pdf.png') no-repeat left 20px center / 20px auto ; */
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
                    }
                    & ~ li { margin-top: 8px;}
                }
            }
            & ul.listType01 { margin-top: 20px;}
            /* tab펀드정보 > >펀드정보 */
            & .gradeInfo {
                display: flex;
                margin: 20px 0 32px;
                & h3 {
                    margin: 18px 0 2px;
                    font-size: 1rem; font-weight: 500;
                }
                & p {
                    margin: 0;
                    font-size: 0.785rem; color: rgba(150, 150, 150, 1); line-height: 14px;
                }
                /* 위험등급 */
                & .riskGrade {
                    display: block; position: relative;
                    width: 50%; height: 118px;
                    padding: 44px 0 0;
                    border-right: 1px solid rgba(245, 245, 245, 1);
                    background: url('@/assets/images/products/icon_ristGrade.png') no-repeat top center / 84px auto;
                    text-align: center;
                    box-sizing: border-box;
                    &::after {
                        content: '';
                        position: absolute;
                        top: 15px; left: calc(50% - 3px); z-index: 1;
                        width: 6px ; height:  30px;
                        background: url('@/assets/images/products/icon_ristGrade_arrow.png') no-repeat center / auto 28px;
                        transform-origin: 0 100%;
                    }
                    &.gradeA::after { left:50%;transform: rotate(285deg);}
                    &.gradeB::after {transform: rotate(316deg);}
                    &.gradeC::after {transform: rotate(347deg);}
                    &.gradeD::after {transform: rotate(14deg);}
                    &.gradeF::after {transform: rotate(41deg);}
                    &.fail::after { top: 10px; transform: rotate(69deg);}
                }
                /* 제로인평가 */
                & .zeroinGrade
                {
                    display: block; position: relative;
                    width: 50%; height: 118px;
                    padding: 44px 0 0;
                    background: url('@/assets/images/products/fundGrade3_multi.png') no-repeat top center / auto 40px;
                    text-align: center;
                    box-sizing: border-box;
                    &.gradeA { background-image: url('@/assets/images/products/fundGrade1_multi.png');}
                    &.gradeB { background-image: url('@/assets/images/products/fundGrade2_multi.png');}
                    &.gradeC { background-image: url('@/assets/images/products/fundGrade3_multi.png');}
                    &.gradeD { background-image: url('@/assets/images/products/fundGrade4_multi.png');}
                    &.gradeF { background-image: url('@/assets/images/products/fundGrade5_multi.png');}
                }
            }
            & form > div {
                margin-top: 32px;
                display: flex;
                /* input 스타일 */
                & label {
                        width: 60px;
                        &~ label { margin-left: 4px;}
                    }
            }
            /* tab위헙분석 > 지표분석 */
            &.analysisTable {
                & div {
                    position: relative;
                    min-height: 105px;
                    margin: 20px 0;
                    /* background: url('@/assets/images/products/img_colorChart_blue.png') no-repeat right 20px top 28px/ 69px auto ; */
                    box-sizing: border-box;
                    & h2 {
                        overflow: hidden;
                        margin: 0 20px 0 0;
                        line-height: 19px; font-weight: 400; font-size: 1.071rem;
                    }
                    & p {
                        margin: 8px 0 0;padding: 0 100px 0 0;
                        font-weight: 400; font-size: 0.928rem; color: rgba(128, 128, 128, 1); line-height: 19px;
                    }
                    &[data-name="standard"] {
                        &::after {
                            background: url('@/assets/images/products/img_colorChart_blue.png') no-repeat left -20px top 0/ 69px auto;
                        }
                    }
                    &[data-name="sharpIndex"] {
                        margin-top: 33px;
                        &::after {
                            background: url('@/assets/images/products/img_colorChart_red.png') no-repeat left -20px bottom 0/ 69px auto;
                        }
                    }
                    &::after {
                        content: '';
                        position: absolute;
                        top: 8px; right: 20px;
                        width: 49px; height:96px;
                    }
                }

            }
        }
        /* 매수하기 */
        & > button {
            overflow: hidden;
            width: 100%;
            padding: 0 40px 0 20px;
            border:none; border-bottom: 1px solid rgba(229, 229, 229, 1); border-radius: 0;
            background: var(--white) url('@/assets/images/global/arrow_right_medium.png') no-repeat right 20px center /16px auto ;
            line-height: 55px; text-align: left; font-size: 1rem;
            & span { float: right;}
        }
    }
}
/* 슬라이드 */
.swiper.fundBanner {
    width: 100%;
    padding: 0 20px 20px; margin: 16px 0 0;
    box-sizing: border-box;
    & .swiper-wrapper {
        & .swiper-slide {
            overflow:hidden ;
            padding: 20px 28px;
            border-radius: 16px;
            background: rgba(245, 245, 245, 1);
            box-sizing: border-box;
            & div {
                display: flex;
                justify-content: space-between; align-items: center;
                & h2 {
                    margin: 0;
                    font-size: 1rem;
                    & p {
                        margin: 4px 0 0;
                        font-size: 0.857rem; font-weight: 400; line-height: 18px; color: rgba(100, 100, 100, 1);
                    }
                }
                & a {
                    display: block;
                    width: 48px; height: 48px;
                    & img {
                        width: 100%;
                    }
                }
            }
        }
    }
}
.tabStyle04 {
    height: 38px;
    margin: 0 0 20px;
    & li {
        height: 38px;
        line-height: 38px;
        font-size: 1rem;
    }
    &.on {
        position: sticky;
        top: 50px; z-index: 3;
        margin-top: 0;
    }
}
/* 텍스트 언더라인 스타일 */
.underline {
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
/* info 버튼 */
.info {
    width: 16px; height: 16px;
    padding: 0; margin-left: 4px;
    border: none;
    background: transparent url('@/assets/images/global/icon_info_gray.png') no-repeat center /contain ;
    vertical-align: middle;
}
/* 리스트더보기 버튼 */
.moreList {
    display: block;
    margin: 16px auto 0; padding:0 20px 0 0 ;
    border: none;
    background: url('@/assets/images/global/arrow_gray_light.png') no-repeat right 0 center / 16px auto;
    line-height: 16px; font-size: 1rem; font-weight: 400; color:rgba(128, 128, 128, 1);
}
.buttonArea {
    padding: 0 20px 20px;
    background-color: rgba(255,255,255,1);
    bottom: 0;
    z-index: 10;
    /* &.bgBlueGray { background-color: rgba(246, 247, 249, 1);} */
}
/* 차트영역 임시 */
.chart {
    height: 205px;
    margin: 16px 0 32px;
    background: var(--blue);
}
</style>
<style lang="postcss">
/* 슬라이더 스와이프 */
#scrollArea {
    & .swiper-pagination {
        overflow: hidden; position: absolute;
        width: calc(100vw - 40px); height: 8px; bottom: 0;
        text-align: center;
        line-height: 0;
    }
    & .swiper-pagination-bullet {
        display: inline-block;
        width: 6px; height: 6px;
        border-radius: 4px;
        background: rgba(45, 45, 45, 0.12);
    }
    & .swiper-pagination-bullet + .swiper-pagination-bullet {
        margin-left: 6px;
    }
    & .swiper-pagination-bullet-active {
        background: rgba(0,0,0,0.7) !important;
    }
}
</style>