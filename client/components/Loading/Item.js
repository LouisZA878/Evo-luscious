import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Item = () => {
  return (
    <SkeletonTheme baseColor="#4b8b3b74" highlightColor="#92ca87a5">
    <ul className="items" >
        <li>
            <Skeleton height={ 175 }/>
        </li>
        <li>
            <table>
            <thead>
            <tr>
                <th colSpan="3">
                    <Skeleton />
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colSpan="3">
                    <Skeleton />
                </td>
            </tr>
            <tr>
                <td colSpan="3" >
                    <Skeleton />
                </td>
            </tr>
            </tbody>
            </table>
        </li>
        <li></li>
        <li></li>
    </ul>
    </SkeletonTheme>
  )
}

export default Item