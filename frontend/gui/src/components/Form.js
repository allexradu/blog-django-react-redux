import React from "react";
import {Form, Input} from "antd";
import {connect} from "react-redux";
import axios from "axios";

const FormItem = Form.Item;


class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, articleID) => {
        // event.preventDefault();
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;

        switch (requestType) {
            case "post":
                return axios.post('http://127.0.0.1:8000/api/', {
                    title: title,
                    content: content,
                })
                    .then(response => console.log(response))
                    .catch(error => console.error(error));
            case "put":
                return axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
                    title: title,
                    content: content,
                })
                    .then(response => console.log(response))
                    .catch(error => console.error(error));
            default:
                return null
        }

    };

    render() {
        return (
            <div>
                <form
                    onSubmit={(event) => this.handleFormSubmit(
                        event,
                        this.props.requestType, this.props.articleID
                    )}
                >
                    <FormItem label="Title">
                        <Input name="title" placeholder="Put a title here"/>
                    </FormItem>
                    <FormItem label="Content">
                        <Input name="content" placeholder="Enter some content ..."/>
                    </FormItem>
                    <FormItem>
                        <button type="submit">
                            {this.props.btnText}

                        </button>
                    </FormItem>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(CustomForm);

// export default CustomForm;