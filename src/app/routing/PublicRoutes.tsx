import React from 'react'
import { RootState } from '../../setup'
import {Redirect, Route, Switch} from 'react-router-dom'
import {useSelector,shallowEqual,useDispatch} from 'react-redux'
import {AuthPage} from '../modules/auth'
import store from '../../setup/redux/Store';
import { PrivateRoutes } from './PrivateRoutes';
export function PublicRoutes() {
  const accessToken = useSelector<RootState>(({auth}) => auth.accessToken, shallowEqual)
  return (
    accessToken?  <PrivateRoutes />:
    <Switch>
     
      <Route path='/auth' component={AuthPage} />
      <Redirect to='/auth' />
      {/* <Route path='/auth' component={AuthPage} /> */}
    
    </Switch>
  )
}
