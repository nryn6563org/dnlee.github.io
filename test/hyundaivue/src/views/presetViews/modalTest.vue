<template>
    <button type="button"
        @click="runModal(presetModal)">모달 테스트</button>
    <button type="button"
        @click="runModal(presetBotSheet)">바텀시트 테스트</button>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="componentsInfo.emits" />
</template>

<script setup>
import { reactive, markRaw } from 'vue'
// import selectMyAccList from '@/components/banking/selectMyAccList.vue'
import presetModal from '@/views/presetViews/presetModal.vue'
import presetBotSheet from '@/views/presetViews/presetBotSheet.vue'
// const props = defineProps(['baseInfo'])

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null,
    emits: null
})

// 컴포넌트 초기화
const closeComponent = () => {
    componentsInfo.compName = null
    componentsInfo.compOption = null
    componentsInfo.emits = null
}

// 실행예시
// emits는 고정으로 사용해도 무관하다.
const runModal = (comps) => {
    // markRaw뒤에 컴포넌트 명 입력
    componentsInfo.compName = markRaw(comps)
    componentsInfo.emits = consoleValue
}
const consoleValue = (returnVals) => {
    console.log(returnVals)
    closeComponent()
}

// runModal(presetBotSheet)
</script>
