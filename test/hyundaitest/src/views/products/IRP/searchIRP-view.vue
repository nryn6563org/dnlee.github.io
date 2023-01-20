<template>
    <div @scroll="scrollAct($event)">
        <!-- 펀드 상세 -->
        <section id="fundViewArea">
            <div class="topArea">
                <!-- 선택펀드 기본정보-->
                <div class="fundList">
                    <div class="fundType">
                        <span class="bullet"
                            :class="$fundCodeToText('riskGrade', pageInfo.itemInfo.riskGrade).class">
                            {{ $fundCodeToText('riskGrade', pageInfo.itemInfo.riskGrade).text }}
                        </span>
                        <span class="bullet gray">
                            {{ $fundCodeToText('fundType', pageInfo.itemInfo.fundType).text }}
                        </span>
                        <button type="button" title="즐겨찾기"
                            :class="{ 'on' : pageInfo.itemInfo.isSave }"
                            @click="saveItem()"></button>
                    </div>
                    <h1>
                        {{ pageInfo.itemInfo.itemName }}
                        {{ pageInfo.itemInfo.itemClass }}
                    </h1>
                    <div class="fundDetail">
                        <ul>
                            <li>
                                수수료{{ pageInfo.itemInfo.feeCollect === 'before' ? '선취' : pageInfo.itemInfo.feeCollect === 'after' ? '후취' : '미징구' }}
                            </li>
                            <li>
                                {{ pageInfo.itemInfo.isOnline ? '온라인' : '오프라인'  }}
                            </li>
                            <li>
                                {{ pageInfo.itemInfo.pensionType === 'retirement' ? '퇴직연금' : '개인연금' }}
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 기준가 & 수익률 -->
                <div class="priceInfo">
                    <p>{{ pageInfo.itemInfo.baseInfo.baseDate }} 기준</p>
                    <ul>
                        <li>
                            <p>기준가</p>
                            <h1>
                                <p>
                                    {{ $priceToCommas(Number(pageInfo.itemInfo.baseInfo.basePrice))}}
                                </p><span
                                    :class="[ Number(pageInfo.itemInfo.baseInfo.fluctuation) < 0 ? 'fontBlue iconDown' : 'fontRed iconUp' ]">
                                    {{Number(pageInfo.itemInfo.baseInfo.fluctuation) < 0 ? Number(pageInfo.itemInfo.baseInfo.fluctuation) * -1 : pageInfo.itemInfo.baseInfo.fluctuation }}
                                </span>
                            </h1>
                        </li>
                        <li>
                            <p>수익률(3개월)</p>
                            <h1 :class="[ Number(pageInfo.itemInfo.baseInfo.yield) < 0 ? 'fontBlue' : 'fontRed' ]">
                                {{ pageInfo.itemInfo.baseInfo.yield }}%
                            </h1>
                        </li>
                    </ul>
                </div>
                <!-- 배너슬라이드 -->
                <!-- 배너의 경우 등록데이터 형태 확인 추가 필요 -->
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
                <button type="button" title="목록으로" @click="emit('runEmit', true)"></button>
                {{ pageInfo.itemInfo.itemName }}
                {{ pageInfo.itemInfo.itemClass }}
            </h1>
            <!-- tab메뉴 -->
            <div class="tabStyle04 h40">
                <ul data-tabList="4">
                    <li :class="pageInfo.selectTabMenu === 'fundInfo' ? 'on' : ''"
                        @click="selectTabMenu('fundInfo')">
                        <a href="javascript:;"
                            draggable="false">
                            펀드정보
                        </a>
                    </li>
                    <li :class="pageInfo.selectTabMenu === 'yield' ? 'on' : ''"
                        @click="selectTabMenu('yield')">
                        <a href="javascript:;"
                            draggable="false">
                            수익률/기준가
                        </a>
                    </li>
                    <li :class="pageInfo.selectTabMenu === 'ristAnal' ? 'on' : ''"
                        @click="selectTabMenu('ristAnal')">
                        <a href="javascript:;"
                            draggable="false">
                            위험분석
                        </a>
                    </li>
                    <li :class="pageInfo.selectTabMenu === 'asset' ? 'on' : ''"
                        @click="selectTabMenu('asset')">
                        <a href="javascript:;"
                            draggable="false">
                            자산구성
                        </a>
                    </li>
                </ul>
            </div>
            <!-- 펀드정보 탭 -->
            <article v-if="pageInfo.selectTabMenu === 'fundInfo'">
                <div>
                    <h1><span class="underline">펀드 정보</span>를<br>확인해 보세요.</h1>
                    <div class="gradeInfo">
                        <!-- gradeA, gradeB, gradeC,gradeE,gradeF, fail -->
                        <span class="riskGrade"
                            :class="'grade' + pageInfo.itemInfo.riskGrade">
                            <h3>{{ $fundCodeToText('riskGrade', pageInfo.itemInfo.riskGrade).text }}</h3>
                            <p>위험등급</p>
                        </span>
                        <!-- gradeA, gradeB, gradeC,gradeE,gradeF-->
                        <span class="zeroinGrade"
                            :class="'grade' + pageInfo.itemInfo.itemGrade">
                            <h3>{{ pageInfo.itemInfo.itemGrade }}등급</h3>
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
                            <td>{{ $fundCodeToText('fundType', pageInfo.itemInfo.fundType).text }}</td>
                        </tr>
                        <tr>
                            <th>설정일</th>
                            <td>{{ pageInfo.itemInfo.detailInfo.setDate }}</td>
                        </tr>
                        <tr>
                            <th>운영규모</th>
                            <td>{{ pageInfo.itemInfo.detailInfo.operationScale }}억원</td>
                        </tr>
                        <tr>
                            <th>운용사</th>
                            <td>{{ $fundCodeToText('manager', pageInfo.itemInfo.manager).text }}</td>
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
                            <td>
                                {{
                                    pageInfo.itemInfo.detailInfo.advanceFee === '' ? '없음' :
                                        $priceToCommas(pageInfo.itemInfo.detailInfo.advanceFee) + '원'
                                }}
                            </td>
                        </tr>
                        <tr>
                            <th>환매수수료</th>
                            <td>
                                {{
                                    pageInfo.itemInfo.detailInfo.redemptionFee === '' ? '없음' :
                                        $priceToCommas(pageInfo.itemInfo.detailInfo.redemptionFee) + '원'
                                }}
                            </td>
                        </tr>
                        <tr>
                            <th>펀드보수(연)</th>
                            <td>
                                연 {{ pageInfo.itemInfo.detailInfo.remuneration }}%
                                <button title="보수정보" class="info"></button>
                            </td>
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
                        <li v-for="(reports, index) in pageInfo.itemInfo.detailInfo.reportList" :key="index">
                            <button title="PDF 확인" class="h50"
                                @click="runComp(popupPDFViewer, reports)">
                                {{ reports[0] }}
                            </button>
                        </li>
                    </ul>
                </div>
                <button type="다른 종류펀드 보기"
                    @click="runComp(modalMoreFundList, pageInfo.itemInfo.detailInfo.etcClassCode)">
                    다른 종류(클래스) 펀드
                    <span class="fontPointBlue">{{ pageInfo.itemInfo.detailInfo.etcClassCode.length }}개</span>
                </button>
            </article>
            <!-- 수익률/기준가 -->
            <article class="yield" v-if="pageInfo.selectTabMenu === 'yield'">
                <div>
                    <h1><span class="underline">수익률</span>을<br>확인해 보세요.</h1>
                    <div>
                        <form action="">
                            <div>
                                <label v-for="(months, index) in monthRangeArr" :key="index"
                                    :for="'yieldRange' + index">
                                    <input type="radio" name="yieldRange"
                                        :id="'yieldRange' + index"
                                        :value="months"
                                        v-model="pageInfo.yieldRange">
                                    <div class="blue">
                                        {{ months >= 12 ? months / 12 + '년' : months + '개월' }}
                                    </div>
                                </label>
                            </div>
                        </form>
                        <div class="chart">
                            <canvas id="yield01"></canvas>
                        </div>
                    </div>
                    <h2>
                        기간수익률
                        <span>
                            ({{ pageInfo.itemInfo.detailYield.yeildList.baseDate }}기준)
                        </span>
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
                        <tr v-for="(lists, index) in pageInfo.itemInfo.detailYield.yeildList.lists" :key="index">
                            <th>
                                {{
                                    lists[0] === 'after' ? '설정일 이후' :
                                    lists[0] === 'YTM' ? lists[0] :
                                    Number(lists[0]) >= 12 ? Number(lists[0]) / 12 + '년' : lists[0] + '개월'
                                }}
                            </th>
                            <td :class="[ Number(lists[1]) < 0 ? 'fontBlue' : 'fontRed' ]">{{ lists[1] }}%</td>
                            <td :class="[ Number(lists[2]) < 0 ? 'fontBlue' : 'fontRed' ]">{{ lists[2] }}%</td>
                        </tr>
                    </table>
                </div>
                <div class="bgBlueGray">
                    <h1><span class="underline">기준가</span>를<br>확인해 보세요.</h1>
                    <div>
                        <form action="">
                            <div>
                                <label v-for="(months, index) in monthRangeArr" :key="index"
                                    :for="'basePrice' + index">
                                    <input type="radio" name="basePrice"
                                        :id="'basePrice' + index"
                                        :value="months"
                                        v-model="pageInfo.basePriceRange">
                                    <div class="blue">
                                        {{ months >= 12 ? months / 12 + '년' : months + '개월' }}
                                    </div>
                                </label>
                            </div>
                        </form>
                        <div class="chart">
                            <canvas id="yield01"></canvas>
                        </div>
                    </div>
                    <h2>
                        기간수익률
                        <span>
                            ({{ pageInfo.itemInfo.detailYield.dateList.baseDate }}기준)
                        </span>
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
                        <tr v-for="(lists, index) in pageInfo.itemInfo.detailYield.dateList.lists" :key="index">
                            <td>{{ lists[0] }}</td>
                            <td>{{ lists[1] }}</td>
                            <td>{{ lists[2] }}</td>
                        </tr>
                    </table>
                </div>
            </article>
            <!-- 위험분석 -->
            <article v-if="pageInfo.selectTabMenu === 'ristAnal'">
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
                            <td v-for="(values, index) in pageInfo.itemInfo.riskData.deviation.fund" :key="index"
                                :class="{ 'fontRed' : index + 1 === pageInfo.itemInfo.riskData.deviation.fund.length  }">
                                {{ values }}
                            </td>
                        </tr>
                        <tr>
                            <th>&amp;순위</th>
                            <td v-for="(values, index) in pageInfo.itemInfo.riskData.deviation.percent" :key="index">
                                {{ values }}
                            </td>
                        </tr>
                        <tr>
                            <th>동일유형</th>
                            <td v-for="(values, index) in pageInfo.itemInfo.riskData.deviation.sameType" :key="index"
                                :class="{ 'fontRed' : index + 1 === pageInfo.itemInfo.riskData.deviation.sameType.length  }">
                                {{ values }}
                            </td>
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
                            <td v-for="(values, index) in pageInfo.itemInfo.riskData.SharpRatio.fund" :key="index"
                                :class="[ index + 1 === pageInfo.itemInfo.riskData.SharpRatio.fund.length ? 'fontRed' : 'fontBlue' ]">
                                {{ values }}
                            </td>
                        </tr>
                        <tr>
                            <th>&amp;순위</th>
                            <td v-for="(values, index) in pageInfo.itemInfo.riskData.SharpRatio.percent" :key="index">
                                {{ values }}
                            </td>
                        </tr>
                        <tr>
                            <th>동일유형</th>
                            <td v-for="(values, index) in pageInfo.itemInfo.riskData.SharpRatio.sameType" :key="index"
                                :class="{ 'fontRed' : index + 1 === pageInfo.itemInfo.riskData.SharpRatio.sameType.length  }">
                                {{ values }}
                            </td>
                        </tr>
                    </table>
                </div>
            </article>
            <!-- 자산구성 -->
            <article v-if="pageInfo.selectTabMenu === 'asset'">
                <div>
                    <h1><span class="underline">자산구성</span>을<br>확인해 보세요.</h1>
                    <h2>총자산 구성</h2>
                    <div class="chart">
                        <canvas id="assetChart"></canvas>
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
                        <tr v-for="(lists, index) in pageInfo.itemInfo.assetInfo.countryList" :key="index"
                            :class="{ 'hidden' : index > 4 && !pageInfo.countryView }">
                            <td>{{ lists[0] }}</td>
                            <td>{{ lists[1] }}%</td>
                        </tr>
                    </table>
                    <button type="button" title="더보기" class="moreList"
                        :class="{ 'on' : pageInfo.countryView }"
                        @click="pageInfo.countryView = !pageInfo.countryView">
                        <span>{{ pageInfo.countryView ? '닫기' : '더보기' }}</span>
                    </button>
                </div>
                <div class="bgBlueGray" >
                    <h1><span class="underline">보유종목 현황</span>을<br>확인해 보세요.</h1>
                    <form action="">
                        <div class="assetTab">
                            <label for="stock">
                                <input type="radio" id="stock" name="type" value="stock"
                                    :disabled="pageInfo.itemInfo.assetInfo.stockList.stock.length === 0"
                                    v-model="pageInfo.assetInfoView">
                                <div class="blue">
                                    주식({{ pageInfo.itemInfo.assetInfo.stockList.stock.length }})
                                </div>
                            </label>
                            <label for="bond">
                                <input type="radio" id="bond" name="type" value="bond"
                                    :disabled="pageInfo.itemInfo.assetInfo.stockList.bond.length === 0"
                                    v-model="pageInfo.assetInfoView">
                                <div class="blue">
                                    채권({{ pageInfo.itemInfo.assetInfo.stockList.bond.length }})
                                </div>
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
                        <template v-if="pageInfo.assetInfoView === 'stock'">
                            <tr v-for="(lists, index) in pageInfo.itemInfo.assetInfo.stockList.stock" :key="index">
                                <td>{{ lists[0] }}</td>
                                <td>{{ lists[1] }}</td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr v-for="(lists, index) in pageInfo.itemInfo.assetInfo.stockList.bond" :key="index">
                                <td>{{ lists[0] }}</td>
                                <td>{{ lists[1] }}</td>
                            </tr>
                        </template>
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
        <div class="buttonArea" :class="{ 'bgBlueGray' : pageInfo.selectTabMenu === 'yield' }">
             <button typw="button" class="h50 pointBlue" @click="emit('runEmits', pageInfo.itemInfo.itemCode)">매수하기</button>
        </div>
        <component :is="componentsInfo.compName"
            :options="componentsInfo.compOption"
            @runEmits="closeComp" />
    </div>
</template>
<script setup>
import { inject, reactive, markRaw, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'
import * as echarts from 'echarts'
import moreYield from '@/components/products/popupYield.vue'
import modalMoreFundList from '@/components/products/modalMoreFundList.vue'
import popupPDFViewer from '@/components/global/popupPDFViewer.vue'
import 'swiper/css'
const $router = useRouter()
const $toastMsg = inject('$toastMsg')
const $fundCodeToText = inject('$fundCodeToText')
const $priceToCommas = inject('$priceToCommas')
const $axios = inject('$axios')
const IRPViewAPI = '/json/products/IRPview.json'
const props = defineProps(['pageInfo'])
const emit = defineEmits(['runEmits'])
const monthRangeArr = [1, 3, 6, 12, 36]
const swiperModules = [Pagination]
const pageInfo = reactive({
    selectTabMenu: 'yield', // fundInfo(펀드정보) / yield(수익률 ) / ristAnal(위험분석), asset(자산구성)
    yieldRange: 1, // 화면 및 그래프 데이터 조회용
    basePriceRange: 1, // 화면 및 그래프 데이터 조회용
    assetInfoView: 'stock',
    countryView: false, // 자산구성 내 국가별 투자비중 보이는 개수 제어용
    itemInfo: {
        itemCode: '', // string- 상품고유코드
        itemName: '', // string - 상품명
        itemClass: '', // string - 상품 클래스 - 클래스 기준 수수료 납부시점, 보수체감등의 여부가 가름됨
        dueDay: '', // string - 만료일 code - 1m ~ 5y popupProductSEarchSetting.vue > dueDayArr
        isGuarantee: '', // 원리금 보장여부
        interestRate: '', // string - 수익률(% 제외)
        isRiskyAsset: '', // boolean - 위험자산여부
        feelRemu: '', // boolean - 보수체감 여부
        isOnline: '', // boolean - 온라인 상품여부
        isHighLevel: '', // boolean - 고난도 투자상품 여부
        pensionType: '', // string code - 연금구분 retirement(퇴직연금) / personal(개인연금)
        kinds: '', // string code 펀드유형 popupProductSEarchSetting.vue > kindArr
        institute: '', // string code 기관코드 - popupProductSEarchSetting.vue > kindArr
        investArea: '', // string 지역구분  domestic(국내), overseas(해외)
        fundType: '', // string code 상품 타입 코드 popupProductSEarchSetting.vue > fundTypeArr
        riskGrade: '', // string code 위험등급 popupProductSEarchSetting.vue > riskGradeArr
        volume: '', // string.toString 펀드규모 코드 위험도는 "1" ~ "5" 높을수록 높은 위험
        itemGrade: '', // number.toString 펀드 등급 "1" ~ "6"
        manager: '', // string code 운용사 코드 popupProductSEarchSetting.vue > managerArr
        isSave: '', // boolean 관심상품 저장여부
        keywords: '', // array string 키워드
        RecommendTitle: '', // string 추천 사유 타이틀
        RecommendText: '', // string 추천사유 텍스트
        specialType: '', // string code - 기타 추천여부 recommend(추천) / best(베스트) / best(Popular) / ''(등록없음)
        feeCollect: '', // string 수수료 취득여부  before(선취) / after(후취) / not(미징구)
        baseInfo: { // object 펀드 기본정보
            baseDate: '', // date.comma 정보기준일 - 콤마 타입 "2022.03.03"
            basePrice: '', // string 기준가 "1224.77"
            fluctuation: '', // string 등락율 "-8.74"
            yield: '', // 수익율 "-10.05",
            comment: new Array(0) // object array 주요내용 목록
            // └ attachImage : fileURL 첨부이미지 첨부 없을 시 ''값 리턴 필요
            // └ title : string 제목
            // └ content : text 내용 (두줄까지만)
        },
        detailInfo: { // object 펀드 상세 정보
            setDate: '', // data.comma 설정일 "2019.01.14"
            operationScale: '', // string 운영규모 - 억단위 소수점 2자리까지
            advanceFee: '', // string 선취 수수료 - 없을 시 ''값 리턴 필요
            redemptionFee: '', // string 환매 수수료 - 없을 시 ''값 리턴 필요
            remuneration: '', // string - 펀드 연보수,
            reportList: new Array(0), // array array 투자설명서 및 보고서 ["보고서 명칭", "다운로드URL"]
            etcClassCode: new Array(0) // string array 다른 종류(클래스) 펀드 목록 [ "abc123A", "abc123B", "abc123C", "abc123D" ]
        },
        detailYield: { // object 수익률/기준가 정보
            yeildList: {
                baseDate: '', // date.comma 기준일 2022.07.16",
                lists: new Array(0) // array 수익률 목록
                // └ [ 개월(date.comma , 'YTM', 'after'), 펀드%(string), 벤치마크%(string) ]
            },
            dateList: { // object 기준가 목록
                baseDate: '', // date.comma 기준일 2022.07.16",
                lists: new Array(0) // array 수익률 목록
                // └ [ 일자(date.comma), 기준가(string), 설정액(string) ] 10개까지만 호출
            }
        },
        riskData: { // object 위험분석
            deviation: { // object 표준편차
                fund: new Array(0), // array 펀드편차 [ 3개월 편차(string), 6개월 편차(string), 1년 편차(string), 3년 편차(string) ],
                percent: new Array(0), // array %순위 [ 3개월 순위(string), 6개월 순위(string), 1년 순위(string), 3년 순위(string) ],
                sameType: new Array(0) // array 동일유형 편차 [ 3개월 편차(string), 6개월 편차(string), 1년 편차(string), 3년 편차(string) ],
            },
            SharpRatio: { // object 샤프지수
                fund: new Array(0), // array 펀드지수 [ 3개월 지수(string), 6개월 지수(string), 1년 지수(string), 3년 지수(string) ],
                percent: new Array(0), // array %순위 [ 3개월 순위(string), 6개월 순위(string), 1년 순위(string), 3년 순위(string) ],
                sameType: new Array(0) // array 동일유형지수 [ 3개월 지수(string), 6개월 지수(string), 1년 지수(string), 3년 지수(string) ],
            }
        },
        assetInfo: { // object 자산구성 정보
            countryList: new Array(0), // array 국가별 투자비중
            // └ [ 국가명(한굴 string), 비중(string) ]
            stockList: { // object 보유종목
                stock: new Array(0), // array 보유 주식 목록 ** 보유목록 없을 시 []리턴 필요
                // └ [ 주식명(string), 비중(string) ]
                bond: new Array(0) // array 보유 채권 목록 ** 보유목록 없을 시 []리턴 필요
                // └ [ 주식명(string), 비중(string) ]
            }
        }
    }
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
    if(comps === popupPDFViewer) {
        componentsInfo.compOption = directInput
    } else if(comps === moreYield) {
        componentsInfo.compOption = {
            itemCode: pageInfo.itemInfo.itemCode,
            viewRange: pageInfo.basePriceRange
        }
    }
}

// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    // const comps = componentsInfo.compName
    closeComponent()
}


// 탭메뉴 선택
const selectTabMenu = (menu) => {
    pageInfo.selectTabMenu = menu
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

// 즐겨찾기 등록
const saveItem = () => {
    // 등록/삭제 프로세스 실행
    // 성공 프로세스
    const successCheck = true
    let msg = ''
    if (!pageInfo.itemInfo.isSave) {
        // 등록 프로세스
        if(successCheck) {
            msg = '등록되었습니다.'
            pageInfo.itemInfo.isSave = true
        } else {
            msg = '등록에 실패하였습니다.'
        }
    } else {
        // 삭제시 프로세스
        if(successCheck) {
            msg = '등록 해제되었습니다.'
            pageInfo.itemInfo.isSave = false
        } else {
            msg = '등록 해제에 실패하였습니다.'
        }
    }
    $toastMsg({ msg: msg })
}
// 최초 정보 불러오기
const getProductInfo = () => {
    // itemCode 기준 조회 props.pageInfo.itemCode[0]
    $axios.get(IRPViewAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.itemInfo = res.data.itemInfo
                if(pageInfo.itemInfo.assetInfo.stockList.stock.length === 0) pageInfo.assetInfoView = 'bond'
            } else {
                // 에러상황
                console.log(res)
            }
        })
        .catch(function(err) {
            // API에러 시 호출
            console.log(err)
        })
}

// 수익률/기준가 내 차트 변수
const yieldChartOption01 = {
    title: {},
    tooltip: {
        trigger: 'axis'
    },
    legend: {},
    grid: {
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        }
    ]
}


// 자산구성내 차트 변수
const assetChartOption = {
    animation: true,
    tooltip: { },
    legend: { show: false },
    series: [
        {
            name: 'asset lists',
            type: 'pie',
            height: '100%',
            width: '100%',
            color: ['rgba(63, 84, 195, 1)', 'rgba(245, 198, 69, 1)', 'rgba(255, 158, 61, 1)', 'rgba(45, 53, 98, 1)'],
            radius: ['56%', '100%'],
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: { disabled: true },
            labelLine: { show: false },
            data: [
                { value: 44.78, name: '국내주식' },
                { value: 23.6, name: '해외주식' },
                { value: 13.68, name: '유동성' },
                { value: 19.13, name: '기타자산' }
            ]
        }
    ]
}

getProductInfo()
// runModal(modalMoreFundList)

watch(() => pageInfo.selectTabMenu, () => {
    const targetTitle = document.querySelector('#fundViewArea')
    const topAreaHeight = document.querySelector('.topArea').offsetHeight + 55
    targetTitle.scrollTo({ top: topAreaHeight, behavior: 'smooth' })
    if(pageInfo.selectTabMenu === 'asset') {
        drawAssetChart()
    } else if(pageInfo.slidesPerView === 'yield') {
        drawYieldCharts()
    }
})

const drawAssetChart = () => {
    setTimeout(() => {
        const assetChart = echarts.init(document.getElementById('assetChart'))
        assetChartOption && assetChart.setOption(assetChartOption)
    })
}

const drawYieldCharts = () => {
    setTimeout(() => {
        const yieldChart01 = echarts.init(document.getElementById('yield01'))
        yieldChartOption01 && yieldChart01.setOption(yieldChartOption01)
    })
}
drawYieldCharts()
</script>
<style lang="postcss" scoped>
section {
    /* 최상단 해당 펀드 정보 */
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
            margin: 0; padding: 0 20px;
            list-style: none;
            border: 1px solid rgba(142, 158, 245, 1);border-radius: 16px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.16);
            & li {
                float: left;
                margin: 20px 0;
                box-sizing: border-box;
                &:first-child{
                    width: 165px;
                    padding-right: 13px;
                    border-right: 1px solid rgba(235, 235, 235, 1);
                }
                &:last-child {
                    width: 112px;
                    padding-left: 13px;
                }
                & > p {
                    margin: 0 0 5px;
                    color: rgba(130, 130, 130, 1); line-height:16px;
                }
                & > h1 {
                    display: flex;
                    margin: 0;
                    font-size: 1.714rem;
                    align-items: flex-end;
                    & span {
                        height: 1.125rem;
                        padding: 6px 0 6px 20px;
                        font-size: 0.857rem; font-weight: 500;
                        &.iconUp, &.iconDown {
                            background-position: left 8px center;
                        }
                    }
                    & p {
                        margin: 0; padding: 0;
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
                    &.grade1::after { left:50%;transform: rotate(285deg);}
                    &.grade2::after {transform: rotate(316deg);}
                    &.grade3::after {transform: rotate(347deg);}
                    &.grade4::after {transform: rotate(14deg);}
                    &.grade5::after {transform: rotate(41deg);}
                    &.grade6::after { top: 10px; transform: rotate(69deg);}
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
                    &.grade1 { background-image: url('@/assets/images/products/fundGrade1_multi.png');}
                    &.grade2 { background-image: url('@/assets/images/products/fundGrade2_multi.png');}
                    &.grade3 { background-image: url('@/assets/images/products/fundGrade3_multi.png');}
                    &.grade4 { background-image: url('@/assets/images/products/fundGrade4_multi.png');}
                    &.grade5 { background-image: url('@/assets/images/products/fundGrade5_multi.png');}
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
    margin: 3px auto 0; padding: 0; border: none;
    background: transparent !important;
    font-size: 1rem; font-weight: 400; color:rgba(128, 128, 128, 1);
    & span {
        position: relative; display: inline-block;
        vertical-align: middle;
        &::after {
            display: inline-block;
            top: 50%; width: 16px; height: 21px;
            margin-left: 5px;
            background: url('@/assets/images/global/arrow_gray_light.png') no-repeat right 0 center / 16px auto;
            content: ' ';
            vertical-align: middle;
        }
    }
    &.on > span::after { margin-top: -3px; transform: rotate(180deg); }
}
.buttonArea {
    padding: 0 20px 20px;
    background-color: rgba(255,255,255,1);
    bottom: 0;
    z-index: 10;
    /* &.bgBlueGray { background-color: rgba(246, 247, 249, 1);} */
}
.hidden { display: none }
.assetTab label {
    width: inherit;
    & > div { padding: 0 20px; }
    & input:disabled + div {
        background: var(--listBg);
        color: var(--fontLightgray);
    }
}
.chart { text-align: center; }
/* 차트영역 임시 */
#assetChart { height: 140px; }

.topArea { display: none; }
</style>
<style lang="postcss">
/* 슬라이더 스와이프 */
#fundViewArea {
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