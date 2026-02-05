import React from "react";
import { CommentBadge } from "../../types/socialWall";

export default function BadgeStore({ badges, onSelect }: { badges: CommentBadge[]; onSelect: (badge: CommentBadge) => void }) {
  return (
    <div className="badge-store">
      <h3>Insignias</h3>
      <ul>
        {badges.map((badge) => (
          <li key={badge.id} onClick={() => onSelect(badge)}>
            <span style={{ color: badge.visualTheme.textColor, backgroundColor: badge.visualTheme.backgroundColor }}>
              {badge.name}
            </span>
            <p>Precio: {badge.priceUsd} USD</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
