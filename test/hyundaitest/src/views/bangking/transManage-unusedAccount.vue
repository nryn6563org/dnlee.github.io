<template>
    <!-- 이체결과 확인 -->
    <section id="acctTrResult">
        <!-- 타이틀 -->
        <div class="centerTitle">
            <h2 :class="pageInfo.isNormal ? 'resultPass' : 'resultFail'">
                <strong>인터넷 뱅킹 거래상태</strong>는<br>
                <strong :class="pageInfo.isNormal ? 'fontPointBlue' : 'fontRed'">{{ pageInfo.isNormal ? '정상' : '장기미사용계좌' }}</strong>입니다.
            </h2>
            <p>최종접속일 : <strong>{{ $dateToCommas(pageInfo.updateDate) }}</strong></p>
        </div>
        <ul class="listType01">
            <li>최근 12개월 이상 온라인(홈페이지, HTS, MTS)접속기록이 없는 경우 장기미사용 계좌로 분류되어 타행이체 거래가 제한됩니다.</li>
        </ul>
    </section>
    <!-- 확인버튼 & 배너광고-->
    <div class="buttonArea">
        <button type="button"
            class="h50 pointBlue"
            v-if="!pageInfo.isNormal"
            @click="doUnrestriction()">
            거래제한 해제하기
        </button>
    </div>
</template>
<script setup>
import { inject, reactive } from 'vue'
const $runAlert = inject('$runAlert')
const $dateToCommas = inject('$dateToCommas')
const pageInfo = reactive({
    isNormal: false,
    updateDate: new Date() // api연동시 콤마 타입이어도 됨
})

// 등록, 해지 프로세스
const doUnrestriction = () => {
    if(pageInfo.isReg) {
        // 등록프로세스
        $runAlert({ msg: '거래상태가 정상으로<br>처리 되었습니다.' })
    }
    pageInfo.isNormal = true
}
</script>

<style lang="postcss" scoped>
.listType01 { padding: 18px 20px; }
</style>