<template>
    <!-- 납부자자동이체 -->
    <section>
        <!-- 계좌정보-->
        <div class="hasOne">
            <!--pw 입력여부 : 클래스 off(미입력) 체크  -->
            <button class="off"><span>자물쇠를 선택하여 비밀번호를 입력해 주세요.</span></button>
            <button>
                <!-- 계좌번호 -->
                <p>현대차 00000000-00</p>
                <!-- 계좌 금액정보 -->
                <h2>12,988,982원</h2>
            </button>
        </div>
        <!-- 탭메뉴 -->
        <div class="tabStyle04">
            <ul data-tabList="2">
                <li class="on">
                    <a href="javascript:;"
                        draggable="false">
                        등록내역
                    </a>
                </li>
                <li>
                    <a href="javascript:;"
                        draggable="false">
                        해지내역
                    </a>
                </li>
            </ul>
        </div>
        <!-- 내역리스트 -->
        <!-- 등록내역 -->
        <ul>
            <!-- noList -->
            <li class="noList">
                <span></span>
                <p>납부자 자동이체 등록<br>내역이 없습니다.</p>
            </li>
            <li>
                <!-- 계좌정보 -->
                <h1>카카오뱅크 123412341234  홍길동</h1>
                <!-- 상세정보 -->
                <ul>
                    <li>
                        <span>이체금액</span>
                        <p>1,000,000원</p>
                    </li>
                    <li>
                        <span>수수료</span>
                        <p>300원</p>
                    </li>
                    <li>
                        <span>이체일</span>
                        <p>매월01일</p>
                    </li>
                    <li>
                        <span>이체기간</span>
                        <p>2018.01 ~ 2022.05</p>
                    </li>
                </ul>
                <button>해지하기</button>
            </li>
        </ul>
        <!-- 해지내역 -->
        <ul>
            <!-- noList -->
            <li class="noList">
                <span></span>
                <p>납부자 자동이체 해지<br>내역이 없습니다.</p>
            </li>
            <li>
                <!-- 해지일?? -->
                <p><span>해지</span>2022.07.25</p>
                <!-- 계좌정보 -->
                <h1>카카오뱅크 123412341234  홍길동</h1>
                <!-- 상세정보 -->
                <ul>
                    <li>
                        <span>이체금액</span>
                        <p>1,000,000원</p>
                    </li>
                    <li>
                        <span>수수료</span>
                        <p>300원</p>
                    </li>
                    <li>
                        <span>이체일</span>
                        <p>매월01일</p>
                    </li>
                    <li>
                        <span>이체기간</span>
                        <p>2018.01 ~ 2022.05</p>
                    </li>
                    <li>
                        <span>해지일</span>
                        <p>2018.01</p>
                    </li>
                    <li>
                        <span>받는통장 메모</span>
                        <p>홍길동</p>
                    </li>
                    <li>
                        <span>내통장 메모</span>
                        <p>홍길동</p>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
</template>