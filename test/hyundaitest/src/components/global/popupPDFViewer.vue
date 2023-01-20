<template>
    <div id="PDFView" class="fullPopup on">
        <div class="header">
            <h1>{{ props.options[0] }}</h1>
            <button class="modalClose" @click="returnVal()"></button>
        </div>
        <div class="contentsArea">
            타이틀 {{ props.options[0] }} /
            호출파일 URL {{ props.options[1] }}
        </div>
        <div class="buttonArea">
            <button type="button" class="pointBlue h50"
                @click="returnVal()">확인</button>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const returnVal = () => {
    $modalEnd('PDFView')
    emit('runEmits', false)
}

onMounted(() => {
    $modalStart('PDFView')
})
</script>