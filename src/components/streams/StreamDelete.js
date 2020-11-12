import React from 'react';
import Modal from "../Modal";
import history from "../../history";
import {connect} from 'react-redux';
import {deleteStream, fetchStream} from "../../actions";
import {Link} from "react-router-dom";

class StreamDelete extends React.Component{

    componentDidMount() {
        this.props.fetchStream(this.props.streamId);
    }

    renderActions(){
        return (
            <React.Fragment>
                <Link to="/" className="ui button">Cancel</Link>
                <button onClick={() => this.props.deleteStream(this.props.streamId)} className="ui button primary">Delete</button>
            </React.Fragment>
        );
    };


    renderContent(){
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream?';
        }else{
             return `Are you sure you want to delete: ${this.props.stream.title}?`
        }
    }

    render(){

        return (
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        streamId: ownProps.match.params.id
    }
}


export default connect(mapStateToProps,{
    deleteStream, fetchStream
})(StreamDelete);
