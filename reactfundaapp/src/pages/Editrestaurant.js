import React, {Component} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}
class Editrestaurant extends Component
{
    state = {
        name: '',
        address: '',
        email: '',
        phone: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    
    async componentDidMount() {

        let { id } = this.props.params;
        //console.log(id);
        const res = await axios.get(`http://localhost:8000/api/edit-restaurant/${id}`);
        if(res.data.status === 200)
        {
          this.setState({
            name: res.data.restaurant.name,
            address: res.data.restaurant.address,
            email: res.data.restaurant.email,
            phone: res.data.restaurant.phone,  
          });
        }
        else if(res.data.status === 404)
        {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "success",
                button: "OK!",
              });
            this.props.history.push('/');
        }
    }

    updateRestaurant = async (e) => {
        e.preventDefault();
        
        //document.getElementById('updatebtn').disabled = true;
        //document.getElementById('updatebtn').innerText = "Updating";
        let { id } = this.props.params;
        const res = await axios.put(`http://localhost:8000/api/update-restaurant/${id}`, this.state);
        if(res.data.status === 200)
         {
           //console.log(res.data.message);
           swal({
            title: "Updated!",
            text: res.data.message,
            icon: "success",
            button: "OK!",
          });
          this.props.history.push('/');

           //document.getElementById('updatebtn').disabled = false;
           //document.getElementById('updatebtn').innerText = "Update Restaurant";
        
         }
        else if(res.data.status === 404)
        {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "success",
                button: "OK!",
              });
            this.props.history.push('/');
        }
        else
        {
            this.setState({
                error_list: res.data.validate_err,
             });
        }
    
    }   

     render(){
         return(
           <div className="container">
               <div className="row">
                   <div className="col-md-6">
                       <div className="card">
                           <div className="card-header">
                               <h4>Edit Restaurants
                                   <Link to={'/'} className="btn btn-primary btn-sm float-end"> BACK</Link>
                               </h4>
                           </div>
                           <div className="card-body">
                                
                                <form onSubmit={this.updateRestaurant} >
                                    <div className="form-group-mb-3">
                                        <label>Restaurant Name </label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.name}</span>
                                    </div>
                                    <div className="form-group-mb-3">
                                        <label>Restaurant Address </label>
                                        <input type="text" name="address" onChange={this.handleInput} value={this.state.address} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.address}</span>
                                    </div>
                                    <div className="form-group-mb-3">
                                        <label>Restaurant Email </label>
                                        <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.email}</span>
                                    </div>
                                    <div className="form-group-mb-3">
                                        <label>Restaurant Phone </label>
                                        <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.phone}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Restaurant</button>
                                    </div>
                                </form>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
         );
     }

}

export default withParams(Editrestaurant);