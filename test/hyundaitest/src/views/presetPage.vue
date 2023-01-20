<template>
    <section class="designPreset">
        <article>
            <h1>상품 위험등급</h1>
            <table>
                <colgroup>
                    <col width="34%">
                    <col width="*">
                </colgroup>
                <tr>
                    <th>금융투자상품</th>
                    <td>
                        <span class="badge" data-type="Inadequate">부적합</span><br>
                        DB차이나바이오헬스케어자(H)<br>
                        [주식]C-e
                    </td>
                </tr>
                <tr>
                    <th>상품위험등급</th>
                    <td>
                        매우높은위험(1등급)
                    </td>
                </tr>
            </table>
            <table>
                <colgroup>
                    <col width="34%">
                    <col width="*">
                </colgroup>
                <tr>
                    <th>금융투자상품</th>
                    <td>
                        <span class="badge" data-type="adequate">적합</span><br>
                        DB차이나바이오헬스케어자(H)<br>
                        [주식]C-e
                    </td>
                </tr>
                <tr>
                    <th>상품위험등급</th>
                    <td>
                        높은위험(2등급)
                    </td>
                </tr>
            </table>
        </article>
        <article>
            <h1>고객 유의사항</h1>
            <ul>
                <li>투자자성향 대비 위험도가 높은 투자성 상품 가입시 금융회사는 투자권유를 할 수 없으므로 본인 판단 하에 투자여부를 결정하셔야 합니다.</li>
            </ul>
            <div class="messageBox" data-bgColor="lightGray">
                귀하께서 투자권유를 희망하지 않더라도 적정성 원칙*대상 투자성 상품을 가입하고자 할 경우에는 금융회사는 면담·질문 등을 통해 해당 상품이 귀하에게 부적정하다고 판단하는 경우 평가결과 및 그 사유를 기재한 적정성 판단 보고서를 제공하고 있으니 이를 충분히 검토하고 가입할 필요가 있습니다.
            </div>
        </article>
        <article>
            <h1>투자자 성향별 적합한 금융투자상품</h1>
        </article>
        <article>
            <h1>고객 확인사항</h1>
            <p>
                본인은 투자자확인서 결과에 따른 본인의 가입가능상품 등급보다 위험도가 높은 금융상품을 지정하였으며, 이와 관련하여 본인은 스스로 상품의 특성을 판단하여 해당 상품에 가입함을 확인합니다.
            </p>
            <hr>
            <label>
                <input type="checkbox" checked>
                <div>
                    본인은 상기내용을 읽고 해당 내용을 충분히<br>
                    인지하였으며 이에 동의합니다.
                </div>
            </label>
        </article>
    </section>
    <div class="bottomBtnArea" data-buttonLength="2">
        <button type="button"
            class="h50 white"
            @click="endTrans()">취소</button>
        <button type="button"
            class="h50 pointBlue"
            @click="endTrans()">확인</button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>

<script setup>
import { inject, reactive, markRaw } from 'vue'
import dateScrollPicker from '@/components/global/dateScrollPicker.vue'
const props = defineProps(['baseInfo'])
const $isMobile = inject('$isMobile')
// 컴포넌트 세팅
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
    componentsInfo.compOption = {
        fromDate: new Date(2021, 4, 5),
        toDate: new Date(2022, 12, 12)
    }
}
// 컴포넌트 실행 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === dateScrollPicker) {
        console.log(returnVals)
    }
    closeComponent()
}

// App Test
if($isMobile() === 'android') {
    console.log('android')
    window.android.AndroidMTS.getPostMessage({
        control: 'hideTitle'
    })
} else if($isMobile() === 'iOS') {
    console.log('iOS')
    window.webkit.messageHandler.iOSMTS.getPostMessage({
        control: 'hideQmenu'
    })
}

</script>

<style lang="postcss" scoped>
.designPreset {
    padding: 0 20px 20px;
    & > article {
        & > h1 {
            margin: 10px 0; padding: 0;
            font-weight: 700; font-size: 1.143rem
        }
        & > table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border-top: 1px solid rgba(140,140,140,1);
            & th, & td {
                padding: 10px 12px; border-bottom: 1px solid rgba(240, 240, 240, 1);
                vertical-align: middle;
            }
            & th {
                background: rgba(250,250,250,1);
                color: rgba(100,100,100,1); font-weight: 400;
                border-right: 1px solid rgba(220,220,220,1)
            }
            & + table {
                margin-top: 8px;
            }
        }
        & > ul {
            margin: 10px 0; padding: 0;
            list-style: none;
            & > li {
                position: relative;
                padding: 0 0 0 8px;
                &::before {
                    position: absolute;
                    top: 8px; left: 0; width: 4px; height: 4px;
                    border-radius: 2px;;
                    background: var(--black);
                    content: '';
                }
            }
            & > li + li {
                margin-top: 7px;
            }
        }
        & > p {
            padding: 0; margin: 0;
        }
        & > hr {
            width: 100%; height: 0;
            padding: 0; margin: 24px 0; border: none; border-top: 1px solid rgba(215,215,215,1);
            line-height: 0;
        }
        & + article {
            margin-top: 24px;
        }
    }
}
span.badge {
    display: inline-block;
    height: 20px;
    margin-bottom: 6px; padding: 0 6px; border-radius: 4px;
    font-size: 0.786rem; line-height: 20px;
    &[data-type="Inadequate"] {
        background: rgba(253,231,231,1);
        color: rgba(238,55,57,1);
    }
    &[data-type="adequate"] {
        background: rgba(225,239,254,1);
        color: rgba(9,125,244,1);
    }
}
div.messageBox {
    padding: 17px 20px; border-radius: 8px;
    font-weight: 400;
    &[data-bgColor="lightGray"] {
        background: rgba(248,248,248,1);
        color: rgba(60,60,60,1);
    }
}
</style>