import { setActiveTab, setPannelState } from '@/store/slices/navigationSlice'
import { NavTab } from '@/types/NavTab'

import { useAppDispatch, useAppSelector } from './reduxHooks'

export function useTabToggle() {
  const activeTab = useAppSelector((store) => store.navigation.activeTab)
  const dispatch = useAppDispatch()

  return (toggledTab: NavTab) => {
    if (activeTab === toggledTab) {
      dispatch(setActiveTab(''))
      dispatch(setPannelState(false))
    } else {
      dispatch(setActiveTab(toggledTab))
      dispatch(setPannelState(true))
    }
  }
}
