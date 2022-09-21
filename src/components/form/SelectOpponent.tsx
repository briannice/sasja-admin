import Popup from '@/components/Popup'
import { getHandballBelgiumClubs } from '@/services/hb/clubs'
import { OpponentModel } from '@/types/models'
import React, { ChangeEventHandler, useEffect, useState } from 'react'

type Props = {
  onChange: (opponent: OpponentModel) => void
  value: OpponentModel
}

export default function SelectOpponent({ onChange, value }: Props) {
  const [opponents, setOpponents] = useState<OpponentModel[]>([])
  const [selectedOpponents, setSelectedOpponents] = useState<OpponentModel[]>(opponents)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    getHandballBelgiumClubs().then((clubs) => setOpponents([...clubs]))
  }, [])

  const onChangeFilterHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const filter = e.target.value
    setSelectedOpponents(
      opponents.filter(
        (opponent) =>
          opponent.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
          opponent.short.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      )
    )
  }

  return (
    <div>
      <label htmlFor="opponent">Tegenstander</label>
      <button
        onClick={(e) => {
          e.preventDefault()
          setShowPopup(true)
        }}
        className="input form-select text-left"
      >
        {value.short}
      </button>
      <Popup open={showPopup} onClose={setShowPopup} className="w-[800px]">
        <p className="font-kanit">Tegenstander</p>
        <div className="mt-8">
          <input type="text" onChange={onChangeFilterHandler} />
        </div>
        <div className="mt-8 h-[400px] divide-y divide-light overflow-y-scroll">
          {selectedOpponents.map((opponent) => (
            <div
              key={opponent.id}
              onClick={() => {
                onChange(opponent)
                setShowPopup(false)
              }}
              className="cursor-pointer py-2 px-4 hover:bg-light"
            >
              <p>{opponent.name}</p>
            </div>
          ))}
        </div>
      </Popup>
    </div>
  )
}
