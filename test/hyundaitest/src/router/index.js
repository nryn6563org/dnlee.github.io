import { createRouter, createWebHistory } from 'vue-router'
// 메뉴페이지 - 추후 앱용 컴포넌트로 활용예정
import pageList from '../views/pageList.vue'
import presetPage from '../views/presetPage.vue'
import input from '../views/presetViews/commonDesignInput.vue'
// 뱅킹 > 이체 > 단일이체
import accountTransfer from '../views/bangking/accountTransfer.vue'
import accountTransferMain from '../views/bangking/accountTransfer-main.vue'
import accountTransferEnter from '../views/bangking/accountTransfer-enter.vue'
import accountTransferConfirm from '../views/bangking/accountTransfer-confirm.vue'
import accountOpenTransferConfirm from '../views/bangking/accountOpenTransfer-confirm.vue'
import accountTransferResult from '../views/bangking/accountTransfer-result.vue'
import accountOpenTransferResult from '../views/bangking/accountOpenTransfer-result.vue'
// 뱅킹 > 이체 > 다계좌이체 - parent는 accountTransfer
import accountMultiTransferMain from '../views/bangking/accountMultiTransfer-main.vue'
import accountMultiTransferEnter from '../views/bangking/accountMultiTransfer-enter.vue'
import accountMultiTransferConfirm from '../views/bangking/accountMultiTransfer-confirm.vue'
import accountMultiTransferResult from '../views/bangking/accountMultiTransfer-result.vue'
// 뱅킹 > 이체관리
import transManagereserved from '../views/bangking/transManage-reserved.vue'
import transManageDelayed from '../views/bangking/transManage-delayed.vue'
import transManageBankConnect from '../views/bangking/transManage-bankConnect.vue'
import transManageBankConnectMain from '../views/bangking/transManage-bankConnect-main.vue'
import transManageBankConnectConfirm from '../views/bangking/transManage-bankConnect-confirm.vue'
import transManageBankConnectResult from '../views/bangking/transManage-bankConnect-result.vue'
import transManageEasyTransfer from '../views/bangking/transManage-easyTransfer.vue'
import transManageSaveAcc from '../views/bangking/transManage-saveAcc.vue'
import transManageUnusedAccount from '../views/bangking/transManage-unusedAccount.vue'
// 뱅킹 > 오픈뱅킹
import openBankingJoin from '../views/bangking/openBankingJoin.vue'
import openBankingJoinInfo from '../views/bangking/openBankingJoin-info.vue'
import openBankingJoinAgreeService from '../views/bangking/openBankingJoin-agreeService.vue'
import openBankingJoinReg from '../views/bangking/openBankingJoin-reg.vue'
import openBankingJoinAgreeBanking from '../views/bangking/openBankingJoin-agreeBanking.vue'
import openBankingJoinResult from '../views/bangking/openBankingJoin-result.vue'
import openBankingInquiryList from '../views/bangking/openBankingInquiry-list.vue'
import openBankingInquiryView from '../views/bangking/openBankingInquiry-view.vue'
import openBankingaccManage from '../views/bangking/openBankingaccManage.vue'
import openBankingReturnFunds from '../views/bangking/openBankingReturnFunds.vue'
import openBankingBalance from '../views/bangking/openBankingBalance.vue'
import openBankingBalanceList from '../views/bangking/openBankingBalance-list.vue'
import openBankingBalanceConfirm from '../views/bangking/openBankingBalance-confirm.vue'
import openBankingBalanceResult from '../views/bangking/openBankingBalance-result.vue'
// 금융상품 > 펀드
import fundMain from '../views/products/fund/fund-main.vue'
import fundSearch from '../views/products/fund/fund-search.vue'
import fundView from '../views/products/fund/fund-view.vue'
// 금융상품 > 펀드 신규매수
import newFundBuyStart from '../views/products/fund/newFundBuy-start.vue'
import newFundBuyInvestConfirm from '../views/products/fund/newFundBuy-investConfirm.vue'
import newFundBuyAgree from '../views/products/fund/newFundBuy-agree.vue'
import newFundBuyConfirm from '../views/products/fund/newFundBuy-confirm.vue'
import newFundBuyResult from '../views/products/fund/newFundBuy-result.vue'
// 금융상품 > 펀드 정기투자
import autoFundBuyStart from '../views/products/fund/autoFundBuy-start.vue'
import autoFundBuyEnter from '../views/products/fund/autoFundBuy-enter.vue'
import autoFundBuyConfirm from '../views/products/fund/autoFundBuy-confirm.vue'
import autoFundBuyResult from '../views/products/fund/autoFundBuy-result.vue'
// 금융상품 > 펀드 나의펀드
import myfundBalance from '../views/products/fund/myfund-balance.vue'
import myfundBalanceReport from '../views/products/fund/myfund-balance-report.vue'
import myfundBalanceHistory from '../views/products/fund/myfund-balance-history.vue'
import myfundNoteService from '../views/products/fund/myfund-noteService.vue'
// 금융상품 > IRP 상품매매
import tradingIRP from '../views/products/IRP/tradingIRP.vue'
import tradingIRPBuy from '../views/products/IRP/tradingIRP-buy.vue'
import tradingIRPSell from '../views/products/IRP/tradingIRP-sell.vue'
import tradingIRPHistory from '../views/products/IRP/tradingIRP-history.vue'
// 금융상품 > IRP 상품매매 > 매수
import newyBuyIRPConfirm from '../views/products/IRP/newBuyIRP-confirm.vue'
import newyBuyIRPResult from '../views/products/IRP/newBuyIRP-result.vue'
import addBuyIRPConfirm from '../views/products/IRP/addBuyIRP-confirm.vue'
import addBuyIRPResult from '../views/products/IRP/addBuyIRP-result.vue'
import ratioBuyIRPConfirm from '../views/products/IRP/ratioBuyIRP-confirm'
import ratioBuyIRPResult from '../views/products/IRP/ratioBuyIRP-result'
// 금융상품 > IRP 상품매매 > 매도
import sellIRPEnter from '../views/products/IRP/sellIRP-enter.vue'
import sellIRPConfirm from '../views/products/IRP/sellIRP-confirm.vue'
import sellIRPResult from '../views/products/IRP/sellIRP-result.vue'
// 금융상품 > IRP 상품매매 > 교체매매
import changeTradeIRPConfirm from '../views/products/IRP/changeTradeIRP-confirm.vue'
import changeTradeIRPResult from '../views/products/IRP/changeTradeIRP-result.vue'
// 금융상품 > IRP 상품매매 > 거래내역
import cancelIRPConfirm from '../views/products/IRP/tradingIRPCancel-confirm.vue'
import cancelIRPResult from '../views/products/IRP/tradingIRPCancel-result.vue'
// 금융상품 > IRP 상품매매 > ELB예약 & 예약취소
import reserveELB from '../views/products/IRP/reserveELB.vue'
import reserveELBView from '../views/products/IRP/reserveELB-view.vue'
import reserveELBEnter from '../views/products/IRP/reserveELB-enter.vue'
import reserveELBResult from '../views/products/IRP/reserveELB-result.vue'
import cancelELBView from '../views/products/IRP/reserveELB-cancelView.vue'
import cancelELBConfirm from '../views/products/IRP/reserveELB-cancelConfirm.vue'
import cancelELBResult from '../views/products/IRP/reserveELB-cancelResult.vue'
// 금융상품 > IRP 상품매매 > ELB예약현황
import buyELBView from '../views/products/IRP/buyELB-view.vue'
import buyELBEnter from '../views/products/IRP/buyELB-enter.vue'
import buyELBConfirm from '../views/products/IRP/buyELB-confrim.vue'
import buyELBResult from '../views/products/IRP/buyELB-result.vue'
// 금융상품 > IRP 상품매매 > 상품검색, 가입
import searchIRP from '../views/products/IRP/searchIRP.vue'
import searchIRPList from '../views/products/IRP/searchIRP-list.vue'
import searchIRPView from '../views/products/IRP/searchIRP-view.vue'
import searchIRPViewGuarantee from '../views/products/IRP/searchIRP-view-guarantee.vue'
import searchIRPAgree from '../views/products/IRP/searchIRP-agree.vue'
import searchIRPResult from '../views/products/IRP/searchIRP-result.vue'
// 금융상품 > IRP 상세
import productIRPView from '../views/products/IRP/productIRP-view.vue'
// 금융상품 > IRP 만기현황/만기 예약매수목록
import expiryReserveIRP from '../views/products/IRP/expiryReserveIRP.vue'
import expiryReserveIRPBuy from '../views/products/IRP/expiryReserveIRP-buy.vue'
// 앱 버튼 내 화면 호출용 컴포넌트
// 뱅킹 > 이체관리 > 지연이체 서비스 안내
import modalDelayTransSvcInfo from '../components/banking/modalDelayTransSvcInfo.vue'
import commonDesignCheck from '../views/presetViews/commonDesignCheck.vue'
import commonDesignButton from '../views/presetViews/commonDesignButton.vue'
// 공통디자인 - 리스트
import commonDesignList from '../views/presetViews/commonDesignList.vue'

const routes = [
    {
        path: '/',
        redirect: { name: 'pageList' }
    },
    {
        path: '/index.html',
        name: 'pageList',
        component: pageList,
        props: true
    },
    {
        path: '/test',
        name: 'commonDesignCheck',
        component: commonDesignCheck,
        props: true
    },
    {
        path: '/layout',
        name: 'commonDesignButton',
        component: commonDesignButton,
        props: true
    },
    {
        path: '/preset',
        name: 'presetPage',
        component: presetPage
    },
    {
        path: '/input',
        name: 'input',
        component: input
    },
    // 공통디자인- 리스트
    {
        path: '/list',
        name: 'commonDesignList',
        component: commonDesignList
    },
    // 뱅킹 > 이체
    {
        path: '/banking/accountTransfer',
        name: 'accountTransfer',
        redirect: { name: 'accountTransferMain' },
        component: accountTransfer,
        props: true,
        children: [
            {
                path: 'main',
                name: 'accountTransferMain',
                component: accountTransferMain,
                props: true
            },
            {
                path: 'enter',
                name: 'accountTransferEnter',
                component: accountTransferEnter,
                props: true
            },
            {
                path: 'confirm',
                name: 'accountTransferConfirm',
                component: accountTransferConfirm,
                props: true
            },
            {
                path: 'OpenConfirm',
                name: 'accountOpenTransferConfirm',
                component: accountOpenTransferConfirm,
                props: true
            },
            {
                path: 'result',
                name: 'accountTransferResult',
                component: accountTransferResult,
                props: true
            },
            {
                path: 'openResult',
                name: 'accountOpenTransferResult',
                component: accountOpenTransferResult,
                props: true
            },
            {
                path: 'multiMain',
                name: 'accountMultiTransferMain',
                component: accountMultiTransferMain,
                props: true
            },
            {
                path: 'multiEnter',
                name: 'accountMultiTransferEnter',
                component: accountMultiTransferEnter,
                props: true
            },
            {
                path: 'multiConfirm',
                name: 'accountMultiTransferConfirm',
                component: accountMultiTransferConfirm,
                props: true
            },
            {
                path: 'multiResult',
                name: 'accountMultiTransferResult',
                component: accountMultiTransferResult,
                props: true
            }
        ]
    },
    // 뱅킹 > 이체관리
    {
        path: '/banking/transManage/reserved',
        name: 'transManagereserved',
        component: transManagereserved,
        props: true
    },
    {
        path: '/banking/transManage/delayed',
        name: 'transManageDelayed',
        component: transManageDelayed,
        props: true
    },
    {
        path: '/banking/transManage/bankConnect',
        name: 'transManageBankConnect',
        component: transManageBankConnect,
        props: true,
        children: [
            {
                path: '',
                name: 'transManageBankConnectMain',
                component: transManageBankConnectMain,
                props: true
            },
            {
                path: 'confirm',
                name: 'transManageBankConnectConfirm',
                component: transManageBankConnectConfirm,
                props: true
            },
            {
                path: 'result',
                name: 'transManageBankConnectResult',
                component: transManageBankConnectResult,
                props: true
            }
        ]
    },
    {
        path: '/banking/transManage/easyTransfer',
        name: 'transManageEasyTransfer',
        component: transManageEasyTransfer,
        props: true
    },
    {
        path: '/banking/transManage/saveAcc',
        name: 'transManageSaveAcc',
        component: transManageSaveAcc,
        props: true
    },
    {
        path: '/banking/transManage/unusedAccount',
        name: 'transManageUnusedAccount',
        component: transManageUnusedAccount,
        props: true
    },
    // 오픈뱅킹
    {
        path: '/banking/openBanking/join',
        name: 'openBankingJoin',
        component: openBankingJoin,
        props: true,
        children: [
            {
                path: 'info',
                name: 'openBankingJoinInfo',
                component: openBankingJoinInfo,
                props: true
            },
            {
                path: 'agreeService',
                name: 'openBankingJoinAgreeService',
                component: openBankingJoinAgreeService,
                props: true
            },
            {
                path: 'reg',
                name: 'openBankingJoinReg',
                component: openBankingJoinReg,
                props: true
            },
            {
                path: 'agreeBanking',
                name: 'openBankingJoinAgreeBanking',
                component: openBankingJoinAgreeBanking,
                props: true
            },
            {
                path: 'result',
                name: 'openBankingJoinResult',
                component: openBankingJoinResult,
                props: true
            }
        ]
    },
    {
        path: '/banking/openBanking/inquiry',
        name: 'openBankingInquiryList',
        component: openBankingInquiryList,
        props: true
    },
    {
        path: '/banking/openBanking/inquiry/:bankCode/:bankAccNumber',
        name: 'openBankingInquiryView',
        component: openBankingInquiryView,
        props: true
    },
    {
        path: '/banking/openBanking/accManage',
        name: 'openBankingaccManage',
        component: openBankingaccManage,
        props: true
    },
    {
        path: '/banking/openBanking/returnFunds',
        name: 'openBankingReturnFunds',
        component: openBankingReturnFunds,
        props: true
    },
    {
        path: '/banking/openBanking/balance',
        name: 'openBankingBalance',
        redirect: { name: 'openBankingBalanceList' },
        component: openBankingBalance,
        props: true,
        children: [
            {
                path: 'list',
                name: 'openBankingBalanceList',
                component: openBankingBalanceList,
                props: true
            },
            {
                path: 'confirm',
                name: 'openBankingBalanceConfirm',
                component: openBankingBalanceConfirm,
                props: true
            },
            {
                path: 'result',
                name: 'openBankingBalanceResult',
                component: openBankingBalanceResult,
                props: true
            }
        ]
    },
    //  금융상품 > 펀드
    {
        path: '/products/fund/main',
        name: 'fundMain',
        component: fundMain,
        props: true
    },
    {
        path: '/products/fund/search',
        name: 'fundSearch',
        component: fundSearch,
        props: true
    },
    {
        path: '/products/fund/view',
        name: 'fundView',
        component: fundView,
        props: true
    },
    // 금융상품 > 펀드 > 신규매수
    {
        path: '/products/newFundBuy/start',
        name: 'newFundBuyStart',
        component: newFundBuyStart,
        props: true
    },
    {
        path: '/products/newFundBuy/investConfirm',
        name: 'newFundBuyInvestConfirm',
        component: newFundBuyInvestConfirm,
        props: true
    },
    {
        path: '/products/newFundBuy/agree',
        name: 'newFundBuyAgree',
        component: newFundBuyAgree,
        props: true
    },
    {
        path: '/products/newFundBuy/confirm',
        name: 'newFundBuyConfirm',
        component: newFundBuyConfirm,
        props: true
    },
    {
        path: '/products/newFundBuy/result',
        name: 'newFundBuyResult',
        component: newFundBuyResult,
        props: true
    },
    // 금융상품 > 펀드 > 정기매수
    {
        path: '/products/autoFundBuy/start',
        name: 'autoFundBuyStart',
        component: autoFundBuyStart,
        props: true
    },
    {
        path: '/products/autoFundBuy/enter',
        name: 'autoFundBuyEnter',
        component: autoFundBuyEnter,
        props: true
    },
    {
        path: '/products/autoFundBuy/confirm',
        name: 'autoFundBuyConfirm',
        component: autoFundBuyConfirm,
        props: true
    },
    {
        path: '/products/autoFundBuy/result',
        name: 'autoFundBuyResult',
        component: autoFundBuyResult,
        props: true
    },
    //  펀드 나의펀드
    {
        path: '/products/myfund/balance',
        name: 'myfundBalance',
        component: myfundBalance,
        redirect: { name: 'myfundBalanceReport' },
        props: true,
        children: [
            {
                path: 'report',
                name: 'myfundBalanceReport',
                component: myfundBalanceReport,
                props: true
            },
            {
                path: 'hisotry',
                name: 'myfundBalanceHistory',
                component: myfundBalanceHistory,
                props: true
            }
        ]
    },
    {
        path: '/products/myfund/noteService',
        name: 'myfundNoteService',
        component: myfundNoteService,
        props: true
    },
    // IRP 상품매매
    {
        path: '/products/IRP/trading',
        name: 'tradingIRP',
        component: tradingIRP,
        redirect: { name: 'tradingIRPBuy' },
        props: true,
        children: [
            {
                path: 'buy',
                name: 'tradingIRPBuy',
                component: tradingIRPBuy,
                props: true
            },
            {
                path: 'sell',
                name: 'tradingIRPSell',
                component: tradingIRPSell,
                props: true
            },
            {
                path: 'changeTrade',
                name: 'tradingIRPchangeTrade',
                component: tradingIRPSell,
                props: true
            },
            {
                path: 'history',
                name: 'tradingIRPHistory',
                component: tradingIRPHistory,
                props: true
            }
        ]
    },
    // IRP 상품매매 > 매수 > 신규매수
    {
        path: '/products/IRP/trading/newBuy/confirm',
        name: 'newyBuyIRPConfirm',
        component: newyBuyIRPConfirm,
        props: true
    },
    {
        path: '/products/IRP/trading/newBuy/result',
        name: 'newyBuyIRPResult',
        component: newyBuyIRPResult,
        props: true
    },
    //  IRP 상품매매 > 매수 > 추가매수
    {
        path: '/products/IRP/trading/addBuy/confirm',
        name: 'addBuyIRPConfirm',
        component: addBuyIRPConfirm,
        props: true
    },
    {
        path: '/products/IRP/trading/addBuy/result',
        name: 'addBuyIRPResult',
        component: addBuyIRPResult,
        props: true
    },
    // RP 상품매매 > 매수 > 투자비율 매수
    {
        path: '/products/IRP/trading/ratio/confirm/',
        name: 'ratioBuyIRPConfirm',
        component: ratioBuyIRPConfirm,
        props: true
    },
    {
        path: '/products/IRP/trading/ratio/result',
        name: 'ratioBuyIRPResult',
        component: ratioBuyIRPResult,
        props: true
    },
    // IRP 상품매매 > 매도
    {
        path: '/products/IRP/trading/sellEnter/:type',
        name: 'sellIRPEnter',
        component: sellIRPEnter,
        props: true
    },
    {
        path: '/products/IRP/trading/sell/confirm',
        name: 'sellIRPConfirm',
        component: sellIRPConfirm,
        props: true
    },
    {
        path: '/products/IRP/trading/sell/result',
        name: 'sellIRPResult',
        component: sellIRPResult,
        props: true
    },
    // IRP 상품매매 > 교체매매
    {
        path: '/products/IRP/trading/changeTrade/buy',
        name: 'changeTradeIRPBuy',
        component: tradingIRPBuy,
        props: true
    },
    {
        path: '/products/IRP/trading/changeTrade/confirm',
        name: 'changeTradeIRPConfirm',
        component: changeTradeIRPConfirm,
        props: true
    },
    {
        path: '/products/IRP/trading/changeTrade/result',
        name: 'changeTradeIRPResult',
        component: changeTradeIRPResult,
        props: true
    },
    // IRP 상품매매 > 거래내역 취소
    {
        path: '/products/IRP/trading/cancelIRP/confirm',
        name: 'cancelIRPConfirm',
        component: cancelIRPConfirm,
        props: true
    },
    {
        path: '/products/IRP/trading/cancelIRP/result',
        name: 'cancelIRPResult',
        component: cancelIRPResult,
        props: true
    },
    // IRP 상품매매 > ELB
    {
        path: '/products/IRP/trading/reserveELB/:type',
        name: 'reserveELB',
        component: reserveELB,
        props: true
    },
    // IRP 상품매매 > ELB예약
    {
        path: '/products/IRP/reserveELB/:itemCode/:bankAccNumber',
        name: 'reserveELBView',
        redirect: { name: 'reserveELBEnter' },
        component: reserveELBView,
        props: true,
        children: [
            {
                path: '',
                name: 'reserveELBEnter',
                component: reserveELBEnter,
                props: true
            },
            {
                path: '',
                name: 'reserveELBResult',
                component: reserveELBResult,
                props: true
            }
        ]
    },
    // IRP 상품매매 > ELB예약취소
    {
        path: '/products/IRP/cancelELB/:itemCode/:bankAccNumber',
        name: 'cancelELBView',
        redirect: { name: 'cancelELBConfirm' },
        component: cancelELBView,
        props: true,
        children: [
            {
                path: 'confirm',
                name: 'cancelELBConfirm',
                component: cancelELBConfirm,
                props: true
            },
            {
                path: 'result',
                name: 'cancelELBResult',
                component: cancelELBResult,
                props: true
            }
        ]
    },
    // IRP 상품매매 > ELB예약현황 > 매수
    {
        path: '/products/IRP/buyELB/:itemCode/:bankAccNumber',
        name: 'buyELBView',
        redirect: { name: 'buyELBEnter' },
        component: buyELBView,
        props: true,
        children: [
            {
                path: 'enter',
                name: 'buyELBEnter',
                component: buyELBEnter,
                props: true
            },
            {
                path: 'confirm',
                name: 'buyELBConfirm',
                component: buyELBConfirm,
                props: true
            },
            {
                path: 'result',
                name: 'buyELBResult',
                component: buyELBResult,
                props: true
            }
        ]
    },
    {
        path: '/products/IRP/search',
        name: 'searchIRP',
        redirect: { name: 'searchIRPList' },
        component: searchIRP,
        props: true,
        children: [
            {
                path: 'list',
                name: 'searchIRPList',
                component: searchIRPList,
                props: true
            },
            {
                path: 'view',
                name: 'searchIRPView',
                component: searchIRPView,
                props: true
            },
            {
                path: 'viewGuarantee',
                name: 'searchIRPViewGuarantee',
                component: searchIRPViewGuarantee,
                props: true
            },
            {
                path: 'agree',
                name: 'searchIRPAgree',
                component: searchIRPAgree,
                props: true
            },
            {
                path: 'result',
                name: 'searchIRPResult',
                component: searchIRPResult,
                props: true
            }
        ]
    },
    // IRP 상세
    {
        path: '/products/IRP/view',
        name: 'productIRPView',
        component: productIRPView
    },
    // IRP 만기현황 / 만기예약매수
    {
        path: '/products/IRP/expiry',
        name: 'expiryReserveIRP',
        component: expiryReserveIRP
    },
    // IRP 만기예약매수
    {
        path: '/products/IRP/expiryResBuy/:itemCode',
        name: 'expiryReserveIRPBuy',
        component: expiryReserveIRPBuy
    },
    // 앱 호출용 모달 모음
    // 지연이체 서비스 인포
    {
        path: '/banking/allModal/modalDelayTransSvcInfo',
        name: 'modalDelayTransSvcInfo',
        component: modalDelayTransSvcInfo
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router