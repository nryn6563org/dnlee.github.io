<template>
    <!-- 예약이체 안내 팝업 -->
    <!-- 레이아웃 잡을 시 class on 추가 -->
    <div id="modalArea" role="dialog">
        <!-- 레이아웃 잡을 시 class on 추가 -->
        <div>
            <!-- 제목열 -->
            <h1>
                예약이체 안내
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <ul class="listType01">
                    <li>원하는 날짜 및 시간에 출금될 수 있는 출금예약서비스 입니다.</li>
                    <li>
                        <strong>등록/해지 가능시간</strong>: <span class="fontUnderLn">영업일 08:30 ~ 22:00</span><br>단, 비영업일 및 공휴일은 이체일로 지정이 불가합니다.
                    </li>
                    <li>
                        <strong>이체출금 처리시간</strong>: <span class="fontUnderLn">09:30(오전)/15:50(오후)</span><br>단, 이체출금 처리시간 10분 전까지 예약이체 신청하셔야 합니다.
                    </li>
                    <li>
                        <strong>한도</strong>: <span class="fontUnderLn">예약이체 + 즉시이체</span>(1회/1일 개인 이체한도 적용)<br>* 예약이체 등록이 완료된 이후 이체시점에 1일 한도가 초과되는 경우 이체 불가합니다.
                    </li>
                    <li>
                        <strong>이체수수료</strong>: <span class="fontUnderLn">건당500원</span>(당사 계좌간 이체 무료)<br>* 단, 예약이체일 기준으로 이체수수료 부족 시 처리가 불가합니다.
                    </li>
                    <li>은행이체 약정등록계좌로 예약이체 시 이체한도 보안1등급 적용됩니다.</li>
                    <li>정상출금 및 처리 불능 시 SMS 전송됩니다.<br>단, SMS서비스 등록계좌에만 발송됩니다.</li>
                    <li>통장표시내용 미입력 시 계좌명이 표시됩니다.</li>
                    <li>예약이체 등록은 6개월까지만 가능합니다.</li>
                    <li>예약이체 출금완료내역은 취소할 수 없습니다. 착오송금을 하신 경우, 자금반환청구를 요청해주시기 바랍니다.</li>
                </ul>
            </div>
            <!-- 버튼 영역 -->
            <!-- 버튼의 경우 data-buttonLength="n" 2~5개까지 균등 분배 -->
            <div class="buttonArea"
                data-buttonLength="1">
                <button type="button" class="pointBlue h50"
                    @click="returnVal(true)"
                    >확인</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'
// 모달 실행 모션 on 추가 함수
const $modalStart = inject('$modalStart')
// 모달 종료 모션 on 제거 함수
const $modalEnd = inject('$modalEnd')

// 최종 실행 시 return 함수
const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    const returnValue = vals || false
    $modalEnd('modalArea')
    emit('runEmits', returnValue)
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
     #modalArea{
        & > div {
            padding-bottom: 98px;
            & > h1 + div:not(.buttonArea){max-height: calc(100vh - 200px);}
        }
     }
</style>
