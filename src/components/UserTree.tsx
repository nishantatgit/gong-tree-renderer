import { useAppSelector } from '../store/hooks'
import UserNodeContainer from './UserNode/UserNodeContainer'

function UserTree() {
    const rootIds = useAppSelector((state) => state.hierarchy.rootIds)

    const rootNodeDepth = 1
    return (
        <ul className="user-tree" role="tree">
            {rootIds.map((userId) => (
                <UserNodeContainer
                    key={userId}
                    userId={userId}
                    depth={rootNodeDepth}
                />
            ))}
        </ul>
    )
}

export default UserTree
