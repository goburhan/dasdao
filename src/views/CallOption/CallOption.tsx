import React, { useEffect, useCallback, useState } from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { Image, Text, Button, LinkExternal, Flex } from '@macist-m/robinia-uikit'
import Page from 'components/layout/Page'
import useBlock from 'hooks/useBlock'
import { usePriceCakeBusd } from 'state/hooks'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import FlexLayout from 'components/layout/Flex'

import { Address, QuoteToken } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import TokenInput from 'components/TokenInput'

import {
  getBusdAddress,
  getLockedSaleAddress,
  getRbsTokenAddress,
  getWbnbAddress,
} from 'utils/addressHelpers'
import { useBusd, useLockedSale, useRbs, useTokenContract } from 'hooks/useContract'
import Web3 from 'web3'
import UnlockButton from 'components/UnlockButton'
import Divider from 'views/Farms/components/Divider'
import ClaimButton from 'components/ExpandableSectionButton/ClaimButton'
import ClaimedButtons from './ClaimedButtons'

export interface FarmsProps {
  tokenMode?: boolean
}

export interface ExpandableSectionProps {
  isTokenOnly?: boolean
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
}

const CallOption: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const block = useBlock()
  const addressx = getLockedSaleAddress()
  const busdAddress = getBusdAddress()
  const lockedSale = useLockedSale(addressx)
  const cakePriceBusd = usePriceCakeBusd()
  const busdContract = useBusd()
  const lpContract = useTokenContract("0x329d2706647830bd41f2b932681e65ba397a3084")
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const [discountedPrice, setDiscountedPrice] = useState('') // fromweiden string dönüyor numbera çevirmedim bi matematik işlemi yapmayacağımız için
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const [veri, setVeri] = useState()
  const [claimsx, setClaimsx] = useState([])
  const [claimedOnly, setClaimedOnly] = useState(false)
  const [tokenamount, setAmount] = useState()
  const [contractbalance, setBalance] = useState()
  const [claimtime, setCtime] = useState()
  const [minpurchase, setMinp] = useState()
  const [contbalance, setContb] = useState()
  const [approve, setApprove] = useState()
  const [busdBalanc, setBusdBalance] = useState(new BigNumber(0))
  const [buytokken, setBuy] = useState({})
  const [pickasset, setContract] = useState()
  const [allow, setAllowance] = useState(0)
  const [inputAmount, setInputAmount] = useState('')
  const [discountPerchant, setdiscountPerchant] = useState(Number)
  const [lpPrice,setLpPrice]=useState("")

  const [buyTokenWBNB, setBuyTokenWBNB] = useState(false) // true ise wbnb ile alacak default busd.

  useEffect(() => {
    const getClaimList = async () => {
      if (account) {
        // account değerini kendi cüzdanımla değiştim bunu account olarak güncellemeliyiz.
        const userClaims = await lockedSale.methods
          .getUsersClaims(account)
          .call()
        setClaimsx(userClaims)
      } else {
        console.log('not logged in')
      }
    }

    const getAllowance = async () => {
      if (account) {
        const isAllowed = await lpContract.methods.allowance(account, addressx).call()
        setAllowance(isAllowed)
      } else {
        console.log('not Logged in')
      }
    }

    const getPrice = async () => {
      let price = await lockedSale.methods
        .getTokensOut(busdAddress, '1000000000000000000')
        .call()
      // ether görünümünü viewda yapalım daha sağlıklı olacaktır.
      price = Web3.utils.fromWei(price, 'ether')
      setDiscountedPrice(new BigNumber(price).toString())
    }
    const getLpPrice = async () => {
      let price = await lockedSale.methods
        .getLPPrice('0x329d2706647830bd41f2b932681e65ba397a3084')
        .call()
      // ether görünümünü viewda yapalım daha sağlıklı olacaktır.
      price = Web3.utils.fromWei(price, 'ether')
      setLpPrice(new BigNumber(price).toString())
    }

    const getRbsprice = async () => {
      let rbs = await lockedSale.methods
        .getAmountOut(busdAddress, '1000000000000000000')
        .call()
      rbs = Web3.utils.fromWei(rbs, 'ether')
      setAmount(rbs)
    }

    const getBalance = async () => {
      const cBalance = await lockedSale.methods.saleBP().call()
      setBalance(cBalance)
    }

    const getCtime = async () => {
      const time = await lockedSale.methods.claimTime().call()
      setCtime(time)
    }

    const getMpurch = async () => {
      const minP = await lockedSale.methods.minAmount().call()
      setMinp(minP)
    }

    const getContractBalance = async () => {
      const contractB = await lockedSale.methods.getContractBalance().call()
      setContb(contractB)
    }

    const getBusdBalance = async () => {
      const busdbalance = account
        ? await lpContract.methods.balanceOf(account).call()
        : 0
      setBusdBalance(new BigNumber(busdbalance))
    }
    const getDiscountPerchent = async () => {
      const discount = await lockedSale.methods.saleBP().call()
      setdiscountPerchant(discount / 100)
    }

    getBusdBalance()
    getAllowance()
    getContractBalance()
    getMpurch()
    getCtime()
    getBalance()
    getClaimList()
    getPrice()
    getRbsprice()
    getDiscountPerchent()
    getLpPrice()
  }, [account, lockedSale, addressx, busdContract, busdAddress,lpContract,lpPrice])

  const ClaimExpand = styled.div<{ expanded: boolean }>`
    overflow: hidden;
    height: ${(props) => (props.expanded ? 'fit-content' : '0px')};
    margin-bottom: 16px;
  `
  const claimTokens = async (index) => {
    console.log(account)
    await lockedSale.methods.claimTokens(index).send({ from: account })
  }

  const letAllowance = async () => {
    await lpContract.methods
      .approve(
        addressx,
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      )
      .send({ from: account })
  }

  const busdbnb = async (value) => {
    const busdBnbAddr = value
    return busdBnbAddr
  }

  const buyWithWBNB = async (amount) => {
    // amount wei cinsinden 18 haneli olmalı
    await lockedSale.methods
      .buyToken(amount, '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
      .send({ from: account })
  }

  const buyWithBUSD = async (amount) => {
    await lockedSale.methods
      .buyToken(amount, '0x329d2706647830bd41f2b932681e65ba397a3084')
      .send({ from: account })
  }
  function handleChange(e) {
    setInputAmount(e.target.value)
  }
  const handleSelectMax = useCallback(() => {
    const balance = getBalanceNumber(busdBalanc.times(lpPrice).div(discountedPrice), 18).toFixed(3)
    console.log(`balance:${balance}`)
    console.log(`discountedPrice:${discountedPrice}`)
    console.log(`contbalance:${Web3.utils.fromWei(contbalance)}`)
    if (parseInt(balance) > parseInt(Web3.utils.fromWei(contbalance))) {
      setInputAmount(getBalanceNumber(contbalance, 18).toFixed(3))
      return
    }
    setInputAmount(balance)
  }, [setInputAmount, busdBalanc, discountedPrice, contbalance,lpPrice])
  return (
    <Page>
      <div className="text-white text-center text-5xl  mb-12">Call Option</div>
      <Flex className="" justifyContent="center" alignItems="center" marginBottom={32}>
        <div className="   max-h-fit calloption">
          <Flex justifyContent="space-between" marginBottom={3}>
            <Flex
              className="coborder text-gray-300 "
              style={{ maxWidth: 273, minWidth: 273 }}
              alignItems="center"
              padding={2}
            >
              <img src="/images/dasdao1.png" alt="rv2" style={{ maxWidth: 30 }} />

              <div className="text-left mt-2">
                Call Option Amount
                <Text color='#fff' fontSize='18px' bold>
                {contbalance ? Web3.utils.fromWei(contbalance) : 0} DASDAO
                </Text>
              </div>
            </Flex>

            <Flex
            className="coborder text-gray-300 "
            style={{ maxWidth: 273, minWidth: 273 }}
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            >
              Call Option Price
              <div style={{lineHeight:1}} className="text-white text-xl">
                ${new BigNumber(discountedPrice).toFixed(4)}{' '}
              </div>
            </Flex>
          </Flex>

          <div className="grid grid-cols-1  text-white   mb-6 ">
            <div className="mb-4 text-center">Call Option(1,1)</div>
            <div className="grid grid-cols-5 text-center justify-items-start cog">
              <div style={{position:"relative",paddingRight:"40px", left:"17px"}} className="lg:ml-12 ">
                <img src="/images/farms/busd1.png" alt="rv2" style={{ maxWidth: 47 }} />
                {/* <img src="/images/farms/wbnb.png" alt="bnb" style={{ maxWidth: 30 ,position:"absolute",top:"18px",right:"16px"}} /> */}
              </div>

              <div className="mt-2">
                Mint
                <Divider />
               BUSD
              </div>
              <div className="mt-2">
                Price
                <Divider />$ {new BigNumber(cakePriceBusd).toFixed(3)}
              </div>
              <div className="mt-2">
                Discount
                <Divider />
                <div>{discountPerchant}%</div>
              </div>

              <div className="mt-2">
                Vesting Term
                <Divider />
                <div> {claimtime} Blocks (48 Hours)</div>
              </div>
            </div>
          </div>

          <TokenInput
            value={inputAmount}
            onSelectMax={handleSelectMax}
            onChange={(w) => handleChange(w)}
            max={
              busdBalanc && discountedPrice && busdBalanc.toNumber() > 0
                ? getBalanceNumber(busdBalanc.times(lpPrice).div(discountedPrice), 18).toFixed(3)
                : 0
            }
            symbol="DASDAO"
            defaultDesign={false}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              paddingTop: '8px',
            }}
          >
            {allow > 0 ? (
              <Button
                style={{ maxWidth: 300 }}
                type="submit"
                onClick={async () => buyWithBUSD(Web3.utils.toWei(inputAmount, 'ether'))}
              >
                Call option RV2
              </Button>
            ) : (
              <Button
                style={{ marginTop: 22, marginBottom: 28, minWidth: 592, maxWidth: 592, backgroundImage: "linear-gradient(176deg, #f5e4f4 -321%, #5459f9 7%, #d5f1e4 112%, #116cec 326%)"}}
                onClick={async () => letAllowance()}
              >
                Approve
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 mt-2 ">
            <div className="grid grid-cols-1 text-white gap-2 ">
              <div>Your Balance</div>
              <div>Max You Can Buy</div>
              <div>Minimum Purchase</div>
            </div>
            <div className="text-right grid grid-cols-1  text-white">
              <div>{getBalanceNumber(busdBalanc, 18).toFixed(3)} BUSD</div>
              <div>{contbalance ? Web3.utils.fromWei(contbalance) : 0} DAS</div>
              <div>{minpurchase ? Web3.utils.fromWei(minpurchase) : 0} USDT</div>
            </div>
          </div>
          <br />
        </div>
      </Flex>
      <ClaimedButtons claimedOnly={setClaimedOnly} setClaimedOnly={claimedOnly} />

      <Flex className="mb-10">
        <div className="grid grid-cols-1  overflow-auto sm:m-auto  max-h-56 claim-card">


          {claimsx.map((element, index) => (
            <>
              <Route exact path={`${path}`}>
                {element.amount > 0 ? (

                  <div className="grid grid-cols-3 gap-6 overflow-auto ml-12 mr-12 text-center  text-lg text-white">
                  <div className=" text-gray-200 text-lg">Claim Block </div>
                    <div className=" text-gray-200 text-lg ">Amount </div>
                    <div className="  text-gray-200  "> Claim </div>
                  <div className=" cborder text-center  text-lg text-white" >
                    <LinkExternal
                      className=" mr-10 "
                      href={`https://bscscan.com/block/countdown/${element.claimBlock}`}
                    >
                      <div className=" sm:ml-1 lg:ml-12 text-lg text-white">
                        {element.claimBlock}
                      </div>
                    </LinkExternal>

                  </div>
                  <div className="  cborder text-white">
                    {getBalanceNumber(element.amount, 18).toFixed(4)}{' '}
                  </div>

                  <Button
                  disabled={element.claimBlock > block}
                  style={{ maxWidth: 76, maxHeight: 25, marginLeft: 45 ,color:"white" , borderRadius:6 }}
                  onClick={async () => claimTokens(index)}
                >
                  Claim
                </Button>
                  </div>

                ) : (
                  null
                )}
              </Route>

              <Route exact path={`${path}/history`}>
                {element.amount > 0 ? (
                  null
                ) : (
                  <div className="grid grid-cols-3 gap-6  overflow-auto ml-14 mr-14 text-center  text-lg text-white">
                  <div className=" mr-4 text-gray-200 text-lg">Claim Block </div>
                    <div className=" text-gray-200 text-lg ">Amount </div>
                    <div className="text-gray-200  "> Claim </div>
                  <div className=" cborder text-center  text-lg text-white" >
                    <LinkExternal
                      className=" mr-10 "
                      href={`https://bscscan.com/block/countdown/${element.claimBlock}`}
                    >
                      <div className=" sm:ml-1 lg:ml-24 text-lg text-white">
                        {element.claimBlock}
                      </div>
                    </LinkExternal>

                  </div>
                  <div className="  cborder text-white">
                    {getBalanceNumber(element.amount, 18).toFixed(4)}{' '}
                  </div>
                  <div className="text-white  text-center    rounded-xl   ">
                  Claimed
                </div>
                  </div>
                )}

              </Route>

              <div hidden> Claim yapıldımı : {element.claimed}</div>

            </>
          ))}
        </div>

      </Flex>

    </Page>
  )
}

export default CallOption
