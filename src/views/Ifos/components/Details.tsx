import React from 'react'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import '../../../style/accordion.css'

const items = [
  {
    q: 'What’s the difference between a Basic Sale and Unlimited Sale?',
    a: 'In the Basic Sale, every user can commit a maximum of about 100 USD worth of RV2-BNB LP Tokens. We calculate the maximum LP amount about 30 minutes before each IFO. The Basic Sale has no participation fee.In the Unlimited Sale, there’s no limit to the amounts of RV2-BNB LP Tokens you can commit. However, there’s a fee for participation: see below.'
  },
  {
    q: 'Which sale should I commit? Can I do both?',
    a: 'You can choose one or both at the same time! If you’re only committing a small amount, we recommend the Basic Sale first.'
  },
  {
    q: 'How much is the participation fee?',
    a: 'There’s only a participation fee for the Unlimited Sale: there’s no fee for the Basic Sale.The fee will start at 1%.The 1% participation fee decreases in cliffs, based on the percentage of overflow from the “Unlimited” portion of the sale.'
  },
  {
    q: 'Where does the participation fee go?',
    a: 'We burn it. The RV2-BNB LP tokens from the participation fee will be decomposed. We will then use the BNB portion to market buy the RV2 equivalent, and finally throw all of the RV2 into the weekly token burn.'
  },

]

export default function Details() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center md:px-5 lg:px-20">
      
      <div className="w-full lg:w-1/2">
        <div className="bg-blurred px-5 h-14 flex items-center text-white font-bold text-xl rounded-tl-3xl rounded-tr-3xl">
          Details
        </div>
        <Accordion>
          {items.map(({ q,a}) => (
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>{q}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="text-white leading-7">
                  {a}
                </p>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
