const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blog = new Blog({
    title: 'YOU DONT KNOW JS',
    author: 'Kelly Belly ',
    url: 'www.KB24.com',
    likes: 1000,
  });
  await blog.save();

  await User.deleteMany({});
});

describe('blog list', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('returned correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(1);
  });

  test('the unique id property exists', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body[0].id).toBeDefined();
  });

  test('create new blog post successfully', async () => {
    const newBlog = {
      title: 'Full stack dev shit',
      author: 'Mascot Ben',
      url: 'www.MB01.com',
      likes: 2000,
    };
    await api.post('/api/blogs').send(newBlog).expect(201);
    const bloglist = await api.get('/api/blogs');
    expect(bloglist.body.length).toBe(2);
  });

  test('likes default is 0', async () => {
    const blogWithoutLikes = {
      title: 'How to hack there',
      author: 'Bill Gates',
      url: 'www.microsoft.com',
    };

    const createdBlog = await api
      .post('/api/blogs').send(blogWithoutLikes).expect(201);

    expect(createdBlog.body.likes).toBe(0);
  });

  test('correctly verify request data missig title', async () => {
    const blogWithoutTitle = {
      author: 'Bill Gates',
      url: 'www.microsoft.com',
    };

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400);
  });

  test('correctly verify request data missig url', async () => {
    const blogWithoutUrl = {
      title: 'How to use mongoose',
      author: 'Moley Gates',
    };

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400);
  });

  test('can delete a blog', async () => {
    const blogs = await api.get('/api/blogs');
    const blogToBeDeleted = blogs.body[0];
    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .expect(204);
  });

  test('correctly add a like to a blog', async () => {
    const blogs = await api.get('/api/blogs');
    const blogLiked = blogs.body[0];
    const blog = {
      ...blogLiked,
      likes: blogLiked.likes + 1,
    };
    const updatedBlog = await api
      .put(`/api/blogs/${blogLiked.id}`)
      .send(blog);

    expect(updatedBlog.body.likes).toBe(blogLiked.likes + 1);
  });
});

describe.only('Users', () => {
  test('are not created without username', async () => {
    const user = new User({
      name: 'Stephen Curry',
      password: 'bigthree',
    });

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(result.body.error).toBe('Username is required');
  });

  test('are not created if username is null', async () => {
    const user = new User({
      username: '',
      name: 'Stephen Curry',
      password: 'bigthree',
    });

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(result.body.error).toBe('Username is required');
  });

  test('are not created if username length less than 3 characters', async () => {
    const user = new User({
      username: 'ab',
      name: 'Stephen Curry',
      password: 'bigthree',
    });

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(result.body.error).toBe('Username must be at least 3 characters');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
