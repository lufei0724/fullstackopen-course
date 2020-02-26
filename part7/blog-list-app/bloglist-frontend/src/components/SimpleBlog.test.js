import React, { Component } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
let component
let likeClicked = 0

beforeEach(() => {
  const blog = {
    title: 'where should I go',
    author: 'Leonard Wookist',
    likes: 128
  }

  const onClick = () => {
    likeClicked++;
  }

  component = render(
    <SimpleBlog 
      blog={blog}
      onClick={onClick}
    />  
  )
})

test('Blog got correct title', () => {
  const div = component.container.querySelector('.blogContent')
  expect(div).toHaveTextContent('where should I go')
})

test('Blog shows author', () => {
  const div = component.container.querySelector('.blogContent')
  expect(div).toHaveTextContent('Leonard Wookist')
})

test('Blog shows correct likes', () => {
  const div = component.container.querySelector('.blogLikes')
  expect(div).toHaveTextContent('blog has 128 likes')
})

test('onClick funcion get fired every time when like button get clicked', () => {
  const button = component.container.querySelector('button')
  fireEvent.click(button) 
  fireEvent.click(button) 
  fireEvent.click(button) 

  expect(likeClicked).toEqual(3)
})

})