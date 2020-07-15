import { useResource } from '../hooks/index'

const baseUrl = '/api/blogs'
const [blogs, blogService] = useResource('/api/blogs')

export default { blogs, blogService }