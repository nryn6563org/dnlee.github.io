<template>
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>상세검색 설정</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div class="contentsArea">
            <template v-if="props.options.type === 'guarantee'">
                <div data-align="2">
                    <h3>분류</h3>
                    <label for="allKinds" class="all">
                        <input type="radio" id="allKinds" name="kinds" value=""
                            v-model="pageInfo.kinds">
                        <div class="check">전체</div>
                    </label>
                    <label v-for="(options, index) in kindArr" :key="index"
                        :for="options.value">
                        <input type="radio" name="kinds"
                            :id="options.value" :value="options.value"
                            v-model="pageInfo.kinds">
                        <div class="check">{{ options.text }}</div>
                    </label>
                </div>
                <div data-align="3" class="hasAll">
                    <h3>만기</h3>
                    <label for="dueDayAll" class="all">
                        <input type="radio" id="dueDayAll" name="dueDay" value=""
                            v-model="pageInfo.dueDay">
                        <div class="check">전체</div>
                    </label>
                    <label v-for="(options, index) in dueDayArr" :key="index"
                        :for="options.value">
                        <input type="radio" name="dueDay"
                            :id="options.value" :value="options.value"
                            v-model="pageInfo.dueDay">
                        <div class="check">{{ options.text }}</div>
                    </label>
                </div>
                <div data-align="2">
                    <h3>
                        <a href="javascript:;">
                            기관 (최대 5개 선택가능)
                            <p>
                                <span class="fontPointBlue">{{ pageInfo.institute.length }}</span>/5
                            </p>
                        </a>
                    </h3>
                    <div>
                        <label v-for="(options, index) in instituteArr" :key="index"
                            :for="options.value">
                            <input type="checkbox" name="institute"
                                :id="options.value" :value="options.value"
                                v-model="pageInfo.institute">
                            <div>{{ options.text }}</div>
                        </label>
                    </div>
                </div>
            </template>
            <template v-else>
                <!-- 투자지역-->
                <div data-align="3">
                    <h3>투자지역</h3>
                    <label for="allArea">
                        <input type="radio" id="allArea" name="investArea" value=""
                            v-model="pageInfo.investArea">
                        <div class="check">전체</div>
                    </label>
                    <label for="domestic">
                        <input type="radio" id="domestic" name="investArea" value="domestic"
                            v-model="pageInfo.investArea">
                        <div class="check">국내</div>
                    </label>
                    <label for="overseas">
                        <input type="radio" id="overseas" name="investArea" value="overseas"
                            v-model="pageInfo.investArea">
                        <div class="check">해외</div>
                    </label>
                </div>
                <!-- 펀드유형 -->
                <div data-align="3">
                    <h3>펀드유형</h3>
                    <label for="allType">
                        <input type="radio" id="allType" name="fundType" value=""
                            v-model="pageInfo.fundType">
                        <div class="check">전체</div>
                    </label>
                    <label v-for="(options, index) in fundTypeArr" :key="index"
                        :for="options.value">
                        <input type="radio" name="fundType"
                            :id="options.value" :value="options.value"
                            v-model="pageInfo.fundType">
                        <div class="check">{{ options.text }}</div>
                    </label>
                </div>
                <!-- 위험등급-->
                <div data-align="2">
                    <h3>위험등급</h3>
                    <label for="allRisk" class="all">
                        <input type="radio" id="allRisk" name="riskGrade" value=""
                            v-model="pageInfo.riskGrade">
                        <div class="check">전체</div>
                    </label>
                    <label v-for="(options, index) in riskGradeArr" :key="index"
                        :for="options.value">
                        <input type="radio" name="fundType"
                            :id="options.value" :value="options.value"
                            v-model="pageInfo.riskGrade">
                        <div class="check">{{ options.text }}</div>
                    </label>
                </div>
                <!-- 펀드규모-->
                <div data-align="2">
                    <h3>펀드규모</h3>
                    <label for="allVolume" class="all" >
                        <input type="radio" id="allVolume" name="volume" value=""
                            v-model="pageInfo.volume">
                        <div class="check">전체</div>
                    </label>
                    <label v-for="(options, index) in volumeArr" :key="index"
                        :for="options.value">
                        <input type="radio" name="fundType"
                            :id="options.value" :value="options.value"
                            v-model="pageInfo.volume">
                        <div class="check">{{ options.text }}</div>
                    </label>
                </div>
                <!-- 제로인평가 -->
                <div data-align="2">
                    <h3>평가등급(제로인)</h3>
                    <label for="gradeAll" class="all">
                        <input type="radio" id="gradeAll" name="itemGrade" value=""
                            v-model="pageInfo.grade">
                        <div class="check">전체</div>
                    </label>
                    <label v-for="(labels, index) in 5" :key="index"
                        :for="'itemGrade' + ( index + 1 )">
                        <input type="radio" name="itemGrade"
                            :id="'itemGrade' + ( index + 1 )"
                            :value="(index + 1).toString()"
                            v-model="pageInfo.itemGrade">
                        <div class="check">
                            {{ index + 1 }}등급
                            <img :src="'/images/products/icon_fundGrade' + ( index + 1 ) +
                                ( pageInfo.grade === (index + 1).toString() ? '_on' : '' ) + '.png'" :alt="'제로인평가 ' + ( index + 1 ) + '등급'">
                        </div>
                    </label>
                    <label for="grade6">
                        <input type="radio" id="grade6" name="grade" value="6"
                            v-model="pageInfo.grade">
                        <div class="check">등급없음</div>
                    </label>
                </div>
                <!-- 운용사 -->
                <div data-align="2">
                    <h3>
                        <a href="javascript:;">
                            운용사 (최대 5개 선택가능)
                            <p>
                                <span class="fontPointBlue">{{ pageInfo.manager.length }}</span>/5
                            </p>
                        </a>
                    </h3>
                    <div>
                        <label v-for="(options, index) in managerArr" :key="index"
                            :for="options.value">
                            <input type="checkbox" name="fundType"
                                :id="options.value" :value="options.value"
                                v-model="pageInfo.manager">
                            <div>{{ options.text }}</div>
                        </label>
                    </div>
                </div>
            </template>
        </div>
        <div class="buttonArea div3_7">
            <button type="button" class="white h50" @click="resetSet()">초기화</button>
            <button type="button" class="pointBlue h50"  @click="returnVal(pageInfo)">적용</button>
        </div>
    </div>
</template>
<script setup>
import { reactive, inject, onMounted, watch } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $toastMsg = inject('$toastMsg')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])

const pageInfo = reactive({
    kinds: props.options.data.kinds ? props.options.data.kinds : '', // 원리금보장 - 분류
    dueDay: props.options.data.dueDay ? props.options.data.dueDay : '', // 원리금보장 - 만기
    institute: props.options.data.institute ? props.options.data.institute : [], // 원리금보장 - 기관
    investArea: props.options.data.investArea ? props.options.data.investArea : '', // 공용 - 투자지역
    fundType: props.options.data.fundType ? props.options.data.fundType : '', // 공용 - 펀드유형
    riskGrade: props.options.data.riskGrade ? props.options.data.riskGrade : '', // 공용 - 위험등급
    volume: props.options.data.volume ? props.options.data.volume : '', // 공용 - 펀드규모
    grade: props.options.data.itemGrade ? props.options.data.itemGrade : '', // 공용 - 평가등급(제로인)
    manager: props.options.data.manager ? props.options.data.manager : [] // 공용 - 운용사
})
// 검색요소 변수 정리
// 기본적으로 전체는 ''를 기준하며, 별도 for로 처리하지 않음
const kindArr = [
    { value: 'savings', text: '예적금' }, { value: 'RP', text: 'RP' },
    { value: 'promissory', text: '어음' }, { value: 'insurance', text: '원리금보장형보험' }
]
const dueDayArr = [
    { value: '3', text: '3개월' }, { value: '6', text: '6개월' }, { value: '12', text: '1년' },
    { value: '24', text: '2년' }, { value: '36', text: '3년' }, { value: '60', text: '5년' }
]
const instituteArr = [
    { value: 'DBInsurance', text: 'DB손해보험' }, { value: 'NHBank', text: 'NH은행' },
    { value: 'OSBBank', text: 'OSB저축은행' }, { value: 'SBIBank', text: 'SBI저축은행' },
    { value: 'SCBank', text: 'SC제일은행' }, { value: 'midas', text: '마이다스자산' }
]
const fundTypeArr = [
    { value: 'stock', text: '주식형' }, { value: 'stockMix', text: '주식혼합형' }, { value: 'bond', text: '채권형' },
    { value: 'bondMix', text: '채권혼합형' }, { value: 'fofs', text: '재간접형' }, { value: 'mmf', text: 'MMF' },
    { value: 'derivative', text: '주식파생형' }, { value: 'specialAsset', text: '특별자산파생' }
]
const riskGradeArr = [
    { value: '5', text: '매우 높은 위험' }, { value: '4', text: '높은 위험' },
    { value: '3', text: '다소 높은 위험' }, { value: '2', text: '보통 위험' },
    { value: '1', text: '낮은 위험' }, { value: '0', text: '매우 낮은 위험' }
]
const volumeArr = [
    { value: 'u50', text: '50억 미만' }, { value: 'u100', text: '50억~100억 미만' },
    { value: 'u500', text: '100억~500억 미만' }, { value: 'u1000', text: '500억~1000억 미만' },
    { value: 'u5000', text: '1000억~5000억 미만' }, { value: 'o5000', text: '5000억 이상' }
]
const managerArr = [
    { value: 'koreaValue', text: '한국밸류자산' }, { value: 'goldenBridge', text: '골드브릿지자산' },
    { value: 'kyoboitm', text: '교보악사자산' }, { value: 'daol', text: '다올자산' },
    { value: 'daishin', text: '대신자산' }, { value: 'lazard', text: '라자드코리아자산' },
    { value: 'midas', text: '마이다스자산' }
]

// 데이타 리셋
const resetSet = () => {
    pageInfo.kinds = ''
    pageInfo.dueDay = ''
    pageInfo.institute = []
    pageInfo.investArea = ''
    pageInfo.fundType = ''
    pageInfo.riskGrade = ''
    pageInfo.volume = ''
    pageInfo.grade = ''
    pageInfo.manager = []
}
// 최종 실행 시 return 함수
const returnVal = (vals) => {
    const returnValue = vals || false
    emit('runEmits', returnValue)
    $modalEnd('modalArea')
}
// 선택값 개수 초기화 (기관, 운용사)
watch(() => pageInfo.institute, (next, prev) => {
    if(next.length > 5) {
        pageInfo.institute = prev
        $toastMsg({ msg: '최대 5개 까지만 선택이 가능합니다.' })
    }
})
watch(() => pageInfo.manager, (next, prev) => {
    if(next.length > 5) {
        pageInfo.manager = prev
        $toastMsg({ msg: '최대 5개 까지만 선택이 가능합니다.' })
    }
})

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    div.fullPopup {
         & .contentsArea {
            padding-top: 20px;
            & div {
                & ~ div { margin-top: 32px;}
                &[data-align="3"] {
                    & label {
                        width: calc((100%/3) - (20px/3));
                    }
                    &:not(.hasAll) {
                        & label:not(:nth-of-type(3n)) { margin-right: 10px;}
                    }
                    &.hasAll {
                        & label:not(:nth-child(3n + 2)) { margin-right: 10px;}
                    }
                    & label.all { width: 100%; }
                }
                &[data-align="2"] {
                    & label.all { width: 100%; }
                    & label:not(.all) {
                        width: calc(100%/2 - 5px);
                    }
                    & label:not(:nth-of-type(odd)) { margin-right: 10px;}
                }
                & h3 {
                    overflow: hidden; position: relative;
                    padding: 0; margin-bottom: 0;
                    font-weight: 500;
                    & a { display: block; color: inherit; text-decoration: none; }
                    & p {
                        float: right;
                        padding:0; margin: 0;
                        color: var(--fontLightgray); font-weight: 400;
                    }
                }
                & input[type="radio"] + div.check {
                    padding: 0;
                    border-color: rgba(236, 236, 236, 1);
                    background:rgba(249, 249, 249, 1);
                    text-align: center; color: rgba(140, 140, 140, 1); font-weight: 400;
                    & img {
                        height: 10px;
                        padding-left: 4px;
                    }
                }
                & input[type="checkbox"] + div {
                    margin-top: 10px; margin-bottom: 10px;
                }
                & input[type="radio"]:checked + div.check {
                    border-color: var(--pointBlue);
                    background:var(--white);
                    color: var(--pointBlue); font-weight: 500;
                }
                & label {
                    margin-top: 10px;
                }
                & img { height: 10px; }
            }
        }
    }
</style>