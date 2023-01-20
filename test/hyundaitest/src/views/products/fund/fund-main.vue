<template>
<div>
    <!-- 펀드홈 -->
    <section id="fundMain">
        <article class="swipeArea">
            <!-- 투자성향 -->
            <div class="titleArea">
                <h1>추천펀드 <button type="button"  title="추천상품 선정기준" @click="runModal(fundStandardInfo)" class="info"></button></h1>
                <!-- 다른유형노출 셀렉트  -->
                <button type="button" class="select"
                    @click="runComp(reSelect)">
                    성향맞춤(위험중립형)
                </button>
            </div>
            <!-- 추천펀드 슬라이드 -->
            <swiper
                :pagination="true"
                :modules="swiperModules"
                :slides-per-view="1"
                :space-between="20"
                class="fundSwipter">
                <!-- 슬라이드 1개 단위 -->
                <swiper-slide>
                    <div class="fundType">
                        <!-- 위험도 class / red(매우높은위험) / orange(높은위험) / yellow(다소높은위험) /
                            lightBlue(보통위험) / blue(낮은위험) / green(매우낮은 위험) -->
                        <span class="bullet red">매우높은위험</span>
                        <span class="bullet gray">해외주식형</span>
                        <!-- class on -->
                        <button type="button" title="펀드 찜하기 등록" class="on"></button>
                    </div>
                    <h1>하나USB글로벌인프라증권자산신탁(주식)Ce</h1>
                    <p class="fundOption">수수료미청구, 온라인,퇴직연금</p>
                    <h2 class="fundYield"><span>3개월</span>3.41%</h2>
                    <div class="fundDetail">
                        <strong># 안전</strong>
                        <p>글로벌 리츠 투자로 투자되는 곳이 한곳에 집중되지 않아요. 글로벌 리츠 투자</p>
                    </div>
                </swiper-slide>
                <!-- // 슬라이드 1개 단위 -->
                <swiper-slide>
                    <div class="fundType">
                        <span class="bullet red">매우높은위험</span>
                        <span class="bullet gray">해외주식형</span>
                        <button type="button" title="펀드 찜하기 등록"></button>
                    </div>
                    <h1>하나USB글로벌인프라증권자산신탁(주식)Ce</h1>
                    <p class="fundOption">수수료미청구, 온라인,퇴직연금</p>
                    <h2 class="fundYield"><span>3개월</span>3.41%</h2>
                    <div class="fundDetail">
                        <strong># 안전</strong>
                        <p>글로벌 리츠 투자로 투자되는 곳이 한곳에 집중되지 않아요. 글로벌 리츠 투자</p>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="fundType">
                        <span class="bullet red">매우높은위험</span>
                        <span class="bullet gray">해외주식형</span>
                        <button type="button" title="펀드 찜하기 등록"></button>
                    </div>
                    <h1>하나USB글로벌인프라증권자산신탁(주식)Ce</h1>
                    <p class="fundOption">수수료미청구, 온라인,퇴직연금</p>
                    <h2 class="fundYield"><span>3개월</span>3.41%</h2>
                    <div class="fundDetail">
                        <strong># 안전</strong>
                        <p>글로벌 리츠 투자로 투자되는 곳이 한곳에 집중되지 않아요. 글로벌 리츠 투자</p>
                    </div>
                </swiper-slide>
            </swiper>
        </article>
        <fundRanking />
        <!-- 랭킹펀드 -->
    </section>
</div>
<component :is="componentsInfo.compName"
    :options="componentsInfo.compOption"
    @runEmits="closeComp" />
</template>
<script setup>
import { reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import fundStandardInfo from '@/components/products/modalFundStandardInfo.vue' // 추천상품 선정기준 팝업
import reSelect from '@/components/global/reSelect.vue'
import fundRanking from './fund-ranking.vue'// 하단 고정 펀드랭크
import { Pagination } from 'swiper'
import 'swiper/css'

const props = defineProps(['swiperOption'])
const $router = useRouter()

const swiperModules = [Pagination]
// const regInfo = reactive({
//     reasonCode: ''
// })
const typeSelect = [
    { listName: '매우높은위험', listValue: '01' },
    { listName: '높은위험', listValue: '02' },
    { listName: '다소높은위험', listValue: '03' },
    { listName: '보통위험', listValue: '04' },
    { listName: '낮은위험', listValue: '05' },
    { listName: '매우낮은위험', listValue: '06' }
]

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null,
    emits: null
})

// 컴포넌트 초기화
const closeComponent = () => {
    componentsInfo.compName = null
    componentsInfo.compOption = null
}
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === reSelect) {
        componentsInfo.compOption = {
            title: '투자성향 선택',
            selected: '높은위험',
            listData: typeSelect,
            returned: directInput
        }
    }
}
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === reSelect) {
            console.log(returnVals)
            closeComponent()
        }
    } else {
        closeComponent()
    }
}
const runModal = (comps) => {
    componentsInfo.compName = markRaw(comps)
    componentsInfo.emits = consoleValue
}
const consoleValue = (returnVals) => {
    console.log(returnVals)
    closeComponent()
}

</script>
<style lang="postcss" scoped>
/* 펀드메인 전용 css */
section {
    overflow: hidden;
    height: 100%;
    margin: 0; padding: 50px 0 0;
    background: rgba(97, 87, 160, 1);
    box-sizing: border-box;
}
/* 추천펀드 */
article.swipeArea {
    /* position: sticky; */
    z-index: 1;
    width: 100%; height: 100%;
    /* 투자성향 정보 */
    & .titleArea {
        display: flex;
        justify-content: space-between;
        padding: 16px 32px;
        & h1 {
            margin: 0;
            line-height: 23px; font-size:1.285rem; color: var(--white);
        }
        & > button {
            padding: 0 20px 0 0;
            border: none;
            background: transparent url('@/assets/images/global/arrow_white.png') no-repeat right center / 12px auto;
            line-height: 1; font-size: 1rem; color: var(--white);
        }
    }
}
/* 슬라이드 */
.swiper {
    /* overflow: auto; */
    width: 100%; height: 430px;
    padding: 24px 32px 46px;
    box-sizing: border-box;
    & .swiper-wrapper {
        align-items: center;
        padding: 0 0 24px;
        & .swiper-slide {
            overflow:hidden;
            height: 377px;
            padding: 24px 0 0;
            /* padding: 0; */
            border-radius: 16px;
            background: var(--white);
            transform: scaleY(.9);
            transition: all .2s ease-in-out;
            box-sizing: border-box;
            & * {
                transition: all .2s ease-in-out;
            }
            & .bullet {
                height: 22px;
                line-height: 22px;
                & ~ .bullet { margin-left: 4px;}
            }
            /* 펀드 타입정보 */
            & .fundType {
                overflow: hidden;
                padding: 0 24px;
                opacity: 0;
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
            /* 펀드 상품이름 */
            & > h1 {
                height: 48px;
                margin:12px 0; padding: 0 24px; word-break: break-all;
                line-height: 24px; text-align: left; font-size: 1.142rem;
            }
            /* 펀드 옵션정보 */
            & > p {
                margin: 0; padding: 0 24px;
                line-height: 15px;
                font-size: 0.857rem; color:rgba(150, 150, 150, 1) ;
            }
            /* 수익률 정보 */
            & > h2 {
                margin: 33px 0 0; padding: 30px 24px 0;
                background: url('@/assets/images/products/bg_RcmdFund.png') no-repeat right bottom -4px / 150px auto;
                font-size:1.857rem ; color: var(--red);
                & span {
                    display: block;
                    line-height: 1; color: rgba(150, 150, 150, 1); font-size: 0.857rem; font-weight: 400;
                }
            }
            /* 디테일 */
            & .fundDetail {
                margin-top: 20px; padding: 24px 24px 22px;
                /* padding: 24px 24px 32px; */
                background: rgba(245, 245, 245, 1);
                & p {
                    margin:4px 0 0;
                    line-height: 16px; font-size: 0.857rem; color:rgba(91, 91, 91, 1);
                }
            }
            &.swiper-slide-active {
                padding: 24px 0 0;
                box-shadow: 0px 10px 14px rgba(51, 51, 51, .4);
                transform: scaleY(1);
                & .fundType { opacity: 1;}
                & .fundDetail { padding-bottom: 32px;}
            }
        }
    }
}
</style>
<style lang="postcss">
#fundMain {
    overflow: hidden; height: 100%;
    /* 슬라이더 스와이프 */
    & .swiper-pagination {
        overflow: hidden; position: absolute;
        width: 100%; bottom: 0; left: 0;
        text-align: center; line-height: 0;
    }
    & .swiper-pagination-bullet {
        display: inline-block;
        width: 8px; height: 8px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.28);
    }
    & .swiper-pagination-bullet + .swiper-pagination-bullet {
        margin-left: 8px;
    }
    & .swiper-pagination-bullet-active {
        background: rgba(0,0,0,0.7) !important;
    }
}

</style>