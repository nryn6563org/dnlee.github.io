<template>
    <div id="transChoice" role="dialog">
        <div class="bottomSheet">
            <div>
                <h4 class="gray">검색 기간</h4>
                <div>
                    <button type="button" @click="addMonth(0)">금일</button>
                    <button type="button" @click="addDay(7)">1주</button>
                    <button type="button" @click="addMonth(1)">1개월</button>
                    <button type="button" @click="addMonth(3)">3개월</button>
                    <!-- <button type="button" @click="addMonth(6)">6개월</button>
                    <button type="button" @click="addMonth(12)">1년</button> -->
                </div>
                <h4 class="gray">기간 직접설정</h4>
                <div class="cal range">
                    <label for="fromDate">
                        <input id="fromDate" type="text" class="h50" readonly
                            :value="$dateToCommas(sortBy.fromDate)"
                            @click="runComp(regDate, 'fromDate')">
                        <button @click="runComp(datePicker, 'fromDate')"></button>
                    </label>
                    <span>~</span>
                    <label for="toDate">
                        <input id="toDate" type="text" class="h50" readonly
                            :value="$dateToCommas(sortBy.toDate)"
                            @click="runComp(regDate, 'toDate')">
                        <button @click="runComp(datePicker, 'toDate')"></button>
                    </label>
                </div>
                <h4 class="gray">구분</h4>
                <div>
                    <label for="transType01">
                        <input type="radio" name="division"
                            id="transType01" value=""
                            v-model="sortBy.division">
                        <div class="check">전체</div>
                    </label>
                    <label id="transType02">
                        <input type="radio" name="division"
                            id="transType02" value="deposit"
                            v-model="sortBy.division">
                        <div class="check">입금</div>
                    </label>
                    <label for="chooseRange03">
                        <input type="radio" name="division"
                            id="chooseRange03" value="withdrawal"
                            v-model="sortBy.division">
                        <div class="check">출금</div>
                    </label>
                </div>
                <h4 class="gray">정렬</h4>
                <div>
                    <label for="orderBy01">
                        <input type="radio" name="orderBy"
                            id="orderBy01" value="desc"
                            v-model="sortBy.orderBy">
                        <div class="check">최신순</div>
                    </label>
                    <label id="orderBy02">
                        <input type="radio" name="orderBy"
                            id="orderBy02" value="asc"
                            v-model="sortBy.orderBy">
                        <div class="check">과거순</div>
                    </label>
                </div>
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="runEmit(true)">
                    확인
                </button>
            </div>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>

<script setup>
import { reactive, inject, onMounted, markRaw } from 'vue'
import datePicker from '@/components/global/datePicker.vue'
import regDate from '@/components/global/regDate.vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $dateToCommas = inject('$dateToCommas')
// const $hmsecToDash = inject('$hmsecToDash')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const sortBy = reactive({
    fromDate: props.options.fromDate,
    toDate: props.options.toDate,
    fixDate: props.options.fixDate,
    division: '',
    orderBy: 'desc'
})

const addMonth = (addMonth) => {
    if(addMonth !== 0) {
        if(sortBy.fixDate === 'fromDate') {
            let remakeMonth = new Date(JSON.parse(JSON.stringify(sortBy.fromDate)))
            remakeMonth = remakeMonth.setMonth(remakeMonth.getMonth() + addMonth)
            sortBy.toDate = new Date(remakeMonth)
        } else {
            let remakeMonth = new Date(JSON.parse(JSON.stringify(sortBy.toDate)))
            remakeMonth = remakeMonth.setMonth(remakeMonth.getMonth() - addMonth)
            sortBy.fromDate = new Date(remakeMonth)
        }
    } else {
        sortBy.toDate = new Date()
        sortBy.fromDate = new Date()
    }
}

// 날짜 계산 - 일단위
const addDay = (addDay) => {
    if(addMonth !== 0) {
        if(sortBy.fixDate === 'fromDate') {
            let remakeMonth = new Date(JSON.parse(JSON.stringify(sortBy.fromDate)))
            remakeMonth = remakeMonth.setDate(remakeMonth.getDate() + addDay)
            sortBy.toDate = new Date(remakeMonth)
        } else {
            let remakeMonth = new Date(JSON.parse(JSON.stringify(sortBy.toDate)))
            remakeMonth = remakeMonth.setDate(remakeMonth.getDate() - addDay)
            sortBy.fromDate = new Date(remakeMonth)
        }
    } else {
        sortBy.toDate = new Date()
        sortBy.fromDate = new Date()
    }
}

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
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
    componentsInfo.compName = markRaw(comps)
    const options = []
    if(directInput === 'toDate') {
        options.checkedDate = sortBy.toDate
        options.target = directInput
        options.minDate = sortBy.fromDate
    } else {
        options.checkedDate = sortBy.fromDate
        options.target = directInput
        options.maxDate = sortBy.toDate
    }
    componentsInfo.compOption = options
}
// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    console.log(returnVals)
    if(returnVals !== false) {
        const directInput = componentsInfo.compOption.target
        if(directInput === 'toDate') {
            sortBy.toDate = returnVals
        } else {
            sortBy.fromDate = returnVals
        }
        closeComponent()
    } else {
        closeComponent()
    }
}

const runEmit = (vals) => {
    $modalEnd('transChoice')
    if(vals !== false) {
        emit('runEmits', sortBy)
    } else {
        emit('runEmits', false)
    }
}

onMounted(() => {
    $modalStart('transChoice', runEmit)
})
</script>

<style lang="postcss" scoped>
#transChoice {
    & h4 + div {
        margin-bottom: 18px;
        &:not(.cal) {
            display: flex;
            & button, & label {
                padding: 0; flex-grow: 1;
                & + button, & + label { margin-left: 8px; }
            }
        }
    }
}
h4 { padding: 0; }
</style>
