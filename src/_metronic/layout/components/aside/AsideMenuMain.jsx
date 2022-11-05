/* eslint-disable react/jsx-no-target-blank */
import { KTSVG } from '../../../helpers'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { CONFIG } from '../../../../helpers/config'

export const AsideMenuMain = () => {
  const accessToken = useSelector((state) => state.global.accessToken)

  const [data, setData] = useState([])

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/general/gen032.svg'
        title='Dashboard'
      />
      <AsideMenuItem
        to='/quan-tri'
        icon='/media/icons/duotune/general/gen049.svg'
        title='Quản trị'
      />
    </>
  )
}
