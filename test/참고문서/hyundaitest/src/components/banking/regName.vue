<template>
    <div id="regName" role="dialog">
        <div>
            <h1>
                {{
                    props.options.type === 'realName' ? '받는사람 실명 입력' :
                    props.options.type === 'reciver' ?  '받는 분에게 표시' :
                    props.options.type === 'group' ?  '그룹추가' :
                    props.options.type === 'groupModify' ?  '그룹명 수정' :
                    '내통장에 표시'
                }}

                <button type="button" class="modalClose"
                    @click="returnVal(false)"></button>
            </h1>
        <div class="contentArea">
                <label for="regNameInput">
                    <input type="text"
                        id="regNameInput"
                        class="h50 inButton"
                        v-model="inputData.returnName"
                        name="regNameInput"
                        @keyup="$checkButton($event)"
                        maxlength="10" />
                    <button type="button" class="resetInput" @click="$resetInput('regNameInput')">
                    </button>
                    <p>
                        {{
                            props.options.type === 'realName' ? '이름+성(실명)과 예금주 이름이 일치해야 합니다.' :
                            '10자 이내로 입력해 주세요.'
                        }}
                    </p>
                </label>
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="returnVal(true)">
                    입력완료
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $checkButton = inject('$checkButton')
const $resetInput = inject('$resetInput')
const inputData = reactive({
    returnName: ''
})
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
// 실명 입력 완료 후 리턴
const returnVal = (values) => {
    $modalEnd('regName')
    if(typeof (check) !== 'boolean') {
        emit('runEmits', {
            type: props.options.type,
            returnName: inputData.returnName
        })
    } else {
        emit('runEmits', false)
    }
}

onMounted(() => {
    $modalStart('regName')
})
</script>

<style lang="postcss" scoped>
    #regName {
        & input[type="text"], & label {
            width: 100%;
        }
        & p {
            margin:6px 0 0; padding: 0;
            font-size: 1rem; font-weight: 400; color: var(--fontLightgray);
            opacity: .6;
        }
    }
</style>