import { connect } from 'react-redux';
import { setUserData } from "../actions";
import AuthorizationForm from "../../components/authorization";

const mapStateToProps = (state) => {
    return {
        user_data: state.user_data
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        enter: (user_data) => {
            dispatch(setUserData(user_data))
        }
    };
};

const AuthorizationFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizationForm)

export default AuthorizationFormContainer;