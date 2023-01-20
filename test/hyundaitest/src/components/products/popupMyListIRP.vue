<template>
    <!--나의 가입상품 -->
<div id="myIRPList" class="fullPopup">
    <div class="header">
        <h1>나의 가입상품 </h1>
        <button class="modalClose" @click="returnVal(false)"></button>
    </div>
    <div class="contentsArea">
        <div class="tab">
            <label for="allItem">
                <input type="radio" id="allItem" name="itemType" checked>
                <div>전체</div>
            </label>
            <label for="guarantee">
                <input type="radio" id="guarantee" name="itemType">
                <div>원리금보장</div>
            </label>
            <label for="dividend">
                <input type="radio" id="dividend" name="itemType">
                <div>실적배당</div>
            </label>
        </div>
        <div class="listSort">
            <label for="selectAll">
                <input type="checkbox" id="selectAll">
                <div>전체선택</div>
            </label>
            <!-- 투자비율 화면으로 이동 -->
            <a href="javascript:;" class="blue noLine inArrow">투자비율 등록</a>
        </div>
        <ul class="productList select">
            <li>
                <label for="select01">
                    <input type="checkbox" id="select01">
                    <div></div>
                </label>
                <div class="bullets">
                    <!--매우높은위험(red) 높은위험(orange) 다소높은위험(yellow) 보통위험(ligntBlue) 낮은위험(blue) 매우낮은위험(green)-->
                    <span class="bullet blue">보통위험</span>
                    <span class="bullet gray">원리금보장</span>
                </div>
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                </a>
                <ol class="simpleBox">
                    <li>
                        <span>투자비율</span>
                        <p>0.00%</p>
                    </li>
                    <li>
                        <span>상품유형</span>
                        <p>국내주식형</p>
                    </li>
                </ol>
            </li>
            <li>
                <label for="select02">
                    <input type="checkbox" id="select02">
                    <div></div>
                </label>
                <div class="bullets">
                    <span class="bullet red">매우높은위험</span>
                    <span class="bullet gray">위험자산</span>
                </div>
                <a href="javascript:;">
                    <h1>
                        NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                    </h1>
                </a>
                <ol class="simpleBox">
                    <li>
                        <span>투자비율</span>
                        <p>0.00%</p>
                    </li>
                    <li>
                        <span>상품유형</span>
                        <p>국내주식형</p>
                    </li>
                </ol>
            </li>
        </ul>
    </div>
    <div class="buttonArea"
        data-buttonLength="1">
        <button type="button" class="pointBlue h50"
            @click="returnVal(false)"
            >확인</button>
    </div>
</div>
</template>
<script setup>
import { inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    $modalEnd('myIRPList')
    emit('runEmits', vals)
}
onMounted(() => {
    $modalStart('myIRPList')
})
</script>
<style lang="postcss" scoped>
div.fullPopup > div.contentsArea {
    padding-left: 0; padding-right: 0;
}
.tab { margin: 12px 20px 0;}
</style>