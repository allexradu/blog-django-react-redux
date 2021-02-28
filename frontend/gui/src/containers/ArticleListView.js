import React from 'react';
import Articles from '../components/Articles'
import CustomForm from "../components/Form";
import axios from 'axios';

class ArticleList extends React.Component {
    state = {
        articles: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api')
            .then(res => {
                this.setState({
                    articles: res.data
                })
            })

    }

    render() {
        return (
            <div>
                <Articles data={this.state.articles}/>
                <h2>Create an article</h2>
                <CustomForm
                    requestType="post"
                    articleID={null}
                    btnText="Create"
                />
            </div>
        )
    }
}

export default ArticleList;