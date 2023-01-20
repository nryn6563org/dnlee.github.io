<template>
<div>
    <!-- IRP 검색 -->
    <section>
        <!-- tab메뉴 -->
        <div class="tabStyle04 h38 shadow">
            <ul data-tabList="3">
                <li :class="{ 'on': pageInfo.listType === '' }" >
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType=''">
                        전체
                    </a>
                </li>
                <li :class="{ 'on': pageInfo.listType === 'recItem' }" >
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType='recItem'">
                        추천상품
                    </a>
                </li>
                <li :class="{ 'on': pageInfo.listType === 'yield' }" >
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType='yield'">
                        수익률
                    </a>
                </li>
            </ul>
        </div>
        <!-- 검색영역 -->
        <div class="productSearch gray" v-if="pageInfo.listType === ''">
            <div class="tab">
                <label for="guarantee">
                    <input type="radio" id="guarantee" name="productType"
                        :value="true"
                        v-model="pageInfo.isGuarantee">
                    <div>원리금보장</div>
                </label>
                <label for="dividend">
                    <input type="radio" id="dividend" name="productType"
                        :value="false"
                        v-model="pageInfo.isGuarantee">
                    <div>실적배당</div>
                </label>
            </div>
            <label for="searchIRPInput" class="search">
                <input type="search" id="searchIRPInput" placeholder="상품명 검색"
                    @keyup="$checkButton($event)"
                    v-model="pageInfo.searchKeyword">
                <button title="검색" type="button"
                    @click="doSearch()"></button>
                <button title="내용삭제" class="resetInput" type="button" style="display: none"
                    @click="$resetInput('searchIRPInput', $event); pageInfo.searchKeyword = ''"></button>
            </label>
            <button type="button" title="상세검색 설정" @click="runComp(popupProductSearchSetting)"></button>
            <div>
                <label for="myinvestType">
                    <input type="checkbox" id="myinvestType"
                        v-model="pageInfo.propensity">
                    <div>투자성향에 맞는 펀드</div>
                </label>
                <a href="javascript:;" class="inArrow blue noLine">투자자성향 확인</a>
            </div>
        </div>
        <div class="bgBlue" v-else-if="pageInfo.listType === 'recItem'">
            <span>현대차증에서 매분기 선정기준에 따라 엄선한 추천상품입니다.</span>
            <span>
                <a href="javascript:;" class="info">선정기준</a>
            </span>
        </div>
        <div class="bgBlue" v-else-if="pageInfo.listType === 'yield'">
            <p>최근 3개월, 수익률 높은 순서 기준 IRP 온라인 펀드입니다.</p>
        </div>
        <div class="listSort" v-if="pageInfo.listType === ''">
            <button type="button" class="select"
                @click="runComp(reSelect)">
                {{ typeSelect.filter(arr => arr.listValue === pageInfo.sortType)[0].listName }}
            </button>
        </div>
        <div class="listSort" v-else>
            <label>
                <input type="checkbox" v-model="pageInfo.propensity">
                <div>투자성향에 맞는 펀드</div>
            </label>
            <a href="javascript:;" class="inArrow blue noLine">투자자성향 확인</a>
        </div>
        <!-- 상품리스트 -->
        <ul class="productList">
            <li v-for="(products, index) in pageInfo.viewList" :key="index">
                <div class="bullets">
                    <template v-if="products.isGuarantee">
                        <span class="bullet" :class="$fundCodeToText('riskGrade', products.riskGrade).class">
                            {{ $fundCodeToText('riskGrade', products.riskGrade).text }}
                        </span>
                        <span class="bullet gray">{{ $fundCodeToText('fundType', products.fundType).text }}</span>
                        <span class="bullet purple"
                            v-if="products.specialType !== ''">
                            {{
                                products.specialType === 'best' ? '베스트' :
                                products.specialType === 'recommend' ?  '추천' : '인기'
                            }}
                        </span>
                        <span class="bullet bgRed" v-if="products.isHighLevel">고난도</span>
                        <span class="bullet bgRed" v-if="products.feelRemu">보수체감</span>
                    </template>
                    <template v-else>
                        <span class="bullet" :class="$fundCodeToText('kinds', products.kinds).class">
                            {{ $fundCodeToText('kinds', products.kinds).text }}
                        </span>
                    </template>
                    <!-- 즐겨찾기 여부에 따른 class="on" 추가 -->
                    <button type="button" title="즐겨찾기"
                        :class="{ 'on' : products.isSave }"
                        @click="saveItem(products)"
                        ></button>
                </div>
                <a href="javascript:;" @click="runView(products)">
                    <dl>
                        <dt>
                            <h1>{{ products.itemName }} {{ products.itemClass }}</h1>
                            수수료{{ products.feeCollect === 'before' ? '선취' : products.feeCollect === 'after' ? '후취' : '미징구' }}
                            {{ products.isOnline ? ' - 온라인' : ' - 오프라인'  }}
                            {{ products.pensionType === 'retirement' ? ' - 퇴직연금' : ' - 개인연금' }}
                            <!-- 보수체감 항목확인 필요 - 현재 조건은 오프라인이고 위험도가 높음 이상, 수수료 미징구 시 -->
                        </dt>
                        <dd>
                            {{ $fundCodeToText('dueDay', products.dueDay).text }}<br>
                            <span>연</span> <strong>{{ products.interestRate }}%</strong>
                        </dd>
                    </dl>
                </a>
                <p>
                    <strong v-for="(tags, index) in products.keywords" :key="index">{{ tags }}</strong>
                </p>
                <div class="recommendArea" v-if="pageInfo.listType === 'recItem'">
                    <h1>#{{ products.recommendTitle }}</h1>
                    <p>{{ products.recommendText }}</p>
                </div>
            </li>
        </ul>
    </section>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>
<script setup>
import { inject, reactive, markRaw, watch } from 'vue'
import reSelect from '@/components/global/reSelect.vue'
import _ from 'lodash'
import popupProductSearchSetting from '@/components/products/popupProductSearchSetting.vue' // 상세검색 설정
import popupIRPCompareList from '@/components/products/popupIRPCompare-list.vue' // 헤더 > 비교 버튼 > 펀드비교 목록
const $checkButton = inject('$checkButton')
const $resetInput = inject('$resetInput')
const $fundCodeToText = inject('$fundCodeToText')
const $axios = inject('$axios')
const $toastMsg = inject('$toastMsg')
const props = defineProps(['pageInfo'])
const emit = defineEmits(['runEmits'])
const IRPListAPI = '/json/products/IRPList.json'

const typeSelect = [
    { listName: '적용이율 높은순', listValue: 'interestRate-desc' },
    { listName: '적용이율 낮은순', listValue: 'interestRate-asc' },
    { listName: '만기 오름차순', listValue: 'dueDay-desc' },
    { listName: '만기 내림차순', listValue: 'dueDay-asc' }
]

// 페이지 기초데이터
const pageInfo = reactive({
    listType: '', // ''(전체) / recItem(추천상품) / yield(수익률)
    isGuarantee: true, // guarantee(원리금보장) / dividend(실적배당)
    sortType: 'interestRate-desc', // 전체 시 적용 이율 높은순
    propensity: false, // 투자성향에 맞는 펀드
    searchKeyword: '',
    searchOption: {
        kinds: '', // 원리금보장 - 분류
        dueDay: '', // 원리금보장 - 만기
        institute: [], // 원리금보장 - 기관
        investArea: '', // 공용 - 투자지역
        fundType: '', // 공용 - 펀드유형
        riskGrade: '', // 공용 - 위험등급
        volume: '', // 공용 - 펀드규모
        grade: '', // 공용 - 평가등급(제로인)
        manager: [] // 공용 - 운용사
    },
    productList: new Array(0),
    // 상품목록 정보 구성
    // itemCode: string- 상품고유코드
    // itemName: string - 상품명
    // itemClass: string - 상품 클래스 - 클래스 기준 수수료 납부시점, 보수체감등의 여부가 가름됨
    // dueDay: string - 만료일 code - 1m ~ 5y popupProductSEarchSetting.vue > dueDayArr
    // isGuarantee: 원리금 보장여부
    // interestRate: string - 수익률(% 제외)
    // isRiskyAsset : boolean - 위험자산여부
    // feelRemu: boolean - 보수체감 여부
    // isOnline : boolean - 온라인 상품여부
    // isHighLevel : boolean - 고난도 투자상품 여부
    // pensionType : string code - 연금구분 retirement(퇴직연금) / personal(개인연금)
    // kinds : string code 펀드유형 popupProductSEarchSetting.vue > kindArr
    // institute : string code 기관코드 - popupProductSEarchSetting.vue > kindArr
    // investArea : string 지역구분  domestic(국내), overseas(해외)
    // fundType : string code 상품 타입 코드 popupProductSEarchSetting.vue > fundTypeArr
    // riskGrade : string code 위험등급 popupProductSEarchSetting.vue > riskGradeArr
    // volume : string.toString 펀드규모 코드 위험도는 "1" ~ "5" 높을수록 높은 위험
    // itemGrade : number.toString 펀드 등급 "1" ~ "6"
    // manager : string code 운용사 코드 popupProductSEarchSetting.vue > managerArr
    // isSave : boolean 관심상품 저장여부
    // keywords : array string 키워드
    // RecommendTitle : string 추천 사유 타이틀
    // RecommendText : string 추천사유 텍스트
    // specialType: string code - 기타 추천여부 recommend(추천) / best(베스트) / best(Popular) / ''(등록없음)
    // feeCollect: string 수수료 취득여부  before(선취) / after(후취) / not(미징구)
    viewList: new Array(0) // 검색 후 노출
})

// 데이타 리셋
const resetSet = () => {
    pageInfo.searchKeyword = ''
    pageInfo.searchOption.kinds = ''
    pageInfo.searchOption.dueDay = ''
    pageInfo.searchOption.institute = []
    pageInfo.searchOption.investArea = ''
    pageInfo.searchOption.fundType = ''
    pageInfo.searchOption.riskGrade = ''
    pageInfo.searchOption.volume = ''
    pageInfo.searchOption.grade = ''
    pageInfo.searchOption.manager = []
}

// 상품 타입에 따른 데이터 초기화
watch(() => pageInfo.listType, () => {
    resetSet()
    pageInfo.sortType = typeSelect[0].listValue
    pageInfo.propensity = false
    doSearch()
})
watch(() => pageInfo.isGuarantee, () => {
    resetSet()
    doSearch()
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
// 컴포넌트 실행 전체
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === reSelect) {
        componentsInfo.compOption = {
            title: '선택',
            selected: pageInfo.sortType,
            listData: typeSelect,
            returned: directInput
        }
    } if(comps === popupProductSearchSetting) {
        componentsInfo.compOption = {
            type: pageInfo.isGuarantee ? 'guarantee' : '',
            data: pageInfo.searchOption
        }
    }
}
// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === reSelect) {
            pageInfo.sortType = returnVals.listValue
            // 실제 sort Type 변경 처리
            closeComponent()
            sortByList()
        } else if(comps === popupProductSearchSetting) {
            pageInfo.searchOption = returnVals
            closeComponent()
            doSearch()
        }
    } else {
        closeComponent()
    }
}

const getIRPList = () => {
    // 전체, 추천상품, 수익률 별 다른 API 호출 기준
    $axios.get(IRPListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.productList = res.data.productList
                pageInfo.viewList = res.data.productList
                // 최초 검색 조건이 있음으로 실행
                setTimeout(() => doSearch())
                // doSearch()
            } else {
                // 조회 에러
                console.log('err', res)
            }
        })
        .catch(function(err) {
            // api에러
            console.log(err)
        })
}
// 검색 적용
const doSearch = () => {
    // 투자성향에 맞는 펀드 여부 확인 및 추가 로직 필요
    let searchArr = pageInfo.productList
    // 전체 일 시 원리금 보장여부
    if(pageInfo.listType === '') {
        searchArr = searchArr.filter(arr => arr.isGuarantee === pageInfo.isGuarantee)
    }
    // IRP 분류
    if(pageInfo.searchOption.kinds !== '') {
        searchArr = searchArr.filter(arr => arr.kinds === pageInfo.searchOption.kinds)
    }
    // 만기
    if(pageInfo.searchOption.dueDay !== '') {
        searchArr = searchArr.filter(arr => arr.dueDay === pageInfo.searchOption.dueDay)
    }
    // 등록기관
    if(pageInfo.searchOption.institute.length !== 0) {
        searchArr = searchArr.filter(arr => pageInfo.searchOption.institute.indexOf(arr.institute) !== -1)
    }
    // 투자지역
    if(pageInfo.searchOption.investArea !== '') {
        searchArr = searchArr.filter(arr => arr.investArea === pageInfo.searchOption.investArea)
    }
    // 펀드유형
    if(pageInfo.searchOption.fundType !== '') {
        searchArr = searchArr.filter(arr => arr.fundType === pageInfo.searchOption.fundType)
    }
    // 위험등급
    if(pageInfo.searchOption.riskGrade !== '') {
        searchArr = searchArr.filter(arr => arr.riskGrade === pageInfo.searchOption.riskGrade)
    }
    // 펀드규모
    if(pageInfo.searchOption.volume !== '') {
        searchArr = searchArr.filter(arr => arr.volume === pageInfo.searchOption.volume)
    }
    // 평가등급
    if(pageInfo.searchOption.grade !== '') {
        searchArr = searchArr.filter(arr => arr.grade === pageInfo.searchOption.grade)
    }
    // 운용사
    if(pageInfo.searchOption.manager.length !== 0) {
        searchArr = searchArr.filter(arr => pageInfo.searchOption.manager.indexOf(arr.manager) !== -1)
    }
    // 검색어
    if(pageInfo.searchKeyword !== '') {
        searchArr = _.filter(searchArr, (el) => {
            return el.itemName.indexOf(pageInfo.searchKeyword) !== -1
        })
    }
    pageInfo.viewList = searchArr
    if(pageInfo.listType === '') {
        sortByList()
    }
}
// sortBy
const sortByList = () => {
    const sortBy = pageInfo.sortType.split('-')[0]
    const flow = pageInfo.sortType.split('-')[1]
    pageInfo.viewList = _.orderBy(pageInfo.viewList, [sortBy], [flow])
}
// 최초 페이지 시작시
const preRun = () => {
    getIRPList()
}
preRun()

// 즐겨찾기 등록
const saveItem = (itemInfo) => {
    // 등록/삭제 프로세스 실행
    // 성공 프로세스
    const successCheck = true
    let msg = ''
    if (!itemInfo.isSave) {
        // 등록 프로세스
        if(successCheck) {
            msg = '등록되었습니다.'
            itemInfo.isSave = true
        } else {
            msg = '등록에 실패하였습니다.'
        }
    } else {
        // 삭제시 프로세스
        if(successCheck) {
            msg = '등록 해제되었습니다.'
            itemInfo.isSave = false
        } else {
            msg = '등록 해제에 실패하였습니다.'
        }
    }
    $toastMsg({ msg: msg })
}

// 상세페이지 이동
const runView = (itemCode) => {
    emit('runEmits', itemCode)
}
</script>
<style lang="postcss" scoped>
div.productSearch > div.tab { padding: 0; margin: 0 0 12px; }
.bgBlue {
    display: flex; overflow: hidden;
    padding: 0 20px;
    align-items: center;
    & > span {
        flex: 1 1 60%;
        padding: 12px 0;
        font-size: 0.857rem; color: var(--fontLightgray)
    }
    & > span + span { flex: 1 1 40%; text-align: right; }
    & > p {
        margin: 0; padding: 12px 0 12px 20px;
        background: url('@/assets/images/global/icon_err_line_gray.png') no-repeat left center / 16px auto;
        font-size: 0.857rem; color: var(--fontLightgray)
    }
}
.productList {
    & dt { flex: 1 1 68% !important; }
    & dd { flex: 1 1 32% !important; }
    & .recommendArea {
        margin-bottom: -14px !important; padding: 18px 20px; background: var(--listBg);
        & h1 { font-weight: 500; }
        & p { font-weight: 400; color: var(--fontLightgray) }
        & > * {
            margin: 0; padding: 0;
            font-size: 0.857rem;
        }
    }
}
</style>