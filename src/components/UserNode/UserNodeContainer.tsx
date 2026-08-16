import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { toggleNode } from "../../reducers/treeNodeExapnsionSlice"
import UserNode from "./UserNode"

function UserNodeContainer({
    userId,
    depth
}: {
    userId: number,
    depth: number
}) {
    const user = useAppSelector(
        (state) =>
            state.hierarchy.entities[userId],
    )

    const isExpanded = useAppSelector(
        (state) =>
            Boolean(
                state.expansion.expandedById[
                    userId
                ],
            ),
    )

    const dispatch = useAppDispatch()

    return (
        <UserNode
            user={user}
            isExpanded={isExpanded}
            onToggle={() =>
                dispatch(toggleNode(userId))
            }
            depth={depth}
        >
            {isExpanded &&
                user.children.length > 0 && (
                    <ul role="group">
                        {user.children.map(
                            (childId: number) => (
                                <UserNodeContainer
                                    key={childId}
                                    userId={childId}
                                    depth={depth + 1}
                                />
                            ),
                        )}
                    </ul>
                )}
        </UserNode>
    )
}

export default UserNodeContainer