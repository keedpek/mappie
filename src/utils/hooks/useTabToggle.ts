import { NavTab } from '@/types/NavTab'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { setActiveTab, setPannelState } from '@/store/slices/navigationSlice'

export function useTabToggle() {
  const activeTab = useAppSelector((store) => store.navigation.activeTab)
  const dispatch = useAppDispatch()
  // много иф
  return (toggledTab: NavTab) => {
    if (activeTab === '') {
      dispatch(setActiveTab(toggledTab))
      dispatch(setPannelState(true))
    } else if (activeTab === toggledTab) {
      dispatch(setActiveTab(''))
      dispatch(setPannelState(false))
    } else {
      dispatch(setActiveTab(toggledTab))
    }
  }
}
