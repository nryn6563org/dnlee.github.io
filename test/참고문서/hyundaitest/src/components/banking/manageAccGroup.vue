<template>
    <div id="managgeGroup" class="fullPopup">
        <!-- 컨텐츠 영역 -->
        <div class="contentsArea">
            <h1>
                <a href="javascript:;" @click="checkedAll($event)"
                    :data-checked="pageInfo.groupList.length !== 0 &&
                        pageInfo.groupList.length === pageInfo.groupList.filter(arr => arr.isChecked === true).length ?
                        'true' : 'false'">
                    전체선택{{
                        pageInfo.groupList.length !== 0 &&
                        pageInfo.groupList.length === pageInfo.groupList.filter(arr => arr.isChecked === true).length ?
                        '해제' : ''
                        }}
                </a>
                <button type="button"
                    @click="runComp(regName)">
                    그룹추가
                </button>
            </h1>
            <draggable
                :list="pageInfo.groupList"
                item-key="id"
                @start="pageInfo.dragging = true"
                @end="pageInfo.dragging = false"
                handle=".handle"
                tag="ul">
                <template #item="{ element, index }">
                    <li>
                        <label :for="'gorup' + index" @click="changeCheck(element)">
                            <input type="checkBox" :id="'group' + index" :checked="element.isChecked" />
                            <div></div>
                        </label>
                        {{ element.groupName }}
                        <button type="button" class="handle" title="순서변경"></button>
                        <button type="button" class="write" @click="runComp(regName, index)" title="그룹명 변경"></button>
                    </li>
                </template>
            </draggable>
        </div>
        <div class="buttonArea" data-buttonLength="2">
            <button type="button" class="white h50"
                @click="closeModal()">
                완료
            </button>
            <button type="button" class="pointBlue h50"
                @click="removeGroup()"
                :disabled="pageInfo.groupList.filter(arr => arr.isChecked === true).length === 0">
                선택 그룹 삭제
            </button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
            :options="componentsInfo.compOption"
            @runEmits="closeComp" />
</template>

<script setup>
import { inject, onMounted, reactive, markRaw } from 'vue'
import draggable from 'vuedraggable'
import regName from '@/components/banking/regName.vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd') // 닫을 경우 산정
const $axios = inject('$axios')
const myTransGroupAPI = '/json/banking/myTransGroup.json'
const emit = defineEmits(['runEmits'])

const pageInfo = reactive({
    groupList: new Array(0),
    dragging: false
})

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
    let type = 'group'
    if(typeof (directInput) !== 'undefined') type = 'groupModify'
    componentsInfo.compOption = { type: type, index: directInput }
}
// 컴포넌트 실행 emit
const closeComp = (returnVals) => {
    // 등록 절차 후 화면확인 목록에 추가 노출
    // 토드는 절차 후 리턴되는 값으로 더한다.
    if(returnVals !== false) {
        if(typeof (componentsInfo.compOption.index) === 'number') {
            pageInfo.groupList[componentsInfo.compOption.index].groupName = returnVals.returnName
        } else {
            const addObj = []
            addObj.groupName = returnVals.returnName
            addObj.groupCode = ''
            pageInfo.groupList.push(addObj)
        }
    }
    closeComponent()
}

// 체크 옵션 변경
const changeCheck = (el) => {
    el.isChecked = !el.isChecked
}
// 체크 전체 변경
const checkedAll = (ev) => {
    let nowCheck = ev.target.getAttribute('data-checked')
    if(nowCheck === 'true') {
        nowCheck = false
    } else {
        nowCheck = true
    }
    for(const i in pageInfo.groupList) {
        pageInfo.groupList[i].isChecked = nowCheck
    }
}
// 그룹 삭제
const removeGroup = () => {
    for(let i = 0; i < pageInfo.groupList.length; i++) {
        if(pageInfo.groupList[i].isChecked === true) {
            pageInfo.groupList.splice(i, 1)
            i--
        }
    }
}

// 팝업 닫기
const closeModal = () => {
    $modalEnd('managgeGroup')
    emit('runEmits', false)
}

// 그룹리스트 > 계좌리스트 조회
const getGroupList = () => {
    $axios.get(myTransGroupAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 자주, 퀵 화면에서 삭제용 스크립트
                // pageInfo.groupList = res.data.accList
                const groupArr = new Array(0)
                for(const i in res.data.groupList) {
                    if(res.data.groupList[i].groupCode !== 'often' &&
                        res.data.groupList[i].groupCode !== 'quick' &&
                        res.data.groupList[i].groupCode !== 'save') {
                        const listObj = res.data.groupList[i]
                        const addOption = { isChecked: false }
                        Object.assign(listObj, addOption)
                        groupArr.push(listObj)
                    }
                }
                pageInfo.groupList = groupArr
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
getGroupList()

onMounted(() => {
    $modalStart('managgeGroup')
})
</script>
<style lang="postcss" scoped>
    .contentsArea {
        padding: 0 !important;
        & > h1 {
            overflow: hidden;
            margin: 0; padding: 11px 12px 11px 17px;
            background: rgba(248,248,248,1);
            font-size: 1rem; font-weight: 400; line-height: 26px;
            & > a {
                padding: 0 0 0 25px;
                background: url('@/assets/images/global/icon_check.png') no-repeat left center / 14px;
                color: var(--black); text-decoration: none;
            }
            & button {
                float: right;
                height: 26px;
                padding: 0 8px 0 24px; border: none;
                background: var(--black) url('@/assets/images/global/icon_plus_white.png') no-repeat 8px center / 12px;
                font-size: 0.857rem; color: rgba(255,255,255,1); line-height: 26px; font-weight: 500;
            }
        }
        & > ul {
            padding: 0 20px; margin: 0;
            list-style: none;
            & > li {
                overflow: hidden;
                padding: 11px 0;
                line-height: 24px;
            }
            & label {
                float: left; display: block;
                width: 24px; height: 24px;
                margin-right: 8px;
                & div { width: 24px; height: 24px; padding: 0; }
            }
            & button {
                float: right;
                width: 24px; height: 24px;
                padding: 0; margin: 0; border: none;
                background: transparent;
                &.write {
                    background:url('@/assets/images/global/icon_write.png') no-repeat center / 24px;
                }
                &.handle {
                    background:url('@/assets/images/global/icon_orderBy.png') no-repeat center / 24px;
                }
                & + button {
                    margin-right: 16px;
                }
            }
        }
    }
</style>