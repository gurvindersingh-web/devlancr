import './EmptyState.css';

/**
 * Reusable empty state component with premium Antigravity styling.
 *
 * @param {string} icon - Emoji or icon to display
 * @param {string} title - Heading text
 * @param {string} description - Supporting text
 * @param {Object} [action] - Optional CTA { label: string, onClick: function }
 */
export default function EmptyState({ icon = '📭', title, description, action }) {
    return (
        <div className="empty-state-component" role="status">
            <div className="empty-state__icon" aria-hidden="true">{icon}</div>
            <h3 className="empty-state__title">{title}</h3>
            {description && (
                <p className="empty-state__description">{description}</p>
            )}
            {action && (
                <button
                    className="empty-state__action"
                    onClick={action.onClick}
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
