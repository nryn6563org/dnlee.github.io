<template>
    <div id="regAccPassword" role="dialog">
        <div class="bottomSheet">
            <a v-if="typeof props.options.notSave === 'undefined' || !props.options.notSave"
                href="javascript:;" type="button" class="resetPassword">
                비밀번호 재설정
            </a>
            <div class="passwordCheck">
                <h2>계좌 비밀번호 입력</h2>
                <!-- 옴션 내 notSave: true일 시 미노출, 닫기버튼으로 대체 -->
                <label v-if="typeof props.options.notSave === 'undefined' || !props.options.notSave">
                    <span for="savePassword">비밀번호 저장</span>
                    <input type="checkbox"
                        name="savePassword" id="savePassword"
                        @change="changeSaved($event)">
                    <div class="switch"></div>
                </label>
                <button type="button" class="modalClose"
                     v-if="typeof props.options.notSave !== 'undefined' && props.options.notSave"
                    @click="modalClose()"></button>
                <h3>
                    {{ $codeToBank(props.options.bankCode).korName }}
                    {{ props.options.bankCode === '263' ? $hmsecToDash(props.options.bankAccNumber) : props.options.bankAccNumber }}
                </h3>
                <ul id="checkLength">
                    <li v-for="(pwdLength, index) in passwordLength" :key="index"></li>
                </ul>
                <p v-if="passwordData.isPassed === false" class="fontRed">
                    비밀번호가 일치하지 않습니다.({{ passwordData.rejectCount }}/5)
                </p>
            </div>
            <!-- 보안키패드 영역 -->
            <div class="securityPad">
                <!-- 임시 테스트용 인풋 | 히든 인풋으로 연동가능-->
                <input type="text"
                    :maxlength="passwordLength"
                    v-model="passwordData.regPassword" />
            </div>
            <!-- // 보안키패드 영역 -->
            <div class="buttonArea div3_7">
                <button type="button" class="white h50 delete" title="삭제"
                    @click="delPassword">&nbsp;</button>
                <button type="button" class="pointBlue h50"
                    @click="runPasswordCheck">입력완료</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted, watch } from 'vue'
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const emit = defineEmits(['runEmits'])
const props = defineProps(['options'])
const passwordCheckAPI = '/json/banking/passwordCheck.json'
const passwordLength = 8

// 화면 필요 변수
const passwordData = reactive({
    regPassword: '',
    isPassed: null,
    rejectCount: 0,
    isPasswordSave: false
})

// 패스워드저장
const changeSaved = (ev) => {
    passwordData.isPasswordSave = ev.target.checked
}
// 비밀번호 변경시 상단 length체크
watch(() => passwordData.regPassword, (next, prev) => {
    if(prev !== next) {
        const regTextLength = next.toString().length
        for(let i = 0; i < passwordLength; i++) {
            document.getElementById('checkLength').children[i].classList.remove('on')
            if(i < regTextLength) {
                document.getElementById('checkLength').children[i].classList.add('on')
            }
        }
    }
})

// 비밀번호 한자리 지우기
const delPassword = () => {
    const nowLength = passwordData.regPassword.length
    passwordData.regPassword = passwordData.regPassword.substring(0, nowLength - 1)
}

// 비밀번호 검토
const runPasswordCheck = () => {
    // 현재 계좌정보 기준
    // props.optios.bankCode : 은행코드
    // props.optios.bankCode : 계좌번호
    // passwordData.regPassword : 화면상 패스워드
    $axios.get(passwordCheckAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 성공시나리오
                const returnData = {
                    bankCode: props.options.bankCode,
                    bankAccNumber: props.options.bankAccNumber,
                    isPassed: true,
                    isPasswordSave: passwordData.isPasswordSave
                }
                emit('runEmits', returnData)
                $modalEnd('regAccPassword')
            } else {
                // 실패시나리오
                passwordData.isPassed = false
                passwordData.rejectCount = res.data.rejectInfo.rejectCount
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
// 모달 닫기
const modalClose = () => {
    emit('runEmits', false)
    $modalEnd('regAccPassword')
}
// 최초 실행 후 처리
onMounted(() => {
    $modalStart('regAccPassword', modalClose)
})

</script>

<style lang="postcss" scoped>
    #regAccPassword {
        & > div.bottomSheet {
            overflow: visible !important;
            padding: 0;
            & a.resetPassword {
                position: absolute;
                top: -34px; right: 20px;
                padding-left: 20px;
                background: url('@/assets/images/global/icon_lock_white.png') no-repeat left center / 11px;
                font-size: 1rem; color: rgba(255,255,255,1); text-decoration: none;
            }
            & div.passwordCheck {
                overflow: hidden; position: relative;
                height: 200px;
                padding: 24px 20px; border-radius: 20px 20px 0 0;
                background-color: var(--blackBlue);
                box-sizing: border-box;
                text-align: center;
                /* 제목열 */
                & h2 {
                    padding: 0; margin: 0;
                    text-align: left; font-size: 1.2863rem; line-height: 1;
                }
                /* 비밀번호 저장 */
                & label {
                    position: absolute;
                    top: 22px; right: 20px;
                    line-height: 24px; font-size: 1rem;
                    & > span {
                        margin-top: 0;
                        padding-right: 8px;
                        vertical-align: top;
                        opacity: .7;
                    }
                }
                /* 계좌정보 */
                & h3 {
                    margin: 28px 0 24px; padding: 0;
                    font-size: 1rem; font-weight: 400;
                    opacity: .7;
                }
                /* 비밀번호 입력표시 */
                & ul {
                    display: block;
                    height: 20px;
                    margin: 0; padding: 0;
                    text-align: center; list-style: none;
                    & li {
                        display: inline-block;
                        width: 20px; height: 20px;
                        border-radius: 50%;
                        background-color: var(--black);
                        opacity: .1;
                        & + li {
                            margin-left: 12px;
                        }
                        &.on {
                            background-color: var(--pointBlue);
                            opacity: 1;
                        }
                    }
                }
                & p {
                    margin: 20px 0 0; padding: 0;
                    font-size: 1rem;
                    opacity: .85;
                }
            }
            & div.securityPad {
                height: 290px;
            }
            & div.buttonArea {
                margin-left: 0;
                & button.white {
                    width: calc(30% - 6px)
                }
                & button.pointBlue {
                    width: calc(70% - 6px)
                }
            }
        }
    }
    button.modalClose {
        overflow: hidden; position: absolute; display: block; overflow: hidden;
        top: 22px; right: 20px; width: 24px; height: 24px;
        margin: 0; padding: 0; border: none;
        background: url('@/assets/images/global/button_modal_close.png') no-repeat center / 24px;
        line-height: 80px;
    }

</style>
