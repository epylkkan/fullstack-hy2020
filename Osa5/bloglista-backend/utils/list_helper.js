const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, blog) => sum += blog.likes, 0)    
    return total
}


const favoriteBlog = (blogs) => {
    const reducer = (previous, current) => {
        return (previous.likes > current.likes) ? previous : current
    }
    return (blogs && blogs.length > 0) ? blogs.reduce(reducer) : null
}

const mostBlogs = (blogs) => {
    const collectionOfAuthors = []
    let mostBlogs = { author: '', blogs: 0 };
 
    blogs.forEach((blog) => {
       
        if (!collectionOfAuthors[blog.author]) {
            collectionOfAuthors[blog.author] = { author: blog.author, blogs: 0 }
       }
       
       collectionOfAuthors[blog.author].blogs += 1
       if (mostBlogs.blogs < collectionOfAuthors[blog.author].blogs) {
          mostBlogs = collectionOfAuthors[blog.author]
       }
    });
 
    return mostBlogs
 }

 const mostLikes = (blogs) => {
    const collectionOfAuthors = []
    let mostLikesBlog = { author: '', likes: 0 };
 
    blogs.forEach((blog) => {
       if (!collectionOfAuthors[blog.author]) {
        collectionOfAuthors[blog.author] = { author: blog.author, likes: 0 }
       }

       collectionOfAuthors[blog.author].likes += blog.likes
       if (mostLikesBlog.likes < collectionOfAuthors[blog.author].likes) {
          mostLikesBlog = collectionOfAuthors[blog.author]
       }
    });
 
    return mostLikesBlog
 }


module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    dummy
}