<template>
    <div id="reSelect" role="dialog">
        <div :class="'bottomSheet' + [ hasButton() ? '' : ' nonButton' ]">
            <h1>
                {{ props.options.title }}
                <button type="button" title="닫기" class="modalClose"
                    @click="closeModal(false)"></button>
            </h1>
            <div class="contentArea">
                <ul id="lists">
                    <li v-for="(lists, index) in props.options.listData" :key="index"
                        :class="[lists.listValue === props.options.selected ? 'on' : '']">
                        <button v-if="hasButton()" type="button"
                            @click="selectData(lists)">{{ lists.listName }}</button>
                        <button v-else type="button"
                            @click="closeModal(lists)">{{ lists.listName }}</button>
                    </li>
                </ul>
            </div>
            <div class="buttonArea"
                v-if="hasButton()"
                :data-buttonLength="typeof (props.options.falseButton) === 'undefined' ? '1' : '2'">
                <button type="button" class="white h50"
                    v-if="typeof(props.options.falseButton) === 'string'"
                    @click="closeModal(true)">
                    {{ props.options.falseButton }}
                </button>
                <button type="button" class="pointBlue h50"
                    v-if="typeof(props.options.trueButton) === 'string'"
                    @click="closeModal(selected)"
                    :disabled="selected.listName === '' || selected.listValue === '' ">
                    {{ props.options.trueButton }}
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, reactive, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])

// options 구조
// title : 전체 모달 타이틀
// falseButton : 거절 버튼 - 작은 wihte 버튼 - retrun false
// trueButton: 승락 버튼 텍스트 - 큰 pointBlue 버튼 - retun select Data
// selected: // 현재 선택된 value
// listData: [
//    {
//        listName: '' // 현재 리스트 명
//        listValue: '' // 현재 리스트 값
//    }
// ]

const selected = reactive({
    listName: '',
    listValue: ''
})

// 바로 실행이 아닐 시
const selectData = (obj) => {
    selected.listName = obj.listName
    selected.listValue = obj.listValue
    const selectDOM = document.getElementById('lists')
    for(let i = 0; i < selectDOM.children.length; i++) {
        const nowList = selectDOM.children[i]
        if(nowList.classList.contains('on')) nowList.classList.remove('on')
        if(i === props.options.listData.indexOf(obj)) nowList.classList.add('on')
    }
}
// 바로 실행일 시
const closeModal = (obj) => {
    $modalEnd('reSelect')
    emit('runEmits', obj)
}

// 버튼을 사용할 것인가의 여부
const hasButton = () => {
    let result = true
    if (typeof (props.options.falseButton) === 'undefined' && typeof (props.options.trueButton) === 'undefined') {
        result = false
    }
    return result
}

onMounted(() => {
    $modalStart('reSelect')
})
</script>

<style lang="postcss" scoped>
    #reSelect {
        & > div.bottomSheet {
            & > div.contentArea {
                max-height: 370px;
            }
            padding: 20px 0 70px;
            & h1 {
                margin: 0;
                padding: 0 20px 24px;
            }
            & ul {
                margin: 0; padding: 0 0 20px 0;
                list-style: none;
                & li.on {
                    background: rgba(244,246,253,1) url('@/assets/images/global/icon_select_on.png') no-repeat calc(100% - 20px) center / 15px;
                    & button {
                        color: var(--pointBlue); font-weight: 700;
                    }
                }
                & button {
                    width: 100%;
                    padding: 18px 20px; border: none; border-radius: 0;
                    background-color: transparent;
                    font-size: 1.143rem; text-align: left; font-weight: 400;
                }
            }
            & div.buttonArea {
                width: 100vw;
                padding: 0 20px;
                box-sizing: border-box;
                & button.white {
                    width: calc(35% - 6px);
                }
                & button.pointBlue {
                    width: calc(65% - 6px);
                }
            }
            &.nonButton {
                padding: 20px 0 0;
                & ul {
                    padding-bottom: 0;
                }
            }
        }
    }
</style>