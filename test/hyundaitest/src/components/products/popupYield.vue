<template>
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>기간수익률 상세</h1>
            <button class="modalClose" @click="returnVal()"></button>
        </div>
        <div class="contentsArea remakeTable onewayTouch">
            <div class="fixedArea dataArea basicTable">
                <table>
                    <colgroup>
                        <col width="33.3%" span="3">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>일자</th>
                            <th>기준가</th>
                            <th>설정액</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                        <tr>
                            <td>2022.06.16</td>
                            <td>1,265.73</td>
                            <td>310.0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $onewaySwipe = inject('$onewaySwipe')
const $tableSameHeight = inject('$tableSameHeight')
// 최종 실행 시 return 함수
const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    const returnValue = vals || false
    emit('runEmits', returnValue)
    $modalEnd('modalArea')
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    .remakeTable {
        overflow-y: hidden;
        height: auto; max-height: calc(100% - 60px) !important;
        padding: 0 !important; margin: 20px 20px 0;
        border-top: 1px solid var(--tableTopLine); border-collapse: collapse;
        border-bottom: 1px solid var(--tableTopLine); border-collapse: collapse;
        & div.fixedArea {
            width: 100%;
        }
        & table { border-top: none; }
        & tr {
            & th, & td { text-align: center; }
            & th {
                border-top: none;
            }
            & th:last-child, & td:last-child {
                border-right: none;
            }
            & td:first-child {
                border-right: 1px solid rgba(220, 220, 220, 1);
            }
        }
    }
</style>