<template>
<div>
    <!-- tab.매도 -->
    <article data-name="sell"
        :class="pageInfo.shellList.length == 0 ? 'on' : ''">
        <h3 class="onlyChangeTrade" v-if="props.pageInfo.selectTabMenu ==  'changeTrade'">매도상품 선택</h3>
        <form action="">
                <div class="tab">
                    <label for="all">
                        <input type="radio" id="all" name="sellType" checked value="all"
                            @change="filterView($event)">
                        <div>전체</div>
                    </label>
                    <label for="guarantee">
                        <input type="radio" id="guarantee" name="sellType" value="00"
                            @change="filterView($event)">
                        <div>원리금보장</div>
                    </label>
                    <label for="dividend">
                        <input type="radio" id="dividend" name="sellType" value="01"
                            @change="filterView($event)">
                        <div>실적배당</div>
                    </label>
                </div>
            </form>
        <!-- 매도상품리스트 -->
        <template v-if="pageInfo.shellList.length == 0">
            <!-- 목록 없을 경우 -->
            <ul class="noList">
                <li>
                    <p>매도가능한 상품이 없습니다.</p>
                </li>
            </ul>
        </template>
        <template v-else-if="pageInfo.shellList.length !== 0">
            <!-- 목록 존재할 경우 -->
            <h2>
                <label for="allAcct">
                    <input type="checkbox" id="allAcct">
                    <div>전체선택</div>
                </label>
            </h2>
            <ul class="productList select">
                <!-- 반복리스트 -->
                <li v-for="(list, index) in pageInfo.shellList" :key="index">
                    <label :for="'select'+ index">
                        <input type="checkbox" :id="'select'+ index">
                        <div></div>
                    </label>
                    <div class="bullets">
                        <!-- 매우높은위험 red, 높은위험 ornage, 다소높은위험 yellow, 보통위험 lightBlue, 낮은위험 blue, 매우낮은위험 green  -->
                        <span class="bullet" :class="pageInfo.riskGradeInfo[list.riskGrade - 1].bullet">
                            {{pageInfo.riskGradeInfo[list.riskGrade - 1].gradeName}}
                        </span>
                        <span class="bullet gray">{{list.itemType}}</span>
                    </div>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    </a>
                    <ol class="simpleBox">
                        <li>
                            <span>수익률</span>
                            <strong class="fontRed">{{list.return}}%</strong>
                        </li>
                        <li>
                            <span>평가금액</span>
                            <strong>{{$priceToCommas(list.marketValue)}}원</strong>
                        </li>
                        <li>
                            <span>매입원금</span>
                            <strong>{{$priceToCommas(list.principal)}}원</strong>
                        </li>
                    </ol>
                    <div class="innerBtnBox">
                        <button type="button" class="fontBlue">매도</button>
                    </div>
                </li>
            </ul>
        </template>
    </article>
    <div class="buttonArea" data-buttonLength="1"
        v-if="pageInfo.shellList.length !== 0">
        <button type="button" class="h50 blue" v-if="props.pageInfo.selectTabMenu ==  'sell'"
            @click="$router.push({ name: 'sellIRPEnter', params: { type: 'sell'}})">매도</button>
        <button type="button" class="h50 pointBlue" v-if="props.pageInfo.selectTabMenu ==  'changeTrade'"
            @click="$router.push({ name: 'sellIRPEnter', params: { type: 'changeTrade'}})">다음</button>
    </div>
</div>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['pageInfo'])
const pageInfo = reactive({
    riskGradeInfo: [
        {
            bullet: 'red',
            gradeName: '매우높은위험'
        },
        {
            bullet: 'ornage',
            gradeName: '높은위험'
        },
        {
            bullet: 'yellow',
            gradeName: '다소높은위험'
        },
        {
            bullet: 'lightBlue',
            gradeName: '보통위험'
        },
        {
            bullet: 'blue',
            gradeName: '낮은위험'
        },
        {
            bullet: 'green',
            gradeName: '매우낮은위험'
        }
    ],
    shellList: [ // 매도 목록
        {
            itemName: 'NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]', // 상품명
            riskGrade: 1, // 위험등급 1~6
            itemType: '원리금보장', // 00 원리금보장, 01 실적배당
            return: '100.20', // 수익률
            marketValue: '1000000', // 평가금액
            principal: '1500000' // 매입원금
        },
        {
            itemName: 'NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]', // 상품명
            riskGrade: 6, // 위험등급 1~6
            itemType: '실적배당', //
            return: '100.20', // 수익률
            marketValue: '1000000', // 평가금액
            principal: '1500000' // 매입원금
        }
    ],
    filterData: new Array(0)

})
const filterView = (e) => {
    // if(e.target.checked) {
    //     const filterCode = e.target.value
    //     if(filterCode === 'all') {
    //         pageInfo.filterData = pageInfo.shellList
    //     } else {
    //         pageInfo.filterData = pageInfo.shellList.filter(arr => arr.itemType === filterCode)
    //     }
    // }
}
// console.log(props.pageInfo.selectTabMenu)
</script>
<style lang="postcss" scoped>
article {
    padding: 0 0 100px;
    /* noList 대비 */
    &.on {
        /* height: calc(100% - 70px); */
        height: 534px;
        box-sizing: border-box;
    }
    & form {
        padding:20px ;
    }
    & > h2 {
        margin: 0 0 18px; padding: 0 20px;
        font-weight: 400; font-size: 1rem;
    }
    & h3.onlyChangeTrade {
        margin: 20px 0 12px;
    }
    & h3.onlyChangeTrade + form { padding-top: 0;}
    & .noList {
        height:100%;
        padding: 0; margin: -20px 0 0;
        border: none;
    }
}
.productList.select {
    & > li {
        border-top: 1px solid rgba(229, 229, 229, 1);
    }
    & .bullets { margin-bottom: 6px;}
    & .simpleBox {
        margin-left: 30px; margin-top: 12px;
    }
    & .innerBtnBox {
        padding-left: 0; margin: 16px 0 0 30px;
    }
}
</style>