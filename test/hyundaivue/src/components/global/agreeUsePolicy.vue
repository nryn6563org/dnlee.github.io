<template>
    <div id="agreePlicyModal" role="dialog">
        <div class="bottomSheet">
            <h1>
                <label for="agreeAllModal">
                    <input type="checkbox" id="agreeAllModal"
                        @change="checkAll($event, 'agreeModalArea')">
                    <div>약관 전체 동의</div>
                </label>
            </h1>
            <div class="contentArea agreePage">
                <ul id="agreeModalArea">
                    <li class="hasLink">
                        <label for="agreePolicyModal01">
                            <input type="checkbox" id="agreePolicyModal01" data-mustReg="true"
                                @change="isAll('agreeModalArea')">
                            <div>[필수] 개인정보 수집 및 이용 동의</div>
                        </label>
                    </li>
                    <li class="hasLink">
                        <label>
                            <input type="checkbox" id="agreePolicyModal02" data-mustReg="true"
                                @change="isAll('agreeModalArea')">
                            <div>[필수] 고유식별정보 처리 동의</div>
                        </label>
                    </li>
                    <li class="hasLink">
                        <label>
                            <input type="checkbox" id="agreePolicyModal03" data-mustReg="true"
                                @change="isAll('agreeModalArea')">
                            <div>[필수] 통신사 이용약관 동의</div>
                        </label>
                    </li>
                    <li class="hasLink">
                        <label>
                            <input type="checkbox" id="agreePolicyModal03" data-mustReg="true"
                                @change="isAll('agreeModalArea')">
                            <div>[필수] 서비스 이용약관</div>
                        </label>
                    </li>
                </ul>
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="closeModal()"
                    :disabled="!pageInfo.isCheckedAll">
                    다음
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, reactive, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const emit = defineEmits(['runEmits'])

const pageInfo = reactive({
    isCheckedAll: false
})

// 인풋 변경 감지
const isAll = (target) => {
    let validateCount = 0
    let checkedCount = 0
    const targetArea = document.getElementById(target)
    const checkEl = targetArea.getElementsByTagName('input')
    for(let i = 0; i < checkEl.length; i++) {
        if(checkEl[i].getAttribute('data-mustReg') === 'true') {
            if(checkEl[i].getAttribute('type') === 'checkbox' && !checkEl[i].checked) {
                validateCount++
                checkedCount++
            } else if (checkEl[i].getAttribute('type') !== 'checkbox' && checkEl[i].value === '') {
                validateCount++
            }
        }
    }
    if (checkedCount === 0) {
        document.getElementById('agreeAllModal').checked = true
    } else {
        document.getElementById('agreeAllModal').checked = false
    }
    if (validateCount === 0) {
        pageInfo.isCheckedAll = true
    } else {
        pageInfo.isCheckedAll = false
    }
}

// 전체 선택 버튼 체크 변경
const checkAll = (ev, target) => {
    const checked = ev.target.checked
    const targetArea = document.getElementById(target)
    const checkEl = targetArea.getElementsByTagName('input')
    for(let i = 0; i < checkEl.length; i++) {
        if(checkEl[i].getAttribute('type') === 'checkbox') {
            checkEl[i].checked = checked
        }
    }
    // 전체 체크 되었는지 확인
    isAll(target)
}

const closeModal = () => {
    $modalEnd('agreePlicyModal')
    emit('runEmits', true)
}

onMounted(() => {
    $modalStart('agreePlicyModal')
})
</script>

<style lang="postcss" scoped>
#agreePlicy {
    h2 { border-bottom: 1px solid rgba(215,215,215,1); }
}
</style>