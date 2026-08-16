import type { ReactNode } from "react";
import UserBadge  from "./UserBadge";
import { getUserFullName } from "../../utils/getUserFullName";
import type { User } from "../../types/user";

import { UNKNOWN_USER, UI } from "../../constants";
import "./UserNode.css";

interface UserNodeProps {
  user: User;
  depth: number;
  isExpanded: boolean;
  onToggle: (userId: number) => void;
  children?: ReactNode;
}

function UserNode({ user, depth, isExpanded, onToggle, children }: UserNodeProps) {
  const hasChildren = user.children.length > 0;

  const fullName = getUserFullName(user.firstName, user.lastName);

  return (
    <li
      className="tree-item"
      role="treeitem"
      aria-level={depth}
      aria-expanded={hasChildren ? isExpanded : undefined}
    >
      <div className="user-node">
        {hasChildren ? (
          <button
            className="expand-button"
            type="button"
            aria-label={
              isExpanded ? `Collapse ${fullName}` : `Expand ${fullName}`
            }
            onClick={() => onToggle(user.id)}
          >
            {isExpanded ? UI.MINUS_BTN_LABEL : UI.PLUS_BTN_LABEL}
          </button>
        ) : (
          <span className="expand-button-placeholder" aria-hidden="true" />
        )}

        <UserBadge
          photo={user.photo}
          firstName={user.firstName}
          lastName={user.lastName}
        />

        <span className="user-details">
          {fullName} {user.email || UNKNOWN_USER.email}
        </span>
      </div>

      {children}
    </li>
  );
}

export default UserNode;