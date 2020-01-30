import React, {Component} from 'react';
import {Circle, Path, Group} from 'react-konva';

function get_data(props, sign) {
    let result = "m 0, 0 q ";
    result += props.radius + "," + 
        (sign * props.radius);
    result += " " + (2 * props.radius) + "," + 0;
    console.log(result)
    return result;
}

function cursor_pointer() {
    document.getElementsByTagName('body')[0].style.cursor = 'pointer';
}

function cursor_default() {
    document.getElementsByTagName('body')[0].style.cursor = 'default';
}

const marker = mark_props => (
    <Group
        x={mark_props.x_coordinate}
        y={mark_props.y_coordinate}
        onClick={mark_props.handler}        
        opacity={0.8 * mark_props.opacity}
        onMouseEnter={cursor_pointer}
        onMouseLeave={cursor_default}
        >
        <Circle
            x={0}
            y={0}
            radius={mark_props.radius}
            fill={"gray"}
        />
        <Path 
            x={- mark_props.radius}
            y={0}
            data={get_data(mark_props, 1)}
            stroke={"white"}
            width={10}
        />
        <Path 
            x={- mark_props.radius}
            y={0}
            data={get_data(mark_props, -1)}
            stroke={"white"}
            width={10}
        />
        <Circle
            x={0}
            y={0}
            radius={mark_props.radius / 3}
            fill={"white"}
        />
    </Group>
    );

export default marker;