 <template>
<div>
    <section id="noteService">
        <button type="button" class="h50 select"
            @click="runComp(selectMyAccListInTypes)">
            <!-- <span>현대차증권 354-81-541521 </span> -->
            {{ $codeToBank('263').korName }}
            {{ $hmsecToDash('123465790') }}
        </button>
        <div class="iconBox message">
            <a href="javascript:;">
                수신번호
                <p>010-0000-0000</p>
            </a>
        </div>
        <div class="innerBtnBox">
            <a class="inArrow gray noLine" href="javascript:;">고객정보변경</a>
        </div>
        <hr>
        <div class="listSort">
            <label for="all">
                <input type="checkbox" id="all">
                <div>전체선택</div>
            </label>
        </div>
        <ul class="productList select noti">
            <!-- 반복 리스트 단위 -->
            <li>
                <label for="list01">
                    <input type="checkbox" id="list01">
                    <div></div>
                </label>
                <button type="button" class="noti on"></button>
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁</h1>
                </a>
            </li>
            <!-- // 반복 리스트 단위 -->
            <li>
                <label for="list02">
                    <input type="checkbox" id="list02">
                    <div></div>
                </label>
                <button type="button" class="noti"></button>
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁</h1>
                </a>
            </li>
            <li>
                <label for="list02">
                    <input type="checkbox" id="list02">
                    <div></div>
                </label>
                <button type="button" class="noti"></button>
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁</h1>
                </a>
            </li>
            <li>
                <label for="list02">
                    <input type="checkbox" id="list02">
                    <div></div>
                </label>
                <button type="button" class="noti"></button>
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁</h1>
                </a>
            </li>
            <li>
                <label for="list02">
                    <input type="checkbox" id="list02">
                    <div></div>
                </label>
                <button type="button" class="noti"></button>
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁</h1>
                </a>
            </li>
            <li>
                <label for="list02">
                    <input type="checkbox" id="list02">
                    <div></div>
                </label>
                <button type="button" class="noti"></button>
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁</h1>
                </a>
            </li>
            <li>
                <label for="list02">
                    <input type="checkbox" id="list02">
                    <div></div>
                </label>
                <button type="button" class="noti"></button>
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁</h1>
                </a>
            </li>
        </ul>
    </section>
    <div class="buttonArea">
        <button type="button" class="pointBlue h50"
        @click="runModal(modalFundNoteServiceSet)">선택펀드 알리미 설정</button>
    </div>
</div>
<component :is="componentsInfo.compName"
    :options="componentsInfo.compOption"
    @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue'
import modalFundNoteServiceSet from '@/components/products/modalFundNoteServiceSet.vue'
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})

// 컴포넌트 초기화
const closeComponent = () => {
    componentsInfo.compName = null
    componentsInfo.compOption = null
}

// 컴포넌트 실행
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === selectMyAccListInTypes) {
        componentsInfo.compOption = {
            bankingType: 'hmsec',
            bankCode: '263',
            bankAccNumber: '111'
        }
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === selectMyAccListInTypes) {
            closeComponent()
        } else if(comps === modalFundNoteServiceSet) {
            closeComponent()
        }
    } else {
        closeComponent()
    }
}
const runModal = (comps) => {
    // markRaw뒤에 컴포넌트 명 입력
    componentsInfo.compName = markRaw(comps)
    componentsInfo.emits = consoleValue
}
const consoleValue = (returnVals) => {
    console.log(returnVals)
    closeComponent()
}
// runModal(modalFundNoteServiceSet)
</script>
<style lang="postcss" scoped>
#noteService {
    padding-bottom: 86px;
}
button.select {
    width: calc(100% - 40px);
    margin: 12px 20px;
}
div.iconBox {
    padding: 0 20px;
}
div.innerBtnBox {
    margin: 8px 0 30px; padding: 0 20px;
    & > a {
        margin-left: auto;
    }
}
.productList {
    & li:last-child {
        border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
}
</style>