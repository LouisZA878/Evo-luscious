
import Filter from "./Filter"
import Sidebar from "./Sidebar"
import Links from "./Links"
import Content from "./Content"

const page = () => {
  return (
    <div className="products">
      <Filter />
      <Sidebar>
        <Links />
      </Sidebar>
      <Content />



    </div>
  )
}

export default page