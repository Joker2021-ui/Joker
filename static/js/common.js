(function () {
    'use strict';
    let contract, odometer;
    let comm = {
        host: '',isLoadOk:false,
        getUrlKey: function (name, url) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null;
        }
    };
    Vue.directive('timer', {
        bind(el, binding) {
            el.__time = binding.value * 1000;
            el.__timer = setInterval(() => {
                let f = v => (v < 10 ? '0' + v : v),
                    o = Math.abs(el.__time - Date.now()),
                    d = Math.floor(o / 86400000),
                    h = Math.floor((o - d * 86400000) / 3600000),
                    m = Math.floor((o - d * 86400000 - h * 3600000) / 60000),
                    s = Math.floor((o - d * 86400000 - h * 3600000 - m * 60000) / 1000);
                el.innerText = el.__time > Date.now() ? f(h) + ':' + f(m) + ':' + f(s) : '00:00:00';
                if (el.__time < Date.now() && Cookies.get('RTrxToken')) {
                    setInterval(() => {
                        // window.location.reload();
                    }, 5000);
                }
            }, 1000);
        },
        update(el, binding) {
            el.__time = binding.value * 1000;
        },
        unbind(el, binding) {
            clearInterval(el.__timer);
        }
    });
    Vue.directive('ctimer', {
        bind(el, binding) {
            el.__ctime = binding.value * 1000;
            el.__ctimer = setInterval(() => {
                let f = v => (v < 10 ? '0' + v : v),
                    o = Math.abs(el.__ctime - Date.now()),
                    d = Math.floor(o / 86400000),
                    h = Math.floor((o - d * 86400000) / 3600000),
                    m = Math.floor((o - d * 86400000 - h * 3600000) / 60000),
                    s = Math.floor((o - d * 86400000 - h * 3600000 - m * 60000) / 1000);
                let dd = d > 0 ? d + i18n.t('message.period.day') : '',
                    hh = h > 0 ? h + i18n.t('message.period.hrs') : '',
                    mm = m > 0 ? m + i18n.t('message.period.mins') : '',
                    ss = s > 0 ? s + i18n.t('message.period.secs') : '';
                el.innerText = el.__ctime > Date.now() ? dd + hh + mm + ss : '00:00:00';
            }, 1000);
        },
        update(el, binding) {
            el.__ctime = binding.value * 1000;
        },
        unbind(el, binding) {
            clearInterval(el.__ctimer);
        }
    });
    
    Vue.directive('cstimer', {
        bind(el, binding) {
            el.__ctime = binding.value * 1000;
            el.__ctimer = setInterval(() => {
                let f = v => (v < 10 ? '0' + v : v),
                    o = Math.abs(el.__ctime - Date.now()),
                    d = Math.floor(o / 86400000),
                    h = Math.floor((o - d * 86400000) / 3600000),
                    m = Math.floor((o - d * 86400000 - h * 3600000) / 60000),
                    s = Math.floor((o - d * 86400000 - h * 3600000 - m * 60000) / 1000);
                let dd = d > 0 ? d + i18n.t('message.period.day') : '',
                    hh = h > 0 ? h + i18n.t('message.period.hrs') : '',
                    mm = m > 0 ? m + i18n.t('message.period.mins') : '',
                    ss = s > 0 ? s + i18n.t('message.period.secs') : '';
                el.innerText = el.__ctime > Date.now() ? dd + hh + mm + ss : '结算中';
                // if (el.__time < Date.now() && Cookies.get('RTrxToken')) {
                //     setInterval(() => {
                //         window.location.reload();
                //     }, 5000);
                // }
            }, 1000);
        },
        update(el, binding) {
            el.__ctime = binding.value * 1000;
        },
        unbind(el, binding) {
            clearInterval(el.__ctimer);
        }
    });

    const i18n = new VueI18n({
        locale: Cookies.get('lang') ? Cookies.get('lang') : 'en',
        messages: {
            en: {
                message: {
                    LSOSOSOq:'Not triggered',
                    lang: 'English',
                    loginTip2:'Distributed defi address, whether to enter the blockchain browser to view',
                    ecosystemLISPO:'common problem',
                    ecosystemLISPO1:' Smart contract technology-this is a new phenomenon in today s decentralized economy.<\/br> Process and distribute the financial flow of digital assets.<\/br> All processes are carried out in an open and decentralized blockchain cabinet.<\/br>The JoKeR cryptocurrency infrastructure supports such contracts. ',
                    
        
                    loginTip1:'helpful',
                    ecosystemLIS:'01.You can fully see the code of the JoKeR smart contract here, so you can have full confidence in the safety and long-term operation of the project!',

                    ecosystemLIS1:'Zero risk',
                    ecosystemLIS2:'JoKeR developers deployed a self-executing smart contract on the TRON blockchain that is permanent and cannot be modified by any entity',

                    ecosystemLIS3:'Instant transaction',
                    ecosystemLIS4:'Profits from other members enter your personal wallet directly, there is no accumulation in the system, and the profit belongs to you only',

                    ecosystemLIS5:'Conditional invariance',
                    ecosystemLIS6:'JoKeR smart contract is just a payment gateway that can facilitate peer-to-peer commission payment between participants',

                    ecosystemLIS7:'Decentralization',
                    ecosystemLIS8:'There are no managers or administrators, only creators participate in the project on an equal footing with everyone else',

                    ecosystemLIS9:'Transparency and anonymity',
                    ecosystemLIS10:'The smart contract is public, anyone can see the code and the entire transaction record, which ensures the integrity of the system and real project statistics',

                    ecosystemLIS11:'100% online',
                    ecosystemLIS12:'All funds are transferred between members without any hidden fees, and the contract balance is always zero',



                    ecosystem1:'The world s first win-win ecosystem',
                    Walkinglantern:'Beware of false resources. Community JoKeR has only one site address- www.JoKeR.pet',
                    contenLI1:'1. What is JoKeR?',
                    contenLI2:'2. Who manages the JoKeR platform?',
                    contenLI3:'3. Who created JoKeR?',
                    contenLI4:'4. What is a smart contract? What are its advantages?',
                    contenLI5:'5. What do I need to join?',
                    contenLI6:'6. Which wallet should I use?',
                    contenLI7:'7. Where can I get more information about JoKeR?',
                    contenLI8:'8. What do I need to create a Tron wallet?',
                    contenLI9:'9. If I have never participated in the processing of encrypted digital currency before, how to buy and sell BTC ETH USDT TRX?',
                    contenLI10:'10. How to participate in circulation in the JoKeR community?',
                    contenLI11:'11. Can I register online for circulation without a partner?',
                    contenLI12:'12. What will happen to my account if I interrupt the cooperation with the JoKeR community?',
                    contenLI13:'13. I have participated in the circulation, what should I do in the next step?',
                    contenLI14:'14. How to achieve goals through JoKeR?',
                    contenLI15:'15. Is passive income possible?',
                    contenLI16:'16. How to inspire network nodes? What if I can’t call?',
                    contenLI17:'17. How much rate of return can be obtained?',
                    contenLI18:'18. Do I need to withdraw encrypted digital currency assets from JoKeR?',
                    contenLI19:'19. Will JoKeR shut down?',
                    contenLI20:'20. The global distributed circulation of JoKeR is not interfered by any national government departments. The code is the rule and the law. It will always be enforced by the smart contract and cannot be closed or modified. What is the direct community network node? What is the daily rate of return of block network nodes?',
                    contenLI21:'21. What is the difference between JoKeR and Sergey Mavrodi’s community economic and ecological plan?',
                    contenLI22:'22. What are the risks of JoKeR? How long can I play?',

                    contenLI1C:'1. What is JoKeR? JoKeR is the international distributed circulation of the global decentralized ecosystem, and it is also the first ever TRON smart contract marketing and circulation scenario. This is a self-executing software algorithm that can execute the function of distributing partner rewards among members of the global distributed community under certain conditions (circulation marketing plan). The contract code is publicly available. Information about transactions can always be viewed on the link: https://tronscan.io.',
                    contenLI2C:'2. Who manages the JoKeR platform? The JoKeR platform is composed of global distributed smart contracts that automatically execute transactions, and cannot be interfered by any objective factors in the transaction process.',
                    contenLI3C:'3. Who created JoKeR? The JoKeR concept belongs to a global distributed encrypted digital currency enthusiast organization. They are members of the community without any special privileges. The code is the rule and the law. Today, JoKeR is a peer-to-peer community to which platform members belong, and the platform itself also belongs to this community.',
                    contenLI4C:'4. What is a smart contract? What are its advantages? Smart contract is an algorithm in encrypted digital currency blockchain technology. TRON is the first choice for creating JoKeR distributed circulation smart contracts. The main purpose of this type of contract is to automate the relationship and give the opportunity to automate the commitment.',
                    contenLI5C:'5. What do I need to join? You already have almost everything you need. The rest is to install an encrypted digital currency wallet and Telegram on your device (smartphone, tablet, PC) for global distributed circulation.',
                    contenLI6C:'6. Which wallet should I use? JoKeR is applicable to all TRON encrypted digital currency wallets. We recommend the following:Pobao TronLink wallet, iMToKen, ToKenPocket support mobile devices (smartphones, tablets), and also support computers and laptops that should use Chrome extensions. TronLink wallet official address: https://www.tronlink.org/',
                    contenLI7C:'7. Where can I get more information about JoKeR? Subscribe to the verified JoKeR channel on Telegram. Send any questions to JoKeR distributed members and they will be happy to share their experience.Join the chat on Telegram t.me/JoKeR. We also recommend that you research the material on the website in the "College" section.',
                    contenLI8C:'8. What do I need to create a Tron wallet? For PC, you need to go to the website tronlink.org and install the extension for your browser.For mobile devices, you need to install Pobao TronLink Wallet AppWhen registering, please dont forget to store the encrypted digital currency wallet password safely.',
                    contenLI9C:'9. If I have never participated in the processing of encrypted digital currency before, how to buy and sell BTC ETH USDT TRX? There are many ways to buy/sell cryptocurrency in exchange for fiat currency (regular currency). They are all designed for encrypted digital currency users and have a user-friendly interface. Your first transaction to convert legal currency into digital currency will take you no more than five minutes. We recommend using the proven currency exchange aggregator bestchange.ru',
                    contenLI10C:'10. How to participate in circulation in the JoKeR community? To participate in circulation in JoKeR, you need to send a circulation time period to the created smart contract to activate the JoKeR distributed circulation account. Choosing the circulation time period itself constitutes your registration in the community.Please note: When recharging an encrypted digital currency wallet, you need to consider the network commission, which is usually about 1TRX.',
                    contenLI11C:'11. Can I register online for circulation without a partner? Yes. Registration without an invitation link will get you into the JoKeR distributed node team ID.',
                    contenLI12C:'12. What will happen to my account if I interrupt the cooperation with the JoKeR community? No one can close your account, even if they have a strong will. The account will always be stored in one of the TRON network blocks. But you will not be able to continue to earn income from each shared distributed circulation network node.',
                    contenLI13C:'13. I have participated in the circulation, what should I do in the next step? In order to interact effectively with the JoKeR community, you need to:1. Waiting for the settlement process of the circulation time period2. Chat with the person who invited you or other experienced members. They will help you take the first step.3. Go to the "College" section, which contains courses on how to work effectively in the community.',
                    contenLI14C:'14. How to achieve goals through JoKeR? It is based on establishing a network of partners. You introduce the potential of the community to potential partners and encourage them to cooperate with you. The partners who use your network node and their daily interest rate generated by their participation in periodic circulation transactions will be sent to your smart contract address, and then they will be immediately redirected to your wallet. The community is used directly with marketing projects. You can learn more about the marketing plan in the video.',
                    contenLI15C:'15. Is passive income possible? The JoKeR community is built in such a way that all members of the network block node can help each other. Passive income is possible; it depends on the partners’ activities, and partners can eventually appear on the community network through sharing or participating in circulation.To ensure that you will have passive income in the future, you need to make a determined effort to attract new partners and open a new charter in JoKeROnce you invite an active community node to join the team, you can already make a lot of money and achieve your goals. The speed at which this happens depends entirely on mobility,contenLI16C:You dont have to force others to participate. At present, many friends are interested in how to make money through the revolution of blockchain technology in network data, and many of them are actively seeking new opportunities. You can meet them on social networks yourself, or you can set up automatic sales channels so that anyone interested can find yourself. You can find more details about this issue in the "College" section of the JoKeR community.Take advantage of your strengths, watch webinars, and ask questions to experience community members. You don’t need to wait long to be successful. Your result depends entirely on your ability to act!',
                    contenLI16C:'16. How to inspire network nodes? What if I can’t call? You dont have to force others to participate. At present, many friends are interested in how to make money through the revolution of blockchain technology in network data, and many of them are actively seeking new opportunities. You can meet them on social networks yourself, or you can set up automatic sales channels so that anyone interested can find yourself. You can find more details about this issue in the "College" section of the JoKeR community.Take advantage of your strengths, watch webinars, and ask questions to experience community members. You don’t need to wait long to be successful. Your result depends entirely on your ability to act!',
                    contenLI17C:'17. How much rate of return can be obtained? The amount of income depends on your participation in the circulation cycle activities and the quality indicators of network nodes participating in the circulation activities.According to the number of partners, 4 different investment levels of the JoKeR community are considered.First, there is a simple relationship. The more network nodes you cooperate, the more circulation tokens you will raise; the higher the partner quality index, the higher the income you will get.',
                    contenLI18C:'18. Do I need to withdraw encrypted digital currency assets from JoKeR? JoKeR does not retain any encrypted digital currency assets, so the balance of the smart contract itself is equal to zero. The huge amount of data is the circulation of the community, you can check it yourself by following LINK. Your income directly enters your personal encrypted digital currency wallet from the JoKeR global distributed network node. Only you can use the encrypted digital currency wallet, no other objective factors can manage your Token assets',
                    contenLI19C:'19. Will JoKeR shut down? No, JoKeR data is completely public, checkable and trustworthy, and JoKeR open source code has been audited and made publicJoKeRs global distributed circulation is not subject to any national border government intervention. The code is the rule and the law, which will always be enforced by the smart contract and cannot be closed or modified.',
                    contenLI20C:'20. The global distributed circulation of JoKeR is not interfered by any national government departments. The code is the rule and the law. It will always be enforced by the smart contract and cannot be closed or modified. What is the direct community network node? What is the daily rate of return of block network nodes?Directly under the community node isIt refers to the first level partner that connects with your direct community network. The daily rate of return of block network node refers to the daily rate of return of participating circulation cycle. JoKeR is divided into four cycles: 1 day circulation 7 days circulation 15 days circulation 30 days circulation 1 day 101% 7 days 110.5% 15 days 130% 30 days 190%. Take circulation 10000 usdt as an example to illustrate that participating circulation 15 days 10000 usdt daily gains 2%, that is 200 usdt 15 days is the rate of return of 3000usdt 15 days contract expiration, 30% of the rate of return can be obtained by 13000usdt block network node directly',
                    contenLI21C:'21. What is the difference between JoKeR and Sergey Mavrodi’s community economic and ecological plan? Because it did not make an unfulfillable promise to its members. The success of each community member depends on the ecological network community node JoKeR will not incur debts or other obligationsJoKeR is a distributed circulation of smart contracts based on blockchain technology and has nothing to do with the pyramid schemeThe principle of the pyramid scheme is that most of the funds are concentrated in the hands of its creators. The sooner you arrive, the more you can get. The pyramid scheme can be closed at any time. The members of the JoKeR community, no matter the builder or everyone in the JoKeR community are equal. No one can terminate the operation of the community, because its function is guaranteed by the blockchain network smart contract, which cannot be deleted or changed. Even if the website stops operating, as long as there is electricity and Internet access, all data and the entire structure will remain unchanged, and the smart contract will continue to operate.',
                    contenLI22C:'22. What are the risks of JoKeR? How long can I play? The JoKeR community does not have any hard risks. The only objective risk is to stop the implementation of community network nodesJoKeR does not have any central authority. All community network node users do not need to register or withdraw cash. They only need to bind their USDT (TRC20) encrypted digital currency wallet address to carry out USDT (TRC20) global distributed circulation and reach a contract. The smart return is stipulated. You only need to continue to invite the implementation to withdraw your circulation. The community runs based on the smart contract in the blockchain system, and the code of the smart contract is in the public domain.All transfers go directly to your encrypted digital currency wallet, without any hidden assets, and without using any third-party resources. This ensures that any money you earn belongs to you. JoKeR has a total of 9 stages. The contract will run automatically from stage 0, and will be based on the number of real-time wallet addresses (a), fund circulation (b), fund return (c), and historical fluctuations ( d), linear period (n) and other data are calculated to get the estimated end time (x) of the current stage,Period formula: x ≈adc1!b1-c1+ad2c2!b2-c2+ad3c3!b3-c3+…adncn!bn-cn,0≤x<+∞The contract will start to run intelligently from stage 0, and based on the number of real-time addresses, asset circulation, historical increase, and linear cycle simulation, the end time period of the current stage will be obtained. When this time is reached, the smart contract will automatically reset and enter the next A stageAnd every time you raise a stage, the profit of ToKens asset circulation will automatically increase by 50%, and all loss-making wallet addresses in the previous stage will receive a creation reward of double the amount of assets. This means that every JoKeR community network node is tied to 9 lifelines. Even if one lifeline is exhausted for a long time, there are second, third, and even ninth lifelines, and each lifeline will be It will become stronger and stronger, and all operating instructions are implemented by blockchain technology smart contracts, so this is completely safe.For example, when the smart contract enters the first stage of the lifeline, 10% of the circulating Token assets will enter the creation prize pool, which will be automatically distributed to all the wallet addresses that lost money in the previous stage, and 20% of the circulating ToKen assets will flow into the creation prize pool in the second stage of the lifeline. Used to issue the previous level of loss-making encrypted digital currency wallet address. In the third stage, 30% of the circulating ToKen assets will enter the creation prize pool, which will be used to issue all the loss-making crypto wallet addresses of the second stage, and so on, until the ninth stage will have 90% of the circulating volume used to issue the previous stage The address of the losing wallet. Each loss-making address can get 2 times the amount of loss-making rewards. When the creation rewards for all the loss-making addresses of the previous level have been issued, the creation bonus pool will no longer flow into ToKen assets.',


                    sigOut: 'Sign out',
                    sigIn: 'Sign in',
                    syslang: 'System language',
                    circulation: 'Circulation',
                    predict: 'Countdown to the end of the estimate',
                    ring: 'Current ring number',
                    description: "JoKeR can't be stopped, it can't be shut down, it can't be intervened by a third party, you can't be banned by the program, it will be executed by the system forever",
                    join: 'How to join',
                    joinDesc: '<p>1: Log in to your usdt (trc20) wallet address after using the network node sharing link to automatically activate the account for decentralized Finance (defi) circulation intelligent mining <\/p> <p>2: Select the circulation period and pay the amount of USDT (TRC20) you need to circulate to the payment address. <\/p><p>3: After the circulation expires, the contract will automatically return the increased USDT (TRC20) to your wallet address. <\/p>',
                    share: 'Introduction',
                    shareDesc: '<p>1: Nine-ringDEFI adopts a distributed and decentralized circulation return method. TheDEFI runs automatically from the 0th ring. When the circulation is not enough to pay for the return, theDEFI will automatically reset and enter the next Ring, up to the 9th ring. <\/p> <p>2: Every time you increase one link, the rate of return on capital circulation will automatically increase by 50%, which will be used to encourage participation in the next link. <\/p><p>3: For every increase of one link, 10%-90% of the circulating funds will enter the Chuanghuan prize pool, which will be used to double reward all the wallet addresses that lost money in the previous link. <\/p>',
                    ruleDesc: '<p>4: USDT (TRC20) circulation reward rules at the 0th ring: <br> Return 101% after 1 day of circulation, 110.5% after 7 days of circulation, 130% after 15 days of circulation and 190% after 30 days of circulation<\/p><p>5: Sharing reward rules: <br>Every time you circulate 100 USDT, you can get a generation of sharing rewards, and you can get up to 20 generations of sharing rewards. <br>If you circulate 100 USDT by yourself, you can get 30% of the income for each generation.<br>If you circulate 200 USDT by yourself, you can get 20% of the income for the second generation. %<br>Circulate 400-1000USDT by yourself, get 5% of each income of 4-10 generations<br>Circulate 1100-2000USDT by yourself, get 1% of each income of 11-20 generations<\/p>',
                    present: 'source code',
                    prizeLog: 'Bonus details',
                    contAddress: 'Please enter the address TRC20',
                    startCir: 'Start circulation',
                    back: 'return',
                    contContract: 'statistics',
                    coutAddre: 'Total historical addresses',
                    countCirul: 'Total historical circulation',
                    prizePool: 'Innovation Prize Pool',
                    loginSuccTip: 'login successful',
                    sharePlan: 'JoKeR sharing program',
                    shareTip: 'Use any wallet address to pay to this address, and return to the logged-in wallet address after the fund circulation expires',
                    shareLink: 'Share link',
                    friendsTotal: 'Total number of node',
                    fCirculatTotal: 'Total circulation of node',
                    tissue: 'Node address',
                    personal1st: 'Personal 1st generation node',
                    personal2st: 'Personal 2nd generation node',
                    personal3st: 'Personal 3rd generation node',
                    personal4st: 'Personal 4-10 generation node',
                    personal11st: 'Personal 11-20 generation node',
                    copyText: 'copy',
                    personalData: 'Personal data statistics',
                    circulateUsdt: 'total circulating USDT',
                    returnUsdt: 'total return USDT',
                    shareReward: 'share reward USDT',
                    innovatReward: 'creation reward USDT',
                    curPersonalPL: 'Current total profit and loss USDT ',
                    recharge: 'Recharge',
                    hashOrder: 'My order',
                    cirTime: 'Cycle',
                    circulationIn: 'Circulation amount',
                    status: 'status',
                    view: 'View',
                    loginTip: 'Please bind yourDEFI address USDT (TRC20)',
                    qrCCode: 'Payment QR code',
                    qrCCodeExpir: 'QR code expiration time',
                    trcErrTip: 'TRX address format is incorrect',
                    cirReturn: 'Circulation return',
                    occupy: 'Distributed DEFI address, whether to enter the block explorer to check',
                    address: 'address',
                    regTime: 'Registration time',
                    troAdrrs: 'Transparent address',
                    cTime: 'time',
                    current: 'current',
                    amount: 'Amount',
                    cirRes: 'Circulat → return',
                    msg: {
                        busy:'The system is busy, please try again later! ',
                        paramErr:'Parameter error',
                        Occupy:'DistributedDEFI address, whether to enter the block explorer to check',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: ['in circulation','back','finish','fuse'],
                    oFail:'FAIL',
                    quest:'Question',
                    mtoken:'Cooperation token',
                }
            },
            zh: {
                message: {
                    lang: '中文繁體',
                    ecosystemLIS:'在這裏可以完全看到JoKeR智能合約的代碼，因此您可以對項目的安全性和長期運營完全充滿信心！',
                    loginTip2:'分佈式DEFI地址，是否進入區塊鏈瀏覽器查看',

                    LSOSOSOq:'未觸發',
                    ecosystemLISPO:'常見問題',
                    ecosystemLISPO1:' 智能合約技術——這是當今去中心化經濟中的一種新現象<\/br> 處理和分配數字資產的財務流<\/br> 所有流程均在開放且分散的區塊鏈櫃中進行<\/br>JoKeR加密貨幣基礎設施支持此類合約',
                    
            
                    ecosystemLIS1:'零風險',
                    ecosystemLIS2:'JoKeR開發人員在波場區塊鏈上部署了壹個永久存在且無法被任何實體修改的自執行智能合約',

                    ecosystemLIS3:'即時交易',
                    ecosystemLIS4:'利潤從其他成員直接進入您的個人錢包，系統中沒有累積，收益僅屬於您',

                    ecosystemLIS5:'條件不變性',
                    ecosystemLIS6:'JoKeR智能合約不過是壹個支付網關，可促進參與者之間的點對點傭金支付',

                    ecosystemLIS7:'分權化',
                    ecosystemLIS8:'沒有管理者或管理員，只有創造者與其他所有人壹樣平等參與項目',

                    ecosystemLIS9:'透明度和匿名性',
                    ecosystemLIS10:'智能合約是公開的，任何人都可以看到代碼和整個交易記錄,這保證了系統和真實項目統計的完整性',

                    ecosystemLIS11:'100%在線',
                    ecosystemLIS12:'所有資金在會員之間轉移，沒有任何隱藏費用，合同余額始終為零100% online',


                    ecosystem1:'全球分佈式生態系統',
                    contenLI1:'1.什麽是JoKeR？',
                    contenLI2:'2.誰管理JoKeR平臺？',
                    contenLI3:'3.誰創造了JoKeR？',
                    contenLI4:'4.什麽是智能合約？它有什麽優勢？',
                    contenLI5:'5.我需要做什麽才能加入？',
                    contenLI6:'6.我應該使用哪個錢包？',
                    contenLI7:'7.在哪里可以獲得有關JoKeR的更多資訊？',
                    contenLI8:'8.創建Tron錢包需要做什麽？',
                    contenLI9:'9.如果以前從未參與處理過加密數字貨幣，如何買賣BTC ETH USDT TRX？',
                    contenLI10:'10.如何在JoKeR社區上參與流通？',
                    contenLI11:'11.我可以在沒有合作夥伴的情況下網上註冊進行流通嗎？',
                    contenLI12:'12.如果我中斷JoKeR社區的合作，我的帳戶會怎樣？',
                    contenLI13:'13.我已經參與流通了，下壹步該如何做？',
                    contenLI14:'14.如何通過JoKeR實現目標？',
                    contenLI15:'15.被動收入可能嗎？',
                    contenLI16:'16.如何感召網路節點？如果我無法號召該怎麽辦？',
                    contenLI17:'17.可以獲取多少收益率？',
                    contenLI18:'18.我需要從JoKeR上提取加密數字貨幣資產嗎？',
                    contenLI19:'19.JoKeR是否會關閉？',
                    contenLI20:'20.JoKeR全球分佈式流通不受任何國界政府部門干預，代碼即是規則即是法律，將永遠被智能合約強制執行，無法關閉及修改?什麽是直屬社区网络節点？什麽是区块网络节点日化收益率？',
                    contenLI21:'21.JoKeR與谢尔盖·马夫罗季社区经济生态計劃思想有何不同？',
                    contenLI22:'22.JoKeR有什麽風險？可以玩多久？',
                    contenLI1C:'1.什麽是JoKeR？ JoKeR是全球分散生態系統的國際分佈式流通，也是有史以來第壹個波場智能合約行銷流通場景。這是壹種自執行的軟體演算法，可在壹定條件下（流通行銷計畫）執行在全球分佈式社區成員之間分配合作夥伴獎勵的功能。合同代碼是公開可用的。有關交易的資訊始終可以在鏈接：https://tronscan.io上查看。',
                    contenLI2C:'2.誰管理JoKeR平臺？ JoKeR平臺由全球分佈式智能合約自動執行交易組成，無法被任何客觀因素干預交易過程。',
                    contenLI3C:'3.誰創造了JoKeR？ JoKeR概念屬於全球分佈式加密數字貨幣愛好者組織，他們是社區的成員，沒有任何特殊特權，代碼即規則即法律，今天，JoKeR是平臺成員所屬的點對點社區，平臺本身也屬於該社區。',
                    contenLI4C:'4.什麽是智能合約？它有什麽優勢？智能合約是加密數字貨幣區塊鏈技術中的壹種演算法。TRON是可以創建JoKeR分佈式流通智能合約的首選。此類合同的主要目的是關係的自動化，使承諾自動執行的機會。',
                    contenLI5C:'5.我需要做什麽才能加入？您已經擁有了幾乎所有需要的東西。剩下的就是在於您的設備（智能手機，平板電腦，PC）上安裝壹個加密數字貨幣錢包和電報Telegram進行全球分佈式流通。',
                    contenLI6C:'6.我應該使用哪個錢包？JoKeR適用於所有TRON加密數字貨幣錢包。我們建議以下內容：波寶TronLink錢包，iMToKen，ToKenPocket支持移動設備（智能手機，平板電腦），也支持電腦和筆記本電腦應使用Chrome 插件擴展程式。TronLink錢包官方地址：https://www.tronlink.org/',
                    contenLI7C:'7.在哪里可以獲得有關JoKeR的更多資訊？在Telegram上訂閱經過驗證的JoKeR頻道。將任何問題發送給JoKeR分佈式成員，他們將很樂意分享他們的經驗。加入Telegram t.me/JoKeR上的聊天。我們還建議您在“學院”部分中研究網站上的材料。',
                    contenLI8C:'8.創建Tron錢包需要做什麽？對於PC，您需要轉到網站tronlink.org並為您的流覽器安裝擴展名。對於移動設備，您需要安裝波寶TronLink錢包應用程式註冊時，請不要忘記安全的存儲加密數字貨幣錢包密碼。',
                    contenLI9C:'9.如果以前從未參與處理過加密數字貨幣，如何買賣BTC ETH USDT TRX？有很多購買/出售加密貨幣以換取法定貨幣（常規貨幣）的方法。它們都是為加密數字貨幣用戶們設計的，並具有用戶友好的介面。您將法定貨幣兌換為數字貨幣的第壹筆交易將花費您不超過五分鐘的時間。我們建議使用經過驗證的貨幣兌換聚合器bestchange.ru',
                    contenLI10C:'10.如何在JoKeR社區上參與流通？要在JoKeR中參與流通，您需要向創建的智能合約發送流通時間週期，以啟動JoKeR分佈式流通帳戶。選擇流通時間週期本身構成您在社區中的註冊。請注意：在充值加密數字貨幣錢包時，您需要考慮網路的傭金，通常約為1TRX。',
                    contenLI11C:'11.我可以在沒有合作夥伴的情況下網上註冊進行流通嗎？是的。沒有邀請鏈接的註冊將使您進入JoKeR分佈式節點團隊ID。',
                    contenLI12C:'12.如果我中斷JoKeR社區的合作，我的帳戶會怎樣？沒有人可以關閉您的帳戶，即使他們有強烈的意願。該帳戶將始終保存在TRON網路區塊之壹中。但您將無法繼續從各個分享的分佈式流通網路節點中獲得收入。',
                    contenLI13C:'13.我已經參與流通了，下壹步該如何做？為了與JoKeR社區進行有效交互，您需要：1.等待流通時間週期的結算過程2.與邀請您的人或其他經驗豐富的成員進行聊天。他們將幫助您邁出第壹步。3.轉到“學院”部分，其中包含有關如何在社區上有效工作的課程。',
                    contenLI14C:'14.如何通過JoKeR實現目標？它基於建立合作夥伴網路。您向潛在合作夥伴介紹該社區的潛力，並鼓勵他們與您合作。使用您的網路節點的合作夥伴、他們參與週期流通交易產生的日利率將發送到您的智能合約地址，然後立即將它們重定向到您的錢包。該社區直接與行銷計畫壹起使用。可以在視頻中瞭解有關行銷計畫的更多資訊。',
                    contenLI15C:'15.被動收入可能嗎？JoKeR社區的構建方式使網路區塊節點的所有成員都可以互相幫助。被動收入是可能的；這取決於合作夥伴的活動，合作夥伴可以通過分享或參與流通最終出現在社區網路上。為了確保您將來會有被動收入，您需要做出堅定的努力以吸引新的合作夥伴並在JoKeR中打開新章程壹旦邀請了壹個活躍的社區節點加入團隊，您就已經可以賺到好多錢並實現目標。這種情況發生的速度完全取決於行動力',
                    contenLI16C:'16.如何感召網路節點？如果我無法號召該怎麽辦？您不必強迫他人參加。當前，許多朋友都對如何在網路數據中通過區塊鏈技術這場革命賺錢感興趣，其中很多很多的朋友正在積極尋求新的機會。您可以自己在社交網路上與他們會面，也可以設置自動銷售管道，以便任何有興趣的人都能找到您自己。您可以在JoKeR社區“學院”部分中找到有關此問題的更多詳細資訊。利用自己的優勢，觀看網路研討會，提問以體驗社區成員，您無需等待很長時間即可獲得成功。您的結果完全取決於行動力！',
                    contenLI17C:'17.可以獲取多少收益率？收入金額取決於您參與流通週期的活動和網路節點合作參與流通活動的品質指標。根據合作夥伴的數量，考慮JoKeR社區的4個不同的投資級別。首先，有壹個簡單的關係。合作的網路節點越多，籌集到的流通Token越多；夥伴品質指標越高，您將獲得的收入越高。',
                    contenLI18C:'18.我需要從JoKeR上提取加密數字貨幣資產嗎？JoKeR不保留任何加密數字貨幣資產，因此智能合約的餘額本身等於零龐大的數據都是社區流通量，您可以按照LINK親自查看。您的收入直接從JoKeR全球分佈式網路節點中直接進入您的個人加密數字貨幣錢包。只有您可以使用加密數字貨幣錢包，沒有其他任何客觀因素可以管理您的Token資產',
                    contenLI19C:'19.JoKeR是否會關閉？否，JoKeR數據完全公開可查可信任，JoKeR開源代碼已審計公開',
                    contenLI20C:'️️20.JoKeR全球分佈式流通不受任何國界政府部門干預，代碼即是規則即是法律，將永遠被智能合約強制執行，無法關閉及修改?什麽是直屬社区网络節点？什麽是区块网络节点日化收益率？直屬社区節點是指和您直接社区網絡鏈接的第壹級夥伴区块网络节点日化收益率是指参与流通的周期日化收益率JoKeR總共分為4個周期的分布式流通1日流通 7日流通15日流通 30日流通1日101% 7日110.5% 15日130%30日190%以流通10000 USDT举例说明参与流通15日10000USDT每日即获取2%即是200USDT 15日即是3000USDT15日合约到期的收益率13000USDT区块网络节点直属可获取收益率的30%',
                    contenLI21C:'21.JoKeR與谢尔盖·马夫罗季社区经济生态計劃思想有何不同？因為它沒有向其成員做出無法兌現的承諾。每個社区成员的成功都取決於生态网络社区节点JoKeR不會產生債務或其他義務JoKeR是采取区块链技术智能合约分布式流通，與金字塔計劃無關金字塔計劃的原理是，大部分資金都集中在其創造者的手中。您越早到達，您就可以獲得越多。金字塔計劃可以隨時關閉。JoKeR社区的成員，無論构建者還是JoKeR社区每一位都是平等的。沒有人可以終止社区的運行，因為它的功能是通過区块链网络智能合約來保證的，該合約不能被删除或更改。即使網站停止運行，只要有電和互聯網訪問，所有數據和整個結構將保持不變，並且智能合約將繼續運行。',
                    contenLI22C:'22.JoKeR有什麽風險？可以玩多久？JoKeR社区沒有任何硬性風險，唯一的客观风险是停止社区网络节点推行JoKeR没有任何的中央机构，所有社区网络节点用户无需要注册，无需要提现，只需要绑定自己的USDT(TRC20)加密数字货币钱包地址即可进行USDT(TRC20)的全球分布式流通与达成合约规定智能返回，您只需要持续邀请推行就可以收回您的流通，該社区基於區塊鏈系統中的智能合約運行，智能合約的代碼在公共領域。所有轉賬都直接進入您的加密数字货币錢包，而沒有任何隱藏的资产，也無需使用任何第三方資源。這保證了您所賺取的任何款項都屬於您自己。JoKeR一共有9个阶段，合约将从第0阶段开始自动运行，并且会根据每个阶段的实时钱包地址数量(a),资金流通量(b),资金返回量(c),历史升降幅度(d),线性周期(n)等数据计算得出当前阶段的预计结束时间(x ),周期公式:x ≈adc1!b1-c1+ad2c2!b2-c2+ad3c3!b3-c3+…adncn!bn-cn,  0≤x<+∞合约将从0阶段开始智能运行，并根据实时的地址数量，资产流通量，历史性涨幅，线性周期模拟得到当前阶段的结束时间周期，当达到该时间后,智能合约将自动重置并进入下一个阶段并且每提高一个阶段，ToKen资产流通的利润将自动提高50%，并且上一阶段所有的亏损钱包地址都将获得双倍资产金额的创阶奖励。这就意味着每一位JoKeR社区网络节点都系了9条生命线，就算1条生命线，时间久衰竭了，还有第2条，第3条，甚至第9条生命线，而且每一条生命线都将会越来越强壮，所有的操作指令全程由区块链技术智能合约实现，因此这是完全安全的。举例智能合约进入第1阶段生命线时，将有10%流通Token资产进入创阶奖池，自动发放给上一阶段所有亏损的钱包地址，第二阶生命线将有20%流通ToKen资产流入创阶奖池，用于发放上一阶的亏损加密数字货币钱包地址。第三阶将有30%的流通ToKen资产进入创阶奖池，用于发放第二阶所有亏损加密钱包地址，以此类推，直至到第九阶将有流通量的90%用于发放上一阶亏损的钱包地址。每个亏损地址都可获得亏损额的2倍创阶奖励。当上一阶所有亏损地址的创阶奖励发放完毕后，创阶奖池不再流入ToKen资产。',



                    sigOut: '登出',
                    sigIn: '登入',
                    syslang: '系統語言',
                    circulation: '流通量',
                    Walkinglantern:'提防虛假資源。社區JoKeR只有壹個站點地址www.JoKeR.pet',
                    predict: '預估結束倒計時',
                    ring: '當前輪數',
                    description: 'JoKeR無法停止，它無法關閉，它無法被第三方幹預，您也無法被程序禁止，将永續被系统執行',
                    join: '如何加入',
                    joinDesc: '<p>1：使用网络节点分享鏈接進入後登入您的USDT（TRC20）錢包地址自動激活账户进行decentralized finance（DeFi）流通性智能挖矿<\/p> <p>2：選擇流通周期，並向付幣地址支付您需要流通的USDT（TRC20）數量。<\/p><p>3：流通到期後，合約將自動返回增長後的USDT(TRC20)至您的錢包地址。<\/p>',
                    share: 'JoKeR介紹',
                    shareDesc: '<p>1：JoKeR DEFI采用分布式去中心化的流通返回方式，DEFI從第0輪開始自動運行，當流通量不足以支付返回量時，DEFI將自動重置並進入下壹輪，最高達到第9輪。<\/p> <p>2：每提高壹輪，資金流通收益率將自動提高50%，用於激勵下壹輪的參與熱度。<\/p><p>3：每提高壹輪，將有10%-90%的流通資金進入創輪獎池，用於雙倍獎勵上壹輪所有虧損的錢包地址。<\/p>',
                    ruleDesc: '<p>4：USDT（TRC20）第0輪時流通獎勵規則：<br>流通1天後返回101%，流通7天後返回110.5%，流通15天後返回130% ，流通30天後返回190%<\/p><p>5：分享獎勵規則：<br>自己每多流通100USDT,就可多拿壹代的分享獎勵，最高能夠獲得20代的分享獎勵。<br>自己流通100USDT，可獲得1代每次收益的30%<br>自己流通200USDT，可獲得2代每次收益的20%<br>自己流通300USDT，可獲得3代每次收益的10%<br>自己流通400-1000USDT，可獲得4-10代每次收益的5%<br>自己流通1100-2000USDT，可獲得11-20代每次收益的1%<\/p>',
                    present: '開源代碼',
                    prizeLog: '獎金明細',
                    contAddress: '請輸入您的USDT(TRC20)錢包地址',
                    startCir: '開始流通',
                    back: '退回',
                    contContract: '匯統',
                    coutAddre: '歷史參與地址',
                    countCirul: '歷史參與流通',
                    prizePool: '創輪獎池',
                    loginSuccTip: '登錄成功',
                    sharePlan: 'JoKeR分享計劃',
                    shareTip: '使用任何錢包地址向該地址付幣，資金流通到期後，返回至登入的錢包地址',
                    shareLink: '分享鏈接',
                    friendsTotal: '節點總地址數',
                    fCirculatTotal: '節點流通總量',
                    tissue: '節點地址',
                    personal1st: '個人1代節點',
                    personal2st: '個人2代節點',
                    personal3st: '個人3代節點',
                    personal4st: '個人4-10代節點',
                    personal11st: '個人11-20代節點',
                    copyText: '復制',
                    personalData: '個人數據統計',
                    circulateUsdt: '個人總流通USDT',
                    returnUsdt: '個人總返回USDT',
                    shareReward: '個人分享獎勵USDT',
                    innovatReward: '個人創輪獎勵USDT',
                    curPersonalPL: '當前個人總盈虧USDT',
                    recharge: '充值',
                    hashOrder: '我的訂單',
                    cirTime: '流通周期',
                    circulationIn: '流通金額',
                    status: '狀態',
                    view: '查看',
                    loginTip: '請綁定您正確USDT(TRC20)錢包地址',
                    loginTip1:'用戶已被禁用',
                    qrCCode: '付幣二維碼',
                    qrCCodeExpir: '二維碼失效時間',
                    cirReturn: '流通返回',
                    trcErrTip: 'TRX地址格式不正確',
                    occupy: '分布式DEFI地址，是否進入區塊瀏覽器查看',
                    troAdrrs: '透明地址',
                    address: '地址',
                    regTime: '註冊時間',
                    cTime: '時間',
                    current: '當前',
                    amount: '金額',
                    cirRes: '流通→返回',
                    msg: {
                        busy: '系統繁忙，請稍後再試！',
                        paramErr: '參數錯誤',
                        Occupy:'分布式DEFI地址，是否進入區塊瀏覽器查看',
                    },
                    period: {
                        year: '年', month: '月', day: '天', hrs: '時', mins: '分', secs: '秒',
                    },
                    oStatus: ['流通中', '返還中', '已完成', '熔斷'],
                    oFail:'失敗',
                    quest:'遇到問題',
                    mtoken:'合作令牌',
                }
            }, 
            ja: {
                message: {
                    lang: '日本語',
                    LSOSOSOq:'トリガーされない',
                    loginTip1:'ユーザが無効になりました',

                    ecosystemLIS:'JoKeRスマートコントラクトのコードはこちらでご覧いただけますので、プロジェクトの',

                    loginTip2:'分散式DEFIアドレスはブロックチェーンブラウザに入るかどうか確認してください。',

                    ecosystemLISPO:'一般的な問題',
                    ecosystemLISPO1:' スマートコントラクトテクノロジー-これは、今日の分散型経済における新しい現象です<\/br> デジタル資産の財務フローを処理および配布します<\/br> すべてのプロセスは、オープンで分散型のブロックチェーンキャビネットで実行されます<\/br>JoKeR暗号通貨インフラストラクチャはそのような契約をサポートします',
                    

                    ecosystemLIS1:'ゼロリスク',
                    ecosystemLIS2:'JoKeRの開発者は、永続的でどのエンティティも変更できない自己実行型のスマートコントラクトをTRONブロックチェーンに展開しました',

                    ecosystemLIS3:'インスタントトランザクション',
                    ecosystemLIS4:'他のメンバーからの利益はあなたの個人的な財布に直接入り、システムに蓄積はなく、利益はあなただけに帰属します',

                    ecosystemLIS5:'条件付き不変性',
                    ecosystemLIS6:'JoKeRスマートコントラクトは、参加者間のピアツーピアの手数料支払いを容易にすることができる単なる支払いゲートウェイです',

                    ecosystemLIS7:'分散化',
                    ecosystemLIS8:'管理者や管理者はいません。他のすべての人と対等な立場でプロジェクトに参加するのはクリエイターだけです。',

                    ecosystemLIS9:'透明性と匿名性',
                    ecosystemLIS10:'スマートコントラクトは公開されており、誰でもコードとトランザクションレコード全体を見ることができます。これにより、システムと実際のプロジェクト統計の整合性が保証されます。',

                    ecosystemLIS11:'100％オンライン',
                    ecosystemLIS12:'すべての資金は隠された料金なしでメンバー間で転送され、契約残高は常にゼロです',


                    contenLI1:'1.ジョーカーとは何ですか',
                    contenLI2:'2. JoKeRプラットフォームを管理するのは誰ですか？',
                    contenLI3:'3.ジョーカーを作成したのは誰ですか？',
                    contenLI4:'4.スマートコントラクトとは何ですか？ その利点は何ですか？',
                    contenLI5:'5.何に参加する必要がありますか？',
                    contenLI6:'6.どのウォレットを使用すればよいですか？',
                    contenLI7:'7. JoKeRに関する詳細情報はどこで入手できますか？',
                    contenLI8:'8. Tronウォレットを作成するには何が必要ですか？',
                    contenLI9:'9.暗号化されたデジタル通貨の処理にこれまで参加したことがない場合、BTC ETH USDT TRXを売買するにはどうすればよいですか',
                    contenLI10:'10. JoKeRコミュニティでの流通に参加するにはどうすればよいですか？',
                    contenLI11:'11.パートナーなしでオンラインで流通登録できますか？',
                    contenLI12:'12. JoKeRコミュニティとの協力を中断すると、アカウントはどうなりますか？',
                    contenLI13:'13.回覧に参加しましたが、次のステップはどうすればよいですか？',
                    contenLI14:'14.ジョーカーを通じて目標を達成する方法は？',
                    contenLI15:'15.受動的収入は可能ですか？',
                    contenLI16:'16.ネットワークノードを刺激する方法は？電話できない場合はどうなりますか？',
                    contenLI17:'17.どのくらいの収益率を得ることができますか？',
                    contenLI18:'18.ジョーカーから暗号化されたデジタル通貨資産を引き出す必要がありますか？',
                    contenLI19:'19.ジョーカーはシャットダウンしますか？',
                    contenLI20:'20.JoKeRグローバル分散流通はいかなる国境の政府部門の介入を受けないで、コードはつまり規則です。つまり法律です。永遠に知能契約によって強制執行されます。閉鎖と修正ができないです。直属のコミュニティネットワークノードとは何ですか？ブロックネットワークノードの日化収益率は何ですか？',
                    contenLI21:'21.JoKeRとSergeyMavrodiのコミュニティの経済的および生態学的計画の違いは何ですか？',
                    contenLI22:'22.ジョーカーのリスクは何ですか？どれくらいプレイできますか？',
                    contenLI1C:'1.ジョーカーとは何ですか JoKeRは、グローバルな分散型エコシステムの国際的な分散型流通であり、TRONスマートコントラクトマーケティングの流通シナリオとしては初めてです。 これは、特定の条件下でグローバル分散コミュニティのメンバー間でパートナー報酬を分配する機能を実行できる自己実行型ソフトウェアアルゴリズムです（流通マーケティング計画）。 契約コードは公開されています。 トランザクションに関する情報は、https：//tronscan.ioのリンクでいつでも表示できます。',
                    contenLI2C:'2. JoKeRプラットフォームを管理するのは誰ですか？ JoKeRプラットフォームは、トランザクションを自動的に実行するグ​​ローバル分散スマートコントラクトで構成されており、トランザクションプロセスの客観的な要因によって干渉されることはありません。',
                    contenLI3C:'3.ジョーカーを作成したのは誰ですか？ JoKeRのコンセプトは、グローバルに分散された暗号化されたデジタル通貨愛好家組織に属しています。彼らはコミュニティのメンバーであり、特別な特権はありません。コードはルールと法律です。現在、JoKeRは、プラットフォームメンバーが属するピアツーピアコミュニティであり、プラットフォーム自体もこのコミュニティに属しています。',
                    contenLI4C:'4.スマートコントラクトとは何ですか？ その利点は何ですか？ スマートコントラクトは、暗号化されたデジタル通貨ブロックチェーンテクノロジーのアルゴリズムです。 TRONは、JoKeR分散循輪スマートコントラクトを作成するための最初の選択肢です。 このタイプの契約の主な目的は、関係を自動化し、コミットメントを自動化する機会を与えることです。',
                    contenLI5C:'5.何に参加する必要がありますか？ あなたはすでにあなたが必要とするほとんどすべてを持っています。残りは、暗号化されたデジタル通貨ウォレットとテレグラムをデバイス（スマートフォン、タブレット、PC）にインストールして、グローバルに分散して流通させることです。',
                    contenLI6C:'6.どのウォレットを使用すればよいですか？ JoKeRは、すべてのTRON暗号化デジタル通貨ウォレットに適用できます。次のことをお勧めします。Pobao TronLinkウォレット、iMToKen、ToKenPocketは、モバイルデバイス（スマートフォン、タブレット）をサポートし、コンピューターとラップトップもサポートします。Chrome拡張機能を使用する必要があります。 TronLinkウォレットの公式アドレス：https：//www.tronlink.org/ 插件擴展程式。TronLink錢包官方地址：https://www.tronlink.org/',
                    contenLI7C:'7. JoKeRに関する詳細情報はどこで入手できますか？ Telegramで確認済みのJoKeRチャンネルに登録します。 JoKeRの配布メンバーに質問を送信すると、彼らは喜んで経験を共有します。Telegramt.me/JoKeRのチャットに参加してください。また、ウェブサイトの「大学」セクションの資料を調べることをお勧めします。',
                    contenLI8C:'8. Tronウォレットを作成するには何が必要ですか？ PCの場合は、ウェブサイトtronlink.orgにアクセスして、ブラウザの拡張機能をインストールする必要があります。モバイルデバイスの場合、Pobao TronLink WalletAppをインストールする必要があります登録の際は、暗号化されたデジタル通貨ウォレットのパスワードを安全に保管することを忘れないでください。',
                    contenLI9C:'9.暗号化されたデジタル通貨の処理にこれまで参加したことがない場合、BTC ETH USDT TRXを売買するにはどうすればよいですか ? 法定通貨（通常通貨）と引き換えに暗号通貨を売買する方法はたくさんあります。これらはすべて暗号化されたデジタル通貨ユーザー向けに設計されており、ユーザーフレンドリーなインターフェースを備えています。法定通貨をデジタル通貨に変換する最初のトランザクションは、5分以内で完了します。実績のある為替アグリゲーターbestchange.ruを使用することをお勧めします',
                    contenLI10C:'10. JoKeRコミュニティでの流通に参加するにはどうすればよいですか？ JoKeRでの流通に参加するには、作成したスマートコントラクトに流通期間を送信して、JoKeR分散流通アカウントをアクティブ化する必要があります。流通期間自体を選択することは、コミュニティへの登録を構成します。注意：暗号化されたデジタル通貨ウォレットを再充電するときは、ネットワーク手数料を考慮する必要があります。これは通常、約1TRXです。',
                    contenLI11C:'11.パートナーなしでオンラインで流通登録できますか？ はい。招待リンクなしで登録すると、JoKeR分散ノードチームIDにアクセスできます。',
                    contenLI12C:'12. JoKeRコミュニティとの協力を中断すると、アカウントはどうなりますか？ 強い意志があっても、誰もあなたのアカウントを閉鎖することはできません。アカウントは常にTRONネットワークブロックの1つに保存されます。ただし、各共有分散循輪ネットワークノードから引き続き収益を得ることができなくなります。',
                    contenLI13C:'13.回覧に参加しましたが、次のステップはどうすればよいですか？ JoKeRコミュニティと効果的にやり取りするには、次のことを行う必要があります。1.流通期間の決済プロセスを待つ2.あなたを招待した人または他の経験豊富なメンバーとチャットします。彼らはあなたが最初の一歩を踏み出すのを助けます。3.コミュニティで効果的に作業する方法に関するコースが含まれている「大学」セクションに移動します。',
                    contenLI14C:'14.ジョーカーを通じて目標を達成する方法は？ これは、パートナーのネットワークの確立に基づいています。あなたは潜在的なパートナーにコミュニティの可能性を紹介し、彼らがあなたと協力することを奨励します。ネットワークノードを使用するパートナーは、定期的な流通トランザクションへの参加によって生成される毎日の金利がスマートコントラクトアドレスに送信され、すぐにウォレットにリダイレクトされます。コミュニティは、マーケティングプロジェクトで直接使用されます。マーケティングプランの詳細については、ビデオをご覧ください。',
                    contenLI15C:'15.受動的収入は可能ですか？ JoKeRコミュニティは、ネットワークブロックノードのすべてのメンバーが互いに助け合うことができるように構築されています。受動的な収入は可能です。それはパートナーの活動に依存し、パートナーは最終的に共有または流通への参加を通じてコミュニティネットワークに現れることができます。将来的に受動的な収入を確実に得るためには、新しいパートナーを引き付け、ジョーカーで新しいチャーターを開くために断固とした努力をする必要がありますアクティブなコミュニティノードをチームに招待すると、すでに多くのお金を稼ぎ、目標を達成することができます。これが発生する速度は、モビリティに完全に依存します',
                    contenLI16C:'16.ネットワークノードを刺激する方法は？電話できない場合はどうなりますか？ 他の人に参加を強制する必要はありません。現在、多くの友人がネットワークデータのブロックチェーン技術の革命を通じてお金を稼ぐ方法に興味を持っており、彼らの多くは積極的に新しい機会を模索しています。自分でソーシャルネットワークで会うことも、興味のある人が自分を見つけられるように自動販売チャネルを設定することもできます。この問題の詳細については、JoKeRコミュニティの「College」セクションをご覧ください。自分の強みを生かし、ウェビナーを視聴し、質問をしてコミュニティメンバーを体験してください。成功するまで、長い間待つ必要はありません。あなたの結果は完全にあなたの行動能力に依存します！',
                    contenLI17C:'17.どのくらいの収益率を得ることができますか？ 収入額は、循輪サイクル活動への参加と、循輪活動に参加しているネットワークノードの品質指標によって異なります。パートナーの数に応じて、ジョーカーコミュニティの4つの異なる投資レベルが考慮されます。まず、単純な関係があります。協力するネットワークノードが多いほど、より多くの循輪トークンを調達できます。パートナー品質インデックスが高いほど、得られる収入も高くなります。',
                    contenLI18C:'18.ジョーカーから暗号化されたデジタル通貨資産を引き出す必要がありますか？ JoKeRは暗号化されたデジタル通貨資産を保持していないため、スマート契約自体の残高はゼロになります。膨大な量のデータはコミュニティの流通であり、LINKをたどって直接確認できます。あなたの収入は、JoKeRグローバル分散ネットワークノードからあなたの個人的な暗号化されたデジタル通貨ウォレットに直接入ります。暗号化されたデジタル通貨ウォレットを使用できるのはあなただけであり、他の客観的な要因でトークン資産を管理することはできません',
                    contenLI19C:'19.ジョーカーはシャットダウンしますか？ いいえ、JoKeRデータは完全に公開されており、チェック可能で信頼できます。JoKeRのオープンソースコードは監査され、公開されています。￼ジョーカーのグローバルな分散流通は、国境政府の介入の対象ではありません。コードは規則と法律であり、常にスマート契約によって施行され、閉鎖または変更することはできません。',
                    contenLI20C:'️️️️20.JoKeRグローバル分散流通はいかなる国境の政府部門の介入を受けないで、コードはつまり規則です。つまり法律です。永遠に知能契約によって強制執行されます。閉鎖と修正ができないです。直属のコミュニティネットワークノードとは何ですか？ブロックネットワークノードの日化収益率は何ですか？直属コミュニティノードは直接コミュニティネットワークにリンクする第一級のパートナーシップブロックネットワークノードの日化収益率とは、流通に参加する周期の日化収益率JoKeRの計4サイクルに分類された分散型流通が1日に流通し、7日に流通することを指します。1日に101%が流通します。7日に110.5%15日に、130%が30日に流通10000 USDTの例では、流通15日に参加します。15日には30000 US DT 15契約が満了した収益率13000 USDTブロックネットワークノードの直属の収益率の30%が得られます。',
                    contenLI21C:'21.JoKeRとSergeyMavrodiのコミュニティの経済的および生態学的計画の違いは何ですか？それはそのメンバーに実現不可能な約束をしなかったからです。各コミュニティメンバーの成功は、エコロジカルネットワークコミュニティノードに依存します。ジョーカーは債務やその他の義務を負いません。JoKeRは、ブロックチェーンテクノロジーに基づくスマートコントラクトの分散循輪であり、ピラミッドスキームとは関係ありません。ピラミッドスキームの原則は、資金のほとんどがその作成者の手に集中することです。早く到着すればするほど、より多くを得ることができます。ピラミッドスキームはいつでも閉じることができます。ビルダーやジョーカーコミュニティの全員が平等であるかどうかに関係なく、ジョーカーコミュニティのメンバーは平等です。コミュニティの機能はブロックチェーンネットワークスマートコントラクトによって保証されており、削除または変更できないため、コミュニティの運用を終了することはできません。ウェブサイトが停止しても、電気とインターネットアクセスがあれば、すべてのデータと構造全体が変更されず、スマートコントラクトは引き続き機能します。',
                    contenLI22C:'22.ジョーカーのリスクは何ですか？どれくらいプレイできますか？JoKeRコミュニティには、ハードリスクはありません。唯一の客観的なリスクは、コミュニティネットワークノードの実装を停止することです。JoKeRには中央権限がありません。すべてのコミュニティネットワークノードユーザーは、現金を登録または引き出す必要はありません。USDT（TRC20）グローバル分散循輪を実行して契約を結ぶには、USDT（TRC20）暗号化デジタル通貨ウォレットアドレスをバインドするだけで済みます。スマートリターンが規定されています。引き続き実装を招待して流通を撤回する必要があります。コミュニティはブロックチェーンシステムのスマートコントラクトに基づいて実行され、スマートコントラクトのコードはパブリックドメインにあります。すべての転送は、隠された資産やサードパーティのリソースを使用せずに、暗号化されたデジタル通貨ウォレットに直接送信されます。これにより、あなたが稼いだお金はすべてあなたのものになります。ジョーカーには合計9つのステージがあり、契約はステージ0から自動的に実行され、リアルタイムのウォレットアドレスの数（a）、ファンドの流通（b）、ファンドのリターン（c）、および過去の変動（ d）、線形期間（n）およびその他のデータを計算して、現在のステージの推定終了時間（x）を取得します。期間式：x≈adc1！b1-c1 + ad2c2！b2-c2 + ad3c3！b3-c3 +…adncn！bn-cn、0≤x<+∞契約はステージ0からインテリジェントに実行を開始し、リアルタイムアドレスの数、資産の循輪、履歴の増加、線形サイクルシミュレーションに基づいて、現在のステージの終了期間が取得されます。この時間に達すると、スマートコントラクトは自動的にリセットされ、次のステージに入ります。ステージまた、ステージを上げるたびに、ToKenの資産循輪の利益が自動的に50％増加し、前のステージのすべての赤字のウォレットアドレスは、資産の2倍の作成報酬を受け取ります。これは、すべてのJoKeRコミュニティネットワークノードが9つのライフラインに関連付けられていることを意味します。1つのライフラインが長期間使い果たされた場合でも、2番目、3番目、さらには9番目のライフラインがあり、各ライフラインはそれはますます強くなり、すべての操作手順はブロックチェーンテクノロジーのスマートコントラクトによって実装されるため、これは完全に安全です。たとえば、スマートコントラクトがライフラインの第1段階に入ると、循輪するトークン資産の10％が作成賞金プールに入り、前の段階でお金を失ったすべてのウォレットアドレスに自動的に配布され、循輪するToKen資産の20％がライフラインの第2段階で作成賞金プールに流れ込みます。以前のレベルの赤字暗号化デジタル通貨ウォレットアドレスを発行するために使用されます。第3段階では、循輪するToKen資産の30％が作成賞金プールに入り、第2段階のすべての赤字暗号ウォレットアドレスを発行するために使用されます。以下同様に、第9段階では、前の段階の発行に使用される循輪量の90％が使用されます。紛失したウォレットのアドレス。各赤字アドレスは、赤字報酬の2倍の金額を受け取ることができます。前のレベルのすべての赤字アドレスに対する作成報酬が発行されると、作成ボーナスプールはToKenアセットに流れなくなります。',





                    sigOut: 'サインアウト',
                    ecosystem1:'全世界分布型生態システム',
                    sigIn: 'サインイン',
                    syslang: 'システム言語',
                    circulation: 'サーキュレーション',
                    Walkinglantern:'虚偽の資源に注意する。コミュニティJoKeRは一つのサイトアドレスしかありません。www.JoKeR.pet',
                    predict: '見積もりの​​最後までのカウントダウン',
                    ring: '現在のリング番号',
                    description: 'JoKeRは停止できませんでした。第三者による干渉ができないため、プログラムによって禁止されず、システムによって継続的に実行されます。',
                    join: '参加する',
                    joinDesc: '<p> 1：ネットワークノードを使ってリンクを共有してログインしたらUSDT（TRC 20）ウォレットアドレスが自動的にアクティブになります。 <\ / p> <p> 2：流通期間を選択し、流通に必要なUSDT（TRC20）の金額を支払い先住所に支払います。 <\ / p> <p> 3：流通の期限が切れると、契約により、増加したUSDT（TRC20）が自動的にウォレットアドレスに返されます。 <\ / p>',
                    share: 'リング紹介',
                    shareDesc: '<p> 1：9リングのスマートコントラクトは、分散型および分散型の循輪リターン方式を採用しています。スマートコントラクトは、0番目のリングから自動的に実行されます。循輪がリターンの支払いに十分でない場合、スマートコントラクトは自動的にリセットされ、次のリングに入ります。リング、9番目のリングまで。 <\ / p> <p> 2：1つのリンクを増やすたびに、資本循輪の収益率が自動的に50％増加します。これは、次のリンクへの参加を促すために使用されます。 <\ / p> <p> 3：リンクが1つ増えるごとに、循輪資金の10％〜90％がChuanghuan賞金プールに入ります。これは、前のリンクでお金を失ったすべてのウォレットアドレスに2倍の報酬を与えるために使用されます。 <\ / p>',
                    ruleDesc: '<p> 4：0番目のリングでのUSDT（TRC20）循輪報酬ルール：<br>流通は1日後に101%に戻り、流通は7日後に110.5%に戻り、流通は15日後に130%に戻り、流通は30日後に190%に戻る。<\ / p> <p> 5：共有報酬ルール：<br> 100 USDTを配布するたびに、1世代の共有報酬を取得でき、最大20世代の共有報酬を取得できます。 <br> 100 USDTを自分で回覧すると、各世代の収入の30％を得ることができます。<br> 200 USDTを自分で回覧すると、第2世代の収入の20％を得ることができます。 ％<br> 400-1000USDTを自分で循輪させ、4-10世代の各収入の5％を取得します<br> 1100-2000USDTを自分で循輪させ、11-20世代の各収入の1％を取得します<\ / p>',
                    present: 'コード',
                    prizeLog: 'ボーナスの詳細',
                    contAddress: 'スマート契約アドレスUSDT（TRC20）を入力してください',
                    startCir: '循輪を開始します',
                    back: '戻る',
                    contContract: '契約統計',
                    coutAddre: '契約住所の数',
                    countCirul: '流通している契約の数',
                    prizePool: 'イノベーション賞金プール',
                    loginSuccTip: 'ログイン成功',
                    sharePlan: 'JoKeR共有計画',
                    shareTip: '任意のウォレットアドレスを使用してこのアドレスに支払い、資金の流通が期限切れになった後、ログインしたウォレットアドレスに戻ります',
                    shareLink: '共有リンク',
                    friendsTotal: '友達の総数',
                    fCirculatTotal: '友達の総循輪',
                    tissue: 'ノードアドレス',
                    personal1st: '個人1世代ノード',
                    personal2st: '個人2世代ノード',
                    personal3st: '個人3世代ノード',
                    personal4st: '個人4-10世代ノード',
                    personal11st: '個人11-20世代ノード',
                    copyText: 'コピー',
                    personalData: '個人データ統計',
                    circulateUsdt: '個々の総循輪USDT量',
                    returnUsdt: 'USDTの個別のトータルリターン額',
                    shareReward: '個人シェア報酬USDT金額',
                    innovatReward: '個人作成報酬USDTの金額',
                    curPersonalPL: '現在の個人の損益USDTの合計額',
                    recharge: '充電する',
                    hashOrder: 'スマートコントラクトオーダー',
                    cirTime: '循輪サイクル',
                    circulationIn: '循輪量',
                    status: '状態',
                    view: '見る',
                    loginTip: 'スマートコントラクトアドレスUSDT（TRC20）をバインドしてください',
                    qrCCode: '支払いQRコード',
                    qrCCodeExpir: 'QRコードの有効期限',
                    trcErrTip: 'TRXアドレス形式が正しくありません',
                    cirReturn: '循輪リターン',
                    occupy: '分散型スマートコントラクトアドレス、チェックするためにブロックエクスプローラーに入るかどうか',
                    address: '住所',
                    regTime: '登録時間',
                    troAdrrs: 'Transparent address',
                    cTime: '時間',
                    current: '電流',
                    amount: '量',
                    cirRes: '循輪→戻る',
                    msg: {
                        busy: 'システムがビジーです。しばらくしてからもう一度お試しください。',
                        paramErr: 'パラメータエラー',
                        Occupy:'分散型スマートコントラクトアドレス、チェックするためにブロックエクスプローラーに入るかどうか',
                    },
                    period: {
                        year: '年', month: '月', day: '天', hrs: '時', mins: '分', secs: '秒',
                    },
                    oStatus: ['流通中','復帰','完了','融合'],
                    oFail:'失敗',
                    quest:'遭遇問題',
                    mtoken:'協力トークン',
                }
            },
            ko: {
                message: {
                    lang: '한국어',
                    sigOut: '로그 아웃',
                    loginTip1:'사용자 가 비활성화 되 었 습 니 다',
                    ecosystemLISPO:'일반적인 문제',
                    ecosystemLISPO1:' 스마트 계약 기술-이것은 오늘날 탈 중앙화 경제에서 새로운 현상입니다<\/br>디지털 자산의 재무 흐름을 처리하고 배포합니다<\/br>모든 프로세스는 개방적이고 분산 된 블록 체인 캐비닛에서 수행됩니다<\/br>JoKeR 암호 화폐 인프라는 이러한 계약을 지원합니다',
                    loginTip2:'분포 식 DEFI 주소, 블록 체인 브 라 우 저 에 들 어가 서 확인 할 지 여부',

                    ecosystemLIS:'여기에서 JoKeR 스마트 계약의 코드를 완전히 볼 수 있으므로 프로젝트의 안전과 장기 운영에 대한 완전한 확신을 가질 수 있습니다!',

                    LSOSOSOq:'트리거되지 않음',
                    ecosystemLIS1:'위험 없음',
                    ecosystemLIS2:'JoKeR 개발자는 영구적으로 존재하며 TRON 블록 체인의 어떤 엔티티도 수정할 수없는 자체 실행 스마트 계약을 배포했습니다.',

                    ecosystemLIS3:'즉시 거래',
                    ecosystemLIS4:'다른 회원의 이익은 개인 지갑에 직접 입력되며 시스템에 누적되지 않으며 이익은 귀하에게만 해당됩니다.',

                    ecosystemLIS5:'조건부 불변',
                    ecosystemLIS6:'JoKeR 스마트 계약은 참가자 간의 P2P 수수료 지불을 용이하게 할 수있는 지불 게이트웨이입니다.',

                    ecosystemLIS7:'분산',
                    ecosystemLIS8:'관리자 나 관리자가 없으며 제작자 만 다른 모든 사람과 동등하게 프로젝트에 참여합니다.',

                    ecosystemLIS9:'투명성과 익명 성',
                    ecosystemLIS10:'스마트 계약은 공개되어 누구나 코드와 전체 거래 기록을 볼 수있어 시스템의 무결성과 실제 프로젝트 통계를 보장합니다.',

                    ecosystemLIS11:'100 % 온라인',
                    ecosystemLIS12:'모든 자금은 숨겨진 수수료없이 회원간에 이체되며 계약 잔액은 항상 0입니다.',



                    contenLI1:'1. 조커는 무엇입니까?',
                    contenLI2:'2. JoKeR 플랫폼은 누가 관리합니까?',
                    contenLI3:'3. 누가 조커를 만들었습니까?',
                    contenLI4:'4. 스마트 계약이란 무엇입니까? 장점은 무엇입니까?',
                    contenLI5:'5. 가입하려면 무엇이 필요합니까?',
                    contenLI6:'6. 어떤 지갑을 사용해야합니까?',
                    contenLI7:'7. JoKeR에 대한 자세한 정보는 어디서 얻을 수 있습니까?',
                    contenLI8:'8. Tron 지갑을 생성하려면 무엇이 필요합니까?',
                    contenLI9:'9. 이전에 암호화 된 디지털 화폐 처리에 참여한 적이 없다면 BTC ETH USDT TRX를 어떻게 사고 팔 수 있습니까?',
                    contenLI10:'10. 조커 커뮤니티의 순환에 참여하는 방법은 무엇입니까?',
                    contenLI11:'11. 파트너없이 온라인으로 배포 할 수 있습니까?',
                    contenLI12:'12. 조커 커뮤니티와의 협력을 중단하면 내 계정은 어떻게됩니까?',
                    contenLI13:'13. 유통에 참여했는데 다음 단계에서 어떻게해야하나요?',
                    contenLI14:'14. JoKeR를 통해 목표를 달성하는 방법은 무엇입니까?',
                    contenLI15:'15. 수동 소득이 가능합니까?',
                    contenLI16:'16. 네트워크 노드에 영감을주는 방법은 무엇입니까? 전화 할 수 없으면 어떻게하나요?',
                    contenLI17:'17. 얼마나 많은 수익률을 얻을 수 있습니까?',
                    contenLI18:'18. JoKeR에서 암호화 된 디지털 통화 자산을 인출해야합니까?',
                    contenLI19:'19. 조커가 종료됩니까?',
                    contenLI20:'20. JoKeR 글로벌 분포 식 유통 은 그 어떠한 국경 정부 부서 의 간섭 을 받 지 않 습 니 다. 코드 는 바로 규칙 입 니 다. 즉, 법률 입 니 다. 스마트 계약 에 의 해 영원히 강제 집행 되 고 닫 히 거나 수정 할 수 없습니다. 무엇이 지역사회 네트워크 노드 입 니까?무엇이 블록 네트워크 노드 의 일 일 화 된 수익 률 입 니까?',
                    contenLI21:'21. JoKeR와 Sergey Mavrodi의 지역 사회 경제 및 생태 계획의 차이점은 무엇입니까?',
                    contenLI22:'22. JoKeR의 위험은 무엇입니까? 얼마나 오래 플레이 할 수 있습니까?',
                    contenLI1C:'1. 조커는 무엇입니까? JoKeR는 글로벌 분산 생태계의 국제 분산 유통이며 최초의 TRON 스마트 계약 마케팅 및 유통 시나리오이기도합니다. 특정 조건 (유통 마케팅 계획)에서 글로벌 분산 커뮤니티 구성원들에게 파트너 보상을 분배하는 기능을 실행할 수있는 자체 실행 소프트웨어 알고리즘입니다. 계약 코드는 공개적으로 사용할 수 있습니다. 거래에 대한 정보는 항상 https://tronscan.io 링크에서 볼 수 있습니다.',
                    contenLI2C:'2. JoKeR 플랫폼은 누가 관리합니까? JoKeR 플랫폼은 트랜잭션을 자동으로 실행하는 글로벌 분산 스마트 계약으로 구성되며 트랜잭션 프로세스의 객관적인 요소에 의해 방해받지 않습니다.',
                    contenLI3C:'3. 누가 조커를 만들었습니까? JoKeR 개념은 전 세계적으로 분산 된 암호화 된 디지털 통화 애호가 조직에 속합니다. 이들은 특별한 권한없이 커뮤니티의 구성원입니다. 코드는 규칙이자 법입니다. 오늘날 JoKeR는 플랫폼 구성원이 속한 P2P 커뮤니티이며 플랫폼 자체도이 커뮤니티에 속합니다.',
                    contenLI4C:'4. 스마트 계약이란 무엇입니까? 장점은 무엇입니까? 스마트 계약은 암호화 된 디지털 통화 블록 체인 기술의 알고리즘입니다. TRON은 JoKeR 분산 순환 스마트 계약을 생성하기위한 첫 번째 선택입니다. 이 유형의 계약의 주요 목적은 관계를 자동화하고 약속을 자동 실행의 기회로 만드는 것입니다.',
                    contenLI5C:'5. 가입하려면 무엇이 필요합니까? 필요한 거의 모든 것이 이미 있습니다. 나머지는 암호화 된 디지털 화폐 지갑과 텔레 그램을 장치 (스마트 폰, 태블릿, PC)에 설치하여 전 세계적으로 유통되는 것입니다.',
                    contenLI6C:'6. 어떤 지갑을 사용해야합니까? JoKeR는 모든 TRON 암호화 디지털 통화 지갑에 적용됩니다. 다음을 권장합니다.Pobao TronLink 지갑, iMToKen, ToKenPocket은 모바일 장치 (스마트 폰, 태블릿)를 지원하고 Chrome 확장 프로그램을 사용해야하는 컴퓨터와 노트북도 지원합니다. TronLink 지갑 공식 주소 : https://www.tronlink.org/',
                    contenLI7C:'7. JoKeR에 대한 자세한 정보는 어디서 얻을 수 있습니까? Telegram에서 확인 된 조커 채널을 구독하십시오. JoKeR 분산 회원에게 질문을 보내면 기꺼이 경험을 공유 할 수 있습니다.Telegram t.me/JoKeR에서 채팅에 참여하세요. 또한 웹 사이트의 "대학"섹션에서 자료를 조사하는 것이 좋습니다.',
                    contenLI8C:'8. Tron 지갑을 생성하려면 무엇이 필요합니까? PC의 경우 웹 사이트 tronlink.org로 이동하여 브라우저 용 확장 프로그램을 설치해야합니다.모바일 장치의 경우 Pobao TronLink 지갑 앱을 설치해야합니다.등록시 암호화 된 디지털 화폐 지갑 비밀번호를 안전하게 보관하는 것을 잊지 마십시오.',
                    contenLI9C:'9. 이전에 암호화 된 디지털 화폐 처리에 참여한 적이 없다면 BTC ETH USDT TRX를 어떻게 사고 팔 수 있습니까? 법정 통화 (일반 통화)와 교환하여 암호 화폐를 사고팔 수있는 방법은 많습니다. 이들은 모두 암호화 된 디지털 통화 사용자를 위해 설계되었으며 사용자 친화적 인 인터페이스를 가지고 있습니다. 법적 통화를 디지털 통화로 변환하는 첫 번째 거래는 5 분 이상 걸리지 않습니다. 입증 된 환전 어 그리 게이터 bestchange.ru를 사용하는 것이 좋습니다.',
                    contenLI10C:'10. 조커 커뮤니티의 순환에 참여하는 방법은 무엇입니까? 조커 유통에 참여하려면 생성 된 스마트 계약에 유통 기간을 보내 조커 분산 유통 계정을 활성화해야합니다. 유통 기간을 선택하는 것 자체가 커뮤니티 등록을 구성합니다.참고 : 암호화 된 디지털 화폐 지갑을 충전 할 때 일반적으로 약 1TRX 인 네트워크 수수료를 고려해야합니다.',
                    contenLI11C:'11. 파트너없이 온라인으로 배포 할 수 있습니까? 예. 초대 링크없이 등록하면 JoKeR 분산 노드 팀 ID로 이동합니다.',
                    contenLI12C:'12. 조커 커뮤니티와의 협력을 중단하면 내 계정은 어떻게됩니까? 강한 의지가 있더라도 아무도 귀하의 계정을 폐쇄 할 수 없습니다. 계정은 항상 TRON 네트워크 블록 중 하나에 저장됩니다. 그러나 각 공유 분산 순환 네트워크 노드에서 계속 수입을 올릴 수는 없습니다.',
                    contenLI13C:'13. 유통에 참여했는데 다음 단계에서 어떻게해야하나요? JoKeR 커뮤니티와 효과적으로 상호 작용하려면 다음을 수행해야합니다.1. 유통 기한 정산 대기2. 귀하 또는 다른 경험 많은 회원을 초대 한 사람과 대화하십시오. 그들은 당신이 첫 걸음을 내딛는 데 도움이 될 것입니다.3. 지역 사회에서 효과적으로 일하는 방법에 대한 과정이 포함 된 "대학"섹션으로 이동합니다.',
                    contenLI14C:'14. JoKeR를 통해 목표를 달성하는 방법은 무엇입니까? 파트너 네트워크 구축을 기반으로합니다. 잠재적 인 파트너에게 커뮤니티의 잠재력을 소개하고 그들이 귀하와 협력하도록 장려합니다. 귀하의 네트워크 노드를 사용하는 파트너와 정기적 인 유통 거래에 참여하여 생성 된 일일 이자율은 귀하의 스마트 계약 주소로 전송되고 즉시 귀하의 지갑으로 리디렉션됩니다. 커뮤니티는 마케팅 프로젝트에 직접 사용됩니다. 비디오에서 마케팅 계획에 대해 자세히 알아볼 수 있습니다',
                    contenLI15C:'15. 수동 소득이 가능합니까? 조커 커뮤니티는 네트워크 블록 노드의 모든 구성원이 서로 도울 수있는 방식으로 구축됩니다. 패시브 소득이 가능하며 파트너의 활동에 따라 다르며 결국 파트너는 공유 또는 순환 참여를 통해 커뮤니티 네트워크에 나타날 수 있습니다.미래에 소극적 소득을 얻으려면 새로운 파트너를 유치하고 JoKeR에서 새 헌장을 열기 위해 단호한 노력을 기울여야합니다.활성 커뮤니티 노드를 팀에 참여하도록 초대하면 이미 많은 돈을 벌고 목표를 달성 할 수 있습니다. 이것이 일어나는 속도는 전적으로 이동성에 달려 있습니다.',
                    contenLI16C:'16. 네트워크 노드에 영감을주는 방법은 무엇입니까? 전화 할 수 없으면 어떻게하나요? 다른 사람들이 참여하도록 강요 할 필요가 없습니다. 현재 많은 친구들이 네트워크 데이터에서 블록 체인 기술의 혁명을 통해 돈을 버는 방법에 관심이 있고 많은 친구들이 적극적으로 새로운 기회를 찾고 있습니다. 소셜 네트워크에서 직접 만나거나 관심있는 사람이 자신을 찾을 수 있도록 자동화 된 판매 채널을 설정할 수 있습니다. JoKeR 커뮤니티의 "College"섹션에서이 문제에 대한 자세한 내용을 찾을 수 있습니다.강점을 활용하고, 웨비나를 시청하고, 커뮤니티 회원을 경험하기 위해 질문하세요. 성공하기 위해 오래 기다릴 필요가 없습니다. 당신의 결과는 전적으로 당신의 행동 능력에 달려 있습니다!',
                    contenLI17C:'17. 얼마나 많은 수익률을 얻을 수 있습니까? 수입 금액은 순환주기 활동에 대한 귀하의 참여와 순환 활동에 참여하는 네트워크 노드의 품질 지표에 따라 다릅니다.파트너 수에 따라 조커 커뮤니티의 4 가지 투자 수준이 고려됩니다.첫째, 간단한 관계가 있습니다. 더 많은 네트워크 노드를 협력할수록 더 많은 순환 토큰을 모을 수 있습니다. 파트너 품질 지수가 높을수록 수입이 높아집니다.',
                    contenLI18C:'18. JoKeR에서 암호화 된 디지털 통화 자산을 인출해야합니까? 조커는 암호화 된 디지털 화폐 자산을 보유하지 않기 때문에 스마트 컨트랙트 자체의 잔고는 0입니다. 엄청난 양의 데이터는 커뮤니티의 순환이며, LINK를 팔로우하여 직접 확인할 수 있습니다. 귀하의 수입은 JoKeR 글로벌 분산 네트워크 노드에서 개인 암호화 된 디지털 통화 지갑에 직접 입력됩니다. 암호화 된 디지털 화폐 지갑은 오직 당신 만이 사용할 수 있으며, 다른 어떤 객관적인 요소도 당신의 토큰 자산을 관리 할 수 ​​없습니다.',
                    contenLI19C:'19. 조커가 종료됩니까? 아니요, JoKeR 데이터는 완전히 공개되고 확인 가능하며 신뢰할 수 있으며 JoKeR 오픈 소스 코드가 감사되고 공개되었습니다.￼ 조커의 글로벌 분산 유통은 국경 정부의 개입의 대상이 아닙니다. 코드는 규칙과 법이며 항상 스마트 계약에 의해 시행되며 폐쇄 또는 수정할 수 없습니다.',
                    contenLI20C:'️️️️20. JoKeR 글로벌 분포 식 유통 은 그 어떠한 국경 정부 부서 의 간섭 을 받 지 않 습 니 다. 코드 는 바로 규칙 입 니 다. 즉, 법률 입 니 다. 스마트 계약 에 의 해 영원히 강제 집행 되 고 닫 히 거나 수정 할 수 없습니다. 무엇이 지역사회 네트워크 노드 입 니까?무엇이 블록 네트워크 노드 의 일 일 화 된 수익 률 입 니까?직속 지역사회 노드 는귀하 와 직접 커 뮤 니 티 네트워크 연결 의 1 급 파트너 블록 네트워크 노드 일 일 화 수익 률 이란 유통 에 참여 하 는 주기 일 화 된 수익 률 JoKeR 를 4 주기 로 나 누 는 분포 식 유통 1 일 유통 15 일 유통 1 일 101% 7 일 유통 1 일 110% 15 일 130% 30 일 190% 유통 10000 USDT 예 를 들 어 유통 15 일 1000 USDT 매일 획득 2% 즉 200 USDT15 일 즉 3000 USDT 15 일 계약 만 료 수익 률 13000 USDT 블록 네트워크 노드 는 수익 률 의 30% 에 해당 합 니 다.',
                    contenLI21C:'21. JoKeR와 Sergey Mavrodi의 지역 사회 경제 및 생태 계획의 차이점은 무엇입니까? 회원들에게 이루지 못할 약속을하지 않았기 때문입니다. 각 커뮤니티 구성원의 성공 여부는 생태 네트워크 커뮤니티 노드에 달려 있습니다. JoKeR는 부채 나 기타 의무를 부담하지 않습니다.JoKeR는 블록 체인 기술을 기반으로 한 스마트 계약의 분산 순환이며 피라미드 체계와 관련이 없습니다.피라미드 계획의 원칙은 대부분의 자금이 제작자의 손에 집중된다는 것입니다. 빨리 도착할수록 더 많은 것을 얻을 수 있습니다. 피라미드 계획은 언제든지 닫을 수 있습니다. JoKeR 커뮤니티의 구성원은 빌더 또는 JoKeR 커뮤니티의 모든 사람에 관계없이 동일합니다. 블록 체인 네트워크 스마트 컨트랙트에 의해 기능이 보장되기 때문에 커뮤니티의 운영을 누구도 종료 할 수 없으며 삭제하거나 변경할 수 없습니다. 웹 사이트 운영이 중단 되더라도 전기와 인터넷 접속이있는 한 모든 데이터와 전체 구조는 변경되지 않고 스마트 계약은 계속 운영됩니다.',
                    contenLI22C:'22. JoKeR의 위험은 무엇입니까? 얼마나 오래 플레이 할 수 있습니까? JoKeR 커뮤니티에는 어려운 위험이 없습니다. 유일한 객관적인 위험은 커뮤니티 네트워크 노드의 구현을 중지하는 것입니다.JoKeR는 중앙 권한이 없습니다. 모든 커뮤니티 네트워크 노드 사용자는 현금을 등록하거나 인출 할 필요가 없습니다. USDT (TRC20) 글로벌 분산 유통을 수행하고 계약에 도달하기 위해 USDT (TRC20) 암호화 된 디지털 통화 지갑 주소를 바인딩하기 만하면됩니다. 스마트 리턴이 규정되어 있습니다. 유통을 철회하기 위해 구현을 계속 초대하면됩니다. 커뮤니티는 블록 체인 시스템의 스마트 계약을 기반으로 실행되며 스마트 계약의 코드는 공개 도메인에 있습니다.모든 이체는 숨겨진 자산과 제 3 자 리소스를 사용하지 않고 암호화 된 디지털 통화 지갑으로 직접 이동합니다. 이것은 당신이 버는 모든 돈이 당신의 것임을 보장합니다. 조커는 총 9 개의 단계로 구성되어 있으며 계약은 단계 0부터 자동으로 실행되며 실시간 지갑 주소 (a), 펀드 순환 (b), 펀드 반환 (c) 및 역사적 변동 ( d) 현재 단계의 예상 종료 시간 (x)을 얻기 위해 선형 기간 (n) 및 기타 데이터가 계산됩니다.기간 공식 : x ≈adc1! b1-c1 + ad2c2! b2-c2 + ad3c3! b3-c3 +… adncn! bn-cn,0≤x <+ ∞계약은 0 단계부터 지능적으로 실행되기 시작하고 실시간 주소 수, 자산 순환, 과거 증가 및 선형주기 시뮬레이션을 기반으로 현재 단계의 종료 기간을 얻습니다.이 시간에 도달하면 스마트 계약이 자동으로 재설정되고 다음 단계로 들어갑니다. 무대그리고 단계를 올릴 때마다 ToKen의 자산 유통 수익은 자동으로 50 % 증가하고 이전 단계의 모든 손실 발생 지갑 주소는 자산 양의 두 배의 생성 보상을 받게됩니다. 이는 모든 조커 커뮤니티 네트워크 노드가 9 개의 라이프 라인에 연결되어 있음을 의미합니다. 하나의 라이프 라인이 장기간 소진 되더라도 두 번째, 세 번째, 심지어 아홉 번째 라이프 라인이 있으며 각 라이프 라인은 더 강해지고 강해질 것이며 모든 운영 지침은 블록 체인 기술 스마트 계약에 의해 구현되므로 이것은 완전히 안전합니다.예를 들어 스마트 계약이 라이프 라인의 첫 단계에 진입하면 순환하는 토큰 자산의 10 %가 생성 상금 풀에 들어가 이전 단계에서 돈을 잃은 모든 지갑 주소로 자동 분배되고 순환하는 ToKen 자산의 20 %는 라이프 라인의 두 번째 단계에서 생성 상금 풀로 유입됩니다. 이전 수준의 손실이 발생하는 암호화 된 디지털 통화 지갑 주소를 발행하는 데 사용됩니다. 세 번째 단계에서는 유통되는 ToKen 자산의 30 %가 생성 상금 풀에 들어가 두 번째 단계의 모든 손실 생성 암호화 지갑 주소를 발행하는 데 사용되며, 9 단계에서 이전 단계 발행에 사용 된 순환 볼륨의 90 %가 될 때까지 계속됩니다. 분실 한 지갑의 주소입니다. 각 패배 주소는 패배 보상 금액의 2 배를받을 수 있습니다. 이전 레벨의 모든 손실 발생 주소에 대한 생성 보상이 발행되면 생성 보너스 풀이 더 이상 ToKen 자산으로 유입되지 않습니다.',

                    ecosystem1:'전 세계 분포 식 생태 시스템',
                    sigIn: '로그인',
                    Walkinglantern:'허위 자원 을 경계 하 다.커 뮤 니 티 JoKeR 는 하나의 사이트 주소 만 있 습 니 다 -www.JoKeR.pet', 
                    syslang: '시스템 언어',
                    circulation: '순환',
                    predict: '예상치 끝까지 카운트 다운',
                    ring: '현재 링 번호',
                    description: 'JoKeR 는 멈 출 수 없습니다. 이것 은 닫 을 수 없습니다. 제3자 가 관여 할 수 없습니다. 프로그램 이 금지 되 어 시스템 에 의 해 계속 실 행 될 것 입 니 다.',
                    join: '가입 방법',
                    joinDesc: '<p> 1 :1: 인터넷 노드 로 링크 를 공유 하고 들 어가 서 USDT (TRC 20) 지갑 주소 자동 으로 계 정 을 활성화 시 켜 decentralized finance (DeFi) 유통 성 스마트 발굴 을 진행 합 니 다. <\ / p> <p> 2 : 유통 기간을 선택하고 수취인 주소로 유통해야하는 USDT (TRC20) 금액을 지불합니다. <\ / p> <p> 3 : 유통이 만료 된 후 계약은 자동으로 증가 된 USDT (TRC20)를 귀하의 지갑 주소로 반환합니다. <\ / p>',
                    share: '나인 링 소개',
                    shareDesc: '<p> 1 : 나인 링 스마트 계약은 분산 및 분산 순환 반환 방식을 채택합니다. 스마트 계약은 0 번째 링부터 자동으로 실행됩니다. 순환이 반환 비용을 지불하기에 충분하지 않으면 스마트 계약이 자동으로 재설정되고 다음 단계로 들어갑니다. 링, 9 번째 링까지. <\ / p> <p> 2 : 링크 하나를 늘릴 때마다 자본 순환 수익률이 자동으로 50 % 씩 증가하여 다음 링크에 대한 참여를 장려하는 데 사용됩니다. <\ / p> <p> 3 : 하나의 링크가 증가 할 때마다 순환 자금의 10 % -90 %가 상금 풀에 들어가 이전 링크에서 손실 된 모든 지갑 주소를 두 배로 보상하는 데 사용됩니다. <\ / p>',
                    ruleDesc: '<p> 4 : 0 번째 링에서 USDT (TRC20) 유통 보상 규칙 : <br> 유통 1 일 만 에 101%, 유통 7 일 만 에 110.5%, 유통 15 일 만 에 130%, 유통 30 일 만 에 190%. <\ / p> <p> 5 : 공유 보상 규칙 : <br> 100 USDT를 유통 할 때마다 1 세대 공유 보상을받을 수 있으며 최대 20 세대까지 공유 보상을받을 수 있습니다. <br> 직접 100 달러를 유통하면 세대당 수입의 30 %를받을 수 있습니다. <br> 자신이 200 달러를 유통하면 2 세대 수입의 20 %를받을 수 있습니다. % <br> 직접 400-1000USDT를 유통하고, 4 ~ 10 세대 소득의 5 %를 얻으십시오. <br> 직접 1100-2000USDT를 유통하고, 11 ~ 20 세대 소득의 1 %를 얻으십시오. <\ / p>',
                    present: '오픈 소스 코드',
                    prizeLog: '보너스 세부 정보',
                    contAddress: '스마트 계약 주소 USDT (TRC20)를 입력하세요.',
                    startCir: '순환 시작',
                    back: '반환',
                    contContract: '계약 통계',
                    coutAddre: '과거에 참여한 스마트 계약 주소의 총 수',
                    countCirul: '스마트 계약 순환에 대한 역사적 참여의 총량',
                    prizePool: '혁신 상 풀',
                    loginSuccTip: '성공적 로그인',
                    sharePlan: 'JoKeR 공유 프로젝트',
                    shareTip: '지갑 주소를 사용하여이 주소로 결제하고 펀드 유통이 만료 된 후 로그인 한 지갑 주소로 돌아갑니다.',
                    shareLink: '링크 공유',
                    friendsTotal: '총 친구 수',
                    fCirculatTotal: '친구의 총 순환',
                    tissue: '노드 주소',
                    personal1st: '개인 1 세대 노드',
                    personal2st: '개인 2 세대 노드',
                    personal3st: '개인 3 세대 노드',
                    personal4st: '개인 4 - 10 세대 노드',
                    personal11st: '개인 11 - 20 대 노드',
                    copyText: '부',
                    personalData: '개인 데이터 통계',
                    circulateUsdt: '개별 총 유통 USDT 수량',
                    returnUsdt: 'USDT의 개별 총 반환 금액',
                    shareReward: '개인 주식 보상 USDT 금액',
                    innovatReward: '개인 창작물 보상 USDT 금액',
                    curPersonalPL: '현재 총 개인 손익 USDT 금액',
                    recharge: '재충전',
                    hashOrder: '스마트 계약 주문',
                    cirTime: '순환주기',
                    circulationIn: '유통량',
                    status: '상태',
                    view: '전망',
                    loginTip: '스마트 계약 주소 USDT (TRC20)를 바인딩하십시오.',
                    qrCCode: '결제 QR 코드',
                    qrCCodeExpir: 'QR 코드 만료 시간',
                    trcErrTip: 'TRX 주소 형식이 잘못되었습니다.',
                    cirReturn: '순환 반환',
                    occupy: '분산 된 스마트 계약 주소, 블록 탐색기 입력 여부 확인',
                    address: '주소',
                    regTime: '등록 시간',
                    troAdrrs: 'Transparent address',
                    cTime: '시각',
                    current: '흐름',
                    amount: '양',
                    cirRes: '유통 → 반품',
                    msg: {
                        busy: '시스템이 사용 중입니다. 나중에 다시 시도하십시오! ',
                        paramErr: '매개 변수 오류',
                        Occupy:'분산 스마트 계약 주소, 블록 탐색기 입력 여부 확인',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: [ '유통 중', '복귀', '완료', '퓨즈'],
                    oFall:'실패',
                    quest:'만남 문제',
                    mtoken:'합작 영패',
                }
            },
            ar: {
                message: {
                    lang: ' العربية',
                    loginTip1:'وقد تم تعطيل المستخدم ',
                    ecosystemLISPO:'مشكلة شائعة',
                    ecosystemLISPO1:'تقنية العقود الذكية - هذه ظاهرة جديدة في الاقتصاد اللامركزي اليوم.<\/br>معالجة وتوزيع التدفق المالي للأصول الرقمية.<\/br>يتم تنفيذ جميع العمليات في خزانة blockchain مفتوحة وغير مركزية.<\/br>تدعم البنية التحتية للعملات المشفرة JoKeR مثل هذه العقود.',
                    
                    loginTip2:'وزعت ديفي العنوان ، أدخل كتلة سلسلة المتصفح لمعرفة ما إذا كان',


                    LSOSOSOq:'لم يتم تشغيلها',



                    contenLI1:'1. ما هو الجوكر؟',
                    contenLI2:'2. من يدير منصة جوكر؟',
                    contenLI3:'3. من خلق جوكر؟',
                    contenLI4:'4. ما هو العقد الذكي؟ ما هي مميزاته؟',
                    contenLI5:'5. ما الذي أحتاجه للانضمام؟',
                    contenLI6:'6. ما هي المحفظة التي يجب أن أستخدمها؟',
                    contenLI7:'7. أين يمكنني الحصول على مزيد من المعلومات حول الجوكر؟',
                    contenLI8:'8. ما الذي أحتاجه لإنشاء محفظة ترون؟',
                    contenLI9:'9. إذا لم أشارك مطلقًا في معالجة العملة الرقمية المشفرة من قبل ، كيف يمكنني شراء وبيع BTC ETH USDT TRX؟',
                    contenLI10:'10. كيف تشارك في التداول في مجتمع الجوكر؟',
                    contenLI11:'11. هل يمكنني التسجيل إلكترونيًا للتداول بدون شريك؟',
                    contenLI12:'12. ماذا سيحدث لحسابي إذا قطعت التعاون مع مجتمع جوكر؟',
                    contenLI13:'13. لقد شاركت في الإعارة ، فماذا أفعل في الخطوة التالية؟',
                    contenLI14:'14. كيف تحقق الأهداف من خلال الجوكر؟',
                    contenLI15:'15. هل الدخل السلبي ممكن؟',
                    contenLI16:'16. كيف تلهم عقد الشبكة؟ ماذا لو لم أستطع الاتصال؟',
                    contenLI17:'17. ما هو معدل العائد الذي يمكن الحصول عليه؟',
                    contenLI18:'18. هل أحتاج إلى سحب أصول العملة الرقمية المشفرة من JoKeR؟',
                    contenLI19:'19. هل سيتم إغلاق جوكر؟',
                    contenLI20:'20. لا يخضع تداول جوكر العالمي الموزع لأي تدخل حكومي حدودي وطني ، المدونة هي القاعدة والقانون ، سيتم فرضها دائمًا بموجب العقد الذكي ولا يمكن إغلاقها أو تعديلها.',
                    contenLI21:'21. ما الفرق بين خطة المجتمع الاقتصادية والبيئية لجوكر وسيرجي مافرودي؟',
                    contenLI22:'22. ما هي مخاطر الجوكر؟ كم من الوقت يمكنني اللعب؟',
                    contenLI1C:'1. ما هو الجوكر؟جوكر هو التوزيع الدولي الموزع للنظام الإيكولوجي العالمي اللامركزي ، وهو أيضًا أول سيناريو تسويق وتداول عقود ذكي من TRON. هذه خوارزمية برمجية ذاتية التنفيذ يمكنها تنفيذ وظيفة توزيع مكافآت الشركاء بين أعضاء المجتمع الموزع العالمي في ظل ظروف معينة (خطة تسويق التوزيع). رمز العقد متاح للجمهور. يمكن دائمًا عرض معلومات حول المعاملات على الرابط: https://tronscan.io.',
                    contenLI2C:'2. من يدير منصة جوكر؟تتكون منصة JoKeR من عقود ذكية عالمية موزعة تنفذ المعاملات تلقائيًا ، ولا يمكن أن تتدخل فيها أي عوامل موضوعية في عملية المعاملة.',
                    contenLI3C:'3. من خلق جوكر؟ينتمي مفهوم JoKeR إلى منظمة متحمسة للعملات الرقمية المشفرة الموزعة عالميًا. فهم أعضاء في المجتمع وليس لديهم أي امتيازات خاصة. الرمز هو القاعدة والقانون. اليوم ، JoKeR هو مجتمع من نظير إلى نظير ينتمي إليه أعضاء النظام الأساسي ، والمنصة نفسها تنتمي أيضًا إلى هذا المجتمع. ',
                    contenLI4C:'4. ما هو العقد الذكي؟ ما هي مميزاته؟العقد الذكي هو خوارزمية في تقنية blockchain للعملات الرقمية المشفرة. TRON هو الخيار الأول لإنشاء عقود ذكية للتداول الموزع من جوكر. الغرض الرئيسي من هذا النوع من العقود هو أتمتة العلاقة وإعطاء الفرصة لأتمتة الالتزام.',
                    contenLI5C:'5. ما الذي أحتاجه للانضمام؟لديك بالفعل كل ما تحتاجه. الباقي هو تثبيت محفظة عملة رقمية مشفرة و Telegram على جهازك (الهاتف الذكي ، الجهاز اللوحي ، الكمبيوتر الشخصي) للتداول العالمي الموزع.',
                    contenLI6C:'6. ما هي المحفظة التي يجب أن أستخدمها؟تدعم محفظة Pobao TronLink و iMToKen و ToKenPocket الأجهزة المحمولة (الهواتف الذكية والأجهزة اللوحية) ، كما تدعم أجهزة الكمبيوتر وأجهزة الكمبيوتر المحمولة التي يجب أن تستخدم ملحقات Chrome. العنوان الرسمي لمحفظة TronLink: https://www.tronlink.org/',
                    contenLI7C:'7. أين يمكنني الحصول على مزيد من المعلومات حول الجوكر؟ JoKeR التي تم التحقق منها على Telegram. أرسل أي أسئلة إلى أعضاء JoKeR الموزعين وسيسعدهم مشاركة تجربتهم. انضم إلى الدردشة على Telegram t.me/JoKeR. نوصيك أيضًا بالبحث عن المادة الموجودة على موقع الويب في قسم "الكلية".',
                    contenLI8C:'8. ما الذي أحتاجه لإنشاء محفظة ترون؟ب tronlink.org وتثبيت الامتداد لمتصفحك.  للأجهزة المحمولة ، تحتاج إلى تثبيت تطبيق Pobao TronLink Wallet عند التسجيل ، يرجى عدم نسيان تخزين كلمة مرور محفظة العملة الرقمية المشفرة بأمان.',
                    contenLI9C:'9. إذا لم أشارك مطلقًا في معالجة العملة الرقمية المشفرة من قبل ، كيف يمكنني شراء وبيع BTC ETH USDT TRX؟ة الاستخدام. لن تستغرق معاملتك الأولى لتحويل العملة القانونية إلى عملة رقمية أكثر من خمس دقائق. نوصي باستخدام مجمع صرف العملات المثبت bestchange.ru',
                    contenLI10C:'10. كيف تشارك في التداول في مجتمع الجوكر؟يرجى ملاحظة ما يلي: عند إعادة شحن محفظة العملات الرقمية المشفرة ، يجب أن تفكر في عمولة الشبكة ، والتي عادة ما تكون حوالي TRX.',
                    contenLI11C:'11. هل يمكنني التسجيل إلكترونيًا للتداول بدون شريك؟نعم. التسجيل بدون رابط دعوة سيوصلك إلى معرف فريق العقدة الموزعة لـ JoKeR.',
                    contenLI12C:'12. ماذا سيحدث لحسابي إذا قطعت التعاون مع مجتمع جوكر؟لا أحد يستطيع إغلاق حسابك ، حتى لو كان لديه إرادة قوية. سيتم تخزين الحساب دائمًا في إحدى كتل شبكة TRON. لكنك لن تكون قادرًا على الاستمرار في كسب الدخل من كل عقدة شبكة توزيع مشتركة موزعة.',
                    contenLI13C:'13. لقد شاركت في الإعارة ، فماذا أفعل في الخطوة التالية؟الدردشة مع الشخص الذي دعاك أو غيرك من الأعضاء ذوي الخبرة. سوف يساعدونك في اتخاذ الخطوة الأولى.',
                    contenLI14C:'14. كيف تحقق الأهداف من خلال الجوكر؟يقوم على إنشاء شبكة من الشركاء. أنت تقدم إمكانات المجتمع للشركاء المحتملين وتشجعهم على التعاون معك. سيتم إرسال الشركاء الذين يستخدمون عقدة الشبكة الخاصة بك ومعدل الفائدة اليومي الناتج عن مشاركتهم في معاملات التداول الدورية إلى عنوان العقد الذكي الخاص بك ، ومن ثم سيتم إعادة توجيههم على الفور إلى محفظتك. يتم استخدام المجتمع مباشرة مع مشاريع التسويق. يمكنك معرفة المزيد عن خطة التسويق في الفيديو.',
                    contenLI15C:'15. هل الدخل السلبي ممكن؟تم بناء مجتمع JoKeR بطريقة تمكن جميع أعضاء عقدة كتلة الشبكة من مساعدة بعضهم البعض. الدخل غير الفعال ممكن ؛ يعتمد على أنشطة الشركاء ، ويمكن أن يظهر الشركاء في النهاية على شبكة المجتمع من خلال المشاركة أو المشاركة في التداول.',
                    contenLI16C:'16. كيف تلهم عقد الشبكة؟ ماذا لو لم أستطع الاتصال؟ليس عليك إجبار الآخرين على المشاركة. في الوقت الحالي ، يهتم العديد من الأصدقاء بكيفية جني الأموال من خلال ثورة تقنية blockchain في بيانات الشبكة ، ويسعى الكثير منهم بنشاط إلى فرص جديدة. يمكنك مقابلتهم على الشبكات الاجتماعية بنفسك ، أو يمكنك إنشاء قناة مبيعات آلية بحيث يمكن لأي شخص مهتم أن يجد نفسك. يمكنك العثور على مزيد من التفاصيل حول هذه المشكلة في قسم "الكلية" في مجتمع جوكر.',
                    contenLI17C:'17. ما هو معدل العائد الذي يمكن الحصول عليه؟أولا ، هناك علاقة بسيطة. كلما زاد عدد عقد الشبكة التي تتعاون معها ، زادت رموز التداول التي سترفعها ؛ وكلما ارتفع مؤشر جودة الشريك ، زاد الدخل الذي ستحصل عليه.',
                    contenLI18C:'18. هل أحتاج إلى سحب أصول العملة الرقمية المشفرة من JoKeR؟لا يحتفظ JoKeR بأي أصول عملة رقمية مشفرة ، لذا فإن رصيد العقد الذكي نفسه يساوي صفرًا.الكم الهائل من البيانات هو تداول المجتمع ، يمكنك التحقق منه شخصيًا باتباع LINK. يذهب دخلك مباشرة إلى محفظة العملات الرقمية المشفرة الخاصة بك من نقطة توصيل شبكة JoKeR العالمية الموزعة. يمكنك فقط استخدام محفظة العملات الرقمية المشفرة ، ولا يمكن لأي عوامل موضوعية أخرى إدارة أصول الرمز المميز الخاصة بك',
                    contenLI19C:'19. هل سيتم إغلاق جوكر؟لا يخضع التوزيع العالمي الموزع لجوكر لأي تدخل حكومي حدودي وطني. الكود هو القاعدة والقانون ، والذي سيتم تطبيقه دائمًا من خلال العقد الذكي ولا يمكن إغلاقه أو تعديله.',
                    contenLI20C:'️️20. لا يخضع تداول جوكر العالمي الموزع لأي تدخل حكومي حدودي وطني ، المدونة هي القاعدة والقانون ، سيتم فرضها دائمًا بموجب العقد الذكي ولا يمكن إغلاقها أو تعديلها. ما هي عقد شبكة المجتمع التابعة مباشرة؟ ما هو معدل العائد اليومي لعقد الشبكة الكتلية؟',
                    contenLI21C:'21. ما الفرق بين خطة المجتمع الاقتصادية والبيئية لجوكر وسيرجي مافرودي؟مبدأ المخطط الهرمي هو أن معظم الأموال تتركز في أيدي مبتكريها. كلما وصلت مبكرًا ، كلما حصلت على المزيد. يمكن إغلاق مخطط الهرم في أي وقت. أعضاء مجتمع JoKeR ، بغض النظر عن المنشئ أو كل فرد في مجتمع JoKeR متساوون. لا يمكن لأي شخص إنهاء تشغيل المجتمع ، لأن وظيفته مضمونة بواسطة العقد الذكي لشبكة blockchain ، والذي لا يمكن حذفه أو تغييره. حتى إذا توقف الموقع عن العمل ، طالما أن هناك كهرباء وإمكانية الوصول إلى الإنترنت ، فستبقى جميع البيانات والهيكل بأكمله دون تغيير ، وسيستمر العقد الذكي في العمل.',
                    contenLI22C:'22. ما هي مخاطر الجوكر؟ كم من الوقت يمكنني اللعب؟تذهب جميع التحويلات مباشرة إلى محفظتك الرقمية المشفرة ، دون أي أصول مخفية ، ودون استخدام أي موارد تابعة لجهات خارجية. هذا يضمن أن أي أموال تكسبها ملك لك. يحتوي جوكر على 9 مراحل إجمالية. سيتم تشغيل العقد تلقائيًا من المرحلة 0 ، وسيعتمد على عدد عناوين المحفظة في الوقت الفعلي (أ) ، وتداول الأموال (ب) ، وعائد الأموال (ج) ، والتقلبات التاريخية ( د) ، يتم حساب الفترة الخطية (ن) والبيانات الأخرى للحصول على وقت الانتهاء المقدر (س) للمرحلة الحالية ،',



                    ecosystemLIS:' مكنك رؤية رمز عقJoKeR الذكي بالكامل هنا ، حتى تثق تمامًا في سلامة وتشغيل المشروع على المدى الطويل!',


                    ecosystemLIS1:'合約',
                    ecosystemLIS2:'و JoKeR عقدًا ذكيًا ذاتي التنفيذ على blockchain TRON وهو دائم ولا يمكن تعديله من قبل أي كيان',

                    ecosystemLIS3:'معاملة فورية',
                    ecosystemLIS4:'الأرباح من الأعضاء الآخرين تدخل محفظتك الشخصية مباشرة ، ولا يوجد تراكم في النظام ، والربح ملك لك فقط',

                    ecosystemLIS5:'الثبات الشرطي',
                    ecosystemLIS6:'عقد JoKeR الذكي هو مجرد بوابة دفع يمكنها تسهيل دفع العمولة من نظير إلى نظير بين المشاركين',

                    ecosystemLIS7:'اللامركزية',
                    




                    ecosystemLIS8:'لا يوجد مديرين أو إداريين ، يشارك المبدعون فقط في المشروع على قدم المساواة مع أي شخص آخر',

                    ecosystemLIS9:'الشفافية وعدم الكشف عن هويته',
                    ecosystemLIS10:'العقد الذكي علني ، يمكن لأي شخص الاطلاع على الكود وسجل المعاملة بالكامل ، مما يضمن سلامة النظام وإحصائيات المشروع الحقيقية',

                    ecosystemLIS11:'100٪ عبر الإنترنت',
                    ecosystemLIS12:'يتم تحويل جميع الأموال بين الأعضاء دون أي رسوم خفية ، ويكون رصيد العقد دائمًا صفرًا',



                    ecosystem1:'النظم الإيكولوجية العالمية الموزعة',
                    Walkinglantern:' حذار من الموارد الزائفة  المجتمع جوكر واحد فقط عنوان الموقع  جوكر',
                    alkinglantern:'حذار من الموارد الزائفة  المجتمع جوكر واحد فقط عنوان الموقع  جوكر',
                    sigOut: 'خروج',
                    sigIn: 'تسجيل الدخول',
                    syslang: 'لغة النظام',
                    circulation: 'الدوران',
                    predict: 'العد التنازلي حتى نهاية التقدير',
                    ring: 'رقم الخاتم الحالي',
                   
                    description:'جوكر لا يمكن أن تتوقف ، فإنه لا يمكن إيقاف تشغيله لا يمكن تدخلها من قبل طرف ثالث ، لا يمكن أن تكون محظورة من قبل البرنامج ، وسوف تنفذ بشكل دائم من قبل النظام',

                    join: 'كيف تنضم',
                    joinDesc: '<p> 1.استخدام عقدة شبكة مشاركة الرابط للدخول في تسجيل الدخول الخاص بك USDT عنوان المحفظة تلقائيا تفعيل حساب Decentralized Finance تداول التعدين الذكي <\ / p> <p> 2: حدد فترة الإعارة وادفع مبلغ USDT (TRC20) الذي تريد تعميمه على عنوان الدفع. <\/p> <p> 3: بعد انتهاء صلاحية التداول ، سيعيد العقد تلقائيًا زيادة USDT (TRC20) إلى عنوان محفظتك. <\ / ع>',
                    share: 'تسع حلقات مقدمة',
                    shareDesc: '<p> 1: يعتمد العقد الذكي المكون من تسعة حلقات على طريقة إرجاع تداول موزعة ولا مركزية. يعمل العقد الذكي تلقائيًا من الحلقة 0. عندما لا يكون التداول كافيًا للدفع مقابل العائد ، سيتم إعادة تعيين العقد الذكي تلقائيًا ويدخل العقد التالي الخاتم ، حتى الحلقة التاسعة. <\ / p> <p> 2: في كل مرة تقوم فيها بزيادة ارتباط واحد ، سيزداد معدل العائد على تداول رأس المال تلقائيًا بنسبة 50٪ ، والتي سيتم استخدامها لتشجيع المشاركة في الرابط التالي. <\/p> <p> 3: مقابل كل زيادة لرابط واحد ، ستدخل 10٪ -90٪ من الأموال المتداولة إلى مجموعة الجوائز ، والتي سيتم استخدامها لمضاعفة مكافأة جميع عناوين المحفظة التي فقدت أموالاً في الرابط السابق. <\ / ع>',
                    ruleDesc: '<p> 4: قواعد مكافأة التداول USDT (TRC20) في الحلقة 0: <br> بعد يوم واحد من التداول يعود إلى 101 ٪ ، بعد أيام من التداول يعود 110.5 ٪ ، بعد أيام من التداول يعود 130 ٪ ، بعد أيام من التداول يعود 190<\ / p>',
                    present: 'كود المصدر المفتوح',
                    prizeLog: 'تفاصيل المكافأة',
                    contAddress: 'الرجاء إدخال عنوان العقد الذكي USDT (TRC20)',
                    startCir: 'ابدأ الدورة الدموية',
                    back: 'إرجاع',
                    contContract: 'إحصائيات العقد',
                    coutAddre: 'العدد الإجمالي لعناوين العقود الذكية المشاركة التاريخية',
                    countCirul: 'المبلغ الإجمالي للمشاركة التاريخية في تداول العقود الذكية',
                    prizePool: 'مجموع جوائز الابتكار',
                    loginSuccTip: 'تم تسجيل الدخول بنجاح',
                    sharePlan: 'جوكر خطة تقاسم',
                    shareTip: 'استخدم أي عنوان محفظة للدفع لهذا العنوان ، والعودة إلى عنوان المحفظة الذي تم تسجيل الدخول إليه بعد انتهاء صلاحية تداول الأموال',
                    shareLink: 'رابط المشاركة',
                    friendsTotal: 'إجمالي عدد الأصدقاء',
                    fCirculatTotal: 'إجمالي تداول الأصدقاء',
                    tissue: 'عنوان العقدة',
                    personal1st: 'جيل الشخصية عقدة',
                    personal2st: 'الجيل الثاني من العقد الشخصية',
                    personal3st: 'شخصية الجيل الثالث عقدة',
                    personal4st: 'الشخصية 4-10 جيل عقدة',
                    personal11st: 'جيل 11-20 العقدة الشخصية',
                    copyText: 'نسخ',
                    personalData: 'إحصائيات البيانات الشخصية',
                    circulateUsdt: 'إجمالي كمية USDT المتداولة الفردية',
                    returnUsdt: 'إجمالي مبلغ العائد الفردي من USDT',
                    shareReward: 'مبلغ USDT لمكافأة الأسهم الفردية',
                    innovatReward: 'مقدار مكافأة الإبداع الشخصي USDT',
                    curPersonalPL: 'إجمالي مبلغ الربح والخسارة الشخصي الحالي من USDT',
                    recharge: 'تعبئة رصيد',
                    hashOrder: 'طلب عقد ذكي',
                    cirTime: 'دورة الدورة الدموية',
                    circulationIn: 'كمية التداول',
                    status: 'الحالة',
                    view: 'رأي',
                    loginTip: 'يرجى ربط عنوان العقد الذكي الخاص بك USDT (TRC20)',
                    qrCCode: 'رمز الاستجابة السريعة للدفع',
                    qrCCodeExpir: 'وقت انتهاء صلاحية رمز الاستجابة السريعة',
                    trcErrTip: 'تنسيق عنوان TRX غير صحيح',
                    cirReturn: 'گردش خون بازگشت',
                    occupy: 'عنوان العقد الذكي الموزع ، سواء للدخول إلى متصفح الحظر للتحقق',
                    address: 'عنوان',
                    regTime: 'وقت التسجيل',
                    troAdrrs: 'Transparent address',
                    cTime: 'زمن',
                    current: 'تيار',
                    amount: 'كمية',
                    cirRes: 'الدورة الدموية → العودة',
                    msg: {
                        busy: 'النظام مشغول ، يرجى المحاولة مرة أخرى لاحقًا!',
                        paramErr: 'خطأ في المعلمة',
                        Occupy:'عنوان العقد الذكي الموزع ، سواء لإدخال مستكشف الكتل للتحقق',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: ['متداولة', 'عودة', 'منجز', 'فتيل'],
                    oFail:'بالفشل',
                    quest:'مشكلة',
                    mtoken:'رمز التعاون',
                }
            },
            ru: {
                message: {
                    lang: 'Pусский',
                    ecosystem1:'Глабальная распаўсюджаная экасістэма',
                    ecosystemLISPO:'агульная праблема',
                    loginTip1:'Карыстальнік выключаны',
                    ecosystemLISPO1:'Тэхналогія разумных кантрактаў - гэта новая з ява ў сучаснай дэцэнтралізаванай эканоміцы.Апрацоўка і размеркаванне фінансавага патоку лічбавых актываў.<\/br>Усе працэсы ажыццяўляюцца ў адкрытым і дэцэнтралізаваным шафе блокчейн.<\/br>Інфраструктура криптовалют<\/br>JoKeR падтрымлівае такія кантракты.',

                    ecosystemLIS:'Тут вы можаце цалкам убачыць код разумнага кантракту JoKeR, каб вы маглі быць у поўнай упэўненасці ў бяспецы і доўгатэрміновай працы праекта!',
                    
                    loginTip2:'Размяшчаны адрас defi, ці ўвядзіце ў браўзэр blockchain для прагляду',

                    ecosystemLIS1:'Нулявы рызыка',

                    ecosystemLIS2:'Распрацоўшчыкі JoKeR разгарнулі самастойны смарт-кантракт на блокчейне TRON, які з яўляецца пастаянным і не можа быць зменены любой арганізацыяй',  
                    LSOSOSOq:'Не спрацоўвае',

                    ecosystemLIS3:'Імгненная транзакцыя',
                    ecosystemLIS4:'Прыбытак ад іншых удзельнікаў паступае непасрэдна ў ваш асабісты кашалёк, у сістэме няма назапашвання, і прыбытак належыць толькі вам',

                    ecosystemLIS5:'Умоўная нязменнасць',

                    ecosystemLIS6:'Інтэлектуальны кантракт JoKeR - гэта проста плацежны шлюз, які можа палегчыць аднарангавую аплату камісіі паміж удзельнікамі',


                    ecosystemLIS7:'Дэцэнтралізацыя',


                    ecosystemLIS8:'Няма кіраўнікоў і адміністратараў, толькі стваральнікі ўдзельнічаюць у праекце на роўных з усімі',

                    ecosystemLIS9:'Празрыстасць і ананімнасць',
                    ecosystemLIS10:'Смарт-кантракт з яўляецца публічным, кожны можа ўбачыць код і ўвесь запіс транзакцыі, што забяспечвае цэласнасць сістэмы і рэальную статыстыку праекта',

                    ecosystemLIS11:'100% у Інтэрнэце',
                    ecosystemLIS12:'Усе сродкі пераводзяцца паміж членамі без якіх-небудзь схаваных камісій, а баланс кантракту заўсёды роўны нулю',








                    contenLI1:'1. Што такое Джокер?',
                    contenLI2:'2. Хто кіруе платформай JoKeR',
                    contenLI3:'3. Хто стварыў Джокера?',
                    contenLI4:'4. Што такое смарт-кантракт? У чым яго перавагі?',
                    contenLI5:'5. Што мне трэба, каб далучыцца?',
                    contenLI6:'6. Якім кашальком я павінен карыстацца?',
                    contenLI7:'7. Дзе я магу атрымаць больш інфармацыі пра Джокера?',
                    contenLI8:'8. Што мне трэба для стварэння кашалька Tron?',
                    contenLI9:'9. Калі я ніколі раней не ўдзельнічаў у апрацоўцы зашыфраванай лічбавай валюты, як купляць і прадаваць BTC ETH USDT TRX?',
                    contenLI10:'10. Як удзельнічаць у тыражы ў суполцы Джокера?',
                    contenLI11:'11. Ці магу я зарэгістравацца ў Інтэрнэце для абарачэння без партнёра?',
                    contenLI12:'12. Што будзе з маім акаўнтам, калі я перапыню супрацоўніцтва з суполкай Джокера?',
                    contenLI13:'13. Я ўдзельнічаў у накладзе, што мне рабіць на наступным этапе?',
                    contenLI14:'14. Як дасягнуць мэты з дапамогай Джокера?',
                    contenLI15:'15. Ці магчымы пасіўны даход?',
                    contenLI16:'16. Як натхніць сеткавыя вузлы? Што рабіць, калі я не магу патэлефанаваць?',
                    contenLI17:'17. Якую норму прыбытку можна атрымаць?',
                    contenLI18:'18. Ці трэба мне здымаць зашыфраваныя актывы лічбавай валюты з Джокера?',
                    contenLI19:'19. Ці зачыніць Джокер?',
                    contenLI20:"20. Глабальны распаўсюджаны круг Джокера не ўплывае на ніякія нацыянальныя урядовыя дэпартаменты. Код - гэта правіла і закон. Ён заўсёды будзе выконвацца разумным кантрактам і не можа быць зачынены ці зменены. Які з' яўляецца вузломЯкая штодзённая хуткасць вяртання блокаваных сеткавых вузлаў?",
                    contenLI21:'21. У чым розніца паміж эканамічным і экалагічным планам абшчыны Сяргея Маўродзі?',
                    contenLI22:'22. Якія рызыкі выклікае Джокер? Як доўга я магу гуляць?',
                    contenLI1C:'1. Што такое Джокер?  JoKeR - гэта міжнародная размеркаваная цыркуляцыя глабальнай дэцэнтралізаванай экасістэмы, а таксама гэта першы ў свеце сцэнар маркетынгу і абарачэння разумных кантрактаў TRON. Гэта самавыканальны алгарытм праграмнага забеспячэння, які можа выконваць функцыю размеркавання партнёрскіх узнагарод сярод членаў глабальнага размеркаванага супольнасці пры пэўных умовах (маркетынгавы план тыражу). Код дагавора з яўляецца агульнадаступным. Інфармацыю пра транзакцыі заўсёды можна паглядзець па спасылцы: https://tronscan.io.',
                    contenLI2C:'2. Хто кіруе платформай JoKeR Платформа JoKeR складаецца з глабальных размеркаваных смарт-кантрактаў, якія аўтаматычна выконваюць транзакцыі, і на якія не могуць умяшацца нейкія аб ектыўныя фактары ў працэсе транзакцыі.',
                    contenLI3C:'3. Хто стварыў Джокера? Канцэпцыя JoKeR належыць да глабальнай размеркаванай зашыфраванай арганізацыі энтузіястаў лічбавай валюты. Яны з яўляюцца членамі супольнасці без якіх-небудзь асаблівых прывілеяў. Кодэкс - правіла і ',
                    contenLI4C:'4. Што такое смарт-кантракт? У чым яго перавагі? Разумны кантракт - гэта алгарытм у тэхналогіі зашыфраванай лічбавай валюты. TRON - гэта першы выбар для стварэння інтэлектуальных кантрактаў з размеркаваным тыражом J',
                    contenLI5C:'5. Што мне трэба, каб далучыцца? У вас ужо ёсць амаль усё неабходнае. Астатняе - усталяваць на прыладу (смартфон, планшэт, ПК) зашыфраваны кашалёк лічбавай валюты і Telegram для глабальнага размеркаванага звароту.',
                    contenLI6C:'6. Якім кашальком я павінен карыстацца? Джокер дастасавальны да ўсіх кашалькоў лічбавай валюты, зашыфраваных TRON. Мы рэкамендуем наступнае:',
                    contenLI7C:'7. Дзе я магу атрымаць больш інфармацыі пра Джокера? Падпішыцеся на правераны канал JoKeR на Telegram. Адпраўляйце любыя пытанні размеркаваным удзельнікам JoKeR, і яны будуць рады падзяліцца сваім досведам.',
                    contenLI8C:'8. Што мне трэба для стварэння кашалька Tron? Для ПК вам трэба зайсці на сайт tronlink.org і ўсталяваць пашырэнне для вашага аглядальніка.Для мабільных прылад неабходна ўсталяваць прыкладанне Pobao TronLink Wallet',
                    contenLI9C:'9. Калі я ніколі раней не ўдзельнічаў у апрацоўцы зашыфраванай лічбавай валюты, як купляць і прадаваць BTC ETH USDT TRX? Ёсць мноства спосабаў купіць / прадаць криптовалюту ў абмен на фиатную валюту (звычайную валюту). Усе яны распрацаваны для карыстальнікаў зашыфраванай лічбавай валюты і маюць зручны інтэрфейс. Ваша першая',

                    contenLI10C:'10. Як удзельнічаць у тыражы ў суполцы Джокера? Каб прыняць удзел у тыражы ў JoKeR, вам неабходна адправіць перыяд стварэння тыражу ў створаны смарт-кантракт, каб актываваць рахунак размеркаванага тыражу JoKeR. Выбар перыяду накладу сам па сабе складае вашу рэгістрацыю ў супольнасці.',
                    contenLI11C:'11. Ці магу я зарэгістравацца ў Інтэрнэце для абарачэння без партнёра? Так. Рэгістрацыя без спасылачнага запрашэння прывядзе вас да ідэнтыфікатара каманды размеркаванага вузла JoKeR.',
                    contenLI12C:'12. Што будзе з маім акаўнтам, калі я перапыню супрацоўніцтва з суполкай Джокера? Ніхто не можа закрыць ваш рахунак, нават калі ў яго ёсць моцная воля. Уліковы запіс заўсёды будзе захоўвацца ў адным з сеткавых блокаў TRON. Але вы не зможаце працягваць атрымліваць прыбытак ад кожнага вузла сеткавага размеркаванага звароту.',
                    contenLI13C:'13. Я ўдзельнічаў у накладзе, што мне рабіць на наступным этапе? Для эфектыўнага ўзаемадзеяння з суполкай Джокера неабходна:1. Чаканне працэсу ўрэгулявання перыяду накладу',
                    contenLI14C:'14. Як дасягнуць мэты з дапамогай Джокера? знаёміце патэнцыял супольнасці з патэнцыяльнымі партнёрамі і заклікаеце іх супрацоўнічаць з вамі. Партнёры, якія выкарыстоўваюць ваш сеткавы вузел, іх сутачная працэнт',
                    contenLI15C:'15. Ці магчымы пасіўны даход? Супольнасць JoKeR пабудавана такім чынам, што ўсе члены вузла сеткавага блока могуць дапамагаць адзін аднаму. Магчымы пасіўны прыбытак; гэта залежыць ад дзейнасці партнёраў, і партнёры могуць у рэшц',
                    contenLI16C:'16. Як натхніць сеткавыя вузлы? Што рабіць, калі я не магу патэлефанаваць? Вам не трэба прымушаць іншых удзельнічаць. У цяперашні час многіх сяброў цікавіць, як зарабіць грошы дзякуючы рэвалюцыі тэхналогій блокчейн ў сеткавых дад',
                    contenLI17C:'17. Якую норму прыбытку можна атрымаць? Памер даходу залежыць ад вашага ўдзелу ў цыркуляцыйных цыклах і паказчыкаў якасці сеткавых вузлоў, якія ўдзельнічаюць у тыражнай дзейнасці.',
                    contenLI18C:'18. Ці трэба мне здымаць зашыфраваныя актывы лічбавай валюты з Джокера? JoKeR не захоўвае ніякіх зашыфраваных актываў лічбавай валюты, таму баланс самога смарт-кантракта роўны нулю. Велізарная колькасць дадзеных - гэта кругазварот супольнасці, вы можаце праверыць гэта асабіста, перайшоўшы па ЛІНКУ. Ваш прыбытак непасрэдна паступае ў ваш асабісты зашыфраван',
                    contenLI19C:'19. Ці зачыніць Джокер? Не, дадзеныя JoKeR з яўляюцца цалкам адкрытымі, можна праверыць і давяраць, і з адкрытым зыходным кодам JoKeR быў правераны і раскрыты',
                    contenLI20C:"20. Глабальны распаўсюджаны круг Джокера не ўплывае на ніякія нацыянальныя урядовыя дэпартаменты. Код - гэта правіла і закон. Ён заўсёды будзе выконвацца разумным кантрактам і не можа быць зачынены ці зменены. Які з' яўляецца вузломЯкая штодзённая хуткасць вяртання блокаваных сеткавых вузлаў?Прама пад вузлом супольнасціГэта звяртаецца да першага ўзровеня партнера, які злучаецца з вашай прэснай сеткай супольнасці. Сённяшняя стаўка вяртання блокавага сеткавага вузла звяртаецца да штодзённай стаўкі вяртання часткавага цыклу цыклу цыклу цыклу. Джокер падзелены на чатыры цыклы: 1 дзень цыклуацыя 7 дзён цыклуацыі 15 дзён цыклуацыі 30 дзён цыклуацыі 1 дзень 101% 7dt block network node directly",
                    contenLI21C:'21. У чым розніца паміж эканамічным і экалагічным планам абшчыны Сяргея Маўродзі? Таму што яна не дала невыканальнае абяцанне сваім членам. Поспех кожнага члена абшчыны залежыць ад таго, які вузел экалагічнай сеткі JoKeR не возьме на сябе даўгі і іншыя абавязацельствы',
                    contenLI22C:'22. Якія рызыкі выклікае Джокер? Як доўга я магу гуляць? У JoKeR няма цэнтральных паўнамоцтваў. Усім карыстальнікам вузлоў сеткі супольнасці не трэба рэгістравацца альбо здымаць наяўныя грошы. Ім трэба толькі звязаць свой зашыфраваны адрас кашалька лічбавай валюты USDT (TRC20), каб ажыццявіць глабальны размеркаваны зварот USDT (TRC20) і заключыць кантракт. Разумнае вяртанне прадугледжана. Вам трэба толькі пра',





                    sigOut: 'Выйсці',
                    sigIn: 'Увайсці',
                    syslang: 'Сістэмная мова',
                    circulation: 'Тыраж',
                    Walkinglantern:'Паглядзіце на няправільныя рэсурсы.У Community JoKeR ёсць толькі адзін адрас сайта -www.JoKeR.pet',
                    predict: 'Зваротны адлік да канца ацэнкі',
                    ring: 'Бягучы нумар званка',
                    description: 'Джокер не можа быць спынены, ён не можа быць выключаны, ён не можа быць ўмешчаны трэцяй часткай, вы не можаце быць забаронены праграмай, ён будзе выкананы сістэмай вечна',
                    join: 'Як далучыцца',
                    joinDesc: '<p> 1: 1: Уваходзіце ў ваш адрас паперніка usdt (trc20) пасля выкарыстання спасылкі падзельніка сеткавых вузлаў, каб аўтаматычна актывізаваць рахунак для дэцентралізаванага фінансавага (defi) круглення інтэлектуальнага ру <\ / p> <p> 2: Выберыце перыяд звароту і заплаціце суму USDT (TRC20), якую трэба перадаць на адрас плацяжу. <\/p> <p> 3: Пасля заканчэння накладу кантракт аўтаматычна верне павялічаны USDT (TRC20) на ваш адрас кашалька. <\ / p>',
                    share: 'Увядзенне дзевяці кольцаў',
                    shareDesc: '<p> 1: Смарт-кантракт на дзевяць кольцаў прымае размеркаваны і дэцэнтралізаваны спосаб звароту звароту. Смарт-кантракт запускаецца аўтаматычна з 0-га кальца. Калі накладу недастаткова для аплаты вяртання, смарт-кантракт аўтаматычна скінецца і ўвядзе наступны Кальцо, да 9-га кальца. <\ / p> <p> 2: Кожны раз, калі вы павялічваеце адно звяно, норма рэнтабельнасці звароту капіталу аўтаматычна павялічваецца на 50%, што будзе выкарыстоўвацца для матывацыі ўдзелу ў наступнай спасылцы. <\/p> <p> 3: За кожнае павелічэнне адной спасылкі 10% -90% абарачальных сродкаў будзе паступаць у прызавы фонд Чуанхуаня, які будзе выкарыстоўвацца для падвойнага ўзнагароджання ўсіх адрасоў кашалька, якія страцілі грошы ў папярэдняй спасылцы. <\ / p>',
                    ruleDesc: '<p> 4: Правілы ўзнагароджання за зварот USDT (TRC20) падчас 0-га кальца: <br> Вяртаецца 101% пасля 1 дзеня круглення, 110,5% пасля 7 дзён круглення, 130% пасля 15 дзён круглення і 190% пасля 30 дзён круглення <\ / p> <p> 5: Правілы сумеснага ўзнагароджання: <br> Кожны раз, калі вы распаўсюджваеце 100 USDT, вы можаце атрымліваць пакаленне за ўзнагароды за сумеснае выкарыстанне і атрымліваць да 20 пакаленняў за ўзнагароды. <br> Калі вы распаўсюджваеце 100 USDT самастойна, вы можаце атрымліваць 30% даходу за кожнае пакаленне. <br> Калі вы распаўсюджваеце 200 USDT самастойна, вы можаце атрымліваць 20% даходу для другога пакалення. % <br> Накіруйце 400-1000USDT самастойна, атрымайце 5% ад кожнага даходу 4-10 пакаленняў <br> Накіруйце 1100-2000USDT самастойна, атрымайце 1% ад кожнага даходу 11-20 пакаленняў <\ / p>',
                    present: 'адкрыты зыходны код',
                    prizeLog: 'Бонусныя дадзеныя',
                    contAddress: 'Калі ласка, увядзіце адрас смарт-кантракту USDT (TRC20)',
                    startCir: 'Пачніце тыраж',
                    back: 'вяртанне',
                    contContract: 'Статыстыка кантрактаў',
                    coutAddre: 'Агульная колькасць адрасоў інтэлектуальнага кантракту, якія ўдзельнічаюць у гісторыі',
                    countCirul: 'Агульная сума гістарычнага ўдзелу ў абарачэнні смарт-кантрактаў',
                    prizePool: 'Прызавы фонд інавацый',
                    loginSuccTip: 'ўваход паспяховы',
                    sharePlan: 'Comment',
                    shareTip: 'Выкарыстоўвайце любы адрас кашалька для аплаты па гэтым адрасе і вярніцеся на адрас кашалька, які ўвайшоў у сістэму пасля заканчэння абарачэння фонду',
                    shareLink: 'Падзяліцца спасылкай',
                    friendsTotal: 'Агульная колькасць сяброў',
                    fCirculatTotal: 'Агульны наклад сяброў',
                    tissue: 'Адрас вузла',
                    personal1st: 'Асабістыя генерацыі 1 вузла',
                    personal2st: 'Асабістыя генерацыі 2 вузлаў',
                    personal3st: 'Асабісты вузел трэцяга пакалення',
                    personal4st: 'Асабістыя генерацыі 4- 10 вузлаў',
                    personal11st: 'Асабісты вузел 11- 20 генерацыі',
                    copyText: 'копія',
                    personalData: 'Статыстыка персанальных дадзеных',
                    circulateUsdt: 'Агульная колькасць абарачаных USDT',
                    returnUsdt: 'Агульная сума вяртання USDT',
                    shareReward: 'Узнагарода за індывідуальную ўзнагароду USDT',
                    innovatReward: 'Сума ўзнагароды за асабістае стварэнне USDT',
                    curPersonalPL: 'Бягучая агульная сума асабістага прыбытку і страт USDT',
                    recharge: 'Перазарадка',
                    hashOrder: 'Інтэлектуальны заказ па кантракце',
                    cirTime: 'Цыркуляцыйны цыкл',
                    circulationIn: 'Сума накладу',
                    status: 'статус',
                    view: 'Выгляд',
                    loginTip: 'Звяжыце свой адрас смарт-кантракту USDT (TRC20)',
                    qrCCode: 'QR-код аплаты',
                    qrCCodeExpir: 'Час заканчэння QR-кода',
                    trcErrTip: 'Фармат адраса TRX няправільны',
                    cirReturn: 'Вяртанне тыражу',
                    occupy: 'Размеркаваны адрас смарт-кантракту, ці трэба ўводзіць правадыр блокаў для праверкі',
                    address: 'адрас',
                    regTime: 'Час рэгістрацыі',
                    troAdrrs: 'Transparent address',
                    cTime: 'час',
                    current: 'бягучы',
                    amount: 'Сума',
                    cirRes: 'Тыраж → зварот',
                    msg: {
                        busy: 'Сістэма занятая, паўтарыце спробу пазней!',
                        paramErr: 'Памылка параметра',
                        Occupy:'Размеркаваны адрас смарт-кантракту, ці трэба ўводзіць правадыр блокаў для праверкі',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: ['У звароце', 'вяртаецца', 'завершаны', 'засцерагальнік'],
                    oFail:'няўдача',
                    quest:'праблема',
                    mtoken:'Знак супрацоўкі',
                }
            },
            fa: {
                message: {
                    LSOSOSOq:'راه اندازی نشده است',
                    loginTip1:'کاربر فعال شده است',
                    ecosystemLISPO:'مشکل مشترک',

                    ecosystemLISPO1:'فناوری قرارداد هوشمند - این یک پدیده جدید در اقتصاد غیر متمرکز امروز است.<\/br>پردازش و توزیع جریان مالی دارایی های دیجیتال.<\/br>تمام فرایندها در یک کابینت بلاکچین باز و غیرمتمرکز انجام می شود.<\/br>زیرساخت ارز رمزنگاری JoKeR از چنین قراردادهایی پشتیبانی می کند.',

                    loginTip2:'آدرس فایده جدا شده، آیا برای دیدن بررسی زنجیر بلوک وارد شود',
                    ecosystemLIS:'در اینجا می توانید کد قرارداد هوشمند JoKeR را کاملاً مشاهده کنید ، بنابراین می توانید به ایمنی و عملکرد طولانی مدت پروژه اطمینان کامل داشته باشید!',


                    ecosystemLIS1:'خطر صفر',
                    ecosystemLIS2:'توسعه دهندگان JoKeR یک قرارداد هوشمند خود اجرا در زنجیره بلوک TRON مستقر کرده اند که دائمی است و توسط هیچ شخص دیگری قابل اصلاح نیست',

                    ecosystemLIS3:'معامله فوری',
                    ecosystemLIS4:'سود سایر اعضا مستقیماً وارد کیف پول شخصی شما می شود ، در سیستم انباشت وجود ندارد و سود فقط متعلق به شماست',

                    ecosystemLIS5:'عدم تحقق مشروط',
                    ecosystemLIS6:'قرارداد هوشمند JoKeR فقط یک درگاه پرداخت است که می تواند پرداخت کمیسیون نظیر به نظیر را بین شرکت کنندگان تسهیل کند',

                    ecosystemLIS7:'تمرکززدایی',
                    ecosystemLIS8:'هیچ مدیر یا سرپرستی وجود ندارد ، فقط سازندگان با شرایط برابر با بقیه در پروژه شرکت می کنند',

                    ecosystemLIS9:'شفافیت و گمنامی',
                    ecosystemLIS10:'قرارداد هوشمند عمومی است ، هر کسی می تواند کد و کل پرونده معامله را مشاهده کند ، این امر از یکپارچگی سیستم و آمار واقعی پروژه اطمینان می دهد',

                    ecosystemLIS11:'100٪ آنلاین',
                    ecosystemLIS12:'کلیه وجوه بدون هیچ گونه هزینه پنهانی بین اعضا منتقل می شود و مانده قرارداد همیشه صفر است',










                    contenLI1:'1. جوکر چیست؟',
                    contenLI2:'2. چه کسی پلت فرم جوکر را مدیریت می کند؟',
                    contenLI3:'3. چه کسی جوکر را خلق کرده است؟',
                    contenLI4:'4- قرارداد هوشمند چیست؟ چه مزایایی دارد؟',
                    contenLI5:'5- برای پیوستن به چه مواردی لازم است؟',
                    contenLI6:'6. از کدام کیف پول استفاده کنم؟',
                    contenLI7:'7. از کجا می توانم اطلاعات بیشتری در مورد جوکر کسب کنم؟',
                    contenLI8:'8- برای ایجاد کیف پول Tron به چه مواردی نیاز دارم؟',
                    contenLI9:'9. اگر من قبلاً هرگز در پردازش ارز دیجیتال رمزنگاری شده شرکت نکرده ام ، چگونه BTC ETH USDT TRX را بخرم و بفروشم؟',
                    contenLI10:'10. چگونه می توان در جامعه جوکر در گردش خون شرکت کرد؟',
                    contenLI11:'11. آیا می توانم بدون شریک زندگی خود را به صورت آنلاین ثبت نام کنم؟',
                    contenLI12:'12- در صورت قطع همکاری با انجمن جوکرها ، حساب من چه اتفاقی خواهد افتاد؟',
                    contenLI13:'13. من در تیراژ شرکت کرده ام ، در مرحله بعدی چه کاری باید انجام دهم؟',
                    contenLI14:'14. چگونه می توان از طریق جوکر به اهداف دست یافت؟',
                    contenLI15:'15-آیا درآمد منفعل امکان پذیر است؟',
                    contenLI16:'16. چگونه می توان گره های شبکه را الهام گرفت؟ اگر نتوانم تماس بگیرم چه می کنم؟',
                    contenLI17:'17. چه نرخ بازگشتی را می توان بدست آورد؟',
                    contenLI18:'18- آیا لازم است دارایی های رمزنگاری شده ارز دیجیتال را از JoKeR برداشت کنم؟',
                    contenLI19:'19. آیا جوکر تعطیل می شود؟',
                    contenLI20:'20. گردش توزیع شده جهانی جوکر تحت هیچگونه مداخله دولت مرزی ملی قرار ندارد. این کد یک قانون و قانون است. این ',
                    contenLI21:'21. تفاوت برنامه اقتصادی و بوم شناختی جوکر و سرگئی ماورودی چیست؟',
                    contenLI22:'22- خطرات جوکر چیست؟ چه مدت می توانم بازی کنم؟',
                    contenLI1C:'1. جوکر چیست؟ جوکر گردش توزیع شده بین المللی اکوسیستم غیرمتمرکز جهانی است و همچنین اولین سناریوی بازاریابی و گردش قرارداد هوشمند TRON است. این یک الگوریتم نرم افزار خود اجرا است که می تواند عملکرد توزیع جوایز شریک را در بین اعضای جامعه توزیع شده جهانی تحت شرایط خاص (طرح بازاریابی گردش خون) اجرا کند. کد قرارداد در دسترس عموم است. اطلاعات مربوط به معاملات را می توان همیشه در پیوند مشاهده کرد: https://tronscan.io.',
                    contenLI2C:'2. چه کسی پلت فرم جوکر را مدیریت می کند؟بستر جوکر از قراردادهای هوشمند توزیع شده جهانی تشکیل شده است که به طور خودکار معاملات را انجام می دهند و هیچ عامل عینی در روند معامله نمی تواند در آن دخالت کند.',
                    contenLI3C:'3. چه کسی جوکر را خلق کرده است؟مفهوم جوکر به یک سازمان جهانی علاقه مند به ارزهای دیجیتال رمزگذاری شده رمزگذاری شده تعلق دارد. آنها اعضای جامعه هستند و از هیچ امتیاز خاصی برخوردار نیستند. قانون یک قانون و قانون است. امروزه جوکر یک جامعه نظیر به نظیر است که اعضای پلت فرم به آن تعلق دارند و خود پلتفرم نیز به این جامعه تعلق دارد.',
                    contenLI4C:'4- قرارداد هوشمند چیست؟ چه مزایایی دارد؟قرارداد هوشمند الگوریتمی در فناوری بلاکچین ارز دیجیتال رمزنگاری شده است. TRON اولین انتخاب برای ایجاد قراردادهای هوشمند توزیع شده JoKeR است. هدف اصلی این نوع قراردادها خودکار سازی رابطه و فرصت دادن به صورت خودکار تعهد است.',
                    contenLI5C:'5- برای پیوستن به چه مواردی لازم است؟شما در حال حاضر تقریباً هر آنچه لازم دارید را دارید. مابقی نصب کیف پول ارز دیجیتال رمزنگاری شده و تلگرام بر روی دستگاه شما (تلفن هوشمند ، رایانه لوحی ، رایانه شخصی) برای گردش توزیع جهانی است.',
                    contenLI6C:'6. از کدام کیف پول استفاده کنم؟کیف پول Pobao TronLink ، iMToKen ، ToKenPocket از دستگاه های تلفن همراه (تلفن های هوشمند ، تبلت ها) پشتیبانی می کند و همچنین از رایانه و لپ تاپ پشتیبانی می کند. از افزونه های Chrome باید استفاده شود. آدرس رسمی کیف پول TronLink: https://www.tronlink.org/',
                    contenLI7C:'7. از کجا می توانم اطلاعات بیشتری در مورد جوکر کسب کنم؟مشترک کانال تایید شده جوکر در تلگرام شوید. هرگونه س questionsال برای اعضای توزیع شده جوکر ارسال کنید ، آنها خوشحال می شوند که تجربه خود را به اشتراک بگذارند.',
                    contenLI8C:'8- برای ایجاد کیف پول Tron به چه مواردی نیاز دارم؟هنگام ثبت نام ، لطفا فراموش نکنید که رمز عبور کیف پول ارز دیجیتال رمزگذاری شده را با خیال راحت ذخیره کنید.',
                    contenLI9C:'9. اگر من قبلاً هرگز در پردازش ارز دیجیتال رمزنگاری شده شرکت نکرده ام ، چگونه BTC ETH USDT TRX را بخرم و بفروشم؟روش های زیادی برای خرید / فروش ارز رمزپایه در ازای دریافت ارز فیات (ارز معمولی) وجود دارد. همه آنها برای کاربران ارز دیجیتال رمزنگاری شده طراحی شده اند و از یک رابط کاربر پسند برخوردار هستند. اولین معامله شما برای تبدیل ارز قانونی به ارز دیجیتال بیش از پنج دقیقه طول نمی کشد. ما توصیه می کنیم از تجمع ارز ثابت شده bestchange.ru استفاده کنید',

                    contenLI10C:'10. چگونه می توان در جامعه جوکر در گردش خون شرکت کرد؟ برای مشارکت در گردش در JoKeR ، باید یک دوره زمانی تیراژ به قرارداد هوشمند ایجاد شده ارسال کنید تا حساب گردش خون توزیع شده JoKeR فعال شود. انتخاب دوره زمانی تیراژ به منزله ثبت نام شما در انجمن است.',
                    contenLI11C:'11. آیا می توانم بدون شریک زندگی خود را به صورت آنلاین ثبت نام کنم؟ آره. ثبت نام بدون لینک دعوت شما را به شناسه تیم گره توزیع شده JoKeR می رساند.',
                    contenLI12C:'12- در صورت قطع همکاری با انجمن جوکرها ، حساب من چه اتفاقی خواهد افتاد؟ هیچ کس نمی تواند حساب شما را ببندد ، حتی اگر اراده قوی داشته باشد. این حساب همیشه در یکی از بلوک های شبکه TRON ذخیره می شود. اما دیگر نمی توانید از هر گره شبکه گردش خون توزیع',
                    contenLI13C:'13. من در تیراژ شرکت کرده ام ، در مرحله بعدی چه کاری باید انجام دهم؟ منتظر روند تسویه حساب دوره زمانی تیراژ',
                    contenLI14C:'14. چگونه می توان از طریق جوکر به اهداف دست یافت؟ اساس آن ایجاد شبکه ای از شرکا است. شما پتانسیل جامعه را به شرکای احتمالی معرفی کرده و آنها را تشویق می کنید تا با شما همکاری کنند. شرکایی که از گره شبکه شما و نرخ بهره روزانه آنها که با مشارکت آنها در معاملات دوره ای تولید می شود ، استفاده می کنند به آدرس قرارداد هوشمند شما ارسال می شوند و سپس بلافاصله به کیف پول شما هدایت می شوند. این انجمن مستقیماً با پروژه های بازاریابی استفاده می شود. می توانید در مورد فیلم بازاریابی در این فیلم بیشتر بدانید.',
                    contenLI15C:'15-آیا درآمد منفعل امکان پذیر است؟ جامعه جوکر به گونه ای ساخته شده است که همه اعضای گره بلوک شبکه می توانند به یکدیگر کمک کنند. درآمد منفعل امکان پذیر است ؛ این به فعالیت شرکا بستگی دارد و شرکا می توانند از طریق اشتراک یا مشارکت در گردش در شبکه جامعه ظاهر شوند.',
                    contenLI16C:'16. چگونه می توان گره های شبکه را الهام گرفت؟ اگر نتوانم تماس بگیرم چه می کنم؟ لازم نیست دیگران را مجبور به شرکت در آن کنید. در حال حاضر ، بسیاری از دوستان علاقه مند به چگونگی کسب درآمد از طریق انقلاب فناوری بلاکچین در داده های شبکه هستند و بسیاری از آنها فعالانه در جستجوی فرصت های جدید هستند. می توانید خودتان در شبکه های اجتماعی با آنها ملاقات کنید یا می توانید یک کانال فروش خودکار ایجاد کنید تا هر علاقه مند بتواند خود را پیدا کند. می توانید جزئیات بیشتر در مورد این موضوع را در بخش "کالج" در انجمن جوکرها پیدا کنید.',
                    contenLI17C:'17. چه نرخ بازگشتی را می توان بدست آورد؟ میزان درآمد به مشارکت شما در فعالیت های چرخه گردش خون و شاخص های کیفیت گره های شبکه شرکت کننده در فعالیت های گردش خون بستگی دارد.',
                    contenLI18C:'18- آیا لازم است دارایی های رمزنگاری شده ارز دیجیتال را از JoKeR برداشت کنم؟ جوکر هیچ دارایی ارز دیجیتال رمزگذاری شده را حفظ نمی کند ، بنابراین موجودی قرارداد هوشمند خود برابر با صفر است. حجم عظیمی از داده ها گردش جامعه است ، می توانید با دنبال کردن LINK شخصاً آنها را بررسی کنید. درآمد شما مستقیماً از گره شبکه توزیع شده جهانی JoKeR وارد کیف پول ارز دیجیتال رمزنگاری شده شخصی شما می شود. فقط شما می توانید از کیف پول ارز دیجیتال رمزگذاری شده استفاده کنید ، هیچ عامل عینی دیگری نمی تواند دارایی Token شما را مدیریت کند',
                    contenLI19C:'19. آیا جوکر تعطیل می شود؟ خیر ، داده های جوکر کاملاً عمومی ، قابل بررسی و قابل اعتماد است و کد منبع باز جوکر مورد بازرسی و انتشار قرار گرفته است',
                    contenLI20C:'️️20. گردش توزیع شده جهانی جوکر تحت هیچگونه مداخله دولت مرزی ملی قرار ندارد. این کد یک قانون و قانون است. این  n گره های شبکه جامعه مستقیماً وابسته کدامند؟ نرخ بازگشت روزانه گره های شبکه بلوک چقدر است؟',
                    contenLI21C:'21. تفاوت برنامه اقتصادی و بوم شناختی جوکر و سرگئی ماورودی چیست؟ اصل طرح هرمی این است که بیشتر منابع مالی در اختیار سازندگان آن است. هرچه زودتر برسید ، می توانید بیشتر بدست آورید. طرح هرمی می تواند در هر زمان بسته شود. اعضای جامعه جوکر ، مهم نیست که سازنده یا همه افراد جامعه جوکر با هم برابر هستند. هیچ کس نمی تواند فعالیت انجمن را خاتمه دهد ، زیرا عملکرد آن توسط قرارداد هوشمند شبکه بلاکچین تضمین شده است ، که قابل حذف یا تغییر نیست. حتی اگر فعالیت وب سایت متوقف شود ، تا زمانی که برق و دسترسی به اینترنت وجود داشته باشد ، تمام داده ها و کل ساختار بدون تغییر باقی می مانند و قرارداد هوشمند به کار خود ادامه می دهد.',
                    contenLI22C:'22- خطرات جوکر چیست؟ چه مدت می توانم بازی کنم؟ جوکر هیچ مرجع مرکزی ندارد. همه کاربران گره شبکه جامعه نیازی به ثبت یا برداشت پول نقد ندارند. آنها فقط برای انجام گردش توزیع جهانی توزیع شده USDT (TRC20) و رسیدن به قرارداد باید فقط آدرس کیف پول ارز رمزنگاری شده USDT (TRC20) خود را متصل کنند. بازگشت هوشمند شرط بندی شده است. شما فقط باید برای برداشتن تیراژ خود دعوت به اجرا کنید. انجمن براساس قرارداد هوشمند در سیستم بلاکچین اجرا می شود و کد قرارداد هوشمند در مالکیت عمومی است.',









                    lang: 'فارسی',
                    ecosystem1:'اکوسیستم توزیع جهانی',
                    Walkinglantern:'از منابع دروغ محافظت کنید.جاکر اجتماعی فقط یک آدرس سایت دارد.www.JoKeR.pet',
                    sigOut: 'خروج از سیستم',
                    sigIn: 'ورود',
                    syslang: 'زبان سیستم',
                    circulation: 'جریان',
                    predict: 'شمارش معکوس تا پایان برآورد',
                    ring: 'شماره حلقه فعلی',
                    description: 'جوکر نمیتونه متوقف بشه، نمیتونه خاموش بشه، نمیتونه توسط یک حزب سوم مشغول بشه، نمیتونه توسط برنامه ممنوع بشه، توسط سیستم تا ابد اجرا بشه',
                    join: 'چگونگی عضویت',
                    joinDesc: '<p> 1: به آدرس کیف پول USDT (TRC20) خود وارد شوید تا پس از استفاده از لینک اشتراک دوست برای ورود ، قرارداد هوشمند را به طور خودکار فعال کنید. <\ / p> <p> 2: دوره تیراژ را انتخاب کنید و مبلغ USDT (TRC20) مورد نیاز برای پرداخت به آدرس پرداخت را پرداخت کنید. <\/p> <p> 3: پس از انقضا تیراژ ، قرارداد به طور خودکار USDT (TRC20) افزایش یافته را به آدرس کیف پول شما بازمی گرداند. <\ / p>',
                    share: 'نه حلقه مقدمه',
                    shareDesc: '<p> 1: قرارداد هوشمند نه حلقه ای روش بازگشتی توزیع شده و غیرمتمرکز را در پیش می گیرد. قرارداد هوشمند از حلقه 0 به طور خودکار اجرا می شود. هنگامی که تیراژ برای پرداخت هزینه بازگشت کافی نیست ، قرارداد هوشمند به طور خودکار تنظیم می شود و وارد مرحله بعدی می شود حلقه ، تا حلقه 9. <\ / p> <p> 2: هر بار که یک پیوند را افزایش می دهید ، نرخ بازده گردش سرمایه به طور خودکار 50٪ افزایش می یابد ، که برای ایجاد انگیزه در پیوند بعدی استفاده می شود. <\/p> <p> 3: به ازای هر افزایش یک پیوند ، 10٪ -90٪ وجوه در گردش وارد جایزه می شوند ، که برای پاداش مضاعف به آدرسهای کیف پول از دست رفته در پیوند قبلی استفاده می شود. <\ / p>',
                    ruleDesc: '<p> 4: قوانین پاداش گردش USDT (TRC20) در حلقه 0: <br> 101٪ پس از 1 روز گردش ، 110٪ پس از 7 روز گردش و 130٪ پس از 15 روز گردش <\ / p> <p> 5: به اشتراک گذاشتن قوانین پاداش: <br> هر بار که 100 USDT را به گردش در می آورید ، می توانید نسلی از پاداش های مشترک را دریافت کنید و می توانید تا 20 نسل از پاداش های مشترک را دریافت کنید. <br> اگر 100 USDT را خودتان به گردش در آورید ، می توانید 30٪ از درآمد هر نسل را بدست آورید. <br> اگر 200 USDT را توسط خودتان گردش دهید ، می توانید 20٪ درآمد نسل دوم را بدست آورید. ٪ <br> 400-1000USDT را خودتان به گردش در آورید ، 5٪ از هر درآمد 4-10 نسل را بدست آورید <br> 1100-2000USDT را خودتان گردش دهید ، 1٪ از هر درآمد 11-20 نسل را دریافت کنید',
                    present: 'کد منبع باز',
                    prizeLog: 'جزئیات جایزه',
                    contAddress: 'لطفاً آدرس قرارداد هوشمند USDT (TRC20) را وارد کنید',
                    startCir: 'گردش خون را شروع کنید',
                    back: 'برگشت',
                    contContract: 'آمار قرارداد',
                    coutAddre: 'تعداد کل آدرس های قرارداد هوشمند مشارکت کننده تاریخی',
                    countCirul: 'مقدار کل مشارکت تاریخی در گردش قرارداد هوشمند',
                    prizePool: 'جایزه نوآوری',
                    loginSuccTip: 'ورود به سیستم موفقیت آمیز است',
                    sharePlan: 'برنامه شریک بازی',
                    shareTip: 'برای پرداخت به این آدرس از هر آدرس کیف پول استفاده کنید و پس از انقضا گردش صندوق به آدرس کیف پول وارد شده برگردید',
                    shareLink: 'لینک را به اشتراک بگذارید',
                    friendsTotal: 'تعداد کل دوستان',
                    fCirculatTotal: 'گردش کلی دوستان',
                    tissue: 'آدرس نوع',
                    personal1st: 'نسل شخصی ۱ گره',
                    personal2st: 'نسل شخصی ۲ گره',
                    personal3st: 'گرم سوم نسل شخصی',
                    personal4st: 'نسل شخصی 4-10 گره',
                    personal11st: 'گرم نسل ۱۱-۲۰ شخصی',
                    copyText: 'کپی 🀄',
                    personalData: 'آمار داده های شخصی',
                    circulateUsdt: 'مقدار کل USDT در گردش فردی',
                    returnUsdt: 'مبلغ برگشتی کل USDT',
                    shareReward: 'پاداش سهم فردی مبلغ USDT',
                    innovatReward: 'مقدار پاداش خلقت شخصی USDT',
                    curPersonalPL: 'سود و زیان شخصی کل USDT',
                    recharge: 'شارژ مجدد',
                    hashOrder: 'سفارش قرارداد هوشمند',
                    cirTime: 'چرخه گردش خون',
                    circulationIn: 'مقدار گردش خون',
                    status: 'وضعیت',
                    view: 'چشم انداز',
                    loginTip: 'لطفاً آدرس قرارداد هوشمند خود را USDT (TRC20) متصل کنید',
                    qrCCode: 'کد QR پرداخت',
                    qrCCodeExpir: 'زمان انقضا کد QR',
                    trcErrTip: 'قالب آدرس TRX نادرست است',
                    cirReturn: 'عودة الدورة الدموية',
                    occupy: 'توزیع آدرس قرارداد هوشمند ، اینکه آیا برای بررسی به بلوک کاوشگر وارد شوید',
                    address: 'نشانی',
                    regTime: 'زمان ثبت نام',
                    cTime: 'زمان',
                    current: 'جاری',
                    amount: 'میزان',
                    cirRes: 'گردش. بازگشت',
                    msg: {
                        busy: 'سیستم شلوغ است ، لطفاً بعداً دوباره امتحان کنید!',
                        paramErr: 'خطای پارامتر',
                        Occupy:'توزیع آدرس قرارداد هوشمند ، اینکه آیا برای بررسی به بلوک کاوشگر وارد شوید',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: ['در گردش است', 'عودت', 'تکمیل شده', 'فیوز'],
                    oFail:'شکست',
                    quest:'مسئله',
                    mtoken:'علامت همکاری',
                }
            },
            es: {
                // 
                message: {
                    
                    lang: 'Espa&ntilde;ol',
                    sigOut: 'desconectar',
                    sigIn: 'Registrarse',
                    
                    loginTip1: 'کمک کننده',
                    ecosystemLISPO:'problema comun',

                    ecosystemLISPO1:'Tecnología de contrato inteligente: este es un fenómeno nuevo en la economía descentralizada de hoy.<\/br>Procesar y distribuir el flujo financiero de activos digitales<\/br>Todos los procesos se llevan a cabo en un gabinete blockchain abierto y descentralizado.<\/br>La infraestructura de criptomonedas JoKeR admite tales contratos.',

                    LSOSOSOq:'No activado',

                    loginTip2:'Dirección defi distribuida, introduzca el navegador de la cadena de bloques para ver',

                    ecosystemLIS:'Aquí puede ver completamente el código del contrato inteligente JoKeR, para que pueda tener plena confianza en la seguridad y el funcionamiento a largo plazo del proyecto.',







                    ecosystemLIS1:'Riesgo cero',

                    ecosystemLIS2:'Los desarrolladores de JoKeR implementaron un contrato inteligente autoejecutable en la cadena de bloques TRON que es permanente y no puede ser modificado por ninguna entidad.',  


                    ecosystemLIS3:'Transacción instantánea',
                    ecosystemLIS4:'Las ganancias de otros miembros ingresan directamente a su billetera personal, no hay acumulación en el sistema y las ganancias solo le pertenecen a usted',

                    ecosystemLIS5:'Invariancia condicional',

                    ecosystemLIS6:'El contrato inteligente JoKeR es solo una pasarela de pago que puede facilitar el pago de comisiones de igual a igual entre los participantes',


                    ecosystemLIS7:'Descentralización',


                    ecosystemLIS8:'No hay gerentes ni administradores, solo los creadores participan en el proyecto en pie de igualdad con todos los demás',

                    ecosystemLIS9:'Transparencia y anonimato',
                    ecosystemLIS10:'El contrato inteligente es público, cualquiera puede ver el código y todo el registro de transacciones, lo que garantiza la integridad del sistema y las estadísticas reales del proyecto.',

                    ecosystemLIS11:'100% online',
                    ecosystemLIS12:'Todos los fondos se transfieren entre miembros sin tarifas ocultas y el saldo del contrato es siempre cero.',






                    contenLI1:'1. ¿Qué es JoKeR?',
                    contenLI2:'2. ¿Quién gestiona la plataforma JoKeR?',
                    contenLI3:'3. ¿Quién creó JoKeR?',
                    contenLI4:'4. ¿Qué es un contrato inteligente? ¿Cuáles son sus ventajas?',
                    contenLI5:'5. ¿Qué necesito para unirme?',
                    contenLI6:'6. ¿Qué billetera debo usar?',
                    contenLI7:'7. ¿Dónde puedo obtener más información sobre JoKeR?',
                    contenLI8:'8. ¿Qué necesito para crear una billetera Tron?',
                    contenLI9:'9. Si nunca antes he participado en el procesamiento de moneda digital cifrada, ¿cómo comprar y vender BTC ETH USDT TRX?',
                    contenLI10:'10. ¿Cómo participar en circulación en la comunidad JoKeR?',
                    contenLI11:'11. ¿Puedo registrarme en línea para su circulación sin un socio?',
                    contenLI12:'12. ¿Qué pasará con mi cuenta si interrumpo la cooperación con la comunidad de JoKeR?',
                    contenLI13:'13. He participado en la circulación, ¿qué debo hacer en el siguiente paso?',
                    contenLI14:'14. ¿Cómo conseguir objetivos a través de JoKeR?',
                    contenLI15:'15. ¿Es posible la renta pasiva?',
                    contenLI16:'16. ¿Cómo inspirar a los nodos de la red? ¿Y si no puedo llamar?',
                    contenLI17:'17. ¿Qué tasa de rendimiento se puede obtener?',
                    contenLI18:'18. ¿Necesito retirar activos de moneda digital cifrados de JoKeR?',
                    contenLI19:'19. ¿Se cerrará JoKeR?',
                    contenLI20:'¿20. JoKeR global Distributed circulation is not interfered by any Border government department, Code is a rule is a Law, will always be enforced by SMART Contracts, cannot be closed and modified? What is a direct Community Network node?¿Cuál es el rendimiento diario de los nodos de red de bloques?',
                    contenLI21:'21. ¿Cuál es la diferencia entre el plan económico y ecológico comunitario de JoKeR y Sergey Mavrodi?',
                    contenLI22:'22. ¿Cuáles son los riesgos de JoKeR? ¿Cuánto tiempo puedo jugar?',
                    contenLI1C:'1. ¿Qué es JoKeR? JoKeR es la circulación distribuida internacional del ecosistema descentralizado global, y también es el primer escenario de comercialización y circulación de contratos inteligentes de TRON. Este es un algoritmo de software autoejecutable que puede ejecutar la función de distribuir recompensas de socios entre los miembros de la comunidad distribuida global bajo ciertas condiciones (plan de marketing de circulación). El código del contrato está disponible públicamente. La información sobre las transacciones siempre se puede ver en el enlace: https://tronscan.io.',
                    contenLI2C:'2. ¿Quién gestiona la plataforma JoKeR? La plataforma JoKeR se compone de contratos inteligentes distribuidos globalmente que ejecutan transacciones automáticamente y no pueden ser interferidos por ningún factor objetivo en el proceso de transacción.',
                    contenLI3C:'3. ¿Quién creó JoKeR? El concepto de JoKeR pertenece a una organización de entusiastas de la moneda digital cifrada distribuida globalmente. Son miembros de la comunidad y no tienen ningún privilegio especial. El código es la regla y la ley. Hoy, JoKeR es una comunidad de igual a igual a la que pertenecen los miembros de la plataforma, y ​​la plataforma en sí también pertenece a esta comunidad.',
                    contenLI4C:'4. ¿Qué es un contrato inteligente? ¿Cuáles son sus ventajas? El contrato inteligente es un algoritmo en la tecnología de cadena de bloques de moneda digital cifrada. TRON es la primera opción para crear contratos inteligentes de circulación distribuida de JoKeR. El objetivo principal de este tipo de contrato es automatizar la relación y dar la oportunidad de automatizar el compromiso.',
                    contenLI5C:'5. ¿Qué necesito para unirme? Ya tienes casi todo lo que necesitas. El resto es instalar una billetera de moneda digital encriptada y Telegram en su dispositivo (teléfono inteligente, tableta, PC) para la circulación distribuida global.',
                    contenLI6C:'6. ¿Qué billetera debo usar? JoKeR es aplicable a todas las carteras de monedas digitales cifradas de TRON. Recomendamos lo siguiente:La billetera Pobao TronLink, iMToKen, ToKenPocket son compatibles con dispositivos móviles (teléfonos inteligentes, tabletas) y también son compatibles con computadoras y computadoras portátiles que deben usar extensiones de Chrome. Dirección oficial de la billetera TronLink: https://www.tronlink.org/',
                    contenLI7C:'7. ¿Dónde puedo obtener más información sobre JoKeR? Suscríbete al canal JoKeR verificado en Telegram. Envíe cualquier pregunta a los miembros distribuidos de JoKeR y estarán encantados de compartir su experiencia.Únase al chat en Telegram t.me/JoKeR. También le recomendamos que investigue el material del sitio web en la sección "Universidad".',
                    contenLI8C:'8. ¿Qué necesito para crear una billetera Tron? Para PC, debe ir al sitio web tronlink.org e instalar la extensión para su navegador.Para dispositivos móviles, debe instalar la aplicación Pobao TronLink WalletAl registrarse, no olvide almacenar la contraseña cifrada de la billetera de moneda digital de forma segura.',
                    contenLI9C:'9. Si nunca antes he participado en el procesamiento de moneda digital cifrada, ¿cómo comprar y vender BTC ETH USDT TRX? Hay muchas formas de comprar / vender criptomonedas a cambio de moneda fiduciaria (moneda regular). Todos están diseñados para usuarios de moneda digital cifrada y tienen una interfaz fácil de usar. Su primera transacción para convertir moneda legal en moneda digital no le llevará más de cinco minutos. Recomendamos utilizar el comprobado agregador de cambio de divisas bestchange.ru',
                    contenLI10C:'10. ¿Cómo participar en circulación en la comunidad JoKeR? Para participar en la circulación en JoKeR, debe enviar un período de tiempo de circulación al contrato inteligente creado para activar la cuenta de circulación distribuida de JoKeR. Elegir el período de tiempo de circulación constituye en sí mismo su registro en la comunidad.Tenga en cuenta: al recargar carteras de monedas digitales cifradas, debe considerar la comisión de la red, que generalmente es de aproximadamente 1TRX.',
                    contenLI11C:'11. ¿Puedo registrarme en línea para su circulación sin un socio? Si. El registro sin un enlace de invitación lo llevará al ID del equipo del nodo distribuido de JoKeR.',
                    contenLI12C:'12. ¿Qué pasará con mi cuenta si interrumpo la cooperación con la comunidad de JoKeR? Nadie puede cerrar su cuenta, incluso si tiene una voluntad fuerte. La cuenta siempre se almacenará en uno de los bloques de la red TRON. Pero no podrá seguir obteniendo ingresos de cada nodo de red de circulación distribuida compartida.',
                    contenLI13C:'13. He participado en la circulación, ¿qué debo hacer en el siguiente paso? Para interactuar de manera efectiva con la comunidad de JoKeR, debes:1. Esperando el proceso de liquidación del período de circulación2. Charle con la persona que lo invitó a usted u otros miembros experimentados. Te ayudarán a dar el primer paso.3. Vaya a la sección "Universidad", que contiene cursos sobre cómo trabajar eficazmente en la comunidad.',
                    contenLI14C:'14. ¿Cómo conseguir objetivos a través de JoKeR? Se basa en establecer una red de socios. Presenta el potencial de la comunidad a socios potenciales y los anima a cooperar con usted. Los socios que utilizan su nodo de red, su tasa de interés diaria generada por su participación en transacciones de circulación periódicas se enviarán a la dirección de su contrato inteligente y luego serán redirigidos inmediatamente a su billetera. La comunidad se utiliza directamente con proyectos de marketing. Puede obtener más información sobre el plan de marketing en el video.',
                    contenLI15C:'15. ¿Es posible la renta pasiva? La comunidad de JoKeR está construida de tal manera que todos los miembros del nodo de bloque de red pueden ayudarse entre sí. Los ingresos pasivos son posibles; depende de las actividades de los socios, y los socios eventualmente pueden aparecer en la red comunitaria compartiendo o participando en la circulación.Para asegurarse de tener ingresos pasivos en el futuro, debe hacer un esfuerzo decidido para atraer nuevos socios y abrir una nueva carta en JoKeR',
                    contenLI16C:'16. ¿Cómo inspirar a los nodos de la red? ¿Y si no puedo llamar? No tienes que obligar a otros a participar. En la actualidad, muchos amigos están interesados ​​en cómo ganar dinero a través de la revolución de la tecnología blockchain en los datos de red, y muchos de ellos están buscando activamente nuevas oportunidades. Puedes conocerlos tú mismo en las redes sociales, o puedes configurar un canal de venta automatizado para que cualquier interesado pueda encontrarte a ti mismo. Puedes encontrar más detalles sobre este tema en la sección "Universidad" de la comunidad de JoKeR.',
                    contenLI17C:'17. ¿Qué tasa de rendimiento se puede obtener? La cantidad de ingresos depende de su participación en las actividades del ciclo de circulación y de los indicadores de calidad de los nodos de la red que participan en las actividades de circulación.',
                    contenLI18C:'18. ¿Necesito retirar activos de moneda digital cifrados de JoKeR? JoKeR no retiene ningún activo de moneda digital cifrado, por lo que el saldo del contrato inteligente en sí es igual a cero. La gran cantidad de datos es la circulación de la comunidad, puede verificarlo en persona siguiendo LINK. Sus ingresos ingresan directamente a su billetera de moneda digital cifrada personal desde el nodo de red distribuida global de JoKeR. Solo usted puede usar la billetera de moneda digital encriptada, ningún otro factor objetivo puede administrar sus activos Token',
                    contenLI19C:'19. ¿Se cerrará JoKeR? No, los datos de JoKeR son completamente públicos, verificables y confiables, y el código fuente abierto de JoKeR ha sido auditado y hecho público.',
                    contenLI20C:'¿20. JoKeR global Distributed circulation is not interfered by any Border government department, Code is a rule is a Law, will always be enforced by SMART Contracts, cannot be closed and modified? What is a direct Community Network node?¿Cuál es el rendimiento diario de los nodos de red de bloques?    Los nodos de la comunidad inmediata sonLa tasa de rendimiento diario de los nodos de red del bloque de socios de primer nivel que enlaza con su red comunitaria directa se refiere a la tasa de rendimiento diario del ciclo de participación en la circulación. JoKeR se divide en cuatro ciclos en total. 1 día de circulación. 7 días de circulación. 15 días de circulación. 15 días de circulación. 30 días de circulación. 1 día de circulación. 101% 7 días de circulación. 110,5% 15 días. 130% 30 días. 190% con 10.000 dólares de circulación. Por ejemplo, 10.000 dólares de circulación.El 15 es el 30% de la tasa de rendimiento disponible directamente para los nodos de red de bloques de 13.000 dólares de los EE.UU.',
                    contenLI21C:'21. ¿Cuál es la diferencia entre el plan económico y ecológico comunitario de JoKeR y Sergey Mavrodi? Porque no hizo una promesa incumplible a sus miembros. El éxito de cada miembro de la comunidad depende de la red ecológica del nodo comunitario JoKeR no incurrirá en deudas u otras obligacionesJoKeR es una circulación distribuida de contratos inteligentes basados ​​en la tecnología blockchain y no tiene nada que ver con el esquema piramidal.',
                    contenLI22C:'22. ¿Cuáles son los riesgos de JoKeR? ¿Cuánto tiempo puedo jugar? La comunidad de JoKeR no tiene ningún riesgo importante. El único riesgo objetivo es detener la implementación de los nodos de la red comunitaria.',
















                    syslang: 'Lenguaje del sistema',
                    ecosystem1:'Global Distributed Ecosystem',
                    circulation: 'Circulación',
                    Walkinglantern:'Cuidado con los recursos falsos.El JoKeR comunitario sólo tiene una dirección de www.JoKeR.pet',
                    predict: 'Cuenta regresiva hasta el final del presupuesto',
                    ring: 'Número de timbre actual',
                    description: 'El payaso no puede detenerlo, no puede apagarlo, no puede planear en el tercer piso, no se puede prohibir, no se puede mantener en el sistema.',
                    join: 'Como unirse',
                    joinDesc: '<p> 1: Inicie sesión en la dirección de su billetera USDT (TRC20) para activar automáticamente el contrato inteligente después de usar el enlace para compartir del amigo para ingresar. <\ / p> <p> 2: Seleccione el período de circulación y pague la cantidad de USDT (TRC20) que necesita para circular a la dirección de pago. <\/p> <p> 3: Después de que expire la circulación, el contrato devolverá automáticamente el USDT aumentado (TRC20) a la dirección de su billetera. <\ / p>',
                    share: 'Introducción a los Nueve Anillos',
                    shareDesc: '<p> 1: El contrato inteligente de nueve anillos adopta un método de devolución de circulación distribuida y descentralizada. El contrato inteligente se ejecuta automáticamente desde el anillo 0. Cuando la circulación no es suficiente para pagar la devolución, el contrato inteligente se restablecerá automáticamente y entrará en el siguiente Ring, hasta el noveno ring. <\ / p> <p> 2: Cada vez que aumente un enlace, la tasa de rendimiento de la circulación de capital aumentará automáticamente en un 50%, lo que se utilizará para fomentar la participación en el siguiente enlace. <\/p> <p> 3: Por cada aumento de un enlace, el 10% -90% de los fondos circulantes entrarán en el premio acumulado, que se utilizará para recompensar al doble a todas las direcciones de billetera que perdieron dinero en el enlace anterior. <\ / p>',
                    ruleDesc: '<p> 4:Reglas de recompensa de circulación en la Ronda 0 de usdt (trc20): <br> Después de 1 día de circulación, 101%, 110,5% después de 7 días de circulación, 130% después de 15 días de circulación y 190% después de 30 días de circulación. <\ / p> <p> 5: Reglas de recompensas compartidas: <br> Cada vez que circula 100 USDT, puede obtener una generación de recompensas compartidas y puede obtener hasta 20 generaciones de recompensas compartidas. <br> Si circula 100 USDT usted mismo, puede obtener el 30% de los ingresos de cada generación. <br> Si circula 200 USDT usted mismo, puede obtener el 20% de los ingresos de la segunda generación. % <br> Circule 400-1000USDT usted mismo, obtenga el 5% de cada ingreso de 4-10 generaciones <br> Circule 1100-2000USDT usted mismo, obtenga el 1% de cada ingreso de 11-20 generaciones <\ / p>',
                    present: 'código fuente abierto',
                    prizeLog: 'Detalles de bonificación',
                    contAddress: 'Ingrese la dirección del contrato inteligente USDT (TRC20)',
                    startCir: 'Iniciar la circulación',
                    back: 'regreso',
                    contContract: 'Estadísticas de contratos',
                    coutAddre: 'El número total de direcciones históricas de contratos inteligentes participantes',
                    countCirul: 'La cantidad total de participación histórica en la circulación de contratos inteligentes.',
                    prizePool: 'Bolsa de premios de innovación',
                    loginSuccTip: 'Inicio de sesión correcto',
                    sharePlan: 'JoKeR share Program',
                    shareTip: 'Use cualquier dirección de billetera para pagar a esta dirección y regrese a la dirección de billetera con la sesión iniciada después de que expire la circulación de fondos',
                    shareLink: 'Compartir enlace',
                    friendsTotal: 'Número total de amigos',
                    fCirculatTotal: 'Circulación total de amigos',
                    tissue: 'Dirección del nodo',
                    personal1st: 'Nodo de generación personal',
                    personal2st: 'Nodo personal de segunda generación',
                    personal3st: 'Nodo personal de tercera generación',
                    personal4st: 'Nodo de generación personal 4 - 10',
                    personal11st: 'Nodo de generación personal 11 - 20',
                    copyText: 'Copiar',
                    personalData: 'Estadísticas de datos personales',
                    circulateUsdt: 'Cantidad de USDT circulante total individual',
                    returnUsdt: 'Importe de devolución total individual de USDT',
                    shareReward: 'Importe de USDT de recompensa de acciones individuales',
                    innovatReward: 'La cantidad de recompensa de creación personal USDT',
                    curPersonalPL: 'Cantidad actual total de ganancias y pérdidas personales en USDT',
                    recharge: 'Recargar',
                    hashOrder: 'Orden de contrato inteligente',
                    cirTime: 'Ciclo de circulación',
                    circulationIn: 'Cantidad de circulación',
                    status: 'estado',
                    view: 'Ver',
                    loginTip: 'Vincula tu dirección de contrato inteligente USDT (TRC20)',
                    qrCCode: 'Código QR de pago',
                    qrCCodeExpir: 'Hora de vencimiento del código QR',
                    trcErrTip: 'El formato de la dirección TRX es incorrecto',
                    cirReturn: 'Retorno de circulación',
                    occupy: 'Dirección de contrato inteligente distribuida, si se debe ingresar al explorador de bloques para verificar',
                    address: 'habla a',
                    regTime: 'Tiempo de registro',
                    troAdrrs: 'Transparent address',
                    cTime: 'hora',
                    current: 'Actual',
                    amount: 'Cantidad',
                    cirRes: 'Circulación → retorno',
                    msg: {
                        busy: 'El sistema está ocupado, inténtelo de nuevo más tarde.',
                        paramErr: 'error de parametro',
                        Occupy:'Dirección de contrato inteligente distribuida, si se debe ingresar al explorador de bloques para verificar',
                    },
                    period: {
                        year:'year', month:'month', day:'day ', hrs:':', mins:':', secs:'',
                    },
                    oStatus: ['En circulación', 'Regresando', 'terminado', 'Fusible'],
                    oFail:'fracaso',
                    quest:'problema',
                    mtoken:'Token de cooperación',
                }
            },

        }
    })
    // Main
    var vm = new Vue({
        el: '#App',
        i18n,
        data: {
            newTeamA: [{
                "endGame": 0,
                mvp: 'message.contenLI1',
                content: 'message.contenLI1C',
                choose: false
            },
            {
                "endGame": 1,
                mvp:  'message.contenLI2',
                content: 'message.contenLI2C',
                choose: false
            },
            {
                "endGame": 2,
                mvp:  'message.contenLI3',
                content: 'message.contenLI3C',
                choose: false
            },
            {
                "endGame": 3,
                mvp:  'message.contenLI4',
                content: 'message.contenLI4C',
                choose: false
            },
            {
                "endGame": 4,
                mvp:  'message.contenLI5',
                content: 'message.contenLI5C',
                choose: false
            },
            {
                "endGame": 5,
                mvp:  'message.contenLI6',
                content: 'message.contenLI6C',
                choose: false
            },
            
            {
                "endGame": 6,
                mvp:  'message.contenLI7',
                content: 'message.contenLI7C',
                choose: false
            },
            {
                "endGame": 7,
                mvp:  'message.contenLI8',
                content: 'message.contenLI8C',
                choose: false
            },
            {
                "endGame": 8,
                mvp:  'message.contenLI9',
                content: 'message.contenLI9C',
                choose: false
            },
            {
                "endGame": 9,
                mvp:  'message.contenLI10',
                content: 'message.contenLI10C',
                choose: false
            },
            {
                "endGame": 10,
                mvp:  'message.contenLI11',
                content: 'message.contenLI11C',
                choose: false
            },
            {
                "endGame":11,
                mvp:  'message.contenLI12',
                content: 'message.contenLI12C',
                choose: false
            },
            {
                "endGame": 12,
                mvp:  'message.contenLI13',
                content: 'message.contenLI13C',
                choose: false
            },
            {
                "endGame": 13,
                mvp:  'message.contenLI14',
                content: 'message.contenLI14C',
                choose: false
            },
            {
                "endGame": 14,
                mvp:  'message.contenLI15',
                content: 'message.contenLI15C',
                choose: false
            },            {
                "endGame": 15,
                mvp:  'message.contenLI16',
                content: 'message.contenLI16C',
                choose: false
            },            {
                "endGame": 16,
                mvp:  'message.contenLI17',
                content: 'message.contenLI17C',
                choose: false
            },            {
                "endGame": 17,
                mvp:  'message.contenLI18',
                content: 'message.contenLI18C',
                choose: false
            },            {
                "endGame": 18,
                mvp:  'message.contenLI19',
                content: 'message.contenLI19C',
                choose: false
            },            {
                "endGame": 19,
                mvp:  'message.contenLI20',
                content: 'message.contenLI20C',
                choose: false
            },            {
                "endGame": 20,
                mvp:  'message.contenLI21',
                content: 'message.contenLI21C',
                choose: false
            },            {
                "endGame": 21,
                mvp:  'message.contenLI22',
                content: 'message.contenLI22C',
                choose: false
            }
            ],            
            expiredate:'',
            addressList:'',
            financials:[],

            
            totalconten:{},
            orders:[],   //订单
            personal:{
                profit: null,
                recharge_quantity_sum: null,
                ring_reward: null,
                share_reward: null,
                withdraw_quantity_sum: null
            }, // 个人数据统计
            userFromSumGroups:{
       
              lv1: null,
              lv2: null,
              lv3: null,
              lv4: null,
              lv5: null

            }, //節點地址
            share_plan:{
                form_user_count: null,
                recharge_quantity_sum: null,
                share_url: null,
            }, //九环计划
            // urlApi:'http://JoKer.api.gcoincloud.top',

            
            //  pro
            urlApi:'https://api.JoKer.pet',

            tab: 'main',
            langShow:false,
            deposit_amount: 0,
            trxAmount: '',
            selectDay: 1,
            cirReturn:130,
            qrcodeText: '',
            curTitle: '',
            curTeamlist: [],
            prizeLogs: {
                data: [],
            },
            contract: {
                ring_pool: 0,
                circulation: 0,
                coutAddre: 0,
                prizePool: 0,
                countdown_at: 5184000, 
                AdrsList:[],
            },
            tron: {
                account: '',
                personal1st: 0,
                personal2st: 0,
                personal3st: 0,
                personal4st: 0,
                personal11st: 0,
                returnUsdt: 0,
                shareReward: 0,
                innovatReward: 0,
                curPersonalPL: 0,
                orderList: [],
                teams: [[], [], [], [], []],
                user: {
                    'd1': '',
                    'd7': '',
                    'd15': '',
                    'failtm': 0,
                    'flow': 0,
                    'tflow': 0,
                    'team': 0,
                },
            },

            coinList:[{"id":"huobipro","logo":"huobipro.png","url":"https:\/\/www.huobi.pr"},{"id":"binance","logo":"binance.png","url":"https:\/\/www.binancezh.pro"},{"id":"coinbasepro","logo":"coinbasepro.png","url":"https:\/\/pro.coinbase.com\/"},{"id":"bitfinex","logo":"bitfinex.png","url":"https:\/\/www.bitfinex.com"},{"id":"bitflyer","logo":"bitflyer.png","url":"https:\/\/bitflyer.jp\/"},{"id":"bitmex","logo":"bitmex_200.png?v=1573453365","url":"https:\/\/www.bitmex.com\/"},{"id":"bittrex","logo":"bittrex.png","url":"https:\/\/bittrex.com"},{"id":"okex","logo":"okex.png","url":"https:\/\/www.okexcn.com"},{"id":"zb","logo":"zb.png","url":"https:\/\/www.zb.center"},{"id":"bitstamp","logo":"bitstamp.png","url":"https:\/\/www.bitstamp.net"},{"id":"kraken","logo":"kraken.png","url":"https:\/\/www.kraken.com"},{"id":"gemini","logo":"gemini.png","url":"https:\/\/gemini.com\/"},{"id":"poloniex","logo":"poloniex.png?v=1600153929","url":"https:\/\/poloniex.com"},{"id":"mexc","logo":"mexc.png","url":"https:\/\/www.mxc.ai"},{"id":"gate-io","logo":"gate-io.png","url":"https:\/\/www.gateio.tv"},{"id":"bikicoin","logo":"bikicoin_200.png?v=1584932151","url":"https:\/\/www.biki.cc"},{"id":"hitbtc","logo":"hitbtc.png","url":"https:\/\/hitbtc.com"},{"id":"bituan","logo":"bituan.png?v=1591673036","url":"https:\/\/www.bituan.pro"},{"id":"aofex","logo":"aofex.png","url":"https:\/\/aofex.com"},{"id":"coinw","logo":"coinw.png?v=1597374303","url":"https:\/\/www.coinw.pw"},{"id":"bitget","logo":"bitget.png","url":"https:\/\/www.bitget.info"},{"id":"wbfex","logo":"wbfex_200.png?v=1583205240","url":"https:\/\/www.wbfex.com"},{"id":"ztcom","logo":"ztcom_200.png?v=1585106397","url":"https:\/\/www.ztb.im"},{"id":"bit-z","logo":"bit-z.png?v=1602641673","url":"https:\/\/www.bitz.ai"},{"id":"upbit","logo":"upbit.png","url":"https:\/\/upbit.com\/home"},{"id":"hotcoin","logo":"hotcoin.png","url":"https:\/\/www.hotcoinex.cc"},{"id":"bg","logo":"bg.png","url":"http:\/\/www.bgex.com\/"},{"id":"dcoin","logo":"dcoin_200.png?v=1577158793","url":"https:\/\/www.dcoin.com"},{"id":"ubank","logo":"ubank.png","url":"https:\/\/ubanks.ai\/"},{"id":"liquid","logo":"liquid.png","url":"https:\/\/www.liquid.com\/"},{"id":"loex","logo":"loex_200.png?v=1576483090","url":"https:\/\/www.loex.io"},{"id":"zbg","logo":"zbg.png","url":"https:\/\/www.zbg.com\/"},{"id":"cointiger","logo":"cointiger_200.png?v=1582084026","url":"https:\/\/www.cointiger.com\/"},{"id":"shuzibi","logo":"shuzibi.png?v=1593328236","url":"https:\/\/www.digifinex.com"},{"id":"coinbene","logo":"coinbene.png?v=1605860044","url":"https:\/\/www.coinbene.plus\/"},{"id":"tokencan","logo":"tokencan.png","url":"https:\/\/www.tokencan.co\/"},{"id":"ourbit","logo":"ourbit.png?v=1594350201","url":"https:\/\/www.ourbit.com"},{"id":"zgcom","logo":"zgcom.png?v=1591068166","url":"https:\/\/www.zg.com"},{"id":"bibox","logo":"bibox.png","url":"https:\/\/www.bibox.com"},{"id":"kucoin","logo":"kucoin.png","url":"https:\/\/www.kucoin.io\/"},{"id":"bybit","logo":"bybit_200.png?v=1584414963","url":"https:\/\/www.bybit.com"},{"id":"bithumb","logo":"bithumb.png","url":"https:\/\/www.bithumb.com\/"},{"id":"xmex","logo":"xmex_200.png?v=1582687802","url":"https:\/\/www.xmex.co"},{"id":"bigone","logo":"bigone.png","url":"https:\/\/bigonechina.com"},{"id":"biteceo","logo":"biteceo.png","url":"https:\/\/www.ceobi.co"},{"id":"coinbig","logo":"coinbig.png?v=1591685197","url":"https:\/\/www.coinbig.in"},{"id":"sjscom","logo":"sjscom.png?v=1596090574","url":"https:\/\/www.sjs.com\/"},{"id":"hoo","logo":"hoo.png?v=1597221468","url":"https:\/\/hoo.com\/"},{"id":"bmex","logo":"1585189838532_200.png?v=1585290071","url":"https:\/\/bmex.vip"},{"id":"bfx","logo":"bfx.png","url":"https:\/\/www.bfxnu.pro"},{"id":"pkex","logo":"pkex.png?v=1593488768","url":"https:\/\/www.pkex.com"},{"id":"bhex","logo":"bhex.png?v=1586943468","url":"https:\/\/www.hbtc.co"},{"id":"aex","logo":"aex.png?v=1595212803","url":"https:\/\/www.aex.plus\/"},{"id":"hkexone","logo":"hkexone.png","url":"https:\/\/www.hkex.la"},{"id":"bibull","logo":"bibull.png?v=1588930726","url":"https:\/\/www.bibull.co\/"},{"id":"bitmax","logo":"bitmax.png","url":"https:\/\/www.btmx.io\/"},{"id":"yobit","logo":"yobit.png","url":"https:\/\/yobit.net"},{"id":"coinone","logo":"coinone.png","url":"https:\/\/coinone.co.kr\/"},{"id":"citex","logo":"citex.png","url":"https:\/\/www.citex.io\/"},{"id":"bicc","logo":"bicc.png","url":"https:\/\/www.bi.cc"},{"id":"coincheck","logo":"coincheck.png","url":"https:\/\/coincheck.com\/"},{"id":"bkex","logo":"bkex.png?v=1587708422","url":"https:\/\/www.bkex.com"},{"id":"hcex","logo":"hcex.png?v=1597306114","url":"https:\/\/www.hcex.net\/"},{"id":"bebt","logo":"bebt.png?v=1597979574","url":"https:\/\/www.bebt.me"},{"id":"xt","logo":"xt.png","url":"https:\/\/www.xt.com"},{"id":"kmex","logo":"kmex.png?v=1594175760","url":"https:\/\/www.kmex.io\/"},{"id":"btcc","logo":"btcc.png?v=1591319081","url":"https:\/\/www.btcc.com\/"},{"id":"bione","logo":"bione_200.png?v=1584520181","url":"https:\/\/www.bione.me"},{"id":"lhang","logo":"lhang.png","url":"https:\/\/www.lbank.info"},{"id":"ubiex","logo":"ubiex_200.png?v=1585548420","url":"https:\/\/www.ubiex.co\/"},{"id":"cftcex","logo":"cftcex.png?v=1605685626","url":"https:\/\/www.cftcex.com"},{"id":"whaleex","logo":"whaleex.png","url":"https:\/\/w.whaleex.com.cn\/"},{"id":"jbexcom","logo":"jbexcom.png","url":"https:\/\/www.jbex.com\/"},{"id":"bingbon","logo":"1571887239335_200.png?v=1577180550","url":"https:\/\/www.bingbon.com"},{"id":"boxexio","logo":"boxexio.png","url":"https:\/\/www.boxex.io\/"},{"id":"btnex","logo":"1570775086434_200.png?v=1570775207","url":"https:\/\/www.btnex.pro\/"},{"id":"bbvip","logo":"bbvip.png?v=1605778350","url":"https:\/\/www.ubitmex.com\/"},{"id":"bqex","logo":"bqex.png","url":"http:\/\/www.bqex.org\/"},{"id":"tokok","logo":"tokok.png","url":"https:\/\/www.tokok.com\/"},{"id":"sfex","logo":"1571187035835_200.png?v=1585278569","url":"http:\/\/sfex.one"},{"id":"hotbit","logo":"hotbit.png?v=1585819031","url":"https:\/\/www.hotbit.pro\/"},{"id":"zibit","logo":"zibit.png?v=1600763987","url":"https:\/\/www.zibit.pro\/"},{"id":"boboo","logo":"1574149917741_200.png?v=1574150013","url":"https:\/\/www.boboo.vip"},{"id":"champagne","logo":"champagne.png?v=1603934324","url":"https:\/\/www.chex.pro"},{"id":"bitbank","logo":"bitbank.png","url":"https:\/\/bitbank.cc"},{"id":"bitmart","logo":"bitmart.png","url":"https:\/\/www.bitmart.news"},{"id":"gj","logo":"gj.png","url":"https:\/\/www.gj.live\/"},{"id":"dibi","logo":"dibi.png?v=1590374802","url":"https:\/\/www.dibic.net\/"},{"id":"ocx","logo":"ocx_200.png?v=1579483760","url":"http:\/\/www.ocx.com\/"},{"id":"homiex","logo":"1575958707218_200.png?v=1577858755","url":"https:\/\/www.homiex.io\/"},{"id":"phoenixglobal","logo":"1579485858870_200.png?v=1584347689","url":"https:\/\/www.phoenixglobal.cc\/"},{"id":"bingoex","logo":"1575012955691_200.png?v=1575267138","url":"https:\/\/www.bingoex.pro"},{"id":"btex","logo":"btex.png","url":"https:\/\/www.btex.com\/"},{"id":"asproex","logo":"1573009753688_200.png?v=1573009920","url":"https:\/\/www.asproex.com\/"},{"id":"londonexchange","logo":"londonexchange.png?v=1603443885","url":"https:\/\/www.ldxex.com"},{"id":"goko","logo":"goko.png","url":"https:\/\/www.goko.vip\/"},{"id":"exmo","logo":"exmo.png","url":"https:\/\/exmo.com\/"},{"id":"umex","logo":"umex.png?v=1602729285","url":"https:\/\/www.bitfly.co"},{"id":"zaif","logo":"zaif.png","url":"https:\/\/zaif.jp"},{"id":"immex","logo":"immex.png?v=1600242649","url":"https:\/\/www.immex.vip"},{"id":"ffexpro","logo":"ffexpro.png","url":"https:\/\/www.ffex.pro\/"},{"id":"bithumbpro","logo":"bithumbpro.png","url":"https:\/\/www.bithumb.global"},{"id":"deepcoin","logo":"deepcoin.png","url":"https:\/\/deepcoin.com\/"},{"id":"rightbtccc","logo":"rightbtccc.png?v=1597645085","url":"https:\/\/www.rightbtc.cc\/"},{"id":"aboutcoin","logo":"aboutcoin.png?v=1602318543","url":"https:\/\/www.boniry.pro"},{"id":"exx","logo":"exx.png","url":"https:\/\/www.exxcn.com\/"},{"id":"wankejia","logo":"wankejia.png","url":"https:\/\/www.wkj.link\/"},{"id":"hopex","logo":"hopex.png?v=1603942313","url":"https:\/\/www.hopex.com"},{"id":"itex","logo":"itex.png?v=1597904195","url":"http:\/\/itex.cc\/"},{"id":"alokex","logo":"alokex.png?v=1604287037","url":"https:\/\/www.alokex.me"},{"id":"gx","logo":"1572505884349_200.png?v=1572505997","url":"https:\/\/www.gx.com\/"},{"id":"iotuyy","logo":"iotuyy.png","url":"http:\/\/www.iotuyy.com"},{"id":"vb","logo":"vb.png","url":"https:\/\/www.vb.co\/"},{"id":"aax","logo":"aax.png?v=1586490610","url":"https:\/\/www.aaxpro.com"},{"id":"bitsg","logo":"bitsg.png","url":"https:\/\/www.bitsg.cc"},{"id":"idcm","logo":"idcm.png?v=1594892113","url":"https:\/\/www.idcm.cc\/"},{"id":"zdcoin","logo":"zdcoin.png?v=1590030323","url":"https:\/\/www.zhidian.io\/"},{"id":"bw","logo":"bw.png","url":"https:\/\/www.bw.io\/"},{"id":"zgtop","logo":"zgtop.png","url":"https:\/\/www.zgpro.top\/ "},{"id":"bitcoinwin","logo":"bitcoinwin.png?v=1585622421","url":"https:\/\/www.bitcoinwin.io\/"},{"id":"newtonxchange","logo":"newtonxchange.png","url":"https:\/\/www.newtonx.vip\/"},{"id":"deerdex","logo":"deerdex.png?v=1593412889","url":"https:\/\/www.deerdex.top"},{"id":"fatbtc","logo":"fatbtc.png","url":"https:\/\/www.fatbtc.com"},{"id":"dfex","logo":"dfex.png","url":"https:\/\/www.dfex.im\/"},{"id":"btcmax","logo":"btcmax.png","url":"https:\/\/www.btcmax.com"},{"id":"60com","logo":"60com.png","url":"https:\/\/www.bjex.pro"},{"id":"bitfx","logo":"bitfx.png?v=1599636701","url":"https:\/\/www.bitfx.info"},{"id":"beecoin","logo":"beecoin.png?v=1603352156","url":"https:\/\/www.benson.today\/"},{"id":"luno","logo":"luno.png","url":"https:\/\/www.luno.com"},{"id":"qb","logo":"qb.png","url":"https:\/\/www.qb.com\/"},{"id":"bbkx","logo":"bbkx.png","url":"https:\/\/www.bbkx.com"},{"id":"grccoin","logo":"1583915904994_200.png?v=1583916190","url":"https:\/\/www.grccoin.co"},{"id":"nowex","logo":"nowex.png?v=1603762163","url":"https:\/\/www.exfinex.com"},{"id":"proex","logo":"proeX.png?v=1592986577","url":"https:\/\/www.proex.io\/"},{"id":"hypex","logo":"hypex.png","url":"https:\/\/www.hpx.world"},{"id":"dragonex","logo":"dragonex.png","url":"https:\/\/www.dragonex.in\/"},{"id":"btcbox","logo":"btcbox.png","url":"https:\/\/www.btcbox.co.jp\/"},{"id":"aemex","logo":"aemex.png?v=1595581243","url":"https:\/\/www.senbit.com\/"},{"id":"zone","logo":"zone.png?v=1606126431","url":"https:\/\/www.zone-coin.com"},{"id":"cdae","logo":"cdae.png","url":"https:\/\/www.bzex.me"},{"id":"goldex","logo":"goldex.png","url":"https:\/\/www.goldex.cc\/"},{"id":"awd","logo":"awd.png?v=1596695420","url":"https:\/\/www.bitone.one\/"},{"id":"bcex","logo":"bcex.png","url":"https:\/\/www.bcex.hk"},{"id":"99ex","logo":"99ex.png","url":"https:\/\/www.9ex.vip\/"},{"id":"up","logo":"up.png","url":"https:\/\/www.up.top\/"},{"id":"saex","logo":"1583391892233_200.png?v=1583392301","url":"https:\/\/www.saex.io\/"},{"id":"hotbi","logo":"hotbi.png","url":"https:\/\/hotbi.io\/"},{"id":"bitzon","logo":"bitzon.png","url":"https:\/\/www.bitzon.com\/"},{"id":"hubi","logo":"hubi.png","url":"https:\/\/www.hubi.com\/"},{"id":"huahuo","logo":"huahuo.png?v=1597202030","url":"http:\/\/huahuolab.com\/"},{"id":"bizex","logo":"bizex.png?v=1599534179","url":"http:\/\/www.bizex.cc\/"},{"id":"vbit","logo":"vbit.png?v=1588064663","url":"https:\/\/www.vbit.me\/"},{"id":"instantex","logo":"instantex_200.png?v=1574042411","url":"https:\/\/www.zoooo.io\/"},{"id":"ubay","logo":"ubay.png","url":"https:\/\/www.ubay.bz\/"},{"id":"bma","logo":"bma.png?v=1586844392","url":"https:\/\/s4.bmaclub.com\/"},{"id":"gaea","logo":"gaea_200.png?v=1574216044","url":"https:\/\/www.gmex.io"},{"id":"bitmc","logo":"bitmc.png?v=1605597824","url":"https:\/\/www.bit-mc.com\/"},{"id":"beeex","logo":"beeex.png","url":"https:\/\/www.beeex.com\/"},{"id":"upupex","logo":"1584597848004_200.png?v=1584598706","url":"https:\/\/www.upupex.com\/"},{"id":"tab","logo":"1572316516571_200.png?v=1581901493","url":"https:\/\/www.tac.top\/"},{"id":"tsc","logo":"tsc.png?v=1591860755","url":"https:\/\/www.coinlead.cc\/"},{"id":"chicago","logo":"chicago.png?v=1600065065","url":"https:\/\/www.chicagobit.cc\/"},{"id":"wenx","logo":"wenx.png?v=1590743688","url":"https:\/\/www.wenxpro.com\/"},{"id":"hydax","logo":"hydax.png","url":"https:\/\/www.hydax.com\/"},{"id":"bitepro","logo":"bitepro.png?v=1595318063","url":"http:\/\/www.bitepro.cn\/"},{"id":"allcoin","logo":"allcoin.png?v=1602210916","url":"https:\/\/www.ukex.co"},{"id":"fchain","logo":"fchain.png?v=1597650712","url":"https:\/\/www.fchain.one\/"},{"id":"blex","logo":"blex.png?v=1604564487","url":"https:\/\/www.bilanex.com"},{"id":"bimin","logo":"1571217766053_200.png?v=1571989802","url":"https:\/\/www.bimin.co\/"},{"id":"exshell","logo":"exshell_200.png?v=1574754772","url":"https:\/\/www.nvex.io\/"},{"id":"crius","logo":"crius.png","url":"https:\/\/www.crius.plus"},{"id":"bbex","logo":"bbex.png","url":"https:\/\/www.bb.exchange\/"},{"id":"pcm","logo":"pcm.png?v=1600841165","url":"https:\/\/www.pcbitpro.com"},{"id":"nutex","logo":"nutex.png","url":"https:\/\/www.nutex.io"},{"id":"manhattan","logo":"manhattan.png?v=1600064097","url":"http:\/\/www.mhdbit.com\/"},{"id":"btc100pro","logo":"btc100pro.png?v=1589190119","url":"https:\/\/www.btc100.pro\/"},{"id":"bafeex","logo":"bafeex_200.png?v=1572840086","url":"https:\/\/www.bafeex.io\/"},{"id":"emex","logo":"emex.png","url":"https:\/\/www.emex.cc\/"},{"id":"58coin","logo":"58coin.png","url":"https:\/\/www.58ex.com\/"},{"id":"nstarex","logo":"nstarex.png?v=1588065469","url":"https:\/\/nstarex.com\/"},{"id":"ame","logo":"ame.png?v=1604027903","url":"https:\/\/www.ame.kim"},{"id":"ix","logo":"ix.png","url":"https:\/\/ix.com\/"},{"id":"snapex","logo":"snapex.png","url":"https:\/\/www.snapex.com\/"},{"id":"antcoin","logo":"1572243706114_200.png?v=1574920844","url":"https:\/\/www.antcoin.pro\/"},{"id":"coinka","logo":"1571210121761_200.png?v=1572691387","url":"https:\/\/www.coinka.me"},{"id":"ko","logo":"ko.png?v=1601014398","url":"https:\/\/www.kozf.com\/"},{"id":"btcbl","logo":"btcbl_200.png?v=1579676692","url":"https:\/\/www.redapple.tv\/"},{"id":"tmux","logo":"tmux.png?v=1597217489","url":"http:\/\/coindance.vip"},{"id":"coinber","logo":"coinber.png?v=1603433975","url":"https:\/\/newbit.online"},{"id":"xhex","logo":"xhex.png?v=1604544720","url":"https:\/\/www.xhex.vip"},{"id":"bioex","logo":"bioex.png?v=1601001101","url":"http:\/\/www.xecoin.cc\/"},{"id":"royalcoin","logo":"royalcoin.png","url":"https:\/\/www.royalcoin.pro\/"},{"id":"wbex","logo":"wbex.png?v=1596164190","url":"http:\/\/www.wbex.vip\/"},{"id":"bocoin","logo":"bocoin.png?v=1600153379","url":"https:\/\/www.kbcoin.top\/"},{"id":"batcoin","logo":"batcoin.png?v=1603681849","url":"https:\/\/www.batcoin.top\/"},{"id":"exbank","logo":"exbank.png?v=1604653241","url":"https:\/\/www.dbosex.com"},{"id":"bhbank","logo":"bhbank.png?v=1594007286","url":"http:\/\/bhbex.info"},{"id":"coineal","logo":"coineal.png","url":"https:\/\/www.coineal.com\/"},{"id":"9coinexchange","logo":"9coinexchange.png","url":"https:\/\/www.9coin.com"},{"id":"aacoin","logo":"aacoin.png","url":"http:\/\/www.aacoin.com\/"}],
            accList: [],
            param: {
                type: '',
                pagesize: 20,
                page: 0
            },
            loadStatus: true,
            isPost: true,
            isSend: true,
            loc_lg:Cookies.get('lang') ? Cookies.get('lang') : 'en',
            recode: '',
            statusNum:'',
            questions:[],
        },
        mounted() {
            this.homeList();
            this.questionsd();




            fetch(this.urlApi+'/api/user_address?_tm=' + Date.now()).then(res => res.json()).then(res => {
                if (res.code == 200) {
                    this.contract = res.data.total;
                    this.contract.AdrsList = res.data.address.data;
                    const _this = this;
                    setInterval(() => {
                        if (!_this.isSend) return;
                        _this.isSend = false;
                        fetch(this.urlApi+'/api/user_address?_tm=' + Date.now()).then(res => res.json()).then(res => {
                            _this.isSend = true;
                            if (res.code == 200) {
                                _this.contract = res.data.total;
                                _this.contract.AdrsList = res.data.address.data;
                            }
                        });
                    }, 5000);
                }
            });
            let lang = comm.getUrlKey('lang', window.location.href);
            if (lang) {
                this.lang(lang);
            }else{
                this.loc_lg=i18n.locale;
            }
            let _hef = window.location.href;
            let code = comm.getUrlKey('invite_code',_hef);
            const reg = /^(T)?[0-9a-zA-Z]{33}$/;
            if (reg.test(code)) {
                this.trxAmount = '';
                this.recode = code;
            }
        }, filters: {
            oStatus(st) {
                return st==-1? i18n.t('message.oFail') : i18n.t('message.oStatus')[st];
            },
            formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
                if (!date) return '---';
                if (typeof (date) === 'number') {
                    date = new Date(date * 1000)
                }
                var o = {
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S": date.getMilliseconds()
                }
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
                return fmt
            }
        },
        watch: {
            'contract.circulation'() {
                if (!odometer) {
                    odometer = new Odometer({
                        el: this.$refs.odometer,
                        format: 'd,ddd,ddd',
                        theme: 'digital'
                    });
                }
                console.log(this.contract.circulation)
                odometer.update(parseInt(this.contract.circulation));
            }
        },
        methods: {
            questionsd(){
                this.get(this.urlApi+'/api/questions?lang='+this.loc_lg).then(res => {
                    if (res.code == 200) {
                        this.questions = res.data;
                    }
                });
            },
            homeList(){
                this.get(this.urlApi+'/api/home',{recode: this.recode}).then(res => {
                    if (res.code == 200) {
                        this.addressList = res.data.address;
                        this.selectDay = res.data.financials[0].cycle;
                        this.statusNum = res.data.financials[0].statusNum;
                        this.cirReturn = (res.data.financials[0].rate*100).toFixed(2);
                        this.financials = res.data.financials;
                        this.totalconten = res.data.total;
                        this.orders = res.data.orders;
                        if(res.data.personal){
                            this.personal = res.data.personal;  //个人数据
                        }
                        if(res.data.share_plan){
                            this.share_plan = res.data.share_plan;    // 九环分享计划
                        }
                        if(res.data.userFromSumGroups){
                            this.userFromSumGroups = res.data.userFromSumGroups;    //節點地址
                        }

                        if(this.financials[0].rechargeAddress !=null){
                            this.setQRtext(this.financials[0].rechargeAddress.address);
                            this.expiredate = this.financials[0].rechargeAddress.expire_date;
                        }

                    }
                });
            },
            toggle: function (item, newTeamA) {
                this.newTeamA.forEach((v) => {
                  if (item.endGame === v.endGame) {
                  } else {
                    v.choose = false;
                  }
                });
                if (this.types != 'share') {
                  item.choose = !item.choose;
                  this.$forceUpdate()
                }
              },
            signOut() {
                this.trxAmount = '';
                Cookies.remove('RTrx');
                Cookies.remove('RTrxToken');
                window.location.reload();
            },
            showTeams(i, title) {
                this.curTitle = title;
                this.tab = 'tissue';         
                this.get(this.urlApi+'/api/settlement/subUser?lv='+i).then(res => {
                    if (res.code == 200) {
                        this.curTeamlist = res.data;
                    } else {
                        this.notice(i18n.t('message.msg.' + res.msg));
                    }
                });
            },
            setQRtext(text) {
                console.log(text)
                    jQuery('#qrcode').empty();
                    this.qrcodeText = text;
                    jQuery('#qrcode').qrcode({
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: text
                    });
            },

            setQRtextS(text) {
                    if(text){
                        jQuery('#qrcode').empty();
                        this.qrcodeText = text.address;
                        jQuery('#qrcode').qrcode({
                            render: "canvas",
                            width: 200,
                            height: 200,
                            text: text.address
                        });
                    }

            },
            prizeLog(title, type = 2) {

                this.curTitle = title;
                this.param.type = type;
                this.acclogs();
                this.tab = 'hashOrder';
            },
            acclogs() {
                if (!this.isPost) return;
                this.isPost = false;
                let _this = this;
                this.get(this.urlApi+'/api/financial_order',{recode: this.recode}).then(res => {
                    this.isPost = true;
                    if (res.code == 200) {
                        _this.accList = res.data;
                    } else {
                        this.notice(i18n.t('message.msg.' + res.msg));
                    }
                });
            },
            lang(lg) {
                this.langShow=false;
                i18n.locale = lg;
                Cookies.set('lang', lg);
                this.loc_lg=lg;
                this.questionsd();

            },
            login() {
                var val = this.trxAmount;
                const reg = /^(T)?[0-9a-zA-Z]{33}$/;
                if (reg.test(val)) {
                    if (!this.isPost) return;
                    this.isPost = false;
                    this.post(this.urlApi+'/api/auth/login', {address: val, recode: this.recode}).then(res => {
                        // debugger;
                        this.isPost = true;
                        setTimeout(function() {
                            comm.isLoadOk=true
                        }, 800);
                        if (res.code == 200) {
                            Cookies.set('RTrxToken', res.data.access_token);
                            Cookies.set('RTrx', val);
                            this.trxAmount = '';
                            window.location.reload();
                        } else if (res.code == 400) {
                            this.notice(i18n.t('message.loginTip1'),'4caf50');
                        } else if (res.code == 401) {
                            this.notice(i18n.t('message.loginTip2'),'4caf50');
                        }
                    });
                } else {
                    this.notice(i18n.t('message.trcErrTip'));
                }
            },
            isLogin() {
                return Cookies.get('RTrxToken') ? true : false;
            },
            post(url, postData) {
                return new Promise((resolve, reject) => {
                    postData._tm = Date.now();
                    axios.post(url, postData, {
                        headers: {
                            'Authorization':Cookies.get('RTrxToken') ? 'Bearer '+Cookies.get('RTrxToken') : '',
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then(res => {
                        resolve(res.data);
                    }).catch(err => {
                        reject(err.data);
                    });
                });
            },
            get(url) {
                return new Promise((resolve, reject) => {
                    axios.get(url, {
                            headers: {
                                'Authorization':Cookies.get('RTrxToken') ? 'Bearer '+Cookies.get('RTrxToken') : '',
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then(function (res) {
                            resolve(res.data);
                        }).catch(function (error) {
                            reject(err.data);
                        });
                });
            },
            safe(val) {
                return this.tron.account ? (typeof (val) === 'number' ? parseFloat(val) : val) : '---';
            },
            notice(msg, color = '007eff', time = 3000) {
                return new Promise((resolve, reject) => {
                    let wrap = $('<div style="box-sizing:border-box; position:fixed; left:calc(50% - 160px); box-shadow:0 5px 25px rgba(0,0,0,0.2); width:320px; top:40px; background:#' + (color ? color : '007eff') + '; border-radius:10px; color:#fff; padding:20px 20px; text-transform:none; font:16px/1.2 Tahoma, sans-serif; cursor:pointer; z-index:999999; text-align:center;">' + msg + '</div>')
                        .on('click', () => {
                            wrap.remove();
                            resolve();
                        })
                        .appendTo('body');
                    if (time > 0) setTimeout(() => {
                        wrap.remove();
                    }, time);
                });
            },
            copyText(value) {
                let s = document.createElement('input');
                s.value = value;
                document.body.appendChild(s);
                if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
                    s.contentEditable = true;
                    s.readOnly = false;
                    let range = document.createRange();
                    range.selectNodeContents(s);
                    let sel = window.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(range);
                    s.setSelectionRange(0, 999999);
                }
                else s.select();
                try {
                    document.execCommand('copy');
                    this.notice('Copied!', '4caf50');
                }
                catch (err) {
                    this.notice('Copy error', 'e53935');
                }
                s.remove();
            }
        }
    });
})();