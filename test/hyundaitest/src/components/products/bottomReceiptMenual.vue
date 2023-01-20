<template>
    <div id="bottomReceiptMenual" role="dialog">
        <div class="bottomSheet">
            <h1>
                숙려제도 안내
                <button type="button" class="modalClose"
                    @click="returnVal(false)">
                </button>
            </h1>
            <div class="contentsArea">
                투자설명서는 등록된 이메일로 발송해 드립니다.<br>이메일주소를 확인해 주세요.
                <span>변경된 투자설명서를 받아보시겠어요?</span>
                <div class="innerBtnBox">
                    <label for="radio01">
                        <input type="radio" id="radio01" :value="false" name="checkReceipt"
                            v-model="pageInfo.checkReceipt">
                        <div class="check">아니오</div>
                    </label>
                    <label for="radio02">
                        <input type="radio" id="radio02" :value="true" name="checkReceipt"
                            v-model="pageInfo.checkReceipt">
                        <div class="check">예, 이메일로 받을께요</div>
                    </label>
                </div>
                <label>
                    <input type="text" class="h50"
                        :disabled="!pageInfo.checkReceipt"
                        value="abcd@hmsec.com">
                </label>
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="returnVal(true)"
                    >확인</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted, reactive } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const emit = defineEmits('runEmits')
const returnVal = (vals) => {
    $modalEnd('bottomReceiptMenual')
    emit('runEmits', vals)
}

const pageInfo = reactive({
    checkReceipt: true
})

onMounted(() => {
    $modalStart('bottomReceiptMenual')
})
</script>

<stype lang="postcss">
.contentsArea {
    & > span {
        display: block;
        margin: 24px 0 6px;
        color: var(--fontLightgray); font-size: 1rem;
    }
    & > label {
        width: 100%;
        margin-top: 12px;
        & > input {
            width: 100%;
        }
    }
}
</stype>