<template>
<div>
    <!-- 투자설명 및 약관동의 -->
    <section id="newFundBuyAgree">
        <div class="titleInStep">
            <h1>
                투자설명서 및 이용약관을<br>
                확인해주세요.
            </h1>
            <span>
                <strong>3</strong>/4
            </span>
        </div>
        <div class="listSort agreeAll">
            <!-- @change="checkAll($event) @change="isAll()-->
            <label for="agreeAll">
                <input type="checkbox" id="agreeAll"
                @click.prevent="checkAll($event)">
                <div>약관 전체 동의</div>
            </label>
        </div>
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
    </section>
    <div class="buttonArea div3_7">
        <button typw="button" class="h50 white" @click="$router.push({ name: 'newFundBuyInvestConfirm' })">이전</button>
        <button typw="button" class="h50 pointBlue"
            :disabled="!pageInfo.isCheckedAll"
            @click="$router.push({ name: 'newFundBuyConfirm' })">다음</button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>
<script setup>
import { reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import popupAgree from '@/components/global/popupAgree.vue' // 동의 전체 보기
// import modalFundInvestorGuide from '@/components/products/modalFundInvestorGuide.vue' // 투자자 확인사항
const props = defineProps(['baseInfo'])
const $router = useRouter()
const viewAgree = new Array(0)

const pageInfo = reactive({
    isCheckedAll: false,
    userEmail: '',
    agreeList: [
        {
            text: '핵심설명서',
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
        },
        {
            text: '투자설명서',
            viewPage: '',
            isChecked: false, // 실제 하위항목이 있을 시 화면상에서는 사용되지 않는다.
            mustReg: true,
            isOpen: true,
            children: [
                {
                    text: 'NH-Amundi코리아2배인버스리지증권투자신탁[주식-파생재간접형]',
                    viewPage: '11',
                    mustReg: true,
                    isChecked: false
                },
                {
                    text: 'KB스타코리아리버스인덱스증권투자신탁(주식-파생형)A-E클래스',
                    viewPage: '12',
                    mustReg: true,
                    isChecked: false
                }
            ]
        },
        {
            text: '신탁계약서',
            viewPage: '21',
            isChecked: false,
            mustReg: true
        },
        {
            text: '투자자 확인사항',
            viewPage: '31',
            isChecked: false,
            mustReg: true
        },
        {
            text: '예금자 보호 안내 확인',
            viewPage: '',
            isChecked: false,
            mustReg: true,
            moreText: '약관, 투자설명서, 핵심설명서를 제공받고 그 주요내용을 설명 들었으며, 본인이 가입하는 금융상품은 예금자 보호법에 따라 보호되지 않음을 설명듣고 이해 하였음을 확인합니다.'
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
        if (falseLength === 0) {
            pageInfo.isCheckedAll = true
            allCheckBox.checked = true
        } else {
            pageInfo.isCheckedAll = false
            allCheckBox.checked = false
        }
    })
}

</script>
<style lang="postcss" scoped>
    section {
        padding-bottom: 86px;
        /* 타이틀 */
        & > h1 {
            position: relative;
            margin: 0 0 32px ; padding:0 20px ;
            line-height: 27px; text-align: left; font-size:1.428rem; font-weight: 500;
            & span {
                position: absolute;
                right: 20px; top: 4px;
                line-height: 20px; font-size: 1.142rem; color:var(--tableTopLine) ; font-weight:400 ;
                & strong { font-weight: 500;}
            }
        }
        & h2, & hr, & > ul { margin-left: 20px; margin-right: 20px;}
        & li {
            & .checkText {
                padding-right: 32px;
                word-break: break-all;
                font-size: 1rem; line-height: 21px;
            }
            & p {
                margin: 0; padding: 0 0 0 30px;
                font-size: 1rem;
            }
        }
    }
</style>