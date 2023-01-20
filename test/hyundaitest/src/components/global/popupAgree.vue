<template>
    <div id="popupAgree" class="fullPopup on">
        <div class="header">
            <h1>약관동의</h1>
            <button class="modalClose" @click="returnVal()"></button>
        </div>
        <section>
            <swiper id="agreeSlide" class="agreeArea"
                v-bind="swipes"
                @slideChange="agreeAct"
                @swiper="onSwiper">
                <!-- 슬라이드 1개 단위 -->
                <swiper-slide v-for="(agrees, index) in props.options" :key="index"
                    @scroll="checkAllView($event, index)">
                    {{ index }} {{ agrees.viewPage }} {{ agrees.mustReg }}\
                    asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>
                    asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>
                    asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>
                    asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>
                    asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>
                    asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>
                    asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>
                    asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>
                    asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>asfd<br>
                    asfd<br>asfd<br>12312321<br>
                </swiper-slide>
            </swiper>
            <!-- {{ props.options }} -->
        </section>
        <div class="buttonArea">
            <button type="button" class="white h50"
                v-if="pageInfo.viewCount > 1"
                @click="moveTo()">이전</button>
            <button type="button" class="pointBlue h50"
                @click="moveTo(1)"
                :disabled="pageInfo.isAllView[pageInfo.viewCount - 1] !== true">
                {{ props.options[pageInfo.viewCount - 1].mustReg === true ? '동의' : '확인' }}
                <template v-if="props.options.length !== 1">
                {{ pageInfo.viewCount }}/{{ props.options.length }}
                </template>
            </button>
        </div>
    </div>
</template>

<script setup>
import { reactive, inject, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const agreeArr = new Array(0)
const returnVal = () => {
    $modalEnd('popupAgree')
    emit('runEmits', agreeArr)
}

// 페이지 데이터
const pageInfo = reactive({
    viewCount: 1,
    isAllView: new Array(0),
    agreeArr: new Array(0)
})
// 최초 isAllView  추가
const addCheckView = () => {
    for(let i = 0; i < props.options.length; i++) {
        pageInfo.isAllView.push(false)
    }
}
addCheckView()
// 스와이프 옵션
const swipes = {
    slidesPerView: 1,
    spaceBetween: 0,
    allowTouchMove: false
}

const checkAllView = (ev, index) => {
    const maxScroll = ev.target.scrollHeight - ev.target.getBoundingClientRect().height
    if(ev.target.scrollTop >= maxScroll - 10 && pageInfo.isAllView[index] === false) {
        pageInfo.isAllView[index] = true
    }
}

const agreeAct = (ev) => {
    pageInfo.viewCount = (ev.realIndex + 1)
}

// 슬라이드 이벤트
let agreeSlide = null
const onSwiper = (swiper) => {
    agreeSlide = swiper
}

const moveTo = (check) => {
    if(typeof check === 'undefined') {
        agreeArr.length = (agreeArr.length - 1)
        agreeSlide.slidePrev()
    } else {
        agreeArr.push(props.options[(pageInfo.viewCount - 1)])
        if(props.options.length === pageInfo.viewCount) {
            $modalEnd('popupAgree')
            emit('runEmits', agreeArr)
        } else {
            agreeSlide.slideNext()
        }
    }
}

onMounted(() => {
    $modalStart('popupAgree')
})
</script>
<style lang="postcss" scoped>
#popupAgree {
    height: 100%;
    & > section {
        overflow: auto;
        height: calc(100% - 70px);
        margin-top: 0;
        box-sizing: border-box;
    }
}
.agreeArea {
    height: 100%;
    & div {
        height: 100%;
    }
    & .swiper-slide {
        overflow: auto;
        height: 100%;
        padding: 0 20px 20px;
        box-sizing: border-box;
    }
}
</style>