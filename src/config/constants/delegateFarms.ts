import { DelegateNetwork, DelegateFarmConfig } from './types';

const DelegateFarms : DelegateFarmConfig[] = [
 {
     pid : 38, // pool id si
     tokenSymbol : 'STEEM POWER',
     delegateToken : DelegateNetwork.STEEM,
     isActive : true,
     lpSymbol : 'STEEM POWER',
     depositFee : 5,
     delegateAddress : 'robiniaswap',
     multiplier : '30x'
 }
];

export default DelegateFarms;
