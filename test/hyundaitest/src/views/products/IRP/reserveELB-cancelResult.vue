<template>
<div>
    <!-- IRP ELB 취소예약 완료 -->
    <section>
        <div class="titleInStep">
            <h1>
                예약신청 취소가<br>
                완료되었습니다.
            </h1>
        </div>
        <ul class="productList dropDown">
            <!-- 성공 .fontPointBlue/ 오류 .fontRed-->
            <li>
                <a href="javascript:;">
                    <h1>{{props.pageInfo.itemList.itemName}}</h1>
                    <p class="fontPointBlue" v-if="props.pageInfo.itemList.isComplete">예약신청 취소 완료</p>
                    <p class="fontRed" v-if="!props.pageInfo.itemList.isComplete">오류메시지 출력</p>
                </a>
            </li>
        </ul>
    </section>
    <div class="bottomBtnArea">
        <button typw="button" class="h50 pointBlue"
            @click="$router.push({ name: 'reserveELB', params: { type: 'status' } })">확인</button>
    </div>
</div>
</template>
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const props = defineProps(['pageInfo'])
</script>
<style lang="postcss" scoped>
.productList.dropDown {
    margin: 0 20px;
    border-top: 1px solid rgba(215, 215, 215, 1); border-bottom: 1px solid rgba(215, 215, 215, 1);
    & > li > a {
        padding-left: 0;
        &:after { display: none;}
    }
}
</style>