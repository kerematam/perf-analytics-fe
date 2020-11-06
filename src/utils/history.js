import { createBrowserHistory, createMemoryHistory } from 'history'
import { isTestEnv } from './helper'

const history = isTestEnv() ? createMemoryHistory() : createBrowserHistory()

export default history
