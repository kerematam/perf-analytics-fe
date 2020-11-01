import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Button } from '@material-ui/core/'
import {
  DoubleArrow as DoubleArrowIcon,
  Home as HomeIcon,
  Equalizer as StatsIcon,
} from '@material-ui/icons'
import history from 'utils/history'

import styles from './Header.module.scss'

const handleClickHomepage = () => {
  history.replace('/home')
}

const checkStatsPage = pathname => /^\/stats/.test(pathname)

export default function LayoutHeader() {
  const pathname = useSelector(state => state.router.location.pathname)
  const isStatsPage = checkStatsPage(pathname)

  return (
    <div className={styles.root}>
      <span className={styles.menu_item}>
        <Button
          onClick={handleClickHomepage}
          className={styles.menu_item_button}
        >
          <HomeIcon className={styles.menu_item_icon} fontSize="small" />
          <Typography className={styles.menu_item_text}>Home</Typography>
        </Button>
      </span>
      {isStatsPage && (
        <>
          <span className={styles.menu_item_delimiter}>
            <DoubleArrowIcon />
          </span>
          <span className={styles.menu_item}>
            <Button className={styles.menu_iten_button}>
              <StatsIcon className={styles.menu_item_icon} fontSize="small" />
              <Typography className={styles.menu_item_text}>Stats</Typography>
            </Button>
          </span>
        </>
      )}
    </div>
  )
}
