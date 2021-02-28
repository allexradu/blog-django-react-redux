import React from 'react';
import CustomForm from "../components/Form";
import axios from 'axios';
import {Card} from 'antd';

class ArticleDetail extends React.Component {
    state = {
        article: {}
    }


    componentDidMount() {
        const articleID = this.props.match.params.articleID;
        axios.get(`http://127.0.0.1:8000/api/${articleID}`)
            .then(res => {
                this.setState({
                    article: res.data
                })
            })
    }

    handleDelete = (event) => {
        const articleID = this.props.match.params.articleID;
        axios.delete(`http://127.0.0.1:8000/api/${articleID}`);
        this.props.history.push('/');
        this.forceUpdate();

    }

    render() {
        return (
            <div>
                <Card title={this.state.article.title}>
                    <p>{this.state.article.content}</p>


                </Card>
                <CustomForm
                    requestType="put"
                    articleID={this.props.match.params.articleID}
                    btnText="Update"
                />
                <form onSubmit={this.handleDelete}>
                    <button type="submit" style={{'color': 'red'}}>Delete</button>
                </form>
            </div>
        )
    }
}

export default ArticleDetail;