<template>
    <!-- 입출금내역 -->
    <section>
        <!-- 계좌정보-->
        <div class="hasOne">
            <!--pw 입력여부 : 클래스 off(미입력) 체크  -->
            <button class="off">비밀번호입력</button>
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
                        전체
                    </a>
                </li>
                <li>
                    <a href="javascript:;"
                        draggable="false">
                        연락처
                    </a>
                </li>
            </ul>
        </div>
        <!-- 검색설정 -->
        <form action="">
            <div>
                <button class="h50 white">전체, 1개월</button>
                <label for="" class="search">
                    <input type="search" placeholder="검색" class="h50">
                    <button></button>
                </label>
            </div>
        </form>
        <!-- 입출금내역 -->
        <ul >
            <li class="noList">
                <span></span>
                <p>입출금 내역이 없습니다.</p>
            </li>
            <!-- 날짜별 내역-->
            <li>
                <h1>2022.07.15</h1>
                <!-- 해당날짜 입출금 내역 list-->
                <ul>
                    <li>
                        <!-- 거래시간 & 이체상태-->
                        <div>
                            <span>18:28:23 </span>
                            <!-- 당사이체 출금일 경우만 노출 -->
                            <!-- <button>이체확인증</button> -->
                        </div>
                        <!-- 이름 & 금액정보 -->
                        <h2>
                            <span>홍길동</span>
                            <strong>출금 645,000,000원</strong>
                        </h2>
                        <!-- 잔액 -->
                        <p>
                            <span>이체출금</span>
                            <strong>잔액 2,090,081원</strong>
                        </p>
                        <!-- 수수료 - 무료일때도 노출 -->
                        <p>
                            <span>수수료 0원</span>
                            <strong>국민 0000000000</strong>
                        </p>
                    </li>
                    <!-- 입금-->
                    <li>
                        <!-- 거래시간-->
                        <div>
                            <span>18:28:23 </span>
                        </div>
                        <!-- 이름 & 금액정보 -->
                        <h2>
                            <span>홍길동</span>
                            <strong>입금 645,000,000원</strong>
                        </h2>
                        <!-- 잔액 -->
                        <p>
                            <span>이체출금</span>
                            <strong>잔액 2,090,081원</strong>
                        </p>
                    </li>
                </ul>
            </li>
            <!-- 연락처 날짜별 내역 -->
            <li>
                <h1>2022.07.10</h1>
                <ul>
                    <!-- 출금 -->
                    <li>
                        <!-- 거래시간 & 이체상태-->
                        <div>
                            <span>18:28:23 </span>
                            <!-- 당사이체 출금일 경우만 노출 -->
                            <!-- <button>이체확인증</button> -->
                            <!-- 연락처 출금대기일 경우만 노출-->
                            <button>이체대기</button>
                        </div>
                        <!-- 이름 & 금액정보 -->
                        <h2>
                            <span>홍길동</span>
                            <strong>출금 645,000,000원</strong>
                        </h2>
                        <!-- 잔액 -->
                        <p>
                            <span>연락처이체</span>
                            <strong>잔액 2,090,081원</strong>
                        </p>
                        <!-- 수수료 - 무료일때도 노출 -->
                        <p>
                            <span>수수료 500원</span>
                            <strong>홍길동 0106876871</strong>
                        </p>
                    </li>
                    <li>
                        <!-- 거래시간 & 이체상태-->
                        <div>
                            <span>18:28:23 </span>
                            <!-- 당사이체 출금일 경우만 노출 -->
                            <button>이체확인증</button>
                            <!-- 연락처 출금대기일 경우만 노출-->
                            <!-- <button>이체대기</button> -->
                        </div>
                        <!-- 이름 & 금액정보 -->
                        <h2>
                            <span>홍길동</span>
                            <strong>출금 645,000,000원</strong>
                        </h2>
                        <!-- 잔액 -->
                        <p>
                            <span>연락처이체</span>
                            <strong>잔액 2,090,081원</strong>
                        </p>
                        <!-- 수수료 - 무료일때도 노출 -->
                        <p>
                            <span>수수료 500원</span>
                            <strong>홍길동 0106876871</strong>
                        </p>
                    </li>
                    <!-- 입금 -->
                    <li>
                        <!-- 거래시간-->
                        <div>
                            <span>18:28:23 </span>
                        </div>
                        <!-- 이름 & 금액정보 -->
                        <h2>
                            <span>홍길동</span>
                            <strong>입금 645,000,000원</strong>
                        </h2>
                        <!-- 잔액 -->
                        <p>
                            <span>연락처이체환불</span>
                            <strong>잔액 2,090,081원</strong>
                        </p>
                        <!-- 수수료 - 연락처내역은 입출금 모두 수수료 노출 -->
                        <p>
                            <span>수수료 500원</span>
                            <strong>홍길동 0106876871</strong>
                        </p>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
</template>