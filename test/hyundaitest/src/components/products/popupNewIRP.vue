<template>
    <div id="newIRPJoin" class="fullPopup">
        <div class="header">
            <h1>IRP 상품검색</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <!-- 펀드투자 유의사항 -->
        <component :is="pageInfo.runPage"
            :pageInfo="pageInfo.itemList"
            @runEmits="runPage" />
    </div>
</template>
<script setup>
import { reactive, inject, onMounted, markRaw } from 'vue'
import IRPlist from '@/views/products/IRP/searchIRP-list.vue'
import IRPview from '@/views/products/IRP/searchIRP-view.vue'
import IRPagree from '@/views/products/IRP/searchIRP-agree.vue'
import IRPresult from '@/views/products/IRP/searchIRP-result.vue'
// import searchIRP from '@/views/products/IRP/searchIRP.vue'

const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

const props = defineProps(['options'])
let runPageMark = null
if(props.options.runPage === 'newProduct') {
    runPageMark = markRaw(IRPlist)
}
const pageInfo = reactive({
    runPage: runPageMark,
    itemList: new Array(0)
})

// 최종 실행 시 return 함수
const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    const returnValue = vals || false
    emit('runEmits', returnValue)
    $modalEnd('newIRPJoin')
}

const runPage = (returnVals) => {
    console.log(returnVals)
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('newIRPJoin')
})
</script>
<style lang="postcss" scoped>
div.fullPopup {
    padding-top: 0; height: 100%;
}
</style>