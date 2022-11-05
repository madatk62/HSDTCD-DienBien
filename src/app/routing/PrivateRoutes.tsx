import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {CONFIG} from '../../helpers/config'
import {ProfileWrapper} from '../pages/profile/ProfileWrapper'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import { AuthPage } from '../modules/auth'
import FileCategories from '../pages/categories/FileCategories'
export function PrivateRoutes() {

  return (
    <Suspense fallback={<FallbackView />}>
    
      <Switch>
        <MasterLayout>
          <Route path='/dashboard' component={DashboardWrapper} />
          <Route path='/profile' component={ProfileWrapper} />
          <Route path='/auth' component={AuthPage} />
          <Route path='/categories' component={FileCategories} />
          <Redirect from='/auth' to='/categories' />
          <Redirect exact from='/' to='/categories' />
          {/* <Redirect to='error/404' /> */}
          </MasterLayout>
      </Switch>
      
    </Suspense>
  )
}
