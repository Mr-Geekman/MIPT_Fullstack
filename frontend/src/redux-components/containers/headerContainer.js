import { connect } from 'react-redux';
import { setUserData, setHeight } from "../actions";
import Header from "../../components/header";

const mapStateToProps = (state) => {
    return {
        user_name: state.user_data.user_name
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        enter: (user_data) => {
            dispatch(setUserData(user_data));
        },
        onEscapeClick: () => {
            localStorage.removeItem('token');
            dispatch(setUserData(undefined));
        },
        setHeight: (height) => {
            dispatch(setHeight(height));
        }
    };
};

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;