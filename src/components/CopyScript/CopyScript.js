import React, { useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import { FileCopy, AddBox as AddBoxIcon } from '@material-ui/icons'
import CircularProgress from '@material-ui/core/CircularProgress'
import { script, isValidUrl } from './CopyScript.helper.js'

import styles from './CopyScript.module.scss'

export const AddUrl = ({ onSubmit = () => {}, url: urlProp = '', loading }) => {
  const [url, setUrl] = useState('')
  const [isError, setIsError] = useState('')

  const handleChange = e => {
    setUrl(e.target.value)
    setIsError('')
  }

  const handleAddUrl = () => {
    const isValid = isValidUrl(url)

    if (isValid) {
      onSubmit(url)
      setIsError('')
    } else {
      setIsError('Please enter valid URL. Eg.: http://localhost:3000/test.html')
    }
  }

  useEffect(() => {
    setUrl(urlProp)
  }, [urlProp])

  const onError = !!isError ? ` ${styles.on_error}` : ''

  return (
    <div className={`${styles.add_url_container}${onError}`}>
      <TextField
        value={url}
        disabled={loading}
        onChange={handleChange}
        size="small"
        className={styles.input}
        id="outlined-basic"
        label="URL"
        variant="outlined"
        error={!!isError}
        helperText={isError}
      />
      <IconButton onClick={handleAddUrl}>
        {loading ? (
          <CircularProgress className={styles.button_icon} />
        ) : (
          <AddBoxIcon className={styles.button_icon} />
        )}
      </IconButton>
    </div>
  )
}

const CopyScript = ({ onSubmit, page = {}, loading }) => {
  const handleCopy = () => {
    const text = script(page.url, page._id)
    window.navigator.clipboard.writeText(text)
  }

  return (
    <div>
      <AddUrl url={page?.url} onSubmit={onSubmit} loading={loading} />
      <div className={styles.copy_block_container}>
        <IconButton onClick={handleCopy} className={styles.copy_icon}>
          <FileCopy />
        </IconButton>
        <TextField
          className={styles.copy_field}
          value={script(page.url, page._id)}
          id="outlined-multiline-static"
          label="Copy Block"
          multiline
          rows={10}
          variant="outlined"
        />
      </div>
    </div>
  )
}

export default CopyScript
