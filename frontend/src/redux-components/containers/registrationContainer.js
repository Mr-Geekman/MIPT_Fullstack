import { connect } from 'react-redux';
import { setUserData } from "../actions";
import RegistartionForm from "../../components/registration";

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

const RegistartionFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistartionForm)

export default RegistartionFormContainer;