import { connect } from 'react-redux';
import PageNotFound from '../../components/pageNotFound';

const mapStateToProps = (state) => {
    return {
        height: state.height,
    }
}

const mapDispatchToProps = (dispatch) => {} 

const PageNotFoundContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PageNotFound);

export default PageNotFoundContainer;