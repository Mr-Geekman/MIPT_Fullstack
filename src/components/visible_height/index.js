function visible_height_() {
    return window.innerHeight -
        this.props.header_height -
        this.props.footer_height;
};





export default visible_height_;