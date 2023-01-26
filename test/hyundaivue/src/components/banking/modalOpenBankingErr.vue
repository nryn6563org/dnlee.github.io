<!--접근권한 설정-->
<template>
    <div id="modalArea" role="dialog">
        <div>
            <div class="contentsArea">
                <h1>고객님 죄송합니다.</h1>
                <p>에러가 발생되었습니다.<br>잠시 후 다시 시도해주세요.</p>
                <dl>
                    <dt>응답코드({{ props.options.resultCode }})</dt>
                    <dd>
                        {{ $codeToOBTrans(props.options.resultCode).text }}
                        <template v-if="$codeToOBTrans(props.options.resultCode).moreMsg">
                            <br>
                            {{ props.options.resultMoreMsg }}
                        </template>
                    </dd>
                </dl>
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="closeModal()">확인</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $codeToOBTrans = inject('$codeToOBTrans')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])

const closeModal = () => {
    $modalEnd('modalArea')
    emit('runEmits', true)
}
// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
h1 {
    margin: 0; padding: 70px 0 14px;
    background: url('@/assets/images/global/icon_result_uncheck.png') no-repeat top center / 46px;
    font-size: 1.714rem; text-align: center; line-height: 1;
}
p {
    margin: 0 0 22px; padding: 0 0 22px;
    border-bottom: 1px solid var(--listBorder);
    font-size: 1.143rem; text-align: center;
}
dl {
    padding: 0; margin: 0;
    & dt {
        margin-bottom: 8px;
        font-size: 1.143rem; color: var(--red); font-weight: 700;
    }
    & dd {
        margin: 0;
        color: var(--tableTitleFont);
    }
}
</style>