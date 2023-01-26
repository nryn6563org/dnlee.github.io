export default {
    install: (app) => {
        // 최초 화면 높이 fix
        app.provide('$fixMWebHeight', methods.fixMWebHeight)
        // 모바일 여부 체크
        app.provide('$checkMobile', methods.checkMobile)
        // 모바일 여부 체크
        app.provide('$autoWidthCheck', methods.autoWidthCheck)
        // 스와이프 on/off
        app.provide('$swipeBind', methods.swipeBind)
        // 테이블 오토그리드
        app.provide('$doTableGrid', methods.doTableGrid)
        // 테이블 자동 높이 맞춤
        app.provide('$tableSameHeight', methods.tableSameHeight)
        // 단일 방향 스와이프
        app.provide('$onewaySwipe', methods.onewaySwipe)
        // 토스트
        app.provide('$toastMsg', methods.toastMsg)
        // 얼럿
        app.provide('$runAlert', methods.runAlert)
        // 컨펌
        app.provide('$runConfirm', methods.runConfirm)
        // 금액대 콤마 추가 함수
        app.provide('$priceToCommas', methods.priceToCommas)
        // 휴대폰번호 대쉬 추가 함수
        app.provide('$phoneToDashes', methods.phoneToDashes)
        // 숫자 한글로 (천단위 이상 한글변환)
        app.provide('$priceToKr', methods.priceToKr)
        // 현대차증권 계좌 대쉬 추가
        app.provide('$hmsecToDash', methods.hmsecToDash)
        // 금융기관코드 정보 리턴
        app.provide('$codeToBank', methods.codeToBank)
        // 계좌종류 코드로 명칭 리턴
        app.provide('$codeToAccType', methods.codeToAccType)
        // 모달 창 시작시 클래스 추가
        app.provide('$modalStart', methods.modalStart)
        // 모달 창 종료시 클래스 제거
        app.provide('$modalEnd', methods.modalEnd)
        // 콤마 날짜 표기
        app.provide('$dateToCommas', methods.dateToCommas)
        // 콤마 날짜(달단위) 표기
        app.provide('$monthToCommas', methods.monthToCommas)
        // 한글 날짜 표기
        app.provide('$dateToKr', methods.dateToKr)
        // 인풋 컨트롤 버튼 체크
        app.provide('$checkButton', methods.checkButton)
        // 인풋 초기화 버튼
        app.provide('$resetInput', methods.resetInput)
        // 오픈뱅킹 계좌 조회 에러코드 메세지 처리
        app.provide('$codeToOBAccErr', methods.codeToOBAccErr)
        // 오픈뱅킹 거래 응답코드 메세지 처리
        app.provide('$codeToOBTrans', methods.codeToOBTrans)
        // 데이트 셋
        app.provide('$dateSet', methods.dateSet)
        // 툴팁보기 및 종료 bind
        app.provide('$viewTip', methods.viewTip)
        // 일부영역 확장처리
        app.provide('$wideOpen', methods.wideOpen)
        // app UI 변경
        app.provide('$changeAppUI', methods.changeAppUI)
        // 상품 상세 분류 코드 > text, class 리턴
        app.provide('$fundCodeToText', methods.fundCodeToText)
    }
}

const methods = {
    // 최초 화면 높이 fix
    fixMWebHeight: () => {
        window.addEventListener('DOMContentLoaded', (ev) => {
            resizeRun()
        })
        window.addEventListener('resize', (ev) => {
            resizeRun()
        })
        const resizeRun = () => {
            document.getElementById('hmsec').style.height = window.innerHeight + 'px'
        }
    },
    // 모바일 디바이스 체크
    checkMobile: () => {
        // hmseciOS(iOS), hmsecDroid(android)
        let connectDiv = 'web'
        const agentValue = navigator.userAgent
        if(agentValue.indexOf('hmseciOS') > -1) {
            connectDiv = 'iPhone'
        } else if(agentValue.indexOf('hmsecDroid') > -1) {
            connectDiv = 'android'
        }
        return connectDiv
    },
    // 자동 width 체크
    autoWidthCheck: () => {
        const reWrtieWidthDOM = document.querySelectorAll('div.swipeArea')
        reWrtieWidthDOM.forEach(function(changeDom) {
            const elements = changeDom.querySelector('ul')
            let elementsWidth = 2
            for (const i in elements.children) {
                if(typeof (elements.children[i].offsetWidth) !== 'undefined') {
                    const nowStyle = getComputedStyle(elements.children[i])
                    elementsWidth += elements.children[i].offsetWidth
                    if(nowStyle.getPropertyValue('margin-left') !== '') {
                        elementsWidth += Number(nowStyle.getPropertyValue('margin-left').replace('px', ''))
                    }
                    if(nowStyle.getPropertyValue('margin-right') !== '') {
                        elementsWidth += Number(nowStyle.getPropertyValue('margin-right').replace('px', ''))
                    }
                }
            }
            elements.style.width = elementsWidth + 'px'
        })
    },
    // 스와이프 on/off
    swipeBind: () => {
        const reWrtieWidthDOM = document.querySelectorAll('div.swipeArea')
        reWrtieWidthDOM.forEach(function(changeDom) {
            let firstX = 0
            changeDom.addEventListener('mousedown', eventBind)
            changeDom.addEventListener('mouseup', eventUnbind)

            function eventBind (ev) {
                firstX = ev.clientX
                changeDom.addEventListener('mousemove', moveScroll, { passive: false })
            }
            function eventUnbind () {
                changeDom.removeEventListener('mousemove', moveScroll)
            }
            function moveScroll (ev) {
                ev.preventDefault()
                let moveX = 0
                if (firstX <= ev.clientX) {
                    moveX = -1 * (ev.clientX - firstX)
                } else {
                    moveX = firstX - ev.clientX
                }
                changeDom.scrollLeft += moveX
                firstX = ev.clientX
            }
        })
    },
    // 테이블 오토그리드
    doTableGrid: () => {
        const reMakeTableArea = document.getElementsByClassName('remakeTable')
        for (let runTable = 0; runTable < reMakeTableArea.length; runTable++) {
            // 기존 영역 삭제
            const childrens = reMakeTableArea[runTable].children
            for(let child = 0; child < childrens.length; child++) {
                if(childrens[child].tagName === 'DIV') {
                    childrens[child].remove()
                    child--
                }
            }
            // 테이블 기초정보 바인딩
            const fixCols = reMakeTableArea[runTable].getAttribute('data-fixCol') ? Number(reMakeTableArea[runTable].getAttribute('data-fixCol')) : 0
            const fixRows = reMakeTableArea[runTable].getAttribute('data-fixRow') ? Number(reMakeTableArea[runTable].getAttribute('data-fixRow')) : 0
            const fixCaption = reMakeTableArea[runTable].getAttribute('data-fixCaption') ? reMakeTableArea[runTable].getAttribute('data-fixCaption') : ''
            const scrollCaption = reMakeTableArea[runTable].getAttribute('data-scrollCaption') ? reMakeTableArea[runTable].getAttribute('data-scrollCaption') : ''
            // 테이블 데이터 전산화
            const fixColsArray = new Array(0)
            const scrollColsArray = new Array(0)
            const trSelector = reMakeTableArea[runTable].querySelectorAll('tr')
            for (let trs = 0; trs < trSelector.length; trs++) {
                const tdSelector = trSelector[trs].children
                for (let tds = 0; tds < tdSelector.length; tds++) {
                    if(tds < fixCols) {
                        fixColsArray.push(trSelector[trs].children[tds].outerHTML)
                    } else {
                        scrollColsArray.push(trSelector[trs].children[tds].outerHTML)
                    }
                }
            }
            // 기초 레이아웃
            let remakeTable = ''
            for (let divs = 0; divs < fixCols + 1; divs++) {
                if(divs <= 1) {
                    remakeTable += '<div'
                    if(fixCols !== 0 && divs === 0) {
                        remakeTable += ' class="fixedArea"'
                    }
                    remakeTable += '>'
                    remakeTable += '\n    <table>'
                    // 캡션 처리
                    if(fixRows !== 0 && fixCaption !== '' && divs === 0) {
                        remakeTable += '\n      <caption>' + fixCaption + '</caption>'
                    } else if (scrollCaption !== '') {
                        remakeTable += '\n      <caption>' + scrollCaption + '</caption>'
                    }
                    // 고정Row처리
                    if(fixRows !== 0) {
                        remakeTable += '\n      <thead>'
                        for (let rows = 0; rows < fixRows; rows++) {
                            remakeTable += '<tr>'
                            if(fixCols !== 0 && divs === 0) {
                                for(let tds = 0; tds < fixCols; tds++) {
                                    const addNumb = rows * (fixCols)
                                    remakeTable += fixColsArray[addNumb + tds]
                                }
                            } else {
                                for(let tds = 0; tds < trSelector[0].children.length - fixCols; tds++) {
                                    const addNumb = rows * (trSelector[0].children.length - fixCols)
                                    remakeTable += scrollColsArray[addNumb + tds]
                                }
                            }
                            remakeTable += '</tr>'
                        }
                        remakeTable += '\n      </thead>'
                        remakeTable += '\n      <tbody>'
                    } else if (fixRows === 0) {
                        remakeTable += '\n      <tbody>'
                    }
                    // 스크롤Row처리
                    for (let rows = fixRows; rows < trSelector.length; rows++) {
                        remakeTable += '<tr>'
                        if(fixCols !== 0 && divs === 0) {
                            for(let tds = 0; tds < fixCols; tds++) {
                                const addNumb = rows * (fixCols)
                                remakeTable += fixColsArray[addNumb + tds]
                            }
                        } else {
                            for(let tds = 0; tds < trSelector[0].children.length - fixCols; tds++) {
                                const addNumb = rows * (trSelector[0].children.length - fixCols)
                                remakeTable += scrollColsArray[addNumb + tds]
                            }
                        }
                        remakeTable += '</tr>'
                    }
                    remakeTable += '\n      </tbody>'
                    remakeTable += '\n    </table>'
                    remakeTable += '\n</div>\n'
                }
            }
            // 신규테이블 생성
            reMakeTableArea[runTable].insertAdjacentHTML('beforeend', remakeTable)

            // 테이블 별 width맞춤
            // width 스타일 바인딩 - 반드시 첫열을 기준해서 table width를 산정한다.
            const resizeTable = reMakeTableArea[runTable].querySelectorAll('table')
            for (let tables = 0; tables < resizeTable.length; tables++) {
                let resizeWidth = 0
                const checkTrs = resizeTable[tables].querySelector('tr')
                for(let tds = 0; tds < checkTrs.children.length; tds++) {
                    checkTrs.children[tds].style.display = 'block'
                    resizeWidth += Number(getComputedStyle(checkTrs.children[tds]).getPropertyValue('width').replace('px', ''))
                    checkTrs.children[tds].removeAttribute('style')
                }
                resizeTable[tables].style.width = resizeWidth + 'px'
            }
        }
    },
    // 테이블 자동 높이 맞춤
    tableSameHeight: () => {
        // div로 나뉘어진 두 구획에 같은 tr개수의 table 세팅 필요
        const target = document.getElementsByClassName('remakeTable')
        target.forEach((el) => {
            const areas = el.querySelectorAll('div.dataArea')
            areas[0].querySelectorAll('tr').forEach((trs, index) => {
                let fixHeight = 0
                const allTdS = trs.querySelectorAll('td, th')
                // 최대 높이값 확인
                allTdS.forEach((tds) => {
                    if(tds.getAttribute('rowspan') === null) {
                        if(tds.getBoundingClientRect().height > fixHeight) fixHeight = tds.getBoundingClientRect().height
                    }
                })
                const sideTds = areas[1].querySelectorAll('tr')[index].querySelectorAll('td, th')
                sideTds.forEach((tds) => {
                    if(tds.getAttribute('rowspan') === null) {
                        if(tds.getBoundingClientRect().height > fixHeight) fixHeight = tds.getBoundingClientRect().height
                    }
                })
                // 산출높이 적용
                allTdS.forEach((tds) => {
                    tds.style.height = fixHeight + 'px'
                })
                sideTds.forEach((tds) => {
                    tds.style.height = fixHeight + 'px'
                })
            })
            // 쉐도우 표기 관련
            const topShadow = el.querySelectorAll('div.dataArea')
            const rightShadow = el.querySelectorAll('div.verticalShadow')[0]
            const bottomShadow = el.querySelectorAll('div.horizonShadow')[0]
            const leftShadow = el.querySelectorAll('div.fixedArea')[0]
            console.log(el.getBoundingClientRect())
            rightShadow.style.height = el.getBoundingClientRect().height + 'px'
            rightShadow.style.right = (window.innerWidth - el.getBoundingClientRect().x - el.getBoundingClientRect().width) + 'px'
            rightShadow.style.top = el.getBoundingClientRect().y + 'px'
            bottomShadow.style.width = el.getBoundingClientRect().width + 'px'
            bottomShadow.style.left = el.getBoundingClientRect().x + 'px'
            bottomShadow.style.bottom = (window.innerHeight - el.getBoundingClientRect().y - el.getBoundingClientRect().height) + 'px'
            // 스크롤 이벤트 (shadow 표기)
            const showShadow = () => {
                const maxLeft = el.scrollWidth - el.getBoundingClientRect().width
                const maxTop = el.scrollHeight - el.getBoundingClientRect().height
                // 좌측 스크롤 이벤트
                if(el.scrollLeft === 0) {
                    if(leftShadow.classList.contains('on')) leftShadow.classList.remove('on')
                } else {
                    if(!leftShadow.classList.contains('on')) leftShadow.classList.add('on')
                }
                // 우측 스크롤 이벤트
                if(el.scrollLeft >= maxLeft - 5) {
                    if(rightShadow.classList.contains('on')) rightShadow.classList.remove('on')
                } else {
                    if(!rightShadow.classList.contains('on')) rightShadow.classList.add('on')
                }

                // 상단 스크롤 이벤트
                if(el.scrollTop === 0) {
                    topShadow.forEach((el) => {
                        const tops = el.querySelectorAll('thead')[0]
                        if(tops.classList.contains('on')) tops.classList.remove('on')
                    })
                } else {
                    topShadow.forEach((el) => {
                        const tops = el.querySelectorAll('thead')[0]
                        if(!tops.classList.contains('on')) tops.classList.add('on')
                    })
                }
                // 하단 스크롤 이벤트
                if(el.scrollTop >= maxTop) {
                    if(bottomShadow.classList.contains('on')) bottomShadow.classList.remove('on')
                } else {
                    if(!bottomShadow.classList.contains('on')) bottomShadow.classList.add('on')
                }
            }

            // 스크롤 액션 추가
            if(el.scrollHeight > el.getBoundingClientRect().height) {
                bottomShadow.classList.add('on')
            }
            if(el.scrollWidth > el.getBoundingClientRect().width) {
                rightShadow.classList.add('on')
            }

            if(el.scollHeight > el.getBoundingClientRect().height || el.scrollWidth > el.getBoundingClientRect().width) {
                el.addEventListener('scroll', showShadow)
            }
        })
    },
    // 단일 방향 스와이프
    onewaySwipe: () => {
        const swipeAreaAll = document.getElementsByClassName('onewayTouch')
        for (let runArea = 0; runArea < swipeAreaAll.length; runArea++) {
            const swipeArea = swipeAreaAll[runArea]
            let swipeDirection = ''
            let firstX = 0
            let firstY = 0
            let moveX = 0
            let moveY = 0
            swipeArea.addEventListener('touchstart', function(ev) {
                // ev.preventDefault()
                firstX = ev.touches[0].clientX
                firstY = ev.touches[0].clientY
                swipeArea.addEventListener('touchmove', checkDeriction, { once: true, passive: false })
                swipeArea.addEventListener('touchmove', doSwipe, { passive: false })
            }, { passive: false })
            swipeArea.addEventListener('touchend', function() {
                swipeArea.removeEventListener('touchmove', doSwipe)
                swipeDirection = ''
            })

            const checkDeriction = (ev) => {
                ev.preventDefault()
                if(firstX <= ev.changedTouches[0].clientX) {
                    moveX = ev.changedTouches[0].clientX - firstX
                } else if(firstX > ev.changedTouches[0].clientX) {
                    moveX = firstX - ev.changedTouches[0].clientX
                }

                if(firstY <= ev.changedTouches[0].clientY) {
                    moveY = ev.changedTouches[0].clientY - firstY
                } else if(firstY > ev.changedTouches[0].clientY) {
                    moveY = firstY - ev.changedTouches[0].clientY
                }

                if(moveX > moveY) {
                    swipeDirection = 'X'
                } else {
                    swipeDirection = 'Y'
                }
            }

            const doSwipe = (ev) => {
                ev.preventDefault()
                if(swipeDirection === 'X') {
                    if (firstX <= ev.changedTouches[0].clientX) {
                        moveX = ev.changedTouches[0].clientX - firstX
                        moveX = -1 * moveX
                    } else {
                        moveX = firstX - ev.changedTouches[0].clientX
                    }
                    swipeArea.scrollLeft += moveX
                    firstX = ev.changedTouches[0].clientX
                } else if(swipeDirection === 'Y') {
                    if (firstY <= ev.changedTouches[0].clientY) {
                        moveY = ev.changedTouches[0].clientY - firstY
                        moveY = -1 * moveY
                    } else {
                        moveY = firstY - ev.changedTouches[0].clientY
                    }
                    swipeArea.scrollTop += moveY
                    firstY = ev.changedTouches[0].clientY
                }
            }
        }
    },
    // 토스트 실행
    toastMsg: (options = {
        msg: String,
        className: String | undefined,
        delays: Number | undefined
    }) => {
        const floatTime = options.delays ? options.delays : 1500
        if(document.getElementById('toast') !== null) {
            document.getElementById('toast').remove()
        }
        let toastDOM = '<div id="toast"'
        if(typeof (options.className) !== 'undefined') {
            toastDOM += ' class="' + options.className + '"'
        }
        toastDOM += '>'
        toastDOM += '   <p>' + options.msg + '</p>'
        toastDOM += '<div>'
        document.body.insertAdjacentHTML('beforeend', toastDOM)
        const toastTag = document.getElementById('toast')
        setTimeout(() => {
            toastTag.classList.add('on')
            setTimeout(() => {
                toastTag.classList.remove('on')
                setTimeout(() => {
                    toastTag.remove()
                }, 300)
            }, floatTime)
        }, 50)
    },
    // 화면 얼럿 실행
    runAlert: (options = {
        title: String | undefined,
        msg: String,
        buttonText: String | undefined,
        isBottom: Boolean | undefined,
        isAppUse: Boolean | undefined
    }) => {
        const isAppUse = typeof (options.isAppUse) !== 'undefined' ? options.isAppUse : false
        const isBottom = options.isBottom ? options.isBottom : false
        const buttonText = options.buttonText ? options.buttonText : '확인'
        let alertTag = document.getElementById('alert')
        // 삭제 함수
        const removeAlert = () => {
            alertTag.classList.remove('on')
            alertTag.children[0].classList.remove('on')
            setTimeout(() => {
                alertTag.remove()
                document.body.style.overflow = ''
                // 네이티브 영역 제어
                if(isAppUse && isBottom) {
                    console.log('app and bottom sheet')
                }
            }, 300)
        }
        if(alertTag === null) {
            let makeDOM = '<div id="alert" role="dialog">'
            makeDOM += '   <div'
            if(isBottom) {
                makeDOM += ' class="bottomSheet"'
            }
            makeDOM += '>'
            if(typeof (options.title) !== 'undefined') {
                makeDOM += '      <h1>' + options.title + '</h1>'
            }
            makeDOM += '     <div>' + options.msg + '</div>'
            makeDOM += '     <div class="buttonArea">'
            makeDOM += '         <button type="button" class="pointBlue h50">' + buttonText + '</button>'
            makeDOM += '     </div>'
            makeDOM += '   <div>'
            makeDOM += '</div>'
            document.body.insertAdjacentHTML('beforeend', makeDOM)
            alertTag = document.getElementById('alert')
            document.body.style.overflow = 'hidden'
            alertTag.querySelector('.pointBlue').addEventListener('touchstart', removeAlert, false)
            setTimeout(() => {
                alertTag.classList.add('on')
                alertTag.children[0].classList.add('on')
            })
        } else {
            removeAlert()
        }
    },
    // 화면 컨펌 실행
    runConfirm: (options = {
        title: String | undefined,
        msg: String,
        buttonText: String | undefined,
        cancelText: String | undefined,
        isBottom: Boolean | undefined,
        isAppUse: Boolean | undefined
    }) => {
        return new Promise(function (resolve) {
            const isAppUse = typeof (options.isAppUse) !== 'undefined' ? options.isAppUse : false
            const isBottom = options.isBottom ? options.isBottom : false
            const buttonText = options.buttonText ? options.buttonText : '확인'
            const cancelText = options.cancelText ? options.cancelText : '취소'
            let confirmTag = document.getElementById('confirm')
            let returnValue = false
            // 삭제 함수
            const removeConfirm = () => {
                confirmTag.classList.remove('on')
                confirmTag.children[0].classList.remove('on')
                resolve(returnValue)
                setTimeout(() => {
                    confirmTag.remove()
                    document.body.style.overflow = ''
                    // 네이티브 영역 제어
                    if(isAppUse && isBottom) {
                        console.log('app and bottom sheet')
                    }
                }, 300)
            }
            // 리턴 함수
            const returnConfirm = () => {
                returnValue = true
                removeConfirm()
            }
            if(confirmTag === null) {
                // 네이티브 영역 체크
                if(isAppUse && isBottom) {
                    console.log('app and bottom sheet')
                }
                let makeDOM = '<div id="confirm" role="dialog">'
                makeDOM += '   <div'
                if(isBottom) {
                    makeDOM += ' class="bottomSheet"'
                }
                makeDOM += '>'
                if(typeof (options.title) !== 'undefined') {
                    makeDOM += '      <h1>' + options.title + '</h1>'
                }
                makeDOM += '     <div>' + options.msg + '</div>'
                makeDOM += '     <div class="buttonArea" data-buttonLength="2">'
                makeDOM += '         <button type="button" class="white h50">' + cancelText + '</button>'
                makeDOM += '         <button type="button" class="pointBlue h50">' + buttonText + '</button>'
                makeDOM += '     </div>'
                makeDOM += '   <div>'
                makeDOM += '</div>'
                document.body.insertAdjacentHTML('beforeend', makeDOM)
                confirmTag = document.getElementById('confirm')
                document.body.style.overflow = 'hidden'
                confirmTag.querySelector('.white').addEventListener('touchstart', removeConfirm, false)
                confirmTag.querySelector('.pointBlue').addEventListener('touchstart', returnConfirm, false)
                setTimeout(() => {
                    confirmTag.classList.add('on')
                    confirmTag.children[0].classList.add('on')
                })
            } else {
                returnConfirm()
            }
        })
    },
    // 금액대 콤마 추가 함수
    priceToCommas: (priceNumber) => {
        let replaceNumber = priceNumber
        if(replaceNumber !== '') {
            if(typeof (priceNumber) !== 'number') {
                replaceNumber = Number(priceNumber)
            }
            replaceNumber = replaceNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        } else {
            replaceNumber = ''
        }
        return replaceNumber
    },
    // 금액대 콤마 추가 함수
    phoneToDashes: (phoneNumber) => {
        return phoneNumber.replace(/[^0-9]/g, '').replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3').replace('--', '-')
        // 출처: https://cublip.tistory.com/326
    },
    // 현대차증권 계좌 대쉬 추가
    hmsecToDash: (accNumber) => {
        let replaceNumber = accNumber.toString()
        if (accNumber !== '' && replaceNumber.length > 3) {
            const preString = replaceNumber.slice(0, -2)
            const afterString = replaceNumber.slice(-2)
            replaceNumber = preString + '-' + afterString
        }
        return replaceNumber
    },
    // 숫자 한글로 (천단위 이상 한글변환)
    // 십단위 이상 일의 표기 여부 확정 후 수정 가능성 있음
    priceToKr: (priceNumber) => {
        let afterText = ''
        const priceString = priceNumber.toString()
        const stringCnt = priceString.length
        const krNumber = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
        const krSmallUnit = ['', '십', '백', '천']
        const krUnit = ['만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극']
        let preTestReturn = ''
        if(stringCnt !== 0) {
            if(stringCnt <= 4) {
                afterText = priceNumber.toString()
            } else {
                afterText = priceNumber.toString().slice(stringCnt - 4, stringCnt) // 천단위까지 숫자 표기
                const preText = priceNumber.toString().slice(0, -4) // 만단위 부터 앞자리 시작
                const preTextGroup = new Array(0)
                // 4자리 단위 뒤부터 배열 만들기
                for(let i = 0; i < preText.length; i++) {
                    const arrCnt = Math.floor(i / 4)
                    if(i % 4 === 0) {
                        preTextGroup[arrCnt] = new Array(0)
                    }
                    preTextGroup[arrCnt].unshift(preText[preText.length - 1 - i])
                }
                // 배열별 정리 시작
                for(const i in preTextGroup) {
                    const zeroCheck = Number(preTextGroup[i].join(''))
                    if(zeroCheck !== 0) {
                        preTestReturn = krUnit[i] + preTestReturn
                        for(const objNumber in preTextGroup[i]) {
                            const numbCount = preTextGroup[i].length
                            const checkNumber = Number(preTextGroup[i][numbCount - objNumber - 1])
                            if (checkNumber !== 0) {
                                preTestReturn = krNumber[checkNumber] + krSmallUnit[objNumber] + preTestReturn
                            }
                        }
                    }
                }
                afterText = Number(afterText)
                if(afterText === 0) {
                    afterText = ''
                }
            }
        }
        return preTestReturn + afterText
    },
    // 금융기관 코드 및 명칭 매칭
    codeToBank: (bankCode) => {
        const bankInfo = {
            korName: String,
            engCode: String
        }
        switch (bankCode) {
        // 은행
        case '002': bankInfo.korName = '산업은행'; bankInfo.engName = 'kdbBank'; break
        case '003': bankInfo.korName = '기업은행'; bankInfo.engName = 'ibkBank'; break
        case '004': bankInfo.korName = '국민은행'; bankInfo.engName = 'kbBank'; break
        case '007': bankInfo.korName = '수협은행'; bankInfo.engName = 'suhyupBank'; break
        case '011': bankInfo.korName = '농협은행'; bankInfo.engName = 'NHBank'; break
        case '012': bankInfo.korName = '지역 농축협'; bankInfo.engName = 'localNH'; break
        case '020': bankInfo.korName = '우리은행'; bankInfo.engName = 'wooriBank'; break
        case '023': bankInfo.korName = 'SC제일은행'; bankInfo.engName = 'scBank'; break
        case '027': bankInfo.korName = '한국씨티은행'; bankInfo.engName = 'cityBank'; break
        case '031': bankInfo.korName = '대구은행'; bankInfo.engName = 'dgBank'; break
        case '032': bankInfo.korName = '부산은행'; bankInfo.engName = 'busanBank'; break
        case '034': bankInfo.korName = '광주은행'; bankInfo.engName = 'kjBank'; break
        case '035': bankInfo.korName = '제주은행'; bankInfo.engName = 'jejuBank'; break
        case '037': bankInfo.korName = '전북은행'; bankInfo.engName = 'jbBank'; break
        case '039': bankInfo.korName = '경남은행'; bankInfo.engName = 'knBank'; break
        case '045': bankInfo.korName = '새마을금고'; bankInfo.engName = 'kfccBank'; break
        case '048': bankInfo.korName = '신협중앙회'; bankInfo.engName = 'cuBank'; break
        case '050': bankInfo.korName = '저축은행'; bankInfo.engName = 'fsBank'; break
        case '054': bankInfo.korName = 'HSBC은행'; bankInfo.engName = 'hsbcBank'; break
        case '055': bankInfo.korName = '도이치은행'; bankInfo.engName = 'deutscheBank'; break
        case '057': bankInfo.korName = 'JP모간체이스은행'; bankInfo.engName = 'jpmorganBank'; break
        case '058': bankInfo.korName = '미즈호은행'; bankInfo.engName = 'mizuhoBank'; break
        case '059': bankInfo.korName = '엠유에프지은행'; bankInfo.engName = 'mufgBank'; break
        case '060': bankInfo.korName = '뱅크오브아메리카'; bankInfo.engName = 'boa'; break
        case '061': bankInfo.korName = 'BNP파리바은행'; bankInfo.engName = 'bnpparibaBank'; break
        case '062': bankInfo.korName = '중국공상은행'; bankInfo.engName = 'icbc'; break
        case '063': bankInfo.korName = '중국은행'; bankInfo.engName = 'boc'; break
        case '064': bankInfo.korName = '산림조합중앙회'; bankInfo.engName = 'nfcfBank'; break
        case '067': bankInfo.korName = '중국건설은행'; bankInfo.engName = 'ccBank'; break
        case '071': bankInfo.korName = '우체국'; bankInfo.engName = 'epostBank'; break
        case '081': bankInfo.korName = '하나은행'; bankInfo.engName = 'hanaBank'; break
        case '088': bankInfo.korName = '신한은행'; bankInfo.engName = 'shinhanBank'; break
        case '089': bankInfo.korName = '케이뱅크'; bankInfo.engName = 'kBank'; break
        case '090': bankInfo.korName = '카카오뱅크'; bankInfo.engName = 'kakaoBank'; break
        case '092': bankInfo.korName = '토스뱅크'; bankInfo.engName = 'tossBank'; break
        // 증권
        case '209': bankInfo.korName = '유안타증권'; bankInfo.engName = 'myasset'; break
        case '218': bankInfo.korName = 'KB증권'; bankInfo.engName = 'kbsec'; break
        case '224': bankInfo.korName = 'BNK투자증권'; bankInfo.engName = 'bnkfn'; break
        case '225': bankInfo.korName = 'IBK투자증권'; bankInfo.engName = 'ibks'; break
        case '227': bankInfo.korName = '다올투자증권'; bankInfo.engName = 'daolsec'; break
        case '238': bankInfo.korName = '미래에셋증권'; bankInfo.engName = 'miraeasset'; break
        case '240': bankInfo.korName = '삼성증권'; bankInfo.engName = 'samsungpop'; break
        case '243': bankInfo.korName = '한국투자증권'; bankInfo.engName = 'truefriend'; break
        case '247': bankInfo.korName = 'NH투자증권'; bankInfo.engName = 'nhqv'; break
        case '261': bankInfo.korName = '교보증권'; bankInfo.engName = 'iprovest'; break
        case '262': bankInfo.korName = '하이투자증권'; bankInfo.engName = 'hiib'; break
        case '264': bankInfo.korName = '키움증권'; bankInfo.engName = 'kiwoom'; break
        case '265': bankInfo.korName = '이베스트투자증권'; bankInfo.engName = 'ebestsec'; break
        case '266': bankInfo.korName = 'SK증권'; bankInfo.engName = 'sks'; break
        case '267': bankInfo.korName = '대신증권'; bankInfo.engName = 'daishin'; break
        case '269': bankInfo.korName = '한화투자증권'; bankInfo.engName = 'hanwhawm'; break
        case '270': bankInfo.korName = '하나증권'; bankInfo.engName = 'hanaw'; break
        case '271': bankInfo.korName = '토스증권'; bankInfo.engName = 'tossinvest'; break
        case '278': bankInfo.korName = '신한투자증권'; bankInfo.engName = 'shinhaninvest'; break
        case '279': bankInfo.korName = 'DB금융투자'; bankInfo.engName = 'dbfi'; break
        case '280': bankInfo.korName = '유진투자증권'; bankInfo.engName = 'eugenefn'; break
        case '287': bankInfo.korName = '메리츠증권'; bankInfo.engName = 'meritz'; break
        case '288': bankInfo.korName = '카카오페이증권'; bankInfo.engName = 'kakaopaysec'; break
        case '290': bankInfo.korName = '부국증권'; bankInfo.engName = 'bookook'; break
        case '291': bankInfo.korName = '신영증권'; bankInfo.engName = 'shinyoung'; break
        case '292': bankInfo.korName = '케이프투자증권'; bankInfo.engName = 'capefn'; break
        case '294': bankInfo.korName = '한국포스증권'; bankInfo.engName = 'fosskorea'; break
        case '263': bankInfo.korName = '현대차증권'; bankInfo.engName = 'hmsec'; break
        case '999': bankInfo.korName = '휴대폰'; bankInfo.engName = 'celphone'; break
        default: bankInfo.korName = '현대차증권'; bankInfo.engName = 'hmsec'
        }
        return bankInfo
    },
    // 계좌종류 코드로 명칭 리턴 (변경예정)
    codeToAccType: (code) => {
        let typeName = ''
        switch (code) {
        // 00은 일반으로 명칭 리턴 없음
        case '00': typeName = ''; break
        case '01': typeName = '위탁'; break
        case '02': typeName = 'CMA'; break
        case '03': typeName = '연금저축'; break
        case '04': typeName = '임시타입1'; break
        case '05': typeName = '임시타입2'; break
        default: typeName = ''
        }
        return typeName
    },
    // 모달 시작시 클래스 부여
    modalStart: (runID, endRun) => {
        document.body.style.overflow = 'hidden'
        const targetEl = document.getElementById(runID)
        setTimeout(() => {
            targetEl.classList.add('on')
            targetEl.children[0].classList.add('on')
            if(typeof endRun !== 'undefined') {
                if(targetEl.getAttribute('role') === 'dialog') {
                    targetEl.addEventListener('click', (ev) => {
                        if(ev.target === targetEl) {
                            endRun()
                        }
                    })
                }
            }
        })
    },
    // 모달종료시 클래스 삭제
    modalEnd: (runID) => {
        document.body.style.overflow = ''
        document.getElementById(runID).classList.remove('on')
        document.getElementById(runID).children[0].classList.remove('on')
    },
    // 한국식 날짜 표기
    dateToCommas: (inputDate) => {
        const year = inputDate.getFullYear()
        let month = inputDate.getMonth() + 1
        if(month < 10) {
            month = '0' + month
        }
        let date = inputDate.getDate()
        if(date < 10) {
            date = '0' + date
        }
        return year + '.' + month + '.' + date
    },
    // 콤마 날짜(달단위) 표기
    monthToCommas: (inputDate) => {
        const year = inputDate.getFullYear()
        let month = inputDate.getMonth() + 1
        if(month < 10) {
            month = '0' + month
        }
        let date = inputDate.getDate()
        if(date < 10) {
            date = '0' + date
        }
        return year + '.' + month
    },
    // 한국식 날짜 표기
    dateToKr: (inputDate) => {
        const year = inputDate.getFullYear()
        const month = inputDate.getMonth() + 1
        const date = inputDate.getDate()
        const weekDayArr = ['일', '월', '화', '수', '목', '금', '토']
        const weekDay = weekDayArr[inputDate.getDay()]
        return year + '년 ' + month + '월 ' + date + '일 (' + weekDay + ')'
    },
    // 인풋 컨트롤 버튼 체크
    checkButton: (ev) => {
        let buttons = ev.target.nextElementSibling
        if(!buttons.classList.contains('resetInput')) {
            buttons = ev.target.nextElementSibling.nextElementSibling
        }
        if((ev.target.value !== '' || ev.target.value !== null) && !ev.target.classList.contains('errBox')) {
            buttons.style.display = 'block'
        } else {
            buttons.style.display = 'none'
        }
    },
    // 인풋 초기화 버튼
    resetInput: (targetID, ev) => {
        const resetTarget = document.getElementById(targetID)
        resetTarget.value = null
        ev.target.style.display = 'none'
    },
    // 오픈뱅킹 계좌 조회 에러코드 메세지 처리
    codeToOBAccErr: (errCode) => {
        const returnMsg = {
            text: '', // 에러사유
            todo: '' // 대응안내
        }
        switch (errCode) {
        // 은행
        case '470': returnMsg.text = '개인정보노출자 계좌'; returnMsg.text = '해당지점 연락요망'; break
        case '471': returnMsg.text = '전자금융거래 제한계좌'; returnMsg.text = '해당지점 연락요망'; break
        case '472': returnMsg.text = '고객요청 제한계좌'; returnMsg.text = '해당 지점 연락요망'; break
        case '473': returnMsg.text = '명의인변경 계좌 또는 상속계좌'; returnMsg.text = '해당 지점 연락요망'; break
        case '474': returnMsg.text = '비밀번호 잠김 계좌'; returnMsg.text = '해당 지점 연락요망'; break
        case '475': returnMsg.text = '신규계좌 일시제한'; returnMsg.text = '해당 지점 연락요망'; break
        case '476': returnMsg.text = '파산관재인 계좌'; returnMsg.text = '해당 지점 연락요망'; break
        case '477': returnMsg.text = '사용자 단말기 정보 불일치'; returnMsg.text = '해당 지점 연락요망'; break
        default: ;
        }
        return returnMsg
    },
    // 오픈뱅킹 거래 응답코드 메세지 처리
    codeToOBTrans: (resCode) => {
        const returnMsg = {
            text: '', // 일반 구분메세지
            moreMsg: false // response에서 추가 메세지 노출 필요여부
        }
        switch (resCode) {
        case 'A0000': returnMsg.text = '처리 성공'; returnMsg.moreMsg = false; break
        case 'A0001': returnMsg.text = '처리 중'; returnMsg.moreMsg = false; break
        case 'A0002': returnMsg.text = '참가은행 에러'; returnMsg.moreMsg = false; break
        case 'A0003': returnMsg.text = '내부 처리 에러'; returnMsg.moreMsg = false; break
        case 'A0004': returnMsg.text = '요청전문 포맷 에러'; returnMsg.moreMsg = false; break
        case 'A0005': returnMsg.text = '등록 데이터 에러'; returnMsg.moreMsg = false; break
        case 'A0006': returnMsg.text = '전문 변환 에러'; returnMsg.moreMsg = false; break
        case 'A0007': returnMsg.text = '처리시간 초과 에러'; returnMsg.moreMsg = false; break
        case 'A0008': returnMsg.text = '중복거래 에러'; returnMsg.moreMsg = false; break
        case 'A0009': returnMsg.text = 'API 세부업무 처리실패'; returnMsg.moreMsg = true; break
        case 'A0010': returnMsg.text = '이용기관 APP 정보 확인 실패'; returnMsg.moreMsg = false; break
        case 'A0011': returnMsg.text = '이용기관 API 사용권한 없음'; returnMsg.moreMsg = false; break
        case 'A0012': returnMsg.text = 'API 정보 확인 실패'; returnMsg.moreMsg = false; break
        case 'A0013': returnMsg.text = '이용기관 서비스 사용 불가'; returnMsg.moreMsg = false; break
        case 'A0014': returnMsg.text = '탈퇴 회원'; returnMsg.moreMsg = false; break
        case 'A0015': returnMsg.text = '시뮬레이터 응답전문 존재하지 않음'; returnMsg.moreMsg = false; break
        case 'A0016': returnMsg.text = '내부 전문 송신 실패'; returnMsg.moreMsg = false; break
        case 'A0017': returnMsg.text = '참가은행 응답전문 TIMEOUT'; returnMsg.moreMsg = false; break
        case 'A0018': returnMsg.text = '거래내역 없음'; returnMsg.moreMsg = false; break
        case 'A0019': returnMsg.text = '사용자탈퇴 처리중인 계좌'; returnMsg.moreMsg = false; break
        case 'A0020': returnMsg.text = '조회 가능시간 아님'; returnMsg.moreMsg = false; break
        case 'A0021': returnMsg.text = '오픈뱅킹센터 지정 에러메시지'; returnMsg.moreMsg = true; break
        case 'A0101': returnMsg.text = '이용기관 입금이체 한도 초과(일 한도)'; returnMsg.moreMsg = false; break
        case 'A0102': returnMsg.text = '이용기관 입금이체 한도 초과(월 한도)'; returnMsg.moreMsg = false; break
        case 'A0103': returnMsg.text = '이용기관 출금이체 한도 초과(일 한도)'; returnMsg.moreMsg = false; break
        case 'A0104': returnMsg.text = '이용기관 출금이체 한도 초과(월 한도)'; returnMsg.moreMsg = false; break
        case 'A0105': returnMsg.text = '이용기관 출금이체 한도 초과(건당 한도)'; returnMsg.moreMsg = false; break
        case 'A0106': returnMsg.text = '이용기관 입금이체 한도 초과(건당 한도)'; returnMsg.moreMsg = false; break
        case 'A0111': returnMsg.text = '사용자 출금이체 한도 초과(건당 한도)'; returnMsg.moreMsg = false; break
        case 'A0112': returnMsg.text = '사용자 출금이체 한도 초과(일 한도)'; returnMsg.moreMsg = false; break
        case 'A0301': returnMsg.text = '접근 권한 없음'; returnMsg.moreMsg = false; break
        case 'A0302': returnMsg.text = '참가은행 API 이용권한 없음'; returnMsg.moreMsg = false; break
        case 'A0303': returnMsg.text = '등록된 이용기관 수수료 정책 없음'; returnMsg.moreMsg = false; break
        case 'A0304': returnMsg.text = '핀테크이용번호 정보 불일치'; returnMsg.moreMsg = false; break
        case 'A0305': returnMsg.text = '제3자정보제공동의 미완료'; returnMsg.moreMsg = false; break
        case 'A0306': returnMsg.text = '출금동의 미완료'; returnMsg.moreMsg = false; break
        case 'A0307': returnMsg.text = '이체암호문구 불일치'; returnMsg.moreMsg = false; break
        case 'A0308': returnMsg.text = '처리대행비용 할인대상 여부 없음'; returnMsg.moreMsg = false; break
        case 'A0309': returnMsg.text = '등록된 이용기관 수수료 정보 없음'; returnMsg.moreMsg = false; break
        case 'A0310': returnMsg.text = '이체 내역 없음'; returnMsg.moreMsg = false; break
        case 'A0311': returnMsg.text = '등록된 처리대행 수수료 정보 없음'; returnMsg.moreMsg = false; break
        case 'A0312': returnMsg.text = '예금주명 불일치'; returnMsg.moreMsg = false; break
        case 'A0313': returnMsg.text = '사용자 불일치'; returnMsg.moreMsg = false; break
        case 'A0314': returnMsg.text = '계좌이동 중'; returnMsg.moreMsg = false; break
        case 'A0315': returnMsg.text = '농협중앙회(단위농축협) 계좌번호를 입력했을 경우 오류 처리'; returnMsg.moreMsg = false; break
        case 'A0316': returnMsg.text = '금융(거래)정보 제3자제공동의 만료'; returnMsg.moreMsg = false; break
        case 'A0317': returnMsg.text = '미등록 수취계좌'; returnMsg.moreMsg = false; break
        case 'A0318': returnMsg.text = '수취계좌 사업자등록번호 상이'; returnMsg.moreMsg = false; break
        case 'A0319': returnMsg.text = '출금동의 만료'; returnMsg.moreMsg = false; break
        case 'A0320': returnMsg.text = '실명번호(전체) 조회 권한 없음'; returnMsg.moreMsg = false; break
        case 'A0321': returnMsg.text = '예금주 실명번호 구분코드와 실명번호의 형식(자리수) 불일치'; returnMsg.moreMsg = false; break
        case 'A0322': returnMsg.text = '미등록된 이용기관 약정 계좌/계정'; returnMsg.moreMsg = false; break
        case 'A0323': returnMsg.text = '이용기관에 등록된 사용자 계좌 아님'; returnMsg.moreMsg = false; break
        case 'A0324': returnMsg.text = '기등록된 조회서비스용 사용자 계좌'; returnMsg.moreMsg = false; break
        case 'A0325': returnMsg.text = '기등록된 출금서비스용 사용자 계좌'; returnMsg.moreMsg = false; break
        case 'A0326': returnMsg.text = '은행거래고유번호 중복'; returnMsg.moreMsg = false; break
        case 'A0327': returnMsg.text = '출금한도 미협의 은행 (이용기관 문의)'; returnMsg.moreMsg = false; break
        }
        return returnMsg
    },
    dateSet: (insertDate) => {
        let fixDate = insertDate.toString()
        fixDate = fixDate.replace(/\./g, '')
        const year = Number(fixDate.substr(0, 4))
        const month = Number(fixDate.substr(4, 2)) - 1
        const date = Number(fixDate.substr(6, 2))
        return new Date(year, month, date)
    },
    // 툴팁보기 및 종료 bind
    viewTip: (ev) => {
        const hideTip = () => {
            ev.target.classList.remove('on')
            setTimeout(() => {
                ev.target.children[0].style.display = ''
            }, 200)
            document.removeEventListener('click', hideTip)
        }
        if(!ev.target.classList.contains('on')) {
            ev.target.children[0].style.display = 'block'
            ev.target.classList.add('on')
            setTimeout(() => {
                document.addEventListener('click', hideTip)
            })
        }
    },
    // 일부영역 확장처리
    wideOpen: (ev, targetID) => {
        const targetEl = document.getElementById(targetID)
        const firstY = ev.changedTouches[0].clientY
        const runWide = (endEv) => {
            const lastY = endEv.changedTouches[0].clientY
            if(targetEl.classList.contains('open') && (lastY - firstY) > 50) {
                targetEl.classList.remove('open')
            } else if(!targetEl.classList.contains('open') && (firstY - lastY) > 50) {
                targetEl.classList.add('open')
            }

            targetEl.removeEventListener('touchend', runWide)
        }
        targetEl.addEventListener('touchend', runWide)
    },
    // app UI 변경
    changeAppUI: (runAppVal) => {
        // 명령어 정리
        // hideQmenu(퀵메뉴 숨김)
        // hideAll(헤더, 퀵메뉴 숨김)
        // hideHeader(헤더 숨김)
        const wrapArea = document.getElementById('hmsec')
        const quickMenuHeight = 46
        const contentHeight = window.innerHeight
        const menuControl = JSON.stringify({
            messageId: 'controlFrame',
            messageType: 'command',
            control: runAppVal
        })
        if(methods.checkMobile() !== 'web') {
            switch (runAppVal) {
            case 'showAll': wrapArea.style.height = (contentHeight - quickMenuHeight) + 'px'; break // 타이틀, 퀵메뉴 표시
            case 'hideAll': wrapArea.style.height = contentHeight + 'px'; break // 타이틀, 퀵메뉴 숨김
            case 'showTitle': break // 타이틀 표시
            case 'hideTitle': break // 타이틀 숨김
            case 'showQmenu': wrapArea.style.height = (contentHeight - quickMenuHeight) + 'px'; break // 퀵메뉴 표시
            case 'hideQmenu': wrapArea.style.height = contentHeight + 'px'; break // 퀵메뉴 숨기기
            }
        }
        if(methods.checkMobile() === 'iPhone') {
            window.webkitURL.messageHandlers.iOSMTS.postMessage(menuControl)
        } else if(methods.checkMobile() === 'android') {
            window.AndroidMTS.postMessage(menuControl)
        }
    },
    // 상품 상세 분류 코드 > text, class 리턴
    fundCodeToText: (type, value) => {
        const returnObj = {
            text: '',
            class: ''
        }
        // 상품종류
        if(type === 'kinds') {
            switch (value) {
            case 'savings': returnObj.text = '예적금'; returnObj.class = 'red'; break
            case 'RP': returnObj.text = 'RP'; returnObj.class = 'yellow'; break
            case 'promissory': returnObj.text = '어음'; returnObj.class = 'purple'; break
            case 'insurance': returnObj.text = '원리금보장형보험'; returnObj.class = 'blue'; break
            default: break
            }
        } else if(type === 'dueDay') {
            switch (value) {
            case '3': returnObj.text = '3개월'; break
            case '6': returnObj.text = '6개월'; break
            case '12': returnObj.text = '1년'; break
            case '24': returnObj.text = '2년'; break
            case '36': returnObj.text = '3년'; break
            case '60': returnObj.text = '5년'; break
            default: break
            }
        } else if(type === 'institute') {
            switch (value) {
            case 'DBInsurance': returnObj.text = 'DB손해보험'; break
            case 'NHBank': returnObj.text = 'NH은행'; break
            case 'OSBBank': returnObj.text = 'OSB저축은행'; break
            case 'SBIBank': returnObj.text = 'SBI저축은행'; break
            case 'SCBank': returnObj.text = 'SC제일은행'; break
            case 'midas': returnObj.text = '마이다스자산'; break
            default: break
            }
        } else if(type === 'fundType') {
            switch (value) {
            case 'stock': returnObj.text = '주식형'; break
            case 'stockMix': returnObj.text = '주식혼합형'; break
            case 'bond': returnObj.text = '채권형'; break
            case 'bondMix': returnObj.text = '채권혼합형'; break
            case 'fofs': returnObj.text = '재간접형'; break
            case 'mmf': returnObj.text = 'MMF'; break
            case 'derivative': returnObj.text = '주식파생형'; break
            case 'specialAsset': returnObj.text = '특별자산파생'; break
            default: break
            }
        } else if(type === 'riskGrade') {
            switch (value) {
            case '6': returnObj.text = '매우 높은 위험'; returnObj.class = 'red'; break
            case '5': returnObj.text = '높은 위험'; returnObj.class = 'orange'; break
            case '4': returnObj.text = '다소 높은 위험'; returnObj.class = 'yellow'; break
            case '3': returnObj.text = '보통 위험'; returnObj.class = 'lightBlue'; break
            case '2': returnObj.text = '낮은 위험'; returnObj.class = 'blue'; break
            case '1': returnObj.text = '매우 낮은 위험'; returnObj.class = 'green'; break
            default: break
            }
        } else if(type === 'volumeArr') {
            switch (value) {
            case 'u50': returnObj.text = '50억 미만'; break
            case 'u100': returnObj.text = '50억~100억 미만'; break
            case 'u500': returnObj.text = '100억~500억 미만'; break
            case 'u1000': returnObj.text = '500억~1000억 미만'; break
            case 'u5000': returnObj.text = '1000억~5000억 미만'; break
            case 'o5000': returnObj.text = '5000억 이상'; break
            default: break
            }
        } else if(type === 'manager') {
            switch (value) {
            case 'koreaValue': returnObj.text = '한국밸류자산'; break
            case 'goldenBridge': returnObj.text = '골드브릿지자산'; break
            case 'kyoboitm': returnObj.text = '교보악사자산'; break
            case 'daol': returnObj.text = '다올자산'; break
            case 'daishin': returnObj.text = '대신자산'; break
            case 'lazard': returnObj.text = '라자드코리아자산'; break
            case 'midas': returnObj.text = '마이다스자산'; break
            default: break
            }
        }
        return returnObj
    }
}
