 <template>
    <!-- 펀드 추가매수 정보확인 -->
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>펀드 추가매수</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div class="contentsArea">
            <div class="titleInStep">
                <h1>
                    변경된 투자설명서를<br>
                    확인해주세요.
                </h1>
            </div>
            <!-- <div class="listSort agreeAll">
                <label for="agreeAll">
                    <input type="checkbox" id="agreeAll"
                    @click.prevent="checkAll($event)">
                    <div>약관 전체 동의</div>
                </label>
            </div> -->
            <ul id="agreeArea" class="agreeList">
                <template v-for="(lists, index) in pageInfo.agreeList" :key="index">
                    <!-- 하위항목이 있을 시 -->
                    <li class="hasChildren"
                        :class="{ 'on' : lists.isOpen }"
                        v-if="typeof lists.children !== 'undefined' && lists.children.length > 0">
                        <label :for="'agree' + index.toString()">
                            <input type="checkbox" :id="'agree' + index.toString()"
                                :data-mustReg="lists.mustReg"
                                :checked="lists.children.length === lists.children.filter(arr => arr.isChecked === true).length"
                                @change="childrenCheck($event, lists)">
                            <div></div>
                        </label>
                        <a href="javascript:;" @click="lists.isOpen = !lists.isOpen">{{ lists.text }}</a>
                        <transition name="slideVertical">
                            <ul v-if="lists.isOpen">
                                <li v-for="(childList, childIndex) in lists.children" :key="childIndex"
                                    :class="{ 'hasLink_small' : childList.viewPage !== '' }">
                                    <label>
                                        <input type="checkbox" class="smallCheck"
                                            :id="'agree' + index.toString() + childIndex.toString()"
                                            :data-mustReg="childList.mustReg"
                                            v-model="childList.isChecked"
                                            @change="openAgree($event, childList)">
                                        <div class="checkText">
                                            {{ childList.text }}
                                        </div>
                                    </label>
                                </li>
                            </ul>
                        </transition>
                    </li>
                    <!-- 하위항목이 없을 시 -->
                    <li v-else :class="{ 'hasLink' : lists.viewPage !== '' }">
                        <label>
                            <input type="checkbox"
                                :id="'agree' + index"
                                :data-mustReg="lists.mustReg"
                                v-model="lists.isChecked"
                                @change="openAgree($event, lists)">
                            <div>{{ lists.text }}</div>
                        </label>
                        <p v-if="typeof lists.moreText === 'string'">
                            {{ lists.moreText }}
                        </p>
                    </li>
                </template>
            </ul>
        </div>
        <div class="buttonArea div3_7"
            data-buttonLength="2">
            <button type="button" class="h50 white"
            @click="returnVal('back')"
                >이전</button>
            <button type="button" class="h50 pointBlue"
            @click="returnVal(true)"
                >다음</button>
        </div>
        <component :is="componentsInfo.compName"
            :options="componentsInfo.compOption"
            @runEmits="closeComp" />
    </div>
</template>
<script setup>
import { reactive, inject, onMounted, markRaw } from 'vue'
import popupAgree from '@/components/global/popupAgree.vue' // 동의 전체 보기
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const viewAgree = new Array(0)

const pageInfo = reactive({
    agreeList: [
        {
            text: '투자설명서',
            viewPage: '',
            isChecked: false, // 실제 하위항목이 있을 시 화면상에서는 사용되지 않는다.
            mustReg: true,
            isOpen: true,
            children: [
                {
                    text: 'NH-Amundi코리아2배인버스리지증권투자신탁[주식-파생재간접형]',
                    viewPage: '01',
                    mustReg: true,
                    isChecked: false
                },
                {
                    text: 'KB스타코리아리버스인덱스증권투자신탁(주식-파생형)A-E클래스',
                    viewPage: '02',
                    mustReg: true,
                    isChecked: false
                }
            ]
        }
    ]
})

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
    // markRaw뒤에 컴포넌트 명 입력
    // 현재 실행중인 컴포넌트 중복 방지
    componentsInfo.compName = markRaw(comps)
    if(comps === popupAgree) {
        componentsInfo.compOption = viewAgree
    }
}

// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === popupAgree) {
            pageInfo.agreeList.forEach((el) => {
                if(typeof el.children !== 'undefined' && el.children.length !== 0) {
                    el.children.forEach((child) => {
                        const checked = returnVals.filter(arr => arr.viewPage === child.viewPage).length
                        if(checked > 0) {
                            child.isChecked = true
                        }
                    })
                } else {
                    const checked = returnVals.filter(arr => arr.viewPage === el.viewPage).length
                    if(checked > 0) {
                        el.isChecked = true
                    }
                }
            })
            isAll()
        }
        closeComponent()
    } else {
        if(comps === popupAgree) isAll()
        closeComponent()
    }
}

// 20221008
// 단일파트 선택, 해제
const openAgree = (ev, el) => {
    // 동의 항목 초기화
    viewAgree.length = 0
    if(el.viewPage !== '') {
        if(ev.target.checked === true) {
            const addObj = { viewPage: el.viewPage, mustReg: el.mustReg }
            viewAgree.push(addObj)
            // viewAgree.push(el.viewPage)
            ev.target.checked = false
            el.isChecked = false
            runComp(popupAgree)
        } else {
            el.isChecked = ev.target.checked
        }
    } else {
        el.isChecked = ev.target.checked
    }
    isAll()
}
// 파트 별 전체 선택, 해제
const childrenCheck = (ev, el) => {
    // 동의 항목 초기화
    viewAgree.length = 0
    el.children.forEach((childrens) => {
        if(childrens.viewPage !== '') {
            if(ev.target.checked === true) {
                if(childrens.isChecked === false) {
                    const addObj = { viewPage: childrens.viewPage, mustReg: childrens.mustReg }
                    viewAgree.push(addObj)
                }
            } else {
                childrens.isChecked = ev.target.checked
            }
        } else {
            childrens.isChecked = ev.target.checked
        }
    })
    if(ev.target.checked === true) {
        ev.target.checked = false
        runComp(popupAgree)
    }
    isAll()
}
// 전체 선택, 해제
const checkAll = (ev) => {
    viewAgree.length = 0
    pageInfo.agreeList.forEach((el) => {
        if(typeof el.children === 'undefined' || el.children.length === 0) {
            if(el.viewPage !== '') {
                if(!el.isChecked) {
                    const addObj = { viewPage: el.viewPage, mustReg: el.mustReg }
                    viewAgree.push(addObj)
                }
            } else {
                el.isChecked = ev.target.checked
            }
        } else {
            el.children.forEach((child) => {
                if(child.viewPage !== '') {
                    if(!child.isChecked) {
                        const addObj = { viewPage: child.viewPage, mustReg: child.mustReg }
                        viewAgree.push(addObj)
                    }
                } else {
                    child.isChecked = ev.target.checked
                }
            })
        }
    })
    if(!pageInfo.isCheckedAll) {
        runComp(popupAgree)
    } else {
        // console.log(pageInfo.isCheckedAll)
        // ev.target.checked = false
        // pageInfo.isCheckedAll = false
        pageInfo.agreeList.forEach((el) => {
            if(typeof el.children === 'undefined' || el.children.length === 0) {
                el.isChecked = false
            } else {
                el.children.forEach((child) => {
                    child.isChecked = false
                })
            }
        })
        isAll()
    }
}

// 전체 체크 시
const isAll = () => {
    setTimeout(() => {
        let falseLength = 0
        const allCheckBox = document.getElementById('agreeAll')
        const agreeArea = document.getElementById('agreeArea')
        agreeArea.querySelectorAll('input[type="checkbox"]').forEach((el) => {
            if(el.checked === false) falseLength++
        })
        if(allCheckBox !== null) {
            if (falseLength === 0) {
                pageInfo.isCheckedAll = true
                allCheckBox.checked = true
            } else {
                pageInfo.isCheckedAll = false
                allCheckBox.checked = false
            }
        }
    })
}

const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    emit('runEmits', vals)
    $modalEnd('modalArea')
}

onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
.titleInStep {
    padding-left: 0; padding-right: 0;
}
</style>