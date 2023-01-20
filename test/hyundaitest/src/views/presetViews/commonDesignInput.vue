<template>
<h1>공통디자인 - input</h1>
<!-- 공통디자인 input -->
<h3>기본</h3>
<label>
    <input type="text" placeholder="힌트입니다.">
    <button type="button">x</button>
</label>
<label>
    <input type="text" class="h50" placeholder="힌트입니다.">
    <button type="button">x</button>
</label>
<h3>disabled</h3>
<label>
    <input type="text" disabled value="데이터">
    <button type="button">x</button>
</label>
<label>
    <input type="text" class="h50" disabled value="데이터">
    <button type="button">x</button>
</label>
<h3>readonly</h3>
<label>
    <input type="text" readonly="readonly" value="데이터">
    <button type="button">x</button>
</label>
<label>
    <input type="text" class="h50" readonly="readonly" value="데이터">
    <button type="button">x</button>
</label>
<h3>에러</h3>
<label class="errBox">
    <input type="text" class="err">
    <button type="button">x</button>
</label>
<label class="errBox">
    <input type="text" class="err h50">
    <button type="button">x</button>
</label>
<hr>
<label class="hasTxt">
    <h3>연락처</h3>
    <input type="text" placeholder="힌트입니다.">
    <button type="button">x</button>
</label>
<label class="hasTxt">
    <h3>연락처</h3>
    <input type="text" class="h50" placeholder="힌트입니다.">
    <button type="button">x</button>
</label>
<!--// 공통디자인 input -->
<hr>
<h1>공통디자인 - 캘린더</h1>
<h2>캘린더 기본</h2>
<!-- data-dateNum 인풋 개수 -->
<label for="" class="cal" data-dateNum="2">
    <input type="text" value="2022.08.09">
    <strong></strong>
    <span>~</span>
    <input type="text" value="2022.12.31">
    <strong></strong>
</label>
<label for="" class="cal" data-dateNum="1">
    <input type="text" value="2022.08.09">
    <strong></strong>
</label>
<label for="" class="cal disable" data-dateNum="1">
    <input type="text" value="2022.08.09" disabled>
    <strong></strong>
</label>
<h2>캘린더 사이즈 50</h2>
<label for="" class="cal" data-dateNum="2">
    <input type="text" value="2022.08.09" class="h50">
    <strong></strong>
    <span>~</span>
    <input type="text" value="2022.12.31" class="h50">
    <strong></strong>
</label>
<label for="" class="cal" data-dateNum="1">
    <input type="text" value="2022.08.09" class="h50">
    <strong></strong>
</label>
<label for="" class="cal disable" data-dateNum="1">
    <input type="text" value="2022.08.09" class="h50">
    <strong></strong>
</label>
<hr>
<h1>공통디자인 - 서치</h1>
<label for="" class="search">
    <input type="search" placeholder="검색">
    <button></button>
</label>
<label for="" class="search">
    <input type="search" placeholder="검색" disabled>
    <button></button>
</label>
<label for="" class="search">
    <input type="search" placeholder="검색" class="h50">
    <button></button>
</label>
<label for="" class="search">
    <input type="search" placeholder="검색" class="h50" disabled>
    <button></button>
</label>
</template>
