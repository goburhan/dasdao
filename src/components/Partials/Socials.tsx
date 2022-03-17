import React from 'react'

const icons = [
  { name: 'gitbook',
    url:'https://blokfield.gitbook.io/robiniaswap-v2/'
   },
  { name: 'telegram' ,
    url:'https://t.me/officialrobinia'
  },
  { name: 'twit',
    url:'https://twitter.com/robiniaswap'
   },
  { name: 'discord',
    url:'https://discord.gg/yEFKUsEsaj'
 },
]

const Socials = () => {
  return (
    <div className="flex items-center justify-start">
      {icons.map((icon) => {
        return (
          <a href={icon.url} key={icon.name} target="_blank" rel="noreferrer" className=" h-12 w-12 flex justify-center items-center rounded-xl mr-2 hover:opacity-80 shadow-sm">
            <img src={`/images/${icon.name}.svg`} alt={icon.name} width="32px" style={{minWidth:32}}/>
          </a>
        )
      })}
    </div>
  )
}

export default Socials
