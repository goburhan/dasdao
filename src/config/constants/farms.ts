import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
     {
       pid: 0,
       risk: 5,
       isTokenOnly:true,
       lpSymbol: 'RTT',
       lpAddresses: {
         97: '0xe11E40890D1BCb52d8275B1b2193F157928897e2',
         56: '0x225b15B276d4BF1CE68Ccd7F05690C645A468CE9',
       },
       tokenSymbol: 'RTT',
       tokenAddresses: {
         97: '0xF0ec4fF226066712db7A9Ab17b62DdD9D9a49aFb',
         56: '0x03bD7DD4ddbA57465DC0C68DE9092Ae227B7f82f',
       },
       quoteTokenSymbol: QuoteToken.BNB,
       quoteTokenAdresses: contracts.wbnb,
       isAutoVault:true
     },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'RTT-BNB LP',
    lpAddresses: {
      97: '0xe11E40890D1BCb52d8275B1b2193F157928897e2',
      56: '0x225b15B276d4BF1CE68Ccd7F05690C645A468CE9',
    },
    tokenSymbol: 'RTT',
    tokenAddresses: {
      97: '0xF0ec4fF226066712db7A9Ab17b62DdD9D9a49aFb',
      56: '0x03bD7DD4ddbA57465DC0C68DE9092Ae227B7f82f',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
    {
      pid: 3,
      risk: 5,
      isTokenOnly:true,
      lpSymbol: 'RTT Locked 7 day',
      lpAddresses: {
        97: '0xe11E40890D1BCb52d8275B1b2193F157928897e2',
        56: '0x225b15B276d4BF1CE68Ccd7F05690C645A468CE9',
      },
      tokenSymbol: 'RTT',
      tokenAddresses: {
        97: '0xF0ec4fF226066712db7A9Ab17b62DdD9D9a49aFb',
        56: '0x03bD7DD4ddbA57465DC0C68DE9092Ae227B7f82f',
      },
      clusterAddresses: {
        97: '0xCBda7e25aac367eb83DC52330E79fe9d635b91e6',
        56: '0xc31385BC855BC99e6F8097D45a2fd7e798Ac73DB',
      },
      quoteTokenSymbol: QuoteToken.BNB,
      quoteTokenAdresses: contracts.wbnb,
      isCluster:true,
    },
  //  {
  //    pid: 1,
  //    risk: 5,
  //    lpSymbol: 'RV2-BUSD LP',
  //    lpAddresses: {
  //      97: '',
  //      56: '0x04d90493378ee74e1c692412d47ecd62dab516c6',
  //    },
  //    tokenSymbol: 'RV2',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0x03bD7DD4ddbA57465DC0C68DE9092Ae227B7f82f',
  //    },
  //    quoteTokenSymbol: QuoteToken.BUSD,
  //    quoteTokenAdresses: contracts.busd,
  //  },
    {
    pid: 2,
    risk: 5,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0xe0e92035077c39594793e61802a350347c320cf2',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
    {
     pid: 5,
     risk: 5,
     lpSymbol: 'CAKE-BUSD LP',
     lpAddresses: {
       97: '',
       56: '0x804678fa97d91B974ec2af3c843270886528a9E6',
     },
     tokenSymbol: 'CAKE',
     tokenAddresses: {
       97: '',
       56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
     },
     quoteTokenSymbol: QuoteToken.BUSD,
     quoteTokenAdresses: contracts.busd,
   },
       {
      pid: 6,
      risk: 5,
      lpSymbol: 'CAKE-BNB LP',
      lpAddresses: {
        97: '',
        56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
      },
      tokenSymbol: 'CAKE',
      tokenAddresses: {
        97: '',
        56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      },
      quoteTokenSymbol: QuoteToken.BNB,
      quoteTokenAdresses: contracts.wbnb,
    },
     {
      pid: 7,
      risk: 5,
      isTokenOnly: true,
      lpSymbol: 'CAKE',
      lpAddresses: {
        97: '',
        56: '0x804678fa97d91B974ec2af3c843270886528a9E6',
      },
      tokenSymbol: 'CAKE',
      tokenAddresses: {
        97: '',
        56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      },
      quoteTokenSymbol: QuoteToken.BUSD,
      quoteTokenAdresses: contracts.busd,
    },
  //   {
  //    pid: 2,
  //    risk: 5,
  //    lpSymbol: 'BFD-BNB LP',
  //    lpAddresses: {
  //      97: '',
  //      56: '0x42c26eea50615e3f808754f46b69a3bb386fe846', // EGG-BUSD LP
  //    },
  //    tokenSymbol: 'BFD',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0x95f31E322E1Bee2F6DCB085A1DFe3d3081Aab653',
  //    },
  //    quoteTokenSymbol: QuoteToken.BNB,
  //    quoteTokenAdresses: contracts.wbnb,
  //  },
  //  {
  //    pid: 3,
  //    risk: 5,
  //    lpSymbol: 'RBS-BNB LP',
  //    lpAddresses: {
  //      97: '',
  //      56: '0x3374d4a7df0bfa44bcc5aa9a304b23c60ff33d84',
  //    },
  //    tokenSymbol: 'RBS',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0xAfAEEe58a58867c73245397C0F768FF041D32d70',
  //    },
  //    quoteTokenSymbol: QuoteToken.BNB,
  //    quoteTokenAdresses: contracts.wbnb,
  //  },
  //  {
  //   pid: 4,
  //   risk: 5,
  //   lpSymbol: 'RDF-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xe56b7ea7ff4cd07a1fd9fc042e69f893d193bf0f',
  //   },
  //   tokenSymbol: 'RDF',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xAA731bB4bCd8C4A69C8A86E67E50942EE243debb',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  //    {
  //    pid: 5,
  //    risk: 5,
  //    lpSymbol: 'BSTEEM-BNB LP',
  //    lpAddresses: {
  //      97: '',
  //      56: '0xa43857e02c94ee8323c2198ffe80fd590544b30a', // EGG-BUSD LP
  //    },
  //    tokenSymbol: 'BSTEEM',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0x382d36e85178f2d3fd84e336d4e1d442fce78e8e',
  //    },
  //    quoteTokenSymbol: QuoteToken.BNB,
  //    quoteTokenAdresses: contracts.wbnb,
  //  },
  //     {
  //    pid: 6,
  //    risk: 5,
  //    lpSymbol: 'BBLURT-BNB LP',
  //    lpAddresses: {
  //      97: '',
  //      56: '0x37ddd439f7fc42f2964e3b09c4853c03075db0c9',
  //    },
  //    tokenSymbol: 'BBLURT',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0xb0458283033e5a3f7867f409477f53754b667dcc',
  //    },
  //    quoteTokenSymbol: QuoteToken.BNB,
  //    quoteTokenAdresses: contracts.wbnb,
  //  },
  //  {
  //   pid: 7,
  //    risk: 5,
  //    lpSymbol: 'BATOLO-BNB LP',
  //    lpAddresses: {
  //      97: '',
  //      56: '0x69cd16563ebac608292fa9598d185e92d099a1a6',
  //    },
  //    tokenSymbol: 'BATOLO',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0xcAa6f0d4c4796F26852ea3985DBd27b6b830C674',
  //    },
  //    quoteTokenSymbol: QuoteToken.BNB,
  //    quoteTokenAdresses: contracts.wbnb,
  //  },
  //  {
  //    pid: 8,
  //    risk: 5,
  //    lpSymbol: 'BSEREY-BNB LP',
  //    lpAddresses: {
  //      97: '',
  //      56: '0xF9E47c3fB70F5364A536a393De6Ec0A48d026584',
  //    },
  //    tokenSymbol: 'BSEREY',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0x2b618835a1eefcbf41e33497451ca1f3aa62f2d8',
  //    },
  //    quoteTokenSymbol: QuoteToken.BNB,
  //    quoteTokenAdresses: contracts.wbnb,
  //  },
  //   {
  //    pid: 9,
  //    risk: 5,
  //    isTokenOnly: true,
  //    lpSymbol: 'RBS',
  //    lpAddresses: {
  //      97: '',
  //      56: '0xa2fa80da37170ed705cb0bd1f27558ccecd417c5',  // EGG-BUSD LP
  //    },
  //    tokenSymbol: 'RBS',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0xAfAEEe58a58867c73245397C0F768FF041D32d70',
  //    },
  //    quoteTokenSymbol: QuoteToken.BUSD,
  //    quoteTokenAdresses: contracts.busd,
  //  },
  //  {
  //   pid: 10,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'RDF',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xe56b7ea7ff4cd07a1fd9fc042e69f893d193bf0f',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'RDF',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xAA731bB4bCd8C4A69C8A86E67E50942EE243debb',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 11,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BFD',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x42c26eea50615e3f808754f46b69a3bb386fe846',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BFd',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x95f31e322e1bee2f6dcb085a1dfe3d3081aab653',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 12,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BSTEEM',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xa43857e02c94ee8323c2198ffe80fd590544b30a',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BSTEEM',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x382d36e85178f2d3fd84e336d4e1d442fce78e8e',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 13,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BBLURT',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x37ddd439f7fc42f2964e3b09c4853c03075db0c9',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BBLURT',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xb0458283033e5a3f7867f409477f53754b667dcc',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 14,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BATOLO',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x69Cd16563eBac608292FA9598D185e92d099a1a6',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BATOLO',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xcAa6f0d4c4796F26852ea3985DBd27b6b830C674',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 15,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BSEREY',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xF9E47c3fB70F5364A536a393De6Ec0A48d026584',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BSEREY',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x2b618835a1eefcbf41e33497451ca1f3aa62f2d8',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 16,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'WST',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x4e37c7ab77a9357ad5ba87a949dcadeb0af6cb6a',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'WST',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xaAdFf17d56d80312b392Ced903f3E8dBE5c3ece7',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 17,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BTCB',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xF45cd219aEF8618A92BAa7aD848364a158a24F33',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BTCB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 18,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'WBNB',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'WBNB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 19,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'ETH',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xd9a0d1f5e02de2403f68bb71a15f8847a854b494',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'ETH',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 20,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BUSD',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BUSD',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  //    {
  //    pid: 21,
  //    risk: 5,
  //    isTokenOnly: true,
  //    lpSymbol: 'CAKE',
  //    lpAddresses: {
  //      97: '',
  //      56: '0x804678fa97d91B974ec2af3c843270886528a9E6',
  //    },
  //    tokenSymbol: 'CAKE',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //    },
  //    quoteTokenSymbol: QuoteToken.BUSD,
  //    quoteTokenAdresses: contracts.busd,
  //  },
  //  {
  //    pid: 23,
  //    risk: 5,
  //    lpSymbol: 'BTCB-BNB LP',
  //    lpAddresses: {
  //      97: '',
  //      56: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082',
  //    },
  //    tokenSymbol: 'BTCB',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  //    },
  //    quoteTokenSymbol: QuoteToken.BNB,
  //    quoteTokenAdresses: contracts.wbnb,
  //  },
  //  {
  //   pid: 25,
  //   risk: 5,
  //   lpSymbol: 'BTCB-ETH LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xD171B26E4484402de70e3Ea256bE5A2630d7e88D',
  //   },
  //   tokenSymbol: 'BTCB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  //   },
  //   quoteTokenSymbol: QuoteToken.ETH,
  //   quoteTokenAdresses: contracts.eth,
  // },
  // {
  //   pid: 27,
  //   risk: 5,
  //   lpSymbol: 'BTCB-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xf45cd219aef8618a92baa7ad848364a158a24f33',
  //   },
  //   tokenSymbol: 'BTCB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 29,
  //   risk: 5,
  //   lpSymbol: 'ETH-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
  //   },
  //   tokenSymbol: 'ETH',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 32,
  //   risk: 5,
  //   lpSymbol: 'BNB-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
  //   },
  //   tokenSymbol: 'BNB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  //   {
  //   pid: 43,
  //   risk: 5,
  //   lpSymbol: 'USDC-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1',
  //   },
  //   tokenSymbol: 'USDC',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  //   stabilCoinFarm:true
  // },
  // {
  //   pid: 44,
  //   risk: 5,
  //   lpSymbol: 'USDC-USDT LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xec6557348085aa57c72514d67070dc863c0a5a8c',
  //   },
  //   tokenSymbol: 'USDC',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  //   stabilCoinFarm:true

  // },
  // // {
  // //   pid: 45,
  // //   risk: 5,
  // //   lpSymbol: 'DOGE-BNB LP',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0xac109c8025f272414fd9e2faa805a583708a017f',
  // //   },
  // //   tokenSymbol: 'DOGE',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BNB,
  // //   quoteTokenAdresses: contracts.wbnb,
  // // },
  //  {
  //    pid: 46,
  //    risk: 5,
  //    lpSymbol: 'CAKE-BNB LP',
  //    lpAddresses: {
  //      97: '',
  //      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
  //    },
  //    tokenSymbol: 'CAKE',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //    },
  //    quoteTokenSymbol: QuoteToken.BNB,
  //    quoteTokenAdresses: contracts.wbnb,
  //  },
  //  {
  //   pid: 47,
  //   risk: 5,
  //   lpSymbol: 'CAKE-USDT LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xA39Af17CE4a8eb807E076805Da1e2B8EA7D0755b',
  //   },
  //   tokenSymbol: 'CAKE',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   quoteTokenSymbol: QuoteToken.USDT,
  //   quoteTokenAdresses: contracts.usdt,
  // },
  // {
  //   pid: 48,
  //   risk: 5,
  //   lpSymbol: 'CAKE-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x804678fa97d91B974ec2af3c843270886528a9E6',
  //   },
  //   tokenSymbol: 'CAKE',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  //    {
  //    pid: 49,
  //    risk: 5,
  //    lpSymbol: 'steem',
  //    delegate:true,
  //    depositFee : "5",
  //    delegateAddress : 'robiniaswap',
  //    isTokenOnly:true,
  //    tokenSymbol : 'STEEM POWER',
  //    delegateToken : "STEEM",
  //    lpAddresses: {
  //      97: '',
  //      56: '0x04d90493378ee74e1c692412d47ecd62dab516c6',
  //    },
  //    tokenAddresses: {
  //      97: '',
  //      56: '0x95d104b8a6d97820d7c169f1d02489c08958c89d',
  //    },
  //    quoteTokenSymbol: QuoteToken.BUSD,
  //    quoteTokenAdresses: contracts.busd,
  //  }
  // {
  //   pid: 3,
  //   risk: 3,
  //   lpSymbol: 'BNB-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
  //   },
  //   tokenSymbol: 'BNB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 4,
  //   risk: 5,
  //   lpSymbol: 'CAKE-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',// EGG-BUSD LP
  //   },
  //   tokenSymbol: 'CAKE',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  //  {
  //    pid: 5,
  //    risk: 5,
  //    lpSymbol: 'CAKE-BUSD LP',
  //    lpAddresses: {
  //      97: '',
  //      56: '0x804678fa97d91B974ec2af3c843270886528a9E6', // EGG-BUSD LP
  //    },
  //    tokenSymbol: 'CAKE',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //    },
  //    quoteTokenSymbol: QuoteToken.BUSD,
  //    quoteTokenAdresses: contracts.busd,
  //  },
  //  {
  //   pid: 6,
  //   risk: 5,
  //   lpSymbol: 'BTCB-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xF45cd219aEF8618A92BAa7aD848364a158a24F33', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BTCB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 7,
  //   risk: 5,
  //   lpSymbol: 'BTCB-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082', //  LP adresi(stake edilecek token)
  //   },
  //   tokenSymbol: 'BTCB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c', // BTCB adresi
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB, // pool içerisindeki adres btcb-bnb lp için için bnb
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 8,
  //   risk: 5,
  //   lpSymbol: 'BTCB-ETH LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xD171B26E4484402de70e3Ea256bE5A2630d7e88D', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BTCB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  //   },
  //   quoteTokenSymbol: QuoteToken.ETH,
  //   quoteTokenAdresses: contracts.eth,
  // },
  // {
  //   pid: 9,
  //   risk: 5,
  //   lpSymbol: 'ETH-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'ETH',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },

  // {
  //   pid: 12,
  //   risk: 5,
  //   lpSymbol: 'USDT-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'USDT',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x55d398326f99059ff775485246999027b3197955',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  //   stabilCoinFarm:true,
  // },
  // {
  //   pid: 13,
  //   risk: 5,
  //   lpSymbol: 'TUSD-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x2E28b9B74D6d99D4697e913b82B41ef1CAC51c6C', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'TUSD',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x14016E85a25aeb13065688cAFB43044C2ef86784',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  //   stabilCoinFarm:true,
  // },
  // {
  //   pid: 14,
  //   risk: 5,
  //   lpSymbol: 'USDC-USDT LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xec6557348085aa57c72514d67070dc863c0a5a8c', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'USDC',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  //   },
  //   quoteTokenSymbol: QuoteToken.USDT,
  //   quoteTokenAdresses: contracts.usdt,
  //   stabilCoinFarm:true,
  // },
  // {
  //   pid: 15,
  //   risk: 5,
  //   lpSymbol: 'DOT-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'DOT',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 16,
  //   risk: 5,
  //   lpSymbol: 'LINK-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x824eb9faDFb377394430d2744fa7C42916DE3eCe', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'LINK',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 17,
  //   risk: 5,
  //   lpSymbol: 'ADA-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x28415ff2C35b65B9E5c7de82126b4015ab9d031F', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'ADA',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 18,
  //   risk: 5,
  //   lpSymbol: 'BSTEEM-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xa43857e02c94ee8323c2198ffe80fd590544b30a', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BSTEEM',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x382d36e85178f2d3fd84e336d4e1d442fce78e8e',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },

  // {
  //   pid: 20,
  //   risk: 5,
  //   lpSymbol: 'MOON-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x643D3f1C1fA1A7D5D6BDE50Bd3FDD1Cdd8A85692', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'MOON',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xE8c93310af068aa50bd7bF0ebFa459Df2a02ceba',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // // {
  // //   pid: 22,
  // //   risk: 5,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'RV2',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0xa2fa80da37170ed705cb0bd1f27558ccecd417c5',  // EGG-BUSD LP
  // //   },
  // //   tokenSymbol: 'RV2',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x95d104b8a6d97820d7c169f1d02489c08958c89d',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // //   isAutoVault:true,
  // // },
  // {
  //   pid: 42,
  //   risk: 5,
  //   lpSymbol: 'YNB-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x1a6eba3897fb4799fb6372f32771ee821370ab7e', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'YNB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xa05e01E9dF824CCAd284895Fff43B043e2133f50',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },

  // {
  //   pid: 22,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'RV2',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xa2fa80da37170ed705cb0bd1f27558ccecd417c5',  // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'RV2',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x95d104b8a6d97820d7c169f1d02489c08958c89d',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },


  //  {
  //   pid: 23,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'WBNB',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'WBNB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 24,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'CAKE',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x804678fa97d91B974ec2af3c843270886528a9E6', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'CAKE',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 25,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BTCB',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xF45cd219aEF8618A92BAa7aD848364a158a24F33', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BTCB',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 26,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'ETH',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xd9a0d1f5e02de2403f68bb71a15f8847a854b494', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'ETH',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 27,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BUSD',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BUSD',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 28,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'USDT',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'USDT',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x55d398326f99059ff775485246999027b3197955',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 29,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'DOT',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x54c1ec2f543966953f2f7564692606ea7d5a184e', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'DOT',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 30,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'RINI',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x5F188bEDe05D11b8d1474D6832b41d3EaE4ED98E', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'RINI',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x844b1b28b0fda8075ea8eb99c46339398ded1673',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // // {
  // //   pid: 31,
  // //   risk: 5,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'BSCT',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0xE920575CEcE01e5D9A7AB23d1a4FD15d8CF3Fe75', // EGG-BUSD LP
  // //   },
  // //   tokenSymbol: 'BSCT',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0xE920575CEcE01e5D9A7AB23d1a4FD15d8CF3Fe75',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BSCT,
  // //   quoteTokenAdresses: contracts.bsct,
  // // },
  // // {
  // //   pid: 32,
  // //   risk: 5,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'KRWP',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0xB9Dd513420D68Ac4CCf65cBcaA8cc7bd539713ca', // EGG-BUSD LP
  // //   },
  // //   tokenSymbol: 'KRWP',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0xB9Dd513420D68Ac4CCf65cBcaA8cc7bd539713ca',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.KRWP,
  // //   quoteTokenAdresses: contracts.krwp,
  // // },
  // {
  //   pid: 33,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'ADA',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x28415ff2C35b65B9E5c7de82126b4015ab9d031F', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'ADA',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 34,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BSTEEM',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xa43857e02c94ee8323c2198ffe80fd590544b30a', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BSTEEM',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x382d36e85178f2d3fd84e336d4e1d442fce78e8e',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  //  {
  //    pid: 35,
  //    risk: 5,
  //    isTokenOnly: true,
  //    lpSymbol: 'BBLURT',
  //    lpAddresses: {
  //      97: '',
  //      56: '0x37ddd439f7fc42f2964e3b09c4853c03075db0c9', // EGG-BUSD LP
  //    },
  //    tokenSymbol: 'BBLURT',
  //    tokenAddresses: {
  //      97: '',
  //      56: '0xb0458283033e5a3f7867f409477f53754b667dcc',
  //    },
  //    quoteTokenSymbol: QuoteToken.BNB,
  //    quoteTokenAdresses: contracts.wbnb,
  //  },
  // {
  //   pid: 36,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'MOON',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x643D3f1C1fA1A7D5D6BDE50Bd3FDD1Cdd8A85692', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'MOON',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xE8c93310af068aa50bd7bF0ebFa459Df2a02ceba',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 39,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BSEREY',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xF9E47c3fB70F5364A536a393De6Ec0A48d026584', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BSEREY',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x2b618835a1eefcbf41e33497451ca1f3aa62f2d8',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 40,
  //   risk: 5,
  //   lpSymbol: 'BSEREY-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xF9E47c3fB70F5364A536a393De6Ec0A48d026584', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BSEREY',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x2b618835a1eefcbf41e33497451ca1f3aa62f2d8',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 41,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BFD',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x42c26eea50615e3f808754f46b69a3bb386fe846', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BFD',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x95f31e322e1bee2f6dcb085a1dfe3d3081aab653',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 43,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'BATOLO',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x69cd16563ebac608292fa9598d185e92d099a1a6', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BATOLO',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xcAa6f0d4c4796F26852ea3985DBd27b6b830C674',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 44,
  //   risk: 5,
  //   lpSymbol: 'BATOLO-BNB',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x69Cd16563eBac608292FA9598D185e92d099a1a6', // EGG-BUSD LP
  //   },
  //   tokenSymbol: 'BATOLO',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xcAa6f0d4c4796F26852ea3985DBd27b6b830C674',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
  // {
  //   pid: 38,
  //   risk: 5,
  //   lpSymbol: 'steem',
  //   delegate:true,
  //   depositFee : "5",
  //   delegateAddress : 'robiniaswap',
  //   isTokenOnly:true,
  //   tokenSymbol : 'STEEM POWER',
  //   delegateToken : "STEEM",
  //   lpAddresses: {
  //     97: '',
  //     56: '0xa2fa80da37170ed705cb0bd1f27558ccecd417c5', // EGG-BUSD LP
  //   },
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x95d104b8a6d97820d7c169f1d02489c08958c89d',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // }
  // // {
  // //   pid: 7,
  // //   risk: 5,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'ETH',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', // EGG-BUSD LP
  // //   },
  // //   tokenSymbol: 'RV2',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.ETH,
  // //   quoteTokenAdresses: contracts.eth,
  // // },
  // // {
  // //   pid: 3,
  // //   risk: 1,
  // //   lpSymbol: 'USDT-BUSD LP',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0xc15fa3e22c912a276550f3e5fe3b0deb87b55acd',
  // //   },
  // //   tokenSymbol: 'USDT',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x55d398326f99059ff775485246999027b3197955',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 4,
  // //   risk: 2,
  // //   lpSymbol: 'BTCB-BNB LP',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x7561eee90e24f3b348e1087a005f78b4c8453524',
  // //   },
  // //   tokenSymbol: 'BTCB',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BNB,
  // //   quoteTokenAdresses: contracts.wbnb,
  // // },
  // // {
  // //   pid: 5,
  // //   risk: 2,
  // //   lpSymbol: 'ETH-BNB LP',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x70d8929d04b60af4fb9b58713ebcf18765ade422',
  // //   },
  // //   tokenSymbol: 'ETH',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BNB,
  // //   quoteTokenAdresses: contracts.wbnb,
  // // },
  // // {
  // //   pid: 6,
  // //   risk: 1,
  // //   lpSymbol: 'DAI-BUSD LP',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x3ab77e40340ab084c3e23be8e5a6f7afed9d41dc',
  // //   },
  // //   tokenSymbol: 'DAI',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 7,
  // //   risk: 1,
  // //   lpSymbol: 'USDC-BUSD LP',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x680dd100e4b394bda26a59dd5c119a391e747d18',
  // //   },
  // //   tokenSymbol: 'USDC',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 9,
  // //   risk: 3,
  // //   lpSymbol: 'DOT-BNB LP',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0xbcd62661a6b1ded703585d3af7d7649ef4dcdb5c',
  // //   },
  // //   tokenSymbol: 'DOT',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BNB,
  // //   quoteTokenAdresses: contracts.wbnb,
  // // },
  // // {
  // //   pid: 10,
  // //   risk: 4,
  // //   lpSymbol: 'CAKE-BUSD LP',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458',
  // //   },
  // //   tokenSymbol: 'CAKE',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 11,
  // //   risk: 4,
  // //   lpSymbol: 'CAKE-BNB LP',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6',
  // //   },
  // //   tokenSymbol: 'CAKE',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BNB,
  // //   quoteTokenAdresses: contracts.wbnb,
  // // },

  // // {
  // //   pid: 13,
  // //   risk: 1,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'BUSD',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019', // EGG-BUSD LP (BUSD-BUSD will ignore)
  // //   },
  // //   tokenSymbol: 'BUSD',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 14,
  // //   risk: 3,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'WBNB',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BNB-BUSD LP
  // //   },
  // //   tokenSymbol: 'WBNB',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 15,
  // //   risk: 1,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'USDT',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0xc15fa3e22c912a276550f3e5fe3b0deb87b55acd', // USDT-BUSD LP
  // //   },
  // //   tokenSymbol: 'USDT',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x55d398326f99059ff775485246999027b3197955',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 16,
  // //   risk: 2,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'BTCB',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0xb8875e207ee8096a929d543c9981c9586992eacb', // BTCB-BUSD LP
  // //   },
  // //   tokenSymbol: 'BTCB',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 17,
  // //   risk: 2,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'ETH',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0xd9a0d1f5e02de2403f68bb71a15f8847a854b494', // ETH-BUSD LP
  // //   },
  // //   tokenSymbol: 'ETH',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 18,
  // //   risk: 1,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'DAI',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x3ab77e40340ab084c3e23be8e5a6f7afed9d41dc', // DAI-BUSD LP
  // //   },
  // //   tokenSymbol: 'DAI',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 19,
  // //   risk: 1,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'USDC',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x680dd100e4b394bda26a59dd5c119a391e747d18', // USDC-BUSD LP
  // //   },
  // //   tokenSymbol: 'USDC',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 20,
  // //   risk: 3,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'DOT',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x54c1ec2f543966953f2f7564692606ea7d5a184e', // DOT-BUSD LP
  // //   },
  // //   tokenSymbol: 'DOT',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 21,
  // //   risk: 4,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'CAKE',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458', // CAKE-BUSD LP
  // //   },
  // //   tokenSymbol: 'CAKE',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 22,
  // //   risk: 3,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'BSCX',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0xa32a983a64ce21834221aa0ad1f1533907553136', // BSCX-BUSD LP
  // //   },
  // //   tokenSymbol: 'BSCX',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0x5ac52ee5b2a633895292ff6d8a89bb9190451587',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BUSD,
  // //   quoteTokenAdresses: contracts.busd,
  // // },
  // // {
  // //   pid: 23,
  // //   risk: 3,
  // //   isTokenOnly: true,
  // //   lpSymbol: 'AUTO',
  // //   lpAddresses: {
  // //     97: '',
  // //     56: '0x4d0228ebeb39f6d2f29ba528e2d15fc9121ead56', // AUTO-BNB LP
  // //   },
  // //   tokenSymbol: 'AUTO',
  // //   tokenAddresses: {
  // //     97: '',
  // //     56: '0xa184088a740c695e156f91f5cc086a06bb78b827',
  // //   },
  // //   quoteTokenSymbol: QuoteToken.BNB,
  // //   quoteTokenAdresses: contracts.wbnb,
  // // },
]

export default farms
