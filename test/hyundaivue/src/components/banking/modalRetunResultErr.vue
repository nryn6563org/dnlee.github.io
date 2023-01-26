<template>
    <div id="modalRetrunResult" role="dialog">
        <div>
            <div>
                <template v-if="props.options.resultCode === '01'">
                    <p>오픈뱅킹 자금반환청구는 1년이내 거래내역에 대해서만 반환신청하실 수 있습니다.</p>
                </template>
                <template v-if="props.options.resultCode === '02'">
                    <p>
                        해당 건은 자금 반환 거절된 건입니다.<br>
                        <strong>거절일자</strong> : <span>{{ props.options.processDate }}</span><br>
                        자금반환을 재신청 하시겠습니까?
                    </p>
                </template>
                <template v-if="props.options.resultCode === '03'">
                    <p>
                        해당 건은 자금 반환 거절된 건입니다.<br>
                        <strong>거절일자</strong> : <span>{{ props.options.processDate }}</span><br>
                    </p>
                    <span>거절된 건의 재신청은 30일 이후 가능합니다.</span>
                </template>
                <template v-if="props.options.resultCode === '04'">
                    <p>
                        해당 건은 자금 반환 진행중인 건입니다.<br>
                        <strong>신청일자</strong> : <span>{{ props.options.regDate }}</span><br>
                    </p>
                    <span>진행중인 건은 재신청 할 수 없습니다.</span>
                </template>
                <template v-if="props.options.resultCode === '05'">
                    <p>
                        해당 건은 자금 반환처리 완료된 건입니다.<br>
                        <strong>신청일자</strong> : <span>{{ props.options.regDate }}</span><br>
                        <strong>반환일자</strong> : <span>{{ props.options.processDate }}</span><br>
                    </p>
                    <span>반환된 내역은 출금계좌의 거래내역에서 확인할 수 있습니다.</span>
                </template>
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="runEmit(props.options.resultCode === '02')">
                    {{ props.options.resultCode === '02' ? '재신청 하기' : '확인' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

const runEmit = (val) => {
    $modalEnd('modalRetrunResult')
    emit('runEmits', val)
}

onMounted(() => {
    $modalStart('modalRetrunResult')
})
</script>

<style lang="postcss" scoped>
#modalRetrunResult > div {
    & > div {
        & > p {
            margin: 0; padding: 0;
            & > span, & > strong {
                line-height: 1.6;
            }
            & > span {
                background: rgba(63,84,195,.1);
                color: var(--pointBlue)
            }
        }
        & > span {
            display: block;
            padding-top: 8px;
            color: var(--fontLightgray); font-size: 1rem;
        }
    }
}
</style>