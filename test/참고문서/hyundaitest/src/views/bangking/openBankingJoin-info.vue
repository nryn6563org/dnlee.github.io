<template>
<div>
    <section id="openBankingInfo">
        <swiper
            :pagination="true"
            :modules="swiperModules"
            :slides-per-view="1"
            :space-between="0">
            <swiper-slide>
                <div class="titleGroup">
                    <span>현대차증권</span>
                    <h1>오픈뱅킹서비스</h1>
                    <p>
                        흩어져 있는 <span>여러 금융회사 계좌</span>를<br>
                        쉽고 간편하게 관리해 보세요.
                    </p>
                </div>
                <div class="contentArea">
                    <span>
                        <strong>오픈뱅킹 서비스란?</strong><br>
                        현대차증권에서 다른 금융회사의 계좌를<br>
                        한번에 관리할 수 있는 서비스로 계좌 잔액조회,<br>
                        거래내역조회이체 등의 금융거래가 가능합니다.
                    </span>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="titleGroup">
                    <h2>
                        <p>여러 금융기관 계좌를</p>
                        한번에, <span>쉽고 빠르게!</span>
                    </h2>
                </div>
                <div class="contentArea">
                    <p>
                        흩어져 있는 자금을 <span>인증없이 한번에</span> 가져와요.<br>
                        실시간 잔액과 거래내역 조회도 한번에!
                    </p>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="titleGroup">
                    <h2>
                        <p>금액, 횟수에 상관없이</p>
                        <span>이체수수료가 무료!</span>
                    </h2>
                </div>
                <div class="contentArea">
                    <p>
                        다른 금융회사 계좌 등록하고,<br>
                        <span>수수료 없이 이체</span>하세요.
                    </p>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="titleGroup">
                    <h2>
                        <p>거래할 때</p>
                        <span>바로바로 충전하기</span>
                    </h2>
                </div>
                <div class="contentArea">
                    <p>
                        주식 주문, 금융상품 거래할 때<br>
                        <span>바로바로 충전해서 거래</span>할 수 있어요.
                    </p>
                </div>
            </swiper-slide>
        </swiper>
    </section>
    <div class="buttonArea">
        <button type="button" class="pointBlue h50"
            @click="emit('runEmits', true)">
            오픈뱅킹 계좌 등록하기
        </button>
    </div>
</div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper'
import 'swiper/css'
const emit = defineEmits(['runEmits'])

const swiperModules = [Pagination]

</script>

<style lang="postcss" scoped>
#openBankingInfo {
    height: calc(100% - 126px);
    padding: 0 20px;
    & .swiper, & .swiper-wrapper {
        height: 100%;
    }
    & .swiper-slide {
        height: calc(100% - 68px);
        text-align: center;
        & > div {
            overflow: hidden;
        }
        & > .titleGroup {
            height: 120px;
            & > span {
                font-size: 1.143rem; font-weight: 700;
            }
            & > h1 {
                margin: 6px 0 16px; padding: 0;
                font-size: 2.286rem; font-weight: 700; color: var(--pointBlue); line-height: 1;
            }
            & > p {
                margin: 0; padding: 0;
                font-size: 1rem; font-weight: 400;
                & > span { color: var(--pointBlue); background-color: rgba(63,84,195,.1); }
            }
            & > h2 {
                margin: 46px 0 0; padding: 0;
                font-size: 1.571rem; color: var(--pointBlue);
                & > p { padding:0; margin: 0; color: var(--black); }
            }
        }
        & > .contentArea {
            height: calc(100% - 120px);
            padding-top: 300px;
            background-size: 360px; background-repeat: no-repeat; background-position: top center;
            & > span {
                font-size: 0.857rem; color: var(--tableTitleFont); font-weight: 400;
            }
            & > p {
                padding: 0; margin: 0;
                font-size: 1rem;
                & > span { color: var(--pointBlue); background-color: rgba(63,84,195,.1); }
            }
        }
        &:nth-child(1) > .contentArea { background-image: url('@/assets/images/banking/image_openbanking_join_01.png') }
        &:nth-child(2) > .contentArea { background-image: url('@/assets/images/banking/image_openbanking_join_02.png') }
        &:nth-child(3) > .contentArea { background-image: url('@/assets/images/banking/image_openbanking_join_03.png') }
        &:nth-child(4) > .contentArea { background-image: url('@/assets/images/banking/image_openbanking_join_04.png') }
    }
}
</style>
<style lang="postcss">
/* 슬라이더 스와이프 */
#openBankingInfo {
    & .swiper-pagination {
        overflow: hidden; position: absolute;
        width: calc(100vw - 40px); height: 8px; bottom: 30px;
        text-align: center;
        line-height: 0;
    }
    & .swiper-pagination-bullet {
        display: inline-block;
        width: 8px; height: 8px;
        border-radius: 4px;
        background: var(--tableCenterLine);
    }
    & .swiper-pagination-bullet + .swiper-pagination-bullet {
        margin-left: 8px;
    }
    & .swiper-pagination-bullet-active {
        background: rgba(0,0,0,0.7) !important;
    }
}
</style>