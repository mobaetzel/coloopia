import * as React from 'react';
import { strings } from './strings';
import { Trash } from './icons/trash';
import { Clone } from './icons/clone';

export class ColorTile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFilled: false,
        };
    }

    onNameChange = (event) => {
        this.props.onNameChange(this.props.color, event.target.value);
    }

    onColorChange = (event) => {
        this.props.onColorChange(this.props.color, event.target.value);
    }

    onDuplicate = () => {
        this.props.onDuplicate(this.props.color);
    }

    onDelete = () => {
        this.props.onDelete(this.props.color);
    }

    toggleFill = () => {
        this.setState({
            isFilled: !this.state.isFilled,
        });
    };

    render() {
        const col = this.props.color;
        return (
            <div className="color-tile-container">
                <div
                    className={'color-tile' + (this.state.isFilled ? ' filled' : '')}
                    style={{ backgroundColor: '#' + col.color + '50' }}>

                    <div className="drag-handle"></div>
                    <div
                        className="color-hider"
                        onClick={this.toggleFill}>
                    </div>
                    <div
                        className="color"
                        style={{ backgroundColor: '#' + col.color }}>
                    </div>
                    <div className="color-name">
                        <label>
                            <span>{strings.colorName}</span>
                            <input
                                value={col.name}
                                onChange={this.onNameChange} />
                        </label>
                    </div>
                    <div className="color-value">
                        <label>
                            <span>{strings.colorValue}</span>
                            <input
                                size={6}
                                value={col.color}
                                onChange={this.onColorChange} />
                        </label>
                    </div>
                </div>
                <div className="color-controls">
                    <button data-tip={strings.deleteColor} onClick={this.onDelete} style={{ color: '#' + col.color }}>
                        <Trash></Trash>
                    </button>
                    <button data-tip={strings.duplicateColor} onClick={this.onDuplicate} style={{ color: '#' + col.color }}>
                        <Clone></Clone>
                    </button>
                </div>
            </div>
        );
    }
}