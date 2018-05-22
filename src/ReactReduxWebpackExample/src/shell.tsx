import * as React from 'react';
export interface ShellProps {
    children?: React.ReactNode;
}

export class Shell extends React.Component<ShellProps, {}> {
    public render() {
		// Dummy shell
        return (this.props.children);
    }
}