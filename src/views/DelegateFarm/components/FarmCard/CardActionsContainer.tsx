import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { Button, Flex, Text, Heading } from '@macist-m/robinia-uikit'
import { Farm } from 'state/types'
import { useFarmFromPid, useFarmFromSymbol, useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import TokenInput from 'components/TokenInput'
import Input from 'components/Input'
import { useApprove } from 'hooks/useApprove'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'
import { sendTransaction, toSteem, sendDelegate, getDelegateContract, fetchDelegateUserStaked } from '../../../../utils/steemUtils';
import { getDelegateContractAddress } from '../../../../utils/addressHelpers';

const Action = styled.div`
  padding-top: 16px;
`
export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
  delegateAddress? : string
  depositFee? : any
}


interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  ethereum?: provider
  account?: string
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, ethereum, account }) => {
  const TranslateString = useI18n()
  const [requestedDelegate, setRequestedDelegate] = useState(false)
  const [sync,setSync] = useState(false);
  const [staked,setStaked] = useState(0);
  const [harvest,setHarvest] = useState(0);
  const [delegateAmount, setDelegateAmount] = useState(0);
  const steem = (window as any).steem_keychain
  const earning = 0;
  const contract = useMemo(() => {
    return getDelegateContract(getDelegateContractAddress());
  },[])
  async function updateStaked() {
    if(account){
      try {
        const x = await contract.methods.userInfo(account).call();

        const val = x.amount / 1e18
        setStaked(val)
        } catch (ex) {
          console.error(ex)
        }
    }


  }

  async function updateHarvest() {
    if(account){
      try {
        const x = await contract.methods.pendingReward(account).call();
        const val = x / 1e18;
        setHarvest(val);
      } catch(ex) {
        console.error(ex)
      }
    }

  }
  useEffect(() => {
    updateStaked()
    updateHarvest()
  })


  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      try {
      setDelegateAmount(parseFloat(e.currentTarget.value))
      } catch (ex) {
        setDelegateAmount(0)
      }

    },
    [setDelegateAmount],
  )

  const delegate = async () => {
    try {
      setRequestedDelegate(true);
      const depositFee = 5;
      console.log('delegate')
      const steemVal = toSteem(depositFee);
      if(!steem && !account) {
        console.error("Wallet or steem key chain is not installed");
        return;
      }
      const delVal = toSteem(delegateAmount)
      if(delegateAmount === 0) {
        setRequestedDelegate(false)
        return;
      }
      const result:any = await sendTransaction(steemVal,farm.delegateAddress,account,steem);
      // const result:any = await sendDelegate('inven.cu02',2,farm.delegateAddress,steem);
      const message = result.message;
      const data = result.data;
      const success = result.success;

      if(success) {
        // delegate gönder
        console.log('delegation gönderimi')
        const username = result.data.username;

        console.log(`Delegation amount : ${delVal}`)
        const resultDelegate:any = await sendDelegate(username,delVal,farm.delegateAddress,steem);
        console.log('delegate result');
        console.log(resultDelegate);
        setRequestedDelegate(false)
      } else {
        console.error(message);
        setRequestedDelegate(false)
        // hata gönderilebilir
      }
      console.log(result)
      setRequestedDelegate(false)
    } catch (ex) {
      console.error(ex)
    }
  }

  const redirectSteemKeychain = () => {
    if((window as any).steem_keychain) {
      // refresh

    } else {
      window.open("https://chrome.google.com/webstore/detail/steem-keychain/lkcjlnjfpbikmcmbachjpdbijejflpcm")
    }
  }

  const renderApprovalOrStakeButton = () => (
      <Button mt="8px" fullWidth disabled={requestedDelegate} onClick={delegate}>
        {TranslateString(999, 'Stake Delegate')}
      </Button>
    )

  const renderButton = () => {
    if(!account) {
      return (
        <UnlockButton mt="8px" fullWidth />
      )
    }
    if(!steem) {
      return (
      <Button mt="8px" fullWidth onClick={redirectSteemKeychain}> Install Steem Keychain </Button>
      )

    }
      return (
        <Button mt="8px" fullWidth disabled={requestedDelegate} onClick={delegate}>
        {TranslateString(999, 'Stake Delegate')}
      </Button>
      )

  }

  return (
    <Action>
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
          RV2
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {TranslateString(999, 'Earned')}
        </Text>
      </Flex>
      <HarvestAction earning={harvest} account={account} />
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {farm.lpSymbol}
        </Text>

        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {TranslateString(999, 'Staked')}
        </Text>

      </Flex>
      <Flex mb="8px" justifyContent="space-between" alignItems="center">
            <Heading color='text-disabled'>{staked}</Heading>
      </Flex>

      <Input
        value={delegateAmount.toString()}
        onChange={handleChange}

      />
          <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {TranslateString(999, 'Keychain is required to use SP Delegate Farm.')}
        </Text>

      {renderButton()}

    </Action>
  )
}

export default CardActions
