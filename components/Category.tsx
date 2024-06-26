import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Category = ({ text }: Props) => {
  return (
    <Link
      href={`/category/${slug(text)}`}
      className="text-sm font-medium uppercase rounded-lg text-primary-600 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Category
