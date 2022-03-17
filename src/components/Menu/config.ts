import { MenuEntry } from '@macist-m/robinia-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://adoring-carson-7f5e7c.netlify.app/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://adoring-carson-7f5e7c.netlify.app/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
     items:[
       {
         label:"Farms",
         href: '/farms'
       },
        {
          label: 'Cake Farm',
          href: '/cakePools',
        },
        //  {
        //    label: 'SP Delegate',
        //    href: '/delegatefarm',
        //  },
     ]
  },

  {
    label: 'Auto Farm',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Call Option',
    icon: 'PoolIcon',
    href: '/calloption',
  },
  {
    label: 'Lockup',
    icon: 'PoolIcon',
    href: '/lockup',
  },
  //  {
  //    label: 'Call Option (1,1)',
  //    icon: 'NftIcon',
  //    href:'/calloption',
  // //  },
  // {
  //   label: 'IFO',
  //   icon: 'IfoIcon',
  //   href: '/ifo',
  // },

  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: '/nft',
  // },
  // {
  //    label: 'Info',
  //    icon: 'InfoIcon',
  //    items: [
  //      {
  //         label: 'Docs',
  //         href: 'https://blokfield.gitbook.io/robiniaswap-v2/',
  //      },
  //     {
  //     label: 'Audit',
  //     href: 'https://github.com/TechRate/Smart-Contract-Audits/blob/main/February/RobiniaSwapV2.pdf',
  //     },
  //     {
  //     label: 'Price Chart',
  //     href: 'https://poocoin.app/tokens/0x95d104b8a6d97820d7c169f1d02489c08958c89d',
  //     },
    
  //    ],
  //  },
    // {
    // label: 'Bridge',
    // icon: 'HandshakeIcon',
    // href:'https://bridge.robiniaswap.com/'
    // },

  //     {
  //       label: 'Github',
  //       href: 'https://github.com/goosedefi/',
  //     },
  //     {
  //       label: 'Docs',
  //       href: 'https://goosedefi.gitbook.io/goose-finance/',
  //     },
  //     {
  //       label: 'Blog',
  //       href: 'https://goosefinance.medium.com/',
  //     },
  //   ],
  // },
  // {
  //   label: 'Partnerships/IFO',
  //   icon: 'GooseIcon',
  //   href: 'https://docs.google.com/forms/d/e/1FAIpQLSe7ycrw8Dq4C5Vjc9WNlRtTxEhFDB1Ny6jlAByZ2Y6qBo7SKg/viewform?usp=sf_link',
  // },
  // {
  //   label: 'Audit by Hacken',
  //   icon: 'AuditIcon',
  //   href: 'https://www.goosedefi.com/files/hackenAudit.pdf',
  // },
  // {
  //   label: 'Audit by CertiK',
  //   icon: 'AuditIcon',
  //   href: 'https://certik.org/projects/goose-finance',
  // },
]

export default config
