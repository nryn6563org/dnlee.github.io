<template>
    <div id="customPicker" role="dialog">
        <div class="bottomSheet">
            <div class="contentArea">
                <div class="dateArea">
                    <h1>{{ $dateToKr(dateInfo.pickDate) }}</h1>
                    <button type="button" title="오늘선택"
                        @click="todayMove()">
                        오늘
                    </button>
                    <div>
                        <button type="button" title="이전년도"
                            ref="prevYear"
                            @click="yearMove(-1)"></button>
                        <span>{{ dateInfo.pickDate.getFullYear() }}년</span>
                        <button type="button" title="다음년도"
                            ref="nextYear"
                            @click="yearMove(1)"></button>
                    </div>
                    <div>
                        <button type="button" title="이전달"
                            ref="prevMonth"
                            @click="monthMove(-1)"></button>
                        <span>{{ dateInfo.pickDate.getMonth() + 1 }}월</span>
                        <button type="button" title="다음달"
                            ref="nextMonth"
                            @click="monthMove(1)"></button>
                    </div>
                </div>
                <Calendar class="pickerBottomSheet"
                    is-expanded trim-weeks
                    ref="calendarPick"
                    :min-date="minDate"
                    :max-date="maxDate"
                    v-model="dateInfo.pickDate"
                    @dayclick="onDayClick" />
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="returnDate()">
                    확인
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
import { Calendar } from 'v-calendar'
import 'v-calendar/dist/style.css'
// eslint-disable-next-line no-unused-vars
const $modalStart = inject('$modalStart') // mounted에서 사용
const $modalEnd = inject('$modalEnd')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const checkedDate = props.options.checkedDate ? props.options.checkedDate : new Date()
const minDate = props.options.minDate ? props.options.minDate : null
const maxDate = props.options.maxDate ? props.options.maxDate : null
const dateInfo = reactive({
    pickDate: checkedDate
})
const $dateToKr = inject('$dateToKr')
const returnDate = () => {
    emit('runEmits', dateInfo.pickDate)
    $modalEnd('customPicker')
}
</script>

<script>
export default {
    methods: {
        isSameDate(date1, date2) {
            return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
        },
        onDayClick(day) {
            const dateEl = document.getElementsByClassName('vc-day-content')
            for (let i = 0; i < dateEl.length; i++) {
                if(dateEl[i].getAttribute('tabindex') === '0') {
                    dateEl[i].setAttribute('tabindex', '-1')
                }
            }
            day.el.setAttribute('tabindex', '0')
            this.dateInfo.pickDate = day.date
        },
        ulReset() {
            if(this.minDate !== null) {
                if(this.dateInfo.pickDate.getFullYear() === this.minDate.getFullYear()) {
                    if(!this.$refs.prevYear.classList.contains('off')) this.$refs.prevYear.classList.add('off')
                } else {
                    if(this.$refs.prevYear.classList.contains('off')) this.$refs.prevYear.classList.remove('off')
                }
                if(this.dateInfo.pickDate.getFullYear() === this.minDate.getFullYear() && this.dateInfo.pickDate.getMonth() === this.minDate.getMonth()) {
                    if(!this.$refs.prevMonth.classList.contains('off')) this.$refs.prevMonth.classList.add('off')
                } else {
                    if(this.$refs.prevMonth.classList.contains('off')) this.$refs.prevMonth.classList.remove('off')
                }
            }
            if(this.maxDate !== null) {
                if(this.dateInfo.pickDate.getFullYear() === this.maxDate.getFullYear()) {
                    if(!this.$refs.nextYear.classList.contains('off')) this.$refs.nextYear.classList.add('off')
                } else {
                    if(this.$refs.nextYear.classList.contains('off')) this.$refs.nextYear.classList.remove('off')
                }
                if(this.dateInfo.pickDate.getFullYear() === this.maxDate.getFullYear() && this.dateInfo.pickDate.getMonth() === this.maxDate.getMonth()) {
                    if(!this.$refs.nextMonth.classList.contains('off')) this.$refs.nextMonth.classList.add('off')
                } else {
                    if(this.$refs.nextMonth.classList.contains('off')) this.$refs.nextMonth.classList.remove('off')
                }
            }
            const dateEl = document.getElementsByClassName('vc-day-content')
            const nowDate = 'id-' + this.dateInfo.pickDate.getFullYear() + '-' + (this.dateInfo.pickDate.getMonth() + 1) + '-' + this.dateInfo.pickDate.getDate()
            for (let i = 0; i < dateEl.length; i++) {
                if(dateEl[i].getAttribute('tabindex') === '0') {
                    dateEl[i].setAttribute('tabindex', '-1')
                }
                if(dateEl[i].parentNode.classList.contains(nowDate)) {
                    dateEl[i].setAttribute('tabindex', '0')
                }
            }
        },
        yearMove(countYear) {
            let moveDate = this.dateInfo.pickDate.setFullYear(this.dateInfo.pickDate.getFullYear() + countYear)
            moveDate = new Date(moveDate)
            if (countYear === -1 && moveDate < this.minDate) {
                moveDate = new Date(JSON.parse(JSON.stringify(this.minDate)))
            }
            if (countYear === 1 && moveDate > this.maxDate) {
                moveDate = new Date(JSON.parse(JSON.stringify(this.maxDate)))
            }
            this.dateInfo.pickDate = moveDate
            this.$refs.calendarPick.move(this.dateInfo.pickDate)
            this.ulReset()
        },
        monthMove(countMonth) {
            let moveDate = this.dateInfo.pickDate.setMonth(this.dateInfo.pickDate.getMonth() + countMonth)
            moveDate = new Date(moveDate)
            if (countMonth === -1 && moveDate < this.minDate) {
                moveDate = new Date(JSON.parse(JSON.stringify(this.minDate)))
            }
            if (countMonth === 1 && moveDate > this.maxDate) {
                moveDate = new Date(JSON.parse(JSON.stringify(this.maxDate)))
            }
            this.dateInfo.pickDate = moveDate
            this.$refs.calendarPick.move(this.dateInfo.pickDate)
            this.ulReset()
        },
        todayMove() {
            this.dateInfo.pickDate = new Date()
            this.$refs.calendarPick.move(this.dateInfo.pickDate)
            const resetDates = document.getElementsByClassName('vc-day')
            setTimeout(() => {
                for(let i = 0; i < resetDates.length; i++) {
                    if(resetDates[i].classList.contains('is-today')) {
                        resetDates[i].children[0].setAttribute('tabindex', 0)
                    } else {
                        resetDates[i].children[0].setAttribute('tabindex', -1)
                    }
                }
            })
        }
    },
    mounted() {
        this.$modalStart('customPicker')
        setTimeout(() => {
            this.ulReset()
            this.todayMove()
        })
    }
}
</script>

<style lang="postcss" scoped>
    #customPicker {
        & > div.bottomSheet { padding-top: 0; padding-left: 0; padding-right: 0; }
        & div.dateArea {
            overflow: hidden; position: relative; display: flex;
            padding: 46px 20px 20px;
            background: rgba(242,245,249,1);
            justify-content: space-between;
            & > h1 {
                position: absolute;
                top: 14px; left: 0; width: 100%;
                margin: 0; padding: 0;
                font-size: 1.286rem; text-align: center;
            }
            & > button {
                position: absolute;
                top: 14px; right: 20px; width: 40px; height: 26px;
                padding: 0; margin: 0; border: 1px solid var(--black);
                background-color: transparent;
                font-size: 0.857rem; line-height: 26px;
            }
            & > div {
                display: flex;
                min-width: 145px; height: 24px;
                margin-top: 20px;
                text-align: center; justify-content: space-between;
                & > span {
                    margin: 0; padding: 0;
                    font-size: 1.143rem; font-weight: 700;
                }
                & > button {
                    width: 24px; height: 24px;
                    padding: 0; border: none;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 24px;
                    &:active {
                        background-color: rgba(0,0,0,.1);
                    }
                    &:nth-child(1) {
                        background-image: url('@/assets/images/global/button_calendar_left.png');
                    }
                    &:nth-child(3) {
                        background-image: url('@/assets/images/global/button_calendar_right.png');
                    }
                    &.off {
                        opacity: .2; pointer-events: none;
                    }
                }
            }
        }
        & div.buttonArea { left: 20px; }
    }
</style>