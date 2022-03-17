import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [

   {
     sousId : 9999,
     tokenName : 'CAKE',
     stakingTokenName : QuoteToken.CAKE,
     stakingTokenAddress : '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
     contractAddress : {
       97 : '',
       56 : '0x4167565cb36e2D6202A2FBB829F5A20cc019C2cF'
     },
     poolCategory : PoolCategory.CORE,
     projectLink : 'https://pancakeswap.finance/swap/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
     harvest : true,
     tokenPerBlock : '450',
     sortOrder : 1,
     isFinished : false,
     tokenDecimals : 18,
     nativeFarmId: 7,
     multiplier:4.5,
   },

//   {
//    sousId : 99991,
//    tokenName : 'BTCB-BNB',
//    stakingTokenName : QuoteToken.BTCBBNB,
//    stakingTokenAddress : '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082',
//    contractAddress : {
//      97 : '',
//      56 : '0x4330c8f5f4229C4c082A9165e152AC4277676Eb9'
//    },
//    poolCategory : PoolCategory.CORE,
//    projectLink : 'https:pancakeswap.finance',
//    harvest : true,
//    tokenPerBlock : '400', // multilier
//    sortOrder : 8,
//    isFinished : false,
//    tokenDecimals : 18,
//    isLp:true,
//    pancakePoolId:262,
//    nativeFarmId:23,
//    multiplier:4,
//  }
//  ,
//  {
//   sousId : 99992,
//   tokenName : 'BTCB-ETH',
//   stakingTokenName : QuoteToken.BTCBETH,
//   stakingTokenAddress : '0xD171B26E4484402de70e3Ea256bE5A2630d7e88D',
//   contractAddress : {
//     97 : '',
//     56 : '0xF57778775804514060ceeA0d01073a3093660279'
//   },
//   poolCategory : PoolCategory.CORE,
//   projectLink : 'https:pancakeswap.finance',
//   harvest : true,
//   tokenPerBlock : '400', // multilier
//   sortOrder : 8,
//   isFinished : false,
//   tokenDecimals : 18,
//   isLp:true,
//   pancakePoolId:408,
//   nativeFarmId:25,
//   multiplier:4,
// }
//    ,
//    {
//     sousId : 99993,
//     tokenName : 'BTCB-BUSD',
//     stakingTokenName : QuoteToken.BTCBBUSD,
//     stakingTokenAddress : '0xf45cd219aef8618a92baa7ad848364a158a24f33',
//     contractAddress : {
//       97 : '',
//       56 : '0x92e782497fc55Cf447E65d580dc35C516Fc53a02'
//     },
//     poolCategory : PoolCategory.CORE,
//     projectLink : 'https://pancakeswap.finance',
//     harvest : true,
//     tokenPerBlock : '400', // multilier
//     sortOrder : 7,
//     isFinished : false,
//     tokenDecimals : 18,
//     isLp:true,
//     pancakePoolId:365,
//     nativeFarmId:27,
//     multiplier:4,
//   }
//   ,
//   {
//    sousId : 99994,
//    tokenName : 'ETH-BNB',
//    stakingTokenName : QuoteToken.ETHBNB,
//    stakingTokenAddress : '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
//    contractAddress : {
//      97 : '',
//      56 : '0xd8f135c0F1586d7EeA0B2C607AB7bBdbABf8648F'
//    },
//    poolCategory : PoolCategory.CORE,
//    projectLink : 'https://pancakeswap.finance',
//    harvest : true,
//    tokenPerBlock : '500', // multilier
//    sortOrder : 7,
//    isFinished : false,
//    tokenDecimals : 18,
//    isLp:true,
//    pancakePoolId:261,
//    nativeFarmId:29,
//    multiplier:5,
//  }
//  ,
// {
//  sousId : 99995,
//  tokenName : 'USDC-BUSD',
//  stakingTokenName : QuoteToken.USDCBUSD,
//  stakingTokenAddress : '0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1',
//  contractAddress : {
//    97 : '',
//    56 : '0xa0e2861eB8c016d06371755d26eB9a7E23b80A01'
//  },
//  poolCategory : PoolCategory.CORE,
//  projectLink : 'https://pancakeswap.finance',
//  harvest : true,
//  tokenPerBlock : '300', // multilier
//  sortOrder : 7,
//  isFinished : false,
//  tokenDecimals : 18,
//  isLp:true,
//  pancakePoolId:283,
//  nativeFarmId:43,
//  multiplier:3,
// },
// {
//   sousId : 99996,
//   tokenName : 'USDT-BUSD',
//   stakingTokenName : QuoteToken.USDTBUSD,
//   stakingTokenAddress : '0x05faf555522Fa3F93959F86B41A3808666093210',
//   contractAddress : {
//     97 : '',
//     56 : '0x71BCBEF7484F06fD96a755EFE5438D40Cf4f9e44'
//   },
//   poolCategory : PoolCategory.CORE,
//   projectLink : 'https://pancakeswap.finance',
//   harvest : true,
//   tokenPerBlock : '300', // multilier
//   sortOrder : 7,
//   isFinished : false,
//   tokenDecimals : 18,
//   isLp:true,
//   pancakePoolId:258,
//   nativeFarmId:43,
//   multiplier:3,
//  },
//  {
//   sousId : 99997,
//   tokenName : 'USDC-USDT',
//   stakingTokenName : QuoteToken.USDCUSDT,
//   stakingTokenAddress : '0xec6557348085aa57c72514d67070dc863c0a5a8c',
//   contractAddress : {
//     97 : '',
//     56 : '0x9c4710bDd8D4C504d908e5723789677e74AD15FE'
//   },
//   poolCategory : PoolCategory.CORE,
//   projectLink : 'https://pancakeswap.finance',
//   harvest : true,
//   tokenPerBlock : '300', // multilier
//   sortOrder : 7,
//   isFinished : false,
//   tokenDecimals : 18,
//   isLp:true,
//   pancakePoolId:423,
//   nativeFarmId:44,
//   multiplier:3,
//  },
//  {
//   sousId : 99998,
//   tokenName : 'USDT-BNB',
//   stakingTokenName : QuoteToken.USDTBNB,
//   stakingTokenAddress : '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
//   contractAddress : {
//     97 : '',
//     56 : '0xc877A8C24828A32D02f5FD5dB9AE34e4c98EC68C'
//   },
//   poolCategory : PoolCategory.CORE,
//   projectLink : 'https://pancakeswap.finance',
//   harvest : true,
//   tokenPerBlock : '400', // multilier
//   sortOrder : 7,
//   isFinished : false,
//   tokenDecimals : 18,
//   isLp:true,
//   pancakePoolId:264,
//   nativeFarmId:23,
//   multiplier:4,
//  },
//  {
//   sousId : 99999,
//   tokenName : 'BUSD-BNB',
//   stakingTokenName : QuoteToken.BUSDBNB,
//   stakingTokenAddress : '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
//   contractAddress : {
//     97 : '',
//     56 : '0x3dd74627CA3417E41cc275B67c8F72585732b301'
//   },
//   poolCategory : PoolCategory.CORE,
//   projectLink : 'https://pancakeswap.finance',
//   harvest : true,
//   tokenPerBlock : '500', // multilier
//   sortOrder : 7,
//   isFinished : false,
//   tokenDecimals : 18,
//   isLp:true,
//   pancakePoolId:252,
//   nativeFarmId:32,
//   multiplier:5,
//  },
// //  {
// //   sousId : 999990,
// //   tokenName : 'DOGE-BNB',
// //   stakingTokenName : QuoteToken.DOGEBNB,
// //   stakingTokenAddress : '0xac109c8025f272414fd9e2faa805a583708a017f',
// //   contractAddress : {
// //     97 : '',
// //     56 : '0x11b2d313A4A2bC4532E6090dC91A2301553Cb892'
// //   },
// //   poolCategory : PoolCategory.CORE,
// //   projectLink : 'https://pancakeswap.finance',
// //   harvest : true,
// //   tokenPerBlock : '500', // multilier
// //   sortOrder : 7,
// //   isFinished : false,
// //   tokenDecimals : 18,
// //   isLp:true,
// //   pancakePoolId:276,
// //   nativeFarmId:45,
// //   multiplier:5,
// //  },
  {
   sousId : 999991,
   tokenName : 'CAKE-BNB',
   stakingTokenName : QuoteToken.CAKEBNB,
   stakingTokenAddress : '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
   contractAddress : {
     97 : '',
     56 : '0x42ffBF3F27731853244D1e2D217a8dEd23d53575'
   },
   poolCategory : PoolCategory.CORE,
   projectLink : 'https:pancakeswap.finance',
   harvest : true,
   tokenPerBlock : '450', // multilier
   sortOrder : 7,
   isFinished : false,
   tokenDecimals : 18,
   isLp:true,
   pancakePoolId:251,
   nativeFarmId:6,
   multiplier:4.5,
  },
//  {
//   sousId : 999992,
//   tokenName : 'CAKE-USDT',
//   stakingTokenName : QuoteToken.CAKEUSDT,
//   stakingTokenAddress : '0xA39Af17CE4a8eb807E076805Da1e2B8EA7D0755b',
//   contractAddress : {
//     97 : '',
//     56 : '0xC16bA4284ee50b97b44Fe3F3173a77a2a28dce4c'
//   },
//   poolCategory : PoolCategory.CORE,
//   projectLink : 'https://pancakeswap.finance',
//   harvest : true,
//   tokenPerBlock : '600', // multilier
//   sortOrder : 7,
//   isFinished : false,
//   tokenDecimals : 18,
//   isLp:true,
//   pancakePoolId:422,
//   nativeFarmId:47,
//   multiplier:6,
//  },
//  {
//   sousId : 999993,
//   tokenName : 'CAKE-BUSD',
//   stakingTokenName : QuoteToken.CAKEBUSD,
//   stakingTokenAddress : '0x804678fa97d91B974ec2af3c843270886528a9E6',
//   contractAddress : {
//     97 : '',
//     56 : '0x867E3D81Ea272021f5A8e0C15E55F50C72ced611'
//   },
//   poolCategory : PoolCategory.CORE,
//   projectLink : 'https://pancakeswap.finance',
//   harvest : true,
//   tokenPerBlock : '600', // multilier
//   sortOrder : 7,
//   isFinished : false,
//   tokenDecimals : 18,
//   isLp:true,
//   pancakePoolId:389,
//   nativeFarmId:48,
//   multiplier:6,
//  },
//  {
//    sousId : 99991,
//    tokenName : 'USDT-BUSD',
//    stakingTokenName : QuoteToken.BUSDUSDT,
//    stakingTokenAddress : '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
//    contractAddress : {
//      97 : '',
//      56 : '0xfAB718fE6EC9cD26253dcF582e60351B3c059FC8'
//    },
//    poolCategory : PoolCategory.CORE,
//    projectLink : 'https://pancakeswap.finance',
//    harvest : true,
//    tokenPerBlock : '500', // multilier
//    sortOrder : 2,
//    isFinished : false,
//    tokenDecimals : 18,
//    isLp:true,
//    pancakePoolId:258,
//    nativeFarmId:33,
//    multiplier:5,
//  }
//  {
//   sousId : 99997,
//   tokenName : 'ETH-USDC',
//   stakingTokenName : QuoteToken.ETHUSDC,
//   stakingTokenAddress : '0xEa26B78255Df2bBC31C1eBf60010D78670185bD0',
//   contractAddress : {
//     97 : '',
//     56 : '0xbcba67FCD19f85B0Ae0D4f989A387C1CE4eC4b66'
//   },
//   poolCategory : PoolCategory.CORE,
//   projectLink : 'https://pancakeswap.finance',
//   harvest : true,
//   tokenPerBlock : '400', // multilier
//   sortOrder : 7,
//   isFinished : false,
//   tokenDecimals : 18,
//   isLp:true,
//   pancakePoolId:261,
//   nativeFarmId:31,
//   multiplier:4,
// }
//    {
//      sousId : 99991,
//      tokenName : 'USDT-BUSD',
//      stakingTokenName : QuoteToken.BUSDUSDT,
//      stakingTokenAddress : '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00',
//      contractAddress : {
//        97 : '',
//        56 : '0xfAB718fE6EC9cD26253dcF582e60351B3c059FC8'
//      },
//      poolCategory : PoolCategory.CORE,
//      projectLink : 'https://pancakeswap.finance',
//      harvest : true,
//      tokenPerBlock : '500', // multilier
//      sortOrder : 2,
//      isFinished : false,
//      tokenDecimals : 18,
//      isLp:true,
//      pancakePoolId:258,
//      nativeFarmId:12,
//      multiplier:5,
//    }
//    ,
//    {
//      sousId : 99992,
//      tokenName : 'CAKE-BNB',
//      stakingTokenName : QuoteToken.CAKEBNB,
//      stakingTokenAddress : '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
//      contractAddress : {
//        97 : '',
//        56 : '0xD2b04E88fACb428A6b783c76672Ee172E8dAA881'
//      },
//      poolCategory : PoolCategory.CORE,
//      projectLink : 'https://pancakeswap.finance',
//      harvest : true,
//      tokenPerBlock : '500', // multilier
//      sortOrder : 3,
//      isFinished : false,
//      tokenDecimals : 18,
//      isLp:true,
//      pancakePoolId:251,
//      nativeFarmId:4,
//      multiplier:5,
//    }
//    ,
//    {
//      sousId : 99993,
//      tokenName : 'BUSD-BNB',
//      stakingTokenName : QuoteToken.BUSDBNB,
//      stakingTokenAddress : '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
//      contractAddress : {
//        97 : '',
//        56 : '0xD34ad2b2f9DD0e57c30B3dF814ee37d5a7aDf6f1'
//      },
//      poolCategory : PoolCategory.CORE,
//      projectLink : 'https://pancakeswap.finance',
//      harvest : true,
//      tokenPerBlock : '800', // multilier
//      sortOrder : 4,
//      isFinished : false,
//      tokenDecimals : 18,
//      isLp:true,
//      pancakePoolId:252,
//      nativeFarmId:3,
//      multiplier:8,
//    }
//    ,
//    {
//      sousId : 99994,
//      tokenName : 'CAKE-USDT',
//      stakingTokenName : QuoteToken.CAKEUSDT,
//      stakingTokenAddress : '0xA39Af17CE4a8eb807E076805Da1e2B8EA7D0755b',
//      contractAddress : {
//        97 : '',
//        56 : '0x593dC46C30Be82C600f93355A5c818cc7786E030'
//      },
//      poolCategory : PoolCategory.CORE,
//      projectLink : 'https://pancakeswap.finance',
//      harvest : true,
//      tokenPerBlock : '400', // multilier
//      sortOrder : 5,
//      isFinished : false,
//      tokenDecimals : 18,
//      isLp:true,
//      pancakePoolId:422,
//      nativeFarmId:5,
//      multiplier:4,
//    }
//    ,
//    {
//     sousId : 99995,
//     tokenName : 'CAKE-BUSD',
//     stakingTokenName : QuoteToken.CAKEBUSD,
//     stakingTokenAddress : '0x804678fa97d91B974ec2af3c843270886528a9E6',
//     contractAddress : {
//       97 : '',
//       56 : '0x2C2686A9988d4cc9D94c12a5B24248652703d142'
//     },
//     poolCategory : PoolCategory.CORE,
//     projectLink : 'https://pancakeswap.finance',
//     harvest : true,
//     tokenPerBlock : '400', // multilier
//     sortOrder : 6,
//     isFinished : false,
//     tokenDecimals : 18,
//     isLp:true,
//     pancakePoolId:389,
//     nativeFarmId:5,
//     multiplier:4,
//   }
//   ,
//   {
//    sousId : 99996,
//    tokenName : 'BTCB-BUSD',
//    stakingTokenName : QuoteToken.BTCBBUSD,
//    stakingTokenAddress : '0xf45cd219aef8618a92baa7ad848364a158a24f33',
//    contractAddress : {
//      97 : '',
//      56 : '0xbcba67FCD19f85B0Ae0D4f989A387C1CE4eC4b66'
//    },
//    poolCategory : PoolCategory.CORE,
//    projectLink : 'https://pancakeswap.finance',
//    harvest : true,
//    tokenPerBlock : '300', // multilier
//    sortOrder : 7,
//    isFinished : false,
//    tokenDecimals : 18,
//    isLp:true,
//    pancakePoolId:365,
//    nativeFarmId:6,
//    multiplier:3,
//  }
//  ,
//  {
//   sousId : 99997,
//   tokenName : 'USDT-BNB',
//   stakingTokenName : QuoteToken.USDTBNB,
//   stakingTokenAddress : '0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE',
//   contractAddress : {
//     97 : '',
//     56 : '0xC5992a2a8Ab700af58aa6FD873c2B0e8E4b97632'
//   },
//   poolCategory : PoolCategory.CORE,
//   projectLink : 'https://pancakeswap.finance',
//   harvest : true,
//   tokenPerBlock : '400', // multilier
//   sortOrder : 8,
//   isFinished : false,
//   tokenDecimals : 18,
//   isLp:true,
//   pancakePoolId:264,
//   nativeFarmId:3,
//   multiplier:4,
// }
// ,
// {
//  sousId : 99998,
//  tokenName : 'BTCB-BNB',
//  stakingTokenName : QuoteToken.BTCBBNB,
//  stakingTokenAddress : '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082',
//  contractAddress : {
//    97 : '',
//    56 : '0x845F3F7A5DAc31F0f1A06077DFF56f389b9Feb38'
//  },
//  poolCategory : PoolCategory.CORE,
//  projectLink : 'https://pancakeswap.finance',
//  harvest : true,
//  tokenPerBlock : '200', // multilier
//  sortOrder : 9,
//  isFinished : false,
//  tokenDecimals : 18,
//  isLp:true,
//  pancakePoolId:262,
//  nativeFarmId:7,
//  multiplier:2,
// }
]

export default pools
