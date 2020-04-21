import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'

const blog = {
    title: 'blog title',
    author: 'blog author',
    likes: 9,
    url: 'https://www.blog.com'
}

describe('<Blog />', () => {
    let component
    const updateBlogMockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog
                blog={blog}
                updateBlog={updateBlogMockHandler}
            />
        )
    })



    test('show initially title + author but not url + likes', () => {

        const div1 = component.container.querySelector('.blogContentTopic')
        expect(div1).toHaveStyle('')

        const div2 = component.container.querySelector('.blogContentToView')
        expect(div2).toHaveStyle('display: none')
    })


    test('show initially title + author + url + likes after having clicked view', async () => {

        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)

        const div1 = component.container.querySelector('.blogContentTopic')
        expect(div1).toHaveStyle('')

        const div2 = component.container.querySelector('.blogContentToView')
        expect(div2).toHaveStyle('')

    })

    test('click like button twice', async () => {
        const viewButton = component.getByText('view')
        const likeButton = component.getByText('like')

        fireEvent.click(viewButton)
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(updateBlogMockHandler.mock.calls.length).toBe(2)

    })

})
