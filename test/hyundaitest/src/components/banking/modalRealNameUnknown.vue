<!-- 실명 미확인 계좌안내 --><!-- 고객확인의무 팝업 -->
<template>
    <div id="modalArea" role="dialog">
        <div class="bottomSheet">
            <h1>
                실명 미확인 계좌 안내
                <button type="button" class="modalClose"
                    @click="returnVal(false)">
                </button>
            </h1>
            <div class="contentsArea">
                <p>온라인개설 실명 미확인 계좌를 선택하였습니다. 명의확인 계좌는 근거계좌로의 출금만 가능합니다. </p>
                <ul class="listType02">
                    <li>
                        <!-- 클릭시 근거계좌정보 노출 -->
                        <button type="button"
                            @click="returnVal(false)">
                            <h2>근거계좌로 이체하기</h2>
                            <p>
                                {{ $codeToBank(transInfo.bankCode).korName }}
                                {{ transInfo.bankCode === '263' ? $hmsecToDash(transInfo.bankAccNumber) : transInfo.bankAccNumber }}
                            </p>
                        </button>
                    </li>
                    <li>
                        <!-- 출금계좌 변경팝업 노출 -->
                        <button type="button"
                            @click="returnVal(false)">
                            <h2>출금계좌 재선택하기</h2>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, reactive, onMounted } from 'vue'
const $axios = inject('$axios')
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const emit = defineEmits(['runEmits'])
const myAccList = '/json/banking/myAccList.json'

const transInfo = reactive({
    bankCode: '',
    bankAccNumber: '',
    bankAccName: '',
    retainedAmount: '',
    isPassed: '',
    bankAccTypeCode: '',
    availableCode: '',
    isDesignated: ''
})

const returnVal = (vals) => {
    if(typeof (vals) !== 'boolean') {
        emit('runEmits', transInfo)
    } else {
        emit('runEmits', vals)
    }
    $modalEnd('modalArea')
}

const getBaseAcc = () => {
    $axios.get(myAccList, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 기능없는 json내 첫번쨰 값으로 추출 - 실제 결과값도 한개만 출력
                const baseAcc = res.data.accList[0]
                transInfo.bankCode = baseAcc.bankCode
                transInfo.bankAccNumber = baseAcc.bankAccNumber
                transInfo.bankAccName = baseAcc.bankAccName
                transInfo.retainedAmount = baseAcc.retainedAmount
                transInfo.isPassed = baseAcc.isPassed
                transInfo.bankAccTypeCode = baseAcc.bankAccTypeCode
                transInfo.availableCode = baseAcc.availableCode
                transInfo.isDesignated = baseAcc.isDesignated
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
getBaseAcc()

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    div[role="dialog"] > div.bottomSheet {
         padding-bottom: 0;
        & .contentsArea > p {
            margin: 24px 0 0;
        }
    }
</style>