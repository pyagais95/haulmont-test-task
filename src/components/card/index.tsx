import React from 'react';
import './index.scss'

interface Props {
  name: string;
  date: string;
  patch: string;
  details: string;
}

const Card = (props: Props) => {
  const {name, date, details, patch} = props
  return (
    <div className="card">
      <img src={patch} alt="pic" className="card__picture"/>
      <div className="card__description">
        <div className="card__description__title">
          <div className="card__description__title__name">
            {name}
          </div>
          <div className="card__description__title__date">
            {date}
          </div>
        </div>
        <div className="card__description__details">
          {details}
        </div>

      </div>
    </div>
  )
}

export { Card }