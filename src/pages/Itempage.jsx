import React from "react"

import Footer from "../components/Footer.jsx"
import PropTypes from "prop-types";


class Itempage extends React.Component{

    constructor(props){
        super(props)
        this.state = {}
    }
    componentDidMount = () =>{
        this.fetchItem()
       
    }

    fetchItem = () =>{
        fetch(`/api/v1/items/${this.props.match.params.itemId}`)
        .then(res =>{
            console.log(res, " --> respone")
            return res.json()
        })
        .then(item=>{
            console.log(item, "is the item")
            this.setState({
                ...item
            })
        })
        .catch(req =>{
            console.log("item page", req)
        })
    }
    

    render(){
        return(
            <div>
                <div className="itemPage-item">
                    <img src={this.state.imgSrc}/>
                    <h3>{this.state.title}</h3>
                    <h3>{this.state.price}</h3>
                </div>
                <Footer />
            </div>
        )
    }
}

Itempage.propTypes = {
    match: PropTypes.object.isRequired,
}

export default Itempage