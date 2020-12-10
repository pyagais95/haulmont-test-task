import React from 'react';
import Select from 'react-select'
import './index.scss'

export interface Option {
  value: string;
  label: string
}
interface Props {
  options: Array<Option>;
  label: string;
  onChange: (e: any) => void
}

const SelectComponent = (props: Props) => {
  const {options, label, onChange} = props
  return (
    <div className="select-container">
      <div className="select-container__label">
        {label}
      </div>
      <Select options={options} onChange={onChange}/>
    </div>
  )
}


export {SelectComponent}