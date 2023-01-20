<template>
<div>
    <!-- 다계좌이체 금액입력 -->
    <section id="multiTrEnter">
        <!-- 토탈 이체등록 계좌건수 -->
        <div class="TransTotalArea">
            <h1>총<strong>{{ transInfo.sendAccInfo.length }}</strong>건</h1>
            <div>
                <strong>
                    {{ $priceToCommas(transInfo.totalSendPrice) }}원
                </strong>
                <span>
                    출금가능금액
                    {{ $priceToCommas(transInfo.possibleAmount + transInfo.loanLimit) }}원
                </span>
                <span>
                    잔여한도 {{ $priceToCommas(transInfo.remainingLimit) }}원
                    <button type="button" @click="runComp(modalTransLimitInqu)">가이드</button>
                </span>
            </div>
        </div>
        <!-- 계좌별 금액입력 -->
        <article>
            <!-- <div data-formName="multiTrEnter"> -->
                <!-- 동일금액 체크 -->
            <div class="listSort">
                <label for="allSame">
                    <input type="checkbox" id="allSame"
                        :disabled="transInfo.sendAccInfo.length <= 1"
                        :checked="transInfo.isAllSamePrice"
                        @change="changeAllSame($event)" />
                    <div>동일 금액 입력하기</div>
                </label>
            </div>
            <!-- 계좌리스트 -->
            <ul class="accList block delete">
                <!-- 금액입력 -->
                <li v-for="(accList,index) in transInfo.sendAccInfo" :key="index">
                    <!-- 계좌정보 -->
                    <button class="del" @click="deleteList(accList)">삭제</button>
                    <h4 class="gray">받는 분</h4>
                    <a href="javascript:;">
                        <img :src="'/images/logos/' + accList.bankCode + '.png'"
                            :alt="$codeToBank(accList.bankCode).korName + ' 로고'" />
                        <h2>{{ accList.ownerName }}</h2>
                        <p>
                            {{ $codeToBank(accList.bankCode).korName }}
                            {{ accList.bankCode === '263' ? $hmsecToDash(accList.bankAccNumber) : accList.bankAccNumber }}
                        </p>
                    </a>
                    <!-- 금액입력 -->
                    <h4 class="gray">보낼금액</h4>
                    <label class="price" :for="'regPrice' + index">
                        <input type="text" :id="'regPrice' + index" class="h50"
                            placeholder="금액입력" inputmode="none" readonly
                            @focus="runComp(regPriceInput, accList)"
                            :value="$priceToCommas(accList.sendPrice)">
                        <p v-if="!accList.isChecked && accList.isFailMesage !== ''">
                            {{ accList.isFailMesage }}
                        </p>
                    </label>
                    <!-- 추가정보입력 -->
                    <a href="javascript:;" class="regName gray"
                        @click="runComp(regName, index+'/reciver')">추가정보 입력</a>
                </li>
            </ul>
            <!-- 이체정보관련 버튼 / .noList 일경우 미노출-->
            <div class="circleStBtnArea right">
                <button class="icoPlus right"
                    @click="runComp(selectTransMultiAccList)"><span>계좌 추가</span></button>
            </div>
        </article>
    </section>
    <!-- 하단 버튼 -->
    <div class="buttonArea">
        <button class="h50 pointBlue"
            :disabled="transInfo.sendAccInfo.filter(arr => arr.isChecked === false).length > 0"
            @click="checkList()">다음</button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>

<script setup>
import { inject, reactive, markRaw, onBeforeMount } from 'vue'
// import regPrice from '@/components/banking/regPrice.vue'
import regPriceInput from '@/components/banking/regPriceInput.vue'
import modalTransLimitInqu from '@/components/banking/modalTransLimitInqu.vue' // 상단 info 버튼 -> 해당계좌 이체한도 조회
import regName from '@/components/banking/regName.vue' // 실명입력
import regAccNumber from '@/components/banking/regAccNumber.vue' // 직접 출금계좌 정보 입력
import selectTransMultiAccList from '@/components/banking/selectTransMultiAccList.vue' // 출금계좌 선택

const $axios = inject('$axios')
const $toastMsg = inject('$toastMsg')
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const myAccInfoAPI = '/json/banking/myAccInfo.json'
const emit = defineEmits(['runEmits'])
const props = defineProps(['transInfo'])

const transInfo = reactive({
    isAllSamePrice: false,
    loanLimit: 0, // 대출가능계좌 대출가능 금액
    possibleAmount: '', // 출금가능금액
    remainingLimit: '', // 잔여한도
    totalSendPrice: 0, // 화면용 - 총 출금금액
    sendAccInfo: new Array(0) // 출금계좌 목록
})
// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
// 컴포넌트 애니메이션을 위해 nowRun === true가 아니면 600의 셋타임을 갖는다
const closeComponent = (nowRun) => {
    if(!nowRun) {
        setTimeout(() => {
            componentsInfo.compName = null
            componentsInfo.compOption = null
        }, 600)
    } else {
        componentsInfo.compName = null
        componentsInfo.compOption = null
    }
}
// 컴포넌트 실행 전체
const runComp = (comps, directInput) => {
    // markRaw뒤에 컴포넌트 명 입력
    // 현재 실행중인 컴포넌트 중복 방지
    if(componentsInfo.compName !== null || componentsInfo.compOption !== null) {
        closeComponent(true)
    }
    if(comps === selectTransMultiAccList) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = transInfo.sendAccInfo
    } else if(comps === modalTransLimitInqu) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = {
            bankAccNumber: props.transInfo.bankAccNumber,
            isDesignated: props.transInfo.isDesignated,
            bankAccTypeCode: props.transInfo.bankAccTypeCode
        }
    } else if(comps === regPriceInput) {
        // 전액 산정 - 이체 한도를 기준
        // 이체한도보다 대출한도 + 출금가능금액이 작을 시 이를 기준한다.
        let maxPrice = transInfo.remainingLimit
        if(transInfo.loanLimit + transInfo.possibleAmount < maxPrice) {
            maxPrice = transInfo.loanLimit + transInfo.possibleAmount
        }
        if(transInfo.isAllSamePrice) {
            maxPrice = Math.floor(Number(maxPrice / transInfo.sendAccInfo.length))
        }
        // 전송데이터 세팅
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = {
            bankCode: directInput.bankCode,
            bankAccNumber: directInput.bankAccNumber,
            sendPrice: directInput.sendPrice,
            maxPrice: maxPrice
        }
    } else if(comps === regName) {
        componentsInfo.compName = markRaw(comps)
        const checkType = directInput.split('/')
        componentsInfo.compOption = { type: checkType[1], index: checkType[0] }
    } else {
        componentsInfo.compName = markRaw(comps)
    }
}

const changeAllSame = (ev) => {
    transInfo.isAllSamePrice = ev.target.checked
}

// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === selectTransMultiAccList) {
        closeComponent()
        if(typeof (returnVals) === 'boolean') {
            console.log('종료 혹은 직접입력 실행')
        } else {
            const saveData = transInfo.sendAccInfo
            if (saveData.length === 0) {
                transInfo.sendAccInfo = returnVals
            } else {
                // 중복계좌 체크 후 추가하기
                for(const i in returnVals) {
                    if(saveData.filter(arr => arr.bankCode === returnVals[i].bankCode && arr.bankAccNumber === returnVals[i].bankAccNumber).length === 0) {
                        returnVals[i].isChecked = false
                        returnVals[i].isFailMesage = ''
                        transInfo.sendAccInfo.push(returnVals[i])
                    }
                }
                // 선택 삭제된 계좌 체크 후
                for(const i in saveData) {
                    if(returnVals.filter(arr => arr.bankCode === returnVals[i].bankCode && arr.bankAccNumber === returnVals[i].bankAccNumber).length === 0) {
                        transInfo.sendAccInfo.splice(i, 1)
                    }
                }
            }
        }
    } else if(comps === regPriceInput) {
        if(typeof (returnVals) !== 'boolean') {
            // 숫자 채워넣기
            const replaceTarget = transInfo.sendAccInfo.filter(arr => arr.bankCode === returnVals.bankCode && arr.bankAccNumber === returnVals.bankAccNumber)
            if(!transInfo.isAllSamePrice) {
                replaceTarget[0].sendPrice = returnVals.returnNumber
            } else {
                for(const i in transInfo.sendAccInfo) {
                    transInfo.sendAccInfo[i].sendPrice = returnVals.returnNumber
                }
            }
            const etcAccList = transInfo.sendAccInfo.filter(arr => arr.bankCode !== returnVals.bankCode && arr.bankAccNumber !== returnVals.bankAccNumber)
            // 오류계산
            let beforeTotalPrice = 0
            for(const i in etcAccList) {
                beforeTotalPrice += etcAccList[i].sendPrice
            }
            const isFailMesage = [
                '',
                '출금가능금액을 초과 하셨어요.', // 한도초과
                '1일 이체한도를 초과 하셨어요.', // 이체한도 초과
                '이체 금액을 입력해 주세요.' // 금액 미입력
            ]
            let returnCode = 0
            // 오류 처리 - 출금가능 금액 검사 > 1일 이체한도 초과 > 금액 미입력
            if ((beforeTotalPrice + replaceTarget[0].sendPrice) > (transInfo.loanLimit + transInfo.possibleAmount)) {
                returnCode = 1
            } else if (beforeTotalPrice + replaceTarget[0].sendPrice > transInfo.remainingLimit) {
                returnCode = 2
            } else if (replaceTarget[0].sendPrice === '' || replaceTarget[0].sendPrice === 0) {
                returnCode = 3
            }
            replaceTarget[0].isChecked = (returnCode === 0)
            replaceTarget[0].isFailMesage = isFailMesage[returnCode]
            if(returnCode === 0) {
                // 동일금액 입력하기 시 전체 체크 변경
                if(transInfo.isAllSamePrice) {
                    for(const i in transInfo.sendAccInfo) {
                        transInfo.sendAccInfo[i].isChecked = true
                    }
                }
            } else if (returnCode !== 0) {
                // 동일금액 입력하기 시 전체 체크 변경
                if(transInfo.isAllSamePrice) {
                    for(const i in transInfo.sendAccInfo) {
                        transInfo.sendAccInfo[i].isChecked = false
                    }
                }
            }
            totalPriceAdd()
            closeComponent()
        } else {
            totalPriceAdd()
            closeComponent()
        }
    } else if(comps === regName) {
        if(returnVals !== false) {
            const targetIndex = componentsInfo.compOption.index
            if(returnVals.type === 'reciver') {
                transInfo.sendAccInfo[targetIndex].reciverText = returnVals.returnName
                closeComponent(true)
                setTimeout(() => {
                    runComp(regName, targetIndex + '/sender')
                })
            } else {
                transInfo.sendAccInfo[targetIndex].senderText = returnVals.returnName
                closeComponent()
            }
        } else {
            closeComponent()
        }
    } else {
        closeComponent()
    }
}

// 선택계좌 삭제
const deleteList = (target) => {
    transInfo.sendAccInfo.splice(transInfo.sendAccInfo.indexOf(target), 1)
    closeComponent(true)
    $toastMsg({ msg: '계좌가 삭제되었습니다.' })
}

// 이체 총액 체크
const totalPriceAdd = () => {
    let totalPrice = 0
    for(const i in transInfo.sendAccInfo) {
        totalPrice += Number(transInfo.sendAccInfo[i].sendPrice)
    }
    transInfo.totalSendPrice = totalPrice
}

// 이체한도 조회
const checkMyAcc = () => {
    $axios.get(myAccInfoAPI, { accNumber: transInfo.bankAccNumber })
        .then(function(res) {
            if(res.data.affective === 200) {
                transInfo.isLoanAcc = res.data.accInfo.isLoanAcc
                transInfo.loanLimit = res.data.accInfo.loanLimit
                transInfo.possibleAmount = res.data.accInfo.possibleAmount
                transInfo.remainingLimit = res.data.accInfo.remainingLimit
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}

// 데이터 가공 선 실행
const preDataSet = () => {
    const accRemake = new Array(0)
    for(const i in props.transInfo.sendAccInfo) {
        let isChecked = false
        const selectObj = props.transInfo.sendAccInfo[i]
        if(selectObj.sendPrice !== '' && selectObj.sendPrice !== null) isChecked = true
        selectObj.isChecked = isChecked
        selectObj.isFailMesage = ''
        accRemake.push(selectObj)
    }
    transInfo.sendAccInfo = accRemake
}
// 최초 입력정보 없을 시 이체 초기페이지로 이동
if(props.transInfo.bankCode === '' && props.transInfo.bankAccNumber === '') {
    emit('runEmits', false)
} else {
    preDataSet()
    checkMyAcc()
    totalPriceAdd()
}

// 입력완료 다음 버튼
const checkList = () => {
    emit('runEmits', transInfo.sendAccInfo)
}
</script>

<style lang="postcss" scoped>
#multiTrEnter { padding-bottom: 76px; }
.TransTotalArea{
    border-top: 1px solid rgba(215, 215, 215, 1); border-bottom: 1px solid rgba(215, 215, 215, 1);
    & div { text-align: right; }
}
.listSort { border: none; }

/* 은행리스트 */
.accList {
    & li {
        & > a + h4 { margin-top: 20px; }
        & label.price { display: block !important; }
        & a.regName { float: right; margin-top: 12px; padding: 0 !important; }
    }
}
.circleStBtnArea { padding: 18px 20px; }
</style>