describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        
        const user = {
            name: 'Test User 2',
            username: 'test2',
            password: 'secret'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3002')
        
    })

    
    it('Login form is shown', function() {
        cy.contains('log in to application')
    })
    
    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('test2')
            cy.get('#password').type('secret')
            cy.get('#login-button').click()

            cy.contains('Test User 2 logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('test2')
            cy.get('#password').type('jeeee')
            cy.get('#login-button').click(

            )

            cy.get('.error')
            .should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')             
        })
    })


    describe('When logged in', function() {
  
        beforeEach(function() {
           cy.login({ username: 'test2', password: 'secret' })         
           cy.visit('http://localhost:3002')            
        })
    

        it('A blog can be created', function() {
  
            cy.contains('Test User 2 logged in')
        
            cy.contains('create new blog').click()
            cy.get('#titleInput').type('New blog title')
            cy.get('#authorInput').type('New author')
            cy.get('#urlInput').type('https://newblog.com')
            cy.get('#createBlog').click()

            cy.contains('New blog title - New author')                 

        })


        it('Like a blog', function() {

            const blog = {
                url: 'http://localhost:3001/api/blogs',
                method: 'POST',
                body: { title: 'New blog title', author: 'New author', url: 'https://newblog.com' },
                headers: {
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
                }
            }
            cy.contains('create new blog').click()
            cy.get('#titleInput').type('New blog title')
            cy.get('#authorInput').type('New author')
            cy.get('#urlInput').type('https://newblog.com')
            cy.get('#createBlog').click()
            cy.visit('http://localhost:3002')


            // cy.createBlog(blog)
            cy.contains('New blog title')

            cy.contains('view').click()
            cy.contains('likes 0')            

            cy.contains('like').click()
            cy.contains('likes 1')            
        })


            
        it('Remove a blog', function() {

            const blog = {
                url: 'http://localhost:3001/api/blogs',
                method: 'POST',
                body: { title: 'New blog title', author: 'New author', url: 'https://newblog.com' },
                headers: {
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
                }
            }
 
            cy.contains('create new blog').click()
            cy.get('#titleInput').type('New blog title')
            cy.get('#authorInput').type('New author')
            cy.get('#urlInput').type('https://newblog.com')
            cy.get('#createBlog').click()
            cy.visit('http://localhost:3002')

            cy.contains('view').click()
            cy.contains('blog title')

            cy.contains('remove').click()
            cy.contains('blog removed')
            cy.get('html').should('not.contain', 'blog title')

        })
        


        it('Ordered by likes', function() {

            const blogThree = {
                url: 'http://localhost:3001/api/blogs',
                method: 'POST',
                body: { title: 'New blog title 3', author: 'New author 3', url: 'https://newblog.com', likes : 3 },
                headers: {
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
                }
            }
            cy.request(blogThree)
     
            const blogOne = {
                url: 'http://localhost:3001/api/blogs',
                method: 'POST',
                body: { title: 'New blog title 1', author: 'New author 1', url: 'https://newblog.com', likes : 1 },
                headers: {
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
                }
            }
            cy.request(blogOne)


            const blogTwo = {
                url: 'http://localhost:3001/api/blogs',
                method: 'POST',
                body: { title: 'New blog title 2', author: 'New author 2', url: 'https://newblog.com', likes : 2 },
                headers: {
                    'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
                }
            }
            cy.request(blogTwo)
       

            cy.visit('http://localhost:3002')
            
            cy.get('.blogContentTopic').then( topics  => {                        
                cy.wrap(topics[0]).contains(blogThree.body.title)                                
                cy.wrap(topics[1]).contains(blogTwo.body.title)
                cy.wrap(topics[2]).contains(blogOne.body.title)                
            })        

        })    
        

    })
