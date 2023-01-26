<template>
    <RouterView
        id="fundSearch"
        :pageInfo="pageInfo.itemList"
        @runEmits="doJoin" />
</template>
<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps(['baseInfo'])
const $route = useRoute()
const $router = useRouter()
console.log($route.name, typeof $route.name)
const pageInfo = reactive({
    itemCode: new Array(0) // 검색 > 계약에서는 상품코드 목록을 기준으로 진행한다.
})

const doJoin = (returnVals) => {
    console.log(returnVals)
    if($route.name === 'searchIRPList') {
        pageInfo.itemCode.push(returnVals.itemCode)
        if(returnVals.isGuarantee) {
            $router.push({ name: 'searchIRPView' })
        } else {
            $router.push({ name: 'searchIRPViewGuarantee' })
        }
    }
}

</script>