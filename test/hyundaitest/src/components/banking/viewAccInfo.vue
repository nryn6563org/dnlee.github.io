<template>
    <div id="accInfo" role="dialog">
        <div class="bottomSheet">
            <h1>
                계좌번호 확인
                <button type="button" class="modalClose"
                    @click="runEmit(false)"></button>
            </h1>
            <div class="contentArea">
                <p>선택한 계좌로 계좌이체를 실행하시겠어요?</p>
                <hr />
                <div>
                    <img :src="'/images/logos/' + props.options.bankCode + '.png'"
                        :alt="$codeToBank(props.options.bankCode).korName + ' 로고'" />
                    <h1>{{ props.options.ownerName }}</h1>
                    <p>
                        {{ $codeToBank(props.options.bankCode).korName }}
                        {{ props.options.bankCode === '263' ? $hmsecToDash(props.options.bankAccNumber) :
                            props.options.bankAccNumber  }}
                    </p>
                </div>
                <div class="blueNote" v-if="props.options.saveType === 'quick'">
                    <span>이체금액</span>
                    <strong>{{ $priceToCommas(props.options.sendPrice) }}원</strong>
                </div>
            </div>
            <div class="buttonArea div3_7">
                <button class="white h50"
                    @click="copyClipbaord()">계좌복사</button>
                <button class="pointBlue h50"
                    @click="doTransfer()">예, 이체해요</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])


// emit 정리
const runEmit = (val) => {
    $modalEnd('accInfo')
    emit('runEmits', val)
}

// 계좌번호 복사
const copyClipbaord = () => {
    const t = document.createElement('textarea')
    document.body.appendChild(t)
    t.value = props.options.bankAccNumber
    t.select()
    document.execCommand('copy')
    document.body.removeChild(t)
}
// 계좌이체 직접 입력
const doTransfer = () => {
    // 현재 확인계좌 정보와 함께 계좌이체로 이동
    $router.push({ name: 'accountTransferMain' })
}
onMounted(() => {
    $modalStart('accInfo')
})

</script>

<style lang="postcss" scoped>
    div.bottomSheet {
        position: absolute;
        width: 100%;
        z-index: 900;
        & > div:not(.buttonArea) {
            position: relative; display: block; float: left;
            width: 100%;
            padding: 10px 0 12px;
            text-decoration: none;
            & > p {
                padding: 0; margin: 0;
            }
            & > hr {
                margin: 20px 0; padding: 0; border: none; border-top: 1px solid rgba(215, 215, 215, 1)
            }
            & > div {
                position: relative;
                padding: 0;
                & img {
                    position: absolute;
                    top: 6px; width: 36px;
                }
                & h1, & p {
                    margin: 0; padding: 0 0 0 52px;
                }
                & h1 {
                    margin-bottom: 2px;
                    font-size: 1.143rem; color: var(--black); font-weight: 500;
                }
                & p {
                    font-size: 1rem; color: var(--fontLightgray)
                }
            }
            & > div.blueNote {
                display: flex;
                margin-top: 20px; padding: 24px 20px; border-radius: 8px;
                justify-content: space-between;
            }
        }
        & > label {
            width: 100%;
            margin-bottom: 15px;
            & > input { width: 100%; margin-bottom: 5px; }
            & > p {
                width: calc(100vw - 40px);
                display: block;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 0; margin: 0;
                text-align: right; line-height: 1.5; font-size: 1rem;
            }
        }
    }
</style>