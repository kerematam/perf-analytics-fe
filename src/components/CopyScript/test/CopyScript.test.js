import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import CopyScript from '../index'
import { AddUrl } from '../CopyScript'

const setup = setupProps => {
  const wrapper = renderer.create(<CopyScript {...setupProps} />).toJSON()

  return {
    wrapper,
  }
}

const generateData = () => {
  return { page: { url: 'asd' } }
}

describe('Chart component', () => {
  test('should match with snapshot', () => {
    const mockProps = generateData()
    const { wrapper } = setup(mockProps)

    expect(wrapper).toMatchSnapshot()
  })

  test('should render correctly', () => {
    render(<CopyScript {...generateData()} />)

    const [input] = document.getElementsByTagName('input')
    expect(input.value).toContain('asd')

    const [textarea] = document.getElementsByTagName('textarea')
    expect(textarea.value).toContain('Page URL')
  })
})

describe('AddUrl component', () => {
  const INVALID_URL = '::asd'
  const VALID_URL = 'http://localhost:3000/test.html'

  test('should handle error correctly', () => {
    render(<AddUrl url={INVALID_URL} />)

    const [input] = document.getElementsByTagName('input')
    const [button] = document.getElementsByTagName('button')
    fireEvent.click(button)
    const warningMsg = document.getElementById('outlined-basic-helper-text')
      .innerHTML

    expect(warningMsg).toContain('Please')
  })

  test('should not show error if input correct', () => {
    render(<AddUrl url={VALID_URL} />)
    const [button] = document.getElementsByTagName('button')
    fireEvent.click(button)
    const warningMsg = document.getElementById('outlined-basic-helper-text')
      ?.innerHTML

    expect(warningMsg).toBeFalsy()
  })
})
