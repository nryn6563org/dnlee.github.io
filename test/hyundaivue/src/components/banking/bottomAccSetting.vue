<template>
    <div id="accManage" role="dialog">
        <div class="bottomSheet">
            <h1>
                {{
                    props.options.type === 'delete' ? '오픈뱅킹 계좌삭제' :
                    props.options.type === 'cancel' ?  '오픈뱅킹 출금동의 해지' : '오픈뱅킹 출금계좌 동의'
                }}

                <button type="button" class="modalClose"
                    @click="returnVal()"></button>
            </h1>
            <div class="contentArea">
                <h3>
                    {{
                        props.options.type === 'delete' ? '오픈뱅킹 등록 계좌를 삭제하시겠습니까?' :
                        props.options.type === 'cancel' ?  '해당계좌의 출금 기능을 해지 하시겠습니까? 해지시 조회만 가능합니다.' :
                        '계좌를 출금 동의하시겠습니까?'
                    }}
                </h3>
                <ul class="accList">
                    <li>
                        <a href="javascript:;">
                            <img :src="'/images/logos/' + props.options.bankCode + '.png'"
                                :alt="$codeToBank(props.options.bankCode).korName + ' 로고'" />
                            <h2>{{ $codeToBank(props.options.bankCode).korName }}</h2>
                            <p class="gray">{{ props.options.bankAccNumber }}</p>
                        </a>
                    </li>
                </ul>
                <ul class="agreeList" v-if="props.options.type === 'agree'">
                    <li class="hasLink">
                        <label>
                            <input type="checkbox"
                                :id="'agree01'"
                                :data-mustReg="true"
                                v-model="pageInfo.isChecked"
                                @change="runComp(popupAgree)">
                            <div>{{ $codeToBank(props.options.bankCode).korName }} 출금/조회 약관</div>
                        </label>
                    </li>
                </ul>
            </div>
            <div class="buttonArea div3_7">
                <button type="button" class="white h50"
                    @click="returnVal()">
                    취소
                </button>
                <button type="button" class="pointBlue h50"
                    :disabled="props.options.type === 'agree' && !pageInfo.isChecked"
                    @click="returnVal(true)">
                    {{
                        props.options.type === 'delete' ? '삭제' :
                        props.options.type === 'cancel' ?  '해지' : '동의'
                    }}하기
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
import popupAgree from '@/components/global/popupAgree.vue' // 동의 전체 보기
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $codeToBank = inject('$codeToBank')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const pageInfo = reactive({
    isChecked: false
})
// 실명 입력 완료 후 리턴
const returnVal = (val) => {
    $modalEnd('accManage')
    if(typeof val === 'undefined') {
        emit('runEmits', false)
    } else {
        emit('runEmits', val)
    }
}

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
// 컴포넌트 애니메이션을 위해 nowRun === true가 아니면 600의 셋타임을 갖는다
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
    if(comps === popupAgree) {
        componentsInfo.compOption = [{
            viewPage: props.options.bankCode,
            mustReg: true
        }]
    }
}

// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === popupAgree) {
            if(returnVals.length === 0) {
                pageInfo.isChecked = false
            } else {
                pageInfo.isChecked = true
            }
        }
        closeComponent()
    } else {
        closeComponent()
    }
}

onMounted(() => {
    $modalStart('accManage', returnVal)
})
</script>

<style lang="postcss" scoped>
#accManage {
    & .contentArea {
        & h3 {
            padding: 0 0 18px; margin: 0; border-bottom: 1px solid var(--listBorder);
            font-weight: 400; line-height: 1.5;
        }
        & .accList { padding: 0; margin: 0; }
        & .agreeList { margin: 0; padding: 18px 0 0; border-top: 1px solid var(--listBorder); }
    }
}
</style>