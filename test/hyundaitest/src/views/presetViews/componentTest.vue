<template>
    <button type="button"
        draggable="false"
        id="toastButton"
        @touchstart="$toastMsg({
            msg: toastMsg,
            className: 'danger',
            delays: 1800
        })">
        토스트 테스트
    </button>
    <br>
    <button type="button"
        draggable="false"
        @touchstart="retunVal()">
        얼럿테스트
    </button>
    <br>
    <button type="button"
        draggable="false"
        @touchstart="$runAlert({
            title: alert.title,
            msg: alert.msg,
            isBottom: true
        })">
        얼럿테스트-바텀시트
    </button>
    <br>
    <button type="button"
        draggable="false"
        @touchstart="retunVal2()">
        컨펌테스트
    </button>
    <br>
    <button type="button"
        draggable="false"
        @touchstart="retunVal3()">
        컨펌테스트-바텀시트
    </button>
    {{ props.baseInfo.isAppUse }}
    <input type="text"
        inputmode="none"
        name="insertPrice"
        @focus="runMyAcc"
        placeholder="내계좌 선택시트">

    <input type="text"
        inputmode="none"
        name="insertPrice"
        @focus="runComp()"
        placeholder="금융기관선택 시트">

    <component
        :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp"
        />
    <div style="height: 820px; background-color: #ccc">12321</div>
</template>

<script setup>
import { inject, reactive, markRaw } from 'vue'
import datePicker from '@/components/global/datePicker.vue' // 데이트 피커

const $toastMsg = inject('$toastMsg')
const $runAlert = inject('$runAlert')
const $runConfirm = inject('$runConfirm')

// App체크를 위한 필수 입력
const props = defineProps(['baseInfo'])

// 토스트 테스트용
const toastMsg = '토스트메세지 테스트 데이터로<br>들어가는가? 정말인가?<br>아닌가?'

const alert = {
    title: '내 통장에 표시',
    msg: '입력하신 정보는 안전한 금융거래를<br>위한 확인절차가 필요합니다. <br>이체 불가하오니, 양해 바랍니다.'
}

const retunVal = () => {
    $runAlert({
        title: alert.title,
        msg: alert.msg,
        isAppUse: true
    })
}

const retunVal2 = async() => {
    $runConfirm({
        title: alert.title,
        msg: alert.msg,
        isAppUse: true
    }).then((result) => {
        console.log(result)
    })
}

const retunVal3 = () => {
    $runConfirm({
        title: alert.title,
        msg: alert.msg,
        isAppUse: true,
        isBottom: true
    }).then((result) => {
        console.log(result)
    })
}

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
const runComp = () => {
    componentsInfo.compName = markRaw(datePicker)
    componentsInfo.compOption = {
        dateInfo: new Date(),
        minDate: new Date(),
        maxDate: add5Month(new Date())
    }
}
const closeComp = (runVals) => {
    console.log(runVals)
    closeComponent()
}

const add5Month = (inputDate) => {
    const addedDate = inputDate.setMonth(inputDate.getMonth() + 16)
    return new Date(addedDate)
}
runComp()
</script>
