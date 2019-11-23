import { connect } from 'react-redux';
import { setUserName, setHeaderHeight } from "../actions";
import Header from "../../components/header";

const mapStateToProps = (state) => {
    return {
        user_name: state.user_name
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEnterClick: (user_name) => {
            dispatch(setUserName(user_name))
        },
        onEscapeClick: () => {
            dispatch(setUserName(undefined))
        },
        sendHeight: (height) => {
            dispatch(setHeaderHeight(height))
        }
    };
};

const HandledHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HandledHeader;