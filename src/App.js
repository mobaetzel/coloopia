import * as React from 'react';
import './app.css';
import { addNewColor, duplicateColor, loadColors, removeColor, updateHash } from './logic';
import { strings } from './strings';
import ReactTooltip from 'react-tooltip';
import copy from 'copy-to-clipboard';

import { Share } from './icons/share';
import { Plus } from './icons/plus';
import { ColorTile } from './color-tile';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colors: [],
        };
    }

    componentDidMount() {
        this.setState({
            colors: loadColors(),
        }, () => {
            ReactTooltip.rebuild();
        });
    }

    onAddColor = () => {
        this.setState({
            colors: addNewColor(this.state.colors),
        }, () => {
            updateHash(this.state.colors);
            ReactTooltip.rebuild();
        });
    }

    onNameChange = (color, nameValue) => {
        color.name = nameValue;
        this.forceUpdate();
        updateHash(this.state.colors);
    }

    onColorChange = (color, colorValue) => {
        color.color = colorValue;
        this.forceUpdate();
        updateHash(this.state.colors);
    }

    onDeleteColor = (color) => {
        this.setState({
            colors: removeColor(this.state.colors, color),
        }, () => {
            updateHash(this.state.colors);
            ReactTooltip.rebuild();
        });
    }

    onDuplicateColor = (color) => {
        this.setState({
            colors: duplicateColor(this.state.colors, color),
        }, () => {
            updateHash(this.state.colors);
            ReactTooltip.rebuild();
        });
    }

    onDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
        
        const colors = this.state.colors;

        const a = colors[result.source.index];
        const b = colors[result.destination.index];

        colors[result.source.index] = b;
        colors[result.destination.index] = a;
    
        this.setState({
          colors: colors,
        }, () => {
            updateHash(this.state.colors);
            ReactTooltip.rebuild();
        });
      }

    render() {
        return (
            <div className="app">
                <div className="header pure-g">
                    <div className="pure-u-1-24 pure-md-2-24 pure-u-lg-4-24 pure-u-xl-6-24"></div>
                    <div className="pure-u-22-24 pure-md-18-24 pure-u-lg-16-24 pure-u-xl-12-24 content">
                        <h1 className="brand">Colopia</h1>
                        <button className="share-button" onClick={() => {
                            copy(window.location.href);
                            alert(strings.paletteCopied);
                        }} data-tip={strings.sharePalette}>
                            <Share></Share>
                        </button>
                    </div>
                    <div className="pure-u-1-24 pure-md-2-24 pure-u-lg-4-24 pure-u-xl-12-24"></div>
                </div>
                <div className="header-placeholder"></div>
                <div className="pure-g">
                    <div className="pure-u-1-24 pure-md-2-24 pure-u-lg-4-24 pure-u-xl-6-24"></div>
                    <div className="pure-u-22-24 pure-md-18-24 pure-u-lg-16-24 pure-u-xl-12-24">
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        {
                                            this.state.colors.map((col, index) => (
                                                <Draggable
                                                    key={col.id} draggableId={col.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}>
                                                            <ColorTile
                                                                color={col}
                                                                onColorChange={this.onColorChange}
                                                                onNameChange={this.onNameChange}
                                                                onDelete={this.onDeleteColor}
                                                                onDuplicate={this.onDuplicateColor}>
                                                            </ColorTile>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <button className="add-color-button" onClick={this.onAddColor}>
                            <div className="plus-container">
                                <Plus></Plus>
                            </div>
                            {strings.addColor}
                        </button>
                    </div>
                    <div className="pure-u-1-24 pure-md-2-24 pure-u-lg-4-24 pure-u-xl-12-24"></div>
                </div>

                <ReactTooltip />
            </div>
        );
    }
}
