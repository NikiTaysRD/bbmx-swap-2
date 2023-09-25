import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Input as StyledInput, InputProps } from '@pancakeswap/uikit'

import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'

export interface DatePickerProps extends ReactDatePickerProps {
  inputProps?: InputProps
}

const Input = styled(StyledInput)`
  padding: 0 15px;
  font-size: 16px;
  font-weight: 400;
  line-height: 44px;
  color: #fff;
  background-color: transparent;
  background-clip: padding-box;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

const DatePicker: React.FC<React.PropsWithChildren<DatePickerProps>> = ({ inputProps = {}, ...props }) => {
  return (
    <ReactDatePicker customInput={<Input {...inputProps} />} portalId="reactDatePicker" dateFormat="PPP" {...props} />
  )
}

export default DatePicker
