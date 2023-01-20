<template>

<h1>공통디자인-check / radio / toggle</h1>
<h2>체크박스</h2>
<form action="">
    <div>
        <label for="check01">
            <input type="checkbox" id="check01">
            <div>가나다라마바사</div>
        </label>
        <label for="check02">
            <input type="checkbox" id="check02">
            <div>가나다라</div>
        </label>
        <label for="check03">
            <input type="checkbox" id="check03">
            <div>하하하임시</div>
        </label>
        <label for="check05">
            <input type="checkbox" id="check05" disabled>
            <div>하시</div>
        </label>
        <label for="check06">
            <input type="checkbox" id="check06" checked disabled>
            <div>임시</div>
        </label>
    </div>
</form>
<h2>체크박스-약관</h2>
<!-- 약관동의용 체크박스는 p태그 사용 -->
<form action="">
    <div>
        <label for="check1">
            <input type="checkbox" id="check1">
            <p>확인</p>
        </label>
        <label for="check2">
            <input type="checkbox" id="check2">
            <p>확인</p>
        </label>
        <label for="check3">
            <input type="checkbox" id="check3">
            <p>확인</p>
        </label>
        <label for="check4">
            <input type="checkbox" id="check4" disabled>
            <p>확인</p>
        </label>
        <label for="check5">
            <input type="checkbox" id="check5" checked disabled>
            <p>확인</p>
        </label>
    </div>
</form>
<h2>라디오</h2>
<form action="">
    <div>
        <label for="radio01">
            <input type="radio" id="radio01" name="1">
            <div>다라마바사</div>
        </label>
        <label for="radio02">
            <input type="radio" id="radio02" name="1">
            <div>가나다라</div>
        </label>
        <label for="radio03">
            <input type="radio" id="radio03" name="1">
            <div>하하하임시</div>
        </label>
        <label for="radio04">
            <input type="radio" id="radio04" name="1" disabled>
            <div>하하하임시</div>
        </label>
        <label for="radio05">
            <input type="radio" id="radio05" name="3" checked disabled>
            <div>하하하임시</div>
        </label>
    </div>
</form>
<h3>라디오 - tab</h3>
<form action="">
    <div class="tab">
        <label for="01">
            <input type="radio" id="01" name="2">
            <div>전체</div>
        </label>
        <label for="02">
            <input type="radio" id="02" name="2">
            <div>코스피</div>
        </label>
        <label for="03">
            <input type="radio" id="03" name="2">
            <div>코스닥</div>
        </label>
    </div>
</form>
<h2>스위치</h2>
<!-- label > div .switch 부여 -->
<form action="">
    <div>
        <label for="sw">
            <span>nomal</span>
            <input type="checkbox" id="sw">
            <div class="switch"></div>
        </label>
        <label for="sw2">
            <span>disable</span>
            <input type="checkbox" id="sw2" disabled>
            <div class="switch"></div>
        </label>
        <label for="sw3">
            <span>checkde disable</span>
            <input type="checkbox" id="sw3" checked disabled>
            <div class="switch"></div>
        </label>
    </div>
</form>
</template>
