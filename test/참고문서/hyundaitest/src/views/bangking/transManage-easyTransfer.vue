<template>
    <!-- 이체결과 확인 -->
    <section id="acctTrResult">
        <!-- 타이틀 -->
        <div class="centerTitle">
            <h2 :class="pageInfo.isReg ? 'resultPass' : 'resultFail'">
                <strong>간편이체 서비스</strong>가<br>
                <strong :class="pageInfo.isReg ? 'fontPointBlue' : 'fontRed'">{{ pageInfo.isReg ? '등록' : '미등록' }}</strong>되었습니다.
            </h2>
        </div>
        <ul class="listType01">
            <li>실명기준 1일 100만원까지 보안매체 없이 즉시 이체 가능한 서비스입니다.</li>
            <li>1인 1대 모바일 기기만 등록가능합니다.</li>
            <li>모바일 기기 변경 시 재등록 필요합니다.</li>
        </ul>
    </section>
    <!-- 확인버튼 & 배너광고-->
    <div class="buttonArea">
        <button type="button"
            class="h50 pointBlue"
            @click="regEasyTransfer()">
            {{ pageInfo.isReg ? '해지하기' : '간편이체 등록하기' }}
        </button>
    </div>
</template>
<script setup>
import { inject, reactive } from 'vue'
const $runAlert = inject('$runAlert')
const pageInfo = reactive({
    isReg: true
})

// 등록, 해지 프로세스
const regEasyTransfer = () => {
    if(pageInfo.isReg) {
        // 해지프로세스
        $runAlert({ msg: '간편이체 서비스 등록이<br>해지 완료 되었습니다.' })
    } else {
        // 등록프로세스
        $runAlert({ msg: '간편이체 서비스 등록이<br>완료 되었습니다.' })
    }
    pageInfo.isReg = !pageInfo.isReg
}
</script>
<style type="postcss" scoped>
.listType01 { padding: 18px 20px; }
</style>