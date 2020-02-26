const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => (
  blogs.length === 0 ? 0 : blogs
    .map((blog) => blog.likes)
    .reduce((sum, num) => sum + num)
);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 'No blog exists';
  }
  const blog = blogs.reduce((a, b) => (a.likes > b.likes ? a : b));
  const { title, author, likes } = blog;
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 'No blog exists';
  }

  const countBlog = (author) => blogs
    .filter((blog) => blog.author === author)
    .length;

  const authorBlogs = [];
  blogs.forEach((blog) => {
    if (!authorBlogs.some((a) => a.author === blog.author)) {
      authorBlogs.push(
        { author: blog.author, blogs: countBlog(blog.author) },
      );
    }
  });
  return authorBlogs.reduce((a, b) => (a.blogs > b.blogs ? a : b));
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 'No blog exists';
  }

  const countLikes = (author) => blogs
    .filter((blog) => blog.author === author)
    .map((blog) => blog.likes)
    .reduce((a, b) => a + b);

  const authorLikes = [];
  blogs.forEach((blog) => {
    if (!authorLikes.some((a) => a.author === blog.author)) {
      authorLikes.push(
        { author: blog.author, likes: countLikes(blog.author) },
      );
    }
  });
  return authorLikes.reduce((a, b) => (a.likes > b.likes ? a : b));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
