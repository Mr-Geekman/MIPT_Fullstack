import { connect } from 'react-redux';
import visible_height_ from "../../components/visible_height";

const mapStateToProps = (state) => {
    return {
        footer_height: state.footer_height,
        header_height: state.header_height
    };
};

const visibleHeight = connect(
    mapStateToProps,
    undefined
)(visible_height_);

export default visibleHeight;

