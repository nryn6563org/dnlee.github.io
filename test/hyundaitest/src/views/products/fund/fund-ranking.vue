<template>
<div id="rankingFund" class="rankingFund">
    <div id="expensionArea" class="stickyArea">
        <!-- 화면전환 -->
        <h1>
            랭킹펀드
            <button type="button"
                @click="$router.push({ name: 'fundSearch' })">더보기</button>
        </h1>
        <!-- tab메뉴 -->
        <div class="tabStyle04 h40">
            <ul data-tabList="3">
                <li :class="{ 'on': pageInfo.listType === 'yield' }">
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType='yield'">
                        수익률
                    </a>
                </li>
                <li :class="{ 'on': pageInfo.listType === 'setting' }">
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType='setting'">
                        설정액
                    </a>
                </li>
                <li :class="{ 'on': pageInfo.listType === 'IRP' }">
                    <a href="javascript:;" draggable="false"
                        @click="pageInfo.listType='IRP'">
                        IRP수익률
                    </a>
                </li>
            </ul>
        </div>
        <!-- tab 메뉴별 설명 -->
    </div>
    <p>
        {{
            pageInfo.listType === 'yield' ? '최근 3개월, 수익률이 높은 순서 기준 온라인 펀드입니다.' :
            pageInfo.listType === 'setting' ? '최근 3개월, 설정액 증가폭이 높은 순서 기준 온라인 펀드입니다.' :
            '최근 3개월, IRP수익률이 높은 순서 기준 온라인 펀드입니다.'
        }}
    </p>
    <!-- fund상품 리스트 -->
    <ul class="productList ranking">
        <!-- 반복 목록 단위 -->
        <li>
            <!-- 랭킹펀드용 순위 노출 -->
            <span>1</span>
            <!-- 기본 뱃지 영역 -->
            <div class="bullets">
                <!-- 위험도 class / red(매우높은위험) / orange(높은위험) / yellow(다소높은위험) /
                    lightBlue(보통위험) / blue(낮은위험) / green(매우낮은 위험) -->
                <span class="bullet red">매우높은위험</span>
                <span class="bullet gray">해외주식형</span>
                <span class="bullet bgRed">고난도</span>
                <span class="bullet purple">베스트</span>
                <!-- 즐겨찾기 여부에 따른 class="on" 추가 -->
                <button type="button" class="on" title="즐겨찾기"></button>
            </div>
            <!-- 타이틀, 안내, 수수료, 기간 -->
            <a href="javascript:;" @click="$router.push({ name: 'fundView' })">
                <dl>
                    <dt>
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                        수수료선취 - 온라인
                    </dt>
                    <dd>
                        3개월<br>
                        <strong>3.41%</strong>
                    </dd>
                </dl>
            </a>
            <!-- 태그영역 -->
            <p>
                <strong>온라인</strong>
                <strong>차이나백마주</strong>
                <strong>해외주식</strong>
            </p>
        </li>
        <!-- // 반복 목록 단위 -->
        <li>
            <span>2</span>
            <div class="bullets">
                <span class="bullet red">매우높은위험</span>
                <span class="bullet gray">해외주식형</span>
                <span class="bullet bgRed">고난도</span>
                <span class="bullet purple">베스트</span>
                <button type="button" title="즐겨찾기"></button>
            </div>
            <a href="javascript:;" @click="$router.push({ name: 'fundView' })">
                <dl>
                    <dt>
                        <h1>KB스타코리아리버스인덱스증권투자신탁(주식-파생형)A-E클래스</h1>
                        수수료선취 - 온라인
                    </dt>
                    <dd>
                        3개월<br>
                        <strong>13.73%</strong>
                    </dd>
                </dl>
            </a>
            <!-- 태그영역 -->
            <p>
                <strong>온라인</strong>
                <strong>ISA</strong>
                <strong>2차전지</strong>
            </p>
        </li>
        <li>
            <span>3</span>
            <div class="bullets">
                <span class="bullet yellow">다소높은위험</span>
                <span class="bullet gray">해외주식형</span>
                <button type="button" title="즐겨찾기"></button>
            </div>
            <a href="javascript:;" @click="$router.push({ name: 'fundView' })">
                <dl>
                    <dt>
                        <h1>유리차이나백마주뉴웨이브증권투자신탁[주식]C/C-P1e</h1>
                        수수료선취 - 온라인 - 퇴직연금
                    </dt>
                    <dd>
                        3개월<br>
                        <strong>13.44%</strong>
                    </dd>
                </dl>
            </a>
            <!-- 태그영역 -->
            <p>
                <strong>온라인</strong>
                <strong>차이나백마주</strong>
                <strong>차이나</strong>
                <strong>전기차</strong>
            </p>
        </li>
        <li>
            <span>4</span>
            <div class="bullets">
                <span class="bullet blue">보통위험</span>
                <span class="bullet gray">해외주식형</span>
                <button type="button" title="즐겨찾기"></button>
            </div>
            <a href="javascript:;" @click="$router.push({ name: 'fundView' })">
                <dl>
                    <dt>
                        <h1>메리츠차이나증권투자신탁[주식]종류C-Pe2</h1>
                        수수료선취 - 온라인 - 퇴직연금
                    </dt>
                    <dd>
                        3개월<br>
                        <strong>13.44%</strong>
                    </dd>
                </dl>
            </a>
            <!-- 태그영역 -->
            <p>
                <strong>온라인</strong>
                <strong>차이나</strong>
                <strong>전기차</strong>
            </p>
        </li>
    </ul>
    <!-- 펀드 검색 -->
    <button type="button" @click="$router.push({ name: 'fundSearch' })">펀드검색 바로가기</button>
</div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()

const pageInfo = reactive({
    listType: 'yield'
})

onMounted(() => {
    // 터치시 바텀시트 확장 축소
    let touchStartY = 0
    const swipeArea = document.getElementById('rankingFund')
    // 이벤트 초기화
    const endExpension = (ev) => {
        // const lastTouchY = ev.changedTouches[0].clientY
        swipeArea.removeEventListener('touchmove', doExpansion)
        swipeArea.style.top = 0
    }
    // touchmove 시 마진값 조절
    const doExpansion = (ev) => {
        // console.log(ev, touchStartY)
        const movedY = ev.changedTouches[0].clientY
        swipeArea.addEventListener('touchend', endExpension)
        if(swipeArea.classList.contains('open')) {
            if(touchStartY - movedY < -80 && swipeArea.scrollTop <= 0) {
                swipeArea.removeEventListener('touchmove', doExpansion)
                swipeArea.style.top = 0
                swipeArea.classList.remove('open')
            }
        } else if(!swipeArea.classList.contains('open')) {
            if(touchStartY - movedY > 80) {
                swipeArea.removeEventListener('touchmove', doExpansion)
                swipeArea.style.top = 0
                swipeArea.classList.add('open')
            } else if(touchStartY - movedY < -80) {
                ev.preventDefault()
                if(!swipeArea.classList.contains('bounce')) swipeArea.classList.add('bounce')
                setTimeout(() => {
                    swipeArea.classList.remove('bounce')
                }, 140)
            }
        }
    }
    // touchstart 최초 좌표반환
    const addHeight = (ev) => {
        touchStartY = ev.changedTouches[0].clientY
        swipeArea.addEventListener('touchmove', doExpansion)
    }
    swipeArea.addEventListener('touchstart', addHeight)
})
</script>

<style lang="postcss" scoped>
/* 랭킹 펀드 */
/* 스와이프 퍼포먼스용 css */
div.rankingFund {
    position: relative; overflow: hidden;
    bottom: 0; height: 100%; /* height: calc(100vh - (100vh - 146px)); */
    margin-top: -146px; padding: 0;
    border-radius: 20px 20px 0px 0px;
    background: var(--white);
    z-index: 2;
    transition: margin .3s ease-in-out;
    &.open {
        overflow: auto; height: calc(100vh - (100vh - 650px));
        margin-top: -650px;
    }
    &.bounce {
        margin-top: -126px;
        transition: margin .14s ease-in;
    }
    & div.stickyArea {
        position: fixed; overflow: hidden;
        width: 100%;
        padding-top: 20px; border-radius: 20px 20px 0px 0px;
        background: var(--white);
        z-index: 10;
        & > h1 {
            overflow: hidden;
            margin: 0; padding: 0 20px;
            line-height: 23px; font-size: 1.285rem;
            & button {
                float: right;
                padding:0;
                border: none;
                background: var(--white);
                line-height: 23px; font-size: 0.857rem; color:rgba(130, 130, 130, 1) ;
            }
        }
    }
    & > p {
        min-height: 45px;
        width: 100%;
        margin: 83px 0 0; padding: 14px 20px 12px 40px;
        background: rgba(66, 88, 205, 0.06) url('@/assets/images/global/icon_err_line_gray.png') no-repeat left 20px top 14px   / 16px auto;
        line-height: 18px; text-align: left; font-size: 0.857rem; color: rgba(130, 130, 130, 1);
        box-sizing: border-box;
    }
    & ul.productList {
        border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
    /* 펀드검색 */
    & > button {
        width: 100%;
        padding: 0 20px;
        border: none;
        background: var(--white) url('@/assets/images/global/arrow_right_m.png') no-repeat right 20px center /20px auto ;
        line-height: 56px; text-align: left; font-size:1rem ; font-weight: 500; color: var(--black);
        box-sizing: border-box;
    }
}
/* 탭메뉴 */
.tabStyle04 {
    height: 40px;
    & ul li.on {
        & > a { color: rgba(33, 81, 209, 1);}
        &::after {
            border-radius: 2px;
            background:rgba(33, 81, 209, 1);
        }
    }
    &.h40 {
        & li {
            height: 40px;
            line-height: 38px;
        }
    }
}
</style>