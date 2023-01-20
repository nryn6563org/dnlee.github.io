<!--우편물 반송 계좌 확인 -->
<template>
    <div id="modalArea" role="dialog">
        <div class="bottomSheet">
            <h1>
                우편물 반송 계좌 확인
                <button type="button" class="modalClose"
                    @click="doClose()">
                </button>
            </h1>
            <div class="contentsArea">
                <p>고객님 주소로 발송된 우편물이 반송되어 입출금이 제한될 수 있습니다. 수령 가능한 주소로 변경해주세요. </p>
                <ul class="listType02">
                    <li>
                        <!-- 온라인지점 > 고객정보 > 정보관리 변경 메뉴로 -->
                        <button type="button">
                            <h2>온라인으로 변경하기</h2>
                            <p>{{ userInfo.address01 }}</p>
                        </button>
                    </li>
                    <li>
                        <button type="button">
                            <h2>전화로 요청하기</h2>
                            <p><a href="tel:1588-6655" class="fontRed">1588-6655</a>로 연결</p>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, reactive, onMounted } from 'vue'
const $axios = inject('$axios')
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const emit = defineEmits(['runEmits'])
const myInfoAPI = '/json/global/myInfo.json'

// 주소정보
// 주소정보 값에 따라 다르게 적용 실제 적용값 기획 재확인 필요
const userInfo = reactive({
    postCode: '', // 우편번호
    address01: '', // 동까지 주소
    address02: '' // 상세주소

})

const doClose = () => {
    $modalEnd('modalArea')
    emit('runEmits', false)
}

const inquiryMyInfo = () => {
    $axios.get(myInfoAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                const data = res.data.myInfo
                userInfo.postCode = data.postCode
                userInfo.address01 = data.address01
                userInfo.address02 = data.address02
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
inquiryMyInfo()
// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    div[role="dialog"] > div.bottomSheet {
         padding-bottom: 0;
        & a {text-decoration: none;}
        & .contentsArea > p {
            margin: 24px 0 0;
        }
        & button > p {
            padding-right: 26px;
        }
    }
</style>