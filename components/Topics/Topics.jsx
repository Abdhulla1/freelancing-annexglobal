import React from 'react'

import DiscoverySessions from './DiscoverySessions/DiscoverySessions'
import Prospectus from '../AboutConference/Prospectus/Prospectus'
import ConferenceDetails from './ConferenceDetails/ConferenceDetails'
export default function Topics({conference}) {
  return (
  <>
  <ConferenceDetails conference={conference}/>
  <DiscoverySessions/>
  <Prospectus/>
  </>
  )
}
