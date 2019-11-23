import React, {Component} from 'react';
import {Circle} from 'react-konva';

const marker = mark_props => (
    <Circle
        x={mark_props.x}
        y={mark_props.y}
        radius={mark_props.radius}
        onClick={mark_props.handler(mark_props.id)}
        fill={"gray"}
        opacity={0.8 * mark_props.opacity}
    />
    );

export default marker;
