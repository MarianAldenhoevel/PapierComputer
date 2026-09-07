// Ein wiederverwendbares dekorierbares Panel-Element.
import type { ReactNode } from "react";

interface PanelProps {
    title: ReactNode;
    className?: string;
    children: ReactNode;
}

export function Panel({ title, className, children }: PanelProps) {
    return (
        <div className={["panel", className].filter(Boolean).join(" ")}>
        <div className="panel-heading">{title}</div>
        <div className="panel-body">{children}</div>
        </div>
    );
}